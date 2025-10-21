import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
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
  socket: Socket | null;
  isConnected: boolean;
  isLoading: boolean;
  
  // Actions
  connect: (userId: string, tenantId: string) => void;
  disconnect: () => void;
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  addNotification: (notification: Notification) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  socket: null,
  isConnected: false,
  isLoading: false,

  connect: (userId: string, tenantId: string) => {
    const { socket: existingSocket } = get();
    
    // Don't reconnect if already connected
    if (existingSocket?.connected) {
      console.log('[WebSocket] Already connected');
      return;
    }

    // Disconnect existing socket if any
    if (existingSocket) {
      existingSocket.disconnect();
    }

    const socketUrl = import.meta.env.VITE_WS_URL || window.location.origin;
    const token = localStorage.getItem('token');

    console.log('[WebSocket] Connecting to:', `${socketUrl}/notifications`);

    const newSocket = io(`${socketUrl}/notifications`, {
      auth: {
        userId,
        tenantId,
        token,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('[WebSocket] Connected successfully');
      set({ isConnected: true });
      
      // Fetch initial data on connect
      get().fetchNotifications();
      get().fetchUnreadCount();
    });

    newSocket.on('disconnect', () => {
      console.log('[WebSocket] Disconnected');
      set({ isConnected: false });
    });

    newSocket.on('notification', (notification: Notification) => {
      console.log('[WebSocket] New notification received:', notification);
      
      // Add to store
      get().addNotification(notification);
      
      // Show toast notification
      const typeMap: Record<string, any> = {
        success: () => toast.success(notification.title),
        error: () => toast.error(notification.title),
        warning: () => toast(notification.title, { icon: '⚠️' }),
        info: () => toast(notification.title, { icon: 'ℹ️' }),
      };
      
      const showToast = typeMap[notification.type] || typeMap.info;
      showToast();
      
      // Increment unread count
      set((state) => ({ unreadCount: state.unreadCount + 1 }));
    });

    newSocket.on('connect_error', (error: Error) => {
      console.error('[WebSocket] Connection error:', error);
      set({ isConnected: false });
    });

    set({ socket: newSocket });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
      console.log('[WebSocket] Manually disconnected');
    }
  },

  fetchNotifications: async () => {
    try {
      set({ isLoading: true });
      const { data } = await api.get('/notifications', { params: { limit: 50 } });
      set({ notifications: data, isLoading: false });
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
