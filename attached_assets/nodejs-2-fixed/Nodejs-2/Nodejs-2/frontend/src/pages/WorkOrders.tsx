
import { useEffect, useState } from 'react'
import api from '../utils/axiosClient'

type WO = { id:string; title:string; status:string; technician?:string }

export default function WorkOrders() {
  const [items,setItems] = useState<WO[]>([])
  useEffect(() => { (async () => {
    const { data } = await api.get('/work-orders')
    setItems(data)
  })() }, [])

  return (
    <div>
      <h2>Work Orders</h2>
      <div style={{background:'#fff',borderRadius:8,overflow:'hidden',border:'1px solid #e5e7eb'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'#f9fafb',textAlign:'left'}}>
              <th style={{padding:12,borderBottom:'1px solid #e5e7eb'}}>Title</th>
              <th style={{padding:12,borderBottom:'1px solid #e5e7eb'}}>Status</th>
              <th style={{padding:12,borderBottom:'1px solid #e5e7eb'}}>Technician</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it.id}>
                <td style={{padding:12,borderBottom:'1px solid #f3f4f6'}}>{it.title}</td>
                <td style={{padding:12,borderBottom:'1px solid #f3f4f6'}}>{it.status}</td>
                <td style={{padding:12,borderBottom:'1px solid #f3f4f6'}}>{it.technician || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
