import React, { useState } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, CheckCircle, Settings, Edit3, X } from 'lucide-react';

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('week');
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [blockedSlots, setBlockedSlots] = useState<Record<string, boolean>>({});

  const [appointments, setAppointments] = useState([
    { id: '1', patient: 'Trần Thu Hà', time: '09:00', duration: 45, status: 'confirmed', type: 'Tái khám', date: new Date() },
    { id: '2', patient: 'Nguyễn Văn A', time: '10:30', duration: 30, status: 'pending', type: 'Khám lần đầu', date: new Date() },
    { id: '3', patient: 'Lê Thị B', time: '14:00', duration: 60, status: 'confirmed', type: 'Đánh giá lại', date: addDays(new Date(), 1) },
    { id: '4', patient: 'Phạm Minh C', time: '11:00', duration: 30, status: 'pending', type: 'Tư vấn nhanh', date: addDays(new Date(), 2) },
  ]);

  // Generators for View
  const hours = Array.from({ length: 10 }, (_, i) => i + 8); // 8:00 AM to 5:00 PM
  
  const getDaysToShow = () => {
    if (viewMode === 'day') return [currentDate];
    const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const daysToShow = getDaysToShow();

  const handlePrev = () => setCurrentDate(addDays(currentDate, viewMode === 'day' ? -1 : -7));
  const handleNext = () => setCurrentDate(addDays(currentDate, viewMode === 'day' ? 1 : 7));
  const handleToday = () => setCurrentDate(new Date());

  const handleConfirm = (id: string) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: 'confirmed' } : app));
  };

  const toggleSlot = (date: Date, hour: number) => {
    if (!isEditingSchedule) return;
    const key = `${format(date, 'yyyy-MM-dd')}-${hour}`;
    setBlockedSlots(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getStatusColor = (status: string) => {
    return status === 'confirmed' ? 'var(--state-success)' : 'var(--state-warning)';
  };
  const getStatusBg = (status: string) => {
    return status === 'confirmed' ? 'var(--state-success-light)' : 'var(--state-warning-light)';
  };

  return (
    <div className="flex-col h-full gap-4">
      {/* Calendar Header Control */}
      <div className="card flex items-center justify-between" style={{ padding: '1rem 1.5rem' }}>
        <div className="flex items-center gap-4">
          <button className="btn btn-outline" onClick={handleToday}>Hôm nay</button>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost" style={{ padding: '0.5rem' }} onClick={handlePrev}><ChevronLeft size={20} /></button>
            <h3 className="font-bold text-lg min-w-[200px] text-center">
              {viewMode === 'day' 
                ? format(currentDate, 'EEEE, dd/MM/yyyy') 
                : `${format(daysToShow[0], 'dd/MM')} - ${format(daysToShow[6], 'dd/MM/yyyy')}`}
            </h3>
            <button className="btn btn-ghost" style={{ padding: '0.5rem' }} onClick={handleNext}><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            className={`btn ${isEditingSchedule ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setIsEditingSchedule(!isEditingSchedule)}
          >
            {isEditingSchedule ? <><CheckCircle size={16} /> Hoàn tất thiết lập</> : <><Edit3 size={16} /> Thiết lập Khung giờ</>}
          </button>
          <div className="flex gap-2 p-1" style={{ backgroundColor: 'var(--bg-hover)', borderRadius: 'var(--radius-md)' }}>
            <button 
              className={`btn ${viewMode === 'day' ? 'btn-primary' : 'btn-ghost'}`} 
              style={{ padding: '0.375rem 1rem' }}
              onClick={() => setViewMode('day')}
            >
              Ngày
            </button>
            <button 
              className={`btn ${viewMode === 'week' ? 'btn-primary' : 'btn-ghost'}`} 
              style={{ padding: '0.375rem 1rem' }}
              onClick={() => setViewMode('week')}
            >
              Tuần
            </button>
          </div>
        </div>
      </div>

      {isEditingSchedule && (
        <div className="card p-3 bg-primary-light flex items-center gap-2 text-primary" style={{ border: '1px solid var(--color-primary-light)', backgroundColor: 'var(--color-primary-light)' }}>
          <Settings size={18} />
          <span className="font-bold text-sm">Chế độ Thiết lập Khung giờ hoạt động:</span>
          <span className="text-sm">Bấm vào bất kỳ ô giờ nào trên lịch để Đóng (Nghỉ) hoặc Mở (Khám bệnh) khung giờ đó.</span>
        </div>
      )}

      {/* Calendar Grid Container */}
      <div className="card flex-1" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 0 }}>
        {/* Days Header */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--bg-border)' }}>
          <div style={{ width: '80px', flexShrink: 0, borderRight: '1px solid var(--bg-border)' }}></div>
          {daysToShow.map((day, idx) => (
            <div key={idx} style={{ flex: 1, padding: '1rem', textAlign: 'center', borderRight: '1px solid var(--bg-border)' }}>
              <div className="text-sm font-semibold">{format(day, 'EEEE')}</div>
              <div className={`text-2xl font-bold mt-1 ${isSameDay(day, new Date()) ? 'text-primary' : ''}`}>
                {format(day, 'dd')}
              </div>
            </div>
          ))}
        </div>

        {/* Time Grid (Scrollable) */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', position: 'relative', minHeight: '800px' }}>
            {/* Time Column */}
            <div style={{ width: '80px', flexShrink: 0, borderRight: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-card)' }}>
              {hours.map(hour => (
                <div key={hour} style={{ height: '80px', borderBottom: '1px solid var(--bg-border)', paddingRight: '0.5rem', paddingTop: '0.5rem', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  {hour}:00
                </div>
              ))}
            </div>

            {/* Grid Columns */}
            {daysToShow.map((day, dIdx) => (
              <div key={dIdx} style={{ flex: 1, borderRight: '1px solid var(--bg-border)', position: 'relative' }}>
                {/* Horizontal lines & Clickable slots */}
                {hours.map(hour => {
                  const key = `${format(day, 'yyyy-MM-dd')}-${hour}`;
                  const isBlocked = blockedSlots[key];

                  return (
                    <div 
                      key={hour} 
                      onClick={() => toggleSlot(day, hour)}
                      className="cursor-pointer transition-colors duration-200"
                      style={{ 
                        height: '80px', 
                        borderBottom: '1px dashed var(--bg-border)',
                        backgroundColor: isBlocked ? 'var(--bg-hover)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {/* Hover Effect only in edit mode */}
                      <style>
                        {`
                          .hover-edit-slot:hover {
                            background-color: ${isEditingSchedule && !isBlocked ? 'var(--bg-hover)' : ''}
                          }
                        `}
                      </style>
                      <div className={`w-full h-full flex items-center justify-center ${isEditingSchedule ? 'hover-edit-slot cursor-pointer' : ''}`}>
                        {isBlocked && (
                          <div className="text-xs font-bold text-muted flex items-center gap-1 opacity-70">
                            <X size={14} /> Tạm nghỉ
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Event Blocks */}
                {appointments.filter(app => isSameDay(app.date, day)).map(app => {
                  const [h, m] = app.time.split(':').map(Number);
                  const topOffset = ((h - 8) * 80) + (m / 60) * 80;
                  const height = (app.duration / 60) * 80;

                  return (
                    <div 
                      key={app.id}
                      style={{
                        position: 'absolute',
                        top: `${topOffset}px`,
                        height: `${height - 4}px`, // -4px for margin
                        left: '4px',
                        right: '4px',
                        backgroundColor: getStatusBg(app.status),
                        borderLeft: `4px solid ${getStatusColor(app.status)}`,
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        boxShadow: 'var(--shadow-sm)',
                        overflow: 'hidden',
                        zIndex: 10,
                        opacity: isEditingSchedule ? 0.6 : 1, // Dim appointments when editing schedule
                        pointerEvents: isEditingSchedule ? 'none' : 'auto',
                      }}
                    >
                      <div className="font-bold text-sm flex justify-between items-start" style={{ color: getStatusColor(app.status) }}>
                        <span>{app.time} - {app.patient}</span>
                      </div>
                      <div className="text-xs font-medium opacity-80" style={{ color: getStatusColor(app.status) }}>
                        {app.type}
                      </div>
                      
                      {app.status === 'pending' && !isEditingSchedule && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleConfirm(app.id); }}
                          style={{
                            marginTop: 'auto',
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '0.25rem',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            color: 'var(--state-success)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.25rem',
                            cursor: 'pointer',
                            boxShadow: 'var(--shadow-sm)'
                          }}
                        >
                          <CheckCircle size={12} /> Xác nhận hẹn
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
