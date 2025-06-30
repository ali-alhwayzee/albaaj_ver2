import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import VehicleService from '../services/VehicleService';
import theme from '../lib/colors';

const { colors } = theme;
const categoryLabels: Record<string, string> = {
  private: 'خصوصي',
  truck: 'حمل',
  taxi: 'أجرة',
};
const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Glass notes style - direct CSS object instead of createGlassEffect
  const glassNotesStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '15px'
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-IQ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Load vehicle data
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const data = await VehicleService.getVehicleById(parseInt(id || '0'));
        setVehicle(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching vehicle:', err);
        setError('حدث خطأ أثناء تحميل بيانات المركبة. يرجى المحاولة مرة أخرى.');
        setLoading(false);
      }
    };
    
    fetchVehicle();
  }, [id]);

  // Handle edit button
  const handleEdit = () => {
    navigate(`/vehicles/edit/${id}`);
  };

  // Handle delete button
  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد من حذف هذه المركبة؟')) {
      try {
        await VehicleService.deleteVehicle(parseInt(id || '0'));
        alert('تم حذف المركبة بنجاح');
        navigate('/vehicles/');
      } catch (err) {
        console.error('Error deleting vehicle:', err);
        alert('حدث خطأ أثناء حذف المركبة. يرجى المحاولة مرة أخرى.');
      }
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate('/vehicles/');
  };

  // Detail item component
  const DetailItem = ({ label, value }: { label: string; value: string | number | null }) => (
    <div className="mb-4">
      <div className="text-white/70 text-sm mb-1">{label}</div>
      <div className="text-white text-lg">{value || 'غير متوفر'}</div>
    </div>
  );

  return (
      <DashboardLayout title="تفاصيل المركبة">
      <div className="mb-6">
      <h1 className="text-3xl font-bold text-cyan-900">تفاصيل المركبة</h1>
        <p className="text-gray-600">عرض جميع بيانات المركبة</p>
      </div>

      {loading ? (
        <GlassCard className="p-6 flex justify-center items-center h-40">
          <div className="text-white">جاري تحميل البيانات...</div>
        </GlassCard>
      ) : error ? (
        <GlassCard className="p-6 flex justify-center items-center h-40">
          <div className="text-red-400">{error}</div>
        </GlassCard>
      ) : vehicle ? (
        <>
          {/* Vehicle Header */}
          <GlassCard className="p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {vehicle.vehicle_letter} {vehicle.vehicle_number} - {vehicle.province}
                </h2>
                <p className="text-white/70">
                {categoryLabels[vehicle.category as string] || vehicle.category} | رقم الشاصي: {vehicle.chassis_number}
                </p>
              </div>
              <div className="flex space-x-3 mt-4 md:mt-0">
                <GlassButton variant="secondary" onClick={handleEdit}>
                  تعديل
                </GlassButton>
                <GlassButton variant="secondary" onClick={handleDelete}>
                  حذف
                </GlassButton>
                <GlassButton variant="primary" onClick={handleBack}>
                  العودة للقائمة
                </GlassButton>
              </div>
            </div>
          </GlassCard>

          {/* Vehicle Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Basic Information */}
            <GlassCard title="معلومات المركبة" className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="رقم المركبة" value={vehicle.vehicle_number} />
                <DetailItem label="حرف المركبة" value={vehicle.vehicle_letter} />
                <DetailItem label="المحافظة" value={vehicle.province} />
                <DetailItem
                  label="الصنف"
                  value={categoryLabels[vehicle.category as string] || vehicle.category}
                />
                <DetailItem label="رقم الشاصي" value={vehicle.chassis_number} />
                <DetailItem label="موقع العمل" value={vehicle.work_location} />
              </div>
            </GlassCard>

            {/* Financial Information */}
            <GlassCard title="المعلومات المالية" className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <DetailItem label="المبلغ الإجمالي" value={formatCurrency(vehicle.amount)} />
                <DetailItem label="المبلغ المدفوع" value={formatCurrency(vehicle.paid_amount)} />
                <div className="mb-4">
                  <div className="text-white/70 text-sm mb-1">المبلغ المتبقي</div>
                  <div 
                    className={`text-lg font-bold ${
                      vehicle.remaining_amount === 0 
                        ? 'text-green-400' 
                        : vehicle.remaining_amount > vehicle.amount / 2 
                          ? 'text-red-400' 
                          : 'text-yellow-400'
                    }`}
                  >
                    {formatCurrency(vehicle.remaining_amount)}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ 
                        width: `${Math.min(100, (vehicle.paid_amount / vehicle.amount) * 100)}%` 
                      }}
                    ></div>
                  </div>
                  <div className="text-white/70 text-sm mt-1 text-center">
                    {Math.round((vehicle.paid_amount / vehicle.amount) * 100)}% مدفوع
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Importer Information */}
            <GlassCard title="معلومات المستورد" className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <DetailItem label="اسم المستورد" value={vehicle.importer_name} />
                <DetailItem label="رقم هاتف المستورد" value={vehicle.importer_phone} />
              </div>
            </GlassCard>

            {/* Buyer Information */}
            <GlassCard title="معلومات المشتري" className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <DetailItem label="اسم المشتري" value={vehicle.buyer_name} />
                <DetailItem label="رقم هاتف المشتري" value={vehicle.buyer_phone} />
              </div>
            </GlassCard>
          </div>

          {/* Additional Information */}
          <GlassCard title="معلومات إضافية" className="p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem 
                label="تاريخ الإضافة" 
                value={vehicle.created_at ? formatDate(vehicle.created_at) : null} 
              />
              <DetailItem 
                label="آخر تحديث" 
                value={vehicle.updated_at ? formatDate(vehicle.updated_at) : null} 
              />
            </div>
            <div className="mt-4">
              <div className="text-white/70 text-sm mb-1">ملاحظات</div>
              <div 
                className="text-white p-4 rounded-lg"
                style={glassNotesStyle}
              >
                {vehicle.notes || 'لا توجد ملاحظات'}
              </div>
            </div>
          </GlassCard>
        </>
      ) : (
        <GlassCard className="p-6 flex justify-center items-center h-40">
          <div className="text-white/70">لم يتم العثور على المركبة</div>
        </GlassCard>
      )}
    </DashboardLayout>
  );
};

export default VehicleDetails;
