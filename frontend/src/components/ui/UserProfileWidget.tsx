import { NotificationBell } from './NotificationBell';

interface UserProfileWidgetProps {
  avatarUrl?: string;
  avatarAlt?: string;
  onNotificationClick?: () => void;
  onAvatarClick?: () => void;
}

export function UserProfileWidget({
  avatarUrl,
  avatarAlt = 'User avatar',
  onNotificationClick,
  onAvatarClick,
}: UserProfileWidgetProps) {
  return (
    <div className="hidden lg:flex items-center gap-4 shrink-0 lg:self-center">
      <NotificationBell onClick={onNotificationClick} />
      <div
        onClick={onAvatarClick}
        className="h-10 w-10 lg:h-12 lg:w-12 rounded-full overflow-hidden border border-[#73ffe3]/20 cursor-pointer"
      >
        <img alt={avatarAlt} className="w-full h-full object-cover" src={avatarUrl} />
      </div>
    </div>
  );
}
