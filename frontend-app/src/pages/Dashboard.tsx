// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import VehicleService from "../services/VehicleService";
import { motion } from "framer-motion";
import { FaCar, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useNavigate } from "react-router-dom";

Chart.register(...registerables);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalVehicles: 0, activeVehicles: 0, totalRemaining: 0 });
  const [recentVehicles, setRecentVehicles] = useState<any[]>([]);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const vehicles = await VehicleService.getAllVehicles();

      const totalVehicles = vehicles.length;
      const activeVehicles = vehicles.filter((v: any) => v.remaining_amount > 0).length;
      const totalRemaining = vehicles.reduce((sum: number, v: any) => sum + (v.remaining_amount || 0), 0);

      setStats({ totalVehicles, activeVehicles, totalRemaining });

      const recent = vehicles
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 3)
        .map((v: any) => ({
          id: v.id,
          name: `${v.vehicle_letter} ${v.vehicle_number} - ${v.province}`,
          date: new Date(v.created_at).toLocaleDateString("ar-IQ"),
          amount: formatCurrency(v.amount),
        }));

      setRecentVehicles(recent);

      const provinceMap = new Map<string, number>();
      vehicles.forEach((v: any) => {
        provinceMap.set(v.province, (provinceMap.get(v.province) || 0) + 1);
      });

      setChartData({
        labels: Array.from(provinceMap.keys()),
        datasets: [
          {
            label: "عدد المركبات",
            data: Array.from(provinceMap.values()),
            backgroundColor: ["#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"],
            borderColor: "#fff",
            borderWidth: 1,
          },
        ],
      });

      setRecentPayments([
        { id: 1, amount: "$1,500", date: "أمس", status: "مكتمل" },
        { id: 2, amount: "$2,300", date: "2023-05-25", status: "مكتمل" },
        { id: 3, amount: "$800", date: "2023-05-23", status: "مكتمل" },
      ]);

      setError(null);
    } catch (err) {
      setError("حدث خطأ أثناء تحميل البيانات.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout title="لوحة التحکم والاحصائيات">
      <div className="sticky top-0 bg-white z-50 pb-4 mb-6 shadow-sm rounded-b-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4 pt-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-cyan-900 font-[Tajawal]">لوحة التحكم</h1>
            <p className="text-gray-600 font-[Tajawal] text-sm">
              مرحباً بك في نظام إبراهيم البعاج لإدارة المعاملات
            </p>
          </div>

          <div className="w-full md:w-auto flex gap-3">
            <button
              onClick={() => navigate("/vehicles/new")}
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-2xl text-sm md:text-base shadow transition-all duration-300 w-full md:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-[Tajawal]">إضافة مركبة</span>
            </button>

            <button
              onClick={fetchDashboardData}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-2xl text-sm shadow w-full md:w-auto"
            >
              تحديث البيانات
            </button>
          </div>
        </div>
      </div>

      {/* باقي محتوى لوحة التحكم يبقى كما هو */}
    </DashboardLayout>
  );
};

export default Dashboard;
