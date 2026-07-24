"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide Navbar in SaaS dashboard and authentication screens
  if (
    pathname &&
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/sign-in") ||
      pathname.startsWith("/sign-up"))
  ) {
    return null;
  }

  const navLinks = [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border/80"
          : "bg-white border-b border-border/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Sparkles className="h-6 w-6 stroke-[2.5]" />
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-card-foreground">
                Anvora
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                    isActive ? "text-primary font-semibold" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/contact"
              className="flex items-center gap-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors duration-205"
            >
              <span className="p-1.5 rounded-lg bg-secondary text-primary">
                <Phone className="h-4 w-4" />
              </span>
              Contact Us
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/95 shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300"
            >
              Book Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-foreground/80 hover:text-primary hover:bg-secondary transition-all duration-200"
              aria-label="Toggle main menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-border/80 bg-white ${
          isOpen ? "max-h-[320px] opacity-100 py-4 scale-y-100" : "max-h-0 opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        <div className="px-4 space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground/85 hover:bg-secondary hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <hr className="border-border/60 my-2" />
          <div className="flex flex-col gap-3 px-4 pt-1 pb-2">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors duration-205"
            >
              <Phone className="h-4 w-4 text-primary" />
              Contact Us
            </Link>
            <Link
              href="/demo"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/95 shadow-md shadow-primary/20 transition-all duration-300"
            >
              Book Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}