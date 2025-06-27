// src/pages/LoginPage.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import "@/assets/styles/AuthPage.css";

const LoginPage: React.FC = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  return (
    <div className="login-background min-h-screen flex items-center justify-center font-[Tajawal] px-4">
      <LoginCard redirectTo={from} />
    </div>
  );
};

export default LoginPage;
