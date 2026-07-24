export type PMSType = "DENTRIX" | "EAGLESOFT" | "OPENDENTAL";

export type PMSSyncStatusValue = "DISCONNECTED" | "CONNECTED" | "SYNC_ERROR";

export type ReservationSyncStatus = "PENDING" | "SUCCESS" | "FAILED" | "MANUAL_RESOLVE_REQUIRED";

export interface PMSCredentials {
  pmsType: PMSType;
  apiEndpoint: string;
  integrationKey: string;
  clinicLicenseNumber?: string;
  localServerPort?: number; // Some local setups require port tunneling
}

export interface AvailableAppointmentSlot {
  id: string; // Temporary unique identifier
  dateTime: Date;
  durationMinutes: number;
  operatoryId: string; // Room / Chair details
  providerId: string; // Dentist or Hygienist details
}

export interface PMSProviderInfo {
  id: string;
  name: string;
  type: "DENTIST" | "HYGIENIST" | "SPECIALIST";
  isActive: boolean;
}

export interface PMSOperatoryInfo {
  id: string;
  name: string;
  description?: string;
}

export interface AppointmentReservationDetail {
  id: string;
  clinicId: string;
  conversationId?: string | null;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  insuranceCarrier?: string | null;
  insuranceMemberId?: string | null;
  appointmentTime: Date;
  durationMinutes: number;
  reasonForVisit?: string | null;
  operatoryId?: string | null;
  providerId?: string | null;
  syncStatus: ReservationSyncStatus;
  pmsAppointmentId?: string | null; // ID in Dentrix/Eaglesoft
  rawPMSResponse?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}
