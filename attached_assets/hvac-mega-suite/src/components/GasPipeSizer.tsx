import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useGasCalculatorStore } from '../store/gasCalculatorStore'

const lookupMinPipeDiameter = (btus: number, length: number, pipeType: string) => {
  if (pipeType === 'black') {
    if (btus < 100000 && length < 40) return '1/2"'
    if (btus < 200000) return '3/4"'
    return '1"'
  } else if (pipeType === 'csst') {
    if (btus < 50000) return '3/8"'
    if (btus < 150000) return '1/2"'
    return '3/4"'
  }
  return '1"'
}

export default function GasPipeSizer() {
  const [btus, setBtus] = useState<number | ''>('')
  const [length, setLength] = useState<number | ''>('')
  const [pipeType, setPipeType] = useState('black')
  const [result, setResult] = useState<string | null>(null)
  const addEntry = useGasCalculatorStore((s) => s.addEntry)

  const calculate = () => {
    if (btus === '' || length === '') return alert('Enter all fields')
    const size = lookupMinPipeDiameter(Number(btus), Number(length), pipeType)

    const entry = {
      id: uuidv4(),
      type: 'gas-pipe-sizing',
      inputs: { btus, length, pipeType },
      result: { minSize: size },
      synced: false,
      timestamp: new Date().toISOString(),
    }

    addEntry(entry)
    setResult(size)
  }

  return (
    <div>
      <h2>Gas Pipe Sizing Tool</h2>
      <input type="number" placeholder="BTUs" value={btus} onChange={e => setBtus(e.target.value === '' ? '' : +e.target.value)} />
      <input type="number" placeholder="Length (ft)" value={length} onChange={e => setLength(e.target.value === '' ? '' : +e.target.value)} />
      <select value={pipeType} onChange={e => setPipeType(e.target.value)}>
        <option value="black">Black Iron</option>
        <option value="csst">CSST</option>
      </select>
      <button onClick={calculate}>Calculate</button>
      {result && <p>Recommended Pipe Size: <strong>{result}</strong></p>}
    </div>
  )
}
