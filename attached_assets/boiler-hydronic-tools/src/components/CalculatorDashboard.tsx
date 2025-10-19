import { useState } from 'react'
import ExpansionTankSizer from './ExpansionTankSizer'
import DeltaTPumpSizingTool from './DeltaTPumpSizingTool'
import PipeFlowCalculator from './PipeFlowCalculator'

const tabs = [
  { id: 'expansion', label: 'Expansion Tank', Component: ExpansionTankSizer },
  { id: 'delta', label: 'Delta T Pump', Component: DeltaTPumpSizingTool },
  { id: 'pipe', label: 'Pipe Flow', Component: PipeFlowCalculator },
]

export default function CalculatorDashboard() {
  const [active, setActive] = useState('expansion')
  const Tab = tabs.find(t => t.id === active)?.Component
  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}>{t.label}</button>
        ))}
      </div>
      {Tab && <Tab />}
    </div>
  )
}
