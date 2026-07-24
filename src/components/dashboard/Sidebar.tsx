"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  History,
  Calendar,
  Settings,
  X,
  Menu,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserButton } from "@clerk/nextjs";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Assistant", href: "/dashboard/assistant", icon: Bot },
  { label: "Live Transcripts", href: "/dashboard/logs", icon: History },
  { label: "PMS Scheduler", href: "/dashboard/scheduler", icon: Calendar },
  { label: "Practice Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#070B14] text-slate-200 border-r border-white/5 py-6 px-4">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <span className="p-2 rounded-xl bg-primary/10 text-primary">
          <Sparkles className="h-5 w-5 stroke-[2.5]" />
        </span>
        <div className="flex flex-col">
          <span className="font-display font-bold tracking-tight text-white text-base">
            Anvora Console
          </span>
          <span className="text-[10px] text-primary font-semibold tracking-wider uppercase">
            Practice SaaS
          </span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className="block relative"
            >
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? "text-primary bg-primary/5 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {/* Active link indicator glow */}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  className={`h-4.5 w-4.5 shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? "text-primary" : "text-slate-400 group-hover:text-white"
                  }`}
                />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Section */}
      <div className="pt-6 border-t border-white/5 flex items-center justify-between px-3">
        <div className="flex items-center gap-3 min-w-0">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-9 w-9 border border-white/10 hover:border-primary/50 transition-all rounded-full",
              },
            }}
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-white truncate">Clinic Account</span>
            <span className="text-[10px] text-slate-500 truncate">Staff Member</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent Side Drawer) */}
      <aside className="hidden lg:block w-64 h-screen fixed left-0 top-0 z-40 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Sticky Navbar Header */}
      <header className="lg:hidden w-full h-16 bg-[#070B14] border-b border-white/5 flex items-center justify-between px-4 sticky top-0 z-30">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-4.5 w-4.5 stroke-[2.5]" />
          </span>
          <span className="font-display text-sm font-bold tracking-tight text-white">
            Anvora
          </span>
        </Link>
        <button
          onClick={toggleMobileSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
          aria-label="Toggle Navigation Sidebar"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Drawer (Overlay) */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop Blur screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileSidebar}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Sidebar drawer body */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-64 max-w-[280px] h-full flex flex-col z-55 shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
