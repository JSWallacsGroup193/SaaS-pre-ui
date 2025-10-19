
import { useState } from 'react'
import api from '../utils/axiosClient'

export default function Scanner() {
  const [code,setCode] = useState('123456789012')
  const [res,setRes] = useState<any>(null)

  async function scan() {
    const { data } = await api.get('/inventory/scan', { params: { barcode: code } })
    setRes(data)
  }

  return (
    <div>
      <h2>Barcode Scanner</h2>
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <input value={code} onChange={e=>setCode(e.target.value)} style={{padding:8,border:'1px solid #e5e7eb',borderRadius:6}} placeholder="Barcode or Code" />
        <button onClick={scan} style={{padding:'8px 12px',border:'none',borderRadius:6,background:'#2563eb',color:'#fff',cursor:'pointer'}}>Scan</button>
      </div>
      {res && (
        <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:8,padding:12}}>
          {res.found ? (
            <div>
              <div><b>Code:</b> {res.sku.code}</div>
              <div><b>Description:</b> {res.sku.description}</div>
              <div><b>Barcode:</b> {res.sku.barcode || '-'}</div>
            </div>
          ) : <div>Not found</div>}
        </div>
      )}
    </div>
  )
}
