# HVAC Management System - Complete RBAC & Demo Tenant Implementation

## PROJECT CONTEXT

You are implementing a comprehensive Role-Based Access Control (RBAC) system and demo tenant for an enterprise HVAC Management System. This is a production-grade application built with:

**Tech Stack:**
- **Backend**: NestJS (TypeScript), Prisma ORM, PostgreSQL (Neon)
- **Frontend**: React + Vite, TypeScript, Zustand (state management)
- **Authentication**: JWT-based with multi-tenant architecture
- **API**: RESTful, versioned at `/api/v1`

**Project Structure:**
```
/backend
  /src
    /modules
      /admin (existing Super Admin module)
      /auth
      /work-orders
      /crm
      /inventory
      /purchasing
      /dispatch
      /forecast
      /barcode
      /labels
      /chat
      /scanner
      /field-calculation
      /estimator
      /notifications
      /users
  /scripts
    seed.ts (existing basic seed)
    seed-admin.ts (existing - creates SUPER_ADMIN only)
    seed-crm-purchasing.ts (existing)
    seed-dispatch.ts (existing)
  /prisma
    schema.prisma

/frontend
  /src
    /stores (Zustand)
    /pages
    /components
```

## CURRENT STATE

**Existing in Database:**
- 5 Roles: SUPER_ADMIN, ADMIN, MANAGER, TECHNICIAN, USER
- 38 Permissions (only basic admin/system permissions)
- Only SUPER_ADMIN has permissions assigned (all 38)
- ADMIN, MANAGER, TECHNICIAN, USER have ZERO permissions

**Super Admin Credentials (DO NOT MODIFY):**
- Email: admin@hvac.com
- Password: password123
- Tenant: HVAC Inc.

## YOUR MISSION

Create a complete, production-ready RBAC system with:
1. **13 Roles** with proper permissions
2. **Comprehensive permissions** for all 17 modules
3. **Demo tenant** with realistic sample data
4. **Seed scripts** that are idempotent and can be re-run

---

## PART 1: ROLE & PERMISSION DEFINITIONS

### 13 Roles to Implement

Create these roles with the following attributes:

```typescript
const roles = [
  { name: 'SUPER_ADMIN', displayName: 'Super Administrator', description: 'Full system access', isSystem: true, priority: 100, color: '#ef4444' },
  { name: 'OWNER', displayName: 'Owner/CEO', description: 'Business owner with full operational access', isSystem: true, priority: 95, color: '#9333ea' },
  { name: 'ADMIN', displayName: 'Administrator', description: 'Tenant administrator', isSystem: true, priority: 90, color: '#f59e0b' },
  { name: 'FIELD_MANAGER', displayName: 'Field Manager', description: 'Manages field operations and technicians', isSystem: true, priority: 70, color: '#3b82f6' },
  { name: 'FIELD_SUPERVISOR', displayName: 'Field Supervisor', description: 'Supervises field technicians', isSystem: true, priority: 60, color: '#06b6d4' },
  { name: 'TECHNICIAN', displayName: 'Technician', description: 'Field technician', isSystem: true, priority: 50, color: '#14b8a6' },
  { name: 'OFFICE_MANAGER', displayName: 'Office Manager', description: 'Manages office and purchasing', isSystem: true, priority: 65, color: '#8b5cf6' },
  { name: 'WAREHOUSE_MANAGER', displayName: 'Warehouse Manager', description: 'Manages inventory and warehouses', isSystem: true, priority: 55, color: '#10b981' },
  { name: 'SALES_REPRESENTATIVE', displayName: 'Sales Representative', description: 'Manages sales and leads', isSystem: true, priority: 45, color: '#f97316' },
  { name: 'CUSTOMER_SERVICE_REPRESENTATIVE', displayName: 'Customer Service Rep', description: 'Handles customer inquiries', isSystem: true, priority: 40, color: '#ec4899' },
  { name: 'ACCOUNTANT', displayName: 'Accountant', description: 'Manages financials and billing', isSystem: true, priority: 50, color: '#84cc16' },
  { name: 'VIEWER', displayName: 'Viewer', description: 'Read-only access', isSystem: true, priority: 20, color: '#64748b' },
  { name: 'USER', displayName: 'User', description: 'Basic user', isSystem: true, priority: 10, color: '#6b7280' },
];
```

### 17 Module Categories for Permissions

Define granular permissions for these modules:

1. **Work Orders**: create, read, read_own, update, update_own, delete, assign, complete, cancel
2. **CRM**: 
   - accounts: create, read, read_own, update, update_own, delete
   - contacts: create, read, read_own, update, update_own, delete
   - leads: create, read, read_own, update, update_own, delete
   - notes: create, read, read_own, update, update_own, delete
3. **Inventory**: 
   - skus: create, read, update, delete
   - warehouses: create, read, update, delete
   - bins: create, read, update, delete
   - stock_ledger: create, read, adjust
   - stock_transfer: create, read, approve
4. **Purchasing**: create, read, update, delete, approve, receive, cancel
5. **Dispatch**: create, read, update, delete, assign, view_all, view_team
6. **Forecasting**: create, read, generate, view_recommendations
7. **Field Tools**: use, save_calculations, view_history, use_ai_estimator
8. **Barcode Scanner**: scan, lookup
9. **Labels**: generate, print, export
10. **User Management**: create, read, update, delete, activate, deactivate, assign_roles
11. **Role Management**: create, read, update, delete, assign_permissions
12. **Permission Management**: create, read, update, delete
13. **Tenant Management**: read, update, activate, deactivate, list
14. **System Settings**: view_dashboard, manage_settings, view_metrics
15. **Notifications**: read, read_own, create, update_preferences, delete, send
16. **AI Chat**: use, view_history
17. **Reports**: view_all, view_own, generate, export

### Permission Matrix (Access Levels)

**Access Level Definitions:**
- `full` = create, read, update, delete
- `edit` = read, update (no create/delete)
- `view` = read only
- `limited` = read_own, update_own (own records only)
- `none` = no permissions

**Complete Permission Matrix:**
```json
{
  "SUPER_ADMIN": { "Work_Orders": "full", "CRM": "full", "Inventory": "full", "Purchasing": "full", "Dispatch": "full", "Forecasting": "full", "Field_Tools": "full", "Barcode_Scanner": "full", "Labels": "full", "User_Management": "full", "Role_Management": "full", "Permission_Management": "full", "Tenant_Management": "full", "System_Settings": "full", "Notifications": "full", "AI_Chat": "full", "Reports": "full" },
  "OWNER": { "Work_Orders": "full", "CRM": "full", "Inventory": "full", "Purchasing": "full", "Dispatch": "full", "Forecasting": "full", "Field_Tools": "full", "Barcode_Scanner": "full", "Labels": "full", "User_Management": "none", "Role_Management": "none", "Permission_Management": "none", "Tenant_Management": "none", "System_Settings": "view", "Notifications": "full", "AI_Chat": "full", "Reports": "full" },
  "ADMIN": { "Work_Orders": "full", "CRM": "full", "Inventory": "full", "Purchasing": "full", "Dispatch": "full", "Forecasting": "full", "Field_Tools": "full", "Barcode_Scanner": "full", "Labels": "full", "User_Management": "full", "Role_Management": "full", "Permission_Management": "full", "Tenant_Management": "none", "System_Settings": "full", "Notifications": "full", "AI_Chat": "full", "Reports": "full" },
  "FIELD_MANAGER": { "Work_Orders": "full", "CRM": "edit", "Inventory": "view", "Purchasing": "edit", "Dispatch": "full", "Forecasting": "view", "Field_Tools": "full", "Barcode_Scanner": "limited", "Labels": "limited", "User_Management": "none", "Role_Management": "none", "Permission_Management": "none", "Tenant_Management": "none", "System_Settings": "view", "Notifications": "full", "AI_Chat": "full", "Reports": "limited" },
  "FIELD_SUPERVISOR": { "Work_Orders": "edit", "CRM": "view", "Inventory": "view", "Purchasing": "none", "Dispatch": "edit", "Forecasting": "none", "Field_Tools": "full", "Barcode_Scanner": "limited", "Labels": "limited", "User_Management": "none", "Role_Management": "none", "Permission_Management": "none", "Tenant_Management": "none", "System_Settings": "none", "Notifications": "full", "AI_Chat": "full", "Reports": "limited" },
  "TECHNICIAN": { "Work_Orders": "edit", "CRM": "limited", "Inventory": "view", "Purchasing": "none", "Dispatch": "none", "Forecasting": "none", "Field_Tools": "full", "Barcode_Scanner": "full", "Labels": "limited", "User_Management": "none", "Role_Management": "none", "Permission_Management": "none", "Tenant_Management": "none", "System_Settings": "none", "Notifications": "full", "AI_Chat": "full", "Reports": "none" },
  "OFFICE_MANAGER": { "Work_Orders": "view", "CRM": "edit", "Inventory": "view", "Purchasing": "full", "Dispatch": "view", "Forecasting": "view", "Field_Tools": "limited", "Barcode_Scanner": "limited", "Labels": "full", "User_Management": "none", "Role_Management": "none", "Permission_Management": "none", "Tenant_Management": "none", "System_Settings": "edit", "Notifications": "full", "AI_Chat": "full", "Reports": "full" },
  "WAREHOUSE_MANAGER": { "Work_Orders": "view", "CRM": "none", "Inventory": "full", "Purchasing": "limited", "Dispatch": "none", "Forecasting": "full", "Field_Tools": "limited", "Barcode_Scanner": "full", "Labels": "full", "User_Management": "none", "Role_Management": "none", "Permission_Management": "none", "Tenant_Management": "none", "System_Settings": "view", "Notifications": "full", "AI_Chat": "full", "Reports": "full" },
  "SALES_REPRESENTATIVE": { "Work_Orders": "view", "CRM": "full", "Inventory": "view", "Purchasing": "none", "Dispatch": "view", "Forecasting": "none", "Field_Tools": "limited", "Barcode_Scanner": "none", "Labels": "none", "User_Management": "none", "Role_Management": "none", "Permission_Management": "none", "Tenant_Management": "none", "System_Settings": "none", "Notifications": "full", "AI_Chat": "full", "Reports": "limited" },
  "CUSTOMER_SERVICE_REPRESENTATIVE": { "Work_Orders": "edit", "CRM": "full", "Inventory": "view", "Purchasing": "none", "Dispatch": "edit", "Forecasting": "none", "Field_Tools": "limited", "Barcode_Scanner": "none", "Labels": "none", "User_Management": "none", "Role_Management": "none", "Permission_Management": "none", "Tenant_Management": "none", "System_Settings": "none", "Notifications": "full", "AI_Chat": "full", "Reports": "limited" },
  "ACCOUNTANT": { "Work_Orders": "view", "CRM": "view", "Inventory": "view", "Purchasing": "view", "Dispatch": "none", "Forecasting": "view", "Field_Tools": "none", "Barcode_Scanner": "none", "Labels": "none", "User_Management": "none", "Role_Management": "none", "Permission_Management": "none", "Tenant_Management": "none", "System_Settings": "view", "Notifications": "full", "AI_Chat": "full", "Reports": "full" },
  "VIEWER": { "Work_Orders": "view", "CRM": "view", "Inventory": "view", "Purchasing": "view", "Dispatch": "view", "Forecasting": "view", "Field_Tools": "view", "Barcode_Scanner": "view", "Labels": "view", "User_Management": "view", "Role_Management": "view", "Permission_Management": "view", "Tenant_Management": "none", "System_Settings": "view", "Notifications": "view", "AI_Chat": "view", "Reports": "view" },
  "USER": { "Work_Orders": "limited", "CRM": "limited", "Inventory": "limited", "Purchasing": "none", "Dispatch": "none", "Forecasting": "none", "Field_Tools": "limited", "Barcode_Scanner": "limited", "Labels": "none", "User_Management": "none", "Role_Management": "none", "Permission_Management": "none", "Tenant_Management": "none", "System_Settings": "none", "Notifications": "full", "AI_Chat": "full", "Reports": "none" }
}
```

---

## PART 2: DEMO TENANT REQUIREMENTS

Create "HVAC Demo Corp" tenant with realistic sample data:

**Demo User:**
- Email: `demo@hvac.com`
- Password: `demo123`
- Role: FIELD_MANAGER (full access to showcase all features)
- Tenant: HVAC Demo Corp

**Sample Data Requirements:**

1. **Work Orders (20):**
   - Statuses: 5 Open, 5 In Progress, 7 Completed, 2 On Hold, 1 Cancelled
   - Types: Emergency, Maintenance, Installation, Inspection
   - Dates: Spread over last 90 days
   - Realistic HVAC descriptions (AC repair, furnace installation, duct cleaning, etc.)

2. **CRM Data:**
   - 12 Accounts (mix of residential & commercial)
   - 18 Contacts (linked to accounts)
   - 8 Leads (various stages: New, Contacted, Qualified, Proposal, Won, Lost)
   - 25 Notes across contacts

3. **Inventory (35 SKUs):**
   - Categories: Filters, Refrigerants, Parts, Tools, Equipment
   - 3 Warehouses: Main Warehouse, Service Van 1, Service Van 2
   - 10 Bins across warehouses
   - Stock Ledger entries showing movement
   - Realistic SKU codes, descriptions, prices

4. **Purchasing (8 POs):**
   - Statuses: 2 Draft, 3 Submitted, 2 Approved, 1 Received
   - Linked to real SKUs
   - Realistic vendors: "HVAC Supply Co", "Parts Distributors Inc", "Refrigerant Depot"

5. **Dispatch Schedule:**
   - 5 Technicians with assigned work orders
   - Mix of morning/afternoon appointments
   - Some unassigned work orders

6. **Field Calculations:**
   - 5-8 saved calculations (BTU, airflow, duct sizing)
   - Linked to work orders

7. **Notifications:**
   - 3-5 unread notifications for demo user
   - Various types: work order assigned, low stock alert, purchase order approved

---

## PART 3: DELIVERABLES

Create these files that can be dropped directly into the project:

### File 1: `/backend/scripts/seed-rbac-complete.ts`

**Requirements:**
- Use Prisma Client (`@prisma/client`)
- Use bcrypt for password hashing (import * as bcrypt from 'bcrypt')
- Idempotent (use `upsert` for everything)
- Update existing MANAGER role to FIELD_MANAGER
- Create all 13 roles with properties shown above
- Define ALL granular permissions (200+) for 17 modules
- Assign permissions to roles based on the matrix
- Console logs with emojis for progress tracking
- Proper error handling and transaction safety

**Permission Naming Convention:**
```typescript
// Format: {module}.{sub_module}.{action}
'work_orders.create'
'work_orders.read'
'work_orders.read_own'
'work_orders.update'
'work_orders.update_own'
'work_orders.delete'
'work_orders.assign'
'crm.accounts.create'
'crm.accounts.read'
'crm.contacts.update_own'
'inventory.skus.create'
'inventory.stock_ledger.adjust'
// etc.
```

**Structure:**
```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Complete RBAC System...\n');
  
  // 1. Update MANAGER to FIELD_MANAGER
  // 2. Create all 13 roles
  // 3. Define all permissions (~200+)
  // 4. Assign permissions based on matrix
  // 5. Success summary
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

### File 2: `/backend/scripts/seed-demo-tenant.ts`

**Requirements:**
- Create "HVAC Demo Corp" tenant
- Create demo@hvac.com user with FIELD_MANAGER role
- Generate all sample data described above
- Use realistic HVAC industry data
- Link relationships properly (work orders → accounts, stock ledger → SKUs, etc.)
- Use Prisma transactions for data integrity
- Idempotent - can be re-run to reset demo data
- Console logs showing progress

**Structure:**
```typescript
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  console.log('🏢 Creating Demo Tenant: HVAC Demo Corp\n');
  
  // 1. Create/find tenant
  // 2. Create demo user
  // 3. Create accounts & contacts
  // 4. Create work orders
  // 5. Create inventory (SKUs, warehouses, bins, stock)
  // 6. Create purchase orders
  // 7. Create dispatch assignments
  // 8. Create field calculations
  // 9. Create notifications
  // 10. Success summary with credentials
}
```

### File 3: `/backend/package.json` (Update Scripts Section)

Add these npm scripts:
```json
{
  "scripts": {
    "seed:rbac": "ts-node scripts/seed-rbac-complete.ts",
    "seed:demo": "ts-node scripts/seed-demo-tenant.ts",
    "seed:all": "npm run seed:rbac && npm run seed:demo"
  }
}
```

---

## PART 4: PRISMA SCHEMA REFERENCE

**Existing Models (DO NOT MODIFY SCHEMA):**

```prisma
model Tenant {
  id        String   @id @default(uuid())
  name      String
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model User {
  id            String   @id @default(uuid())
  email         String   @unique
  password      String
  tenantId      String
  firstName     String?
  lastName      String?
  isActive      Boolean  @default(true)
  emailVerified Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  tenant        Tenant     @relation(...)
  roles         UserRole[]
}

model Role {
  id          String   @id @default(uuid())
  name        String   @unique
  displayName String?
  description String?
  isSystem    Boolean  @default(false)
  priority    Int      @default(0)
  color       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  users       UserRole[]
  permissions RolePermission[]
}

model Permission {
  id          String   @id @default(uuid())
  name        String   @unique
  description String?
  resource    String?
  action      String?
  scope       String?
  category    String?
  requiresMfa Boolean  @default(false)
  createdAt   DateTime @default(now())
  
  roles       RolePermission[]
}

model RolePermission {
  id           String     @id @default(uuid())
  roleId       String
  permissionId String
  conditions   Json?
  createdAt    DateTime   @default(now())
  
  role         Role       @relation(...)
  permission   Permission @relation(...)
  
  @@unique([roleId, permissionId])
}

model UserRole {
  id         String    @id @default(uuid())
  userId     String
  roleId     String
  assignedBy String?
  expiresAt  DateTime?
  assignedAt DateTime  @default(now())
  
  user       User @relation(...)
  role       Role @relation(...)
  
  @@unique([userId, roleId])
}

// Work Order, CRM (Account, Contact, Lead, Note), Inventory (SKU, Warehouse, Bin, StockLedger), 
// PurchaseOrder, DispatchAssignment, FieldCalculation, Notification models exist
```

---

## CRITICAL REQUIREMENTS

1. **DO NOT modify the Prisma schema** - work with existing models
2. **Use proper TypeScript types** - import from @prisma/client
3. **Idempotent scripts** - must be safely re-runnable
4. **Proper error handling** - try/catch with meaningful messages
5. **Transaction safety** - use `prisma.$transaction` for related data
6. **Console logging** - clear progress indicators with emojis
7. **Password hashing** - bcrypt with salt rounds 10
8. **UUID generation** - Prisma handles this automatically
9. **Date generation** - use realistic dates (last 90 days for work orders, etc.)
10. **Relationships** - properly link all foreign keys

## CODE PATTERNS TO FOLLOW

**Upsert Pattern:**
```typescript
const role = await prisma.role.upsert({
  where: { name: 'FIELD_MANAGER' },
  update: { displayName: 'Field Manager', description: '...' },
  create: { name: 'FIELD_MANAGER', displayName: 'Field Manager', ... },
});
```

**Permission Assignment:**
```typescript
await prisma.rolePermission.upsert({
  where: {
    roleId_permissionId: {
      roleId: role.id,
      permissionId: permission.id,
    },
  },
  update: {},
  create: {
    roleId: role.id,
    permissionId: permission.id,
  },
});
```

**Transaction Example:**
```typescript
await prisma.$transaction(async (tx) => {
  const account = await tx.account.create({ data: {...} });
  const contact = await tx.contact.create({ data: { accountId: account.id, ... } });
});
```

---

## SUCCESS CRITERIA

When complete, running:
1. `npm run seed:rbac` creates all 13 roles with full permissions
2. `npm run seed:demo` creates demo tenant with realistic data
3. Login with demo@hvac.com works and has FIELD_MANAGER permissions
4. All modules are accessible based on permission matrix
5. Demo data is realistic and comprehensive

## OUTPUT FORMAT

Provide:
1. Complete `/backend/scripts/seed-rbac-complete.ts` (500-800 lines)
2. Complete `/backend/scripts/seed-demo-tenant.ts` (600-1000 lines)
3. Updated npm scripts for package.json
4. Brief README explaining how to run the scripts

Generate production-ready, well-commented code that can be dropped directly into the project with ZERO modifications needed.
