import { useEffect, useState } from 'react'
import { listSkus } from '../api/client'
import api from '../utils/axiosClient'

export default function Forecast() {

const [skus,setSkus] = useState<any[]>([])
const [selected,setSelected] = useState<string>('')
const [res,setRes] = useState<any>(null)

useEffect(()=>{ (async()=>{
  const data = await listSkus(); setSkus(data); if (data[0]) setSelected(data[0].id)
})() }, [])

async function run() {
  if (!selected) return
  const { data } = await api.get(`/forecast/sku/${selected}`, { params: { lead: 7, safety: 1.3 } })
  setRes(data)
}

return (
  <div>
    <h2>Forecasting</h2>
    <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:12}}>
      <select value={selected} onChange={e=>setSelected(e.target.value)} style={{padding:8,border:'1px solid #e5e7eb',borderRadius:6}}>
        {skus.map(s => <option key={s.id} value={s.id}>{s.code} — {s.description}</option>)}
      </select>
      <button onClick={run} style={{padding:'8px 12px',border:'none',borderRadius:6,background:'#2563eb',color:'#fff',cursor:'pointer'}}>Calculate</button>
    </div>
    {res && (
      <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:8,padding:12}}>
        <div>Average Daily Demand: {res.avgDaily.toFixed(2)}</div>
        <div>Lead Time (days): {res.leadTime}</div>
        <div>Safety Factor: {res.safetyFactor}</div>
        <div style={{fontWeight:700}}>Reorder Point: {res.reorderPoint}</div>
      </div>
    )}
  </div>
)

}
