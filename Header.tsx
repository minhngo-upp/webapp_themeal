import { useLocation } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Tổng quan';
      case '/cases': return 'Tất cả Ca khám';
      case '/patients': return 'Danh sách Bệnh nhân';
      case '/follow-ups': return 'Nhắc nhở Follow-up';
      case '/revisit': return 'Tái khám';
      case '/settings': return 'Cài đặt';
      default:
        if (location.pathname.startsWith('/consultation')) return 'Hồ sơ Khám';
        return 'The Meal Doctor';
    }
  };

  return (
    <div className="page-header" style={{ padding: '1rem 2rem' }}>
      <h2 className="text-xl font-bold">{getPageTitle()}</h2>
      
      <div className="flex items-center gap-6">
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '0.75rem', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Tìm kiếm bệnh nhân hoặc ca khám..." 
            className="form-input" 
            style={{ paddingLeft: '2.5rem', width: '280px', borderRadius: 'var(--radius-full)' }} 
          />
        </div>
        
        <button style={{ position: 'relative', color: 'var(--text-muted)' }}>
          <Bell size={20} />
          <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, backgroundColor: 'var(--state-error)', borderRadius: '50%' }}></span>
        </button>
      </div>
    </div>
  );
}
