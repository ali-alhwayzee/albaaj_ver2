// src/services/authService.ts
import axios from "@/utils/axiosInstance"; // ✅ يحتوي على baseURL والاعتراضات

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post("/auth/login", {
      username,
      password,
    });

    // ✅ تنظيف التوكن من علامات الاقتباس إن وُجدت
    const token = response.data.access_token?.replace(/^"(.*)"$/, "$1");

    return { ...response.data, access_token: token };
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await axios.post("/auth/register", {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Registration failed");
  }
};
