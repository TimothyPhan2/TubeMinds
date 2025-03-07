"use client";

import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Sidebar Component */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="transition-all duration-300 pt-4 lg:pl-64">
        <div className="xl:container mx-auto px-4 md:px-6 py-4 relative">
          {/* Background for main content area */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-indigo-950/40 backdrop-blur-sm rounded-xl shadow-xl border border-indigo-500/10 -z-10"></div>
          
          {children}
        </div>
      </div>
    </div>
  );
}
