export interface AccountDetail {
  id: string
  name: string
  type: 'residential' | 'commercial'
  status: 'active' | 'inactive' | 'suspended'
  phone: string
  email: string
  address: string
  serviceArea: string
  lastServiceDate: string
  totalJobs: number
  totalRevenue: number
  createdAt: string
  contactName: string
  notes?: string
  primaryContact: {
    id: string
    name: string
    role: string
    phone: string
    email: string
    isPrimary: boolean
  }
  accountSince: string
  tags: string[]
  serviceAgreement?: {
    id: string
    planName: string
    status: 'active' | 'expired' | 'cancelled'
    nextServiceDate: string
  }
  assignedTeam: {
    primaryTechnician: {
      id: string
      name: string
    }
    accountManager: {
      id: string
      name: string
    }
  }
  equipmentCount: number
  outstandingBalance: number
}

export interface AccountContact {
  id: string
  name: string
  role: string
  phone: string
  email: string
  isPrimary: boolean
}

export interface AccountInvoice {
  id: string
  invoiceNumber: string
  date: string
  dueDate: string
  amount: number
  status: 'paid' | 'pending' | 'overdue' | 'cancelled'
  description: string
}

export interface AccountEquipment {
  id: string
  type: string
  brand: string
  model: string
  serialNumber: string
  installDate: string
  warrantyExpiry?: string
  location: string
  status: 'operational' | 'needs-service' | 'retired'
  lastServiceDate?: string
}

export interface AccountNote {
  id: string
  text: string
  author: {
    name: string
    avatar?: string
  }
  timestamp: string
  isPinned?: boolean
}

export interface AccountActivity {
  id: string
  type: 'work_order' | 'invoice' | 'note' | 'equipment' | 'contact' | 'status_change'
  description: string
  user: string
  timestamp: string
  metadata?: Record<string, any>
}
