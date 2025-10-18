import { useEffect, useState } from 'react'
import { listSkusPaginated } from '../api/client'

export default function Inventory() {
  const [q,setQ] = useState('')
  const [page,setPage] = useState(1)
  const [pageSize] = useState(50)
  const [items,setItems] = useState<any[]>([])
  const [total,setTotal] = useState(0)

  useEffect(() => { 
    (async () => {
      const data = await listSkusPaginated(q, page, pageSize)
      setItems(data.items)
      setTotal(data.total)
    })() 
  }, [q, page])

  return (
    <div>
      <h2>Inventory</h2>
      <input placeholder="Search" value={q} onChange={e=>{ setPage(1); setQ(e.target.value) }} />
      <div>Showing {items.length} of {total}</div>
      <ul>{items.map(i=> <li key={i.id}>{i.name} {i.barcode ? `(${i.barcode})` : ''} — onHand: {typeof (i as any).onHand === 'number' ? (i as any).onHand : 0}</li>)}</ul>
      <div>
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <button disabled={(page*pageSize)>=total} onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  )
}
