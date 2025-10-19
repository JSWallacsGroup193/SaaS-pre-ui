import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CalculatorType =
  | 'superheat'
  | 'subcooling'
  | 'target-superheat'
  | 'pt-chart'

type CalculatorEntry = {
  id: string
  type: CalculatorType
  inputs: Record<string, any>
  result: Record<string, any>
  synced: boolean
  timestamp: string
}

interface CalculatorState {
  entries: CalculatorEntry[]
  addEntry: (entry: CalculatorEntry) => void
  markSynced: (id: string) => void
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (entry) => set({ entries: [...get().entries, entry] }),
      markSynced: (id) =>
        set({
          entries: get().entries.map((e) =>
            e.id === id ? { ...e, synced: true } : e
          ),
        }),
    }),
    {
      name: 'refrigeration-calculator-store',
    }
  )
)
