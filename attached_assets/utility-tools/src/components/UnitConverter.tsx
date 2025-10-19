import { useState } from 'react'
import { convertUnits } from '../utils/sharedUtils'
import { useUtilityStore } from '../store/utilityStore'
import { v4 as uuidv4 } from 'uuid'

export default function UnitConverter() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [val, setVal] = useState('')
  const [res, setRes] = useState(null)
  const add = useUtilityStore(s => s.addEntry)

  const convert = () => {
    if (!val || !from || !to) return alert('All fields required')
    const result = convertUnits(Number(val), from, to).toFixed(3)
    const entry = {
      id: uuidv4(),
      type: 'unit-convert',
      inputs: { from, to, val },
      result: { result },
      synced: false,
      timestamp: new Date().toISOString(),
    }
    add(entry)
    setRes(result)
  }

  return (
    <div>
      <h2>HVAC Unit Converter</h2>
      <input value={val} onChange={e => setVal(e.target.value)} placeholder="Value" />
      <input value={from} onChange={e => setFrom(e.target.value)} placeholder="From unit (e.g. btu, cfm, psi)" />
      <input value={to} onChange={e => setTo(e.target.value)} placeholder="To unit (e.g. kwh, lps, pa)" />
      <button onClick={convert}>Convert</button>
      {res && <p>Result: <strong>{res}</strong></p>}
    </div>
  )
}
