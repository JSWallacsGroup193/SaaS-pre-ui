import { crmListAccounts } from '../api/client'

import { useEffect, useState } from 'react'


export default function CRM() {
  const [items,setItems] = useState<any[]>([])
  useEffect(() => { (async () => {
    const data = await crmListAccounts()
    setItems(data)
  })() }, [])
  return (
    <div>
      <h2>CRM</h2>
      <div style={{background:'#fff',borderRadius:8,overflow:'hidden',border:'1px solid #e5e7eb'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'#f9fafb',textAlign:'left'}}>
              <th style={{padding:12,borderBottom:'1px solid #e5e7eb'}}>name</th><th style={{padding:12,borderBottom:'1px solid #e5e7eb'}}>email</th><th style={{padding:12,borderBottom:'1px solid #e5e7eb'}}>phone</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it,i) => (
              <tr key={it.id || i}>
                <td style={{padding:12,borderBottom:'1px solid #f3f4f6'}}>{it.name ?? '-'}</td><td style={{padding:12,borderBottom:'1px solid #f3f4f6'}}>{it.email ?? '-'}</td><td style={{padding:12,borderBottom:'1px solid #f3f4f6'}}>{it.phone ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
