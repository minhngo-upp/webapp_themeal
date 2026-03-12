import { useState } from 'react';
import { Search, Plus, FileText, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Patients() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const patients = [
    { id: '1', name: 'Trần Thu Hà', age: 34, gender: 'Nữ', phone: '0901234567', target: 'Giảm cân sau sinh', visits: 4 },
    { id: '2', name: 'Nguyễn Văn A', age: 45, gender: 'Nam', phone: '0912345678', target: 'Kiểm soát đường huyết', visits: 8 },
    { id: '3', name: 'Lê Thị B', age: 28, gender: 'Nữ', phone: '0987654321', target: 'Dinh dưỡng Tăng cơ', visits: 2 },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">Hồ sơ Bệnh nhân</h3>
        <div className="flex items-center gap-4">
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '0.75rem', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Tìm theo tên, SĐT..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input" 
              style={{ paddingLeft: '2.5rem', width: '300px' }} 
            />
          </div>
          <button className="btn btn-primary">
            <Plus size={18} /> Thêm Bệnh nhân
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => (
          <div key={p.id} className="card" style={{ padding: '1.25rem', border: '1px solid var(--bg-hover)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="flex items-center gap-4">
              <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}>
                {p.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div className="font-bold text-md">{p.name}</div>
                <div className="flex text-xs text-muted mt-1 gap-2">
                  <span>{p.gender}, {p.age} tuổi</span>
                  <span>|</span>
                  <span>{p.phone}</span>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="flex items-center gap-2 text-sm">
                <Activity size={16} className="text-primary" />
                <span className="font-medium">Mục tiêu:</span>
                <span className="text-muted">{p.target}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText size={16} className="text-muted" />
                <span className="font-medium">Số lượt khám:</span>
                <span className="text-muted">{p.visits}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn btn-outline" style={{ flex: 1, padding: '0.5rem', fontSize: '0.75rem' }} onClick={() => navigate(`/patient/${p.id}`)}>Xem hồ sơ</button>
              <button className="btn btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.75rem' }} onClick={() => navigate(`/consultation/${p.id}`)}>Đặt hẹn mới</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
