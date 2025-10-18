import React, { useEffect, useState } from 'react'
import api from '../utils/axiosClient'

export default function Labels() {

const [code,setCode] = useState('COND-FAN-01')
const [desc,setDesc] = useState('Condenser Fan')
const [zpl,setZpl] = useState('')
async function generate() {
  const { data } = await api.get('/labels/zpl', { params: { code, desc } })
  setZpl(data.zpl)
}
useEffect(()=>{ generate() },[])
return (
  <div>
    <h2>Labels</h2>
    <div style={{display:'flex',gap:8,marginBottom:12}}>
      <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Code" style={{padding:8,border:'1px solid #e5e7eb',borderRadius:6}}/>
      <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" style={{padding:8,border:'1px solid #e5e7eb',borderRadius:6}}/>
      <button onClick={generate} style={{padding:'8px 12px',border:'none',borderRadius:6,background:'#2563eb',color:'#fff',cursor:'pointer'}}>Generate ZPL</button>
    </div>
    <textarea value={zpl} readOnly style={{width:'100%',height:220,border:'1px solid #e5e7eb',borderRadius:8,padding:8}} />
    <div style={{fontSize:12,color:'#6b7280',marginTop:8}}>Send this ZPL string to your Zebra printer endpoint.</div>
  </div>
)

}
