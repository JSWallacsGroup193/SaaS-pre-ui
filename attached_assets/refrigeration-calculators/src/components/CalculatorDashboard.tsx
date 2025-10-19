import { useState } from 'react'
import SuperheatCalculator from './SuperheatCalculator'
import SubcoolingCalculator from './SubcoolingCalculator'
import TargetSuperheatTool from './TargetSuperheatTool'
import PTChart from './PTChart'

const tabs = [
  { id: 'superheat', label: 'Superheat', Component: SuperheatCalculator },
  { id: 'subcooling', label: 'Subcooling', Component: SubcoolingCalculator },
  { id: 'target-sh', label: 'Target SH', Component: TargetSuperheatTool },
  { id: 'pt', label: 'PT Chart', Component: PTChart },
]

export default function CalculatorDashboard() {
  const [active, setActive] = useState('superheat')
  const Tab = tabs.find(t => t.id === active)?.Component

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}>{t.label}</button>
        ))}
      </div>
      {Tab && <Tab />}
    </div>
  )
}
