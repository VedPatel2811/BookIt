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
