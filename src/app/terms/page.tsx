"use client";

import React, { useState } from "react";
import {
  Scale,
  CreditCard,
  UserCheck,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Activity
} from "lucide-react";

const TERMS_SECTIONS = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "services", label: "2. Scope of SaaS Services" },
  { id: "billing", label: "3. Billing, Fees & Renewals" },
  { id: "clinic-responsibility", label: "4. Clinic Responsibilities" },
  { id: "pms-sync", label: "5. PMS Database Credentials" },
  { id: "warranty-disclaimer", label: "6. AI & Warranty Disclaimer" },
  { id: "liability", label: "7. Limitation of Liability" },
  { id: "governing-law", label: "8. Dispute & Governing Law" },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");
  const lastUpdated = "July 24, 2026";

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="flex-1 bg-[#070B14] text-slate-150 relative min-h-screen font-sans">
      {/* Decorative Aura Background Effects */}
      <div className="absolute top-0 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-500/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 left-10 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-teal-500/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-20 right-1/3 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-emerald-500/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-70 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Breadcrumb / Top Tag */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-xs text-slate-350">
            <Scale className="h-3.5 w-3.5 text-primary" />
            <span>SaaS Terms & Service License Agreement</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Last Updated: {lastUpdated} | Version 1.1 (Standard Practice Licensure)
          </p>
        </div>

        {/* Quick TL;DR Summary Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-950/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <CreditCard className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">Simple Subscriptions</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed">
              Paid plans are billed on a recurring monthly or annual basis. Standard 20% discount applies to annual selections. Cancel with a 30-day email directive.
            </p>
          </div>

          <div className="bg-slate-950/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 hover:border-teal-500/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                <UserCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display font-sans">Consent Requirements</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans">
              Clinics are responsible for obtaining patient consent before our automated receptionists engage in outbound text or scheduling confirmation messages.
            </p>
          </div>

          <div className="bg-slate-950/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">AI Conversational Limits</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed">
              Our AI is configured for scheduling, clinic FAQs, and intake. It is not an emergency response agent and does not provide clinical diagnoses.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">

          {/* Table of Contents - Desktop Sticky Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-24 space-y-2 bg-slate-950/20 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-2 font-display">
              Sections
            </h4>
            <div className="flex flex-col space-y-1">
              {TERMS_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left text-sm py-2 px-3 rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? "text-primary bg-primary/10 font-bold border-l-2 border-primary"
                      : "text-slate-350 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Detailed Legal Content Column */}
          <div className="lg:col-span-3 space-y-16 font-sans">

            {/* Section 1: Acceptance of Terms */}
            <section id="acceptance" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">1</span>
                Acceptance of Terms
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed">
                <p>
                  These Terms of Service (&quot;Terms&quot; or &quot;Agreement&quot;) constitute a legally binding agreement between Anvora (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) and the dental practice and representatives (&quot;Client&quot;, &quot;Clinic&quot;, or &quot;you&quot;) entering this agreement. These terms govern your access to the scheduling interfaces, AI conversation engines, clinic dashboards, widgets, and communication pipelines (collectively, the &quot;SaaS Platform&quot;).
                </p>
                <p>
                  By checking billing authorization, signing contract paperwork, or installing our virtual assistant widget code lines on your clinic website domains, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not accept these conditions, you must immediately cease accessing our systems.
                </p>
              </div>
            </section>

            {/* Section 2: Scope of SaaS Services */}
            <section id="services" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">2</span>
                Scope of SaaS Services
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed">
                <p>
                  Anvora makes available a web-hosted Software-as-a-Service automation system designed to optimize dental office workflows, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Virtual Front Desk Assistants:</strong> Conversational AI instances communicating via text and chat to answer general clinic details, describe hours, and process insurance questions.
                  </li>
                  <li>
                    <strong>Appointment Management:</strong> Custom interfaces identifying clinic openings, querying intake profiles, and inserting bookings directly into Client schedule grids.
                  </li>
                  <li>
                    <strong>Dashboard Analytics:</strong> Client portal software indicating inquiry volume, conversion rates, call recovery totals, and pipeline reports.
                  </li>
                </ul>
                <p>
                  We grant you a non-transferable, revocable, non-exclusive license to embed our chatbot widget and utilize the dashboards solely for your internal practice operations, conforming to standard subscription plans.
                </p>
              </div>
            </section>

            {/* Section 3: Billing, Fees & Renewals */}
            <section id="billing" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">3</span>
                Billing, Fees & Renewals
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed">
                <p>
                  By activating a premium subscription layer (Starter, Growth / Most Popular, or Scale packages), you agree to our recurrent billing schedule:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Billing Frequency:</strong> Services are billed in advance on a monthly or annual cycle. Annual plans contain a pre-calculated 20% discount.
                  </li>
                  <li>
                    <strong>Auto-Renewal:</strong> Subscription credentials automatically renew on your billing anniversary date. Your registered credit card or ACH engine will be billed unless you request cancellation.
                  </li>
                  <li>
                    <strong>Cancellation Terms:</strong> You can initiate contract termination at any point. Cancellation requests require thirty (30) days notice via dashboard settings or a direct email to <a href="mailto:billing@anvora.ai" className="text-primary hover:underline font-semibold">billing@anvora.ai</a>.
                  </li>
                  <li>
                    <strong>Usage Allowances:</strong> Subscriptions contain specific limits for active scheduling slots, integrations, or messaging limits. Excess volume triggers automated tier scaling as detailed in subscription quotes.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4: Clinic Responsibilities */}
            <section id="clinic-responsibility" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">4</span>
                Clinic Responsibilities & Communication Consent
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed bg-red-950/15 p-6 rounded-2xl border border-red-500/10">
                <p className="text-sm font-semibold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" /> TCPA, HIPAA & Local Consent Compliance
                </p>
                <p>
                  To use Anvora&apos;s SMS and conversational receptionist tools, the Clinic must represent and warrant that:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mt-2">
                  <li>
                    You possess proper patient authorization and consent (meeting TCPA, HIPAA, CAN-SPAM, and state guidelines) before prompting our systems to transmit SMS notifications, check-in instructions, or outbound reminders.
                  </li>
                  <li>
                    Patients are provided with clear notices explanation mechanisms allowing them to easily opt out of text updates (e.g., standard STOP instructions).
                  </li>
                  <li>
                    Your clinic staff manages, confirms, and validates scheduling records inserted by Anvora, recognizing that AI-assisted actions are subordinate to office management authority.
                  </li>
                </ol>
              </div>
            </section>

            {/* Section 5: PMS Database Credentials */}
            <section id="pms-sync" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">5</span>
                PMS Database Credentials & Authorization
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed">
                <p>
                  To sync bookings, Anvora requires authorized integration keys or credentials to Dentrix, Eaglesoft, Open Dental, or similar systems.
                </p>
                <p>
                  You hereby grant Anvora the necessary administrative license to access your designated PMS endpoint, download calendar slots, check patient profiles block status, and insert scheduling records.
                  You represent that you hold full property ownership and licensing rights to connect these third-party databases, and that doing so does not violate contracts between you and your software vendors.
                </p>
              </div>
            </section>

            {/* Section 6: AI & Warranty Disclaimer */}
            <section id="warranty-disclaimer" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">6</span>
                AI Conversational & Warranty Disclaimer
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed">
                <div className="bg-slate-950/20 p-5 rounded-xl border border-white/5 space-y-3">
                  <p className="text-xs uppercase tracking-wider font-extrabold text-slate-400 flex items-center gap-2">
                    <Activity className="h-4.5 w-4.5 text-primary shrink-0" /> Important Product Notice
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Anvora is a conversational assistant utilizing advanced large language models (LLMs).
                  </p>
                  <p className="text-sm">
                    Because LLM outputs cannot be predicted with absolute certainty, you acknowledge that our AI receptionists may occasionally generate inaccurate responses, minor hallucinations, or pricing errors during chats.
                    You agree that the Clinic holds final review responsibility over all booking transactions, communication outputs, and patient intake profiles.
                  </p>
                </div>
                <p className="text-sm font-bold uppercase tracking-tight text-white mt-4">
                  THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
              </div>
            </section>

            {/* Section 7: Limitation of Liability */}
            <section id="liability" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">7</span>
                Limitation of Liability
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY GOVERNING LAW, IN NO EVENT SHALL ANVORA or IT&apos;S SUPPLIERS BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES (INCLUDING COST OF SUBSTITUTE SERVICES, LOSS OF PATIENTS, PRACTICE DOWNTIME, OR COMPUTER INTEGRATION ERRORS) ARISING OUT OF THE USE OR INABILITY TO USE THE PLATFORM.
                </p>
                <p>
                  OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THESE TERMS OR THE SAAS PLATFORM SHALL NEVER EXCEED THE TOTAL SUBSCRIPTION FEES PAID BY YOUR CLINIC TO ANVORA IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE CLAIM INCIDENT.
                </p>
              </div>
            </section>

            {/* Section 8: Dispute & Governing Law */}
            <section id="governing-law" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">8</span>
                Dispute Resolution & Governing Law
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed">
                <p>
                  These Terms of Service and any transactional disputes arising out of them will be governed by and construed in accordance with the laws of the State of California, without giving effect to conflicts of laws protocols.
                </p>
                <p>
                  Any legal claims or disputes that cannot be settled amicably through direct clinic support dialogue will be settled exclusively by individual binding arbitration administered by the American Arbitration Association (AAA) in San Francisco, California. You waive your right to participate in group, class, or representative litigation actions.
                </p>
                <p className="mt-8 text-sm text-slate-400">
                  For licensing questions or billing notifications, contact support:
                  <a href="mailto:support@anvora.ai" className="text-primary hover:underline ml-1.5 font-semibold">
                    support@anvora.ai
                  </a>
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* Footer Accent CTA Link */}
        <div className="mt-24 border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white font-display">Need custom terms or enterprise service level agreements?</h4>
            <p className="text-sm text-slate-400 mt-1">We offer custom SLAs and BAAs for dental support organizations (DSOs) and multi-location groups.</p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-slate-950 text-sm font-bold hover:bg-primary/90 transition-all duration-300 group shrink-0"
          >
            Request Enterprise Terms
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  );
}