
import { useEffect, useState } from 'react'
import api from '../utils/axiosClient'

export default function Purchasing() {
  const [items,setItems] = useState<any[]>([])
  async function load() {
    const { data } = await api.get('/api/v1/purchasing')
    setItems(data)
  }
  useEffect(() => { load() }, [])

  async function receive(poId:string) {
    await api.put(`/api/v1/purchasing/${poId}/receive`)
    await load()
  }

  return (
    <div>
      <h2>Purchasing</h2>
      <div style={{background:'#fff',borderRadius:8,overflow:'hidden',border:'1px solid #e5e7eb'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'#f9fafb',textAlign:'left'}}>
              <th style={{padding:12,borderBottom:'1px solid #e5e7eb'}}>PO</th>
              <th style={{padding:12,borderBottom:'1px solid #e5e7eb'}}>Status</th>
              <th style={{padding:12,borderBottom:'1px solid #e5e7eb'}}>Items</th>
              <th style={{padding:12,borderBottom:'1px solid #e5e7eb'}}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((it:any) => (
              <tr key={it.id}>
                <td style={{padding:12,borderBottom:'1px solid #f3f4f6'}}>{it.id}</td>
                <td style={{padding:12,borderBottom:'1px solid #f3f4f6'}}>{it.status}</td>
                <td style={{padding:12,borderBottom:'1px solid #f3f4f6'}}>{it.items.map((i:any)=> `${i.sku.code}×${i.qty}`).join(', ')}</td>
                <td style={{padding:12,borderBottom:'1px solid #f3f4f6'}}>
                  {it.status !== 'Received' && (
                    <button onClick={()=>receive(it.id)} style={{padding:'6px 10px',border:'none',borderRadius:6,background:'#16a34a',color:'#fff',cursor:'pointer'}}>Mark Received</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
