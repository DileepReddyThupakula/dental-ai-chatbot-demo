import React from "react";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] bg-linear-to-b from-white to-secondary/10 px-4 py-20">
      <div className="max-w-2xl text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 p-2 rounded-xl bg-primary/10 text-primary">
          <Shield className="h-6 w-6" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-card-foreground">
          Privacy Policy
        </h1>
        <p className="text-base text-foreground/80 leading-relaxed max-w-lg mx-auto">
          We take patient data privacy very seriously. All conversation logs, booking information, and inquiries are securely encrypted.
        </p>
        <p className="text-sm text-foreground/50 italic">
          (Detailed Privacy Policy text will be built in Sprint 2)
        </p>
      </div>
    </div>
  );
}