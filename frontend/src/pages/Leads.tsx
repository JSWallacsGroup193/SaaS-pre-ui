import { useState } from "react"
import { LeadList } from "@/components/leads/lead-list"
import type { Lead, LeadStats, LeadStatus } from "@/types/view-models/lead"

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "John Anderson",
    company: "Anderson Manufacturing",
    email: "john@anderson.com",
    phone: "(555) 123-4567",
    status: "new",
    source: "website",
    priority: "hot",
    value: 15000,
    assignedTo: { id: "1", name: "John Smith" },
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    daysInStatus: 2,
  },
  {
    id: "2",
    name: "Sarah Williams",
    company: "Williams Retail",
    email: "sarah@williams.com",
    phone: "(555) 234-5678",
    status: "contacted",
    source: "referral",
    priority: "warm",
    value: 8500,
    assignedTo: { id: "2", name: "Sarah Johnson" },
    createdAt: "2024-01-14",
    updatedAt: "2024-01-16",
    daysInStatus: 3,
  },
  {
    id: "3",
    name: "Michael Chen",
    company: "Chen Tech Solutions",
    email: "michael@chentech.com",
    phone: "(555) 345-6789",
    status: "qualified",
    source: "phone",
    priority: "hot",
    value: 25000,
    assignedTo: { id: "1", name: "John Smith" },
    createdAt: "2024-01-10",
    updatedAt: "2024-01-17",
    daysInStatus: 5,
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    company: "Rodriguez Enterprises",
    email: "emily@rodriguez.com",
    phone: "(555) 456-7890",
    status: "proposal",
    source: "email",
    priority: "warm",
    value: 12000,
    assignedTo: { id: "3", name: "Mike Wilson" },
    createdAt: "2024-01-08",
    updatedAt: "2024-01-18",
    daysInStatus: 7,
  },
  {
    id: "5",
    name: "David Thompson",
    company: "Thompson Industries",
    email: "david@thompson.com",
    phone: "(555) 567-8901",
    status: "won",
    source: "social",
    priority: "hot",
    value: 35000,
    assignedTo: { id: "2", name: "Sarah Johnson" },
    createdAt: "2024-01-05",
    updatedAt: "2024-01-19",
    daysInStatus: 10,
  },
]

const mockStats: LeadStats = {
  total: 127,
  new: 23,
  qualified: 18,
  conversionRate: 32,
  conversionTrend: "up",
  revenuePipeline: 485000,
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus, daysInStatus: 0 } : lead)),
    )
  }

  return (
    <LeadList
      leads={leads}
      stats={mockStats}
      totalCount={mockStats.total}
      onFilterChange={() => {}}
      onCreate={() => console.log("Create lead")}
      onViewLead={(id) => console.log("View lead:", id)}
      onConvert={(id) => console.log("Convert lead:", id)}
      onMarkLost={(id) => console.log("Mark lost:", id)}
      onScheduleFollowup={(id) => console.log("Schedule followup:", id)}
      onStatusChange={handleStatusChange}
    />
  )
}
