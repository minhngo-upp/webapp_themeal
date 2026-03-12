import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import Patients from './pages/Patients';
import Consultation from './pages/Consultation';
import CalendarView from './pages/CalendarView';
import PatientDetail from './pages/PatientDetail';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-body border-t" style={{ borderTop: '1px solid var(--bg-border)' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patient/:id" element={<PatientDetail />} />
            <Route path="/consultation/:id" element={<Consultation />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
