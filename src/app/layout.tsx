import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anvora.ai"),
  title: "Anvora | AI Receptionist for Dental Practices",
  description:
    "Anvora provides High-Fidelity AI Receptionists that help dental practices capture more appointments, answer patient FAQs, verify PPO insurance eligibility, and schedule directly into Dentrix, Eaglesoft, and Open Dental 24/7.",
  keywords: [
    "Anvora",
    "AI receptionist",
    "dental AI assistant",
    "AI chatbot for dentists",
    "automated appointment booking",
    "dental practice automation",
    "dental clinic chat bot",
    "virtual front desk",
    "Dentrix integration",
    "Eaglesoft integration",
    "Open Dental integration",
    "PPO insurance verification AI"
  ],
  authors: [{ name: "Anvora Team", url: "https://anvora.ai" }],
  alternates: {
    canonical: "https://anvora.ai",
  },
  openGraph: {
    title: "Anvora | AI Receptionist for Dental Practices",
    description:
      "Anvora's AI Receptionist answers patient inquiries, verifies PPO insurance, and schedules calendar appointments directly into your PMS — operating 24/7 to automate your front desk.",
    url: "https://anvora.ai",
    siteName: "Anvora",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anvora AI Practice Automation Sidebar Widget Preview",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anvora | AI Receptionist for Dental Practices",
    description:
      "Anvora's AI Receptionist answers patient inquiries, verifies PPO insurance, and schedules calendar appointments directly into your PMS — operating 24/7 to automate your front desk.",
    creator: "@anvora_ai",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased font-sans`}
      >
        <body className="min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-primary/20">
          <Navbar />
          <main className="flex-1 flex flex-col w-full">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
