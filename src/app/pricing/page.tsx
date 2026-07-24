"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, AlertTriangle, TrendingUp, ChevronDown, Minus } from "lucide-react";

interface PricingPlan {
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    priceMonthly: 199,
    priceAnnual: 149,
    description: "Ideal for boutique, single-chair offices looking to capture missed patient phone queries.",
    features: [
      "24/7 Virtual Patient Assistant",
      "Direct 2-way PMS scheduler writing",
      "Up to 150 SMS notifications / mo",
      "Standard practice FAQs handled",
      "Email & Web Chat widget support",
    ],
    ctaText: "Get Started",
    ctaHref: "/demo",
  },
  {
    name: "Professional",
    priceMonthly: 399,
    priceAnnual: 319,
    description: "Engineered for active practices requiring insurance verification and automated confirmations.",
    features: [
      "Everything in Starter",
      "Live PPO Insurance Eligibility Check",
      "Unlimited Conversational FAQ items",
      "Intake Form Delivery automated links",
      "Priority scheduling API routing",
      "Dedicated SMS channel notifications",
      "Priority Support (2-hour reply SLA)",
    ],
    ctaText: "Go Professional",
    ctaHref: "/demo",
    popular: true,
  },
  {
    name: "Enterprise",
    priceMonthly: 799,
    priceAnnual: 639,
    description: "Designed for multi-location groups and DSO organizations with complex scheduling workflows.",
    features: [
      "Everything in Professional",
      "Multi-clinic admin dashboard",
      "Custom AI voice receptionist (phone support)",
      "Dedicated client partner success manager",
      "Custom analytics & reporting dashboard",
      "Custom system API & webhook syncs",
      "Uptime SLA 99.9% guarantee",
    ],
    ctaText: "Contact Sales",
    ctaHref: "/contact",
  },
];

const comparisonFeatureGroups = [
  {
    category: "Core AI Capabilities",
    features: [
      { name: "24/7 Virtual Assistant", starter: "Web & Email", professional: "Web, Email & SMS", enterprise: "Omnichannel & Phone Voice" },
      { name: "Dentistry FAQ Base", starter: "Standard (50 items)", professional: "Unlimited FAQs", enterprise: "Custom Knowledge Bank" },
      { name: "Lead Qualification Details", starter: "Basic contact info", professional: "Full symptoms & history", enterprise: "Custom intake forms" },
      { name: "Custom Tone & Rules Configuration", starter: "Standard template", professional: "Full customization", enterprise: "Multi-office presets" },
    ],
  },
  {
    category: "PMS Integrations",
    features: [
      { name: "Live Booking Sync", starter: "Dentrix, Eaglesoft", professional: "Dentrix, Eaglesoft, Open Dental", enterprise: "Any PMS / Multisite API Sync" },
      { name: "PPO Insurance Eligibility", starter: "No", professional: "Live checks (80+ payers)", enterprise: "Automated clearinghouse" },
      { name: "Intake form auto-delivery", starter: "No", professional: "Yes (SMS link)", enterprise: "Custom integrated forms" },
      { name: "Priority API Scheduler Routing", starter: "No", professional: "Yes", enterprise: "Enterprise dedicated bandwidth" },
    ],
  },
  {
    category: "Reliability & Compliance",
    features: [
      { name: "HIPAA-Compliant security", starter: "Yes (Standard)", professional: "Yes (BAA signed)", enterprise: "SOC2 Compliance & custom SLA" },
      { name: "Security audit logs", starter: "No", professional: "Monthly", enterprise: "Real-time exports" },
      { name: "Uptime SLA", starter: "Best Effort", professional: "99.5% uptime target", enterprise: "99.9% legal guarantee" },
    ],
  },
  {
    category: "Support & Administration",
    features: [
      { name: "Dashboard Access", starter: "Single-office view", professional: "Single-office view", enterprise: "Multi-clinic hierarchy" },
      { name: "Onboarding Training", starter: "Self-serve guides", professional: "1-on-1 team training", enterprise: "Dedicated onboarding specialist" },
      { name: "Customer Support", starter: "Email support (24h)", professional: "Priority support (2h SLA)", enterprise: "Dedicated phone & account mgr" },
    ],
  },
];

interface FaqItem {
  question: string;
  answer: string;
  category: "all" | "general" | "integration" | "security";
}

const faqs: FaqItem[] = [
  {
    question: "How does the AI integrate with our Practice Management System (PMS)?",
    answer: "Anvora connects directly using native API integrations or secure cloud synchronization tools with top systems like Dentrix, Eaglesoft, Open Dental, and CS PracticeWorks. It displays available slots in real-time, writes bookings instantly as tentative appts, and avoids overlaps, operating exactly like a human receptionist.",
    category: "integration",
  },
  {
    question: "Is Anvora HIPAA compliant?",
    answer: "Absolutely. Security is our absolute priority. All patient communications, scheduling details, and insurance documents are encrypted in-transit (TLS 1.3) and at-rest (AES-256). We sign standard Business Associate Agreements (BAAs) with practices and strictly comply with HIPAA regulations.",
    category: "security",
  },
  {
    question: "What is the setup timeline to get the AI assistant live?",
    answer: "Basic setup (Web Chat and standard office rules configuration) takes less than 24 hours. Custom integrations with your physical PMS or customized front-desk booking logic typically take 3 to 5 business days, fully managed by our onboarding success team.",
    category: "general",
  },
  {
    question: "How does the live PPO insurance verification work?",
    answer: "When a new patient books a slot, the AI assistant requests their PPO insurance provider, subscriber ID, and date of birth. Our system automatically queries eligibility databases in real-time to check deductibles, calendar maximums, and active coverage, appending the details to the booking for clinic approval.",
    category: "integration",
  },
  {
    question: "Can we customize the tone and answers of our virtual assistant?",
    answer: "Yes! You can configure specific clinic policies, response lists, emergency handling phone numbers, and language preferences. On the Enterprise tier, we can also train a custom voice agent optimized for your local phone reception.",
    category: "general",
  },
  {
    question: "Is there a setup fee or long-term contract requirement?",
    answer: "There are no long-term contract commitments for standard plans—you can switch billing cycles or cancel at the end of any cycle. Annual billing plans offer a 20% discount. Enterprise structures may require custom setup fees based on PMS complexity.",
    category: "general",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [missedCalls, setMissedCalls] = useState(30);
  const [patientValue, setPatientValue] = useState(250);
  const [activeFaqTab, setActiveFaqTab] = useState<"all" | "general" | "integration" | "security">("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const planCost = billingCycle === "annual" ? 319 : 399;
  const lostMonthlyRevenue = missedCalls * patientValue;
  const recoveredRevenue = Math.round(lostMonthlyRevenue * 0.85);
  const netMonthlyProfit = recoveredRevenue - planCost;
  const netAnnualProfit = netMonthlyProfit * 12;
  const roiMultiplier = planCost > 0 ? (recoveredRevenue / planCost).toFixed(1) : "0.0";

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#070B14] text-slate-100 relative overflow-hidden font-sans">
      {/* Decorative Background Blur Glows */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-500/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-teal-500/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-emerald-500/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <main className="flex-1 w-full relative z-10 flex flex-col justify-center items-center py-20">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6 flex flex-col items-center"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 w-fit mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400/25" />
                Simple & Transparent Pricing
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Predictable Plans for <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Growing Dental Practices
              </span>
            </h1>

            <p className="text-lg text-slate-350 max-w-2xl leading-relaxed">
              Choose the package that fits your patient volume. All plans include 24/7 AI availability, direct schedule integration with your PMS, and HIPAA-compliant data pipelines.
            </p>

            {/* Toggle Switch */}
            <div className="pt-6">
              <div className="inline-flex items-center p-1 rounded-full bg-slate-900 border border-white/5 relative">
                <button
                  type="button"
                  onClick={() => setBillingCycle("monthly")}
                  className="relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200 cursor-pointer z-10 focus-visible:outline-none"
                >
                  <span className={billingCycle === "monthly" ? "text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"}>
                    Monthly
                  </span>
                  {billingCycle === "monthly" && (
                    <motion.span
                      layoutId="activeBilling"
                      className="absolute inset-0 bg-white rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setBillingCycle("annual")}
                  className="relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200 cursor-pointer z-10 focus-visible:outline-none flex items-center gap-1.5"
                >
                  <span className={billingCycle === "annual" ? "text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"}>
                    Annual
                  </span>
                  <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide transition-colors duration-200 ${
                    billingCycle === "annual" ? "bg-emerald-500/15 text-emerald-600" : "bg-emerald-500/10 text-emerald-405"
                  }`}>
                    Save 20%
                  </span>
                  {billingCycle === "annual" && (
                    <motion.span
                      layoutId="activeBilling"
                      className="absolute inset-0 bg-white rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PRICING CARDS SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 w-full relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-center">
            {plans.map((plan, index) => {
              const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnual;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -6,
                    borderColor: plan.popular ? "rgba(34, 211, 238, 0.45)" : "rgba(255, 255, 255, 0.2)",
                    boxShadow: plan.popular ? "0 10px 40px -10px rgba(34, 211, 238, 0.15)" : "0 10px 30px -10px rgba(255, 255, 255, 0.05)"
                  }}
                  className={`group flex flex-col p-8 rounded-3xl border select-none transition-all duration-300 relative backdrop-blur-md ${
                    plan.popular
                      ? "border-primary/30 shadow-[0_0_40px_-5px_rgba(74,144,217,0.15)] bg-slate-950/60"
                      : "border-white/5 bg-slate-950/40"
                  }`}
                >
                  {/* Decorative glowing gradient effect for Popular card */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 p-px rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 z-10">
                      <div className="px-3.5 py-1 rounded-full bg-[#070B14] text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-cyan-400 flex items-center gap-1 font-sans whitespace-nowrap">
                        <Sparkles className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400/25 animate-pulse" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Header details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold font-display text-white">{plan.name}</h3>

                    {/* Price display */}
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display">
                        ${price}
                      </span>
                      <span className="text-sm font-semibold leading-6 text-slate-400 font-sans">
                        /month
                      </span>
                    </div>

                    {/* Billing notification details */}
                    <div className="h-6 mt-1 flex items-center">
                      {billingCycle === "annual" && (
                        <span className="text-xs text-emerald-400 font-medium font-sans">
                          Billed annually (${price * 12}/yr)
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-sm text-slate-350 leading-relaxed font-sans min-h-[3.5rem]">
                      {plan.description}
                    </p>

                    <div className="mt-6 border-t border-white/5 pt-6" />

                    {/* Features list */}
                    <ul className="space-y-4 font-sans text-sm text-slate-300">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Call to Action Button */}
                  <div className="mt-8 font-sans">
                    <Link
                      href={plan.ctaHref}
                      className={`inline-flex items-center justify-center w-full px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-md group-hover:scale-[1.01] group-hover:brightness-110 ${
                        plan.popular
                          ? "bg-primary text-white hover:bg-primary/95 shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                          : "bg-slate-900 border border-white/10 text-white hover:bg-slate-800/80 hover:border-white/20"
                      }`}
                    >
                      {plan.ctaText}
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Trust Strip */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs text-slate-400 font-medium font-sans border-t border-white/5 pt-8">
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>No setup fees</span>
            </span>
            <span className="h-3 w-[1px] bg-white/15 hidden sm:inline" />
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Cancel or switch anytime</span>
            </span>
            <span className="h-3 w-[1px] bg-white/15 hidden sm:inline" />
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>HIPAA-compliant pipelines</span>
            </span>
            <span className="h-3 w-[1px] bg-white/15 hidden sm:inline" />
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>Free managed clinic onboarding</span>
            </span>
          </div>
        </section>

        {/* ROI CALCULATOR SECTION */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 w-full relative">
          <div className="p-8 md:p-12 rounded-[32px] border border-white/5 bg-slate-950/40 backdrop-blur-md relative overflow-hidden">
            {/* Ambient glows inside calculator */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />

            <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
              <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
                Patient Revenue Calculator
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
                How much revenue is your practice leaving on the line?
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Most practices miss up to 35% of incoming calls. Anvora answers clinic questions, checks insurance eligibility, and books appointments 24/7 to capture missed revenue.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-6">
              {/* Sliders - Left Column */}
              <div className="lg:col-span-5 space-y-8">
                {/* Missed Calls Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold tracking-wide text-slate-300">
                      Average Monthly Missed Calls
                    </label>
                    <span className="px-3 py-1 bg-slate-900 border border-white/10 rounded-lg text-white font-mono text-sm font-medium">
                      {missedCalls} calls
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    step="5"
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(Number(e.target.value))}
                    className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-white/5"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>10 calls</span>
                    <span>80 calls</span>
                    <span>150 calls</span>
                  </div>
                  <p className="text-xs text-slate-400 italic leading-relaxed">
                    *Typical dental office misses 20-50 calls/month due to busy hours, after-hours, and hold times.
                  </p>
                </div>

                {/* Patient Value Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold tracking-wide text-slate-300">
                      Average New Patient Value
                    </label>
                    <span className="px-3 py-1 bg-slate-900 border border-white/10 rounded-lg text-white font-mono text-sm font-medium">
                      ${patientValue}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="500"
                    step="25"
                    value={patientValue}
                    onChange={(e) => setPatientValue(Number(e.target.value))}
                    className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-white/5"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>$150</span>
                    <span>$325</span>
                    <span>$500</span>
                  </div>
                  <p className="text-xs text-slate-400 italic leading-relaxed">
                    *Hygiene visits average $150-$200, while basic restorative checkups are $300-$500+.
                  </p>
                </div>
              </div>

              {/* Calculations - Right Column */}
              <div className="lg:col-span-7 bg-slate-900/30 border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full relative">
                {/* Inner Glow block */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  {/* Revenue Loss warning */}
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2 text-rose-400">
                      <AlertTriangle className="h-4.5 w-4.5 text-rose-500" />
                      <span className="text-sm font-medium">Estimated Lost Monthly Revenue</span>
                    </div>
                    <span className="text-lg font-bold font-mono text-rose-400">${lostMonthlyRevenue.toLocaleString()}</span>
                  </div>

                  {/* Highlighted Net Profit KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Monthly gain */}
                    <motion.div
                      layout
                      className="p-5 rounded-xl bg-slate-950/60 border border-emerald-500/20 shadow-[0_0_20px_-5px_rgba(16,185,129,0.1)] relative overflow-hidden"
                    >
                      <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-emerald-400 animate-pulse pointer-events-none" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Net Monthly Profit
                      </span>
                      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tracking-tight flex">
                        <motion.span
                          key={netMonthlyProfit}
                          initial={{ scale: 0.95, opacity: 0.8 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.15 }}
                        >
                          ${netMonthlyProfit.toLocaleString()}
                        </motion.span>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Estimated monthly return
                      </span>
                    </motion.div>

                    {/* Annual gain */}
                    <motion.div
                      layout
                      className="p-5 rounded-xl bg-slate-950/60 border border-emerald-500/20 shadow-[0_0_25px_-5px_rgba(16,185,129,0.15)] relative overflow-hidden"
                    >
                      <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-emerald-400 animate-pulse pointer-events-none" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Net Annual Profit
                      </span>
                      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tracking-tight bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent flex">
                        <motion.span
                          key={netAnnualProfit}
                          initial={{ scale: 0.95, opacity: 0.8 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.15 }}
                        >
                          ${netAnnualProfit.toLocaleString()}
                        </motion.span>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Annual return projection
                      </span>
                    </motion.div>
                  </div>

                  {/* Calculations Details List */}
                  <div className="space-y-3 pt-2 text-sm text-slate-300">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Estimated Recovered Revenue (85%)</span>
                      <span className="font-mono text-white font-medium">${recoveredRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Professional Plan Cost ({billingCycle})</span>
                      <span className="font-mono text-slate-300 font-medium">-${planCost}/mo</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-white/5">
                      <div className="flex items-center gap-1.5 text-cyan-400">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-semibold">ROI Multiplier</span>
                      </div>
                      <span className="font-mono font-bold text-lg text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded flex items-center justify-center">
                        <motion.span
                          key={roiMultiplier}
                          initial={{ scale: 0.92, opacity: 0.8 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.15 }}
                        >
                          {roiMultiplier}x
                        </motion.span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Callout banner */}
                <div className="mt-6 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/15 text-xs text-slate-300 flex items-start gap-3 relative z-10">
                  <div className="p-1 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 font-bold shrink-0">
                    ROI
                  </div>
                  <div className="leading-relaxed">
                    By capturing missed calls, every <strong className="text-white font-semibold">$1</strong> invested in Anvora yields approximately <strong className="text-cyan-300 font-semibold">${roiMultiplier}</strong> in dynamic patient value.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE COMPARISON MATRIX */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 w-full relative">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
              Feature Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Compare plans & capabilities in detail
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Find the perfect plan for your practice size. From boutique primary clinics to multi-office regional DSOs, we scale to match your workload.
            </p>
          </div>

          {/* Table Container with Horizontal Scroll on Mobile */}
          <div className="w-full border border-white/5 rounded-3xl bg-slate-950/40 backdrop-blur-md overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/3 to-transparent pointer-events-none" />

            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[850px] border-collapse text-left">
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-white/5 bg-slate-900/40">
                    <th className="py-6 px-8 text-sm font-semibold text-slate-400 w-1/3">
                      Features & Integrations
                    </th>
                    <th className="py-6 px-6 text-sm font-semibold text-white w-2/9">
                      <div className="space-y-1">
                        <span className="text-base font-bold font-display">Starter</span>
                        <div className="text-xs text-slate-400 font-mono font-medium">
                          ${billingCycle === "annual" ? 149 : 199}/mo
                        </div>
                      </div>
                    </th>
                    <th className="py-6 px-6 text-sm font-semibold text-white w-2/9 relative bg-cyan-950/40 border-x border-cyan-500/20">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base font-bold font-display text-cyan-400">Professional</span>
                          <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                            Popular
                          </span>
                        </div>
                        <div className="text-xs text-cyan-300/80 font-mono font-medium">
                          ${billingCycle === "annual" ? 319 : 399}/mo
                        </div>
                      </div>
                    </th>
                    <th className="py-6 px-6 text-sm font-semibold text-white w-2/9">
                      <div className="space-y-1">
                        <span className="text-base font-bold font-display">Enterprise</span>
                        <div className="text-xs text-slate-400 font-mono font-medium">
                          ${billingCycle === "annual" ? 639 : 799}/mo
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {comparisonFeatureGroups.map((group) => (
                    <React.Fragment key={group.category}>
                      {/* Category Header Row */}
                      <tr className="bg-slate-900/20 border-b border-white/5">
                        <td colSpan={4} className="py-4 px-8 text-xs font-bold uppercase tracking-widest text-slate-200">
                          {group.category}
                        </td>
                      </tr>
                      {group.features.map((feature) => (
                        <tr
                          key={feature.name}
                          className="border-b border-white/5 hover:bg-white/2 transition-colors duration-150"
                        >
                          <td className="py-5 px-8 text-sm font-medium text-slate-300">
                            {feature.name}
                          </td>
                          <td className="py-5 px-6 text-sm text-slate-400">
                            {feature.starter === "Yes" ? (
                              <Check className="h-4.5 w-4.5 text-emerald-400" />
                            ) : feature.starter === "No" ? (
                              <Minus className="h-4 w-4 text-slate-600" />
                            ) : (
                              feature.starter
                            )}
                          </td>
                          <td className="py-5 px-6 text-sm text-slate-200 bg-cyan-950/15 border-x border-cyan-500/5">
                            {feature.professional === "Yes" ? (
                              <Check className="h-4.5 w-4.5 text-emerald-400" />
                            ) : feature.professional === "No" ? (
                              <Minus className="h-4 w-4 text-slate-600" />
                            ) : (
                              <span className="font-medium text-slate-200">{feature.professional}</span>
                            )}
                          </td>
                          <td className="py-5 px-6 text-sm text-slate-400">
                            {feature.enterprise === "Yes" ? (
                              <Check className="h-4.5 w-4.5 text-emerald-400" />
                            ) : feature.enterprise === "No" ? (
                              <Minus className="h-4 w-4 text-slate-600" />
                            ) : (
                              feature.enterprise
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ACCORDION FAQ SECTION */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 w-full relative">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Got questions? We have answers.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Learn how Anvora integrates with your office rules, maintains compliance, and drives practice growth.
            </p>

            {/* Filter Tabs for FAQ */}
            <div className="pt-6 flex flex-wrap justify-center gap-2">
              {[
                { id: "all", label: "All Questions" },
                { id: "general", label: "General & Setup" },
                { id: "integration", label: "PMS Integrations" },
                { id: "security", label: "Security & HIPAA" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveFaqTab(tab.id as "all" | "general" | "integration" | "security");
                    setOpenFaqIndex(null); // Close active when filtering
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide font-sans transition-all duration-200 border cursor-pointer ${
                    activeFaqTab === tab.id
                      ? "bg-white text-slate-950 border-white"
                      : "bg-slate-900/60 text-slate-400 border-white/5 hover:border-white/10 hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-4 mb-12">
            {faqs
              .filter((faq) => activeFaqTab === "all" || faq.category === activeFaqTab)
              .map((faq, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <div
                    key={faq.question}
                    className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-cyan-500/30 bg-slate-900/40"
                        : "border-white/5 bg-slate-950/40 hover:border-white/10"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left py-5 px-6 sm:px-8 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                    >
                      <span className="font-semibold text-sm sm:text-base text-slate-200 tracking-wide">
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

                    {/* Collapsible Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 px-6 sm:px-8 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
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
      </main>
    </div>
  );
}
