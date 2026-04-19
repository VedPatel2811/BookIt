import React from 'react';
import type { CalendarDay } from '../../utils/dateUtils';

interface DateSelectorProps {
  days: CalendarDay[];
  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ days, selectedDate, onSelectDate }) => {
  // Check if a generated CalendarDay is the currently selected date.
  const isSelected = (day: CalendarDay) => {
    if (!selectedDate) return false;
    return (
      day.date.getDate() === selectedDate.getDate() &&
      day.date.getMonth() === selectedDate.getMonth() &&
      day.date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="bg-surface-container rounded-xl p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Select Date</h2>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg hover:bg-[#201f1f] text-[#adaaaa] transition-colors active:scale-95">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="p-2 rounded-lg hover:bg-[#201f1f] text-[#adaaaa] transition-colors active:scale-95">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      
      <div className="flex overflow-x-auto scrollbar-hide justify-start lg:justify-between gap-4 pb-2">
        {days.map((day, idx) => {
          const active = isSelected(day);
          
          return (
            <div
              key={idx}
              onClick={() => onSelectDate(day.date)}
              className={`min-w-[80px] flex-1 p-4 rounded-xl flex flex-col items-center cursor-pointer transition-all active:scale-95 snap-center shrink-0 ${
                active
                  ? 'border-2 border-[#73ffe3] bg-[#73ffe3]/10'
                  : 'border border-[#484847]/30 hover:border-[#73ffe3]/50'
              }`}
            >
              <span className={`text-xs uppercase font-${active ? 'bold' : 'medium'} ${active ? 'text-[#73ffe3]' : 'text-[#adaaaa]'}`}>
                {day.isToday ? 'Today' : day.dayShort}
              </span>
              <span className="text-2xl font-black text-white my-1">{day.dateNum}</span>
              <span className={`text-xs ${active ? 'text-[#73ffe3]/70' : 'text-[#adaaaa]'}`}>
                {day.monthShort}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
