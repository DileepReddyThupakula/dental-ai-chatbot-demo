import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo | Anvora",
  description:
    "Schedule a live walkthrough session with an integration engineer at Anvora. See how our AI receptionist integrates with your Dentrix, Eaglesoft, or Open Dental PMS.",
  keywords: [
    "Anvora demo schedule",
    "Dentrix AI demo walkthrough",
    "Eaglesoft integration test",
    "book dental AI receptionist consultation",
  ],
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
