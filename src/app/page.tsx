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
  UserCheck
} from "lucide-react";

// Cycle of dummy chat interface messages
const chatSimulator = [
  { sender: "patient", text: "Hi, do you have any openings for a dental cleaning tomorrow?" },
  { sender: "ai", text: "Let me check the live schedule... Yes! Dr. Miller has openings tomorrow at 10:00 AM and 2:30 PM. Would either of those work for you?" },
  { sender: "patient", text: "2:30 PM works great. Do you accept Cigna Dental?" },
  { sender: "ai", text: "Perfect! I've reserved the 2:30 PM cleaning slot. And yes, we accept Cigna PPO. I just sent a text with your intake form confirmation!" },
];

export default function Home() {
  const [displayedMessages, setDisplayedMessages] = useState<typeof chatSimulator>([chatSimulator[0]]);
  const [isTyping, setIsTyping] = useState(false);

  // Simple simulator loop to display chat messages one by one
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % (chatSimulator.length + 1);

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

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 relative z-10 w-full flex flex-col justify-center min-h-[85vh]">
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-200 hover:bg-slate-800 hover:text-white font-medium transition-all duration-300"
              >
                <MessageSquare className="h-4.5 w-4.5 text-cyan-400" />
                Explore Features
              </Link>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-900">
              <div>
                <p className="text-2xl font-bold text-white font-display">24/7</p>
                <p className="text-xs text-slate-350">Instant Response</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-display">3.2x</p>
                <p className="text-xs text-slate-350">Staff Hours Saved</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-display">99.4%</p>
                <p className="text-xs text-slate-350">Chat Accuracy</p>
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
            <div className="w-full max-w-[500px] h-[360px] rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden relative">

              {/* macOS Style Bar */}
              <div className="px-4 py-3 bg-slate-900/60 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-white/10" />
                  <div className="h-3 w-3 rounded-full bg-white/10" />
                  <div className="h-3 w-3 rounded-full bg-white/10" />
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
                    <div className="p-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="p-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="p-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="p-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer">
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
                        <p className="text-[10px] text-slate-400 flex items-center gap-1">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.35 }}
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
                          className="flex items-center gap-1.5 bg-slate-900 border border-white/5 px-3 py-2 rounded-xl rounded-bl-none w-14 mr-auto"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
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
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5,
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
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 4.2,
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
              className="absolute bottom-[-16px] left-16 rounded-xl border border-teal-500/20 bg-[#070B14]/90 px-3.5 py-2 text-[11px] text-slate-205 flex items-center gap-2 shadow-lg hover:border-teal-555/40 transition-colors z-20 select-none"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3.5,
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
      </main>
    </div>
  );
}
