## User Roles & Permissions

### Role Hierarchy

#### 1. Super Admin
- **Full System Access**: Complete control over all features and data
- **Permissions**:
  - User management (create, edit, delete users)
  - Role and permission configuration (including Owner/CEO role)
  - System settings and configuration
  - Multi-tenant management
  - Access to all modules and dashboards
  - Audit log viewing
  - Database operations
  - API key management
  - Toggle "can be edited by admin" setting on any role
  
#### 2. Owner/CEO
- **Executive Leadership**: Complete business oversight with all operational permissions
- **Special Characteristics**:
  - **Protected Role**: Cannot be edited by Admins unless Super Admin enables it
  - **Comprehensive Access**: Has ALL permissions from ALL roles (except Super Admin permissions)
  - **Admin Edit Lock**: Controlled by "can be edited by admin" toggle (Super Admin only)
- **Permissions**:
  - All Admin permissions
  - All Field Manager permissions
  - All Lead Dispatch permissions
  - All Lead Tech permissions
  - All Purchasing Manager permissions
  - All Warehouse Manager permissions
  - All Accounting permissions
  - All Sales/CRM permissions
  - Combined access to every module and dashboard
  - View all audit logs (except system-level changes)
  - Access all reports and analytics
  - Approve all workflows and transactions
  - Cannot: System configuration, role management, database operations, API key management (Super Admin only)
  - Cannot be modified by: Admins (unless "can be edited by admin" is toggled on by Super Admin)
  
#### 3. Admin
- **Business Management**: Manage operations without system configuration
- **Permissions**:
  - View all dashboards
  - Manage work orders, inventory, CRM, purchasing
  - Create/edit users (cannot delete or change roles)
  - View reports and analytics
  - Export data
  - Cannot: Modify system settings, manage roles (except if "can be edited by admin" is enabled), access audit logs
  - Cannot: Edit Owner/CEO role permissions (unless Super Admin grants permission)
  
#### 4. Field Manager
- **Field Operations Leadership**: Oversee field technicians and work order execution
- **Permissions**:
  - View executive and operational dashboards
  - Manage work orders and technician assignments
  - Approve technician time and expenses
  - View and manage dispatch schedule
  - Monitor technician performance metrics
  - Access customer information
  - Generate field operations reports
  - Cannot: User management, system settings, purchasing, full financial access
  
#### 5. Lead Dispatch
- **Dispatch Leadership**: Senior dispatcher with additional oversight
- **Permissions**:
  - Full access to dispatch dashboard and analytics
  - Create, assign, and reassign work orders
  - Manage all technician schedules
  - Optimize routes and workload distribution
  - Approve schedule changes and overtime
  - Train and mentor dispatchers
  - View dispatch performance metrics
  - Cannot: User management, system settings, purchasing approval, full financial data
  
#### 6. Dispatcher
- **Scheduling Focus**: Manage technician schedules and work order assignments
- **Permissions**:
  - Full access to dispatch dashboard
  - Create and assign work orders
  - View technician schedules and availability
  - Update work order status
  - View basic inventory (parts availability)
  - Cannot: Financial data, system administration, user management
  
#### 7. Lead Tech
- **Senior Technician**: Lead technician with mentoring and quality oversight
- **Permissions**:
  - All technician permissions
  - View team performance metrics
  - Assist with complex work orders
  - Provide technical guidance to other technicians
  - Review and approve technician work (quality control)
  - Access to training materials and documentation
  - Limited access to dispatch for coordination
  - Cannot: Create work orders, access financial data, user management
  
#### 8. Technician
- **Field Operations**: Access to assigned work orders and mobile features
- **Permissions**:
  - View own assigned work orders
  - Update work order status and notes
  - Record time and materials used
  - Scanner access for inventory
  - View customer information (limited)
  - Cannot: Dashboard access, create work orders, view other technicians' data
  
#### 9. Purchasing Manager
- **Procurement Leadership**: Oversee purchasing operations and vendor relationships
- **Permissions**:
  - Full access to purchasing dashboard
  - Create, approve, and manage all purchase orders
  - Manage vendor relationships and contracts
  - Set purchasing budgets and approval limits
  - View and analyze purchasing analytics
  - Negotiate pricing and terms
  - Manage purchasing team and workflows
  - View inventory levels and demand forecasts
  - Cannot: User management (except purchasing team), system settings, work order management
  
#### 10. Purchasing
- **Procurement Specialist**: Create and manage purchase orders
- **Permissions**:
  - Access to purchasing dashboard
  - Create purchase orders (up to approval limit)
  - Track and receive orders
  - Communicate with vendors
  - View inventory levels and reorder points
  - Generate purchasing reports
  - Cannot: Approve high-value POs, manage vendors, user management, financial analytics
  
#### 11. Warehouse Manager
- **Warehouse Operations Leadership**: Oversee warehouse and inventory operations
- **Permissions**:
  - Full access to inventory dashboard and analytics
  - Manage SKUs, warehouses, bins, and locations
  - Oversee stock movements and cycle counts
  - Approve inventory adjustments
  - Manage warehouse personnel
  - Create and review purchase orders
  - Set reorder points and stock levels
  - View inventory valuation and turnover reports
  - Cannot: Work order management, CRM, user administration, system settings
  
#### 12. Warehouse Personnel
- **Warehouse Operations**: Handle day-to-day inventory tasks
- **Permissions**:
  - Access to inventory management features
  - Process stock movements (receiving, picking, transfers)
  - Update bin locations and quantities
  - Perform cycle counts
  - Use barcode scanner for inventory
  - View SKU information and stock levels
  - Generate pick lists and packing slips
  - Cannot: Create SKUs, approve adjustments, create POs, access analytics, user management
  
#### 13. Accounting
- **Financial Management**: Manage financial data and reporting
- **Permissions**:
  - Full access to financial dashboard and reports
  - View all revenue and expense data
  - Manage accounts receivable and payable
  - Process invoices and payments
  - Reconcile accounts
  - Generate financial reports (P&L, balance sheet, cash flow)
  - View all work order financial data
  - Access audit logs for financial transactions
  - Cannot: Create/edit work orders, manage inventory (view only), user management, system settings
  
#### 14. Sales/CRM User
- **Customer Relations**: Manage leads and customer accounts
- **Permissions**:
  - Full access to CRM dashboard
  - Manage accounts, contacts, leads, notes
  - Create work orders for customers
  - View revenue by customer
  - Generate CRM reports
  - Cannot: Inventory, purchasing, system administration
  
#### 15. Viewer/Analyst
- **Read-Only Access**: View dashboards and reports without modification
- **Permissions**:
  - View-only access to dashboards
  - Generate and export reports
  - View analytics
  - Cannot: Create, edit, or delete any data

---

### Role & Permission Customization

**Important**: The roles and permissions documented above represent the **default configuration** of the system. The permission system is fully customizable to meet the specific needs of each organization.

#### Customization Capabilities

**1. Default Roles**
- All 15 roles are pre-configured with the permissions listed above
- These defaults serve as a starting point and best-practice templates
- Organizations can use them as-is or customize to fit their workflows
- **Special Note**: Owner/CEO role has additional protection and cannot be edited by Admins unless Super Admin grants permission

**2. Role Customization**
- Users with appropriate access (Super Admin/Admin) can **add or remove permissions** from any role at any time
- Each role can be tailored to match specific job responsibilities
- Permissions can be modified without affecting users already assigned to that role (changes apply immediately)

**3. User Permission Assignment**
There are two methods to assign permissions to users:

**Option A: Assign Entire Role**
- Grant a user all permissions associated with a specific role
- Quick setup for standard positions
- Example: Assign "Technician" role → user gets all technician permissions

**Option B: Cherry-Pick Individual Permissions**
- Select specific permissions for a user regardless of role
- Create custom permission sets for unique positions
- Example: Grant "View Dashboard" + "Create Work Orders" + "View Inventory" without assigning a full role

**4. Dynamic Permission Management**
- Admins can add new permissions to existing roles as the system evolves
- Permissions can be removed from roles when responsibilities change
- No limit to the number of custom permission combinations

**5. Permission Flexibility**
- Organizations are not limited to the 15 default roles
- Can create entirely new roles with custom permission sets
- Can modify default roles extensively (add/remove/change permissions)
- Each user can have a unique permission set if needed
- **Protected Roles**: Certain roles (like Owner/CEO) can be locked from Admin editing via the "can be edited by admin" toggle

#### Access Control for Permission Management
- **Super Admin**: Full access to create, modify, and delete roles and permissions; can toggle "can be edited by admin" setting on any role
- **Admin**: Can view roles and assign permissions to users (limited role editing); **cannot edit roles where "can be edited by admin" is disabled** (e.g., Owner/CEO by default)
- **Owner/CEO**: Cannot modify roles or permissions; this is a protected executive role
- **Other Roles**: Cannot modify role or permission configurations

#### Best Practices
- Start with default roles for standard positions
- Customize roles based on actual job responsibilities
- Regularly audit permission assignments for security
- Document any customizations to default roles for training purposes
- Use the principle of least privilege (grant only necessary permissions)

---

### Technical Implementation Guide for Custom Roles & Permissions

This section provides detailed technical guidance for implementing the customizable role and permission system.

#### Database Schema Design

**1. Roles Table**
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  is_default BOOLEAN DEFAULT false,  -- True for the 15 system default roles
  is_custom BOOLEAN DEFAULT false,   -- True for user-created roles
  can_be_edited_by_admin BOOLEAN DEFAULT true,  -- False for protected roles like Owner/CEO
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  tenant_id UUID REFERENCES tenants(id),
  
  CONSTRAINT unique_role_per_tenant UNIQUE(name, tenant_id)
);

CREATE INDEX idx_roles_tenant ON roles(tenant_id);
CREATE INDEX idx_roles_is_default ON roles(is_default);
CREATE INDEX idx_roles_can_be_edited_by_admin ON roles(can_be_edited_by_admin);
```

**2. Permissions Table**
```sql
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,  -- e.g., "work_orders:create"
  resource VARCHAR(50) NOT NULL,       -- e.g., "work_orders"
  action VARCHAR(50) NOT NULL,         -- e.g., "create", "read", "update", "delete"
  description TEXT,
  category VARCHAR(50),                -- e.g., "operations", "financial", "admin"
  is_system BOOLEAN DEFAULT true,      -- System permissions vs custom permissions
  created_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT unique_permission_name UNIQUE(resource, action)
);

CREATE INDEX idx_permissions_resource ON permissions(resource);
CREATE INDEX idx_permissions_category ON permissions(category);
```

**3. Role-Permission Mapping Table**
```sql
CREATE TABLE role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  granted_by UUID REFERENCES users(id),
  granted_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT unique_role_permission UNIQUE(role_id, permission_id)
);

CREATE INDEX idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX idx_role_permissions_permission ON role_permissions(permission_id);
```

**4. User-Role Assignment Table**
```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES users(id),
  assigned_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,  -- Optional: for temporary role assignments
  
  CONSTRAINT unique_user_role UNIQUE(user_id, role_id)
);

CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role_id);
```

**5. User-Permission Overrides Table**
```sql
-- For cherry-picked permissions that override role defaults
CREATE TABLE user_permission_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  is_granted BOOLEAN NOT NULL,  -- True = granted, False = explicitly denied
  granted_by UUID REFERENCES users(id),
  granted_at TIMESTAMP DEFAULT NOW(),
  reason TEXT,  -- Why this override was applied
  
  CONSTRAINT unique_user_permission UNIQUE(user_id, permission_id)
);

CREATE INDEX idx_user_permission_overrides_user ON user_permission_overrides(user_id);
```

**6. Permission Audit Log Table**
```sql
CREATE TABLE permission_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL,  -- "role_assigned", "permission_granted", "permission_revoked"
  target_user_id UUID REFERENCES users(id),
  target_role_id UUID REFERENCES roles(id),
  target_permission_id UUID REFERENCES permissions(id),
  old_value JSONB,
  new_value JSONB,
  reason TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  tenant_id UUID REFERENCES tenants(id)
);

CREATE INDEX idx_permission_audit_user ON permission_audit_log(user_id);
CREATE INDEX idx_permission_audit_target ON permission_audit_log(target_user_id);
CREATE INDEX idx_permission_audit_created ON permission_audit_log(created_at DESC);
```

---

#### Data Models / DTOs

**Permission Model**
```typescript
interface Permission {
  id: string;
  name: string;              // "work_orders:create"
  resource: string;          // "work_orders"
  action: string;            // "create"
  description: string;
  category: 'operations' | 'financial' | 'admin' | 'warehouse' | 'crm';
  isSystem: boolean;
  createdAt: Date;
}
```

**Role Model**
```typescript
interface Role {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;        // One of the 15 system defaults
  isCustom: boolean;         // User-created custom role
  canBeEditedByAdmin: boolean; // False for protected roles (Owner/CEO)
  permissions: Permission[]; // All permissions assigned to this role
  userCount?: number;        // Number of users with this role
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  tenantId: string;
}
```

**User Permission Set Model**
```typescript
interface UserPermissionSet {
  userId: string;
  roles: Role[];                    // All roles assigned to user
  effectivePermissions: Permission[]; // Computed final permission set
  permissionOverrides: {
    permissionId: string;
    isGranted: boolean;
    reason: string;
  }[];
}
```

**Create/Update Role DTO**
```typescript
interface CreateRoleDto {
  name: string;
  description: string;
  permissionIds: string[];   // Initial permissions to assign
  tenantId: string;
}

interface UpdateRoleDto {
  name?: string;
  description?: string;
  permissionIds?: string[];  // Replace all permissions
}

interface AddPermissionsToRoleDto {
  roleId: string;
  permissionIds: string[];
}

interface RemovePermissionsFromRoleDto {
  roleId: string;
  permissionIds: string[];
}
```

**Assign Permissions DTO**
```typescript
interface AssignRoleToUserDto {
  userId: string;
  roleId: string;
  expiresAt?: Date;
  reason?: string;
}

interface GrantPermissionOverrideDto {
  userId: string;
  permissionId: string;
  isGranted: boolean;  // true = grant, false = explicitly deny
  reason: string;
}
```

---

#### API Endpoints

**Role Management Endpoints**

```typescript
// GET /api/v1/roles
// List all roles (with optional filters)
// Query params: ?includePermissions=true&isDefault=true&isCustom=false
GET /api/v1/roles
Response: {
  roles: Role[];
  total: number;
}

// GET /api/v1/roles/:roleId
// Get single role with all permissions
GET /api/v1/roles/:roleId
Response: Role

// POST /api/v1/roles
// Create new custom role
POST /api/v1/roles
Body: CreateRoleDto
Response: Role

// PUT /api/v1/roles/:roleId
// Update role (name, description, permissions)
PUT /api/v1/roles/:roleId
Body: UpdateRoleDto
Response: Role

// DELETE /api/v1/roles/:roleId
// Delete custom role (cannot delete default roles)
DELETE /api/v1/roles/:roleId
Response: { success: true, message: string }

// POST /api/v1/roles/:roleId/permissions
// Add permissions to a role
POST /api/v1/roles/:roleId/permissions
Body: { permissionIds: string[] }
Response: Role

// DELETE /api/v1/roles/:roleId/permissions
// Remove permissions from a role
DELETE /api/v1/roles/:roleId/permissions
Body: { permissionIds: string[] }
Response: Role

// POST /api/v1/roles/:roleId/clone
// Clone an existing role (useful for creating custom variants)
POST /api/v1/roles/:roleId/clone
Body: { name: string, description: string }
Response: Role
```

**Permission Management Endpoints**

```typescript
// GET /api/v1/permissions
// List all available permissions
// Query params: ?category=operations&resource=work_orders
GET /api/v1/permissions
Response: {
  permissions: Permission[];
  total: number;
  categories: string[];
  resources: string[];
}

// GET /api/v1/permissions/:permissionId
// Get single permission details
GET /api/v1/permissions/:permissionId
Response: Permission

// POST /api/v1/permissions
// Create custom permission (Super Admin only)
POST /api/v1/permissions
Body: {
  name: string;
  resource: string;
  action: string;
  description: string;
  category: string;
}
Response: Permission
```

**User Permission Assignment Endpoints**

```typescript
// GET /api/v1/users/:userId/permissions
// Get user's complete permission set (roles + overrides)
GET /api/v1/users/:userId/permissions
Response: UserPermissionSet

// POST /api/v1/users/:userId/roles
// Assign role to user
POST /api/v1/users/:userId/roles
Body: AssignRoleToUserDto
Response: { success: true, userPermissionSet: UserPermissionSet }

// DELETE /api/v1/users/:userId/roles/:roleId
// Remove role from user
DELETE /api/v1/users/:userId/roles/:roleId
Response: { success: true }

// POST /api/v1/users/:userId/permission-overrides
// Grant or deny specific permission (cherry-pick)
POST /api/v1/users/:userId/permission-overrides
Body: GrantPermissionOverrideDto
Response: { success: true, userPermissionSet: UserPermissionSet }

// DELETE /api/v1/users/:userId/permission-overrides/:permissionId
// Remove permission override
DELETE /api/v1/users/:userId/permission-overrides/:permissionId
Response: { success: true }

// GET /api/v1/users/:userId/check-permission/:permissionName
// Check if user has specific permission
GET /api/v1/users/:userId/check-permission/:permissionName
Response: { hasPermission: boolean, source: 'role' | 'override' | 'denied' }
```

**Permission Audit Endpoints**

```typescript
// GET /api/v1/audit/permissions
// Get permission change audit log
// Query params: ?userId=xxx&startDate=xxx&endDate=xxx&action=role_assigned
GET /api/v1/audit/permissions
Response: {
  logs: PermissionAuditLog[];
  total: number;
}
```

---

#### Permission Checking Logic

**Core Permission Checking Function**
```typescript
class PermissionService {
  /**
   * Check if user has a specific permission
   * Priority: Explicit Deny > Explicit Grant > Role-based Permission
   */
  async checkPermission(
    userId: string,
    permissionName: string // e.g., "work_orders:create"
  ): Promise<boolean> {
    // 1. Check for explicit denial in overrides
    const denial = await this.db.userPermissionOverrides.findFirst({
      where: {
        userId,
        permission: { name: permissionName },
        isGranted: false // Explicit denial
      }
    });
    
    if (denial) {
      return false; // Explicit denial takes highest priority
    }
    
    // 2. Check for explicit grant in overrides
    const grant = await this.db.userPermissionOverrides.findFirst({
      where: {
        userId,
        permission: { name: permissionName },
        isGranted: true
      }
    });
    
    if (grant) {
      return true; // Explicit grant
    }
    
    // 3. Check role-based permissions
    const rolePermission = await this.db.userRoles.findFirst({
      where: {
        userId,
        role: {
          rolePermissions: {
            some: {
              permission: { name: permissionName }
            }
          }
        }
      }
    });
    
    return !!rolePermission;
  }
  
  /**
   * Get all effective permissions for a user
   */
  async getUserEffectivePermissions(userId: string): Promise<Permission[]> {
    // Get permissions from all assigned roles
    const rolePermissions = await this.db.rolePermissions.findMany({
      where: {
        role: {
          userRoles: {
            some: { userId }
          }
        }
      },
      include: { permission: true }
    });
    
    // Get permission overrides
    const overrides = await this.db.userPermissionOverrides.findMany({
      where: { userId, isGranted: true },
      include: { permission: true }
    });
    
    // Get explicit denials
    const denials = await this.db.userPermissionOverrides.findMany({
      where: { userId, isGranted: false },
      include: { permission: true }
    });
    
    const deniedIds = new Set(denials.map(d => d.permission.id));
    
    // Combine and deduplicate
    const allPermissions = new Map<string, Permission>();
    
    // Add role-based permissions
    rolePermissions.forEach(rp => {
      if (!deniedIds.has(rp.permission.id)) {
        allPermissions.set(rp.permission.id, rp.permission);
      }
    });
    
    // Add granted overrides
    overrides.forEach(o => {
      allPermissions.set(o.permission.id, o.permission);
    });
    
    return Array.from(allPermissions.values());
  }
  
  /**
   * Bulk permission check for multiple permissions
   */
  async checkMultiplePermissions(
    userId: string,
    permissionNames: string[]
  ): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};
    
    for (const permissionName of permissionNames) {
      results[permissionName] = await this.checkPermission(userId, permissionName);
    }
    
    return results;
  }
}
```

**Authorization Guard/Middleware Example**
```typescript
// NestJS Guard Example
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private permissionService: PermissionService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler()
    );
    
    if (!requiredPermissions) {
      return true; // No permissions required
    }
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // Check if user has ALL required permissions (AND logic)
    for (const permission of requiredPermissions) {
      const hasPermission = await this.permissionService.checkPermission(
        user.id,
        permission
      );
      
      if (!hasPermission) {
        throw new ForbiddenException(
          `Missing required permission: ${permission}`
        );
      }
    }
    
    return true;
  }
}

// Usage in controllers
@Controller('work-orders')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class WorkOrderController {
  @Post()
  @Permissions('work_orders:create')
  async createWorkOrder(@Body() dto: CreateWorkOrderDto) {
    // Only users with 'work_orders:create' permission can access this
  }
  
  @Delete(':id')
  @Permissions('work_orders:delete', 'admin:all')
  async deleteWorkOrder(@Param('id') id: string) {
    // Requires BOTH permissions
  }
}
```

---

#### Permission Naming Convention

Follow a consistent naming pattern for permissions:

**Format**: `{resource}:{action}:{scope?}`

**Examples**:
```
work_orders:create
work_orders:read:own          // Read only own work orders
work_orders:read:all          // Read all work orders
work_orders:update:own
work_orders:update:all
work_orders:delete

inventory:read
inventory:create
inventory:update
inventory:adjust              // Special action for inventory adjustments

users:create
users:update
users:delete
users:manage_roles            // Special action for role management

dashboard:view:executive
dashboard:view:operations
dashboard:view:financial

reports:export
reports:generate
reports:schedule

admin:all                     // Super admin wildcard
```

---

#### Seeding Default Roles & Permissions

**Seed Script Example**
```typescript
async function seedRolesAndPermissions() {
  // 1. Create all system permissions first
  const permissions = await createSystemPermissions();
  
  // 2. Create the 14 default roles
  const roles = await createDefaultRoles();
  
  // 3. Assign permissions to default roles
  await assignDefaultPermissions(roles, permissions);
}

async function createSystemPermissions() {
  const permissionDefinitions = [
    // Work Orders
    { resource: 'work_orders', action: 'create', category: 'operations' },
    { resource: 'work_orders', action: 'read:own', category: 'operations' },
    { resource: 'work_orders', action: 'read:all', category: 'operations' },
    { resource: 'work_orders', action: 'update:own', category: 'operations' },
    { resource: 'work_orders', action: 'update:all', category: 'operations' },
    { resource: 'work_orders', action: 'delete', category: 'operations' },
    
    // Inventory
    { resource: 'inventory', action: 'read', category: 'warehouse' },
    { resource: 'inventory', action: 'create', category: 'warehouse' },
    { resource: 'inventory', action: 'update', category: 'warehouse' },
    { resource: 'inventory', action: 'adjust', category: 'warehouse' },
    
    // Dashboards
    { resource: 'dashboard', action: 'view:executive', category: 'admin' },
    { resource: 'dashboard', action: 'view:operations', category: 'operations' },
    { resource: 'dashboard', action: 'view:financial', category: 'financial' },
    
    // Financial
    { resource: 'financial', action: 'view:revenue', category: 'financial' },
    { resource: 'financial', action: 'view:expenses', category: 'financial' },
    { resource: 'financial', action: 'manage', category: 'financial' },
    
    // ... more permissions
  ];
  
  return await Promise.all(
    permissionDefinitions.map(p => 
      db.permission.create({
        data: {
          name: `${p.resource}:${p.action}`,
          resource: p.resource,
          action: p.action,
          category: p.category,
          isSystem: true
        }
      })
    )
  );
}

async function createDefaultRoles() {
  const roleDefinitions = [
    { 
      name: 'Super Admin', 
      description: 'Full system access', 
      isDefault: true,
      canBeEditedByAdmin: false  // Protected from Admins
    },
    { 
      name: 'Owner/CEO', 
      description: 'Executive leadership with all operational permissions', 
      isDefault: true,
      canBeEditedByAdmin: false  // Protected - only Super Admin can modify
    },
    { 
      name: 'Admin', 
      description: 'Business management', 
      isDefault: true,
      canBeEditedByAdmin: true
    },
    { 
      name: 'Field Manager', 
      description: 'Field operations leadership', 
      isDefault: true,
      canBeEditedByAdmin: true
    },
    // ... all 15 roles (remaining 11 with canBeEditedByAdmin: true)
  ];
  
  return await Promise.all(
    roleDefinitions.map(r => 
      db.role.create({ data: r })
    )
  );
}
```

---

#### Implementation Best Practices

1. **Caching Strategy**
   - Cache user permissions in Redis/memory with TTL
   - Invalidate cache when permissions change
   - Use cache key pattern: `user:{userId}:permissions`

2. **Performance Optimization**
   - Lazy-load permissions (don't fetch on every request)
   - Use database indexes on foreign keys
   - Batch permission checks when possible

3. **Security Considerations**
   - Always validate permission names against whitelist
   - Log all permission changes in audit table
   - Prevent users from escalating their own privileges
   - Require Super Admin approval for sensitive permission grants

4. **Error Handling**
   - Return 403 Forbidden with clear error messages
   - Don't leak system information in permission errors
   - Log failed permission checks for security monitoring

5. **Testing**
   - Unit test permission checking logic thoroughly
   - Integration test role assignment flows
   - Test permission inheritance and overrides
   - Test edge cases (expired roles, deleted permissions)

---

### Permission Matrix

#### Management & Operations Roles

| Feature/Module | Super Admin | Owner/CEO | Admin | Field Manager | Lead Dispatch | Dispatcher | Lead Tech | Technician |
|----------------|-------------|-----------|-------|---------------|---------------|------------|-----------|------------|
| Executive Dashboard | Full | Full | Full | View | View | View | No | No |
| Analytics & Reports | Full | Full | Full | Limited | Limited | No | Limited | No |
| Work Orders | Full | Full | Full | Full | Full | Full | Own+Team | Own Only |
| Inventory | Full | Full | Full | View | Limited | Limited | View | Scanner |
| CRM | Full | Full | Full | View | View | View | View | View |
| Dispatch | Full | Full | Full | Full | Full | Full | Limited | Own Only |
| Purchasing | Full | Full | Full | No | No | No | No | No |
| User Management | Full | No* | Limited | No | No | No | No | No |
| System Settings | Full | No | No | No | No | No | No | No |
| Audit Logs | Full | View | View | No | No | No | No | No |
| Financial Data | Full | Full | Full | Limited | Limited | No | No | No |

**\*Owner/CEO Note**: Cannot manage users/roles unless Super Admin grants permission

#### Warehouse & Purchasing Roles

| Feature/Module | Purchasing Mgr | Purchasing | Warehouse Mgr | Warehouse Personnel |
|----------------|----------------|------------|---------------|---------------------|
| Executive Dashboard | View | No | View | No |
| Analytics & Reports | Limited | No | Limited | No |
| Work Orders | View | No | View | No |
| Inventory | View | View | Full | Full |
| CRM | No | No | No | No |
| Dispatch | No | No | No | No |
| Purchasing | Full | Create/Track | Create | No |
| User Management | No | No | No | No |
| System Settings | No | No | No | No |
| Audit Logs | No | No | No | No |
| Financial Data | Limited | No | Limited | No |

**Note**: Owner/CEO has Full access to all Warehouse & Purchasing features (Inventory: Full, Purchasing: Full, etc.)

#### Support Roles

| Feature/Module | Accounting | Sales/CRM | Viewer/Analyst |
|----------------|------------|-----------|----------------|
| Executive Dashboard | Full | View | View |
| Analytics & Reports | Full | Limited | View |
| Work Orders | View | Create | View |
| Inventory | View | View | View |
| CRM | View | Full | View |
| Dispatch | View | No | View |
| Purchasing | View | No | View |
| User Management | No | No | No |
| System Settings | No | No | No |
| Audit Logs | Full (Financial) | No | No |
| Financial Data | Full | Limited | View |

**Note**: Owner/CEO has Full access to all Support role features (Accounting: Full, CRM: Full, Reports: Full)

**Legend:**
- **Full**: Complete CRUD access and management
- **Create**: Can create but limited edit/delete
- **View**: Read-only access
- **Limited**: Restricted subset of features
- **Own Only**: Access only to items assigned to user
- **Own+Team**: Access to own and team members' items
- **Scanner**: Mobile scanner access only
- **Create/Track**: Can create and track but not approve
- **No**: No access to this feature

---

