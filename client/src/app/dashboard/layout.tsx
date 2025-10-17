"use client";

import { LayoutProvider } from "@/context/LayoutContext";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { useLanguage } from "@/context/LanguageContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguage(); // current language

  return (
    <LayoutProvider>
      <div
        className={`min-h-screen bg-gray-50 flex ${
          language === "Arabic" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Sidebar (fixed on desktop) */}
        <Sidebar />

        {/* Main content wrapper */}
        <div
          className={`flex-1 flex flex-col min-h-screen ${
            language === "English" ? "lg:ml-[270px]" : "lg:mr-[270px]"
          }`}
        >
          {/* Top bar */}
          <TopBar />

          {/* Scrollable main content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </LayoutProvider>
  );
}
