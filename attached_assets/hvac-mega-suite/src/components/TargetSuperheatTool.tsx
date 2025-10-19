import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useCalculatorStore } from '../store/calculatorStore'

export default function TargetSuperheatTool() {
  const [wetBulb, setWetBulb] = useState<number | ''>('')
  const [dryBulb, setDryBulb] = useState<number | ''>('')
  const [result, setResult] = useState<number | null>(null)
  const addEntry = useCalculatorStore((s) => s.addEntry)

  const calculate = () => {
    if (wetBulb === '' || dryBulb === '') return alert('Enter both temperatures')

    const wb = Number(wetBulb)
    const db = Number(dryBulb)

    // Simple linear estimation: SH = 0.7 * WB + 0.2 * DB + 10
    const targetSH = 0.7 * wb + 0.2 * db + 10

    const entry = {
      id: uuidv4(),
      type: 'target-superheat',
      inputs: { wetBulb, dryBulb },
      result: { targetSH },
      synced: false,
      timestamp: new Date().toISOString(),
    }

    addEntry(entry)
    setResult(targetSH)
  }

  return (
    <div>
      <h2>Target Superheat Tool</h2>
      <input type="number" placeholder="Indoor Wet Bulb (°F)" value={wetBulb} onChange={(e) => setWetBulb(e.target.value === '' ? '' : +e.target.value)} />
      <input type="number" placeholder="Outdoor Dry Bulb (°F)" value={dryBulb} onChange={(e) => setDryBulb(e.target.value === '' ? '' : +e.target.value)} />
      <button onClick={calculate}>Calculate</button>
      {result !== null && <p>Target Superheat: {result.toFixed(1)}°F</p>}
    </div>
  )
}
