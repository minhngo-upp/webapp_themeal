import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Activity, Calendar as CalendarIcon, FileText, ChevronLeft, Plus } from 'lucide-react';

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // MOCK DATA
  const patient = {
    id: id || '1',
    name: 'Trần Thu Hà',
    age: 34,
    gender: 'Nữ',
    phone: '0901234567',
    email: 'thuha.tran@example.com',
    address: 'Q. Cầu Giấy, Hà Nội',
    target: 'Giảm cân sau sinh',
    joinDate: '15/08/2023'
  };

  const dietImages = [
    { id: 1, date: 'Hôm nay, 12:30', title: 'Bữa trưa', cal: '450 kcal', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
    { id: 2, date: 'Hôm nay, 08:00', title: 'Bữa sáng', cal: '320 kcal', url: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=400&q=80' },
    { id: 3, date: 'Hôm qua, 19:00', title: 'Bữa tối', cal: '520 kcal', url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80' },
    { id: 4, date: 'Hôm qua, 12:00', title: 'Bữa trưa', cal: '480 kcal', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' },
  ];

  const labReports = [
    { id: 1, date: '10/09/2023', title: 'Xét nghiệm Máu Sinh hóa (Glucose, Lipid)', type: 'PDF', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80' },
    { id: 2, date: '15/08/2023', title: 'Kết quả Siêu âm Ổ bụng', type: 'JPG', url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80' },
  ];

  return (
    <div className="flex-col gap-6">
      <button 
        className="btn btn-ghost w-fit pl-0" 
        onClick={() => navigate('/patients')}
      >
        <ChevronLeft size={20} /> Quay lại danh sách
      </button>

      {/* Patient Profile Header Card */}
      <div className="card flex gap-6 items-start" style={{ padding: '2rem' }}>
        <div style={{ width: 100, height: 100, borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
          {patient.name.charAt(0)}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <div className="flex items-center gap-4 text-muted mt-2">
                <span>{patient.gender}, {patient.age} tuổi</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Activity size={16} /> {patient.target}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline">Sửa hồ sơ</button>
              <button className="btn btn-primary" onClick={() => navigate(`/consultation/${patient.id}`)}>Khám mới</button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 text-sm">
            <div className="flex items-center gap-2"><Phone size={16} className="text-muted" /> {patient.phone}</div>
            <div className="flex items-center gap-2"><Mail size={16} className="text-muted" /> {patient.email}</div>
            <div className="flex items-center gap-2"><MapPin size={16} className="text-muted" /> {patient.address}</div>
            <div className="flex items-center gap-2"><CalendarIcon size={16} className="text-muted" /> Tham gia: {patient.joinDate}</div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-app)' }}>
          {[
            { id: 'overview', label: 'Tổng quan' },
            { id: 'diet', label: 'Lịch sử Ăn uống' },
            { id: 'labs', label: 'Báo cáo Xét nghiệm / Cận lâm sàng' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`font-semibold text-sm ${activeTab === tab.id ? 'text-primary' : 'text-muted'}`}
              style={{ 
                padding: '1.25rem 2rem', 
                borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                backgroundColor: activeTab === tab.id ? 'var(--bg-card)' : 'transparent',
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '2rem' }}>
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="flex-col gap-6">
               <h3 className="font-bold text-lg mb-2">Tóm tắt Chỉ số</h3>
               <div className="dashboard-grid">
                 <div className="card" style={{ backgroundColor: 'var(--bg-hover)', border: 'none' }}>
                   <div className="text-sm text-muted mb-1">Cân nặng hiện tại</div>
                   <div className="font-bold text-2xl">64.5 <span className="text-sm font-normal text-muted">kg</span></div>
                   <div className="text-xs text-state-success mt-2 flex gap-1">↓ 1.5 kg so với tháng trước</div>
                 </div>
                 <div className="card" style={{ backgroundColor: 'var(--bg-hover)', border: 'none' }}>
                   <div className="text-sm text-muted mb-1">BMI</div>
                   <div className="font-bold text-2xl">24.2</div>
                   <div className="text-xs text-state-warning mt-2 flex gap-1">Thừa cân độ I</div>
                 </div>
                 <div className="card" style={{ backgroundColor: 'var(--bg-hover)', border: 'none' }}>
                   <div className="text-sm text-muted mb-1">Mục tiêu Calo/ngày</div>
                   <div className="font-bold text-2xl">1,500 <span className="text-sm font-normal text-muted">kcal</span></div>
                 </div>
               </div>

               <h3 className="font-bold text-lg mt-4 mb-2">Lịch sử Tư vấn (3)</h3>
               <div className="flex-col gap-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex gap-4 p-4 border rounded" style={{ borderColor: 'var(--bg-border)' }}>
                     <div className="flex flex-col items-center gap-1" style={{ minWidth: '100px', borderRight: '1px solid var(--bg-border)', paddingRight: '1rem' }}>
                       <span className="font-bold">1{i}/09</span>
                       <span className="text-xs text-muted">2023</span>
                     </div>
                     <div>
                       <div className="font-bold mb-1">Tái khám định kỳ tháng {i}</div>
                       <div className="text-sm text-muted mb-2">Bệnh nhân tuân thủ tốt mốc calo. Cần tăng cường vận động.</div>
                       <button className="text-xs font-semibold text-primary flex items-center gap-1"><FileText size={14} /> Xem phiếu khám</button>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* DIET HISTORY TAB */}
          {activeTab === 'diet' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Nhật ký Bữa ăn</h3>
                <button className="btn btn-outline text-sm"><Plus size={16} /> Thêm ảnh bữa ăn</button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {dietImages.map(img => (
                  <div key={img.id} className="card" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ position: 'relative', paddingTop: '75%', borderRadius: 'var(--radius-md)', overflow: 'hidden', backgroundColor: 'var(--bg-hover)' }}>
                       <img src={img.url} alt={img.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold">{img.title}</span>
                        <span className="badge badge-consulted">{img.cal}</span>
                      </div>
                      <div className="text-xs text-muted">{img.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LAB REPORTS TAB */}
          {activeTab === 'labs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Kết quả Cận lâm sàng</h3>
                <button className="btn btn-outline text-sm"><Plus size={16} /> Tải lên kết quả</button>
              </div>

              <div className="flex-col gap-6">
                {labReports.map(lab => (
                  <div key={lab.id} className="card p-0 overflow-hidden">
                    <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-hover)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div className="font-bold text-md">{lab.title}</div>
                        <div className="text-xs text-muted mt-1">Ngày xét nghiệm: {lab.date} • Định dạng: {lab.type}</div>
                      </div>
                      <button className="btn btn-primary text-sm">Tải về</button>
                    </div>
                    {/* Image Preview Container */}
                    <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
                       <img 
                          src={lab.url} 
                          alt="Lab result preview" 
                          style={{ maxHeight: '400px', objectFit: 'contain', boxShadow: 'var(--shadow-md)' }} 
                       />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
