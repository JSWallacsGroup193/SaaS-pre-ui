import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useCalculatorStore } from '../store/calculatorStore'

export default function CapacitorTestTool() {
  const [rated, setRated] = useState<number | ''>('')
  const [measured, setMeasured] = useState<number | ''>('')
  const [status, setStatus] = useState<string | null>(null)
  const addEntry = useCalculatorStore((s) => s.addEntry)

  const testCapacitor = () => {
    if (rated === '' || measured === '') return alert('Enter both values')
    const ratedVal = Number(rated)
    const measuredVal = Number(measured)
    const tolerance = ratedVal * 0.10
    const pass = measuredVal >= ratedVal - tolerance && measuredVal <= ratedVal + tolerance
    const result = pass ? 'PASS' : 'FAIL'
    setStatus(result)

    addEntry({
      id: uuidv4(),
      type: 'capacitor-test',
      inputs: { rated: ratedVal, measured: measuredVal },
      result,
      synced: false,
      timestamp: new Date().toISOString(),
    })
  }

  return (
    <div>
      <h2>Capacitor Test Tool</h2>
      <input type="number" placeholder="Rated µF" value={rated} onChange={(e) => setRated(e.target.value === '' ? '' : +e.target.value)} />
      <input type="number" placeholder="Measured µF" value={measured} onChange={(e) => setMeasured(e.target.value === '' ? '' : +e.target.value)} />
      <button onClick={testCapacitor}>Test</button>
      {status && <p>Result: {status}</p>}
    </div>
  )
}
