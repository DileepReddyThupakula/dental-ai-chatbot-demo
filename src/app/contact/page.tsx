"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Globe,
  CheckCircle,
  ShieldAlert,
  Calendar
} from "lucide-react";

interface InfoCard {
  title: string;
  description: string;
  email: string;
  phone?: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const contactCards: InfoCard[] = [
  {
    title: "Sales & Demo",
    description: "Interested in automating your front desk? Contact our consulting team for custom plan options and group pricing.",
    email: "sales@anvora.ai",
    phone: "+1 (888) 325-0199",
    badge: "15 min response time",
    icon: Calendar
  },
  {
    title: "Practice Support",
    description: "Current clinic partner needing help with Dentrix/Eaglesoft PMS sync, widget installs, or BAA signing?",
    email: "support@anvora.ai",
    badge: "2-hour reply SLA",
    icon: ShieldAlert
  },
  {
    title: "Partnerships & DSOs",
    description: "Representing a DSO group, dental school, custom PMS provider, or scaling brand? Let's connect.",
    email: "partners@anvora.ai",
    badge: "DSO Custom Integrations",
    icon: GitMergeIcon
  }
];

// Helper mock icon for GitMerge if not imported, let's use Globe/Building or custom SVG.
function GitMergeIcon({ className }: { className?: string }) {
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
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 15V9a4 4 0 0 0-4-4H9" />
      <line x1="6" y1="9" x2="6" y2="15" />
    </svg>
  );
}

interface FAQ {
  question: string;
  answer: string;
}

const contactFaqs: FAQ[] = [
  {
    question: "What is your support response timeline?",
    answer: "Every clinic using Anvora has access to priority queue customer support. General inquiries are replied to within 24 hours. Practices on our Professional and Enterprise tiers receive support under SLA guidelines (2 hours and 30 minutes, respectively)."
  },
  {
    question: "Do you sign Business Associate Agreements (BAAs) for HIPAA?",
    answer: "Yes, absolutely. We sign standard HIPAA-compliant Business Associate Agreements with all of our practice owners prior to connecting schedules and PMS databases. Patient safety is our primary focus."
  },
  {
    question: "Can we book a consultation call over the weekend?",
    answer: "Our direct sales team operates Monday through Friday from 8:00 AM to 6:00 PM EST. However, Anvora's own virtual dental assistant runs 24/7. You can book an appointment automatically with Anvora online anytime."
  },
  {
    question: "Do you offer physical in-person training for dental staff?",
    answer: "Yes! For large clinic groups and DSO organizations, we plan on-site onboarding sprints led by our implementation partners. Boutique single-office units typically find our virtual onboarding process complete and straightforward."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    practiceName: "",
    website: "",
    subject: "sales",
    message: ""
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
      subject: "sales",
      message: ""
    });
    setFormSubmitted(false);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#070B14] text-slate-100 relative overflow-hidden font-sans">
      {/* Background radial blobs */}
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
                Connect With Anvora
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              We&apos;re Here to Help <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Automate Your Front Desk
              </span>
            </h1>

            <p className="text-lg text-slate-350 max-w-2xl leading-relaxed font-sans">
              Have questions about integrating with your PMS, custom requirements, or HIPAA security measures? Send us a message or schedule a direct consultation today.
            </p>
          </motion.div>
        </section>

        {/* Separator line */}
        <div className="relative w-full mb-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
        </div>

        {/* TWO COLUMN CONTENT SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* LEFT COLUMN: Contact Forms (7 cols) */}
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
                      key="contact-form"
                      onSubmit={handleSubmit}
                      className="space-y-6 relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold font-display text-white">Send Us a Message</h2>
                        <p className="text-sm text-slate-400 font-sans">Our practice operations experts will reply shortly.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name Input */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Full Name</label>
                          <input
                            required
                            type="text"
                            placeholder="Dr. Sarah Miller"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                          />
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Work Email</label>
                          <input
                            required
                            type="email"
                            placeholder="sarah.miller@myclinic.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Phone Input */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Phone Number</label>
                          <input
                            required
                            type="tel"
                            placeholder="(555) 019-2831"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                          />
                        </div>

                        {/* Practice Name Input */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Practice Name</label>
                          <input
                            required
                            type="text"
                            placeholder="Apex Dental Care"
                            value={formData.practiceName}
                            onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Website Input */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Website <span className="text-slate-500">(Optional)</span></label>
                          <input
                            type="url"
                            placeholder="https://apexdentalcare.com"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                          />
                        </div>

                        {/* Subject Selector */}
                        <div className="space-y-2 font-sans">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Subject</label>
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all cursor-pointer select-none appearance-none"
                            style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`, backgroundPosition: 'right 16px center', backgroundRepeat: 'no-repeat' }}
                          >
                            <option className="bg-[#070B14] text-white" value="sales">Product Sales & Plans</option>
                            <option className="bg-[#070B14] text-white" value="support">Partner Technical Support</option>
                            <option className="bg-[#070B14] text-white" value="partners">DSO & Corporate Partnerships</option>
                            <option className="bg-[#070B14] text-white" value="general">General Inquiry</option>
                          </select>
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="space-y-2 font-sans">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Your Message</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell us about your clinic setup, scheduling tools, or how we can assist..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-white/5 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                      >
                        {formLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Sending Message...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 font-sans">
                            Send Secure Inquiry
                            <ArrowRight className="h-4.5 w-4.5" />
                          </span>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-card"
                      className="text-center py-10 relative z-10 space-y-6 flex flex-col items-center justify-center font-sans"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)] animate-bounce mb-2">
                        <CheckCircle className="h-10 w-10 text-emerald-400" />
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold font-display text-white">Inquiry Received Successfully</h2>
                        <p className="text-sm text-slate-400 max-w-sm">
                          Thanks, <strong className="text-white font-medium">{formData.name}</strong>. An Anvora practice operations expert will review your message and reach out to you at <strong className="text-white font-medium">{formData.email}</strong> shortly.
                        </p>
                      </div>

                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white transition-all text-xs font-semibold cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Contact Info Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {contactCards.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <motion.div
                    key={idx}
                    className="p-6 rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-md shadow-xl flex flex-col justify-between relative group hover:border-white/10 transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-cyan-400 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-base font-bold text-white font-display leading-none">{card.title}</h4>
                          {card.badge && (
                            <span className="inline-block px-2 py-0.5 rounded bg-cyan-400/10 text-[9px] uppercase tracking-wider font-extrabold text-cyan-400 border border-cyan-400/20 shrink-0">
                              {card.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 font-sans leading-relaxed">{card.description}</p>

                        <div className="space-y-1 pt-3 text-xs sm:text-sm font-sans border-t border-white/5 mt-3">
                          <div className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                            <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <a href={`mailto:${card.email}`} className="font-mono">{card.email}</a>
                          </div>
                          {card.phone && (
                            <div className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors pt-1">
                              <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              <a href={`tel:${card.phone.replace(/\s+/g, '')}`} className="font-mono">{card.phone}</a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* General Channels Info Card */}
              <motion.div
                className="p-6 rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-md shadow-xl space-y-4 text-xs font-sans"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
                  <Clock className="h-4.5 w-4.5 text-teal-400" />
                  <h4 className="text-sm font-bold text-white font-display">Regular Support Hours</h4>
                </div>
                <div className="space-y-2 text-slate-350">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-mono text-white">8:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span className="text-slate-400 italic">Support ticket queue active</span>
                  </div>
                  <div className="text-[10px] text-slate-500 italic pt-1 leading-relaxed border-t border-white/5 mt-2">
                    *Anvora Virtual Assistant services operate autonomously 24/7/365 to handle patient scheduling.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Separator line */}
        <div className="relative w-full my-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-teal-500/15 to-transparent" />
        </div>

        {/* COMPANY LOCATION & MAP SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="p-8 md:p-12 rounded-[32px] border border-white/5 bg-slate-950/40 backdrop-blur-md relative overflow-hidden">
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-teal-500/5 blur-[50px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Office info (5 cols) */}
              <div className="lg:col-span-5 space-y-6 text-left relative z-10">
                <span className="text-xs font-semibold tracking-widest text-teal-400 uppercase">Anvora Operations</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">Our Headquarters</h3>
                <p className="text-sm text-slate-405 leading-relaxed font-sans max-w-sm text-slate-400">
                  We are based in the heart of San Francisco, California. Our engineering and integration support groups manage practice sync networks nationwide.
                </p>

                <div className="space-y-4 pt-3 font-sans">
                  <div className="flex items-start gap-3 text-slate-300">
                    <MapPin className="h-5 w-5 text-cyan-405 mt-0.5 shrink-0 text-cyan-400" />
                    <div>
                      <p className="font-semibold text-white">Anvora Labs Inc.</p>
                      <p className="text-xs text-slate-400 mt-0.5 font-mono leading-relaxed">
                        100 Pine Street, Suite 1250<br />
                        San Francisco, CA 94111<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <Globe className="h-5 w-5 text-teal-405 shrink-0 text-teal-450" />
                    <span className="text-xs font-mono font-medium">www.anvora.ai</span>
                  </div>
                </div>
              </div>

              {/* Map Placeholder/Component (7 cols) */}
              <div className="lg:col-span-7 w-full h-[320px] rounded-2xl border border-white/10 bg-slate-900/60 relative overflow-hidden backdrop-blur-sm select-none">
                {/* Simulated geographic grids or connections */}
                <div className="absolute inset-0 bg-[#070b14]/90 opacity-80" />

                {/* SVG styled vector radar grid mapping */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] opacity-70" />

                {/* Ambient glow in center under pinning dot */}
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none" />

                {/* Connection lines using vectors */}
                <svg className="absolute inset-0 w-full h-full text-slate-800" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3">
                  {/* SF to NY */}
                  <line x1="33%" y1="50%" x2="70%" y2="40%" className="text-cyan-500/20 stroke-current animate-pulse" />
                  {/* SF to TX */}
                  <line x1="33%" y1="50%" x2="52%" y2="68%" className="text-teal-500/20 stroke-current animate-pulse" />
                  {/* SF to Chicago */}
                  <line x1="33%" y1="50%" x2="62%" y2="46%" className="text-blue-500/20 stroke-current animate-pulse" />
                </svg>

                {/* Connection nodes/glowing targets */}
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 shrink-0 z-10 flex flex-col items-center">
                  <span className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-cyan-500/10 border border-cyan-400/50 justify-center items-center">
                      <span className="h-2 w-2 bg-cyan-400 rounded-full" />
                    </span>
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-cyan-400 mt-1.5 px-1.5 py-0.5 rounded bg-slate-950/80 border border-white/5 font-mono shadow-md">
                    SF Labs (HQ)
                  </span>
                </div>

                {/* Satellite nodes */}
                <div className="absolute top-[40%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center opacity-70">
                  <span className="relative flex h-3 w-3">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-900 border border-white/20 justify-center items-center">
                      <span className="h-1 w-1 bg-white/40 rounded-full" />
                    </span>
                  </span>
                  <span className="text-[8px] font-medium text-slate-500 mt-1 font-mono">NY Node</span>
                </div>

                <div className="absolute top-[68%] left-[52%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center opacity-70">
                  <span className="relative flex h-3 w-3">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-900 border border-white/20 justify-center items-center">
                      <span className="h-1 w-1 bg-white/40 rounded-full" />
                    </span>
                  </span>
                  <span className="text-[8px] font-medium text-slate-500 mt-1 font-mono">TX Node</span>
                </div>

                {/* Overlay warning about mock */}
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-slate-950/70 border border-white/5 rounded-lg text-[10px] text-slate-400 font-mono">
                  Map Server Active (Vector Simulation)
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Separator line */}
        <div className="relative w-full my-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
        </div>

        {/* FAQ ACCORDION SECTION */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Contact FAQ</span>
            <h3 className="text-3xl sm:text-4xl font-bold text-white font-display">Common Support Inquiries</h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
              Have questions about contacting our operations and technical support desks?
            </p>
          </div>

          <div className="space-y-4">
            {contactFaqs.map((faq, index) => {
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
                    <span className="font-semibold text-sm sm:text-base text-slate-205 tracking-wide font-display">
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
        </div>

        {/* FINAL CALL TO ACTION */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="p-8 md:p-12 rounded-[32px] border border-white/10 bg-slate-950/60 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col items-center">
            {/* Glow blobs inside CTA */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />

            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-4">See Anvora In Action</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
              Schedule Your Live Practice Demo
            </h2>
            <p className="text-sm text-slate-400 max-w-lg mb-8 leading-relaxed font-sans">
              Watch Anvora interview patient inquiries, cross-check regional insurance eligibility, and schedule directly into Dentrix, Eaglesoft, or Open Dental.
            </p>

            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/15 hover:-translate-y-0.5 transition-all duration-350 cursor-pointer font-sans"
            >
              <Calendar className="h-4.5 w-4.5" />
              Schedule Virtual Tour
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
