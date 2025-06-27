// src/services/VehicleService.ts
import axios from "@/utils/axiosInstance";

// ✅ تعريف نوع البيانات المطلوبة عند إنشاء مركبة جديدة
export type VehicleInput = {
  vehicle_number: string;
  vehicle_letter: string;
  province: string;
  category: string;
  chassis_number: string;
  importer_name: string;
  importer_phone: string;
  buyer_name: string;
  buyer_phone: string;
  work_location: string;
  amount: number | string;
  paid_amount: number | string;
  notes: string;
};

const VehicleService = {
  getAllVehicles: async () => {
    try {
      const response = await axios.get("/vehicles/");
      return response.data;
    } catch (error) {
      console.error("خطأ في جلب المركبات:", error);
      throw error;
    }
  },

  getVehicleById: async (id: number) => {
    try {
      const response = await axios.get(`/vehicles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`خطأ في جلب المركبة ${id}:`, error);
      throw error;
    }
  },

  createVehicle: async (vehicleData: VehicleInput) => {
    try {
      const response = await axios.post("/vehicles/", vehicleData);
      return response.data;
    } catch (error) {
      console.error("خطأ في إنشاء المركبة:", error);
      throw error;
    }
  },

  updateVehicle: async (id: number, vehicleData: VehicleInput) => {
    try {
      const response = await axios.put(`/vehicles/${id}`, vehicleData);
      return response.data;
    } catch (error) {
      console.error(`خطأ في تحديث المركبة ${id}:`, error);
      throw error;
    }
  },

  deleteVehicle: async (id: number) => {
    try {
      const response = await axios.delete(`/vehicles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`خطأ في حذف المركبة ${id}:`, error);
      throw error;
    }
  },

  searchVehicles: async (params: any) => {
    try {
      const response = await axios.get("/vehicles/", { params });
      return response.data;
    } catch (error) {
      console.error("خطأ في البحث عن المركبات:", error);
      throw error;
    }
  },
};

export default VehicleService;
