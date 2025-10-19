import { useState } from 'react'
import DewPointConverter from './DewPointConverter'
import TonnageCalculator from './TonnageCalculator'
import UnitConverter from './UnitConverter'
import ManualJLite from './ManualJLite'

const tools = [
  { id: 'dew', label: 'Dew Point/Wet Bulb', Component: DewPointConverter },
  { id: 'ton', label: 'Tonnage', Component: TonnageCalculator },
  { id: 'conv', label: 'Unit Converter', Component: UnitConverter },
  { id: 'mj', label: 'Manual J Lite', Component: ManualJLite },
]

export default function CalculatorDashboard() {
  const [active, setActive] = useState('dew')
  const Active = tools.find(t => t.id === active)?.Component
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {tools.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}>{t.label}</button>
        ))}
      </div>
      <div>{Active && <Active />}</div>
    </div>
  )
}
