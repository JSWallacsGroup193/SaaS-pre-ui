import { useNotificationStore } from '../stores/useNotificationStore';

export function Notifications() {
  const { notifications, unreadCount } = useNotificationStore();

  return (
    <div className="relative">
      <button className="relative">
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>
      <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded z-10">
        {notifications.length === 0 && (
          <div className="p-2 text-sm text-gray-500">No notifications</div>
        )}
        {notifications.map((n) => (
          <div key={n.id} className="p-2 border-b text-sm">{n.message}</div>
        ))}
      </div>
    </div>
  );
}