export type AccountType = "residential" | "commercial"
export type AccountStatus = "active" | "inactive"

export interface Account {
  id: string
  name: string
  type: AccountType
  status: AccountStatus
  phone: string
  email: string
  address: string
  serviceArea: string
  lastServiceDate: string | null
  totalJobs: number
  totalRevenue: number
  createdAt: string
  contactName: string
  notes?: string
}

export interface AccountFilters {
  search: string
  accountType: "residential" | "commercial" | "both"
  status: "active" | "inactive" | "all"
  serviceArea: string
  sortBy: "name" | "lastService" | "revenue"
}

export interface AccountStats {
  totalAccounts: number
  activeAccounts: number
  revenueThisMonth: number
  newThisMonth: number
}

export interface AccountContact {
  id: string
  name: string
  role: string
  phone: string
  email: string
  isPrimary: boolean
  avatar?: string
}

export interface AccountInvoice {
  id: string
  invoiceNumber: string
  date: string
  amount: number
  status: "paid" | "pending" | "overdue"
  dueDate?: string
}

export interface AccountEquipment {
  id: string
  type: string
  model: string
  serialNumber: string
  installDate: string
  lastServiceDate: string
  nextServiceDate?: string
  isDueSoon?: boolean
}

export interface AccountNote {
  id: string
  author: string
  authorAvatar?: string
  timestamp: string
  content: string
  isPinned: boolean
  attachments?: string[]
}

export interface AccountActivity {
  id: string
  type: "work_order" | "invoice" | "contact" | "note" | "equipment" | "payment"
  description: string
  timestamp: string
  icon?: string
}

export interface ServiceAgreement {
  id: string
  planName: string
  status: "active" | "expired"
  nextServiceDate: string
}

export interface AssignedTeam {
  primaryTechnician: {
    id: string
    name: string
    avatar?: string
  }
  accountManager?: {
    id: string
    name: string
    avatar?: string
  }
}

export interface AccountDetail extends Account {
  primaryContact: AccountContact
  accountSince: string
  tags: string[]
  serviceAgreement?: ServiceAgreement
  assignedTeam: AssignedTeam
  equipmentCount: number
  outstandingBalance: number
}
