import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Anvora AI",
  description:
    "Get in touch with the team at Anvora. Reach out for sales inquires, partner integrations, system security, or custom dental practice configurations.",
  keywords: [
    "contact Anvora",
    "Anvora custom support",
    "dental AI integrations support",
    "Anvora office address",
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
