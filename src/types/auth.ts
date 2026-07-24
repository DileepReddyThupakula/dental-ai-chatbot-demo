export type UserRole = "CLINIC_OWNER" | "OFFICE_MANAGER" | "RECEPTIONIST" | "ADMIN";

export interface UserSessionProfile {
  id: string;
  clerkId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: UserRole;
  clinicId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClinicProfile {
  id: string;
  name: string;
  slug: string;
  address?: string | null;
  phone?: string | null;
  operatingHours: OperatingHours;
  timezone: string;
  licenseKey?: string | null;
  pmsType?: "DENTRIX" | "EAGLESOFT" | "OPENDENTAL" | null;
  pmsApiEndpoint?: string | null;
  pmsSyncStatus: "DISCONNECTED" | "CONNECTED" | "SYNC_ERROR";
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyHours {
  open: string;  // e.g. "08:00"
  close: string; // e.g. "17:00"
  closed: boolean;
}

export interface OperatingHours {
  monday: DailyHours;
  tuesday: DailyHours;
  wednesday: DailyHours;
  thursday: DailyHours;
  friday: DailyHours;
  saturday: DailyHours;
  sunday: DailyHours;
}
