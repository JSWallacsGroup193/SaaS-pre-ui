import { useState } from 'react'
import { useTechStore } from '../store/techStore'

const modules = [
  { id: 'electrical', label: 'Electrical Tools' },
  { id: 'refrigeration', label: 'Refrigeration Tools' },
  { id: 'airflow', label: 'Airflow Tools' },
  { id: 'gas', label: 'Gas/Combustion Tools' },
  { id: 'boiler', label: 'Boiler/Hydronic Tools' },
  { id: 'utility', label: 'Utility Tools' },
]

export default function HVACToolLauncher() {
  const [selected, setSelected] = useState('')
  const { technician, setTechnician } = useTechStore()

  return (
    <div style={{ padding: '1rem' }}>
      <h2>HVAC Mega Suite</h2>
      <input
        placeholder="Technician Name"
        value={technician}
        onChange={(e) => setTechnician(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {modules.map((mod) => (
          <button key={mod.id} onClick={() => setSelected(mod.id)}>
            {mod.label}
          </button>
        ))}
      </div>
      {selected && <p style={{ marginTop: '1rem' }}>→ Launch: <strong>{selected}</strong> tools</p>}
    </div>
  )
}
