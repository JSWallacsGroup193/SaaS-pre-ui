import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useBoilerCalcStore } from '../store/boilerCalcStore'

export default function DeltaTPumpSizingTool() {
  const [btuh, setBtuh] = useState('')
  const [deltaT, setDeltaT] = useState('')
  const [result, setResult] = useState(null)
  const addEntry = useBoilerCalcStore(s => s.addEntry)

  const calculate = () => {
    if (!btuh || !deltaT) return alert('Fill all fields')
    const gpm = (Number(btuh) / (500 * Number(deltaT))).toFixed(2)
    const entry = {
      id: uuidv4(),
      type: 'delta-t-pump',
      inputs: { btuh, deltaT },
      result: { gpm },
      synced: false,
      timestamp: new Date().toISOString(),
    }
    addEntry(entry)
    setResult(gpm)
  }

  return (
    <div>
      <h2>Delta T Pump Sizing</h2>
      <input type="number" placeholder="System BTUh" value={btuh} onChange={e => setBtuh(e.target.value)} />
      <input type="number" placeholder="Delta T (°F)" value={deltaT} onChange={e => setDeltaT(e.target.value)} />
      <button onClick={calculate}>Calculate</button>
      {result && <p>Flow Rate: <strong>{result} GPM</strong></p>}
    </div>
  )
}
