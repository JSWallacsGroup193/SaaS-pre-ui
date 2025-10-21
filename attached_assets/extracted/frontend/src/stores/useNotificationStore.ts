import { create } from 'zustand';
import io from 'socket.io-client';
import toast from 'react-hot-toast';

const socket = io('/notifications', {
  auth: { tenantId: 'mock-tenant-id' }
});

export const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,
  fetch: async () => {
    const res = await fetch('/api/v1/notifications');
    const data = await res.json();
    set({ notifications: data, unreadCount: data.filter(n => !n.read).length });
  },
  add: (n) => set((state) => ({
    notifications: [n, ...state.notifications],
    unreadCount: state.unreadCount + 1
  }))
}));

socket.on('notification', (notification) => {
  useNotificationStore.getState().add(notification);
  toast(notification.message);
});