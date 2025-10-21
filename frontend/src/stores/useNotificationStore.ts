import { create } from 'zustand';
import toast from 'react-hot-toast';
import api from '../utils/axiosClient';

interface Notification {
  id: string;
  userId: string;
  tenantId: string;
  title: string;
  message: string;
  type: string;
  category?: string;
  entityType?: string;
  entityId?: string;
  isRead: boolean;
  readAt?: string;
  actionUrl?: string;
  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  pollingInterval: NodeJS.Timeout | null;
  isPolling: boolean;
  isLoading: boolean;
  lastNotificationId: string | null;
  
  // Actions
  startPolling: () => void;
  stopPolling: () => void;
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  addNotification: (notification: Notification) => void;
}

const POLLING_INTERVAL = 30000; // 30 seconds

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  pollingInterval: null,
  isPolling: false,
  isLoading: false,
  lastNotificationId: null,

  startPolling: () => {
    const { pollingInterval, isPolling } = get();
    
    // Don't start if already polling
    if (isPolling || pollingInterval) {
      console.log('[HTTP Polling] Already polling');
      return;
    }

    console.log('[HTTP Polling] Starting notification polling (30s interval)');
    
    // Fetch immediately
    get().fetchNotifications();
    get().fetchUnreadCount();
    
    // Set up polling interval
    const interval = setInterval(() => {
      get().fetchNotifications();
      get().fetchUnreadCount();
    }, POLLING_INTERVAL);
    
    set({ pollingInterval: interval, isPolling: true });
  },

  stopPolling: () => {
    const { pollingInterval } = get();
    
    if (pollingInterval) {
      clearInterval(pollingInterval);
      set({ pollingInterval: null, isPolling: false });
      console.log('[HTTP Polling] Stopped polling');
    }
  },

  fetchNotifications: async () => {
    try {
      set({ isLoading: true });
      const { data } = await api.get('/notifications', { params: { limit: 50 } });
      
      const { lastNotificationId } = get();
      
      // Check for new notifications (compare with the last known notification ID)
      if (data.length > 0 && lastNotificationId && data[0].id !== lastNotificationId) {
        // Find new notifications
        const newNotifications = [];
        for (const notification of data) {
          if (notification.id === lastNotificationId) break;
          newNotifications.push(notification);
        }
        
        // Show toast for new unread notifications
        newNotifications.reverse().forEach((notification: Notification) => {
          if (!notification.isRead) {
            const typeMap: Record<string, any> = {
              success: () => toast.success(notification.title),
              error: () => toast.error(notification.title),
              warning: () => toast(notification.title, { icon: '⚠️' }),
              info: () => toast(notification.title, { icon: 'ℹ️' }),
            };
            
            const showToast = typeMap[notification.type] || typeMap.info;
            showToast();
          }
        });
      }
      
      // Update state
      set({ 
        notifications: data, 
        isLoading: false,
        lastNotificationId: data.length > 0 ? data[0].id : null
      });
    } catch (error) {
      console.error('[Notifications] Failed to fetch notifications:', error);
      set({ isLoading: false });
    }
  },

  fetchUnreadCount: async () => {
    try {
      const { data } = await api.get('/notifications/unread-count');
      set({ unreadCount: data.count });
    } catch (error) {
      console.error('[Notifications] Failed to fetch unread count:', error);
    }
  },

  markAsRead: async (notificationId: string) => {
    try {
      await api.put(`/notifications/${notificationId}/read`);
      
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === notificationId ? { ...n, isRead: true, readAt: new Date().toISOString() } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch (error) {
      console.error('[Notifications] Failed to mark as read:', error);
    }
  },

  markAllAsRead: async () => {
    try {
      await api.put('/notifications/mark-all-read');
      
      set((state) => ({
        notifications: state.notifications.map((n) => ({
          ...n,
          isRead: true,
          readAt: new Date().toISOString(),
        })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.error('[Notifications] Failed to mark all as read:', error);
    }
  },

  deleteNotification: async (notificationId: string) => {
    try {
      await api.delete(`/notifications/${notificationId}`);
      
      set((state) => {
        const notification = state.notifications.find((n) => n.id === notificationId);
        const wasUnread = notification && !notification.isRead;
        
        return {
          notifications: state.notifications.filter((n) => n.id !== notificationId),
          unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
        };
      });
    } catch (error) {
      console.error('[Notifications] Failed to delete notification:', error);
    }
  },

  addNotification: (notification: Notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
    }));
  },
}));
