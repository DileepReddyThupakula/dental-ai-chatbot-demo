"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Save,
  Volume2,
  Sliders,
  Settings2,
  FileCheck,
  Loader2
} from "lucide-react";

export default function AssistantSettings() {
  const [voiceModel, setVoiceModel] = useState("openai-gpt-4o-audio");
  const [widgetColor, setWidgetColor] = useState("#0f766e");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a friendly Virtual Dental Assistant for SmileBright Dental Practice. Your core goals are: 1. Qualify and collect patient details (name, email, phone). 2. Answer practice FAQs (hours, address). 3. Identify appointments openings and sync bookings to the calendar."
  );
  const [collectInsurance, setCollectInsurance] = useState(true);
  const [collectReason, setCollectReason] = useState(true);
  const [allowNewPatients, setAllowNewPatients] = useState(true);
  const [temperature, setTemperature] = useState(0.2);

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadAssistantSettings() {
      try {
        const res = await fetch("/api/assistant");
        if (res.ok) {
          const data = await res.json();
          setVoiceModel(data.voiceModel || "openai-gpt-4o-audio");
          setWidgetColor(data.widgetColor || "#0f766e");
          setSystemPrompt(data.systemPrompt || "");
          setTemperature(typeof data.temperature === "number" ? data.temperature : 0.2);

          const reqs = data.intakeRequirements || {};
          setCollectInsurance(reqs.collectInsurance !== false);
          setCollectReason(reqs.collectReasonForVisit !== false);
          setAllowNewPatients(reqs.allowNewPatients !== false);
        }
      } catch (err) {
        console.error("Failed to load assistant settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAssistantSettings();
  }, []);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/assistant", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemPrompt,
          voiceModel,
          widgetColor,
          temperature,
          intakeRequirements: {
            collectInsurance,
            collectReasonForVisit: collectReason,
            allowNewPatients,
            collectEmail: true,
            collectPhone: true,
          },
        }),
      });

      if (res.ok) {
        setSaveMessage("Changes saved successfully!");
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        const errData = await res.json();
        setSaveMessage(`Error: ${errData.error || "Failed to save changes"}`);
        setTimeout(() => setSaveMessage(null), 5000);
      }
    } catch (err) {
      console.error("Failed to save changes:", err);
      setSaveMessage("Network error. Please try again.");
      setTimeout(() => setSaveMessage(null), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="space-y-2 w-1/3">
            <div className="h-8 bg-slate-900 rounded-lg" />
            <div className="h-4 bg-slate-900 rounded-md" />
          </div>
          <div className="h-10 w-32 bg-slate-900 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-slate-900/40 border border-white/5 rounded-2xl" />
            <div className="h-64 bg-slate-900/40 border border-white/5 rounded-2xl" />
          </div>
          <div className="h-80 bg-slate-900/40 border border-white/5 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
            AI Assistant Configuration
          </h1>
          <p className="text-sm text-slate-400">
            Customize the behavior, settings, prompts, and tone of your virtual front desk receptionist.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {saveMessage && (
            <span className={`text-xs font-medium ${saveMessage.startsWith("Error") || saveMessage.startsWith("Network") ? "text-rose-400 animate-fade-in" : "text-emerald-450 animate-fade-in"}`}>
              {saveMessage}
            </span>
          )}
          <button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-slate-950 font-bold text-sm hover:bg-primary/95 disabled:opacity-50 transition-all shadow-md shadow-primary/20 cursor-pointer"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns: Config values (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Core System Instructions */}
          <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm space-y-4">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Sliders className="h-4 w-4 text-primary" />
              Core System Instructions & Prompts
            </h2>
            <p className="text-xs text-slate-450 leading-relaxed">
              Define the character, guidelines, limits, and knowledge constraints for the AI model when talking with patients. Keep prompts concise.
            </p>
            <div className="space-y-1">
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={6}
                className="w-full text-slate-200 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="Enter prompt instructions for clinic virtual receptionist..."
              />
              <span className="text-[10px] text-slate-500 float-right">
                {systemPrompt.length} / 2000 characters
              </span>
            </div>
          </div>

          {/* Section 2: Intake Requirements */}
          <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm space-y-4">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-primary" />
              Patient Intake Information Toggles
            </h2>
            <p className="text-xs text-slate-450 leading-relaxed">
              Specify what demographic and insurance details the AI receptionist must collect before displaying scheduling slots.
            </p>

            <div className="space-y-3.5 pt-2">
              {/* Toggle Item */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Require Insurance Carrier</h4>
                  <p className="text-[11px] text-slate-500">
                    Collect details about PPO provider and membership numbers
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={collectInsurance}
                  onChange={(e) => setCollectInsurance(e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3.5">
                <div>
                  <h4 className="text-sm font-bold text-white">Require Reason for Visit</h4>
                  <p className="text-[11px] text-slate-500">
                    Ask if the visit is for cleaning, implants, pain, or cosmetic care
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={collectReason}
                  onChange={(e) => setCollectReason(e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3.5">
                <div>
                  <h4 className="text-sm font-bold text-white">Allow Direct New Patient Bookings</h4>
                  <p className="text-[11px] text-slate-500">
                    Permit patients without existing files to claim open calendar slots
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={allowNewPatients}
                  onChange={(e) => setAllowNewPatients(e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual parameters (1/3 width) */}
        <div className="space-y-6">
          {/* Audio Setup */}
          <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm space-y-4">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-primary" />
              Voice Selection
            </h2>
            <p className="text-xs text-slate-450 leading-relaxed">
              Select the audio model deployed for patient calls and voice reminders.
            </p>
            <div className="space-y-2">
              <select
                value={voiceModel}
                onChange={(e) => setVoiceModel(e.target.value)}
                className="w-full text-sm text-slate-200 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary/50"
              >
                <option value="openai-gpt-4o-audio">OpenAI Audio (Default)</option>
                <option value="gemini-flash-audio">Gemini Flash Audio</option>
                <option value="custom-anvora-professional">Anvora Professional (Warm)</option>
              </select>
            </div>
          </div>

          {/* Widget Layout Style */}
          <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm space-y-4">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-primary" />
              Aesthetics & Tone
            </h2>
            <p className="text-xs text-slate-450 leading-relaxed">
              Edit color settings and response temperature thresholds.
            </p>

            <div className="space-y-4 pt-2">
              {/* Color Selector */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">Widget Hex Color</label>
                <div className="flex gap-2.5">
                  <input
                    type="color"
                    value={widgetColor}
                    onChange={(e) => setWidgetColor(e.target.value)}
                    className="w-10 h-10 border border-white/10 rounded-lg cursor-pointer bg-slate-900"
                  />
                  <input
                    type="text"
                    value={widgetColor}
                    onChange={(e) => setWidgetColor(e.target.value)}
                    className="flex-1 text-sm text-slate-250 bg-slate-900 border border-white/10 rounded-lg px-3 uppercase focus:outline-none"
                  />
                </div>
              </div>

              {/* Temperature Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Response Consistency</span>
                  <span className="text-primary font-mono">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-900 accent-primary rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-500">
                  <span>Strict / Factual</span>
                  <span>Creative</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget preview indicator card */}
          <div className="border border-white/5 bg-slate-950/20 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-3">
            <div
              className="w-9 h-9 border rounded-full flex items-center justify-center text-slate-950 shrink-0"
              style={{ backgroundColor: widgetColor }}
            >
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Live Chat Assist</h4>
              <p className="text-[10px] text-slate-500">Active widget using colors indicated above.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
