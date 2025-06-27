// src/components/auth/PrivateRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";

interface Props {
  children: React.ReactElement;
}

// يمكنك توسيع الـ Payload إن أردت إضافة حقول أخرى
interface JwtPayload extends DefaultJwtPayload {
  [key: string]: any;
}

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded = jwt_decode(token) as JwtPayload;
    return decoded.exp * 1000 > Date.now(); // مقارنة تاريخ الانتهاء بالوقت الحالي
  } catch {
    return false;
  }
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  console.log("🔐 token from PrivateRoute:", token);

  if (!isTokenValid(token)) {
    console.warn("🔐 Invalid or expired token");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
