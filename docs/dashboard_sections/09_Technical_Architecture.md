## Technical Architecture

### Frontend Architecture

#### Technology Stack
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand (current) + React Query for server state
- **Routing**: React Router v6
- **UI Components**: 
  - Existing: Card, Sidebar, TopBar
  - New: Dashboard grid system, chart components, data tables
- **Charting**: Recharts (recommended) or Chart.js
- **Styling**: CSS Modules or Tailwind CSS
- **Date Handling**: date-fns or Day.js
- **Data Tables**: TanStack Table (React Table v8)
- **Icons**: Lucide React or Heroicons

#### Component Structure
```
frontend/src/
├── components/
│   ├── dashboard/
│   │   ├── DashboardLayout.tsx
│   │   ├── KPICard.tsx
│   │   ├── DashboardGrid.tsx
│   │   └── widgets/
│   │       ├── RevenueChart.tsx
│   │       ├── WorkOrderStatusChart.tsx
│   │       ├── ActivityFeed.tsx
│   │       ├── TechnicianTable.tsx
│   │       └── ...
│   ├── charts/
│   │   ├── LineChart.tsx
│   │   ├── BarChart.tsx
│   │   ├── PieChart.tsx
│   │   ├── GaugeChart.tsx
│   │   └── ...
│   ├── tables/
│   │   ├── DataTable.tsx
│   │   ├── TableFilters.tsx
│   │   ├── TablePagination.tsx
│   │   └── ...
│   ├── admin/
│   │   ├── UserManagement.tsx
│   │   ├── RoleEditor.tsx
│   │   ├── AuditLogViewer.tsx
│   │   └── ...
│   └── monitoring/
│       ├── HealthStatus.tsx
│       ├── PerformanceChart.tsx
│       ├── ErrorLogViewer.tsx
│       └── ...
├── pages/
│   ├── Dashboard.tsx (update existing)
│   ├── Analytics.tsx (new)
│   ├── Admin.tsx (new)
│   ├── Monitoring.tsx (new)
│   └── ...
├── hooks/
│   ├── useKPI.ts
│   ├── useDashboardData.ts
│   ├── useRealTimeUpdates.ts
│   └── ...
└── api/
    ├── dashboard.ts
    ├── analytics.ts
    ├── admin.ts
    └── monitoring.ts
```

#### State Management Strategy
- **Global State (Zustand)**:
  - User authentication and session
  - User preferences (theme, dashboard layout)
  - UI state (sidebar collapsed, filters)
  
- **Server State (React Query)**:
  - Dashboard data and KPIs
  - Analytics and reports
  - Real-time updates with polling/WebSockets
  - Cache management for better performance
  - Automatic refetch on window focus
  
- **Local State (React useState)**:
  - Component-specific UI state
  - Form inputs
  - Temporary filters

#### Real-Time Updates
- **Polling Strategy**: Short-interval polling for critical metrics (30-60 seconds)
- **WebSocket Support** (Future): Real-time push for instant updates
- **Optimistic Updates**: Update UI immediately, sync with server
- **Background Refresh**: React Query stale-while-revalidate pattern

### Backend Architecture

#### New API Endpoints Required

##### Dashboard Endpoints
```typescript
// Executive Dashboard
GET /api/v1/dashboard/executive
  - Returns: KPI summary, revenue trends, work order stats, recent activity
  - Query params: dateRange, tenantId

GET /api/v1/dashboard/kpis
  - Returns: All KPIs with current values and trends
  - Query params: metric[], period (day/week/month/year)

// Analytics Endpoints
GET /api/v1/analytics/revenue
  - Returns: Revenue data by period, service type, customer
  - Query params: startDate, endDate, groupBy, filterBy

GET /api/v1/analytics/workorders
  - Returns: Work order analytics and trends
  - Query params: startDate, endDate, status, technician, serviceType, includeZeroDollar, isCallback

GET /api/v1/analytics/workorders/zero-dollar
  - Returns: Zero dollar work order analysis
  - Query params: startDate, endDate, reasonCode, technician
  - Returns: Count, trend, breakdown by reason, labor hours, cost impact

GET /api/v1/analytics/workorders/callbacks
  - Returns: Call back analysis and metrics
  - Query params: startDate, endDate, technician, serviceType
  - Returns: Call back rate, reasons, time between visits, financial impact

GET /api/v1/analytics/inventory
  - Returns: Inventory analytics, turnover, valuation
  - Query params: warehouse, category

GET /api/v1/analytics/crm
  - Returns: Customer and lead analytics
  - Query params: startDate, endDate, segment

GET /api/v1/analytics/dispatch
  - Returns: Dispatch and technician analytics
  - Query params: startDate, endDate, technician

// Reports Endpoints
GET /api/v1/reports/financial
  - Returns: Financial reports (P&L, AR, etc.)
  - Query params: reportType, startDate, endDate, format (json/pdf/excel)

POST /api/v1/reports/custom
  - Body: Report configuration (metrics, filters, grouping)
  - Returns: Custom report data

GET /api/v1/reports/export/:reportId
  - Returns: Report file (PDF, Excel, CSV)

// Admin Endpoints
GET /api/v1/admin/users
  - Returns: List of all users with roles and status
  - Query params: page, limit, search, role, status

POST /api/v1/admin/users
  - Body: User creation data
  - Returns: Created user

PUT /api/v1/admin/users/:userId
  - Body: User update data
  - Returns: Updated user

DELETE /api/v1/admin/users/:userId
  - Returns: Success confirmation

GET /api/v1/admin/roles
  - Returns: List of roles with permissions

PUT /api/v1/admin/roles/:roleId
  - Body: Role permission updates
  - Returns: Updated role

GET /api/v1/admin/audit-logs
  - Returns: Audit log entries
  - Query params: page, limit, userId, action, startDate, endDate

GET /api/v1/admin/settings
  - Returns: System settings

PUT /api/v1/admin/settings
  - Body: Settings updates
  - Returns: Updated settings

// Monitoring Endpoints
GET /api/v1/monitoring/health-detailed
  - Returns: Detailed health status (API, DB, cache, queue)

GET /api/v1/monitoring/performance
  - Returns: Performance metrics (response times, error rates)
  - Query params: startDate, endDate

GET /api/v1/monitoring/errors
  - Returns: Recent error logs
  - Query params: page, limit, level, startDate, endDate

GET /api/v1/monitoring/system-resources
  - Returns: Server resources (CPU, memory, disk)

GET /api/v1/monitoring/background-jobs
  - Returns: Queue status and job stats

// Work Order Type Tracking Endpoints
GET /api/v1/workorders/zero-dollar
  - Returns: List of zero dollar work orders
  - Query params: page, limit, startDate, endDate, reasonCode, technician

GET /api/v1/workorders/callbacks
  - Returns: List of callback work orders with original WO references
  - Query params: page, limit, startDate, endDate, technician, resolved

POST /api/v1/workorders/:workOrderId/mark-callback
  - Body: { originalWorkOrderId, callbackReason, notes }
  - Returns: Updated work order with callback flag

GET /api/v1/workorders/:workOrderId/callback-history
  - Returns: All callbacks related to a specific work order
```

#### Database Schema Additions

##### Users Table (if not exists)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role_id UUID REFERENCES roles(id),
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, suspended
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

##### Roles Table
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB, -- {"workorders": ["create", "read", "update"], ...}
  is_system_role BOOLEAN DEFAULT false,
  tenant_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

##### Audit Logs Table
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL, -- create, update, delete, login, etc.
  resource_type VARCHAR(100), -- workorder, inventory, user, etc.
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

##### Dashboard Preferences Table
```sql
CREATE TABLE dashboard_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  dashboard_type VARCHAR(50), -- executive, analytics, etc.
  layout_config JSONB, -- Widget positions and sizes
  filters JSONB, -- Saved filters
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, dashboard_type)
);
```

##### System Metrics Table (for historical tracking)
```sql
CREATE TABLE system_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type VARCHAR(100) NOT NULL, -- api_response_time, error_rate, etc.
  metric_value DECIMAL,
  tags JSONB, -- {endpoint: "/api/v1/workorders", method: "GET"}
  recorded_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_system_metrics_type_time ON system_metrics(metric_type, recorded_at DESC);
```

##### Work Orders Table Updates (Add columns to existing table)
```sql
-- Add columns to existing work_orders table for zero dollar and callback tracking
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS is_billable BOOLEAN DEFAULT true;
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS is_zero_dollar BOOLEAN DEFAULT false;
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS zero_dollar_reason VARCHAR(50); 
  -- Enum: 'warranty', 'goodwill', 'callback', 'diagnostic', 'training', 'other'
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS is_callback BOOLEAN DEFAULT false;
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS original_work_order_id UUID REFERENCES work_orders(id);
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS callback_reason VARCHAR(100);
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS callback_resolution_notes TEXT;
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS service_type VARCHAR(50);
  -- Enum: 'installation', 'repair', 'maintenance', 'callback', 'diagnostic', 'emergency', 'other'

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_work_orders_billable ON work_orders(is_billable, tenant_id);
CREATE INDEX IF NOT EXISTS idx_work_orders_zero_dollar ON work_orders(is_zero_dollar, tenant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_work_orders_callback ON work_orders(is_callback, tenant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_work_orders_original ON work_orders(original_work_order_id);
CREATE INDEX IF NOT EXISTS idx_work_orders_service_type ON work_orders(service_type, tenant_id);

-- Add constraint to ensure callback work orders have original_work_order_id
ALTER TABLE work_orders ADD CONSTRAINT check_callback_has_original 
  CHECK (
    (is_callback = false) OR 
    (is_callback = true AND original_work_order_id IS NOT NULL)
  );
```

##### Work Order Labor Tracking Table (for zero dollar cost calculation)
```sql
CREATE TABLE IF NOT EXISTS work_order_labor (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_id UUID REFERENCES work_orders(id) ON DELETE CASCADE,
  technician_id UUID NOT NULL,
  hours_worked DECIMAL(5,2) NOT NULL,
  labor_rate DECIMAL(10,2), -- Rate at time of work
  labor_cost DECIMAL(10,2), -- Calculated: hours * rate
  date_worked DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_work_order_labor_wo ON work_order_labor(work_order_id);
CREATE INDEX idx_work_order_labor_tech ON work_order_labor(technician_id);
```

#### NestJS Module Structure
```
backend/src/modules/
├── dashboard/
│   ├── dashboard.controller.ts
│   ├── dashboard.service.ts
│   ├── dashboard.module.ts
│   └── dto/
│       ├── kpi-query.dto.ts
│       └── dashboard-response.dto.ts
├── analytics/
│   ├── analytics.controller.ts
│   ├── analytics.service.ts
│   ├── analytics.module.ts
│   └── dto/
├── admin/
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   ├── roles/
│   │   ├── roles.controller.ts
│   │   ├── roles.service.ts
│   │   └── dto/
│   ├── audit/
│   │   ├── audit.controller.ts
│   │   ├── audit.service.ts
│   │   └── dto/
│   └── admin.module.ts
└── monitoring/
    ├── monitoring.controller.ts
    ├── monitoring.service.ts
    ├── monitoring.module.ts
    └── dto/
```

#### Caching Strategy
- **Redis Cache** (Future Enhancement):
  - Cache KPI calculations (TTL: 1-5 minutes)
  - Cache dashboard queries
  - Invalidate on data updates
  
- **In-Memory Cache** (Current):
  - Use NestJS cache-manager
  - Cache frequently accessed data
  - Set appropriate TTLs based on data volatility

#### Performance Optimization
- **Database Indexing**:
  - Index all foreign keys
  - Index commonly filtered columns (status, date, tenant_id)
  - Composite indexes for complex queries
  
- **Query Optimization**:
  - Use database views for complex KPI calculations
  - Aggregate queries with proper grouping
  - Limit result sets with pagination
  
- **Materialized Views** (Future):
  - Pre-calculate expensive aggregations
  - Refresh on schedule or triggers
  
- **Background Processing**:
  - Calculate complex analytics asynchronously
  - Store results in cache or dedicated table
  - Use queue module for heavy computations

#### Security Considerations
- **Authentication**: JWT tokens with refresh mechanism
- **Authorization**: Role-based access control on all endpoints
- **Audit Logging**: Track all sensitive operations
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Validate all inputs with DTOs and class-validator
- **SQL Injection Prevention**: Use Prisma ORM (parameterized queries)
- **XSS Protection**: Sanitize outputs, use Helmet middleware
- **CORS**: Configure allowed origins

---

