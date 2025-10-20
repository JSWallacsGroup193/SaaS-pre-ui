import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountList } from '@/components/accounts/account-list'
import type { Account, AccountFilters, AccountStats } from '@/types/view-models/account'

// Mock data
const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Johnson Residence',
    type: 'residential',
    status: 'active',
    phone: '(555) 123-4567',
    email: 'john.johnson@email.com',
    address: '123 Main St, Springfield',
    serviceArea: 'north',
    lastServiceDate: '2024-01-15',
    totalJobs: 12,
    totalRevenue: 4500,
    createdAt: '2023-01-10',
    contactName: 'John Johnson',
  },
  {
    id: '2',
    name: 'ABC Manufacturing Co.',
    type: 'commercial',
    status: 'active',
    phone: '(555) 234-5678',
    email: 'facilities@abcmfg.com',
    address: '456 Industrial Blvd, Springfield',
    serviceArea: 'south',
    lastServiceDate: '2024-01-20',
    totalJobs: 45,
    totalRevenue: 28000,
    createdAt: '2022-06-15',
    contactName: 'Sarah Williams',
  },
  {
    id: '3',
    name: 'Smith Family Home',
    type: 'residential',
    status: 'active',
    phone: '(555) 345-6789',
    email: 'smith.family@email.com',
    address: '789 Oak Ave, Springfield',
    serviceArea: 'east',
    lastServiceDate: '2024-01-10',
    totalJobs: 8,
    totalRevenue: 3200,
    createdAt: '2023-03-20',
    contactName: 'Mike Smith',
  },
  {
    id: '4',
    name: 'Green Valley Apartments',
    type: 'commercial',
    status: 'active',
    phone: '(555) 456-7890',
    email: 'maintenance@greenvalley.com',
    address: '321 Valley Rd, Springfield',
    serviceArea: 'west',
    lastServiceDate: '2024-01-18',
    totalJobs: 67,
    totalRevenue: 52000,
    createdAt: '2021-11-05',
    contactName: 'Robert Chen',
  },
  {
    id: '5',
    name: 'Davis Residence',
    type: 'residential',
    status: 'inactive',
    phone: '(555) 567-8901',
    email: 'davis.home@email.com',
    address: '654 Pine St, Springfield',
    serviceArea: 'central',
    lastServiceDate: '2023-08-12',
    totalJobs: 5,
    totalRevenue: 1800,
    createdAt: '2022-02-14',
    contactName: 'Emily Davis',
  },
]

const mockStats: AccountStats = {
  totalAccounts: 156,
  activeAccounts: 142,
  revenueThisMonth: 45600,
  newThisMonth: 8,
}

export default function Accounts() {
  const navigate = useNavigate()
  const [accounts] = useState<Account[]>(mockAccounts)
  const [stats] = useState<AccountStats>(mockStats)

  const handleFilterChange = (filters: AccountFilters) => {
    console.log('[Accounts] Filter changed:', filters)
    // TODO: Implement filtering logic here
  }

  const handleCreate = () => {
    console.log('[Accounts] Create account - TODO: Implement')
    // navigate('/accounts/create')
  }

  const handleView = (id: string) => {
    console.log('[Accounts] View account:', id)
    // navigate(`/accounts/${id}`)
  }

  const handleEdit = (id: string) => {
    console.log('[Accounts] Edit account:', id)
    // navigate(`/accounts/${id}/edit`)
  }

  const handleDelete = (id: string) => {
    console.log('[Accounts] Delete account:', id)
    // TODO: Implement delete logic here
  }

  return (
    <AccountList
      accounts={accounts}
      totalCount={accounts.length}
      stats={stats}
      onFilterChange={handleFilterChange}
      onCreate={handleCreate}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}
