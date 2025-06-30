// src/components/layout/DashboardLayout.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CarFront,
  PlusCircle,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import Footer from "../ui/Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}
const sidebarItems: SidebarItem[] = [
  { id: "dashboard", label: "لوحة التحكم", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
  { id: "vehicles", label: "المركبات", icon: <CarFront size={20} />, href: "/vehicles/" },
  { id: "add-vehicle", label: "إضافة مركبة", icon: <PlusCircle size={20} />, href: "/vehicles/new" },
  { id: "reports", label: "التقارير", icon: <FileText size={20} />, href: "/reports" },
  { id: "settings", label: "الإعدادات", icon: <Settings size={20} />, href: "/settings" },
  { id: "logout", label: "تسجيل الخروج", icon: <LogOut size={20} />, href: "/logout" },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
          <div dir="rtl" className="min-h-screen flex bg-gradient-to-br from-sky-200 via-sky-100 to-sky-50 font-[Tajawal] text-right">

      {/* الشريط الجانبي */}
      <aside className="w-64 bg-white text-gray-800 p-4 shadow-xl hidden md:block">
        <div className="text-xl font-bold mb-8 flex items-center gap-2 text-cyan-700">

        <CarFront className="w-6 h-6" /> <span>نظام البعاج</span>
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
