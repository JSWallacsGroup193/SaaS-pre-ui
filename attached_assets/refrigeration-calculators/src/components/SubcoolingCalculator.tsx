import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useCalculatorStore } from '../store/calculatorStore'

type Refrigerant = 'R-22' | 'R-410A'

const saturationTempMap: Record<Refrigerant, (psig: number) => number> = {
  'R-22': (psig) => 0.9 * psig - 10,
  'R-410A': (psig) => 0.5 * psig + 5,
}

export default function SubcoolingCalculator() {
  const [liquidTemp, setLiquidTemp] = useState<number | ''>('')
  const [liquidPressure, setLiquidPressure] = useState<number | ''>('')
  const [refrigerant, setRefrigerant] = useState<Refrigerant>('R-410A')
  const [result, setResult] = useState<any>(null)
  const addEntry = useCalculatorStore((s) => s.addEntry)

  const calculate = () => {
    if (liquidTemp === '' || liquidPressure === '') return alert('Enter all fields')

    const psig = Number(liquidPressure)
    const temp = Number(liquidTemp)
    const satTemp = saturationTempMap[refrigerant](psig)
    const subcool = satTemp - temp
    const status =
      subcool >= 8 && subcool <= 12 ? '✅ Normal' : '⚠️ Out of range (8–12°F typical)'

    const entry = {
      id: uuidv4(),
      type: 'subcooling',
      inputs: { liquidTemp, liquidPressure, refrigerant },
      result: { subcool, satTemp, status },
      synced: false,
      timestamp: new Date().toISOString(),
    }

    addEntry(entry)
    setResult(entry.result)
  }

  return (
    <div>
      <h2>Subcooling Calculator</h2>
      <input type="number" placeholder="Liquid Line Temp (°F)" value={liquidTemp} onChange={(e) => setLiquidTemp(e.target.value === '' ? '' : +e.target.value)} />
      <input type="number" placeholder="Liquid Pressure (psig)" value={liquidPressure} onChange={(e) => setLiquidPressure(e.target.value === '' ? '' : +e.target.value)} />
      <select value={refrigerant} onChange={(e) => setRefrigerant(e.target.value as Refrigerant)}>
        <option value="R-22">R-22</option>
        <option value="R-410A">R-410A</option>
      </select>
      <button onClick={calculate}>Calculate</button>
      {result && (
        <div>
          <p>Saturation Temp: {result.satTemp.toFixed(1)}°F</p>
          <p>Subcooling: {result.subcool.toFixed(1)}°F</p>
          <p>Status: {result.status}</p>
        </div>
      )}
    </div>
  )
}
