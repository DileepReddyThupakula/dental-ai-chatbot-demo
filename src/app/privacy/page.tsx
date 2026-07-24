"use client";

import React, { useState } from "react";
import {
  Shield,
  Lock,
  Database,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Mail,
  Scale
} from "lucide-react";

const PRIVACY_SECTIONS = [
  { id: "introduction", label: "1. Introduction & Scope" },
  { id: "hipaa", label: "2. HIPAA & Patient Safety" },
  { id: "information-collected", label: "3. Information We Collect" },
  { id: "how-we-use", label: "4. How We Use Practice Data" },
  { id: "pms-integrations", label: "5. PMS & EHR Data Syncing" },
  { id: "retention-deletion", label: "6. Data Retention & Deletion" },
  { id: "disclosure", label: "7. Third-Party Disclosures" },
  { id: "practice-rights", label: "8. Clinic & Patient Rights" },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("introduction");
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
      <div className="absolute top-0 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-500/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 right-10 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-teal-500/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-20 left-1/3 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-emerald-500/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-70 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Breadcrumb / Top Tag */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-xs text-slate-350">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span>Privacy Guard & Security Framework</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Last Updated: {lastUpdated} | Version 1.2 (Active Production)
          </p>
        </div>

        {/* Quick TL;DR Summary Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-950/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">100% HIPAA Standard</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed">
              We secure Protected Health Information (PHI) under strict HIPAA standards. Enterprise-grade AES-256 encryption covers data in transit and at rest.
            </p>
          </div>

          <div className="bg-slate-950/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 hover:border-teal-500/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                <UserCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">Clinic Trust, No Ads</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed">
              Anvora does not buy, sell, or license patient contact details, chat histories, or clinic calendars. Your data is strictly yours.
            </p>
          </div>

          <div className="bg-slate-950/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">Scoped Write Actions</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed">
              Our PMS integrations only read and write calendar spaces requested by you, preventing unauthorized record modifications and locks.
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
              {PRIVACY_SECTIONS.map((section) => (
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

            {/* Section 1: Introduction */}
            <section id="introduction" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">1</span>
                Introduction & Scope
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed">
                <p>
                  Welcome to Anvora (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). We respect your privacy and are committed to protecting your personal information and that of your clinic and patients. This Privacy Policy describes how we collect, protect, store, use, and process data when you access or use the Anvora platform, our AI receptionists, websites, API integrations, and related applications (collectively, the &quot;Services&quot;).
                </p>
                <p>
                  By utilizing our website, sandbox demos, scheduling services, or platform dashboard, you agree to the collection and use of information in accordance with this policy. This policy governs both dental practices (our &quot;Clients&quot; or &quot;Clinics&quot;) and the patient visitors who communicate with the virtual assistants hosted on our Client&apos;s sites.
                </p>
              </div>
            </section>

            {/* Section 2: HIPAA & Patient Safety */}
            <section id="hipaa" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">2</span>
                HIPAA & Patient Safety compliance
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed bg-blue-950/20 p-6 rounded-2xl border border-blue-500/10">
                <p className="text-sm font-semibold text-primary flex items-center gap-1.5">
                  <Shield className="h-4 w-4" /> HIPAA Business Associate Agreement (BAA) Ready
                </p>
                <p>
                  Anvora is built on security controls that fully support compliance with the Health Insurance Portability and Accountability Act (HIPAA). When providing Services to dental clinics, we often act as a &quot;Business Associate&quot; under HIPAA rules. We execute standard BAAs outlining our obligations to safeguard Protected Health Information (PHI).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                    <span className="text-sm text-slate-300">Data Encryption: TLS 1.3 in-transit, AES-256 at-rest.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                    <span className="text-sm text-slate-300">Audit Logs: Tracking of all PHI database transactions.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                    <span className="text-sm text-slate-300">Access Control: Role-based admin portals with MFA.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                    <span className="text-sm text-slate-300">SSO & Hosting: Hosted in highly compliant, certified cloud structures.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Information We Collect */}
            <section id="information-collected" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">3</span>
                Information We Collect
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed">
                <p>
                  To deliver automated front desk and chat receptionist services properly, we collect specific data groups:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-300">
                  <li>
                    <strong>Clinic Profile & Administrative Data:</strong> When a dental officeregisters, we collect clinic name, corporate details, physical address, business phone number, operating hours, staff list, billing credentials, and API access keys to Practice Management Systems.
                  </li>
                  <li>
                    <strong>Patient-Submitted Communications:</strong> Information input during conversational interactions, including patient full name, mobile number, email address, preferred booking times, clinical symptoms details, insurance group/policy identifiers, and physical dental concerns context.
                  </li>
                  <li>
                    <strong>PMS Calibrations & Schedule Metadata:</strong> To construct appointment booking options, our integrations collect schedule block availability, appointment lengths, chair configurations, and provider availability blocks.
                  </li>
                  <li>
                    <strong>Device and Interaction Analytics:</strong> Connection logs, IP addresses, browser configurations, referring domains, session duration, and interactive telemetry data utilized to optimize response speeds and dashboard performance.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4: How We Use Practice Data */}
            <section id="how-we-use" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">4</span>
                How We Use Practice Data
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed">
                <p>
                  We utilize accumulated information exclusively to operate, support, and enhance our automation platforms:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-slate-950/20 border border-white/5 p-5 rounded-xl">
                    <h4 className="text-white font-bold text-sm mb-2 font-display">Core Delivery</h4>
                    <p className="text-xs text-slate-350 leading-relaxed">
                      Resolving clinical inquiries, calculating real-time insurance eligibility estimates, and submitting confirmed appointment reserves directly to databases.
                    </p>
                  </div>
                  <div className="bg-slate-950/20 border border-white/5 p-5 rounded-xl">
                    <h4 className="text-white font-bold text-sm mb-2 font-display">Notifications</h4>
                    <p className="text-xs text-slate-350 leading-relaxed">
                      Sending booking alerts, scheduling links, interactive intake worksheets, and emergency updates to clinic managers and patients with two-way SMS pipelines.
                    </p>
                  </div>
                  <div className="bg-slate-950/20 border border-white/5 p-5 rounded-xl">
                    <h4 className="text-white font-bold text-sm mb-2 font-display">Model Tuning</h4>
                    <p className="text-xs text-slate-350 leading-relaxed">
                      Evaluating transcription layers and refining NLP intents to optimize dental vocabulary handling (e.g., distinguishing between &quot;composite filling&quot; and &quot;root canal&quot;).
                    </p>
                  </div>
                  <div className="bg-slate-950/20 border border-white/5 p-5 rounded-xl">
                    <h4 className="text-white font-bold text-sm mb-2 font-display">Security Verification</h4>
                    <p className="text-xs text-slate-350 leading-relaxed">
                      Preventing fraudulent activities, malicious prompts, denial-of-service attempts, and unauthorized administrative configurations.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: PMS & EHR Data Syncing */}
            <section id="pms-integrations" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">5</span>
                PMS & EHR Data Syncing
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed">
                <p>
                  Anvora interfaces with standard Practice Management Systems (PMS), including Dentrix, Eaglesoft, Open Dental, and Curve Dental. To preserve database integrity, our integrations implement custom isolation protocols:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Scoped Permissions:</strong> We connect with write access capped exclusively to the appointments and patient intake fields. We never alter ledger records, historical chart notes, clinical therapy plans, or pricing tables.
                  </li>
                  <li>
                    <strong>Middle Layer Validation:</strong> All scheduling inputs are evaluated against practice constraints, blocks, and double-booking controls before insertion.
                  </li>
                  <li>
                    <strong>Disconnect Authority:</strong> Clinic administrators can immediately revoke database tokens and API access directly from the Anvora portal, terminating connections within seconds.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 6: Data Retention & Deletion */}
            <section id="retention-deletion" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">6</span>
                Data Retention & Deletion
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed">
                <p>
                  Anvora enforces custom cleanup schedules based on client preferences and compliance rules:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Transcripts & Logs:</strong> Protected patient chat records are programmatically scrubbed or anonymized after thirty (30) days unless active clinic agreements require extended retention.
                  </li>
                  <li>
                    <strong>Account Erasure:</strong> Upon contract termination, practice account metadata is flagged for permanent deletion. All local database objects, API connections, and temporary caching entries are removed within forty-five (45) business days.
                  </li>
                  <li>
                    <strong>Emergency Vaulting:</strong> We maintain back-up file iterations solely for disaster recovery purposes. These copies are encrypted and self-overwrite on a 14-day rolling schedule.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 7: Third-Party Disclosures */}
            <section id="disclosure" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">7</span>
                Third-Party Disclosures
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed">
                <p>
                  We share collected data with secondary suppliers strictly to execute necessary platform deliverables:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-950/30 border border-white/5">
                    <Database className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-semibold text-white">Database & Infrastructure Partners</h5>
                      <p className="text-xs text-slate-350 mt-1">
                        Encrypted cloud engines (Amazon Web Services, Vercel) running inside security compliance structures.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-950/30 border border-white/5">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-semibold text-white">Communication Gateways</h5>
                      <p className="text-xs text-slate-350 mt-1">
                        SMS & Voice services (Twilio) used for automated scheduling links and patient reminders. No marketing alerts.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-950/30 border border-white/5">
                    <Scale className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-semibold text-white">Legal Obligations</h5>
                      <p className="text-xs text-slate-350 mt-1">
                        We may disclose information if required to comply with a valid court order, subpoena, government inquiry, or enforcement action.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8: Clinic & Patient Rights */}
            <section id="practice-rights" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
                <span className="text-xs px-2 py-0.5 roundedbg bg-slate-800 text-slate-400 font-mono">8</span>
                Clinic & Patient Rights
              </h2>
              <div className="border-t border-white/5 pt-4 text-slate-300 space-y-4 leading-relaxed">
                <p>
                  As an client clinic or communicating patient, you hold specific assurances regarding stored digital logs:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 rounded-xl border border-white/5 bg-slate-950/10">
                    <h5 className="font-semibold text-white text-sm mb-1">Right of Inspection</h5>
                    <p className="text-xs text-slate-400">Request copies of patient interaction archives and audit logs collected during billing months.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-slate-950/10">
                    <h5 className="font-semibold text-white text-sm mb-1">Right of Correction</h5>
                    <p className="text-xs text-slate-400">Request updates to misidentified patient metadata and phone contact identifiers.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-slate-950/10">
                    <h5 className="font-semibold text-white text-sm mb-1">Right of Erasure</h5>
                    <p className="text-xs text-slate-400">Initiate early purge scripts to erase patient chat records before the 30-day auto-expiry.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-slate-950/10">
                    <h5 className="font-semibold text-white text-sm mb-1">Opt-out of Texting</h5>
                    <p className="text-xs text-slate-400">Patients can type &quot;STOP&quot; in any SMS conversation to immediately block further automations.</p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-slate-400">
                  For privacy queries or request forms, contact our Compliance Officer:
                  <a href="mailto:privacy@anvora.ai" className="text-primary hover:underline ml-1.5 font-semibold">
                    privacy@anvora.ai
                  </a>
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* Footer Accent CTA Link */}
        <div className="mt-24 border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white font-display">Have questions regarding HIPAA or Practice Syncing?</h4>
            <p className="text-sm text-slate-400 mt-1">Get in touch with an integration engineer to review security architectures.</p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-slate-950 text-sm font-bold hover:bg-primary/90 transition-all duration-300 group shrink-0"
          >
            Contact Security Team
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  );
}