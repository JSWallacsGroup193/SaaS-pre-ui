import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UtilityEntry = {
  id: string
  type: string
  inputs: Record<string, any>
  result: Record<string, any>
  synced: boolean
  timestamp: string
}

interface UtilityState {
  entries: UtilityEntry[]
  addEntry: (entry: UtilityEntry) => void
  markSynced: (id: string) => void
}

export const useUtilityStore = create<UtilityState>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (entry) => set({ entries: [...get().entries, entry] }),
      markSynced: (id: string) =>
        set({
          entries: get().entries.map((e) =>
            e.id === id ? { ...e, synced: true } : e
          ),
        }),
    }),
    { name: 'utility-calcs-store' }
  )
)
