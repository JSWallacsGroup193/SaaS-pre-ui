import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useCalculatorStore } from '../store/calculatorStore'

export default function MotorAmpsChecker() {
  const [measured, setMeasured] = useState<number | ''>('')
  const [rla, setRla] = useState<number | ''>('')
  const [loadPercent, setLoadPercent] = useState<number | null>(null)
  const [color, setColor] = useState<string | null>(null)
  const addEntry = useCalculatorStore((s) => s.addEntry)

  const checkLoad = () => {
    if (measured === '' || rla === '') return alert('Enter both values')
    const percent = (Number(measured) / Number(rla)) * 100
    setLoadPercent(percent)

    let status = 'green'
    if (percent >= 90 && percent <= 100) status = 'yellow'
    if (percent > 100) status = 'red'
    setColor(status)

    addEntry({
      id: uuidv4(),
      type: 'motor-amps',
      inputs: { measured, rla },
      result: { load: percent, status },
      synced: false,
      timestamp: new Date().toISOString(),
    })
  }

  return (
    <div>
      <h2>Motor Amps Checker</h2>
      <input placeholder="Measured Amps" type="number" value={measured} onChange={(e) => setMeasured(e.target.value === '' ? '' : +e.target.value)} />
      <input placeholder="RLA/FLA" type="number" value={rla} onChange={(e) => setRla(e.target.value === '' ? '' : +e.target.value)} />
      <button onClick={checkLoad}>Check</button>
      {loadPercent !== null && (
        <p>
          Load: {loadPercent.toFixed(1)}% - Status: <span style={{ color }}>{color}</span>
        </p>
      )}
    </div>
  )
}
