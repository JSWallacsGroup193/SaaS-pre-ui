import { useState } from 'react'

const modules = [
  { id: 'electrical', label: 'Electrical Tools', url: '/electrical' },
  { id: 'refrigeration', label: 'Refrigeration Tools', url: '/refrigeration' },
  { id: 'airflow', label: 'Airflow Tools', url: '/airflow' },
]

export default function HVACDashboard() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>HVAC Field Tools</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        {modules.map(mod => (
          <a
            key={mod.id}
            href={mod.url}
            style={{
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#333',
              fontWeight: 'bold',
              background: '#f0f0f0'
            }}
          >
            {mod.label}
          </a>
        ))}
      </div>
    </div>
  )
}
