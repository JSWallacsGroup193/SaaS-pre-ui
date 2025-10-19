
import { useState } from 'react'
import api from '../utils/axiosClient'
import { useAuth } from '../store/useAuth'

export default function Login() {
  const [email,setEmail] = useState('admin@demo.com')
  const [password,setPassword] = useState('password')
  const login = useAuth(s=>s.login)
  const [error,setError] = useState<string|undefined>()

  async function submit(e:any) {
    e.preventDefault()
    setError(undefined)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      login(data.access_token)
    } catch (err:any) {
      setError('Invalid credentials')
    }
  }

  return (
    <div style={{display:'grid',placeItems:'center',height:'100vh',background:'#f5f6f8'}}>
      <form onSubmit={submit} style={{background:'#fff',padding:24,borderRadius:8,boxShadow:'0 1px 3px rgba(0,0,0,.12)',minWidth:320}}>
        <h2 style={{marginTop:0}}>Sign in</h2>
        <label>Email</label>
        <input type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:'8px',margin:'6px 0 12px',border:'1px solid #e5e7eb',borderRadius:6}} />
        <label>Password</label>
        <input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:'8px',margin:'6px 0 12px',border:'1px solid #e5e7eb',borderRadius:6}} />
        {error && <div style={{color:'#b91c1c',marginBottom:8}}>{error}</div>}
        <button type="submit" style={{width:'100%',padding:'10px',border:'none',borderRadius:6,background:'#2563eb',color:'#fff',cursor:'pointer'}}>Login</button>
      </form>
    </div>
  )
}
