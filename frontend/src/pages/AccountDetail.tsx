import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AccountDetailHeader } from '@/components/accounts/detail/account-detail-header'
import { AccountSidebar } from '@/components/accounts/detail/account-sidebar'
import { OverviewTab } from '@/components/accounts/detail/tabs/overview-tab'
import { ContactsTab } from '@/components/accounts/detail/tabs/contacts-tab'
import { WorkOrdersTab } from '@/components/accounts/detail/tabs/work-orders-tab'
import { InvoicesTab } from '@/components/accounts/detail/tabs/invoices-tab'
import { PropertiesTab } from '@/components/accounts/detail/tabs/properties-tab'
import { NotesTab } from '@/components/accounts/detail/tabs/notes-tab'
import { TimelineTab } from '@/components/accounts/detail/tabs/timeline-tab'
import type {
  AccountDetail,
  AccountContact,
  AccountInvoice,
  AccountNote,
  AccountActivity,
} from '@/types/view-models/account-detail'
import type { WorkOrder } from '@/types/view-models/work-order-detail'

const mockAccount: AccountDetail = {
  id: 'ACC-001',
  name: 'Johnson Residence',
  type: 'residential',
  status: 'active',
  phone: '(555) 123-4567',
  email: 'john.johnson@email.com',
  address: '123 Main Street, Springfield, IL 62701',
  serviceArea: 'Springfield',
  lastServiceDate: '2024-01-15',
  totalJobs: 24,
  totalRevenue: 18500,
  createdAt: '2022-03-15',
  contactName: 'John Johnson',
  notes: 'Preferred customer. Always requests same technician. Has two HVAC units.',
  primaryContact: {
    id: '1',
    name: 'John Johnson',
    role: 'Homeowner',
    phone: '(555) 123-4567',
    email: 'john.johnson@email.com',
    isPrimary: true,
  },
  accountSince: 'March 2022',
  tags: ['VIP', 'Maintenance Plan', 'Preferred Customer'],
  serviceAgreement: {
    id: 'SA-001',
    planName: 'Annual Maintenance Plan',
    status: 'active',
    nextServiceDate: '2024-06-15',
  },
  assignedTeam: {
    primaryTechnician: {
      id: '1',
      name: 'Mike Rodriguez',
    },
    accountManager: {
      id: '2',
      name: 'Sarah Chen',
    },
  },
  equipmentCount: 2,
  outstandingBalance: 0,
}

const mockContacts: AccountContact[] = [
  {
    id: '1',
    name: 'John Johnson',
    role: 'Homeowner',
    phone: '(555) 123-4567',
    email: 'john.johnson@email.com',
    isPrimary: true,
  },
  {
    id: '2',
    name: 'Mary Johnson',
    role: 'Spouse',
    phone: '(555) 123-4568',
    email: 'mary.johnson@email.com',
    isPrimary: false,
  },
]

const mockWorkOrders: WorkOrder[] = [
  {
    id: '1',
    workOrderNumber: 'WO-2024-001',
    customerName: 'Johnson Residence',
    address: '123 Main Street',
    scheduledDate: '2024-01-15',
    status: 'completed',
    priority: 'medium',
    jobType: 'Maintenance',
    assignedTo: 'Mike Rodriguez',
    estimatedCost: 250,
    description: 'Annual HVAC maintenance',
  },
  {
    id: '2',
    workOrderNumber: 'WO-2024-045',
    customerName: 'Johnson Residence',
    address: '123 Main Street',
    scheduledDate: '2024-02-20',
    status: 'pending',
    priority: 'high',
    jobType: 'Repair',
    assignedTo: 'Mike Rodriguez',
    estimatedCost: 450,
    description: 'AC unit not cooling properly',
  },
]

const mockInvoices: AccountInvoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    amount: 250,
    status: 'paid',
    description: 'Annual HVAC Maintenance',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-045',
    date: '2024-02-20',
    dueDate: '2024-03-20',
    amount: 450,
    status: 'pending',
    description: 'AC Repair Service',
  },
]


const mockNotes: AccountNote[] = [
  {
    id: '1',
    content: 'Completed annual maintenance. All systems running smoothly. Recommended filter replacement in 3 months.',
    author: 'Mike Rodriguez',
    timestamp: '2024-01-15T10:30:00Z',
    isPinned: true,
  },
  {
    id: '2',
    content: 'Customer called to schedule annual maintenance. Preferred date is mid-January.',
    author: 'Sarah Chen',
    timestamp: '2024-01-10T14:15:00Z',
    isPinned: false,
  },
]

const mockActivities: AccountActivity[] = [
  {
    id: '1',
    type: 'work_order',
    description: 'Work Order #WO-2024-045 scheduled for 2024-02-20',
    user: 'Sarah Chen',
    timestamp: '2024-02-10T09:00:00Z',
  },
  {
    id: '2',
    type: 'invoice',
    description: 'Payment received for Invoice #INV-2024-001 ($250)',
    user: 'System',
    timestamp: '2024-01-16T15:30:00Z',
  },
  {
    id: '3',
    type: 'work_order',
    description: 'Work Order #WO-2024-001 completed',
    user: 'Mike Rodriguez',
    timestamp: '2024-01-15T14:45:00Z',
  },
  {
    id: '4',
    type: 'note',
    description: 'Note added by Mike Rodriguez',
    user: 'Mike Rodriguez',
    timestamp: '2024-01-15T10:30:00Z',
  },
]

export default function AccountDetail() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  console.log('Account ID:', id)

  return (
    <div className="min-h-screen bg-slate-950">
      <AccountDetailHeader
        account={mockAccount}
        onEdit={() => console.log('Edit account')}
        onCreateWorkOrder={() => console.log('Create work order')}
      />

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-800 border border-slate-700 mb-6 w-full justify-start overflow-x-auto">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="contacts"
                  className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
                >
                  Contacts
                </TabsTrigger>
                <TabsTrigger
                  value="work-orders"
                  className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
                >
                  Work Orders
                </TabsTrigger>
                <TabsTrigger
                  value="invoices"
                  className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
                >
                  Invoices
                </TabsTrigger>
                <TabsTrigger
                  value="equipment"
                  className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
                >
                  Properties & Equipment
                </TabsTrigger>
                <TabsTrigger value="notes" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                  Notes
                </TabsTrigger>
                <TabsTrigger
                  value="timeline"
                  className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
                >
                  Timeline
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <OverviewTab account={mockAccount} onEdit={() => console.log('Edit account')} />
              </TabsContent>

              <TabsContent value="contacts">
                <ContactsTab
                  contacts={mockContacts}
                  onAddContact={() => console.log('Add contact')}
                  onEditContact={(id) => console.log('Edit contact', id)}
                  onDeleteContact={(id) => console.log('Delete contact', id)}
                />
              </TabsContent>

              <TabsContent value="work-orders">
                <WorkOrdersTab
                  workOrders={mockWorkOrders}
                  onCreateWorkOrder={() => console.log('Create work order')}
                  onViewWorkOrder={(id) => console.log('View work order', id)}
                />
              </TabsContent>

              <TabsContent value="invoices">
                <InvoicesTab
                  invoices={mockInvoices}
                  totalBilled={18500}
                  totalPaid={18050}
                  totalOutstanding={450}
                  onCreateInvoice={() => console.log('Create invoice')}
                  onViewInvoice={(id) => console.log('View invoice', id)}
                />
              </TabsContent>

              <TabsContent value="equipment">
                <PropertiesTab
                  accountId={mockAccount.id}
                  onAddProperty={() => console.log('Add property')}
                  onAddEquipment={(propertyId: string) => console.log('Add equipment to property', propertyId)}
                  onViewServiceHistory={(equipmentId: string) => console.log('View service history for equipment', equipmentId)}
                />
              </TabsContent>

              <TabsContent value="notes">
                <NotesTab
                  notes={mockNotes}
                  onAddNote={(content) => console.log('Add note', content)}
                  onTogglePin={(id) => console.log('Toggle pin', id)}
                />
              </TabsContent>

              <TabsContent value="timeline">
                <TimelineTab activities={mockActivities} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AccountSidebar
              account={mockAccount}
              onCreateWorkOrder={() => console.log('Create work order')}
              onSendEmail={() => console.log('Send email')}
              onScheduleService={() => console.log('Schedule service')}
              onViewOnMap={() => console.log('View on map')}
              onReassignTeam={() => console.log('Reassign team')}
              onViewAgreement={() => console.log('View agreement')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
