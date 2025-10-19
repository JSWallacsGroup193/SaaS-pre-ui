export default function CombustionReferenceTool() {
  const ranges = [
    { gas: 'Natural Gas', o2: '3–6%', co2: '8–10%', co: '<100 ppm', flue: '275–350°F' },
    { gas: 'Propane', o2: '4–9%', co2: '6–8%', co: '<50 ppm', flue: '325–400°F' },
  ]

  return (
    <div>
      <h2>Combustion Reference Ranges</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>Fuel</th><th>O₂</th><th>CO₂</th><th>CO (ppm)</th><th>Flue Temp</th></tr>
        </thead>
        <tbody>
          {ranges.map((r, i) => (
            <tr key={i}>
              <td>{r.gas}</td>
              <td>{r.o2}</td>
              <td>{r.co2}</td>
              <td>{r.co}</td>
              <td>{r.flue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
