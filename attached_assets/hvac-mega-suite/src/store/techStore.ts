import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TechStore {
  technician: string
  setTechnician: (name: string) => void
}

export const useTechStore = create<TechStore>()(
  persist(
    (set) => ({
      technician: '',
      setTechnician: (name) => set({ technician: name }),
    }),
    { name: 'tech-id-store' }
  )
)
