// src/components/layout/DashboardLayout.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import Footer from "../ui/Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const sidebarItems = [
  { id: "dashboard", label: "لوحة التحكم", icon: "📊", href: "/dashboard" },
  { id: "vehicles", label: "المركبات", icon: "🚗", href: "/vehicles/" },
  { id: "add-vehicle", label: "إضافة مركبة", icon: "➕", href: "/vehicles/new" },

  //{ id: "add-vehicle", label: "إضافة مركبة", icon: "➕", href: "/vehicle/add" },
  { id: "reports", label: "التقارير", icon: "📝", href: "/reports" },
  { id: "settings", label: "الإعدادات", icon: "⚙️", href: "/settings" },
  { id: "logout", label: "تسجيل الخروج", icon: "🚪", href: "/logout" },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <div dir="rtl" className="min-h-screen flex bg-gradient-to-bl from-blue-100 to-cyan-100 font-[Tajawal] text-right">
      {/* الشريط الجانبي */}
      <aside className="w-64 bg-white text-gray-800 p-4 shadow-xl hidden md:block">
        <div className="text-xl font-bold mb-8 flex items-center gap-2 text-cyan-700">
          🚗 <span>نظام البعاج</span>
        </div>
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.href)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium transition hover:bg-cyan-100 hover:text-cyan-700",
                currentPath === item.href && "bg-cyan-200 text-cyan-900 font-bold"
              )}
            >
              <span>{item.label}</span>
              <span className="text-lg">{item.icon}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col">
        {/* الشريط العلوي */}
        <header className="w-full bg-white/70 backdrop-blur-md px-6 py-4 shadow-sm z-10 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-cyan-900">{title}</h1>
            <span className="text-sm text-gray-700">
              مرحباً، {localStorage.getItem("username") || "المستخدم"}
            </span>
          </div>
        </header>

        {/* محتوى الصفحة + الفوتر */}
        <main className="flex-1 p-6 max-w-7xl mx-auto">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
