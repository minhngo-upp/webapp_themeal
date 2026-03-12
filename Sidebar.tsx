import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, CalendarClock, Settings, ClipboardList } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { name: 'Tổng quan', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Lịch làm việc', icon: CalendarClock, path: '/calendar' },
    { name: 'Ca khám', icon: ClipboardList, path: '/cases' },
    { name: 'Bệnh nhân', icon: Users, path: '/patients' },
    { name: 'Tái khám', icon: FileText, path: '/revisit' },
    { name: 'Cài đặt', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="sidebar">
      <div className="mb-6 flex items-center gap-2 px-2">
        <div style={{ width: 32, height: 32, borderRadius: '8px', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
          MD
        </div>
        <h1 className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>The Meal Dr</h1>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.625rem 1rem',
              borderRadius: 'var(--radius-md)',
              color: isActive ? 'var(--color-primary)' : 'var(--text-muted)',
              backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
              fontWeight: isActive ? 600 : 500,
            })}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '1rem', borderTop: '1px solid var(--bg-border)', marginTop: 'auto' }}>
        <div className="flex items-center gap-3">
          <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--bg-border)' }} />
          <div>
            <div className="font-medium text-sm">Dr. Nguyễn</div>
            <div className="text-xs text-muted">Chuyên gia dinh dưỡng</div>
          </div>
        </div>
      </div>
    </div>
  );
}
