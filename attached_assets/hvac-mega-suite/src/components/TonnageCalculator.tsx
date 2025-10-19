import { useState } from 'react'
import { useUtilityStore } from '../store/utilityStore'
import { v4 as uuidv4 } from 'uuid'

export default function TonnageCalculator() {
  const [btuh, setBtuh] = useState('')
  const [tons, setTons] = useState(null)
  const add = useUtilityStore(s => s.addEntry)

  const calc = () => {
    if (!btuh) return alert('BTUh required')
    const t = (Number(btuh) / 12000).toFixed(2)
    const entry = {
      id: uuidv4(),
      type: 'tonnage',
      inputs: { btuh },
      result: { tons: t },
      synced: false,
      timestamp: new Date().toISOString(),
    }
    add(entry)
    setTons(t)
  }

  return (
    <div>
      <h2>Tonnage Calculator</h2>
      <input type="number" placeholder="BTUh" value={btuh} onChange={e => setBtuh(e.target.value)} />
      <button onClick={calc}>Calculate</button>
      {tons && <p>Tons: <strong>{tons}</strong></p>}
    </div>
  )
}
