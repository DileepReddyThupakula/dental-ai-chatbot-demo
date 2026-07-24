"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Zap,
  Save,
  Check,
  Database
} from "lucide-react";

const MOCK_SCHEDULER_APPOINTMENTS = [
  {
    time: "09:00 AM",
    patient: "Eleanor Vance",
    type: "Routine Cleaning",
    provider: "Dr. Rachel Taylor",
    syncStatus: "SUCCESS",
    details: "Dentrix ID: DX88902"
  },
  {
    time: "10:30 AM",
    patient: "Marcus Cooper",
    type: "Implant Consultation",
    provider: "Dr. Alan Reynolds",
    syncStatus: "SUCCESS",
    details: "Dentrix ID: DX88915"
  },
  {
    time: "11:45 AM",
    patient: "Blocked Out",
    type: "Practice Recess Buffer",
    provider: "All Providers",
    syncStatus: "SYSTEM",
    details: "Automated Buffer"
  },
  {
    time: "03:30 PM",
    patient: "Sylvia Chen",
    type: "Emergency Extraction",
    provider: "Dr. Alan Reynolds",
    syncStatus: "SUCCESS",
    details: "Dentrix ID: DX88924"
  }
];

export default function PMSScheduler() {
  const [minNoticeHours, setMinNoticeHours] = useState(2);
  const [maxBookingsPerDay, setMaxBookingsPerDay] = useState(6);
  const [pmsSyncMode, setPmsSyncMode] = useState("REALTIME");

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
            PMS Scheduler Integration
          </h1>
          <p className="text-sm text-slate-400">
            Control the calendar grid buffers, check active slots, and define scheduling constraints inside Dentrix / Eaglesoft.
          </p>
        </div>
        <button
          onClick={() => {}}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-slate-950 font-bold text-sm hover:bg-primary/95 transition-all shadow-md shadow-primary/20 shrink-0 cursor-pointer"
        >
          <Save className="h-4 w-4" />
          Save Rules
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Scheduling Sync View (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
                <CalendarIcon className="h-4.5 w-4.5 text-primary" />
                Live Sync Calendar View (Today)
              </h2>
              <span className="text-[10px] text-slate-500 font-mono">July 24, 2026</span>
            </div>

            {/* List schedule details */}
            <div className="space-y-3.5">
              {MOCK_SCHEDULER_APPOINTMENTS.map((apt, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-950 border border-white/5 rounded-xl text-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-1.5 text-primary font-mono font-bold pt-0.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{apt.time}</span>
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-white leading-none">{apt.patient}</h4>
                      <p className="text-[11px] text-slate-400">
                        {apt.type} • {apt.provider}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-550 font-mono hidden md:inline">
                      {apt.details}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        apt.syncStatus === "SUCCESS"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-slate-900 text-slate-400"
                      }`}
                    >
                      {apt.syncStatus === "SUCCESS" ? (
                        <>
                          <Check className="h-2.5 w-2.5" />
                          SYNCED
                        </>
                      ) : (
                        "BUFFER"
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Buffer controls (1/3 width) */}
        <div className="space-y-6">
          {/* Buffer configuration */}
          <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm space-y-4">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Zap className="h-4.5 w-4.5 text-primary" />
              Scheduling Safeguards
            </h2>
            <p className="text-xs text-slate-450 leading-relaxed">
              Maintain office manager controls by placing spacing rules on where AI is allowed to book appointments.
            </p>

            <div className="space-y-4.5 pt-2">
              {/* Notice Buffer Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Minimum Notice Buffer</span>
                  <span className="text-primary font-mono">{minNoticeHours} hours</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={minNoticeHours}
                  onChange={(e) => setMinNoticeHours(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-900 accent-primary rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                  Prevents patients from booking slots that occur sooner than {minNoticeHours} hours from now.
                </p>
              </div>

              {/* Booking density limit */}
              <div className="space-y-2.5 border-t border-white/5 pt-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-400">Max Bookings Per Day</label>
                  <input
                    type="number"
                    value={maxBookingsPerDay}
                    onChange={(e) => setMaxBookingsPerDay(parseInt(e.target.value))}
                    className="w-16 text-center text-sm font-semibold text-white bg-slate-950 border border-white/10 rounded-lg py-1 focus:outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Cap total bookings automatically generated by AI within a single operating day.
                </p>
              </div>
            </div>
          </div>

          {/* Integration Sync Modes */}
          <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm space-y-4">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Database className="h-4.5 w-4.5 text-primary" />
              Sync Logic Mode
            </h2>
            <p className="text-xs text-slate-450 leading-relaxed font-sans">
              Define database transaction behaviors when locking down slots.
            </p>

            <div className="space-y-2">
              <label className="flex items-center gap-2.5 p-3 rounded-lg border border-white/5 bg-slate-950/20 hover:border-white/10 cursor-pointer">
                <input
                  type="radio"
                  name="syncMode"
                  value="REALTIME"
                  checked={pmsSyncMode === "REALTIME"}
                  onChange={() => setPmsSyncMode("REALTIME")}
                  className="accent-primary"
                />
                <div className="text-[11px] leading-tight">
                  <h4 className="font-bold text-white">Realtime Write-Back</h4>
                  <p className="text-slate-500 mt-0.5">Write locks directly to PMS database instantly</p>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg border border-white/5 bg-slate-950/20 hover:border-white/10 cursor-pointer mt-2">
                <input
                  type="radio"
                  name="syncMode"
                  value="BUFFERED"
                  checked={pmsSyncMode === "BUFFERED"}
                  onChange={() => setPmsSyncMode("BUFFERED")}
                  className="accent-primary"
                />
                <div className="text-[11px] leading-tight">
                  <h4 className="font-bold text-white">Buffered Holding Queue</h4>
                  <p className="text-slate-500 mt-0.5">Hold bookings for manager verification sign-off</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
