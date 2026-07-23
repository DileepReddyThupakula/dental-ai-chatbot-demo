# SmileBright Dental - Practice AI Assistant Demo

A high-fidelity landing page for **SmileBright Dental** (based in Austin, TX) featuring a fully interactive, lightweight, client-side **Dental AI Practice Assistant** chatbot.

This project is built using purely vanilla web technologies to demonstrate how modern AI chatbot agents can instantly answer potential patient FAQs, qualify leads, and handle online appointment requests to keep clinic chairs full.

---

## 🌟 Key Features

### Custom Landing Page
*   **Hero & Subheadline:** Engaging introduction to dental practice automation.
*   **Five Major Features:** Clear listing of capabilities (24/7 availability, instant responses, lead qualification, appointment booking, and FAQ automation).
*   **Pricing Plans:** Flexible practice automation pricing ($300/month flat fee).
*   **Social Proof Proofs:** Testimonials from real clinic owners and managers across Austin, TX.
*   **Fully Responsive Layout:** Optimized for mobile phones, tablets, and desktop computers.

### Smart AI Dental Chatbot
*   **Floating Interactive Bubble:** Stays in the bottom right corner with minor notification signals.
*   **Automatic Triggering:** Chatbot opens and triggers the booking calendar instantly when patients click any "Book Demo" or "Book a Free Demo" buttons on the landing page.
*   **Smart Keyword Matcher:** Answers questions about clinic services, hours, pricing estimates, insurance partners, directions, and parking details in under a second.
*   **Embedded Booking Request Form:** Safe capture form for name, phone, email, preferred date, and dental services.
*   **Human Touch Simulation:** Smooth keyframe-based bouncing typing indicators and randomized delay intervals mimic real human support.
*   **Time-Stamp Logging:** Every message bubble carries a localized, dynamic timestamp.

---

## 📂 File Structure

*   `index.html`: Contains the structural skeleton of the landing page, section cards, navigation menu, and chat widget HTML structures.
*   `styles.css`: Dictates page typography (Poppins Google Font), custom UI branding colors (DDS Blue `#4A90D9`, Mint Green `#7DD3C0`, Dark Slate `#2C3E50`), responsive grids, bounce animations, and toggling states.
*   `chatbot.js`: Powering the conversational chat log wrapper, regex-based keyword parser, typing alerts, and booking submit details.

---

## 🚀 Getting Started

No special installation, compilation steps, or backend servers are required to run this project. You have multiple options to start the application:

### Option A: Standard Web Opening
1. Locate the project directory.
2. Double-click `index.html` or right-click the file and select **Open with...** -> **Google Chrome** (or any modern web browser like Safari/Firefox).

### Option B: Local HTTP Server (Recommended)
Running through an HTTP server ensures that font styles and external resources load quickly and prevents local file system origin conflicts.
If you have **Python** installed, run the following command in your terminal inside the project folder:
```bash
# For Python 3.x
python -m http.server 8000
```
Then, open your browser and navigate to: `http://localhost:8000`

---

## 💬 Sample Testing Guide

Use the following sample keyword queries in the chatbot interface to test the AI reply capabilities:

| Intent Category | Try Typing these Phrases in the Input Box | Expected Chatbot Response |
| :--- | :--- | :--- |
| **Greetings** | *"Hello!"* or *"Hi, I'm new"* | Quick welcoming greeting introducing itself. |
| **Services** | *"What treatments do you offer?"* or *"Do you do teeth cleaning?"* | bullet list of services, with inline "Book Online Now" shortcut button. |
| **Pricing** | *"How much is emergency tooth extraction?"* or *"teeth whitening cost"* | Detail price estimates ($99 new patient, etc.) and licensing cost info. |
| **Insurance** | *"Do you accept Delta Dental?"* or *"Is MetLife coverage accepted?"* | Confirms PPO insurance partners and explains the In-House Membership alternative. |
| **Hours** | *"What are your clinic hours on Saturdays?"* or *"Are you closed on Sundays?"* | Showcases weekly schedule, pointing out Sunday emergency availability. |
| **Location & Parking** | *"Where are you located in Austin?"* or *"Is there patient parking?"* | Gives the Main Street address and details the free parking lot behind the clinic. |
| **Emergency** | *"Help! I have a severe toothache"* or *"I broke a tooth"* | Warns to call the 24/7 helpline (512) 555-0123 for immediate urgent care. |
| **Appointment booking** | *"I would like to book a slot"* or *"Calendar checkup"* | Automatically slides up the booking details form. |
| **Small Talk / Bye** | *"Thanks for the info, bye!"* or *"Perfect!"* | Friendly goodbye blessing, wishing them a bright day. |
| **System Info** | *"Is this a real person?"* or *"What is this chatbot?"* | Explains that it is a landing page demonstration bot for practices. |
| **Fallback** | *"What is the meaning of life?"* | Guide suggesting topics the bot knows how to respond to. |
