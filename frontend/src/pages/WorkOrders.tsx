import { useState } from 'react'
import { WorkOrderList } from '@/components/work-orders/work-order-list'
import type { FilterState, WorkOrderView } from '@/types/view-models/work-order'

// Mock data for demonstration
const mockWorkOrders: WorkOrderView[] = [
  {
    id: '1',
    woNumber: 'WO-2024-001',
    customer: {
      name: 'John Smith',
      address: '123 Main St, Springfield',
    },
    status: 'in-progress',
    technician: {
      id: 't1',
      name: 'Mike Johnson',
    },
    date: '2024-01-15',
    jobType: 'repair',
    priority: 'high',
    description: 'AC unit not cooling properly',
    createdAt: '2024-01-14',
  },
  {
    id: '2',
    woNumber: 'WO-2024-002',
    customer: {
      name: 'Sarah Williams',
      address: '456 Oak Ave, Springfield',
    },
    status: 'pending',
    technician: null,
    date: '2024-01-16',
    jobType: 'installation',
    priority: 'medium',
    description: 'New HVAC system installation',
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    woNumber: 'WO-2024-003',
    customer: {
      name: 'Robert Brown',
      address: '789 Pine Rd, Springfield',
    },
    status: 'completed',
    technician: {
      id: 't2',
      name: 'David Lee',
    },
    date: '2024-01-14',
    jobType: 'maintenance',
    priority: 'low',
    description: 'Routine maintenance check',
    createdAt: '2024-01-13',
  },
  {
    id: '4',
    woNumber: 'WO-2024-004',
    customer: {
      name: 'Emily Davis',
      address: '321 Elm St, Springfield',
    },
    status: 'in-progress',
    technician: {
      id: 't1',
      name: 'Mike Johnson',
    },
    date: '2024-01-15',
    jobType: 'inspection',
    priority: 'urgent',
    description: 'Emergency heating system failure',
    createdAt: '2024-01-15',
  },
  {
    id: '5',
    woNumber: 'WO-2024-005',
    customer: {
      name: 'Michael Chen',
      address: '555 Park Avenue, Springfield',
    },
    status: 'pending',
    technician: null,
    date: '2024-01-17',
    jobType: 'repair',
    priority: 'medium',
    description: 'Furnace making unusual noise',
    createdAt: '2024-01-15',
  },
]

export default function WorkOrders() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    dateRange: {
      from: null,
      to: null,
    },
    technicianIds: [],
    priority: 'all',
  })

  // Filter work orders based on current filters
  const filteredWorkOrders = mockWorkOrders.filter((wo) => {
    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase()
      const matchesSearch = 
        wo.woNumber.toLowerCase().includes(query) ||
        wo.customer.name.toLowerCase().includes(query) ||
        wo.customer.address.toLowerCase().includes(query) ||
        wo.description.toLowerCase().includes(query) ||
        wo.technician?.name.toLowerCase().includes(query)
      
      if (!matchesSearch) return false
    }

    // Status filter
    if (filters.status !== 'all' && wo.status !== filters.status) {
      return false
    }

    // Priority filter
    if (filters.priority !== 'all' && wo.priority !== filters.priority) {
      return false
    }

    // Technician filter
    if (filters.technicianIds.length > 0 && wo.technician) {
      if (!filters.technicianIds.includes(wo.technician.id)) {
        return false
      }
    }

    // Date range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      const woDate = new Date(wo.date)
      if (filters.dateRange.from && woDate < filters.dateRange.from) {
        return false
      }
      if (filters.dateRange.to && woDate > filters.dateRange.to) {
        return false
      }
    }

    return true
  })

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const handleCreate = () => {
    console.log('Create work order - TODO: Implement modal or navigate to create page')
  }

  const handleView = (id: string) => {
    console.log('View work order:', id)
  }

  const handleEdit = (id: string) => {
    console.log('Edit work order:', id)
  }

  const handleDelete = (id: string) => {
    console.log('Delete work order:', id)
  }

  return (
    <WorkOrderList
      workOrders={filteredWorkOrders}
      totalCount={mockWorkOrders.length}
      filters={filters}
      onFilterChange={handleFilterChange}
      onCreate={handleCreate}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}
