import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Anvora AI",
  description:
    "Review how Anvora practices HIPAA-compliant data policies, secure patient communications, secure database credentials, and AES-256 encryption standards.",
  keywords: [
    "Anvora privacy policy",
    "HIPAA dental AI safety",
    "patient data encryption rules",
    "safe dental PMS integrations",
  ],
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
