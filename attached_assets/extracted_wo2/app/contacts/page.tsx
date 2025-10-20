"use client"

import { ContactList } from "@/components/contacts/contact-list"
import type { Contact } from "@/types/contact"

// Mock data
const mockContacts: Contact[] = [
  {
    id: "1",
    name: "John Smith",
    accountId: "1",
    accountName: "Smith Residence",
    role: "owner",
    phone: "(555) 123-4567",
    email: "john.smith@email.com",
    avatar: "/man.jpg",
    isPrimary: true,
    lastContact: "2024-01-15",
    createdAt: "2023-06-01",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    accountId: "2",
    accountName: "Downtown Office Complex",
    role: "manager",
    phone: "(555) 234-5678",
    email: "sarah.j@company.com",
    avatar: "/diverse-woman-portrait.png",
    isPrimary: true,
    lastContact: "2024-01-14",
    createdAt: "2023-08-15",
  },
  {
    id: "3",
    name: "Michael Brown",
    accountId: "3",
    accountName: "Riverside Apartments",
    role: "tenant",
    phone: "(555) 345-6789",
    email: "mbrown@email.com",
    isPrimary: false,
    lastContact: "2024-01-10",
    createdAt: "2024-01-05",
  },
  {
    id: "4",
    name: "Emily Davis",
    accountId: "1",
    accountName: "Smith Residence",
    role: "other",
    phone: "(555) 456-7890",
    email: "emily.d@email.com",
    isPrimary: false,
    lastContact: "2024-01-12",
    createdAt: "2023-09-20",
  },
  {
    id: "5",
    name: "Robert Wilson",
    accountId: "4",
    accountName: "Tech Startup HQ",
    role: "owner",
    phone: "(555) 567-8901",
    email: "robert.w@techstartup.com",
    avatar: "/diverse-businessman.png",
    isPrimary: true,
    lastContact: "2024-01-13",
    createdAt: "2023-07-10",
  },
]

const mockAccounts = [
  { id: "1", name: "Smith Residence" },
  { id: "2", name: "Downtown Office Complex" },
  { id: "3", name: "Riverside Apartments" },
  { id: "4", name: "Tech Startup HQ" },
]

export default function ContactsPage() {
  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters)
  }

  const handleCreate = () => {
    console.log("Create contact")
  }

  const handleView = (id: string) => {
    console.log("View contact:", id)
  }

  const handleEdit = (id: string) => {
    console.log("Edit contact:", id)
  }

  const handleDelete = (id: string) => {
    console.log("Delete contact:", id)
  }

  return (
    <ContactList
      contacts={mockContacts}
      totalCount={mockContacts.length}
      onFilterChange={handleFilterChange}
      onCreate={handleCreate}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
      accounts={mockAccounts}
    />
  )
}
