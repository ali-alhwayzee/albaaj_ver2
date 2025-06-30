// D:\projects\ibraheem\frontend-app\src\pages\VehicleList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import GlassCard from '../components/ui/GlassCard';
import GlassTable from '../components/ui/GlassTable';
import GlassButton from '../components/ui/GlassButton';
import GlassInput from '../components/ui/GlassInput';
import GlassSelect from '../components/ui/GlassSelect';
import VehicleService from '../services/VehicleService';

const VehicleList: React.FC = () => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvince, setFilterProvince] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);

  const provinceOptions = [{ value: 'بغداد', label: 'بغداد' },
  { value: 'البصرة', label: 'البصرة' },
  { value: 'نينوى', label: 'نينوى' },
  { value: 'أربيل', label: 'أربيل' },
  { value: 'النجف', label: 'النجف' },
  { value: 'كربلاء', label: 'كربلاء' },
  { value: 'الأنبار', label: 'الأنبار' },
  { value: 'ذي قار', label: 'ذي قار' },
  { value: 'ديالى', label: 'ديالى' },
  { value: 'صلاح الدين', label: 'صلاح الدين' },
  { value: 'بابل', label: 'بابل' },
  { value: 'كركوك', label: 'كركوك' },
  { value: 'واسط', label: 'واسط' },
  { value: 'ميسان', label: 'ميسان' },
  { value: 'المثنى', label: 'المثنى' },
  { value: 'دهوك', label: 'دهوك' },
  { value: 'السليمانية', label: 'السليمانية' },
  { value: 'القادسية', label: 'القادسية' },];
  const categoryOptions = [
    { value: 'private', label: 'خصوصي' },
    { value: 'truck', label: 'حمل' },
    { value: 'taxi', label: 'أجرة' }];

  const columns = [
    { accessor: 'vehicle_number', header: 'رقم المركبة' },
    { accessor: 'vehicle_letter', header: 'الحرف' },
    { accessor: 'province', header: 'المحافظة' },
    { accessor: 'category', header: 'الصنف' },
    { accessor: 'amount', header: 'المبلغ الإجمالي' },
    { accessor: 'remaining_amount', header: 'المبلغ المتبقي' },
    {
      accessor: 'actions',
      header: 'الإجراءات',
      render: (_: any, row: any) => (
        <div className="flex gap-2">
          <GlassButton variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); navigate(`/vehicles/${row.id}`); }}>تفاصيل</GlassButton>
          <GlassButton variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); navigate(`/vehicles/edit/${row.id}`); }}>تعديل</GlassButton>
          <GlassButton variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(e, row); }}>حذف</GlassButton>
        </div>
      ),
    },
  ];

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const data = await VehicleService.getAllVehicles();
        setVehicles(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (err) {
        setError('حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [itemsPerPage]);

  const filteredVehicles = vehicles.filter(v => {
    const matchSearch = v.vehicle_number.includes(searchTerm)
      || v.chassis_number.includes(searchTerm)
      || v.importer_name.includes(searchTerm)
      || v.buyer_name.includes(searchTerm);
    const matchProvince = filterProvince ? v.province === filterProvince : true;
    const matchCategory = filterCategory ? v.category === filterCategory : true;
    return matchSearch && matchProvince && matchCategory;
  });

  const paginatedVehicles = filteredVehicles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const categoryLabels: Record<string, string> = {
    private: 'خصوصي',
    truck: 'حمل',
    taxi: 'أجرة',
  };

  const formattedVehicles = paginatedVehicles.map(v => ({
    ...v,
    category: categoryLabels[v.category] || v.category,
    amount: formatCurrency(v.amount),
    remaining_amount: formatCurrency(v.remaining_amount),
  }));

  const handleDelete = async (e: any, vehicle: any) => {
    e.stopPropagation();
    if (window.confirm(`هل تريد حذف المركبة ${vehicle.vehicle_letter} ${vehicle.vehicle_number}؟`)) {
      await VehicleService.deleteVehicle(vehicle.id);
      const updated = await VehicleService.getAllVehicles();
      setVehicles(updated);
    }
  };

  return (
    <DashboardLayout title="قائمة المركبات">
      <div className="mb-6">
      <h1 className="text-3xl font-bold text-cyan-900">قائمة المركبات</h1>
        <p className="text-gray-600">عرض وإدارة جميع المركبات</p>
      </div>

      <GlassCard className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <GlassInput label="بحث" placeholder="بحث برقم المركبة أو الشاصي..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} fullWidth />
          </div>
          <div className="w-full md:w-48">
            <GlassSelect label="المحافظة" name="province" value={filterProvince} onChange={(e) => setFilterProvince(e.target.value)} options={provinceOptions} fullWidth />
          </div>
          <div className="w-full md:w-48">
          <GlassSelect
              label="الصنف"
              name="category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              options={categoryOptions}
              placeholder="اختر الصنف"
              fullWidth
            />
          </div>
          <GlassButton variant="primary" onClick={() => navigate('/vehicles/new')}>+ إضافة مركبة</GlassButton>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        {loading ? (
          <div className="text-white text-center">جاري تحميل البيانات...</div>
        ) : error ? (
          <div className="text-red-400 text-center">{error}</div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-white/70 text-center">لا توجد مركبات مطابقة</div>
        ) : (
          <GlassTable columns={columns} data={formattedVehicles} onRowClick={(v) => navigate(`/vehicles/${v.id}`)} />
        )}
      </GlassCard>
    </DashboardLayout>
  );
};

export default VehicleList;
