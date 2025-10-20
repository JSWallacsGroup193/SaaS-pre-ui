import { useState, useMemo } from 'react'
import { ContactList } from '@/components/contacts/contact-list'
import type { Contact, ContactFilters } from '@/types/view-models/contact'

// Mock accounts data for filtering
const mockAccounts = [
  { id: '1', name: 'Johnson Residence' },
  { id: '2', name: 'ABC Manufacturing Co.' },
  { id: '3', name: 'Smith Family Home' },
  { id: '4', name: 'Green Valley Apartments' },
  { id: '5', name: 'Davis Residence' },
]

// Mock contacts data
const mockContactsData: Contact[] = [
  {
    id: '1',
    name: 'John Johnson',
    accountId: '1',
    accountName: 'Johnson Residence',
    role: 'owner',
    phone: '(555) 123-4567',
    email: 'john.johnson@email.com',
    avatar: undefined,
    isPrimary: true,
    lastContact: '2024-01-15',
    createdAt: '2023-01-10',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    accountId: '2',
    accountName: 'ABC Manufacturing Co.',
    role: 'manager',
    phone: '(555) 234-5678',
    email: 'sarah.williams@abcmfg.com',
    avatar: undefined,
    isPrimary: true,
    lastContact: '2024-01-20',
    createdAt: '2022-06-15',
  },
  {
    id: '3',
    name: 'Mike Smith',
    accountId: '3',
    accountName: 'Smith Family Home',
    role: 'owner',
    phone: '(555) 345-6789',
    email: 'mike.smith@email.com',
    avatar: undefined,
    isPrimary: true,
    lastContact: '2024-01-10',
    createdAt: '2023-03-20',
  },
  {
    id: '4',
    name: 'Robert Chen',
    accountId: '4',
    accountName: 'Green Valley Apartments',
    role: 'manager',
    phone: '(555) 456-7890',
    email: 'robert.chen@greenvalley.com',
    avatar: undefined,
    isPrimary: true,
    lastContact: '2024-01-18',
    createdAt: '2021-11-05',
  },
  {
    id: '5',
    name: 'Emily Davis',
    accountId: '5',
    accountName: 'Davis Residence',
    role: 'owner',
    phone: '(555) 567-8901',
    email: 'emily.davis@email.com',
    avatar: undefined,
    isPrimary: false,
    lastContact: '2023-08-12',
    createdAt: '2022-02-14',
  },
  {
    id: '6',
    name: 'Tom Baker',
    accountId: '2',
    accountName: 'ABC Manufacturing Co.',
    role: 'tenant',
    phone: '(555) 678-9012',
    email: 'tom.baker@abcmfg.com',
    avatar: undefined,
    isPrimary: false,
    lastContact: '2024-01-12',
    createdAt: '2023-08-22',
  },
  {
    id: '7',
    name: 'Lisa Anderson',
    accountId: '4',
    accountName: 'Green Valley Apartments',
    role: 'tenant',
    phone: '(555) 789-0123',
    email: 'lisa.anderson@greenvalley.com',
    avatar: undefined,
    isPrimary: false,
    lastContact: '2024-01-14',
    createdAt: '2023-12-01',
  },
]

export default function Contacts() {
  const [filters, setFilters] = useState<ContactFilters>({
    search: '',
    accountIds: [],
    role: 'all',
    sortBy: 'name',
  })

  // Filter and sort contacts based on current filters
  const filteredAndSortedContacts = useMemo(() => {
    let result = [...mockContactsData]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchLower) ||
          contact.accountName.toLowerCase().includes(searchLower) ||
          contact.phone.includes(filters.search) ||
          contact.email.toLowerCase().includes(searchLower)
      )
    }

    // Apply account filter
    if (filters.accountIds.length > 0) {
      result = result.filter((contact) => filters.accountIds.includes(contact.accountId))
    }

    // Apply role filter
    if (filters.role !== 'all') {
      result = result.filter((contact) => contact.role === filters.role)
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'account':
          return a.accountName.localeCompare(b.accountName)
        case 'lastContact':
          return new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime()
        default:
          return 0
      }
    })

    return result
  }, [filters])

  const handleFilterChange = (newFilters: ContactFilters) => {
    setFilters(newFilters)
  }

  const handleCreate = () => {
    console.log('[Contacts] Create contact')
    // TODO: Implement create contact modal or navigate to create page
    // navigate('/contacts/create')
  }

  const handleView = (id: string) => {
    console.log('[Contacts] View contact:', id)
    // TODO: Navigate to contact detail page when implemented
    // navigate(`/contacts/${id}`)
  }

  const handleEdit = (id: string) => {
    console.log('[Contacts] Edit contact:', id)
    // TODO: Navigate to contact edit page when implemented
    // navigate(`/contacts/${id}/edit`)
  }

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete this contact?`)) {
      console.log('[Contacts] Delete contact:', id)
      // TODO: Implement actual delete logic with API call
    }
  }

  return (
    <ContactList
      contacts={filteredAndSortedContacts}
      totalCount={mockContactsData.length}
      onFilterChange={handleFilterChange}
      onCreate={handleCreate}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
      accounts={mockAccounts}
    />
  )
}
