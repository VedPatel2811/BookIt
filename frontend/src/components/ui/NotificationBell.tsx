interface NotificationBellProps {
  onClick?: () => void;
}

export function NotificationBell({ onClick }: NotificationBellProps) {
  return (
    <div
      onClick={onClick}
      className="bg-[#1a1919]/40 backdrop-blur-xl border border-white/5 p-3 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#262626] transition-colors"
    >
      <span className="material-symbols-outlined text-[#adaaaa] hover:text-[#73ffe3] transition-colors">
        notifications
      </span>
    </div>
  );
}
