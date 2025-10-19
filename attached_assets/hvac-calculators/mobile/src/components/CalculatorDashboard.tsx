import { useState } from 'react'
import OhmsLawCalculator from './OhmsLawCalculator'
import CapacitorTestTool from './CapacitorTestTool'
import MotorAmpsChecker from './MotorAmpsChecker'
import VoltageDropTool from './VoltageDropTool'
import CalculationLogTable from './CalculationLogTable'
import '../styles/calculator.css'

const tabs = [
  { id: 'ohms', label: "Ohm’s Law", Component: OhmsLawCalculator },
  { id: 'capacitor', label: "Capacitor Test", Component: CapacitorTestTool },
  { id: 'motor', label: "Motor Amps", Component: MotorAmpsChecker },
  { id: 'voltage', label: "Voltage Drop", Component: VoltageDropTool },
  { id: 'log', label: "Logs + Sync", Component: CalculationLogTable },
]

export default function CalculatorDashboard() {
  const [active, setActive] = useState('ohms')
  const TabComponent = tabs.find(t => t.id === active)?.Component

  return (
    <div className="calculator-container">
      <h1>HVAC Electrical Calculators</h1>
      <div className="calculator-tabs">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}>{t.label}</button>
        ))}
      </div>
      <div className="calculator-panel">
        {TabComponent && <TabComponent />}
      </div>
    </div>
  )
}
