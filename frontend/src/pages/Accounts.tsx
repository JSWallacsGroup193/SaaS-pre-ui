import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountList } from '@/components/accounts/account-list'
import type { Account, AccountFilters, AccountStats } from '@/types/view-models/account'

// Mock data
const mockAccountsData: Account[] = [
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
  const [filters, setFilters] = useState<AccountFilters>({
    search: '',
    accountType: 'both',
    status: 'all',
    serviceArea: '',
    sortBy: 'name',
  })

  // Filter and sort accounts based on current filters
  const filteredAndSortedAccounts = useMemo(() => {
    let result = [...mockAccountsData]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (account) =>
          account.name.toLowerCase().includes(searchLower) ||
          account.contactName.toLowerCase().includes(searchLower) ||
          account.phone.includes(filters.search) ||
          account.email.toLowerCase().includes(searchLower) ||
          account.address.toLowerCase().includes(searchLower)
      )
    }

    // Apply account type filter
    if (filters.accountType !== 'both') {
      result = result.filter((account) => account.type === filters.accountType)
    }

    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter((account) => account.status === filters.status)
    }

    // Apply service area filter
    if (filters.serviceArea) {
      result = result.filter((account) => account.serviceArea === filters.serviceArea)
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'lastService':
          if (!a.lastServiceDate) return 1
          if (!b.lastServiceDate) return -1
          return new Date(b.lastServiceDate).getTime() - new Date(a.lastServiceDate).getTime()
        case 'revenue':
          return b.totalRevenue - a.totalRevenue
        default:
          return 0
      }
    })

    return result
  }, [filters])

  const handleFilterChange = (newFilters: AccountFilters) => {
    setFilters(newFilters)
  }

  const handleCreate = () => {
    console.log('[Accounts] Create account')
    // TODO: Implement create account modal or navigate to create page
    // navigate('/accounts/create')
  }

  const handleView = (id: string) => {
    console.log('[Accounts] View account:', id)
    // TODO: Navigate to account detail page when implemented
    // navigate(`/accounts/${id}`)
  }

  const handleEdit = (id: string) => {
    console.log('[Accounts] Edit account:', id)
    // TODO: Navigate to account edit page when implemented
    // navigate(`/accounts/${id}/edit`)
  }

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete this account?`)) {
      console.log('[Accounts] Delete account:', id)
      // TODO: Implement actual delete logic with API call
    }
  }

  return (
    <AccountList
      accounts={filteredAndSortedAccounts}
      totalCount={mockAccountsData.length}
      stats={mockStats}
      onFilterChange={handleFilterChange}
      onCreate={handleCreate}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}
