# Anvora - Project Guide & Guidelines

## 1. Project Overview
Anvora is a premium Dental AI Practice Automation SaaS. It delivers high-fidelity virtual dental assistants that qualify patient leads, answer clinic inquiries, verify PPO insurance plans, and schedule bookings directly into Dental Practice Management Systems (PMS). Let's automate the front desk 24/7.
* **Long-Term Vision:** A zero-friction digital engine for dental clinics that combines AI conversation, unified messaging, and real-time scheduling widgets to eliminate missed patient calls.

---

## 2. Tech Stack
* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **Animations:** Framer Motion (micro-animations, spring-based transitions)
* **Icons:** Lucide React
* **Package Manager:** npm

---

## 3. Coding Standards
* **Strict Type Safety:** Always write typed TypeScript code. Avoid `any` types; define interface parameters and return values explicitly.
* **Reusable Layouts:** Write modular components. Avoid hardcoding repetitive layout structures.
* **Mobile-First Responsive:** Design interfaces mobile-first. Ensure seamless scaling up to desktop using Tailwind layout systems (`grid`, `flex`, breakpoint modifiers).
* **Accessibility (a11y):** Implement semantic HTML. Include appropriate ARIA labels, focus states, and keyboard accessibility for interactives, forms, and custom controls.
* **DRY Principle:** Do not duplicate code. Consolidate repetitive styling and logic structures.
* **No Inline Styles:** Use Tailwind classes for all styling. Inline styles are reserved solely for dynamic, runtime values (e.g., dynamic cursor positions or translation offsets).

---

## 4. UI Principles
* **Premium SaaS aesthetic:** Mimic the clean, high-contrast, premium layouts of Stripe, Linear, and Vercel.
* **Minimal Dark Palette:** Dark slate/blue dominant (`#070B14`) coupled with subtle gradients, soft blurred teal/blue aura glows, and high-quality borders (`border-white/5` or `border-white/10`).
* **Generous Whitespace:** Allow elements to breathe with ample margins and padded structures.
* **Micro-Animations:** Use hardware-accelerated transitions and framer-motion loops for interactive feedback (hover responses, entry transitions, card floats).

---

## 5. Architecture Rules
* **App Router Layouts:** Strictly utilize Next.js App Router conventions. Keeps pages nested under `src/app/`.
* **Clean Separation of Concerns:** Keep UI components focused on visual representation. Extract business/scheduling logic, lead qualification state, and validators into custom hooks, helper modules, or service files.
* **Component Sizing:** Keep components small, modular, and single-responsibility. Decompose complex cards or widgets into subordinate components.

---

## 6. Development Commands
* **Run Local Server:** `npm run dev`
* **Compile Build:** `npm run build`
* **Clean Linting:** `npm run lint`

---

## 7. Git Workflow
* **Deliver Clean Builds:** Never commit code that breaks compiles or generates TypeScript/lint errors or warnings.
* **Sprint Checkpointing:** Stage and commit modifications after every completed sprint or major milestone.
* **Co-author Tagging:** End all git commit logs with:
  `Co-Authored-By: Claude <noreply@anthropic.com>`

---

## 8. Target Folder Structure
Build files inside the `src` directory according to this architecture:
```text
src/
├── app/            # Routes, pages, layouts, and route handers (App Router)
├── components/     # App-wide shared UI modules (Button, Input, Badge, etc.)
├── features/       # Feature-centric modules containing internal components (e.g., builder)
├── hooks/          # Global custom React hooks (e.g., useChat, useInterval)
├── lib/            # Shared libraries, SDK integrations, API clients
├── services/       # PMS integrations and backend communications
├── types/          # Global TypeScript interfaces and definitions
└── utils/          # Universal helper functions (dates, pricing formatters)
```

---

## 9. Constraints (Things Claude Should Never Do)
* **No Unauthorized Package Installs:** Never install new npm dependencies without explicit user consent.
* **No Unauthorized deletions:** Never delete files, core layout sections, or directory backups unless specifically instructed.
* **No Regressive Modifications:** Do not rewrite or modify layout parts of completed sprints/features unless explicitly requested.

---
@AGENTS.md
