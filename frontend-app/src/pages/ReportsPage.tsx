import React, { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import QRCode from "react-qr-code";
import VehicleService from "../services/VehicleService";
import GlassCard from "../components/ui/GlassCard";
import GlassInput from "../components/ui/GlassInput";
import GlassButton from "../components/ui/GlassButton";
import { Printer, Car } from "lucide-react";
import { RiWhatsappFill } from "react-icons/ri";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import headerLogo from "../assets/header-logo.png";
import footerLogo from "../assets/footer-logo.png";

const formatNumber = (num: number | string | null) => {
  if (num === null || num === undefined) return "-";
  const n = typeof num === "number" ? num : parseFloat(num);
  return isNaN(n) ? num : n.toLocaleString("en-US");
};

const ReportsPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    setMessage("جارٍ البحث...");
    try {
      const data = await VehicleService.getAllVehicles();
      const term = query.trim();
      const filtered = data.filter((v: any) =>
        !term
          ? true
          : v.vehicle_number.includes(term) ||
            v.chassis_number.includes(term) ||
            (v.importer_name && v.importer_name.includes(term)) ||
            (v.buyer_name && v.buyer_name.includes(term))
      );
      if (!filtered.length) {
        setMessage("❌ لا توجد نتائج متاحة.");
      } else {
        setVehicles(filtered);
        setMessage("");
      }
    } catch {
      setMessage("❌ تعذر الاتصال بالخادم.");
    }
  };

  const generatePdf = async () => {
    const doc = new jsPDF();
    let y = 10;
    doc.addImage(await toDataUrl(headerLogo), "PNG", 10, y, 30, 15);
    doc.text("تقرير المركبات", 105, y + 10, { align: "center" });
    y += 20;

    vehicles.forEach((v, idx) => {
      doc.text(`مركبة ${idx + 1}: ${v.vehicle_letter} ${v.vehicle_number}`, 10, y);
      y += 4;
      autoTable(doc, {
        startY: y,
        head: [["الحقل", "القيمة"]],
        body: [
          ["رقم الشاصي", v.chassis_number],
          ["المستورد", v.importer_name || "-"],
          ["المشتري", v.buyer_name || "-"],
          ["السعر الكلي", formatNumber(v.amount)],
          ["المدفوع", formatNumber(v.paid_amount)],
          ["المتبقي", formatNumber(v.remaining_amount)],
        ],
      });
      const lastY = (doc as any).lastAutoTable?.finalY;
      if (typeof lastY === "number") {
        y = lastY + 10;
      }
    });

    doc.addImage(await toDataUrl(footerLogo), "PNG", 85, y, 40, 20);
    return doc;
  };

  const sendWhatsApp = async () => {
    const doc = await generatePdf();
    const blob = doc.output("blob");
    const file = new File([blob], "report.pdf", { type: "application/pdf" });

    if (navigator.share && (navigator as any).canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], text: "تقرير المركبات" });
      return;
    }

    doc.save("report.pdf");

    const phone = "9647816792151";
    const text = encodeURIComponent("تم إنشاء تقرير المركبات. مرفق ملف PDF.");
    const url = `https://wa.me/${phone}?text=${text}`;
    window.open(url, "_blank");
  };

  const toDataUrl = async (url: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  return (
    <DashboardLayout title="التقارير">
      <div className="max-w-5xl mx-auto p-4 text-center print:bg-white print:text-black">
        <header id="report-header" className="hidden print:block print:w-full print:mb-4">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <img src={headerLogo} alt="شعار البعاج" className="w-20" />
            <h1 className="text-xl font-bold text-center flex-1 text-black">تقرير المركبات</h1>
            <QRCode value="https://wa.me/9647816792151" size={60} />
          </div>
        </header>

        <GlassCard className="p-6 mb-6 print:hidden">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <GlassInput
                label="بحث"
                placeholder="آخر 6 أرقام من رقم الشاصي أو اسم المشتري"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                fullWidth
              />
            </div>
            <GlassButton onClick={handleSearch} variant="primary">
              بحث
            </GlassButton>
          </div>
        </GlassCard>

        {message && <div className="text-red-600 font-semibold mb-4">{message}</div>}

        {vehicles.map((v, idx) => (
          <GlassCard key={idx} className="p-6 mb-6 text-right print:shadow-none">
            <h2 className="text-xl font-bold mb-3 text-white flex items-center gap-1">
              <Car size={20} /> {v.vehicle_letter} {v.vehicle_number} - {v.province}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              <div className="border p-2 rounded bg-white/10">
                <div className="text-xs text-gray-200">رقم الشاصي</div>
                <div className="font-semibold">{v.chassis_number}</div>
              </div>
              {v.importer_name && (
                <div className="border p-2 rounded bg-white/10">
                  <div className="text-xs text-gray-200">المستورد</div>
                  <div className="font-semibold">{v.importer_name}</div>
                </div>
              )}
              {v.buyer_name && (
                <div className="border p-2 rounded bg-white/10">
                  <div className="text-xs text-gray-200">المشتري</div>
                  <div className="font-semibold">{v.buyer_name}</div>
                </div>
              )}
              {v.amount !== undefined && (
                <div className="border p-2 rounded bg-white/10">
                  <div className="text-xs text-gray-200">السعر الكلي</div>
                  <div className="font-semibold">{formatNumber(v.amount)}</div>
                </div>
              )}
              {v.paid_amount !== undefined && (
                <div className="border p-2 rounded bg-white/10">
                  <div className="text-xs text-gray-200">المدفوع</div>
                  <div className="font-semibold">{formatNumber(v.paid_amount)}</div>
                </div>
              )}
              {v.remaining_amount !== undefined && (
                <div className="border p-2 rounded bg-white/10">
                  <div className="text-xs text-gray-200">المتبقي</div>
                  <div className="font-semibold">{formatNumber(v.remaining_amount)}</div>
                </div>
              )}
            </div>
          </GlassCard>
        ))}

        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center print:hidden">
          <GlassButton onClick={() => window.print()} variant="secondary" icon={<Printer />} iconPosition="left">
            طباعة التقرير
          </GlassButton>
          <GlassButton onClick={sendWhatsApp} variant="primary" icon={<RiWhatsappFill />} iconPosition="left">
            واتساب
          </GlassButton>
          <GlassButton onClick={() => window.history.back()} variant="secondary">
            رجوع
          </GlassButton>
        </div>

        <footer id="report-footer" className="hidden print:block text-center mt-6 print:mt-8">
          <img src={footerLogo} alt="الركن التقني" className="w-20 mx-auto mb-1" />
        </footer>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;