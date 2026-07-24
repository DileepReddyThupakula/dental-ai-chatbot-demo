"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Bot,
  Calendar,
  MessageSquare,
  Database,
  Shield,
  ShieldCheck,
  Check,
  Lock,
  ArrowRight,
  ChevronDown,
  Cpu,
  Smartphone,
  PhoneCall,
  Clock,
  GitMerge,
  Workflow
} from "lucide-react";

// Types
interface Capability {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  border: string;
  glow: string;
  iconBg: string;
}

interface Integration {
  name: string;
  status: string;
  compatible: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

// Data Section 1: Core Capabilities
const coreCapabilities: Capability[] = [
  {
    title: "24/7 Clinic Availability",
    description: "Never miss another patient conversion due to busy phone lines or off-hour attempts. Anvora answers patient questions instantly day or night, keeping your clinic books full.",
    icon: Clock,
    color: "text-cyan-400",
    border: "border-cyan-500/10 hover:border-cyan-500/30",
    glow: "bg-cyan-500/5",
    iconBg: "bg-cyan-950/30"
  },
  {
    title: "Insurance PPO Check",
    description: "The AI agent identifies patient PPO profiles (e.g. Delta Dental, Cigna, MetLife) and queries benefits rules in the conversation to eliminate manual validation.",
    icon: Database,
    color: "text-violet-400",
    border: "border-violet-500/10 hover:border-violet-500/30",
    glow: "bg-violet-500/5",
    iconBg: "bg-violet-950/30"
  },
  {
    title: "Direct-to-PMS Booking",
    description: "Write reservations directly into Dentrix, Open Dental, or Eaglesoft calendars. The system ensures open slots are updated immediately with zero double-bookings.",
    icon: Calendar,
    color: "text-emerald-400",
    border: "border-emerald-500/10 hover:border-emerald-500/30",
    glow: "bg-emerald-500/5",
    iconBg: "bg-emerald-950/30"
  },
  {
    title: "Automated SMS Confirmations",
    description: "Once booked, the assistant text-confirms scheduling details and delivers links to digital intake forms, accelerating patient check-ins.",
    icon: Smartphone,
    color: "text-rose-400",
    border: "border-rose-500/10 hover:border-rose-500/30",
    glow: "bg-rose-500/5",
    iconBg: "bg-rose-950/30"
  },
  {
    title: "Smart Emergency Escalation",
    description: "Recognizes high-acuity crisis symptoms (e.g. swelling, severe nerve pain, trauma) and redirects patients to your office line or local emergency clinics.",
    icon: PhoneCall,
    color: "text-amber-400",
    border: "border-amber-500/10 hover:border-amber-500/30",
    glow: "bg-amber-500/5",
    iconBg: "bg-amber-950/30"
  },
  {
    title: "Conversational Intelligence",
    description: "Equipped with rich local practice context, answering FAQs about parking, operating hours, doctors' names, payment arrangements, and specialized service offerings.",
    icon: Bot,
    color: "text-fuchsia-400",
    border: "border-fuchsia-500/10 hover:border-fuchsia-500/30",
    glow: "bg-fuchsia-500/5",
    iconBg: "bg-fuchsia-950/30"
  }
];

// Data Section 3: Integrations
const integrations: Integration[] = [
  { name: "Dentrix", status: "Full 2-Way Sync", compatible: true },
  { name: "Open Dental", status: "Full 2-Way Sync", compatible: true },
  { name: "Eaglesoft", status: "Full 2-Way Sync", compatible: true },
  { name: "Carestream Dental", status: "Full 2-Way Sync", compatible: true },
  { name: "Dentrix Ascend", status: "Webhook Sync", compatible: true },
  { name: "Curve Dental", status: "Webhook Sync", compatible: true }
];

// Data Section 4: Workflow
const workflowSteps = [
  {
    id: "01",
    title: "Patient Inquiry Scanned",
    desc: "A patient accesses your website chat widget, text line, or booking portal day or night. The AI receptionist initiates interaction instantly, preventing lead drop-off.",
    highlight: "cyan"
  },
  {
    id: "02",
    title: "AI Context Parsing & Check",
    desc: "Anvora qualifies the patient's intent, matches PPO dental insurance criteria (Delta Dental, etc.), queries dynamic operating logic, and details doctor availability.",
    highlight: "violet"
  },
  {
    id: "03",
    title: "Secure Scheduler Write-Back",
    desc: "Anvora locks the chosen slot directly in your clinic's offline PMS (Dentrix, Eaglesoft, etc.), text-confirms details, and sends links to intake documents.",
    highlight: "emerald"
  }
];

// Data Section 5: Security Columns
const securityFeatures = [
  {
    title: "HIPAA Compliant Architecture",
    desc: "Anvora signs standard Business Associate Agreements (BAAs). Patient details are isolated and protected under strict federal guidelines.",
    icon: ShieldCheck
  },
  {
    title: "Transit & Static Encryption",
    desc: "All health datasets are locked dynamically using military-grade AES-256 databases and streamed exclusively under TLS 1.3 protocols.",
    icon: Lock
  },
  {
    title: "Zero-Retention Pipeline",
    desc: "Patient inputs are fed directly into your local Practice Management System. Chat datasets expire automatically after synchronization.",
    icon: Shield
  }
];

// Data Section 6: FAQs
const faqs: FAQItem[] = [
  {
    question: "Can Anvora integrate with our current Practice Management System (PMS)?",
    answer: "Yes! Anvora runs native 2-way sync pipelines with leading systems like Dentrix, Open Dental, and Eaglesoft, updating calendars instantly."
  },
  {
    question: "Is Anvora HIPAA compliant?",
    answer: "Absolutely. We sign Business Associate Agreements (BAAs), encrypt all transit and static data under TLS 1.3/AES-256 protocols, and enforce strict access control rules."
  },
  {
    question: "Does it require our front desk staff to monitor the chat?",
    answer: "No. Anvora is designed to run autonomously 24/7. Your front desk staff handles patients inside the clinic, while the AI schedules incoming patient inquiries in the background."
  },
  {
    question: "How long does the setup process take?",
    answer: "Usually less than 3 business days. We configure your practice faq information database, map insurance preferences, hook into your scheduler accounts, and embed the layout widget on your site."
  },
  {
    question: "Will it book garbage appointments or spam leads?",
    answer: "No. The AI agent applies strict qualification routines (verifying phone numbers, checking dental insurance status, collecting symptom briefs) and blocks double-schedules."
  }
];

export default function FeaturesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#070B14] text-slate-100 relative overflow-hidden font-sans">
      {/* Decorative Background Blur Glows */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-500/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-teal-500/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-emerald-500/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <main className="flex-1 w-full relative z-10 flex flex-col">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 w-full flex flex-col justify-center min-h-[50vh] text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 w-fit mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400/25" />
                Product Capabilities
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              AI receptionist For <br />
              <span className="bg-gradient-to-r from-blue-400 via-teal-350 to-emerald-400 bg-clip-text text-transparent">
                Dental Clinic Success
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto">
              Equip your dental clinic site with a virtual assistant that handles scheduling, verifies insurance, and responds to FAQs 24/7 with zero overhead.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/demo"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200 font-medium transition-all duration-300"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>

          {/* Dashboard/Product Mockup Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 max-w-5xl mx-auto rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] bg-slate-950/80 p-2 md:p-3 relative overflow-hidden backdrop-blur-md"
          >
            {/* Header / Top macOS bar inside mockup context */}
            <div className="w-full h-8 px-4 bg-slate-900/60 border-b border-white/5 flex items-center justify-between rounded-t-lg select-none">
              <div className="flex items-center gap-1.5 font-sans">
                <div className="h-2.5 w-2.5 rounded-full bg-white/15 hover:bg-rose-500 transition-colors" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/15 hover:bg-amber-500 transition-colors" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/15 hover:bg-emerald-500 transition-colors" />
              </div>
              <span className="text-[10px] text-slate-450 font-mono tracking-widest uppercase">Anvora Practice Suite</span>
              <div className="w-12" />
            </div>

            {/* Dashboard Contents Grid */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch align-middle text-left bg-slate-900/10">

              {/* Left Column: Practice stats dashboard widget (7 cols) */}
              <div className="md:col-span-7 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white font-display">Practice Performance</h3>
                    <p className="text-xs text-slate-400">Live operational sync status</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 text-[10px] font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE SCHEDULE SYNC
                  </div>
                </div>

                {/* Key KPIs inside the mockup grid layout */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-white/5 bg-slate-950/60">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Saved Calls</span>
                    <div className="text-xl font-bold font-mono text-cyan-400 mt-1 font-sans">1,482</div>
                    <span className="text-[9px] text-emerald-400 font-sans">+12% this week</span>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-slate-950/60">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Ins. Verified</span>
                    <div className="text-xl font-bold font-mono text-violet-400 mt-1 font-sans">942</div>
                    <span className="text-[9px] text-slate-400 font-sans">PPO Eligibility Check</span>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-slate-950/60">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Booked Value</span>
                    <div className="text-xl font-bold font-mono text-emerald-400 mt-1 font-sans">$44K</div>
                    <span className="text-[9px] text-emerald-400 font-sans">Estimated profit</span>
                  </div>
                </div>

                {/* Simulated Chart visual mockup */}
                <div className="p-4 rounded-xl border border-white/5 bg-slate-950/40 h-44 flex flex-col justify-end space-y-4">
                  <div className="flex items-baseline justify-between h-32 gap-3 pb-2 border-b border-white/5">
                    {/* chart bars with heights */}
                    <div className="w-full bg-slate-900 border border-white/5 rounded-t-md h-[40%] hover:bg-cyan-500/10 transition-colors" />
                    <div className="w-full bg-slate-900 border border-white/5 rounded-t-md h-[55%] hover:bg-cyan-500/10 transition-colors" />
                    <div className="w-full bg-slate-900 border border-white/5 rounded-t-md h-[72%] hover:bg-cyan-500/10 transition-colors" />
                    <div className="w-full bg-slate-900 border border-white/5 rounded-t-md h-[60%] hover:bg-cyan-500/10 transition-colors" />
                    <div className="w-full bg-gradient-to-t from-blue-500/20 to-cyan-500/40 border border-cyan-400/20 rounded-t-md h-[88%] shadow-[0_0_15px_rgba(34,211,238,0.1)]" />
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-slate-500">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri (Today)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live activity feed list (5 cols) */}
              <div className="md:col-span-5 rounded-xl border border-white/5 bg-slate-950/30 p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white font-display">Real-Time Routing Log</h4>
                  <p className="text-[10px] text-slate-400">Synchronizing to Dentrix database</p>
                </div>

                {/* Activity Feed log entries */}
                <div className="space-y-3 flex-1 overflow-y-auto text-[11px] pr-1 py-1">
                  <div className="p-2.5 rounded-lg bg-slate-900/50 border border-white/5 flex items-start gap-2.5 transition-all hover:bg-slate-950/50">
                    <span className="p-1 rounded bg-cyan-400/10 text-cyan-400 mt-0.5 shrink-0">
                      <Bot className="h-3 w-3" />
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between text-white font-medium">
                        <span>New Lead Interviewed</span>
                        <span className="text-[9px] text-slate-500 font-mono">10:42 AM</span>
                      </div>
                      <p className="text-slate-400 text-[10px] mt-0.5">&quot;Need booking for crown repair tomorrow.&quot;</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/50 border border-white/5 flex items-start gap-2.5 transition-all hover:bg-slate-950/50">
                    <span className="p-1 rounded bg-violet-400/10 text-violet-400 mt-0.5 shrink-0">
                      <Database className="h-3 w-3" />
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between text-white font-medium">
                        <span>Insurance Autocheck</span>
                        <span className="text-[9px] text-slate-500 font-mono">10:43 AM</span>
                      </div>
                      <p className="text-slate-400 text-[10px] mt-0.5">Found: Cigna PPO. Benefits status: ACTIVE.</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/50 border border-white/5 flex items-start gap-2.5 transition-all hover:bg-slate-950/50">
                    <span className="p-1 rounded bg-emerald-400/10 text-emerald-400 mt-0.5 shrink-0">
                      <Calendar className="h-3 w-3" />
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between text-white font-medium text-emerald-400">
                        <span>PMS Booking Committed</span>
                        <span className="text-[9px] text-slate-500 font-mono">10:44 AM</span>
                      </div>
                      <p className="text-slate-400 text-[10px] mt-0.5">Appt slotted: Crown prep, Dr. Evelyn, 2:30 PM.</p>
                    </div>
                  </div>
                </div>

                {/* Status indicator bar at bottom */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[9px] text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold uppercase tracking-wider font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    HIPAA Secure
                  </span>
                  <span>Port Sync: OK</span>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* SECTION 2: CORE CAPABILITIES */}
        <section className="relative w-full border-t border-white/5 bg-[#070B14] py-20 px-4 sm:px-6 lg:px-8">
          {/* Soft gradient divider */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 w-fit mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-350 flex items-center gap-1">
                  <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                  Core Competencies
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                Practice Automation Redefined
              </h2>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
                Explore the modular feature sets that allow Anvora to capture patient traffic and resolve clinic inquiries with absolute clarity.
              </p>
            </div>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreCapabilities.map((cap, idx) => {
                const IconComponent = cap.icon;
                return (
                  <motion.div
                    key={idx}
                    className="relative p-8 rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-md shadow-xl transition-all duration-350 group cursor-pointer overflow-hidden"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6, borderColor: "rgba(255, 255, 255, 0.15)" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                  >
                    <div className={`absolute top-0 left-0 w-24 h-24 ${cap.glow} blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="flex flex-col h-full justify-between relative z-10">
                      <div>
                        {/* Icon */}
                        <div className={`p-3 rounded-xl ${cap.iconBg} ${cap.color} w-fit mb-6 border border-white/5 transition-all duration-300 group-hover:scale-110 group-hover:border-white/10 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]`}>
                          <IconComponent className="h-6 w-6 transform group-hover:rotate-6 transition-transform duration-300" />
                        </div>
                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-3 font-display">
                          {cap.title}
                        </h3>
                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: INTEGRATIONS */}
        <section className="relative w-full border-t border-white/5 bg-[#070B14] py-20 px-4 sm:px-6 lg:px-8">
          {/* Soft gradient divider */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
          {/* Subtle background glow */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Info Column */}
              <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 w-fit">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-350 flex items-center gap-1">
                    <GitMerge className="h-3.5 w-3.5 text-cyan-400" />
                    PMS Integrations
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Compatible with your <br className="hidden sm:inline" />
                  Existing Schedulers
                </h2>

                <p className="text-base text-slate-400 leading-relaxed font-sans">
                  No need to abandon your current setups database or change workflows. Anvora locks directly into the industry-standard Practice Management Systems (PMS) dynamically.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Check className="h-4.5 w-4.5 text-teal-400 shrink-0" />
                    <span>Real-time appointment synchronization</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Check className="h-4.5 w-4.5 text-teal-400 shrink-0" />
                    <span>Automatic data ingestion without duplication</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Check className="h-4.5 w-4.5 text-teal-400 shrink-0" />
                    <span>Secure local bridge clients for legacy server clinics</span>
                  </div>
                </div>
              </div>

              {/* Integrations Grid Column */}
              <div className="lg:col-span-7 w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {integrations.map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="group relative flex flex-col p-4 rounded-xl border border-white/5 bg-slate-950/40 backdrop-blur-md hover:border-white/10 shadow-lg transition-all duration-300 text-center items-center justify-center min-h-[110px]"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 select-none px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded">
                        <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[7.5px] font-extrabold text-emerald-400 tracking-wider uppercase">Connected</span>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-900 border border-white/5 text-cyan-400 group-hover:text-teal-400 transition-colors duration-300 mb-2">
                        <Database className="h-4 w-4" />
                      </div>

                      <h4 className="text-sm font-bold text-white font-display">
                        {item.name}
                      </h4>
                      <p className="text-[9px] text-slate-400 mt-1">
                        {item.status}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: WORKFLOW DIAGRAM */}
        <section className="relative w-full border-t border-white/5 bg-[#070B14] py-20 px-4 sm:px-6 lg:px-8">
          {/* Soft gradient divider */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 w-fit mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-350 flex items-center gap-1">
                  <Workflow className="h-3.5 w-3.5 text-cyan-400" />
                  System Architecture
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                Information Routing Loop
              </h2>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
                Trace how patient inquiries are instantly qualified, validated against insurance parameters, and synced into scheduling systems.
              </p>
            </div>

            {/* Workflow Chart Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 items-stretch">
              {workflowSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col relative h-full">
                  <motion.div
                    className="flex-1 p-8 rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-md shadow-xl flex flex-col justify-between group hover:border-white/10 transition-colors duration-300"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-mono font-medium tracking-widest text-[#7DD3C0] bg-[#7DD3C0]/10 px-2 py-0.5 rounded border border-[#7DD3C0]/15 select-none">
                          PHASE {step.id}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                          {idx === 0 && "Outreach"}
                          {idx === 1 && "Decisions"}
                          {idx === 2 && "Verification"}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-3 font-display">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mb-4">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>

                  {/* Connectors pointing to the next step */}
                  {idx < 2 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-6 lg:-right-7 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-cyan-400 bg-slate-900 border border-white/10 rounded-full p-1"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </div>
                  )}
                  {idx < 2 && (
                    <div className="flex lg:hidden justify-center my-4 items-center pointer-events-none">
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        className="text-cyan-400 bg-slate-900 border border-white/10 rounded-full p-2"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: SECURITY & PRIVACY */}
        <section className="relative w-full border-t border-white/5 bg-[#070B14] py-20 px-4 sm:px-6 lg:px-8">
          {/* Soft gradient divider */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 w-fit mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-350 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                  Compliance Standards
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                Secure & HIPAA-Safe
              </h2>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
                Patient privacy guides every design choice we establish. We maintain rigorous standards to safeguard your practices Protected Health Information.
              </p>
            </div>

            {/* Security Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {securityFeatures.map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <motion.div
                    key={idx}
                    className="p-6 rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-md shadow-xl text-center flex flex-col items-center group hover:border-white/10 transition-colors duration-300"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-emerald-400 group-hover:text-teal-400 transition-colors duration-300 mb-5">
                      <IconComponent className="h-5 w-5" />
                    </div>

                    <h3 className="text-base font-bold text-white mb-3 font-display">
                      {feat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                      {feat.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 6: FAQ ACCORDION */}
        <section className="relative w-full border-t border-white/5 bg-[#070B14] py-20 px-4 sm:px-6 lg:px-8 pb-32">
          {/* Soft gradient divider */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
          {/* Subtle background glow */}
          <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 w-fit mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-355 flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                  Practice FAQs
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
                Common Clinic Inquiries
              </h2>
            </div>

            {/* Accordion container */}
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-900/30 transition-colors cursor-pointer select-none"
                    >
                      <span className="text-sm sm:text-base font-bold text-white font-display">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-cyan-400" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-1 border-t border-white/5 text-xs sm:text-sm text-slate-405 leading-relaxed font-sans">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
