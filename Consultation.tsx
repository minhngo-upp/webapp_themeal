import React, { useState } from 'react';
import { Save, CheckCircle, FileText, Stethoscope, Scale, ClipboardList, Activity, Plus, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Consultation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('plan'); // Mặc định mở tab Phác đồ theo yêu cầu

  // --- MOCK DATA FOR AUTOCOMPLETE ---
  const MOCK_FOODS = [
    { id: 1, name: 'Cơm gạo lứt', category: 'Tinh bột', cal: '110 kcal/100g', img: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=100&q=80' },
    { id: 2, name: 'Ức gà luộc', category: 'Đạm', cal: '165 kcal/100g', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=100&q=80' },
    { id: 3, name: 'Salad Cà chua', category: 'Rau xanh', cal: '45 kcal/100g', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&q=80' },
  ];

  const MOCK_EXERCISES = [
    { id: 1, name: 'Chạy bộ nhẹ nhàng', duration: '30 phút', calBurn: '~250 kcal' },
    { id: 2, name: 'Yoga Phục hồi', duration: '45 phút', calBurn: '~150 kcal' },
    { id: 3, name: 'Đạp xe trong nhà', duration: '20 phút', calBurn: '~200 kcal' },
  ];

  const MOCK_MEDICINES = [
    { id: 1, name: 'Omega-3 Fish Oil 1000mg', type: 'Thực phẩm chức năng', defaultDose: '1 viên/ngày' },
    { id: 2, name: 'Vitamin D3 & K2 MK7', type: 'Thực phẩm chức năng', defaultDose: '2 giọt/ngày' },
    { id: 3, name: 'Metformin 500mg', type: 'Thuốc kê đơn', defaultDose: '1 viên sau ăn tối' },
  ];

  // --- COMPONENT STATE ---
  const [selectedFoods, setSelectedFoods] = useState(MOCK_FOODS.slice(0, 1));
  const [selectedExercises, setSelectedExercises] = useState(MOCK_EXERCISES.slice(0, 1));
  const [selectedMedicines, setSelectedMedicines] = useState(MOCK_MEDICINES.slice(0, 1));

  const [foodSearch, setFoodSearch] = useState('');
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [medicineSearch, setMedicineSearch] = useState('');

  // --- HANDLERS ---
  const toggleSelection = (item: any, list: any[], setList: any) => {
    if (list.find(i => i.id === item.id)) {
      setList(list.filter(i => i.id !== item.id));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem' }}>
      {/* Main Content Area */}
      <div className="flex-col gap-6">
        
        {/* Patient Context Header */}
        <div className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="flex items-center gap-4">
            <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
              T
            </div>
            <div>
              <h2 className="font-bold text-xl">Trần Thu Hà</h2>
              <div className="flex text-sm text-muted mt-1 gap-3">
                <span>Nữ, 34 tuổi</span>
                <span>•</span>
                <span>Mục tiêu: Giảm cân sau sinh</span>
                <span>•</span>
                <span className="badge badge-upcoming" style={{ padding: '0.1rem 0.5rem', fontSize: '0.7rem' }}>Sắp tới</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
              <Save size={18} /> Lưu Nháp
            </button>
            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              <CheckCircle size={18} /> Hoàn tất Phiên khám
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--bg-border)', marginBottom: '0.5rem' }}>
          <button 
            className={`font-semibold pb-3 ${activeTab === 'note' ? 'text-primary' : 'text-muted'}`}
            style={{ borderBottom: activeTab === 'note' ? '2px solid var(--color-primary)' : '2px solid transparent' }}
            onClick={() => setActiveTab('note')}
          >
            <div className="flex items-center gap-2">
              <ClipboardList size={20} /> Phiếu Lâm sàng & Chẩn đoán (A&D)
            </div>
          </button>
          <button 
            className={`font-semibold pb-3 ${activeTab === 'plan' ? 'text-primary' : 'text-muted'}`}
            style={{ borderBottom: activeTab === 'plan' ? '2px solid var(--color-primary)' : '2px solid transparent' }}
            onClick={() => setActiveTab('plan')}
          >
            <div className="flex items-center gap-2">
              <Activity size={20} /> Phác đồ Can thiệp (I&M)
            </div>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'note' ? (
          <div className="card">
             {/* Nội dung Note cũ */}
             <h3 className="font-bold text-lg mb-6 border-b pb-4" style={{ borderColor: 'var(--bg-border)' }}>Thu thập thông tin & Đánh giá (Assessment & Diagnosis)</h3>
            
            <div className="form-group">
              <label className="form-label">Lý do đến khám (Chief Complaint)</label>
              <textarea className="form-textarea" rows={3} placeholder="Người bệnh/khách hàng chia sẻ..." />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Chỉ số Nhân trắc (A - Anthropometry)</label>
                <textarea className="form-textarea" rows={4} placeholder="Cân nặng, Chiều cao, BMI, Tỷ lệ mỡ, Vòng eo..." />
              </div>
              <div className="form-group">
                <label className="form-label">Xét nghiệm / Lâm sàng (B&C - Bio/Clinical)</label>
                <textarea className="form-textarea" rows={4} placeholder="Đường huyết, mỡ máu, tình trạng da, tóc, móng..." />
              </div>
            </div>
            {/* ... */}
          </div>
        ) : (
          <div className="card p-0 overflow-hidden bg-transparent border-0 shadow-none">
            <h3 className="font-bold text-lg mb-6 text-primary">Kế hoạch Can thiệp & Theo dõi (Intervention & Monitoring)</h3>

            <div className="flex-col gap-6">
              
              {/* PHẦN 1: THỰC ĐƠN MẪU */}
              <div className="card">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-md flex items-center gap-2"><Scale size={18} /> Phác đồ Dinh dưỡng (Thực đơn)</h4>
                  <div className="text-sm font-semibold text-primary bg-primary-light px-3 py-1 rounded-full">~1,500 kcal / ngày</div>
                </div>

                {/* Selected Foods Grid */}
                {selectedFoods.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-3">
                    {selectedFoods.map(food => (
                      <div key={food.id} className="flex items-center gap-3 p-2 border rounded-md" style={{ borderColor: 'var(--bg-border)' }}>
                        <img src={food.img} alt={food.name} style={{ width: 40, height: 40, borderRadius: '4px', objectFit: 'cover' }} />
                        <div>
                          <div className="text-sm font-semibold">{food.name}</div>
                          <div className="text-xs text-muted">{food.cal}</div>
                        </div>
                        <button className="text-state-error p-1 hover:bg-state-error-light rounded" onClick={() => toggleSelection(food, selectedFoods, setSelectedFoods)}><X size={14}/></button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Food Search Autocomplete */}
                <div className="relative">
                  <input type="text" className="form-input" placeholder="Tìm và thêm món ăn vào thực đơn mẫu..." value={foodSearch} onChange={(e) => setFoodSearch(e.target.value)} />
                  {foodSearch && (
                    <div className="absolute top-100 left-0 right-0 bg-white border rounded-md shadow-md mt-1 z-10 p-2" style={{ borderColor: 'var(--bg-border)' }}>
                      <div className="text-xs font-semibold text-muted mb-2 px-2">KẾT QUẢ TỪ BACKEND</div>
                      {MOCK_FOODS.filter(f => f.name.toLowerCase().includes(foodSearch.toLowerCase())).map(food => (
                         <div key={food.id} className="flex items-center justify-between p-2 hover:bg-hover rounded cursor-pointer" onClick={() => {toggleSelection(food, selectedFoods, setSelectedFoods); setFoodSearch('');}}>
                           <div className="flex items-center gap-3">
                             <img src={food.img} alt={food.name} style={{ width: 32, height: 32, borderRadius: '4px' }} />
                             <span className="text-sm font-medium">{food.name}</span>
                           </div>
                           <span className="text-xs badge badge-upcoming">{food.category}</span>
                         </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* PHẦN 2: THUỐC VÀ TPCN */}
              <div className="card">
                <h4 className="font-bold text-md flex items-center gap-2 mb-4"><Plus size={18} /> Đơn thuốc & Thực phẩm chức năng</h4>
                
                {/* Selected Meds */}
                {selectedMedicines.length > 0 && (
                  <div className="mb-4 flex flex-col gap-2">
                    {selectedMedicines.map(med => (
                      <div key={med.id} className="flex items-center justify-between p-3 bg-hover rounded-md border" style={{ borderColor: 'var(--bg-border)' }}>
                        <div>
                          <div className="text-sm font-bold">{med.name}</div>
                          <div className="text-xs text-muted mt-1">{med.type}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <input type="text" className="form-input text-sm py-1 px-2" style={{ width: '150px' }} defaultValue={med.defaultDose} />
                          <button className="text-state-error" onClick={() => toggleSelection(med, selectedMedicines, setSelectedMedicines)}><X size={16}/></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                 {/* Med Search Autocomplete */}
                 <div className="relative">
                  <input type="text" className="form-input" placeholder="Tìm kiếm thuốc, TPCN..." value={medicineSearch} onChange={(e) => setMedicineSearch(e.target.value)} />
                  {medicineSearch && (
                    <div className="absolute top-100 left-0 right-0 bg-white border rounded-md shadow-md mt-1 z-10 p-2" style={{ borderColor: 'var(--bg-border)' }}>
                      {MOCK_MEDICINES.filter(m => m.name.toLowerCase().includes(medicineSearch.toLowerCase())).map(med => (
                         <div key={med.id} className="p-2 hover:bg-hover rounded cursor-pointer text-sm" onClick={() => {toggleSelection(med, selectedMedicines, setSelectedMedicines); setMedicineSearch('');}}>
                           <div className="font-medium">{med.name}</div>
                           <div className="text-xs text-muted">{med.type}</div>
                         </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* PHẦN 3: HOẠT ĐỘNG THỂ THAO */}
               <div className="card">
                <h4 className="font-bold text-md flex items-center gap-2 mb-4"><Activity size={18} /> Khuyến nghị Vận động (Lifestyle)</h4>
                
                {/* Selected Exercises */}
                {selectedExercises.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {selectedExercises.map(ex => (
                      <span key={ex.id} className="badge badge-revisit flex items-center gap-2" style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem' }}>
                        {ex.name} ({ex.duration})
                        <X size={14} className="cursor-pointer hover:text-black" onClick={() => toggleSelection(ex, selectedExercises, setSelectedExercises)} />
                      </span>
                    ))}
                  </div>
                )}

                {/* Ex Search */}
                <select className="form-select" onChange={(e) => {
                  const val = MOCK_EXERCISES.find(ex => ex.id === Number(e.target.value));
                  if(val && !selectedExercises.find(x => x.id === val.id)) setSelectedExercises([...selectedExercises, val]);
                  e.target.value = "";
                }}>
                  <option value="">+ Thêm bài tập từ thư viện</option>
                  {MOCK_EXERCISES.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
                </select>
              </div>

              {/* PHẦN 4: MONITORING */}
              <div className="form-group p-4" style={{ backgroundColor: 'var(--bg-hover)', borderRadius: 'var(--radius-md)' }}>
                <label className="form-label font-bold mb-3">Thiết lập Lịch theo dõi (Monitoring)</label>
                <div className="flex gap-4">
                  <div style={{ flex: 1 }}>
                    <label className="form-label text-xs">Cần Follow-up (24-72h)?</label>
                    <select className="form-select">
                      <option>Có - Liên hệ qua Trợ lý/Zalo</option>
                      <option>Không yêu cầu</option>
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="form-label text-xs">Lịch Tái khám</label>
                    <select className="form-select">
                      <option>Sau 2 tuần</option>
                      <option>Sau 1 tháng</option>
                      <option>Khi dùng hết thuốc</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Patient Snapshot & History */}
      <div className="flex-col gap-6">
         <div className="card" style={{ padding: '1.25rem' }}>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <FileText size={18} className="text-muted" /> Lịch sử nhanh
          </h3>
          <ul className="text-sm" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li>
              <div className="font-bold mb-1">Ca khám gần nhất (15 Th09)</div>
              <div className="text-muted">Giảm cân chậm, tư vấn về thói quen ăn đêm. Đổi sang phác đồ giàu đạm.</div>
            </li>
            <li style={{ borderTop: '1px solid var(--bg-hover)', paddingTop: '1rem' }}>
              <div className="font-bold mb-1">Ghi chú Follow-up (18 Th09)</div>
              <div className="text-muted">Chị Hà báo cáo bớt thèm ngọt, dễ ăn hơn thực đơn cũ.</div>
            </li>
          </ul>
          <button className="btn btn-ghost w-full mt-4 text-xs font-bold" onClick={() => navigate('/patient/1')}>Xem toàn bộ Hồ sơ</button>
         </div>
      </div>
    </div>
  );
}
