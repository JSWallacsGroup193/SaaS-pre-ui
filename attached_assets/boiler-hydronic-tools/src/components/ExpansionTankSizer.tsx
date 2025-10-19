import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useBoilerCalcStore } from '../store/boilerCalcStore'

export default function ExpansionTankSizer() {
  const [boilerSize, setBoilerSize] = useState('')
  const [pressure, setPressure] = useState('')
  const [temp, setTemp] = useState('')
  const [result, setResult] = useState(null)
  const addEntry = useBoilerCalcStore(s => s.addEntry)

  const calculate = () => {
    if (!boilerSize || !pressure || !temp) return alert('Fill all fields')
    const size = (Number(boilerSize) * 0.03).toFixed(2) // Simple % rule of thumb
    const entry = {
      id: uuidv4(),
      type: 'expansion-tank',
      inputs: { boilerSize, pressure, temp },
      result: { tankSize: size + ' gallons' },
      synced: false,
      timestamp: new Date().toISOString(),
    }
    addEntry(entry)
    setResult(size)
  }

  return (
    <div>
      <h2>Expansion Tank Sizer</h2>
      <input type="number" placeholder="Boiler Size (BTUh)" value={boilerSize} onChange={e => setBoilerSize(e.target.value)} />
      <input type="number" placeholder="System Pressure (psi)" value={pressure} onChange={e => setPressure(e.target.value)} />
      <input type="number" placeholder="Water Temp (°F)" value={temp} onChange={e => setTemp(e.target.value)} />
      <button onClick={calculate}>Calculate</button>
      {result && <p>Recommended Tank Size: <strong>{result} gal</strong></p>}
    </div>
  )
}
