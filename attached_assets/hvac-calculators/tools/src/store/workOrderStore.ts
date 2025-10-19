import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type WorkOrder = {
  id: string
  title: string
  customer: string
  status: 'open' | 'in-progress' | 'closed'
  notes: string
  signature?: string
  attachments?: string[]
  synced?: boolean
}

interface WorkOrderState {
  workOrders: WorkOrder[]
  add: (wo: WorkOrder) => void
  update: (id: string, updates: Partial<WorkOrder>) => void
  remove: (id: string) => void
  markSynced: (id: string) => void
}

export const useWorkOrderStore = create<WorkOrderState>()(
  persist(
    (set, get) => ({
      workOrders: [],
      add: (wo) => set({ workOrders: [...get().workOrders, wo] }),
      update: (id, updates) =>
        set({
          workOrders: get().workOrders.map((wo) =>
            wo.id === id ? { ...wo, ...updates } : wo
          ),
        }),
      remove: (id) =>
        set({ workOrders: get().workOrders.filter((wo) => wo.id !== id) }),
      markSynced: (id) =>
        set({
          workOrders: get().workOrders.map((wo) =>
            wo.id === id ? { ...wo, synced: true } : wo
          ),
        }),
    }),
    { name: 'wo-store' }
  )
)
