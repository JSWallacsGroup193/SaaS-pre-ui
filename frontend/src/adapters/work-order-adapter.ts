/**
 * Work Order Adapter
 * Converts backend WorkOrder entities to UI-friendly WorkOrderView format
 */

import type { WorkOrder } from '@/types'
import type { WorkOrderView, WorkOrderStatusView, WorkOrderPriorityView, JobTypeView } from '@/types/view-models/work-order'

/**
 * Maps backend WorkOrderStatus enum to UI status string
 */
function mapStatus(status: WorkOrder['status']): WorkOrderStatusView {
  const statusMap: Record<string, WorkOrderStatusView> = {
    'PENDING': 'pending',
    'IN_PROGRESS': 'in-progress',
    'COMPLETED': 'completed',
    'CANCELLED': 'cancelled',
    'SCHEDULED': 'pending',
    'ON_HOLD': 'pending',
  }
  return statusMap[status] || 'pending'
}

/**
 * Maps backend WorkOrderPriority enum to UI priority string
 */
function mapPriority(priority: WorkOrder['priority']): WorkOrderPriorityView {
  const priorityMap: Record<string, WorkOrderPriorityView> = {
    'LOW': 'low',
    'MEDIUM': 'medium',
    'HIGH': 'high',
    'URGENT': 'urgent',
    'CRITICAL': 'urgent',
  }
  return priorityMap[priority] || 'medium'
}

/**
 * Maps backend work order type to UI job type
 */
function mapJobType(type: string): JobTypeView {
  const lowerType = type?.toLowerCase() || ''
  
  if (lowerType.includes('install')) return 'installation'
  if (lowerType.includes('repair') || lowerType.includes('fix')) return 'repair'
  if (lowerType.includes('maintenance') || lowerType.includes('service')) return 'maintenance'
  if (lowerType.includes('inspection') || lowerType.includes('check')) return 'inspection'
  
  return 'maintenance' // default fallback
}

/**
 * Converts backend WorkOrder to UI-friendly WorkOrderView
 */
export function mapWorkOrderToView(workOrder: WorkOrder): WorkOrderView {
  return {
    id: workOrder.id,
    woNumber: workOrder.number || `WO-${workOrder.id.slice(0, 8)}`,
    customer: {
      name: workOrder.customerName || 'Unknown Customer',
      address: workOrder.address || 'No address provided',
    },
    status: mapStatus(workOrder.status),
    technician: workOrder.technicianId && workOrder.technicianName
      ? {
          id: workOrder.technicianId,
          name: workOrder.technicianName,
        }
      : null,
    date: workOrder.scheduledStart || workOrder.createdAt || new Date().toISOString(),
    jobType: mapJobType(workOrder.type),
    priority: mapPriority(workOrder.priority),
    description: workOrder.description || workOrder.title || 'No description',
    createdAt: workOrder.createdAt || new Date().toISOString(),
  }
}

/**
 * Batch converts multiple WorkOrders to WorkOrderViews
 */
export function mapWorkOrdersToView(workOrders: WorkOrder[]): WorkOrderView[] {
  return workOrders.map(mapWorkOrderToView)
}

/**
 * Filters WorkOrderViews based on search query
 */
export function filterWorkOrders(
  workOrders: WorkOrderView[],
  searchQuery: string
): WorkOrderView[] {
  if (!searchQuery) return workOrders
  
  const query = searchQuery.toLowerCase()
  return workOrders.filter(
    (wo) =>
      wo.woNumber.toLowerCase().includes(query) ||
      wo.customer.name.toLowerCase().includes(query) ||
      wo.customer.address.toLowerCase().includes(query) ||
      wo.description.toLowerCase().includes(query) ||
      wo.technician?.name.toLowerCase().includes(query)
  )
}
