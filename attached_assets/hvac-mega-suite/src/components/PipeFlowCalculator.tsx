import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useBoilerCalcStore } from '../store/boilerCalcStore'

export default function PipeFlowCalculator() {
  const [diameter, setDiameter] = useState('')
  const [length, setLength] = useState('')
  const [pressureDrop, setPressureDrop] = useState('')
  const [result, setResult] = useState(null)
  const addEntry = useBoilerCalcStore(s => s.addEntry)

  const calculate = () => {
    if (!diameter || !length || !pressureDrop) return alert('Fill all fields')
    const gpm = ((Number(pressureDrop) * Number(diameter)) / Number(length) * 100).toFixed(2)
    const entry = {
      id: uuidv4(),
      type: 'pipe-flow',
      inputs: { diameter, length, pressureDrop },
      result: { gpm },
      synced: false,
      timestamp: new Date().toISOString(),
    }
    addEntry(entry)
    setResult(gpm)
  }

  return (
    <div>
      <h2>Pipe Flow Calculator</h2>
      <input type="number" placeholder="Pipe Diameter (in)" value={diameter} onChange={e => setDiameter(e.target.value)} />
      <input type="number" placeholder="Length (ft)" value={length} onChange={e => setLength(e.target.value)} />
      <input type="number" placeholder="Pressure Drop (psi)" value={pressureDrop} onChange={e => setPressureDrop(e.target.value)} />
      <button onClick={calculate}>Calculate</button>
      {result && <p>Flow Rate: <strong>{result} GPM</strong></p>}
    </div>
  )
}
