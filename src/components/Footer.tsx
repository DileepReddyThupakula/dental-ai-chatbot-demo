"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, Sparkles } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Hide Footer in SaaS dashboard and authentication screens
  if (
    pathname &&
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/sign-in") ||
      pathname.startsWith("/sign-up"))
  ) {
    return null;
  }

  return (
    <footer className="bg-secondary/40 border-t border-border/80">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Sparkles className="h-6 w-6 stroke-[2.5]" />
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-card-foreground">
                Anvora
              </span>
            </Link>
            <p className="text-sm text-foreground/75 leading-relaxed max-w-sm">
              Anvora provides AI Receptionists that help dental practices capture more appointments, answer patient questions, and automate front desk conversations 24/7.
            </p>
            <p className="text-xs text-primary font-medium tracking-wide">
              Intelligence That Never Sleeps.
            </p>
          </div>

          {/* Links Col 1: Pages */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-card-foreground">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/features"
                  className="text-sm text-foreground/80 hover:text-primary transition-colors duration-155"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-foreground/80 hover:text-primary transition-colors duration-155"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="text-sm text-foreground/80 hover:text-primary transition-colors duration-155"
                >
                  Book Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Col 2: Contact */}
          <div className="col-span-1 md:col-span-4 space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-card-foreground">
              Contact Details
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5 text-sm text-foreground/80">
                <MapPin className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                <span>San Francisco, CA</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-foreground/80">
                <Phone className="h-4.5 w-4.5 text-primary shrink-0" />
                <div>
                  Direct:{" "}
                  <a href="tel:8005550199" className="hover:text-primary transition-colors">
                    (800) 555-0199
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-foreground/80">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0 mr-1 ml-1"></span>
                <div>
                  Support:{" "}
                  <a href="tel:8005550195" className="hover:text-primary font-medium hover:underline">
                    (800) 555-0195
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-foreground/80">
                <Mail className="h-4.5 w-4.5 text-primary shrink-0" />
                <a href="mailto:info@anvora.ai" className="hover:text-primary transition-colors">
                  info@anvora.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/60 text-center sm:text-left">
            &copy; {currentYear} Anvora. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-foreground/60 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-foreground/20 text-xs">|</span>
            <Link
              href="/terms"
              className="text-xs text-foreground/60 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}