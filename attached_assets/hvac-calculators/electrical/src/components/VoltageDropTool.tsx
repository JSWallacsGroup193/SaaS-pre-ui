import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useCalculatorStore } from '../store/calculatorStore'

const copperResistivity = 12.9

export default function VoltageDropTool() {
  const [voltage, setVoltage] = useState<number | ''>('')
  const [amps, setAmps] = useState<number | ''>('')
  const [distance, setDistance] = useState<number | ''>('')
  const [phase, setPhase] = useState<'1' | '3'>('1')
  const [result, setResult] = useState<any>(null)
  const addEntry = useCalculatorStore((s) => s.addEntry)

  const calculateDrop = () => {
    if ([voltage, amps, distance].includes('')) return alert('Enter all fields')
    const volt = Number(voltage)
    const amp = Number(amps)
    const dist = Number(distance)

    const multiplier = phase === '1' ? 2 : 1.732
    const vd = (2 * amp * dist * copperResistivity) / 1000
    const vdPct = (vd / volt) * 100

    const result = {
      vd: vd.toFixed(2),
      vdPct: vdPct.toFixed(2),
      wire: vdPct <= 3 ? '14 AWG or larger' : 'Upgrade wire size',
    }

    setResult(result)

    addEntry({
      id: uuidv4(),
      type: 'voltage-drop',
      inputs: { voltage: volt, amps: amp, distance: dist, phase },
      result,
      synced: false,
      timestamp: new Date().toISOString(),
    })
  }

  return (
    <div>
      <h2>Voltage Drop / Wire Size</h2>
      <input type="number" placeholder="Voltage" value={voltage} onChange={(e) => setVoltage(e.target.value === '' ? '' : +e.target.value)} />
      <input type="number" placeholder="Amps" value={amps} onChange={(e) => setAmps(e.target.value === '' ? '' : +e.target.value)} />
      <input type="number" placeholder="Distance (ft)" value={distance} onChange={(e) => setDistance(e.target.value === '' ? '' : +e.target.value)} />
      <select value={phase} onChange={(e) => setPhase(e.target.value as '1' | '3')}>
        <option value="1">Single Phase</option>
        <option value="3">Three Phase</option>
      </select>
      <button onClick={calculateDrop}>Calculate</button>
      {result && (
        <div>
          <p>Voltage Drop: {result.vd} V ({result.vdPct}%)</p>
          <p>Recommended: {result.wire}</p>
        </div>
      )}
    </div>
  )
}
