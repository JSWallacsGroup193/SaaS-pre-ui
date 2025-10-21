import { Link, useLocation } from 'react-router-dom'
import { memo } from 'react'
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  Package, 
  ShoppingCart, 
  Calendar, 
  Tag, 
  TrendingUp, 
  Scan, 
  Wrench, 
  Bot 
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/work-orders', label: 'Work Orders', icon: ClipboardList },
  { to: '/crm', label: 'CRM', icon: Users },
  { to: '/inventory', label: 'Inventory', icon: Package },
  { to: '/purchasing', label: 'Purchasing', icon: ShoppingCart },
  { to: '/dispatch', label: 'Dispatch & Scheduling', icon: Calendar },
  { to: '/labels', label: 'Labels', icon: Tag },
  { to: '/forecast', label: 'Forecasting', icon: TrendingUp },
  { to: '/scanner', label: 'Barcode Scanner', icon: Scan },
  { to: '/field-tools', label: 'Field Tools', icon: Wrench },
  { to: '/ai', label: 'AI Assistant', icon: Bot },
]

const Item = memo(({ to, label, icon: Icon }: { to: string; label: string; icon: any }) => {
  const { pathname } = useLocation()
  const active = pathname === to
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${
        active 
          ? 'bg-slate-800 text-teal-400 border-l-2 border-teal-500 pl-2.5' 
          : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
})

export function Sidebar() {
  return (
    <aside className="h-full bg-slate-950 border-r border-slate-800 p-3">
      <div className="mb-6 px-3 py-2">
        <h1 className="text-xl font-bold text-teal-400">OpsNex</h1>
        <p className="text-xs text-slate-400 mt-1">HVAC Management</p>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map(item => (
          <Item key={item.to} to={item.to} label={item.label} icon={item.icon} />
        ))}
      </nav>
    </aside>
  )
}
