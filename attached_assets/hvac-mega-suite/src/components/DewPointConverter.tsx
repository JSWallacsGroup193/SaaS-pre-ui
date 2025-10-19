import { useState } from 'react'
import { calculateDewPoint, calculateWetBulb } from '../utils/sharedUtils'
import { useUtilityStore } from '../store/utilityStore'
import { v4 as uuidv4 } from 'uuid'

export default function DewPointConverter() {
  const [temp, setTemp] = useState('')
  const [rh, setRh] = useState('')
  const [dew, setDew] = useState(null)
  const [wet, setWet] = useState(null)
  const add = useUtilityStore(s => s.addEntry)

  const calc = () => {
    if (!temp || !rh) return alert('All fields required')
    const dewPoint = calculateDewPoint(Number(temp), Number(rh)).toFixed(1)
    const wetBulb = calculateWetBulb(Number(temp), Number(rh)).toFixed(1)
    const entry = {
      id: uuidv4(),
      type: 'dewpoint',
      inputs: { temp, rh },
      result: { dewPoint, wetBulb },
      synced: false,
      timestamp: new Date().toISOString(),
    }
    add(entry)
    setDew(dewPoint)
    setWet(wetBulb)
  }

  return (
    <div>
      <h2>Wet Bulb / Dew Point</h2>
      <input type="number" placeholder="Dry Bulb Temp (°F)" value={temp} onChange={e => setTemp(e.target.value)} />
      <input type="number" placeholder="RH (%)" value={rh} onChange={e => setRh(e.target.value)} />
      <button onClick={calc}>Calculate</button>
      {dew && <p>Dew Point: <strong>{dew}°F</strong><br />Wet Bulb: <strong>{wet}°F</strong></p>}
    </div>
  )
}
