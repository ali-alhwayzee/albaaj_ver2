// src/components/ui/Footer.tsx
import React from "react";
import footerLogo from "@/assets/footer-logo.png"; // عدّل المسار حسب مكان الشعار

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 text-center text-sm text-gray-700 font-[Tajawal] print:hidden">
      <div className="flex justify-center mb-3">
        <img
          src={footerLogo}
          alt="footer"
          className="w-24 md:w-28 hover:scale-105 transition duration-300 ease-in-out"
        />
      </div>

      <p className="text-gray-800 font-medium">بواسطة: مركز الركن التقني للحلول البرمجية</p>
      <p className="text-gray-600">📧 ali.alhwayzee@gmail.com</p>
      <a
        href="https://wa.me/9647816792151"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 font-semibold hover:underline flex justify-center items-center gap-1 mt-1"
      >
        📱 تواصل عبر واتساب
      </a>
    </footer>
  );
};

export default Footer;
