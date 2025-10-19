
import { useState } from 'react'
import api from '../utils/axiosClient'

type Msg = { role: 'user'|'assistant', content: string }

export default function AI() {
  const [msgs,setMsgs] = useState<Msg[]>([{ role:'assistant', content:'Ask about inventory, purchasing, or jobs.' }])
  const [text,setText] = useState('Show low-stock items')

  async function send() {
    const prompt = text.trim()
    if (!prompt) return
    setMsgs(m => [...m, { role:'user', content: prompt }])
    setText('')
    const { data } = await api.post('/ai/chat', { prompt })
    setMsgs(m => [...m, { role:'assistant', content: data.reply }])
  }

  return (
    <div style={{display:'grid',gridTemplateRows:'1fr auto',height:'calc(100vh - 56px - 24px)'}}>
      <div style={{overflow:'auto',background:'#fff',border:'1px solid #e5e7eb',borderRadius:8,padding:12}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{margin:'8px 0',textAlign: m.role==='user'?'right':'left'}}>
            <div style={{display:'inline-block',padding:'8px 12px',borderRadius:12,background:m.role==='user'?'#dbeafe':'#f3f4f6'}}>{m.content}</div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a prompt..." style={{flex:1,padding:10,border:'1px solid #e5e7eb',borderRadius:8}} />
        <button onClick={send} style={{padding:'10px 16px',border:'none',borderRadius:8,background:'#2563eb',color:'#fff',cursor:'pointer'}}>Send</button>
      </div>
    </div>
  )
}
