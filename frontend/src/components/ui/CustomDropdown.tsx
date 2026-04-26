import React, { useState, useRef, useEffect } from 'react';

interface CustomDropdownProps {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({ value, onChange, options, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div 
        className="w-full h-full flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <span className="material-symbols-outlined text-[#73ffe3] text-sm transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
      </div>
      
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-full min-w-[max-content] bg-[#1a1919] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((opt) => (
            <div 
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`px-5 py-3 text-sm cursor-pointer transition-colors ${value === opt ? 'bg-[#73ffe3]/10 text-[#73ffe3] font-bold' : 'text-white hover:bg-[#262626]'}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
