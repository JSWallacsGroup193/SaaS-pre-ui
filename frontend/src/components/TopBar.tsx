import { useAuth } from '../store/useAuth'
import { LogOut } from 'lucide-react'

export function TopBar() {
  const logout = useAuth(s => s.logout)
  
  return (
    <div className="flex items-center justify-between px-6 bg-slate-900 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-teal-500 rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-sm">ON</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-100">OpsNex</h1>
          <p className="text-xs text-slate-400">HVAC Management</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={logout} 
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 rounded-md transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}
