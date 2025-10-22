
import { useEffect, useState } from 'react'
import api from '../utils/axiosClient'

export default function CRM() {
  const [items,setItems] = useState<any[]>([])
  useEffect(() => { (async () => {
    const { data } = await api.get('/crm/contacts')
    setItems(data)
  })() }, [])
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">CRM</h2>
      <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-700 text-left">
              <th className="p-3 border-b border-slate-600 text-gray-300">Name</th>
              <th className="p-3 border-b border-slate-600 text-gray-300">Email</th>
              <th className="p-3 border-b border-slate-600 text-gray-300">Phone</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it,i) => (
              <tr key={it.id || i} className="hover:bg-slate-700/50">
                <td className="p-3 border-b border-slate-700 text-white">{it.name ?? '-'}</td>
                <td className="p-3 border-b border-slate-700 text-gray-300">{it.email ?? '-'}</td>
                <td className="p-3 border-b border-slate-700 text-gray-300">{it.phone ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
