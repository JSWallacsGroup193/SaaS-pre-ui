
import { useEffect, useState } from 'react'
import api from '../utils/axiosClient'

export default function Inventory() {
  const [items,setItems] = useState<any[]>([])
  useEffect(() => { (async () => {
    const { data } = await api.get('/inventory/skus')
    setItems(data)
  })() }, [])
  return (
    <div>
      <h2>Inventory</h2>
      <div style={{background:'#fff',borderRadius:8,overflow:'hidden',border:'1px solid #e5e7eb'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'#f9fafb',textAlign:'left'}}>
              <th style={{padding:12,borderBottom:'1px solid #e5e7eb'}}>code</th><th style={{padding:12,borderBottom:'1px solid #e5e7eb'}}>description</th><th style={{padding:12,borderBottom:'1px solid #e5e7eb'}}>barcode</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it,i) => (
              <tr key={it.id || i}>
                <td style={{padding:12,borderBottom:'1px solid #f3f4f6'}}>{it.code ?? '-'}</td><td style={{padding:12,borderBottom:'1px solid #f3f4f6'}}>{it.description ?? '-'}</td><td style={{padding:12,borderBottom:'1px solid #f3f4f6'}}>{it.barcode ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
