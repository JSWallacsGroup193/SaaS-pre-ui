import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function SkuDetail() {
  const { id } = useParams<{ id: string }>();
  const [sku, setSku] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSku = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`/api/v1/inventory/skus/${id}/onhand`);
        setSku(response.data);
      } catch (error) {
        console.error('Failed to fetch SKU:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSku();
  }, [id])

  if (loading) return <div className="p-6">Loading...</div>
  if (!sku) return <div className="p-6">SKU not found</div>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">SKU Detail</h2>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <strong className="text-gray-700">ID:</strong> 
          <span className="ml-2">{id}</span>
        </div>
        <div>
          <strong className="text-gray-700">On Hand:</strong> 
          <span className="ml-2">{sku.onHand ?? 0}</span>
        </div>
      </div>
    </div>
  )
}
