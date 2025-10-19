import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type GasToolType = 'gas-pipe-sizing' | 'combustion-air' | 'combustion-ref'

type Entry = {
  id: string
  type: GasToolType
  inputs: Record<string, any>
  result: Record<string, any>
  synced: boolean
  timestamp: string
}

interface GasCalculatorState {
  entries: Entry[]
  addEntry: (entry: Entry) => void
  markSynced: (id: string) => void
}

export const useGasCalculatorStore = create<GasCalculatorState>()(
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
      name: 'gas-calculator-store',
    }
  )
)
