"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  Sparkles
} from "lucide-react";

const MOCK_CONVERSATIONS = [
  {
    id: "1",
    patientName: "Eleanor Vance",
    patientPhone: "(555) 019-9234",
    patientEmail: "eleanor@example.com",
    channel: "SMS",
    status: "RESOLVED",
    summary: "Successfully scheduled a new patient routine cleaning for Monday, July 29th at 9:00 AM. Verified MetLife PPO insurance.",
    createdAt: "2026-07-24T14:32:00.000Z",
    messages: [
      { sender: "PATIENT", text: "Hi, I'm looking to schedule a routine dental checkup as a new patient." },
      { sender: "AI_ASSISTANT", text: "Hello! I'd be happy to help you with that. Can I start by getting your full name, email, and phone number?" },
      { sender: "PATIENT", text: "Eleanor Vance, eleanor@example.com, and this is my cell phone." },
      { sender: "AI_ASSISTANT", text: "Thank you, Eleanor. Do you have dental insurance you'd like us to verify?" },
      { sender: "PATIENT", text: "Yes, I have MetLife PPO. Group number 340982-A." },
      { sender: "AI_ASSISTANT", text: "Perfect, I've noted that down. I see an opening on Monday, July 29th at 9:00 AM with Dr. Taylor. Would that time work for your cleaning?" },
      { sender: "PATIENT", text: "Yes, that works great. Please book it." },
      { sender: "AI_ASSISTANT", text: "Excellent! I have confirmed your appointment for July 29th at 9:00 AM. A confirmation text has been details to you." }
    ]
  },
  {
    id: "2",
    patientName: "Marcus Cooper",
    patientPhone: "(555) 018-4521",
    patientEmail: "marcus.cooper@example.com",
    channel: "Web Chat",
    status: "RESOLVED",
    summary: "Answered patient queries regarding implant consultation costs, general financing routes, and location accessibility.",
    createdAt: "2026-07-24T14:18:00.000Z",
    messages: [
      { sender: "PATIENT", text: "Do you guys do dental implants? What is the general consultation cost?" },
      { sender: "AI_ASSISTANT", text: "Yes, we specialize in full dental implants! We offer a complimentary initial implant consultation, which includes high-resolution 3D CT scans to map out the procedure." },
      { sender: "PATIENT", text: "Awesome. Do you support payment plans?" },
      { sender: "AI_ASSISTANT", text: "Absolutely, we partner with both CareCredit and Proceed Finance to offer flexible 0% interest monthly payment options. We can help you set this up during your consult." }
    ]
  },
  {
    id: "3",
    patientName: "Sylvia Chen",
    patientPhone: "(555) 011-8890",
    patientEmail: "sylvia@example.com",
    channel: "Voice Call",
    status: "ACTIVE",
    summary: "Incoming patient call regarding wisdom teeth removal. Described severe pain. Seeking urgent opening same-day.",
    createdAt: "2026-07-24T13:45:00.000Z",
    messages: [
      { sender: "PATIENT", text: "Hello, my bottom-left wisdom teeth is causing huge throbbing pain since morning. Can I get squeezed in today?" },
      { sender: "AI_ASSISTANT", text: "I'm so sorry you're in pain, Sylvia. Let me check the schedule immediately. I have a priority emergency slot opening at 3:30 PM today with Dr. Reynolds. Would you like me to claim that for you?" },
      { sender: "PATIENT", text: "Yes please, I'll take it." }
    ]
  },
  {
    id: "4",
    patientName: "Jeremy Thorne",
    patientPhone: "(555) 012-7711",
    patientEmail: "jthorne@example.com",
    channel: "SMS",
    status: "NEEDS_FOLLOW_UP",
    summary: "Patient booking details generated but PMS database returned scheduling sync timeout. Office staff manual review requested.",
    createdAt: "2026-07-24T11:02:00.000Z",
    messages: [
      { sender: "PATIENT", text: "Need to book a crown replacement." },
      { sender: "AI_ASSISTANT", text: "I can check that. I found a slot on Thursday, July 30th at 11:00 AM." },
      { sender: "PATIENT", text: "Okay, book it." },
      { sender: "AI_ASSISTANT", text: "I'm processing that booking now... Just a moment." }
    ]
  }
];

export default function TranscriptsLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(MOCK_CONVERSATIONS[0]);

  // Filter conversations
  const filteredChats = MOCK_CONVERSATIONS.filter(
    (c) =>
      c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
          Live Conversation Transcripts
        </h1>
        <p className="text-sm text-slate-400">
          Review live patient texts, voice call transcripts, and appointment intakes processed by Anvora.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: List of Chats (1/3 width) */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm text-slate-200 bg-slate-950/40 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Conversations Cards List */}
          <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
            {filteredChats.map((chat) => {
              const isSelected = selectedChat.id === chat.id;
              return (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full text-left p-4 rounded-xl border backdrop-blur-sm transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-primary/5 border-primary/30"
                      : "bg-slate-950/40 border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white text-sm truncate">{chat.patientName}</span>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">
                      {chat.channel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {chat.summary}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                    {/* Status Pill */}
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        chat.status === "RESOLVED"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : chat.status === "ACTIVE"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {chat.status === "RESOLVED" && <CheckCircle className="h-2.5 w-2.5" />}
                      {chat.status === "ACTIVE" && <Clock className="h-2.5 w-2.5" />}
                      {chat.status === "NEEDS_FOLLOW_UP" && <AlertCircle className="h-2.5 w-2.5" />}
                      {chat.status}
                    </span>
                    <span className="text-[9px] text-slate-500">
                      {new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Conversation Thread Details View (2/3 width) */}
        <div className="lg:col-span-2 bg-slate-950/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm min-h-[500px] flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-5 border-b border-white/5">
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wide">
                  Active Conversation Session
                </span>
                <h3 className="text-lg font-bold text-white font-display">
                  {selectedChat.patientName}
                </h3>
              </div>

              {/* Patient contact pills */}
              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-white/5 text-xs text-slate-400">
                  <Phone className="h-3 w-3 text-slate-550" />
                  {selectedChat.patientPhone}
                </span>
                {selectedChat.patientEmail && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-white/5 text-xs text-slate-400">
                    <Mail className="h-3 w-3 text-slate-550" />
                    {selectedChat.patientEmail}
                  </span>
                )}
              </div>
            </div>

            {/* Conversation Flow Area */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {selectedChat.messages.map((msg, i) => {
                const isAI = msg.sender === "AI_ASSISTANT";
                return (
                  <div
                    key={i}
                    className={`flex ${isAI ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed border ${
                        isAI
                          ? "bg-slate-950 border-white/5 text-slate-200"
                          : "bg-primary border-primary/20 text-slate-950 font-medium"
                      }`}
                    >
                      {isAI && (
                        <div className="flex items-center gap-1.5 mb-1 text-[10px] text-primary font-bold">
                          <Sparkles className="h-3 w-3" />
                          <span>Anvora AI</span>
                        </div>
                      )}
                      <p>{msg.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prompt Summary Action card */}
          {selectedChat.status === "NEEDS_FOLLOW_UP" && (
            <div className="mt-8 bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4" /> PMS Integration Syncing Error
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 max-w-[420px]">
                  Anvora was unable to automatically sync this appointment details to your local Dentrix server due to a response timeout. Please resolve this slot manually.
                </p>
              </div>
              <button className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm">
                Manually Sync
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
