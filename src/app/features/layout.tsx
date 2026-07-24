import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | Anvora AI Receptionist",
  description:
    "Explore the capabilities of Anvora AI Receptionist for dental practices. Learn about lead qualification, automatic scheduling, PPO insurance verification, and unified SMS messaging.",
  keywords: [
    "dental client lead qualification",
    "automatic schedule sync",
    "real-time PMS integration",
    "Dentrix AI assistant",
    "Eaglesoft AI integration",
    "outbound SMS reminder",
  ],
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
