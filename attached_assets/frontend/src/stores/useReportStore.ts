import { create } from 'zustand';

export const useReportStore = create((set) => ({
  tab: 'Financial',
  filters: {
    from: null,
    to: null,
    technicianId: null,
    customerId: null,
  },
  setTab: (tab: string) => set({ tab }),
  setFilter: (key: string, value: any) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),
}));