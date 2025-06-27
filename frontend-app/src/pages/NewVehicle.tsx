// src/pages/NewVehicle.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import VehicleService, { VehicleInput } from "../services/VehicleService";
import { toast } from "react-toastify";

const NewVehicle: React.FC = () => {
  const navigate = useNavigate();

  const [vehicleData, setVehicleData] = useState<VehicleInput>({
    vehicle_number: "",
    vehicle_letter: "",
    province: "",
    category: "private",
    chassis_number: "",
    importer_name: "",
    importer_phone: "",
    buyer_name: "",
    buyer_phone: "",
    work_location: "",
    amount: "",
    paid_amount: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await VehicleService.createVehicle(vehicleData);
      toast.success("✅ تم حفظ المركبة بنجاح");
      setVehicleData({
        vehicle_number: "",
        vehicle_letter: "",
        province: "",
        category: "private",
        chassis_number: "",
        importer_name: "",
        importer_phone: "",
        buyer_name: "",
        buyer_phone: "",
        work_location: "",
        amount: "",
        paid_amount: "",
        notes: ""
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      toast.error("❌ فشل في حفظ المركبة، حاول مرة أخرى");
    }
  };
  

  return (
    <DashboardLayout title="إضافة مركبة جديدة">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-cyan-900 font-[Tajawal]">
          نموذج إدخال بيانات المركبة
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 font-[Tajawal]">

          <div>
            <label className="block text-sm text-gray-600">رقم المركبة</label>
            <input type="text" name="vehicle_number" className="w-full border rounded p-2"
              value={vehicleData.vehicle_number} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm text-gray-600">حرف المركبة</label>
            <input type="text" name="vehicle_letter" className="w-full border rounded p-2"
              value={vehicleData.vehicle_letter} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm text-gray-600">المحافظة</label>
            <input type="text" name="province" className="w-full border rounded p-2"
              value={vehicleData.province} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm text-gray-600">التصنيف</label>
            <select name="category" className="w-full border rounded p-2"
              value={vehicleData.category} onChange={handleChange}>
              <option value="private">خصوصي</option>
              <option value="commercial">تجاري</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600">رقم الشاصي</label>
            <input type="text" name="chassis_number" className="w-full border rounded p-2"
              value={vehicleData.chassis_number} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm text-gray-600">اسم المستورد</label>
            <input type="text" name="importer_name" className="w-full border rounded p-2"
              value={vehicleData.importer_name} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm text-gray-600">هاتف المستورد</label>
            <input type="text" name="importer_phone" className="w-full border rounded p-2"
              value={vehicleData.importer_phone} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm text-gray-600">اسم المشتري</label>
            <input type="text" name="buyer_name" className="w-full border rounded p-2"
              value={vehicleData.buyer_name} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm text-gray-600">هاتف المشتري</label>
            <input type="text" name="buyer_phone" className="w-full border rounded p-2"
              value={vehicleData.buyer_phone} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm text-gray-600">مكان العمل</label>
            <input type="text" name="work_location" className="w-full border rounded p-2"
              value={vehicleData.work_location} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm text-gray-600">المبلغ الكلي</label>
            <input type="number" name="amount" className="w-full border rounded p-2"
              value={vehicleData.amount} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm text-gray-600">المدفوع</label>
            <input type="number" name="paid_amount" className="w-full border rounded p-2"
              value={vehicleData.paid_amount} onChange={handleChange} />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600">ملاحظات</label>
            <textarea name="notes" rows={3} className="w-full border rounded p-2"
              value={vehicleData.notes} onChange={handleChange}></textarea>
          </div>

          <div className="md:col-span-2 text-end mt-4">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
              حفظ المركبة
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default NewVehicle;
