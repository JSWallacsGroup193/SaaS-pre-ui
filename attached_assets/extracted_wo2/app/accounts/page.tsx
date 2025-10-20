"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AccountList } from "@/components/accounts/account-list"
import type { Account, AccountFilters, AccountStats } from "@/types/account"

// Mock data
const mockAccounts: Account[] = [
  {
    id: "1",
    name: "Johnson Residence",
    type: "residential",
    status: "active",
    phone: "(555) 123-4567",
    email: "john.johnson@email.com",
    address: "123 Main St, Springfield",
    serviceArea: "north",
    lastServiceDate: "2024-01-15",
    totalJobs: 12,
    totalRevenue: 4500,
    createdAt: "2023-01-10",
    contactName: "John Johnson",
  },
  {
    id: "2",
    name: "ABC Manufacturing Co.",
    type: "commercial",
    status: "active",
    phone: "(555) 234-5678",
    email: "facilities@abcmfg.com",
    address: "456 Industrial Blvd, Springfield",
    serviceArea: "south",
    lastServiceDate: "2024-01-20",
    totalJobs: 45,
    totalRevenue: 28000,
    createdAt: "2022-06-15",
    contactName: "Sarah Williams",
  },
  {
    id: "3",
    name: "Smith Family Home",
    type: "residential",
    status: "active",
    phone: "(555) 345-6789",
    email: "smith.family@email.com",
    address: "789 Oak Ave, Springfield",
    serviceArea: "east",
    lastServiceDate: "2024-01-10",
    totalJobs: 8,
    totalRevenue: 3200,
    createdAt: "2023-03-20",
    contactName: "Mike Smith",
  },
]

const mockStats: AccountStats = {
  totalAccounts: 156,
  activeAccounts: 142,
  revenueThisMonth: 45600,
  newThisMonth: 8,
}

export default function AccountsPage() {
  const router = useRouter()
  const [accounts] = useState<Account[]>(mockAccounts)
  const [stats] = useState<AccountStats>(mockStats)

  const handleFilterChange = (filters: AccountFilters) => {
    console.log("[v0] Filter changed:", filters)
    // Implement filtering logic here
  }

  const handleCreate = () => {
    router.push("/accounts/create")
  }

  const handleView = (id: string) => {
    router.push(`/accounts/${id}`)
  }

  const handleEdit = (id: string) => {
    router.push(`/accounts/${id}/edit`)
  }

  const handleDelete = (id: string) => {
    console.log("[v0] Delete account:", id)
    // Implement delete logic here
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
