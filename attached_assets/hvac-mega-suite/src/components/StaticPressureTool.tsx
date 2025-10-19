import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useCalculatorStore } from '../store/calculatorStore'

export default function StaticPressureTool() {
  const [supply, setSupply] = useState<number | ''>('')
  const [returnP, setReturnP] = useState<number | ''>('')
  const [result, setResult] = useState<number | null>(null)
  const addEntry = useCalculatorStore((s) => s.addEntry)

  const calculate = () => {
    if (supply === '' || returnP === '') return alert('Enter both pressure values')

    const totalESP = Number(supply) + Number(returnP)

    const entry = {
      id: uuidv4(),
      type: 'static-pressure',
      inputs: { supply, return: returnP },
      result: { totalESP },
      synced: false,
      timestamp: new Date().toISOString(),
    }

    addEntry(entry)
    setResult(totalESP)
  }

  return (
    <div>
      <h2>Static Pressure Tool</h2>
      <input type="number" placeholder="Supply Pressure (in. wc)" value={supply} onChange={(e) => setSupply(e.target.value === '' ? '' : +e.target.value)} />
      <input type="number" placeholder="Return Pressure (in. wc)" value={returnP} onChange={(e) => setReturnP(e.target.value === '' ? '' : +e.target.value)} />
      <button onClick={calculate}>Calculate</button>
      {result !== null && <p>Total External Static Pressure: {result.toFixed(3)} in. wc</p>}
    </div>
  )
}
