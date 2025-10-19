import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useCalculatorStore } from '../store/calculatorStore'

export default function DuctSizer() {
  const [cfm, setCfm] = useState<number | ''>('')
  const [velocity, setVelocity] = useState<number | ''>('')
  const [shape, setShape] = useState<'round' | 'rectangular'>('round')
  const [result, setResult] = useState<any>(null)
  const addEntry = useCalculatorStore((s) => s.addEntry)

  const calculate = () => {
    if (cfm === '' || velocity === '') return alert('Enter all fields')

    const c = Number(cfm)
    const v = Number(velocity)
    const area = c / v // ft²

    let dims: any = {}

    if (shape === 'round') {
      const diameter = Math.sqrt((4 * area) / Math.PI) * 12
      dims = { diameter }
    } else {
      const width = Math.sqrt(area) * 12
      const height = width * 0.75
      dims = { width, height }
    }

    const entry = {
      id: uuidv4(),
      type: 'duct-sizer',
      inputs: { cfm, velocity, shape },
      result: { area: area.toFixed(2), ...dims },
      synced: false,
      timestamp: new Date().toISOString(),
    }

    addEntry(entry)
    setResult(entry.result)
  }

  return (
    <div>
      <h2>Duct Sizer</h2>
      <input type="number" placeholder="CFM" value={cfm} onChange={(e) => setCfm(e.target.value === '' ? '' : +e.target.value)} />
      <input type="number" placeholder="Velocity (FPM)" value={velocity} onChange={(e) => setVelocity(e.target.value === '' ? '' : +e.target.value)} />
      <select value={shape} onChange={(e) => setShape(e.target.value as any)}>
        <option value="round">Round</option>
        <option value="rectangular">Rectangular</option>
      </select>
      <button onClick={calculate}>Calculate</button>
      {result && (
        <div>
          <p>Area: {result.area} ft²</p>
          {result.diameter && <p>Diameter: {result.diameter.toFixed(1)} in</p>}
          {result.width && <p>Width: {result.width.toFixed(1)} in</p>}
          {result.height && <p>Height: {result.height.toFixed(1)} in</p>}
        </div>
      )}
    </div>
  )
}
