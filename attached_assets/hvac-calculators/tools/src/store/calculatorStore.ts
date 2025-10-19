import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type OhmsLawInputs = { V?: number; I?: number; R?: number }
type OhmsLawResult = { V: number; I: number; R: number; P: number }

type CalculatorEntry = {
  id: string
  type: 'ohms-law' | 'capacitor-test' | 'motor-amps' | 'voltage-drop'
  inputs: any
  result: any
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
      name: 'calculator-store',
    }
  )
)
