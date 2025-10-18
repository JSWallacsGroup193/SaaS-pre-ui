
import { useAuth } from '../store/useAuth'

export function TopBar() {
  const logout = useAuth(s => s.logout)
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px',background:'#fff',borderBottom:'1px solid #e5e7eb'}}>
      <div style={{fontWeight:700}}>HVAC Platform</div>
      <button onClick={logout} style={{border:'1px solid #e5e7eb',background:'#fff',padding:'8px 12px',borderRadius:6,cursor:'pointer'}}>Logout</button>
    </div>
  )
}
