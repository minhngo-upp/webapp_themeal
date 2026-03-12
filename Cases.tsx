import { useState } from 'react';
import { Filter, ChevronDown, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cases() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Tất cả');

  const cases = [
    { id: '1', name: 'Trần Thu Hà', time: 'Hôm nay, 09:00', status: 'Sắp tới', type: 'upcoming', session: 'Khám lần đầu' },
    { id: '2', name: 'Nguyễn Văn A', time: 'Hôm nay, 10:30', status: 'Đã khám', type: 'consulted', session: 'Tái khám' },
    { id: '3', name: 'Lê Thị B', time: 'Hôm qua, 14:15', status: 'Follow-up', type: 'followup', session: 'Khám lần đầu' },
    { id: '4', name: 'Phạm Minh C', time: '15 Th10, 08:00', status: 'Tái khám', type: 'revisit', session: 'Đánh giá lại' },
    { id: '5', name: 'Đỗ Quang D', time: '10 Th10, 11:00', status: 'Đã khám', type: 'consulted', session: 'Khám lần đầu' },
  ];

  const statusMap: Record<string, string> = {
    'Tất cả': 'All',
    'Sắp tới': 'Upcoming',
    'Đã khám': 'Consulted',
    'Follow-up': 'Follow-up',
    'Tái khám': 'Revisit'
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">Quản lý Ca khám</h3>
        
        <div className="flex gap-4">
          <div className="flex gap-2">
            {['Tất cả', 'Sắp tới', 'Đã khám', 'Follow-up', 'Tái khám'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`btn ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem', borderRadius: '1rem' }}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="btn btn-outline" style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}>
            <Filter size={16} /> Lọc
          </button>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Tên Bệnh nhân</th>
            <th>Giờ hẹn</th>
            <th>Loại lịch</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cases.filter(c => filter === 'Tất cả' || c.status === filter).map(row => (
            <tr key={row.id}>
              <td className="font-medium text-sm">
                <div className="flex items-center gap-3">
                  <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--bg-border)' }}></div>
                  {row.name}
                </div>
              </td>
              <td className="text-sm text-muted">{row.time}</td>
              <td className="text-sm text-muted">{row.session}</td>
              <td>
                <span className={`badge badge-${row.type}`}>{row.status}</span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn btn-ghost" onClick={() => navigate(`/consultation/${row.id}`)} style={{ padding: '0.25rem 0.5rem', color: 'var(--color-primary)', marginRight: 8 }}>
                  Chi tiết
                </button>
                <button className="btn btn-ghost" style={{ padding: '0.25rem' }}>
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
