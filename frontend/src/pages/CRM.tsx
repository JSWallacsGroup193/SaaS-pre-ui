
import { useEffect, useState } from 'react'
import { User, Mail, Phone } from 'lucide-react'
import api from '../utils/axiosClient'

export default function CRM() {
  const [items, setItems] = useState<any[]>([])
  
  useEffect(() => { 
    (async () => {
      const { data } = await api.get('/crm/contacts')
      setItems(data)
    })() 
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 p-3 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">CRM Contacts</h2>
      
      {/* Desktop Table View */}
      <div className="hidden md:block bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-700 text-left">
              <th className="p-3 border-b border-slate-600 text-gray-300">Name</th>
              <th className="p-3 border-b border-slate-600 text-gray-300">Email</th>
              <th className="p-3 border-b border-slate-600 text-gray-300">Phone</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={it.id || i} className="hover:bg-slate-700/50">
                <td className="p-3 border-b border-slate-700 text-white">{it.name ?? '-'}</td>
                <td className="p-3 border-b border-slate-700 text-gray-300">{it.email ?? '-'}</td>
                <td className="p-3 border-b border-slate-700 text-gray-300">{it.phone ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {items.length === 0 ? (
          <div className="bg-slate-800 rounded-lg p-6 text-center border border-slate-700">
            <User className="w-12 h-12 text-teal-500 mx-auto mb-3" />
            <p className="text-slate-400">No contacts found</p>
          </div>
        ) : (
          items.map((it, i) => (
            <div key={it.id || i} className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-teal-500" />
                <span className="font-semibold text-white">{it.name ?? '-'}</span>
              </div>
              {it.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a href={`mailto:${it.email}`} className="text-sm text-gray-300 hover:text-teal-400">
                    {it.email}
                  </a>
                </div>
              )}
              {it.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <a href={`tel:${it.phone}`} className="text-sm text-gray-300 hover:text-teal-400">
                    {it.phone}
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
