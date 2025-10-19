import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useCalculatorStore } from '../store/calculatorStore'

export default function CFMCalculator() {
  const [btuh, setBtuh] = useState<number | ''>('')
  const [deltaT, setDeltaT] = useState<number | ''>('')
  const [result, setResult] = useState<number | null>(null)
  const addEntry = useCalculatorStore((s) => s.addEntry)

  const calculate = () => {
    if (btuh === '' || deltaT === '') return alert('Enter both fields')
    if (Number(deltaT) === 0) return alert('Temp rise (ΔT) cannot be 0')

    const cfm = Number(btuh) / (1.08 * Number(deltaT))

    const entry = {
      id: uuidv4(),
      type: 'cfm',
      inputs: { btuh, deltaT },
      result: { cfm },
      synced: false,
      timestamp: new Date().toISOString(),
    }

    addEntry(entry)
    setResult(cfm)
  }

  return (
    <div>
      <h2>CFM Calculator</h2>
      <input type="number" placeholder="BTU/hr" value={btuh} onChange={(e) => setBtuh(e.target.value === '' ? '' : +e.target.value)} />
      <input type="number" placeholder="Temp Rise (°F)" value={deltaT} onChange={(e) => setDeltaT(e.target.value === '' ? '' : +e.target.value)} />
      <button onClick={calculate}>Calculate</button>
      {result !== null && <p>CFM: {result.toFixed(1)}</p>}
    </div>
  )
}
