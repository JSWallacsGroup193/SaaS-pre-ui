import { useState } from 'react'
import { useUtilityStore } from '../store/utilityStore'
import { v4 as uuidv4 } from 'uuid'

export default function ManualJLite() {
  const [area, setArea] = useState('')
  const [multiplier, setMultiplier] = useState('25')
  const [btuh, setBtuh] = useState(null)
  const add = useUtilityStore(s => s.addEntry)

  const calc = () => {
    if (!area) return alert('Area required')
    const result = (Number(area) * Number(multiplier)).toFixed(0)
    const entry = {
      id: uuidv4(),
      type: 'manual-j-lite',
      inputs: { area, multiplier },
      result: { btuh: result },
      synced: false,
      timestamp: new Date().toISOString(),
    }
    add(entry)
    setBtuh(result)
  }

  return (
    <div>
      <h2>Manual J Lite</h2>
      <input type="number" placeholder="Sq Ft" value={area} onChange={e => setArea(e.target.value)} />
      <input type="number" placeholder="BTUh per Sq Ft" value={multiplier} onChange={e => setMultiplier(e.target.value)} />
      <button onClick={calc}>Calculate</button>
      {btuh && <p>Estimated Load: <strong>{btuh} BTUh</strong></p>}
    </div>
  )
}
