# Anvora - Project Handoff & Status Document

## 1. Project Overview & Architecture
Anvora is a premium Dental AI Practice Automation SaaS providing conversational AI receptionists that handle clinic inquiries, qualify patient leads, verify insurance, and schedule appointments 24/7.

### Architecture Summary
* **Framework:** Next.js 16 (App Router conventions in `src/app/`)
* **Language:** TypeScript (Strict type safety)
* **Styling:** Tailwind CSS v4
* **Animations:** Framer Motion (micro-animations, spring-based transitions)
* **Icons:** Lucide React
* **Package Manager:** npm

### Folder Structure
* `src/app/`: Routing pages & layouts (Hero, Features, Pricing placeholders, Demo scheduler page, Contact page, etc.)
* `src/components/`: App-wide shared UI modules (Navbar, Footer, Buttons)
* `docs/`: Project status and architectural guidelines references

---

## 2. Completed Sprints & Progress
* **Sprint 1 (Hero & Foundation Landing Page) - COMPLETED**
  * Handled in `src/app/page.tsx`. Sets up the dark background gradients (`#070B14`), interactive card slots, messaging UI mockups, and glowing ambient background blobs.
  * Shared navigation headers (`src/components/Navbar.tsx`) and website footers (`src/components/Footer.tsx`) integrated.
* **Sprint 2-4 (Features Page & Subsystems Showcase) - COMPLETED**
  * Handled in `src/app/features/page.tsx`. Detailed features panel exhibiting Lead Qualification, Insurance Verification, Calendar Auto-bookings, and unified text consoles.
  * Leveraged Framer Motion for interactive feature switching and responsive layouts.

---

## 3. Current Git Status & Files Modified
At command: `git status`
* **Current Branch:** `main` (Ahead of `origin/main` by 1 commit: `feat: initialize Anvora website foundation and hero section`)
* **Modified Files (Uncommitted):**
  * `CLAUDE.md`: Updated guidelines, directory mappings, commands, and constraints.
  * `src/app/page.tsx`: Foundation layout modifications.
  * `src/app/features/page.tsx`: Full feature lists, detailed showcase blocks.

---

## 4. Current Task List & Outstanding Work (Sprint 5: Pricing Page)
Development on Sprint 5 has been planned out and started. The outstanding tasks for completing the Pricing Page (`src/app/pricing/page.tsx`) include:
1. **Interactive Toggle**: Annual vs. Monthly switch implementing a 20% discount dynamically linked to standard card values.
2. **Three-Tier Plan Deck**:
   * *Starter Plan* ($199/mo standard, $149/mo annual)
   * *Growth Plan* ($399/mo standard, $319/mo annual) - flagged as **Most Popular**
   * *Scale Plan* ($799/mo standard, $639/mo annual)
3. **Interactive ROI Calculator**:
   * Sliders for *Missed Calls* (10-150) and *Average Case Value* ($150-$500).
   * Lives calculations for LOST vs. RECOVERED revenue using Anvora's 85% receptionist recovery benchmark.
4. **Feature Comparison Matrix**: Detailed collapse/expand table comparing features (e.g., SMS automation, custom voices, security) across packages.
5. **Categorized FAQ Accordions**: Tabs for filtering Dental vs. Billing questions with smooth Framer Motion expanding details.
6. **Footer Call to Action**: Final cards referencing `/demo` and `/contact` endpoints.

---

## 5. Known Issues
* No known typescript/lint compiler errors or application warnings in the codebase.
* Active tasks #2 through #6 remain in pending/in_progress state to be completed in the next coding cycle.

---

## 6. Next Recommended Sprints
1. **Complete Sprint 5 (Pricing page)**: Update `src/app/pricing/page.tsx` with all interactive sliders, toggles, comparison, and FAQ accordions.
2. **Sprint 6 (Book Demo Scheduler)**: Implement `/src/app/demo/page.tsx` utilizing interactive calendar selectors or widgets to schedule clinical consultations.
3. **Sprint 7 (Contact & Practice Locations)**: Implement `/src/app/contact/page.tsx` maps integrations, operational hours, and contact forms.
