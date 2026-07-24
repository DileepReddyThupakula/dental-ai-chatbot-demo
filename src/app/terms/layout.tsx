import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Anvora AI",
  description:
    "Review Anvora's standard service licensing terms, subscription billing, billing cycle renewals, clinic compliance requirements, and AI conversational disclaimers.",
  keywords: [
    "Anvora terms of service",
    "dental AI license agreement",
    "subscription renewals billing policy",
    "AI accuracy warranty disclaimer",
  ],
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
