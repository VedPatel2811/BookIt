import React from 'react';

interface StatsWidgetProps {
  label: string;
  value: string | number | undefined;
  unit?: string;
  progressPercentage?: number;
  colorHex?: string; // e.g., #73ffe3
}

export const StatsWidget: React.FC<StatsWidgetProps> = ({
  label,
  value,
  unit,
  progressPercentage = 100,
  colorHex = '#73ffe3'
}) => {
  return (
    <div className="bg-[#131313] p-6 rounded-3xl group hover:bg-[#1a1919] transition-colors duration-500 border border-white/5">
      <p className="text-[#adaaaa] text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-end gap-2 text-white">
        <span className="text-4xl font-headline font-extrabold">{value !== undefined ? value : '-'}</span>
        {unit && <span className="font-bold pb-1 text-sm" style={{ color: colorHex }}>{unit}</span>}
      </div>
      <div className="mt-4 h-1 w-full bg-[#262626] rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-1000" 
          style={{ width: `${progressPercentage}%`, backgroundColor: colorHex }}
        ></div>
      </div>
    </div>
  );
};
