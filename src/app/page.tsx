"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Calendar,
  MessageSquare,
  ArrowRight,
  Shield,
  Users,
  Check,
  Bot,
  Database,
  UserCheck,
  PhoneOff,
  Moon,
  Hourglass,
  ArrowLeftRight
} from "lucide-react";

// Cycle of dummy chat interface messages
const chatSimulator = [
  { sender: "patient", text: "Hi, do you have any openings for a dental cleaning tomorrow?" },
  { sender: "ai", text: "Let me check the live schedule... Yes! Dr. Miller has openings tomorrow at 10:00 AM and 2:30 PM. Would either of those work for you?" },
  { sender: "patient", text: "2:30 PM works great. Do you accept Cigna Dental?" },
  { sender: "ai", text: "Perfect! I've reserved the 2:30 PM cleaning slot. And yes, we accept Cigna PPO. I just sent a text with your intake form confirmation!" },
];

const missedCosts = [
  {
    title: "Missed Phone Calls",
    description: "Peak clinic hours leave front desks overloaded, leading to busy signals and voicemails. Most callers won't leave a message—they just try the next practice.",
    color: "text-cyan-400",
    border: "border-cyan-500/10 hover:border-cyan-500/30",
    glow: "bg-cyan-500/5",
    iconBg: "bg-cyan-950/30",
    icon: PhoneOff
  },
  {
    title: "After-Hours Opportunities",
    description: "Patient booking searches peaks in the evening when offices are closed. Without immediate capture, their interest cools and they contact available clinics.",
    color: "text-violet-400",
    border: "border-violet-500/10 hover:border-violet-500/30",
    glow: "bg-violet-500/5",
    iconBg: "bg-violet-950/30",
    icon: Moon
  },
  {
    title: "Slow Website Responses",
    description: "Traditional contact forms feel like black holes. When response times take hours or days, scheduling conversion drops as patience fades.",
    color: "text-emerald-400",
    border: "border-emerald-500/10 hover:border-emerald-500/30",
    glow: "bg-emerald-500/5",
    iconBg: "bg-emerald-950/30",
    icon: Hourglass
  },
  {
    title: "Competitor Routing",
    description: "Modern patients require instant booking confirmation. Slow response times encourage visitors to leave your site and schedule with local competitors.",
    color: "text-rose-400",
    border: "border-rose-500/10 hover:border-rose-500/35",
    glow: "bg-rose-500/5",
    iconBg: "bg-rose-950/30",
    icon: ArrowLeftRight
  }
];

const howItWorks = [
  {
    step: "01",
    title: "Patient Initiates Contact",
    description: "A patient visits your website day or night, or clicks a scheduling link. The virtual assistant launches immediately with zero delay.",
    details: ["24/7 client-side chat widget", "Friendly instant greetings", "Zero phone hold times"]
  },
  {
    step: "02",
    title: "AI Receptionist Responds",
    description: "The AI answers dental practice FAQs, qualifies lead information, and verifies insurance PPO eligibility automatically.",
    details: ["Instant insurance check", "Polished FAQ response database", "Smart routing for emergencies"]
  },
  {
    step: "03",
    title: "Syncs directly to PMS",
    description: "The AI writes the booking directly into your scheduler (Dentrix, Eaglesoft, etc.) and text-confirms details with the patient.",
    details: ["2-way real-time calendar sync", "Auto intake form delivery", "Zero receptionist data entry"]
  }
];

export default function Home() {
  const [displayedMessages, setDisplayedMessages] = useState<typeof chatSimulator>([chatSimulator[0]]);
  const [isTyping, setIsTyping] = useState(false);

  // Interactive Live Chat Demo State
  const [demoMessages, setDemoMessages] = useState<Array<{ sender: "patient" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: "Hi! Welcome to SmileBright Dental. I'm your virtual front desk assistant. 🦷 How can I help you today?"
    }
  ]);
  const [demoStep, setDemoStep] = useState(0);
  const [isDemoTyping, setIsDemoTyping] = useState(false);

  const handleDemoClick = (text: string, nextStep: number) => {
    setDemoMessages((prev) => [...prev, { sender: "patient", text }]);
    setDemoStep(nextStep);
    setIsDemoTyping(true);

    let aiResponse = "";
    if (nextStep === 1) {
      aiResponse = "Yes. We accept Delta Dental PPO. Would you like to schedule a cleaning?";
    } else if (nextStep === 2) {
      aiResponse = "I have openings at 2:00 PM and 3:30 PM.";
    } else if (nextStep === 3) {
      aiResponse = "I have openings next Tuesday at 9:00 AM and Thursday at 11:30 AM.";
    } else if (nextStep === 4) {
      aiResponse = "Perfect! I've reserved 2:00 PM tomorrow. I just sent a text with your intake form confirmation! See you then.";
    } else if (nextStep === 5) {
      aiResponse = "Perfect! I've reserved 3:30 PM tomorrow. I just sent a text with your intake form confirmation! See you then.";
    } else if (nextStep === 6) {
      aiResponse = "Perfect! I've reserved Tuesday at 9:00 AM next week. Look out for a text confirmation. Have a beautiful day!";
    } else if (nextStep === 7) {
      aiResponse = "Perfect! I've reserved Thursday at 11:30 AM next week. Look out for a text confirmation. Have a beautiful day!";
    }

    setTimeout(() => {
      setIsDemoTyping(false);
      setDemoMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    }, 1200);
  };

  const handleResetDemo = () => {
    setDemoMessages([
      {
        sender: "ai",
        text: "Hi! Welcome to SmileBright Dental. I'm your virtual front desk assistant. 🦷 How can I help you today?"
      }
    ]);
    setDemoStep(0);
    setIsDemoTyping(false);
  };

  // Simple simulator loop to display chat messages one by one
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % chatSimulator.length;

      if (index === 0) {
        // Reset chat preview
        setIsTyping(false);
        setDisplayedMessages([chatSimulator[0]]);
      } else if (index % 2 === 1) {
        // Patient message appears immediately
        setDisplayedMessages((prev) => [...prev, chatSimulator[index]]);
      } else {
        // AI message shows typing indicator first
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setDisplayedMessages((prev) => [...prev, chatSimulator[index]]);
        }, 1500);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#070B14] text-slate-100 relative overflow-hidden font-sans">

      {/* Decorative Blur Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-500/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-teal-500/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-emerald-500/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <main className="flex-1 w-full relative z-10 flex flex-col">

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-48 w-full flex flex-col justify-center min-h-[85vh]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

          {/* Hero Content Panel */}
          <motion.div
            className="lg:col-span-6 flex flex-col space-y-6 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Pill badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 w-fit">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-350 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400/25" />
                Live Demo Active
              </span>
            </div>

            {/* Main Header */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Never Miss a <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-teal-350 to-emerald-400 bg-clip-text text-transparent">
                Patient Call
              </span> Again
            </h1>

            {/* Description Paragraph */}
            <p className="text-base sm:text-lg text-slate-350 leading-relaxed max-w-lg font-sans">
              Anvora&apos;s AI Receptionist answers questions, verifies dental insurance, and schedules appointments directly into your PMS — operating 24/7 to automate your front desk.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/demo"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-550 to-blue-600 text-white font-medium shadow-lg shadow-blue-500/10 hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Calendar className="h-4.5 w-4.5" />
                Book a Demo
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200 font-medium transition-all duration-300"
              >
                <MessageSquare className="h-4.5 w-4.5 text-cyan-400" />
                Explore Features
              </Link>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-900">
              <div>
                <p className="text-2xl font-bold text-white font-display">24/7</p>
                <p className="text-xs text-slate-300 font-semibold">Instant Response</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-display">3.2x</p>
                <p className="text-xs text-slate-300 font-semibold">Staff Hours Saved</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-display">99.4%</p>
                <p className="text-xs text-slate-300 font-semibold">Chat Accuracy</p>
              </div>
            </div>
          </motion.div>

          {/* Interactive Mockup Panel */}
          <motion.div
            className="lg:col-span-6 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >

            {/* Dashboard Mockup Wrapper */}
            <div className="w-full max-w-[500px] h-[360px] rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden relative transition-all duration-500 hover:border-blue-500/20 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]">

              {/* macOS Style Bar */}
              <div className="px-4 py-3 bg-slate-900/60 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-white/10 hover:bg-rose-500 transition-colors duration-150 cursor-pointer" />
                  <div className="h-3 w-3 rounded-full bg-white/10 hover:bg-amber-500 transition-colors duration-150 cursor-pointer" />
                  <div className="h-3 w-3 rounded-full bg-white/10 hover:bg-emerald-500 transition-colors duration-150 cursor-pointer" />
                </div>
                <div className="text-[11px] font-medium text-slate-400 select-none tracking-wider uppercase">
                  Anvora Portal v1.0
                </div>
                <div className="w-12 h-3" />
              </div>

              {/* Inner Dashboard Body */}
              <div className="flex-1 flex overflow-hidden">

                {/* Left Mini Sidebar */}
                <div className="w-12 border-r border-white/5 bg-slate-950/50 flex flex-col items-center py-4 gap-4 justify-between select-none">
                  <div className="flex flex-col gap-4 items-center">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="p-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="p-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="p-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer">
                    <Shield className="h-4 w-4" />
                  </div>
                </div>

                {/* Right Chat Simulator View */}
                <div className="flex-1 flex flex-col bg-slate-900/20 p-4">
                  {/* Chat Area Header info */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-md bg-cyan-400/10 text-cyan-400 shrink-0">
                        <Bot className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-white">Dental Assistant AI</p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                          </span>
                          Ready for patient query
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full text-slate-400 border border-white/10 uppercase font-mono">
                      PMS Active
                    </span>
                  </div>

                  {/* Message Bubbles Container */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs select-none">
                    <AnimatePresence>
                      {displayedMessages.map((msg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className={`flex flex-col max-w-[85%] ${
                            msg.sender === "patient" ? "ml-auto items-end" : "mr-auto items-start"
                          }`}
                        >
                          <div
                            className={`px-3 py-2 rounded-xl leading-relaxed ${
                              msg.sender === "patient"
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-slate-900 border border-white/5 text-slate-200 rounded-bl-none"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}

                      {/* Typing indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-1.5 bg-slate-900 border border-cyan-500/20 px-3 py-2 rounded-xl rounded-bl-none w-fit mr-auto shadow-[0_0_15px_-3px_rgba(34,211,238,0.2)]"
                        >
                          <div className="flex gap-1 h-3 items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                          <span className="h-3 w-1 bg-cyan-400/80 rounded-sm animate-pulse ml-1 shrink-0" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </div>

            {/* FLOATING CARD 1: Appointment Booked */}
            <motion.div
              className="absolute -right-4 lg:-right-8 top-12 w-60 p-3 rounded-xl border border-blue-500/20 bg-[#070B14]/90 backdrop-blur-lg shadow-xl shadow-blue-950/20 flex gap-2.5 z-20 hover:border-blue-500/35 transition-all select-none"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 0.5, -0.5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <div className="p-2 rounded-lg bg-blue-500/10 text-cyan-400 shrink-0">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="text-[11px] leading-tight flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-semibold text-white">Appt Scheduled</span>
                  <span className="text-[9px] text-[#7DD3C0] font-medium bg-[#7DD3C0]/10 px-1 py-0.2 rounded font-mono">2:30 PM</span>
                </div>
                <p className="text-slate-200 mt-1 font-medium font-sans">Dental Cleaning</p>
                <div className="flex items-center gap-1 text-[9px] text-slate-400 mt-1 capitalize justify-between">
                  <span>Dr. Evelyn Miller</span>
                  <span>Sync Complete</span>
                </div>
              </div>
            </motion.div>

            {/* FLOATING CARD 2: Insurance Verified */}
            <motion.div
              className="absolute -left-6 lg:-left-12 bottom-16 w-52 p-3 rounded-xl border border-emerald-500/20 bg-[#070B14]/90 backdrop-blur-lg shadow-xl shadow-[#042f2e]/10 flex items-start gap-2.5 z-20 hover:border-emerald-500/35 transition-all select-none"
              animate={{
                y: [0, 8, 0],
                rotate: [0, -0.5, 0.5, 0]
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <UserCheck className="h-4 w-4" />
              </div>
              <div className="text-[11px] leading-tight flex-1">
                <div className="flex items-center justify-between text-white font-semibold">
                  <span>Insurance Verified</span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] text-slate-350 mt-1 px-1.5 py-0.5 rounded bg-emerald-950/20 border border-emerald-500/10 w-fit">
                  <Check className="h-2.5 w-2.5 text-emerald-400" />
                  <span>Cigna Dental PPO</span>
                </div>
                <p className="text-[8px] text-purple-400 mt-1.5 flex items-center gap-1 bg-purple-550/10 px-1 border border-purple-500/10 rounded w-fit">
                  Copay: $0
                </p>
              </div>
            </motion.div>

            {/* FLOATING CARD 3: PMS Syncing Status */}
            <motion.div
              className="absolute bottom-[-16px] left-16 rounded-xl border border-teal-500/20 bg-[#070B14]/90 px-3.5 py-2 text-[11px] text-slate-200 flex items-center gap-2 shadow-lg hover:border-teal-500/40 transition-colors z-20 select-none"
              animate={{
                y: [0, -5, 0],
                rotate: [0, 0.3, -0.3, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Database className="h-3.5 w-3.5 text-teal-400 animate-pulse" />
              <span className="text-slate-300"> PMS Hub: </span>
              <span className="font-semibold text-white">Dentrix, Open Dental, Eaglesoft</span>
            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* SECTION 1 — The Hidden Cost of Missed Patients */}
      <section className="relative w-full border-t border-white/5 bg-[#070B14] py-20 px-4 sm:px-6 lg:px-8">
        {/* Soft gradient divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 w-fit mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-350 flex items-center gap-1 animate-pulse">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                Practice Revenue Audit
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Every Missed Patient Inquiry <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-teal-350 to-emerald-400 bg-clip-text text-transparent">
                Costs Your Practice Revenue
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
              Unanswered phone calls, off-hour messages, and slow website contact forms lead directly to patient attrition. Here is how revenue slips away from clinic schedules.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missedCosts.map((cost, idx) => {
              const IconComponent = cost.icon;
              return (
                <motion.div
                  key={idx}
                  className={`relative flex flex-col justify-between p-6 rounded-2xl border ${cost.border} bg-slate-950/40 backdrop-blur-md shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className={`absolute top-0 left-0 w-24 h-24 ${cost.glow} blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div>
                    <div className={`p-3 rounded-xl ${cost.iconBg} ${cost.color} w-fit mb-6 border border-white/5`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-display">
                      {cost.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                      {cost.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2 — How Anvora Works */}
      <section className="relative w-full border-t border-white/5 bg-[#070B14] py-20 px-4 sm:px-6 lg:px-8">
        {/* Soft gradient divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-teal-500/15 to-transparent" />
        {/* Subtle background glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 w-fit mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-350 flex items-center gap-1">
                <Check className="h-3.5 w-3.5 text-teal-400" />
                Streamlined Operation
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              How Anvora Works
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
              Our AI receptionist integrates directly with your website and scheduling systems to convert leads into bookings automatically.
            </p>
          </div>

          {/* Timeline Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 relative z-10">
            {/* Dashed connector line for large screens */}
            <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-[1px] border-t border-dashed border-white/10 z-0" />

            {howItWorks.map((step, idx) => {
              return (
                <motion.div
                  key={idx}
                  className="relative flex flex-col p-8 rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-md shadow-xl z-10 group hover:border-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-display text-4xl font-extrabold bg-gradient-to-b from-blue-400/40 via-cyan-400/20 to-transparent bg-clip-text text-transparent select-none">
                      {step.step}
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-400 group-hover:text-primary transition-colors duration-300">
                      {idx === 0 && <MessageSquare className="h-5 w-5" />}
                      {idx === 1 && <Bot className="h-5 w-5" />}
                      {idx === 2 && <Calendar className="h-5 w-5" />}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-display">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mb-6 flex-1">
                    {step.description}
                  </p>

                  <ul className="space-y-2.5 border-t border-white/5 pt-5">
                    {step.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Live AI Conversation Demo */}
      <section className="relative w-full border-t border-white/5 bg-[#070B14] py-20 px-4 sm:px-6 lg:px-8 pb-32">
        {/* Soft gradient divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />
        {/* Subtle background glow */}
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Context & Copy */}
            <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 w-fit">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-350 flex items-center gap-1">
                  <Bot className="h-3.5 w-3.5 text-cyan-400" />
                  AI Receptionist Mockup
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Live AI Conversation Demo
              </h2>

              <p className="text-base text-slate-400 leading-relaxed font-sans">
                Experience the patient intake flow exactly as it occurs. Anvora responds immediately, validates insurance criteria, and prompts for open appointments directly from your schedules.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-md bg-blue-500/10 text-cyan-400 shrink-0 mt-0.5 border border-blue-500/15">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-display">Instant Eligibility Check</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Scans details to confirm network statuses (like Delta Dental PPO) inside the conversation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-md bg-teal-500/10 text-emerald-400 shrink-0 mt-0.5 border border-teal-500/15">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-display font-bold">Live Scheduler Calendar Sync</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Queries your active booking system to display real, unscheduled slots in real-time.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-md bg-violet-500/10 text-violet-400 shrink-0 mt-0.5 border border-violet-500/15">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-display">Automatic PMS Sync</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Instantly maps successfully qualified slots into the Practice Management System upon confirmation.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/demo"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-200 hover:bg-slate-800 hover:text-white font-medium transition-all duration-300"
                >
                  Schedule Demo
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive Chat Simulation Widget */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full max-w-[500px] h-[400px] rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden relative">

                {/* macOS Style Bar */}
                <div className="px-4 py-3 bg-slate-900/60 border-b border-white/5 flex items-center justify-between shrink-0 select-none">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-white/10" />
                    <div className="h-3 w-3 rounded-full bg-white/10" />
                    <div className="h-3 w-3 rounded-full bg-white/10" />
                  </div>
                  <div className="text-[10px] font-medium text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                    <Bot className="h-3.5 w-3.5 text-cyan-400" />
                    Anvora Practice Assistant
                  </div>
                  <div className="w-12 h-3" />
                </div>

                {/* Messages Container */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 pr-1 text-slate-200">
                  {demoMessages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === "patient" ? "ml-auto items-end" : "mr-auto items-start"
                      }`}
                    >
                      <div
                        className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          msg.sender === "patient"
                            ? "bg-blue-600 text-white rounded-tr-none"
                            : "bg-slate-900 border border-white/5 text-slate-200 rounded-tl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isDemoTyping && (
                    <div className="flex items-center gap-1.5 bg-slate-900 border border-white/5 px-3.5 py-2.5 rounded-2xl rounded-tl-none w-14 mr-auto">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </div>

                {/* Suggestions Control Bar */}
                <div className="p-4 bg-slate-900/60 border-t border-white/5 flex flex-col gap-2 shrink-0">
                  {demoStep !== 4 && demoStep !== 5 && demoStep !== 6 && demoStep !== 7 && !isDemoTyping && (
                    <div className="text-[9px] text-slate-400 uppercase select-none tracking-widest font-mono mb-1">
                      Choose patient response:
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence mode="wait">
                      {demoStep === 0 && !isDemoTyping && (
                        <motion.button
                          key="opt-0"
                          onClick={() => handleDemoClick("Do you accept Delta Dental?", 1)}
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-500/10 border border-blue-500/35 text-cyan-400 hover:bg-blue-500/20 transition-all cursor-pointer font-sans"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          &quot;Do you accept Delta Dental?&quot;
                        </motion.button>
                      )}

                      {demoStep === 1 && !isDemoTyping && (
                        <div key="opts-1" className="flex flex-wrap gap-2">
                          <motion.button
                            onClick={() => handleDemoClick("Tomorrow afternoon.", 2)}
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-500/10 border border-blue-500/35 text-cyan-400 hover:bg-blue-500/20 transition-all cursor-pointer font-sans"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            &quot;Tomorrow afternoon.&quot;
                          </motion.button>
                          <motion.button
                            onClick={() => handleDemoClick("Maybe next week.", 3)}
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 border border-white/5 text-slate-350 hover:bg-slate-700 transition-all cursor-pointer font-sans"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            &quot;Maybe next week.&quot;
                          </motion.button>
                        </div>
                      )}

                      {demoStep === 2 && !isDemoTyping && (
                        <div key="opts-2" className="flex flex-wrap gap-2">
                          <motion.button
                            onClick={() => handleDemoClick("2:00 PM works best.", 4)}
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-500/10 border border-blue-500/35 text-cyan-400 hover:bg-blue-500/20 transition-all cursor-pointer font-sans"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            &quot;2:00 PM works best&quot;
                          </motion.button>
                          <motion.button
                            onClick={() => handleDemoClick("3:30 PM works best.", 5)}
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-500/10 border border-blue-500/35 text-cyan-400 hover:bg-blue-500/20 transition-all cursor-pointer font-sans"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            &quot;3:30 PM works best&quot;
                          </motion.button>
                        </div>
                      )}

                      {demoStep === 3 && !isDemoTyping && (
                        <div key="opts-3" className="flex flex-wrap gap-2">
                          <motion.button
                            onClick={() => handleDemoClick("Monday at 9:00 AM.", 6)}
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-500/10 border border-blue-500/35 text-cyan-400 hover:bg-blue-500/20 transition-all cursor-pointer font-sans"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            &quot;Monday at 9:00 AM&quot;
                          </motion.button>
                          <motion.button
                            onClick={() => handleDemoClick("Tuesday at 11:00 AM.", 7)}
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-500/10 border border-blue-500/35 text-cyan-400 hover:bg-blue-500/20 transition-all cursor-pointer font-sans"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            &quot;Tuesday at 11:00 AM&quot;
                          </motion.button>
                        </div>
                      )}

                      {(demoStep === 4 || demoStep === 5 || demoStep === 6 || demoStep === 7) && !isDemoTyping && (
                        <motion.div
                          key="opts-terminal"
                          className="flex items-center justify-between w-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                            Booking Synced to Practice Management System!
                          </span>
                          <button
                            onClick={handleResetDemo}
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 border border-white/10 text-white hover:bg-slate-700 transition-all cursor-pointer"
                          >
                            Reset Demo
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      </main>
    </div>
  );
}
