import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useGasCalculatorStore } from '../store/gasCalculatorStore'

export default function CombustionAirCalculator() {
  const [volume, setVolume] = useState<number | ''>('')
  const [btus, setBtus] = useState<number | ''>('')
  const [openings, setOpenings] = useState<number | ''>('')
  const [status, setStatus] = useState<string | null>(null)
  const addEntry = useGasCalculatorStore((s) => s.addEntry)

  const calculate = () => {
    if (volume === '' || btus === '' || openings === '') return alert('Enter all fields')

    const airRequired = Number(btus) / 1000 * 50 // 50 cu ft per 1000 BTU
    const pass = Number(volume) >= airRequired && Number(openings) >= 2

    const entry = {
      id: uuidv4(),
      type: 'combustion-air',
      inputs: { volume, btus, openings },
      result: { required: airRequired.toFixed(0), status: pass ? 'PASS' : 'FAIL' },
      synced: false,
      timestamp: new Date().toISOString(),
    }

    addEntry(entry)
    setStatus(pass ? `✅ PASS (Requires ${airRequired.toFixed(0)} ft³)` : `❌ FAIL (Needs ${airRequired.toFixed(0)} ft³)`)
  }

  return (
    <div>
      <h2>Combustion Air Calculator</h2>
      <input type="number" placeholder="Room Volume (ft³)" value={volume} onChange={e => setVolume(e.target.value === '' ? '' : +e.target.value)} />
      <input type="number" placeholder="Total BTUs" value={btus} onChange={e => setBtus(e.target.value === '' ? '' : +e.target.value)} />
      <input type="number" placeholder="Openings to Adjacent Space" value={openings} onChange={e => setOpenings(e.target.value === '' ? '' : +e.target.value)} />
      <button onClick={calculate}>Evaluate</button>
      {status && <p>{status}</p>}
    </div>
  )
}
