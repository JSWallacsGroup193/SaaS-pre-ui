
import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { useAuth } from './store/useAuth'
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const WorkOrders = lazy(() => import('./pages/WorkOrders'))
const CRM = lazy(() => import('./pages/CRM'))
const Inventory = lazy(() => import('./pages/Inventory'))
const Purchasing = lazy(() => import('./pages/Purchasing'))
const Dispatch = lazy(() => import('./pages/Dispatch'))
const Labels = lazy(() => import('./pages/Labels'))
const Forecast = lazy(() => import('./pages/Forecast'))
const Scanner = lazy(() => import('./pages/Scanner'))
const AI = lazy(() => import('./pages/AI'))
const FieldToolsPage = lazy(() => import('./pages/FieldTools/FieldToolsPage'))

export default function App() {
  const token = useAuth(s => s.token)
  if (!token) return <Login />

  return (
    <div style={{display:'grid',gridTemplateRows:'56px 1fr',height:'100vh'}}>
      <TopBar />
      <div style={{display:'grid',gridTemplateColumns:'240px 1fr'}}>
        <Sidebar />
        <div style={{padding:'16px',overflow:'auto'}}>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          }>
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
              <Route path="/field-tools" element={<FieldToolsPage />} />
              <Route path="/ai" element={<AI />} />
              <Route path="*" element={<Navigate to='/' />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
