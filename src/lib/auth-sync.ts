import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export interface ProvisionedSession {
  user: {
    id: string;
    clerkId: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: UserRole;
    clinicId: string;
  };
  clinic: {
    id: string;
    name: string;
    slug: string;
    timezone: string;
    pmsSyncStatus: string;
  };
}

/**
 * Autoprovisions User, Clinic, and AssistantSettings in a single transaction
 * on first login if the Clerk authenticated user doesn't exist in our DB.
 */
export async function getOrCreateUserAndClinic(): Promise<ProvisionedSession | null> {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const primaryEmail = clerkUser.emailAddresses[0]?.emailAddress;
  if (!primaryEmail) {
    throw new Error("Clerk user has no associated email address.");
  }

  // 1. Try to find the user in our database
  const existingUser = await db.user.findUnique({
    where: { clerkId: clerkUser.id },
    include: { clinic: true },
  });

  if (existingUser) {
    return {
      user: {
        id: existingUser.id,
        clerkId: existingUser.clerkId,
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        role: existingUser.role,
        clinicId: existingUser.clinicId,
      },
      clinic: {
        id: existingUser.clinic.id,
        name: existingUser.clinic.name,
        slug: existingUser.clinic.slug,
        timezone: existingUser.clinic.timezone,
        pmsSyncStatus: existingUser.clinic.pmsSyncStatus,
      },
    };
  }

  // 2. Not found, create the default structures using a transact lock
  const userSlug = primaryEmail.split("@")[0] || "clinic";
  const suffix = clerkUser.id.length > 5 ? clerkUser.id.substring(clerkUser.id.length - 5) : "admin";
  const uniqueSlug = `${userSlug}-${suffix}`.toLowerCase();

  const defaultOperatingHours = {
    monday: { open: "08:00", close: "17:00", closed: false },
    tuesday: { open: "08:00", close: "17:00", closed: false },
    wednesday: { open: "08:00", close: "17:00", closed: false },
    thursday: { open: "08:00", close: "17:00", closed: false },
    friday: { open: "08:00", close: "17:00", closed: false },
    saturday: { open: "09:00", close: "13:00", closed: true },
    sunday: { open: "09:00", close: "13:00", closed: true },
  };

  const defaultIntakeRequirements = {
    collectInsurance: true,
    collectEmail: true,
    collectPhone: true,
    collectReasonForVisit: true,
    allowNewPatients: true,
  };

  const defaultSystemPrompt =
    `You are a friendly Virtual Dental Assistant for our clinic. Your core goals are:\n` +
    `1. Qualify and collect patient details (name, email, phone).\n` +
    `2. Answer practice FAQs (hours, address).\n` +
    `3. Identify appointments openings and sync bookings to the calendar.`;

  // Start Transaction
  const result = await db.$transaction(async (tx) => {
    // A. Create the Clinic
    const clinic = await tx.clinic.create({
      data: {
        name: `${clerkUser.firstName || "Dental"} Practice`,
        slug: uniqueSlug,
        operatingHours: defaultOperatingHours,
        timezone: "America/New_York",
      },
    });

    // B. Create the User link
    const user = await tx.user.create({
      data: {
        clerkId: clerkUser.id,
        email: primaryEmail,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        role: "CLINIC_OWNER" as UserRole,
        clinicId: clinic.id,
      },
    });

    // C. Create default Assistant settings
    await tx.assistantSettings.create({
      data: {
        clinicId: clinic.id,
        isActive: true,
        systemPrompt: defaultSystemPrompt,
        voiceModel: "openai-gpt-4o-audio",
        widgetColor: "#0f766e",
        intakeRequirements: defaultIntakeRequirements,
        temperature: 0.2,
      },
    });

    return { user, clinic };
  });

  return {
    user: {
      id: result.user.id,
      clerkId: result.user.clerkId,
      email: result.user.email,
      firstName: result.user.firstName,
      lastName: result.user.lastName,
      role: result.user.role,
      clinicId: result.user.clinicId,
    },
    clinic: {
      id: result.clinic.id,
      name: result.clinic.name,
      slug: result.clinic.slug,
      timezone: result.clinic.timezone,
      pmsSyncStatus: result.clinic.pmsSyncStatus,
    },
  };
}
