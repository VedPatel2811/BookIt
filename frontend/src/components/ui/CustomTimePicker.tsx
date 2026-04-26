import React, { useState, useRef, useEffect } from 'react';

interface CustomTimePickerProps {
  value: string; // HH:mm (24-hour)
  onChange: (v: string) => void;
  className?: string;
}

export const CustomTimePicker: React.FC<CustomTimePickerProps> = ({ value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse current time
  let initH = '12';
  let initM = '00';
  let initAmPm = 'AM';
  if (value) {
    const [h, m] = value.split(':');
    let hInt = parseInt(h || '12', 10);
    initAmPm = hInt >= 12 ? 'PM' : 'AM';
    hInt = hInt % 12;
    if (hInt === 0) hInt = 12;
    initH = String(hInt).padStart(2, '0');
    initM = m || '00';
  }

  const [hour, setHour] = useState(initH);
  const [minute, setMinute] = useState(initM);
  const [ampm, setAmPm] = useState(initAmPm);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':');
      let hInt = parseInt(h || '12', 10);
      setAmPm(hInt >= 12 ? 'PM' : 'AM');
      hInt = hInt % 12;
      if (hInt === 0) hInt = 12;
      setHour(String(hInt).padStart(2, '0'));
      setMinute(m || '00');
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApply = () => {
    let hInt = parseInt(hour, 10);
    if (ampm === 'PM' && hInt < 12) hInt += 12;
    if (ampm === 'AM' && hInt === 12) hInt = 0;
    const finalH = String(hInt).padStart(2, '0');
    onChange(`${finalH}:${minute}`);
    setIsOpen(false);
  };

  const formatDisplay = () => {
    if (!value) return "Select Time";
    const [h, m] = value.split(':');
    let hInt = parseInt(h, 10);
    const valAmPm = hInt >= 12 ? 'PM' : 'AM';
    hInt = hInt % 12;
    if (hInt === 0) hInt = 12;
    return `${String(hInt).padStart(2, '0')}:${m} ${valAmPm}`;
  };

  const hours = Array.from({ length: 12 }).map((_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i).filter(m => m % 5 === 0).map(m => String(m).padStart(2, '0'));
  const ampmOptions = ['AM', 'PM'];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div 
        className="w-full h-full flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-white" : "text-[#adaaaa]/50"}>{formatDisplay()}</span>
        <span className="material-symbols-outlined text-[#73ffe3] text-sm">schedule</span>
      </div>
      
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-64 bg-[#1a1919] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#adaaaa] text-[10px] font-bold uppercase tracking-widest">Select Time</span>
          </div>

          <div className="flex gap-2 h-40">
            {/* Hours Column */}
            <div className="flex-1 bg-[#0e0e0e] rounded-xl overflow-y-auto no-scrollbar scroll-smooth snap-y">
              {hours.map(h => (
                <div 
                  key={`h-${h}`}
                  onClick={() => setHour(h)}
                  className={`h-10 flex items-center justify-center cursor-pointer snap-center text-sm transition-all
                    ${hour === h ? 'text-[#73ffe3] font-bold bg-white/5' : 'text-[#adaaaa] hover:text-white'}`}
                >
                  {h}
                </div>
              ))}
            </div>
            {/* Minutes Column */}
            <div className="flex-1 bg-[#0e0e0e] rounded-xl overflow-y-auto no-scrollbar scroll-smooth snap-y">
              {minutes.map(m => (
                <div 
                  key={`m-${m}`}
                  onClick={() => setMinute(m)}
                  className={`h-10 flex items-center justify-center cursor-pointer snap-center text-sm transition-all
                    ${minute === m ? 'text-[#73ffe3] font-bold bg-white/5' : 'text-[#adaaaa] hover:text-white'}`}
                >
                  {m}
                </div>
              ))}
            </div>
            {/* AM/PM Column */}
            <div className="flex-1 bg-[#0e0e0e] rounded-xl overflow-y-auto no-scrollbar scroll-smooth snap-y">
              {ampmOptions.map(a => (
                <div 
                  key={`ampm-${a}`}
                  onClick={() => setAmPm(a)}
                  className={`h-10 flex items-center justify-center cursor-pointer snap-center text-sm transition-all
                    ${ampm === a ? 'text-[#73ffe3] font-bold bg-white/5' : 'text-[#adaaaa] hover:text-white'}`}
                >
                  {a}
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={(e) => { e.preventDefault(); handleApply(); }}
            className="w-full mt-4 py-2 bg-[#73ffe3]/10 text-[#73ffe3] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#73ffe3]/20 transition-colors"
          >
            Apply Time
          </button>
        </div>
      )}
    </div>
  );
};
