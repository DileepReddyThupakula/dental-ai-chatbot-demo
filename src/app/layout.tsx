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
  title: "Anvora | AI Receptionist for Dental Practices",
  description:
    "Anvora provides AI Receptionists that help dental practices capture more appointments, answer patient questions, and automate front desk conversations 24/7. Intelligence That Never Sleeps.",
  keywords: [
    "Anvora",
    "AI receptionist",
    "dental AI assistant",
    "AI chatbot for dentists",
    "automated appointment booking",
    "dental practice automation",
    "dental clinic chat bot",
    "virtual front desk",
  ],
  authors: [{ name: "Anvora" }],
  openGraph: {
    title: "Anvora | AI Receptionist for Dental Practices",
    description:
      "Anvora provides AI Receptionists that help dental practices capture more appointments, answer patient questions, and automate front desk conversations 24/7.",
    url: "https://anvora.ai",
    siteName: "Anvora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anvora | AI Receptionist for Dental Practices",
    description:
      "Anvora provides AI Receptionists that help dental practices capture more appointments, answer patient questions, and automate front desk conversations 24/7.",
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
