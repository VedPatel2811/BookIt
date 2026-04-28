import React, { useState, useRef, useEffect } from 'react';

interface CustomDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (v: string) => void;
  className?: string;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse current date
  const selectedDate = value ? new Date(value) : new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = currentMonth.getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSelectDate = (day: number) => {
    // Month is 0-indexed, but YYYY-MM-DD needs 1-12
    const y = currentMonth.getFullYear();
    const m = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    onChange(`${y}-${m}-${d}`);
    setIsOpen(false);
  };

  const formatDisplay = () => {
    if (!value) return "Select Date";
    // JS dates can be tricky with timezone if we pass YYYY-MM-DD directly, 
    // appending T00:00:00 avoids shifting
    const dt = new Date(`${value}T00:00:00`);
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div 
        className="w-full h-full flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-white" : "text-[#adaaaa]/50"}>{formatDisplay()}</span>
        <span className="material-symbols-outlined text-[#73ffe3] text-sm">calendar_today</span>
      </div>
      
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-64 bg-[#1a1919] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 p-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={(e) => { e.preventDefault(); handlePrevMonth(); }} className="text-[#adaaaa] hover:text-[#73ffe3] p-1 transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <span className="text-white font-bold text-sm">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
            <button onClick={(e) => { e.preventDefault(); handleNextMonth(); }} className="text-[#adaaaa] hover:text-[#73ffe3] p-1 transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {daysOfWeek.map(d => <span key={d} className="text-[#adaaaa] text-[10px] font-bold">{d}</span>)}
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-8"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = value === dStr;
              return (
                <button
                  key={day}
                  onClick={(e) => { e.preventDefault(); handleSelectDate(day); }}
                  className={`h-8 w-8 rounded-full text-xs transition-colors flex items-center justify-center mx-auto
                    ${isSelected ? 'bg-[#73ffe3] text-[#0e0e0e] font-bold shadow-[0_0_10px_rgba(115,255,227,0.5)]' : 'text-white hover:bg-white/10'}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
