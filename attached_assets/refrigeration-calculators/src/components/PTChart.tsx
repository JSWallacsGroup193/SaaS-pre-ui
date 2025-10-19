import { useState } from 'react'
import { refrigerantPTData } from '../utils/refrigerantPTData'

export default function PTChart() {
  const [refrigerant, setRefrigerant] = useState<'R-22' | 'R-410A'>('R-22')
  const [filter, setFilter] = useState('')

  const data = refrigerantPTData[refrigerant].filter(
    (entry) =>
      entry.temp.toString().includes(filter) ||
      entry.pressure.toString().includes(filter)
  )

  return (
    <div>
      <h2>Refrigerant PT Chart</h2>
      <select value={refrigerant} onChange={(e) => setRefrigerant(e.target.value as any)}>
        <option value="R-22">R-22</option>
        <option value="R-410A">R-410A</option>
      </select>
      <input
        placeholder="Filter Temp or Pressure"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div style={{ maxHeight: '300px', overflowY: 'scroll', marginTop: '1rem' }}>
        <table>
          <thead>
            <tr>
              <th>Temp (°F)</th>
              <th>Pressure (psig)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td>{row.temp}</td>
                <td>{row.pressure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
