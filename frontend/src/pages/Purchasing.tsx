
import { useEffect, useState } from 'react'
import api from '../utils/axiosClient'

export default function Purchasing() {
  const [items,setItems] = useState<any[]>([])
  async function load() {
    const { data } = await api.get('/purchasing')
    setItems(data.items || [])
  }
  useEffect(() => { load() }, [])

  async function receive(poId:string) {
    await api.put(`/purchasing/${poId}/receive`)
    await load()
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Purchasing</h2>
      <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-700 text-left">
              <th className="p-3 border-b border-slate-600 text-gray-300">PO</th>
              <th className="p-3 border-b border-slate-600 text-gray-300">Status</th>
              <th className="p-3 border-b border-slate-600 text-gray-300">Items</th>
              <th className="p-3 border-b border-slate-600 text-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((it:any) => (
              <tr key={it.id} className="hover:bg-slate-700/50">
                <td className="p-3 border-b border-slate-700 text-white">{it.poNumber || it.id}</td>
                <td className="p-3 border-b border-slate-700 text-gray-300">{it.status}</td>
                <td className="p-3 border-b border-slate-700 text-gray-300">{it.sku?.sku || it.sku?.name || '-'} × {it.quantity}</td>
                <td className="p-3 border-b border-slate-700">
                  {it.status !== 'RECEIVED' && (
                    <button 
                      onClick={()=>receive(it.id)} 
                      className="px-3 py-1.5 rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors cursor-pointer border-none"
                    >
                      Mark Received
                    </button>
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
