// src/utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

// ✅ إضافة التوكن بعد إزالة علامات الاقتباس إن وجدت
axiosInstance.interceptors.request.use((config) => {
  const rawToken = localStorage.getItem("token");
  const token = rawToken?.replace(/^"(.*)"$/, "$1"); // إزالة " إذا كانت موجودة
  console.log("📤 Sending token:", token); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ التعامل مع انتهاء الجلسة وإرسال حدث إلى React
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("🔐 الجلسة منتهية أو التوكن غير صالح - سيتم تسجيل الخروج");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      document.dispatchEvent(new CustomEvent("unauthorized"));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
