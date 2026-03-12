import { Calendar, AlertCircle, RefreshCcw, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Stats Board */}
      <div className="dashboard-grid">
        <div className="card stat-card">
          <div className="stat-icon primary">
            <Calendar size={24} />
          </div>
          <div>
            <div className="font-bold text-xl">12</div>
            <div className="text-sm text-muted font-medium">Lịch khám hôm nay</div>
          </div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-icon info">
            <Users size={24} />
          </div>
          <div>
            <div className="font-bold text-xl">5</div>
            <div className="text-sm text-muted font-medium">Ca khám sắp tới</div>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon warning">
            <AlertCircle size={24} />
          </div>
          <div>
            <div className="font-bold text-xl">8</div>
            <div className="text-sm text-muted font-medium">Cần Follow-up</div>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon success">
            <RefreshCcw size={24} />
          </div>
          <div>
            <div className="font-bold text-xl">3</div>
            <div className="text-sm text-muted font-medium">Đến hạn tái khám</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Today's Cases */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--bg-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="font-bold text-lg">Ca khám hôm nay</h3>
            <button className="text-sm font-medium" style={{ color: 'var(--color-primary)' }} onClick={() => navigate('/cases')}>
              Xem tất cả
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Bệnh nhân</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Trần Thu Hà', time: '09:00 Sáng', status: 'Sắp tới', type: 'upcoming', id: '1' },
                { name: 'Nguyễn Văn A', time: '10:30 Sáng', status: 'Đã khám', type: 'consulted', id: '2' },
                { name: 'Lê Thị B', time: '11:15 Sáng', status: 'Follow-up', type: 'followup', id: '3' },
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="font-medium text-sm">{row.name}</td>
                  <td className="text-sm text-muted">{row.time}</td>
                  <td>
                    <span className={`badge badge-${row.type}`}>{row.status}</span>
                  </td>
                  <td>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => navigate(`/consultation/${row.id}`)}>
                      Mở hồ sơ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div className="card flex-col gap-4">
          <h3 className="font-bold text-lg mb-2">Thao tác nhanh</h3>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'space-between', padding: '0.75rem 1rem' }} onClick={() => navigate('/consultation/new')}>
            Bắt đầu ca tiếp theo
            <ArrowRight size={16} />
          </button>
          <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/patients')}>
            Xem danh sách hồ sơ
          </button>
          
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-hover)', borderRadius: 'var(--radius-md)', marginTop: 'auto' }}>
            <div className="text-sm font-medium mb-1">Nhắc nhở</div>
            <div className="text-xs text-muted">Bạn có 3 người bệnh cần điều chỉnh lại phác đồ dinh dưỡng.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
