import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { getOrCreateUserAndClinic } from "@/lib/auth-sync";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  // Autoprovisions clinic user data in Prisma on first authentication check
  const session = await getOrCreateUserAndClinic();

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#070B14] text-slate-205 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-md w-full text-center space-y-4">
          <h2 className="text-xl font-bold text-white font-display">Authentication Required</h2>
          <p className="text-sm text-slate-400">Loading practice credentials... Please verify your session details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#070B14] font-sans antialiased text-slate-100">
      {/* Decorative glows for dashboard */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-teal-500/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Navigation sidebar */}
      <Sidebar />

      {/* Main content viewport */}
      <div className="flex-1 flex flex-col min-w-0 z-10 lg:pl-64">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
