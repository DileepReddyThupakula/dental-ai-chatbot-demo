import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans | Anvora",
  description:
    "Flexible, transparent pricing plans scaled for single-chair clinics to multi-location dental support organizations (DSOs). Calculate your ROI with Anvora today.",
  keywords: [
    "dental AI assistant pricing",
    "dental office automation cost",
    "Anvora plans",
    "AI receptionist cheap pricing",
  ],
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
