import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { User, Clinic } from "@prisma/client";

export interface AuthenticatedContext {
  user: User;
  clinic: Clinic;
}

/**
 * Utility to verify auth and load the active database record.
 * Reusable across Server Actions and Route Handlers.
 */
export async function getAuthenticatedContext(): Promise<AuthenticatedContext | null> {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: { clinic: true },
  });

  if (!user || !user.clinic) {
    return null;
  }

  return {
    user,
    clinic: user.clinic,
  };
}
