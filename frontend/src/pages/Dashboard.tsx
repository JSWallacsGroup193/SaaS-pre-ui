
import { useEffect, useState } from 'react'
import api from '../utils/axiosClient'
import { Card } from '../components/Card'

export default function Dashboard() {
  const [stats,setStats] = useState<any>({ jobs:0, techs:0, low:0 })
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/work-orders/stats')
      setStats(data)
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
