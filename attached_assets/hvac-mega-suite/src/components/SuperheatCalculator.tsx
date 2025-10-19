import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useCalculatorStore } from '../store/calculatorStore'

type Refrigerant = 'R-22' | 'R-410A'

const saturationTempMap: Record<Refrigerant, (psig: number) => number> = {
  'R-22': (psig) => 0.9 * psig - 10,
  'R-410A': (psig) => 0.5 * psig + 5,
}

export default function SuperheatCalculator() {
  const [suctionTemp, setSuctionTemp] = useState<number | ''>('')
  const [suctionPressure, setSuctionPressure] = useState<number | ''>('')
  const [refrigerant, setRefrigerant] = useState<Refrigerant>('R-22')
  const [targetSH, setTargetSH] = useState<number>(10)
  const [result, setResult] = useState<any>(null)

  const addEntry = useCalculatorStore((s) => s.addEntry)

  const calculate = () => {
    if (suctionTemp === '' || suctionPressure === '') return alert('Enter all fields')
    const psig = Number(suctionPressure)
    const temp = Number(suctionTemp)

    const satTemp = saturationTempMap[refrigerant](psig)
    const actualSH = temp - satTemp
    const delta = Math.abs(actualSH - targetSH)
    const status =
      delta <= 5 ? '✅ Normal' : actualSH > targetSH ? '⚠️ Overcharged' : '⚠️ Undercharged'

    const entry = {
      id: uuidv4(),
      type: 'superheat',
      inputs: { suctionTemp, suctionPressure, refrigerant, targetSH },
      result: { actualSH, satTemp, status },
      synced: false,
      timestamp: new Date().toISOString(),
    }

    addEntry(entry)
    setResult(entry.result)
  }

  return (
    <div>
      <h2>Superheat Calculator</h2>
      <input type="number" placeholder="Suction Temp (°F)" value={suctionTemp} onChange={(e) => setSuctionTemp(e.target.value === '' ? '' : +e.target.value)} />
      <input type="number" placeholder="Suction Pressure (psig)" value={suctionPressure} onChange={(e) => setSuctionPressure(e.target.value === '' ? '' : +e.target.value)} />
      <select value={refrigerant} onChange={(e) => setRefrigerant(e.target.value as Refrigerant)}>
        <option value="R-22">R-22</option>
        <option value="R-410A">R-410A</option>
      </select>
      <input type="number" placeholder="Target SH (°F)" value={targetSH} onChange={(e) => setTargetSH(+e.target.value)} />
      <button onClick={calculate}>Calculate</button>
      {result && (
        <div>
          <p>Saturation Temp: {result.satTemp.toFixed(1)}°F</p>
          <p>Actual Superheat: {result.actualSH.toFixed(1)}°F</p>
          <p>Status: {result.status}</p>
        </div>
      )}
    </div>
  )
}
