import { dashboardStats, lowStock } from '../api/client'
import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'

import { Card } from '../components/Card'

export default function Dashboard() {
  const [stats,setStats] = useState<any>({ jobs:0, techs:0, low:0 })
  useEffect(() => {
    (async () => {
      const data = await dashboardStats()
      setStats(data)
      setLow(await lowStock(5, 10))
    })()
  }, [])
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:16}}>
      <Card title="Active Jobs" value={stats.jobs} />
      <Card title="Technicians Online" value={stats.techs} />
      <Card title="Low Stock Items" value={stats.low} />
    </div>
  )
}
