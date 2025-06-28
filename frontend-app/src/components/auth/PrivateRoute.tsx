// src/components/auth/PrivateRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode, JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children: React.ReactElement;
}

interface JwtPayload extends DefaultJwtPayload {
  [key: string]: any;
}

const isTokenValid = (rawToken: string | null): boolean => {
  if (!rawToken) return false;
  try {
    const token = rawToken.replace(/^['"]|['"]$/g, "").trim();
    const decoded = jwtDecode<JwtPayload>(token);
    const exp = typeof decoded.exp === "string" ? parseInt(decoded.exp, 10) : decoded.exp;
    if (typeof exp !== "number" || Number.isNaN(exp)) return false;
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return children;
  }

  const token = localStorage.getItem("token");

  if (isTokenValid(token)) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;