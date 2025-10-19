import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type BoilerCalcType = 'expansion-tank' | 'delta-t-pump' | 'pipe-flow'

type Entry = {
  id: string
  type: BoilerCalcType
  inputs: Record<string, any>
  result: Record<string, any>
  synced: boolean
  timestamp: string
}

interface BoilerCalcState {
  entries: Entry[]
  addEntry: (entry: Entry) => void
  markSynced: (id: string) => void
}

export const useBoilerCalcStore = create<BoilerCalcState>()(
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
    {
      name: 'boiler-calc-store',
    }
  )
)
