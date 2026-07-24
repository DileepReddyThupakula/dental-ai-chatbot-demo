"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  TrendingUp,
  Calendar,
  Sparkles,
  PhoneOff,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

interface DashboardMetrics {
  totalConversations: number;
  totalSyncedBookings: number;
  pendingBookings: number;
  hoursSaved: number;
  pmsSyncStatus: string;
  pmsType: string;
  clinicName: string;
}

const RECENT_CONVERSATIONS = [
  {
    patient: "Eleanor Vance",
    channel: "SMS",
    time: "2 mins ago",
    intent: "Schedule Booking",
    status: "SUCCESS",
    detail: "Booked Routine Cleaning on Jul 29, 2026 at 9:00 AM"
  },
  {
    patient: "Marcus Cooper",
    channel: "Web Chat",
    time: "14 mins ago",
    intent: "Insurance Query",
    status: "RESOLVED",
    detail: "Verified Cigna PPO plan details for implant coverage"
  },
  {
    patient: "Sylvia Chen",
    channel: "Voice Call",
    time: "1 hour ago",
    intent: "Clinic Details",
    status: "RESOLVED",
    detail: "Answered parking queries & direct doctor validation"
  },
  {
    patient: "Jeremy Thorne",
    channel: "SMS",
    time: "3 hours ago",
    intent: "Schedule Booking",
    status: "PENDING",
    detail: "Requested Emergency Toothache care. Pending PMS Sync."
  }
];

export default function DashboardOverview() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const res = await fetch("/api/dashboard/metrics");
        if (res.ok) {
          const data = await res.json();
          setMetrics(data);
        }
      } catch (err) {
        console.error("Failed to load metrics:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadMetrics();
  }, []);

  const getKPIValue = (label: string) => {
    if (!metrics) return "Loading...";
    if (label === "Total Chats Handled") return metrics.totalConversations.toLocaleString();
    if (label === "Missed Calls Diverted") return metrics.pendingBookings.toString(); // Map pending emergency tickets
    if (label === "Bookings Synced") return metrics.totalSyncedBookings.toLocaleString();
    if (label === "Staff Hours Saved") return `${metrics.hoursSaved} hrs`;
    return "0";
  };

  const METRICS = [
    {
      label: "Total Chats Handled",
      change: "+12.5%",
      trend: "up",
      icon: MessageSquare,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      label: "Missed Calls Diverted",
      change: "+8.3%",
      trend: "up",
      icon: PhoneOff,
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      label: "Bookings Synced",
      change: "+22.4%",
      trend: "up",
      icon: Calendar,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      label: "Staff Hours Saved",
      change: "+15.1%",
      trend: "up",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10"
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 bg-slate-900 rounded-lg w-1/4" />
        <div className="h-4 bg-slate-900 rounded-md w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-[#090F1B] border border-white/5 rounded-2xl p-5" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-72 bg-[#090F1B] border border-white/5 rounded-2xl p-6" />
          <div className="h-72 bg-[#090F1B] border border-white/5 rounded-2xl p-6" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Title */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-[11px] text-slate-450 w-fit">
          <Sparkles className="h-3 w-3 text-primary animate-pulse" />
          <span>Practice Insights Live Feed</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Good morning, {metrics?.clinicName || "Clinic Team"}
        </h1>
        <p className="text-sm text-slate-400">
          Anvora AI has handled {metrics?.totalConversations || 0} inquiries after-hours.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {METRICS.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="bg-slate-950/40 border border-white/5 backdrop-blur-md rounded-2xl p-5 hover:border-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between pointer-events-none mb-3">
                <div className={`p-2 rounded-xl ${metric.bg} ${metric.color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <TrendingUp className="h-2.5 w-2.5" />
                  {metric.change}
                </span>
              </div>
              <h3 className="pointer-events-none text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                {metric.label}
              </h3>
              <p className="pointer-events-none text-2xl font-bold text-white font-display tracking-tight">
                {getKPIValue(metric.label)}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Section Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Chats handled (2/3 width) */}
        <div className="lg:col-span-2 bg-slate-950/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-display tracking-tight">
              Recent AI Inquiries
            </h2>
            <a
              href="/dashboard/logs"
              className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline"
            >
              View conversation logs
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>

          <div className="divide-y divide-white/5">
            {RECENT_CONVERSATIONS.map((chat) => (
              <div
                key={chat.patient}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{chat.patient}</span>
                    <span className="text-[10px] text-slate-500 font-mono">• {chat.time}</span>
                  </div>
                  <p className="text-slate-450 text-[13px] leading-relaxed truncate">
                    {chat.detail}
                  </p>
                </div>
                <div className="flex items-center gap-2.5 self-start sm:self-center shrink-0">
                  <span className="px-2 py-0.5 rounded-lg bg-slate-900 border border-white/5 text-[10px] text-slate-400 font-mono">
                    {chat.intent}
                  </span>
                  <span
                    className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      chat.status === "SUCCESS" || chat.status === "RESOLVED"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {chat.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Receptionist Info widget (1/3 width) */}
        <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center justify-between text-center min-h-[300px]">
          <div className="w-full space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 antialiased">
              <Sparkles className="h-6 w-6 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold text-white font-display">
              Anvora Copilot Active
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-[240px] mx-auto">
              Our AI chatbot widget is successfully capturing patient inquiries on your website domains.
            </p>
          </div>

          <div className="w-full border-t border-white/5 pt-4 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Selected Voice:</span>
              <span className="text-white font-medium">Standard High Fidelity</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">PMS Syncing Database:</span>
              <span className="text-emerald-400 font-medium">
                {metrics?.pmsType === "DENTRIX"
                  ? "Dentrix Connection"
                  : metrics?.pmsType === "EAGLESOFT"
                  ? "Eaglesoft Connection"
                  : metrics?.pmsType === "OPENDENTAL"
                  ? "Open Dental Connection"
                  : "Database Disconnected"}
              </span>
            </div>
            <a
              href="/dashboard/assistant"
              className="inline-flex w-full items-center justify-center px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-bold text-white hover:bg-slate-850 hover:border-white/15 transition-all mt-2"
            >
              Configure Assistant Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
