import { useEffect } from 'react'
import { useUtilityStore } from '../store/utilityStore'
import { useTechStore } from '../store/techStore'

export function useAutoSync() {
  const { entries, markSynced } = useUtilityStore()
  const { technician } = useTechStore()

  useEffect(() => {
    const interval = setInterval(async () => {
      const unsynced = entries.filter((e) => !e.synced && e.inputs?.technician === technician)
      if (unsynced.length === 0) return

      try {
        const res = await fetch('/utility/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(unsynced),
        })

        if (res.ok) {
          unsynced.forEach((e) => markSynced(e.id))
        }
      } catch (err) {
        console.warn('Sync failed (offline?):', err)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [entries, technician])
}
