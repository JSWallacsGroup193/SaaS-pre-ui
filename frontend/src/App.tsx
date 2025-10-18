
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import WorkOrders from './pages/WorkOrders'
import CRM from './pages/CRM'
import Inventory from './pages/Inventory'
import Purchasing from './pages/Purchasing'
import Dispatch from './pages/Dispatch'
import Labels from './pages/Labels'
import Forecast from './pages/Forecast'
import Scanner from './pages/Scanner'
import AI from './pages/AI'
import { useAuth } from './store/useAuth'
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'

export default function App() {
  const token = useAuth(s => s.token)
  if (!token) return <Login />

  return (
    <div style={{display:'grid',gridTemplateRows:'56px 1fr',height:'100vh'}}>
      <TopBar />
      <div style={{display:'grid',gridTemplateColumns:'240px 1fr'}}>
        <Sidebar />
        <div style={{padding:'16px',overflow:'auto'}}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/work-orders" element={<WorkOrders />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/purchasing" element={<Purchasing />} />
            <Route path="/dispatch" element={<Dispatch />} />
            <Route path="/labels" element={<Labels />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/ai" element={<AI />} />
            <Route path="*" element={<Navigate to='/' />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
