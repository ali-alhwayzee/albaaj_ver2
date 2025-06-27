// src/components/LoginCard.tsx
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { login } from "@/services/authService";

interface LoginFormInputs {
  username: string;
  password: string;
}

interface LoginCardProps {
  redirectTo?: string;
}

export default function LoginCard({ redirectTo }: LoginCardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const getRedirectPath = () => {
    const fromState = (location.state as any)?.from?.pathname;
    const urlParams = new URLSearchParams(location.search);
    const fromQuery = urlParams.get('redirect');
    return fromState || fromQuery || "/dashboard";
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await login(data.username, data.password);
  
      localStorage.removeItem("token");
      localStorage.removeItem("username");
  
      localStorage.setItem("token", result.access_token);
      localStorage.setItem("username", data.username);
  
      console.log("✅ تم تسجيل الدخول بنجاح");
  
      const redirectPath = redirectTo || getRedirectPath();
      navigate(redirectPath, { replace: true }); // ✅ التعديل هنا
    } catch (error: any) {
      console.error("❌ خطأ في تسجيل الدخول:", error);
      alert(error.message || "حدث خطأ أثناء تسجيل الدخول");
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl text-right"
    >
      <h2 className="text-2xl font-bold text-cyan-700 text-center mb-6">تسجيل الدخول</h2>

      {(location.state || location.search.includes('redirect')) && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-md text-sm text-yellow-800">
          انتهت صلاحية جلستك، يرجى تسجيل الدخول مرة أخرى
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">اسم المستخدم</label>
          <div className="relative">
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-700">
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="أدخل اسم المستخدم"
              {...register("username", { required: "اسم المستخدم مطلوب" })}
              className="w-full bg-gray-100 text-gray-800 border border-gray-300 pr-10 pl-3 py-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          {errors.username && (
            <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">كلمة المرور</label>
          <div className="relative">
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-700">
              <FaLock />
            </span>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password", { required: "كلمة المرور مطلوبة" })}
              className="w-full bg-gray-100 text-gray-800 border border-gray-300 pr-10 pl-3 py-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-md transition disabled:opacity-50"
        >
          {isSubmitting ? "جاري الدخول..." : "دخول"}
        </button>

        <p className="text-sm text-gray-600 text-center mt-4">
          ليس لديك حساب؟{" "}
          <a href="/register" className="text-cyan-700 hover:underline">
            إنشاء حساب
          </a>
        </p>
      </form>
    </motion.div>
  );
}
