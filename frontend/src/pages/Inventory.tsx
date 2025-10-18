import { useEffect, useState } from 'react'
import api from '../utils/axiosClient'

type SKU = { id: string; name: string; description?: string; barcode?: string }

export default function Inventory() {
  const [items,setItems] = useState<SKU[]>([])
  const [total,setTotal] = useState(0)
  const [q,setQ] = useState('')
  const [page,setPage] = useState(1)
  const pageSize = 50

  useEffect(() => { 
    (async () => {
      const { data } = await api.get('/inventory/skus', { params: { q, page, pageSize } })
      setItems(data.items)
      setTotal(data.total)
    })() 
  }, [q, page])

  return (
    <div>
      <h2>Inventory</h2>
      <input placeholder="Search" value={q} onChange={e=>{ setPage(1); setQ(e.target.value) }} />
      <div>Showing {items.length} of {total}</div>
      <ul>{items.map(i=> <li key={i.id}>{i.name} {i.barcode ? `(${i.barcode})` : ''}</li>)}</ul>
      <div>
        <button disabled={page===1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <span> Page {page} </span>
        <button disabled={(page*pageSize) >= total} onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  )
}
