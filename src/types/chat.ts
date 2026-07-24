export type MessageSenderType = "PATIENT" | "AI_ASSISTANT" | "HUMAN_OPERATOR";

export type ConversationalChannel = "WEB_WIDGET" | "SMS" | "VOICE_CALL";

export type ChatStatusType = "ACTIVE" | "PAUSED_FOR_AGENT" | "RESOLVED" | "NEEDS_FOLLOW_UP";

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: MessageSenderType;
  content: string;
  createdAt: Date;
}

export interface ConversationDetail {
  id: string;
  clinicId: string;
  patientPhone?: string | null;
  patientEmail?: string | null;
  patientName?: string | null;
  channel: ConversationalChannel;
  status: ChatStatusType;
  summary?: string | null;
  hipaaCleaned: boolean;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AssistantSettingsDetail {
  id: string;
  clinicId: string;
  isActive: boolean;
  systemPrompt: string;
  voiceModel: string;
  widgetColor: string;
  intakeRequirements: IntakeSettings;
  temperature: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IntakeSettings {
  collectInsurance: boolean;
  collectEmail: boolean;
  collectPhone: boolean;
  collectReasonForVisit: boolean;
  allowNewPatients: boolean;
}
