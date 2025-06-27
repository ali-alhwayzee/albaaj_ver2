// src/pages/VehicleForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/layout/DashboardLayout';
import GlassCard from '../components/ui/GlassCard';
import GlassInput from '../components/ui/GlassInput';
import GlassSelect from '../components/ui/GlassSelect';
import GlassButton from '../components/ui/GlassButton';
import VehicleService from '../services/VehicleService';
import Footer from '../components/ui/Footer'; // ✅ مكون الفوتر

const VehicleForm: React.FC = () => {
  console.log("📌 Token inside VehicleForm:", localStorage.getItem("token"));

  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isEditMode = !!id && !isNaN(Number(id));

  const [formData, setFormData] = useState({
    vehicle_number: '',
    vehicle_letter: '',
    province: '',
    category: '',
    chassis_number: '',
    importer_name: '',
    importer_phone: '',
    buyer_name: '',
    buyer_phone: '',
    work_location: '',
    amount: '',
    paid_amount: '',
    remaining_amount: '0',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const letterOptions = [...'أبجدهوزحطيكلمنسعصقرشتثخذضظغفق'].map(l => ({ value: l, label: l }));
  const provinceOptions = ['بغداد', 'البصرة', 'نينوى', 'أربيل', 'النجف', 'كربلاء', 'الأنبار', 'ذي قار', 'ديالى', 'صلاح الدين', 'بابل', 'كركوك', 'واسط', 'ميسان', 'المثنى', 'دهوك', 'السليمانية', 'القادسية'].map(p => ({ value: p, label: p }));
  const categoryOptions = ['خاص', 'عام', 'حكومي', 'تجاري', 'أجرة', 'حمل'].map(c => ({ value: c, label: c }));

  useEffect(() => {
    const fetchVehicle = async () => {
      if (isEditMode && id && !isNaN(Number(id))) {
        try {
          setFetchLoading(true);
          const vehicleData = await VehicleService.getVehicleById(parseInt(id));
          setFormData({
            ...vehicleData,
            amount: vehicleData.amount.toString(),
            paid_amount: vehicleData.paid_amount.toString(),
            remaining_amount: vehicleData.remaining_amount.toString()
          });
        } catch {
          setSubmitError('حدث خطأ أثناء تحميل بيانات المركبة.');
        } finally {
          setFetchLoading(false);
        }
      }
    };
    fetchVehicle();
  }, [id, isEditMode]);

  useEffect(() => {
    const amount = parseFloat(formData.amount) || 0;
    const paid = parseFloat(formData.paid_amount) || 0;
    setFormData(prev => ({ ...prev, remaining_amount: (amount - paid).toString() }));
  }, [formData.amount, formData.paid_amount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (submitError) setSubmitError(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = ['vehicle_number', 'vehicle_letter', 'province', 'category', 'chassis_number', 'importer_name', 'buyer_name', 'amount'];
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) newErrors[field] = 'هذا الحقل مطلوب';
    });
    if (formData.importer_phone && !/^\d{10,11}$/.test(formData.importer_phone)) newErrors.importer_phone = 'رقم هاتف غير صالح';
    if (formData.buyer_phone && !/^\d{10,11}$/.test(formData.buyer_phone)) newErrors.buyer_phone = 'رقم هاتف غير صالح';
    if (formData.amount && isNaN(parseFloat(formData.amount))) newErrors.amount = 'يجب أن يكون رقماً';
    if (formData.paid_amount && isNaN(parseFloat(formData.paid_amount))) newErrors.paid_amount = 'يجب أن يكون رقماً';
    if (parseFloat(formData.paid_amount) > parseFloat(formData.amount)) newErrors.paid_amount = 'المدفوع أكبر من الإجمالي';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const vehicleData = {
        ...formData,
        amount: parseFloat(formData.amount),
        paid_amount: parseFloat(formData.paid_amount),
        remaining_amount: parseFloat(formData.remaining_amount)
      };
      if (isEditMode && id) {
        await VehicleService.updateVehicle(parseInt(id), vehicleData);
        alert('تم التحديث بنجاح');
      } else {
        await VehicleService.createVehicle(vehicleData);
        alert('تمت الإضافة بنجاح');
      }
      navigate('/vehicles/');
    } catch (error: any) {
      setSubmitError(error.response?.data?.detail || 'فشل حفظ البيانات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title={isEditMode ? 'تعديل مركبة' : 'إضافة مركبة'}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-cyan-900">
            {isEditMode ? 'تعديل بيانات المركبة' : 'إضافة مركبة جديدة'}
          </h1>
          <p className="text-gray-600 text-sm">
            {isEditMode ? 'قم بتعديل بيانات المركبة' : 'أدخل بيانات المركبة الجديدة'}
          </p>
        </div>

        <GlassCard className="p-6">
          {fetchLoading ? (
            <div className="flex justify-center items-center h-40 text-gray-600">جاري التحميل...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="p-4 rounded-lg bg-red-100 border border-red-300 text-red-700">
                  {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassInput label="رقم المركبة" name="vehicle_number" value={formData.vehicle_number} onChange={handleChange} error={errors.vehicle_number} fullWidth />
                <GlassSelect label="حرف المركبة" name="vehicle_letter" value={formData.vehicle_letter} onChange={handleChange} options={letterOptions} error={errors.vehicle_letter} fullWidth />
                <GlassSelect label="المحافظة" name="province" value={formData.province} onChange={handleChange} options={provinceOptions} error={errors.province} fullWidth />
                <GlassSelect label="الصنف" name="category" value={formData.category} onChange={handleChange} options={categoryOptions} error={errors.category} fullWidth />
                <GlassInput label="رقم الشاسي" name="chassis_number" value={formData.chassis_number} onChange={handleChange} error={errors.chassis_number} fullWidth />
                <GlassInput label="اسم المستورد" name="importer_name" value={formData.importer_name} onChange={handleChange} error={errors.importer_name} fullWidth />
                <GlassInput label="هاتف المستورد" name="importer_phone" value={formData.importer_phone} onChange={handleChange} error={errors.importer_phone} fullWidth />
                <GlassInput label="اسم المشتري" name="buyer_name" value={formData.buyer_name} onChange={handleChange} error={errors.buyer_name} fullWidth />
                <GlassInput label="هاتف المشتري" name="buyer_phone" value={formData.buyer_phone} onChange={handleChange} error={errors.buyer_phone} fullWidth />
                <GlassInput label="موقع العمل" name="work_location" value={formData.work_location} onChange={handleChange} fullWidth />
                <GlassInput label="المبلغ" name="amount" value={formData.amount} onChange={handleChange} error={errors.amount} fullWidth />
                <GlassInput label="المدفوع" name="paid_amount" value={formData.paid_amount} onChange={handleChange} error={errors.paid_amount} fullWidth />
                <GlassInput label="المتبقي" name="remaining_amount" value={formData.remaining_amount} onChange={() => {}} readOnly fullWidth />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-medium">ملاحظات</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="أدخل أي ملاحظات..."
                  className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-4">
                <GlassButton type="button" variant="secondary" onClick={() => navigate('/vehicles/')} disabled={loading}>
                  إلغاء
                </GlassButton>
                <GlassButton type="submit" variant="primary" disabled={loading}>
                  {loading ? 'جاري الحفظ...' : isEditMode ? 'تحديث' : 'حفظ'}
                </GlassButton>
              </div>
            </form>
          )}
        </GlassCard>
      </motion.div>

      {/* ✅ الشعار أسفل الصفحة */}
      <Footer />
    </DashboardLayout>
  );
};

export default VehicleForm;
