
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
            <div key={it.id || i} className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-teal-500" />
                <span className="font-semibold text-white">{it.name ?? '-'}</span>
              </div>
              
              {/* Touch-friendly email button */}
              {it.email && (
                <a 
                  href={`mailto:${it.email}`} 
                  className="flex items-center gap-3 w-full p-3 rounded-md bg-slate-700 hover:bg-slate-600 active:bg-slate-500 transition-colors min-h-[48px] border border-slate-600"
                >
                  <Mail className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-sm text-gray-100 break-all">{it.email}</span>
                </a>
              )}
              
              {/* Touch-friendly phone button */}
              {it.phone && (
                <a 
                  href={`tel:${it.phone}`} 
                  className="flex items-center gap-3 w-full p-3 rounded-md bg-slate-700 hover:bg-slate-600 active:bg-slate-500 transition-colors min-h-[48px] border border-slate-600"
                >
                  <Phone className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-sm text-gray-100">{it.phone}</span>
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
