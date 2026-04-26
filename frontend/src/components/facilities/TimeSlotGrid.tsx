import React from 'react';
  import { isTimeInPast, parseSessionDurationMinutes, generateSlots } from '../../utils/dateUtils';
import type { Facility } from '../../store/slices/facilitiesSlice';

interface TimeSlotGridProps {
  activeDate: Date | null;
  facility: Facility | null;
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
}

// Hardcoded booked slots — replace with API data later
const BOOKED_SLOTS = new Set(['18:00']);

export const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({ activeDate, facility, selectedSlot, onSelectSlot }) => {
  if (!activeDate) {
    return (
      <div className="bg-surface-container rounded-xl p-8 opacity-50">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Available Slots</h2>
        <p className="text-center text-[#adaaaa]">Please select a date first.</p>
      </div>
    );
  }

  const durationMinutes = facility ? parseSessionDurationMinutes(facility.maxTimePerSession) : 60;
  const slots = generateSlots(durationMinutes);

  return (
    <div className="bg-surface-container rounded-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Available Slots</h2>
        <span className="text-xs text-[#adaaaa] bg-[#1a1919] px-3 py-1 rounded-full">
          {facility?.maxTimePerSession} / session
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {slots.map((slot) => {
          const booked  = BOOKED_SLOTS.has(slot.value);
          const past    = isTimeInPast(slot.value, activeDate);
          const active  = selectedSlot === slot.value;
          const disabled = booked || past;

          if (disabled) {
            return (
              <button key={slot.value} disabled className="py-4 px-6 rounded-xl border border-[#484847]/20 text-[#adaaaa]/40 line-through cursor-not-allowed">
                <span className="block text-sm font-bold">{slot.label}</span>
                <span className="text-[10px] uppercase">{past ? 'Passed' : 'Booked'}</span>
              </button>
            );
          }

          return (
            <button
              key={slot.value}
              onClick={() => onSelectSlot(slot.value)}
              className={`py-4 px-6 rounded-xl group transition-all relative ${
                active
                  ? 'border-2 border-[#73ffe3] bg-[#73ffe3]/20'
                  : 'border border-[#484847]/20 hover:border-[#73ffe3]'
              }`}
            >
              <span className={`block text-sm font-bold ${active ? 'text-[#73ffe3]' : 'group-hover:text-[#73ffe3]'}`}>
                {slot.label}
              </span>
              {active && (
                <span className="absolute -top-2 -right-2 bg-[#73ffe3] text-[#006152] text-[8px] font-black px-2 py-1 rounded-full uppercase">
                  Selected
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
