export interface CalendarDay {
  date: Date;
  isToday: boolean;
  dayShort: string; // e.g., 'Mon', 'Tue'
  dateNum: number;  // e.g., 24
  monthShort: string; // e.g., 'OCT'
}

export function getUpcomingDays(count: number = 7): CalendarDay[] {
  const days: CalendarDay[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    days.push({
      date: d,
      isToday: i === 0,
      dayShort: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      monthShort: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    });
  }

  return days;
}

// Parses strings like "1 hour", "2 hours", "90 mins", "90 minutes", "3 hrs" → minutes
export function parseSessionDurationMinutes(raw: string): number {
  const s = raw.toLowerCase().trim();
  const hoursMatch = s.match(/(\d+(\.\d+)?)\s*h/);
  const minsMatch  = s.match(/(\d+(\.\d+)?)\s*m/);
  if (hoursMatch) return Math.round(parseFloat(hoursMatch[1]) * 60);
  if (minsMatch)  return Math.round(parseFloat(minsMatch[1]));
  return 60; // fallback
}

// Generates time slots for a day given a step in minutes, between startHour and endHour (24h)
export function generateSlots(
  durationMinutes: number,
  startHour = 6,
  endHour = 23,
): { value: string; label: string }[] {
  const slots: { value: string; label: string }[] = [];
  let totalMinutes = startHour * 60;
  const endMinutes = endHour * 60;

  while (totalMinutes + durationMinutes <= endMinutes + durationMinutes) {
    const h = Math.floor(totalMinutes / 60) % 24;
    const m = totalMinutes % 60;
    const value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

    const period = h < 12 ? 'AM' : 'PM';
    const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const label = `${displayH}:${String(m).padStart(2, '0')} ${period}`;

    slots.push({ value, label });
    totalMinutes += durationMinutes;
    if (totalMinutes > endMinutes) break;
  }

  return slots;
}

export function isTimeInPast(timeStr: string, activeDate: Date): boolean {
  // timeStr is like "18:00"
  const now = new Date();
  
  // If the activeDate is strictly in the future, the time slot isn't in the past.
  if (
    activeDate.getFullYear() > now.getFullYear() ||
    (activeDate.getFullYear() === now.getFullYear() && activeDate.getMonth() > now.getMonth()) ||
    (activeDate.getFullYear() === now.getFullYear() && activeDate.getMonth() === now.getMonth() && activeDate.getDate() > now.getDate())
  ) {
    return false;
  }

  // Otherwise, it's today. Compare the time.
  const [hour, minute] = timeStr.split(':').map(Number);
  
  // Consider passed if the hour has strictly passed, or it is the same hour but minutes have passed.
  // Actually, to give a buffer or exact block, we check if the slot start hour has passed.
  if (hour < now.getHours()) return true;
  if (hour === now.getHours() && minute <= now.getMinutes()) return true;

  return false;
}
