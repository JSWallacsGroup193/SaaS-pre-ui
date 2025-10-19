import { useUtilityStore } from '../store/utilityStore'
import { useTechStore } from '../store/techStore'

export default function TechnicianHistory() {
  const { entries } = useUtilityStore()
  const { technician } = useTechStore()

  const filtered = entries.filter(e => e.inputs?.technician === technician)

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>{technician ? `${technician}'s` : 'Your'} Past Entries</h3>
      <ul>
        {filtered.map((e) => (
          <li key={e.id}>
            <strong>{e.type}</strong> - {new Date(e.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  )
}
