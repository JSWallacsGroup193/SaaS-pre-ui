import { useEffect, useState } from 'react'
import api from '../utils/axiosClient'

export default function Dispatch() {

const [techs,setTechs] = useState<any[]>([])
const [jobs,setJobs] = useState<any[]>([])
useEffect(() => { (async () => {
  const t = await api.get('/scheduling/technicians')
  const j = await api.get('/scheduling/jobs')
  setTechs(t.data); setJobs(j.data)
})() }, [])
return (
  <div>
    <h2>Dispatch & Scheduling</h2>
    <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:16}}>
      <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:8}}>
        <div style={{padding:12,borderBottom:'1px solid #e5e7eb',fontWeight:600}}>Technicians</div>
        <ul style={{listStyle:'none',margin:0,padding:12}}>
          {techs.map(t => <li key={t.id} style={{padding:'8px 0'}}>{t.name} · {t.status}</li>)}
        </ul>
      </div>
      <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:8}}>
        <div style={{padding:12,borderBottom:'1px solid #e5e7eb',fontWeight:600}}>Jobs</div>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr style={{background:'#f9fafb'}}>
            <th style={{padding:10,textAlign:'left'}}>Title</th>
            <th style={{padding:10,textAlign:'left'}}>Technician</th>
            <th style={{padding:10,textAlign:'left'}}>Start</th>
            <th style={{padding:10,textAlign:'left'}}>Status</th>
          </tr></thead>
          <tbody>
            {jobs.map(j => (
              <tr key={j.id}>
                <td style={{padding:10,borderTop:'1px solid #f3f4f6'}}>{j.title}</td>
                <td style={{padding:10,borderTop:'1px solid #f3f4f6'}}>{j.technician?.name || '-'}</td>
                <td style={{padding:10,borderTop:'1px solid #f3f4f6'}}>{new Date(j.start).toLocaleString()}</td>
                <td style={{padding:10,borderTop:'1px solid #f3f4f6'}}>{j.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

}
