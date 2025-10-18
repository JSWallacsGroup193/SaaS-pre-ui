import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSku } from '../api/client'

export default function SkuDetail() {
  const { id } = useParams<{ id: string }>();
  const [sku,setSku] = useState<any>(null)
  useEffect(()=>{ (async ()=>{ if(id){ setSku(await getSku(id)) } })() },[id])
  if (!sku) return <div>Loading...</div>
  return (
    <div>
      <h2>SKU Detail</h2>
      <div><strong>Name:</strong> {sku.name}</div>
      <div><strong>Barcode:</strong> {sku.barcode || '-'}</div>
      <div><strong>Description:</strong> {sku.description || '-'}</div>
      <div><strong>On Hand:</strong> {sku.onHand ?? 0}</div>
    </div>
  )
}
