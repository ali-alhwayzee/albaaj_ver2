import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { register as registerService } from "@/services/authService";
import "@/assets/styles/AuthPage.css"; // تأكد من وجود هذا الملف للخلفية المتحركة

interface RegisterFormInputs {
  username: string;
  password: string;
}

export default function RegisterCard() {
  const navigate = useNavigate();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerService(data.username, data.password);
      alert("تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن.");
      navigate("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-background min-h-screen flex items-center justify-center font-[Tajawal] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl text-right"
      >
        <div className="flex justify-center mb-4">
          <UserPlus className="text-cyan-700" size={40} />
        </div>

        <h2 className="text-2xl font-bold text-cyan-700 text-center mb-6">إنشاء حساب جديد</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
        <label className="block text-gray-700 mb-1">اسم المستخدم</label>
        <input
        type="text"
        autoComplete="username"
        {...formRegister("username", { required: "اسم المستخدم مطلوب" })}
          placeholder="أدخل اسم المستخدم"
          className="w-full bg-gray-100 text-gray-800 border border-gray-300 px-4 py-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">كلمة المرور</label>
            <input
              type="password"
              autoComplete="new-password"
              {...formRegister("password", { required: "كلمة المرور مطلوبة" })}
              placeholder="••••••••"
              className="w-full bg-gray-100 text-gray-800 border border-gray-300 px-4 py-2 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-md transition"
          >
            {isSubmitting ? "جاري..." : "تسجيل"}
          </button>

          <p className="text-sm text-gray-600 text-center mt-4">
            لديك حساب بالفعل؟{" "}
            <a href="/login" className="text-cyan-700 hover:underline">
              تسجيل الدخول
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
