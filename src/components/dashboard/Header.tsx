"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { RefreshCw, Database } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  // Simple formatter to convert paths (e.g. "/dashboard/assistant") into clean UI labels
  const getBreadcrumb = () => {
    if (!pathname) return "Console";
    if (pathname === "/dashboard") return "Overview";

    const parts = pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return "Console";

    // Capitalize and restore spaces/dashes
    return parts[1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <header className="hidden lg:flex w-full h-16 border-b border-white/5 bg-[#070B14] items-center justify-between px-8 sticky top-0 z-20">
      {/* Breadcrumb pathing */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 font-medium">Console</span>
        <span className="text-xs text-slate-650">/</span>
        <span className="text-sm text-white font-semibold font-display tracking-tight">
          {getBreadcrumb()}
        </span>
      </div>

      {/* Local PMS Database Status Indicators */}
      <div className="flex items-center gap-4">
        {/* PMS Connectivity Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-semibold text-emerald-400">
          <Database className="h-3 w-3" />
          <span>Dentrix connected</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Sync trigger action */}
        <button
          onClick={() => {}}
          className="p-2 rounded-lg bg-slate-950 border border-white/5 text-slate-400 hover:text-white hover:border-white/10 transition-all duration-200 cursor-pointer"
          title="Force synchronization"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}
