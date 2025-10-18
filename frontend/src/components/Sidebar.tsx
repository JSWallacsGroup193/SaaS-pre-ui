
import { Link, useLocation } from 'react-router-dom'

function Item({ to, label }: { to:string; label:string }) {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link to={to} style={{
      display:'block',padding:'10px 12px',borderRadius:6,
      background: active ? '#eef2ff' : 'transparent',
      color: active ? '#1e3a8a' : '#111827', textDecoration:'none'
    }}>{label}</Link>
  )
}

export function Sidebar() {
  return (
    <aside style={{padding:'12px',borderRight:'1px solid #e5e7eb',background:'#fff'}}>
      <nav style={{display:'grid',gap:6}}>
        <Item to="/" label="Dashboard" />
        <Item to="/work-orders" label="Work Orders" />
        <Item to="/crm" label="CRM" />
        <Item to="/inventory" label="Inventory" />
        <Item to="/purchasing" label="Purchasing" />
        <Item to="/dispatch" label="Dispatch & Scheduling" />
        <Item to="/labels" label="Labels" />
        <Item to="/forecast" label="Forecasting" />
        <Item to="/scanner" label="Barcode Scanner" />
        <Item to="/ai" label="AI Assistant" />
      </nav>
    </aside>
  )
}
