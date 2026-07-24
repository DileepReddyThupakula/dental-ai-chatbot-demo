"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Monitor,
  ShieldCheck,
  Database,
  TrendingUp,
  Check
} from "lucide-react";

interface TimelineStep {
  number: string;
  title: string;
  desc: string;
}

const timelineSteps: TimelineStep[] = [
  {
    number: "01",
    title: "Request a Booking",
    desc: "Submit your practice configurations, current PMS context, and preferred times using our secure booking form."
  },
  {
    number: "02",
    title: "Calendar Confirmation",
    desc: "Our onboarding consultant team reviews your PMS setup and delivers a calendar calendar invite link."
  },
  {
    number: "03",
    title: "Live Walkthrough (25m)",
    desc: "Experience a screen-shared live demo of Anvora's chatbot booking, checking eligibility, and writing appointments."
  },
  {
    number: "04",
    title: "Custom Launch Blueprint",
    desc: "Receive a personalized ROI dashboard report and a step-by-step roadmap to integrate Anvora in your office."
  }
];

interface DemoTopic {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const demoTopics: DemoTopic[] = [
  {
    title: "24/7 Virtual Receptionist",
    desc: "Watch the AI assistant answer core clinic FAQs, qualify symptoms, and navigate conversational threads automatically.",
    icon: Monitor
  },
  {
    title: "Live PPO Insurance Verification",
    desc: "See how the AI checks patient PPO rules (like Delta Dental) in-conversation, saving dental staff hours of telephone verifications.",
    icon: ShieldCheck
  },
  {
    title: "Native 2-Way PMS Scheduler Sync",
    desc: "Witness real-time read and write sync loops with offline PM systems (Dentrix, Eaglesoft, Open Dental).",
    icon: Database
  },
  {
    title: "Real-Time practice Analytics",
    desc: "Tour the practice portal dashboard where saved patient calls, verified plans, and ROI multipliers are detailed.",
    icon: DynamicChartIcon
  }
];

// Helper mock icon for charts
function DynamicChartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

interface DemoFaq {
  question: string;
  answer: string;
}

const demoFaqs: DemoFaq[] = [
  {
    question: "Is the Anvora consultation and demo free?",
    answer: "Yes, completely. There are no consultation fees or commitments required. Our goal is to showcase Anvora's live capabilities and identify if it fits your scheduling rules."
  },
  {
    question: "Do I need my IT coordinator on the demo call?",
    answer: "No, that is not necessary. The demo is a non-technical walkthrough of how Anvora works. When you sign up, our teams manage PMS bridges directly with your local IT contact."
  },
  {
    question: "How long does the virtual demo take?",
    answer: "Our standard live walkthrough takes exactly 25 minutes. We respect your practice schedule and leave plenty of room at the end to answer customized billing or integration queries."
  },
  {
    question: "Can we test Anvora with our own clinic's rules during the demo?",
    answer: "Absolutely! We can configure a test assistant in real-time using your clinic's parameters (office hours, doctors, services) so you can interact with it on your phone during the call."
  }
];

const compatiblePms = [
  "Dentrix (G4 - G7)",
  "Eaglesoft",
  "Open Dental",
  "Dentrix Ascend",
  "Curve Dental",
  "Carestream Dental",
  "CS PracticeWorks",
  "Ortho2",
  "Tab 32"
];

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    practiceName: "",
    website: "",
    locations: "1",
    currentPms: "",
    patientVolume: "under-100",
    date: "",
    time: "",
    notes: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    // Simulate API fetch delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFormLoading(false);
    setFormSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      practiceName: "",
      website: "",
      locations: "1",
      currentPms: "",
      patientVolume: "under-100",
      date: "",
      time: "",
      notes: ""
    });
    setFormSubmitted(false);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#070B14] text-slate-100 relative overflow-hidden font-sans">
      {/* Decorative radial glows */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-500/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-teal-500/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-emerald-500/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <main className="flex-1 w-full relative z-10 flex flex-col pt-20 pb-32">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6 flex flex-col items-center"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 w-fit mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-350 flex items-center gap-1 font-sans">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400/25 animate-pulse" />
                Live Walkthrough
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              See Anvora Automate <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Your Practice Front Desk
              </span>
            </h1>

            <p className="text-lg text-slate-350 max-w-2xl leading-relaxed font-sans">
              Watch Anvora qualify leads, verify PPO insurance networks, and write appointments directly into schedules in real-time, operating 24/7.
            </p>
          </motion.div>
        </section>

        {/* Separator line */}
        <div className="relative w-full mb-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
        </div>

        {/* TWO COLUMN BOOKING GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* LEFT COLUMN: Demo Form (7 cols) */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-8 md:p-10 rounded-[32px] border border-white/5 bg-slate-950/40 backdrop-blur-md relative overflow-hidden"
              >
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/5 blur-[50px] rounded-full pointer-events-none" />

                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form
                      key="demo-form"
                      onSubmit={handleSubmit}
                      className="space-y-6 relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold font-display text-white">Book a Technical Walkthrough</h2>
                        <p className="text-sm text-slate-400 font-sans">Select a slot on our scheduling board for an operations sync.</p>
                      </div>

                      {/* Contact Fields Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-350">Your Name</label>
                          <input
                            required
                            type="text"
                            placeholder="Dr. Evelyn Miller"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-350">Work Email</label>
                          <input
                            required
                            type="email"
                            placeholder="evelyn@smilesclinic.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Phone */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-350">Phone Number</label>
                          <input
                            required
                            type="tel"
                            placeholder="(555) 018-4299"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                          />
                        </div>

                        {/* Practice Name */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-350">Practice Name</label>
                          <input
                            required
                            type="text"
                            placeholder="Smile Clinic Partners"
                            value={formData.practiceName}
                            onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Website */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-350">Website</label>
                          <input
                            required
                            type="url"
                            placeholder="https://smilesclinic.com"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                          />
                        </div>

                        {/* Number of Locations */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-350">Number of Locations</label>
                          <select
                            value={formData.locations}
                            onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all cursor-pointer select-none appearance-none"
                            style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`, backgroundPosition: 'right 16px center', backgroundRepeat: 'no-repeat' }}
                          >
                            <option className="bg-[#070B14] text-white" value="1">1 Office / Practice</option>
                            <option className="bg-[#070B14] text-white" value="2-4">2 - 4 Offices</option>
                            <option className="bg-[#070B14] text-white" value="5-10">5 - 10 Offices</option>
                            <option className="bg-[#070B14] text-white" value="11+">DSO Group (11+ sites)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Current PMS */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-350">Current PMS</label>
                          <input
                            required
                            type="text"
                            placeholder="e.g. Dentrix, Eaglesoft, Open Dental"
                            value={formData.currentPms}
                            onChange={(e) => setFormData({ ...formData, currentPms: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                          />
                        </div>

                        {/* Patient Volume */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-350">Monthly Patient Volume</label>
                          <select
                            value={formData.patientVolume}
                            onChange={(e) => setFormData({ ...formData, patientVolume: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all cursor-pointer select-none appearance-none"
                            style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`, backgroundPosition: 'right 16px center', backgroundRepeat: 'no-repeat' }}
                          >
                            <option className="bg-[#070B14] text-white" value="under-150">&lt; 150 incoming enquiries / mo</option>
                            <option className="bg-[#070B14] text-white" value="150-500">150 - 500 patients / mo</option>
                            <option className="bg-[#070B14] text-white" value="500-1000">500 - 1,000 patients / mo</option>
                            <option className="bg-[#070B14] text-white" value="1000+">1,000+ patients / mo</option>
                          </select>
                        </div>
                      </div>

                      {/* Scheduling Preference Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
                        {/* Preferred Date */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-350">Preferred Date</label>
                          <input
                            required
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all cursor-pointer"
                          />
                        </div>

                        {/* Preferred Time */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-350">Preferred Time</label>
                          <select
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all cursor-pointer select-none appearance-none"
                            style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`, backgroundPosition: 'right 16px center', backgroundRepeat: 'no-repeat' }}
                          >
                            <option className="bg-[#070B14] text-white" value="">Select Preferred Time</option>
                            <option className="bg-[#070B14] text-white" value="morning-early">Morning (8:30 AM - 11:30 AM)</option>
                            <option className="bg-[#070B14] text-white" value="mid-day">Mid-Day (11:30 AM - 2:30 PM)</option>
                            <option className="bg-[#070B14] text-white" value="afternoon">Afternoon (2:30 PM - 5:30 PM)</option>
                          </select>
                        </div>
                      </div>

                      {/* Notes / Comments */}
                      <div className="space-y-2 font-sans">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-350">Custom Notes</label>
                        <textarea
                          placeholder="Tell us about any specific scheduling guidelines or PPO verification preferences..."
                          rows={2}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                      >
                        {formLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Requesting Board Sync...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 font-sans">
                            Book Live Demo Consultation
                            <ArrowRight className="h-4.5 w-4.5" />
                          </span>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-demo"
                      className="text-center py-10 relative z-10 space-y-6 flex flex-col items-center justify-center font-sans"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)] animate-bounce mb-2">
                        <CheckCircle className="h-10 w-10 text-emerald-400" />
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold font-display text-white">Demo Booking Requested</h2>
                        <p className="text-sm text-slate-400 max-w-sm">
                          Thanks, <strong className="text-white font-medium">{formData.name}</strong>! We have logged your request. We will reach out to you at <strong className="text-white font-medium">{formData.email}</strong> shortly with your calendar invite and consultation details.
                        </p>
                      </div>

                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white transition-all text-xs font-semibold cursor-pointer"
                      >
                        Edit / Submit Another Request
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Benefits & Integrations (5 cols) */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-xs font-semibold tracking-widest text-[#7DD3C0] uppercase">Practice Benefits</span>
                <h3 className="text-2xl font-bold font-display text-white">Why Book a Live Demo?</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-sans">
                  Dental offices lose up to $12K/month in missed phone opportunities. Our consult walkthrough maps out how your team can capture patients 24/7.
                </p>
              </div>

              {/* Benefits list */}
              <div className="space-y-5 font-sans">
                <div className="flex gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-cyan-400 shrink-0 h-fit">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-display">Interactive AI Sandbox</h4>
                    <p className="text-xs text-slate-450 text-slate-400 mt-1 leading-relaxed">Interact with a customized assistant optimized for your practice during the virtual call.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-violet-400 shrink-0 h-fit">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-display">PMS Sync Details</h4>
                    <p className="text-xs text-slate-450 text-slate-400 mt-1 leading-relaxed">Learn about secure write-back sync methods for offline databases (Dentrix, Eaglesoft, Open Dental).</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-emerald-400 shrink-0 h-fit">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-display">Personalized ROI Audit</h4>
                    <p className="text-xs text-slate-450 text-slate-400 mt-1 leading-relaxed">Calculate exact patient revenue recovery benchmarks based on your actual monthly caller volume.</p>
                  </div>
                </div>
              </div>

              {/* Security lock callout */}
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 text-xs text-slate-400 flex items-start gap-3">
                <ShieldCheck className="h-4.5 w-4.5 text-teal-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  Your data security is guaranteed. We sign standard business associate agreements (BAAs) prior to any PMS read connections.
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Separator line */}
        <div className="relative w-full my-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
        </div>

        {/* "WHAT HAPPENS NEXT" TIMELINE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-[#7DD3C0] uppercase">Launch Timeline</span>
            <h3 className="text-3xl sm:text-4xl font-bold text-white font-display">What Happens Next?</h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
              From demo request to live front-desk automation in four simple stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Timeline connector lines (Desktop) */}
            <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[1px] border-t border-dashed border-white/10 z-0" />

            {timelineSteps.map((step, idx) => (
              <motion.div
                key={idx}
                className="relative p-6 rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-md shadow-xl flex flex-col justify-between group hover:border-white/10 transition-colors z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-display text-3xl font-extrabold bg-gradient-to-b from-blue-400/40 to-transparent bg-clip-text text-transparent select-none">
                      {step.number}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-900 border border-white/5 text-slate-500 w-fit">
                      <Check className="h-4 w-4 text-cyan-400" />
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2 font-display">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Separator line */}
        <div className="relative w-full my-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
        </div>

        {/* "DURING THE DEMO" TOPICS SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Interactive Agenda</span>
            <h3 className="text-3xl sm:text-4xl font-bold text-white font-display">What We Cover in the Tour</h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
              A detailed tour of the virtual receptionist platform and operational parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoTopics.map((topic, idx) => {
              const IconComponent = topic.icon;
              return (
                <motion.div
                  key={idx}
                  className="p-6 rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-md shadow-xl flex flex-col justify-between group hover:border-white/10 hover:-translate-y-1 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-cyan-450 tracking-wider text-cyan-400 w-fit mb-5 group-hover:scale-105 transition-transform">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-2 font-display">{topic.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">{topic.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Separator line */}
        <div className="relative w-full my-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />
        </div>

        {/* COMPATIBLE PMS SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="p-8 md:p-12 rounded-[32px] border border-white/5 bg-slate-950/40 backdrop-blur-md相对 relative overflow-hidden text-center flex flex-col items-center">
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none" />

            <span className="text-xs font-semibold tracking-widest text-[#7DD3C0] uppercase mb-3">Sync Compatibility</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mb-8">Scheduling Software Synchronized</h3>

            {/* PMS grids */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl font-sans w-full">
              {compatiblePms.map((pms, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-white/5 bg-slate-900/50 text-slate-300 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 hover:border-white/10 transition-colors uppercase font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-450 bg-emerald-400 animate-pulse" />
                  {pms}
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 italic mt-6 leading-relaxed font-sans">
              *Don&apos;t see your scheduling system? Contact sales to coordinate customized DSO server bridges.
            </p>
          </div>
        </section>

        {/* Separator line */}
        <div className="relative w-full my-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
        </div>

        {/* DEMO FAQS ACCORDION */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Consult FAQ</span>
            <h3 className="text-3xl sm:text-4xl font-bold text-white font-display">walkthrough Inquiries</h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
              Have questions about booking or attending a live walkthrough?
            </p>
          </div>

          <div className="space-y-4">
            {demoFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-cyan-500/30 bg-slate-900/40"
                      : "border-white/5 bg-slate-950/40 hover:border-white/10"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left py-5 px-6 sm:px-8 flex justify-between items-center gap-4 cursor-pointer focus:outline-none select-none"
                  >
                    <span className="font-semibold text-sm sm:text-base text-slate-200 tracking-wide font-display">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`p-1 rounded-full border border-white/10 shrink-0 ${
                        isOpen ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" : "bg-slate-900 text-slate-400"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
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
                        <div className="pb-6 px-6 sm:px-8 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4 font-sans">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Separator line */}
        <div className="relative w-full my-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-teal-500/15 to-transparent" />
        </div>

        {/* FINAL TRUST STRIP / CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="p-8 md:p-12 rounded-[32px] border border-white/10 bg-slate-950/60 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col items-center">
            {/* Glow blobs inside CTA */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />

            <span className="text-xs font-semibold tracking-widest text-[#7DD3C0] uppercase mb-4">Immediate Practice Return</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
              Stop Missed Patient Calls Today
            </h2>
            <p className="text-sm text-slate-400 max-w-lg mb-8 leading-relaxed font-sans">
              Interested in custom solutions or integrations pricing? Get in touch with our consulting team.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 border border-white/10 text-slate-205 hover:bg-slate-800 hover:text-white font-semibold transition-all duration-300 shadow-md cursor-pointer font-sans"
            >
              Contact Practice Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
