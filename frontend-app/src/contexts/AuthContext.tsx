// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: null,
  isLoading: true,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    console.warn("🚪 Logout triggered");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername(null);
  };

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    console.log("🔍 Checking token on mount:", rawToken);

    const token = rawToken?.replace(/^['"]|['"]$/g, "");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const now = Date.now();
        const expiry = decoded.exp * 1000;

        console.log("🧾 Decoded token:", decoded);
        console.log("⏳ Expiry time:", new Date(expiry).toISOString());
        console.log("🕒 Now:", new Date(now).toISOString());

        if (expiry > now) {
          setIsAuthenticated(true);
          setUsername(decoded.sub || null);
          console.log("✅ Token is valid");
        } else {
          console.warn("⚠️ Token expired");
          logout();
        }
      } catch (err) {
        console.error("❌ Failed to decode token:", err);
        logout();
      }
    } else {
      console.warn("🚫 No token found");
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handler = () => logout();
    document.addEventListener("unauthorized", handler);
    return () => document.removeEventListener("unauthorized", handler);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
