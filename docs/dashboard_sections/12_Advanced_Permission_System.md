## Advanced Permission System Recommendations

This section outlines 12 enhancements to the role and permission system to improve security, usability, and flexibility. These recommendations are organized by priority and complexity.

### Priority 1: Must Have (Phase 1 Implementation)

#### 1. Team-Scoped User Management Permissions

**Problem**: Manager roles (Field Manager, Purchasing Manager, Warehouse Manager) need to manage their team members but shouldn't have full user management access.

**Solution**: Add scope-based user management permissions instead of binary yes/no.

**Permission Structure**:
```typescript
// Current: Binary user management
permissions: ['users:manage']  // All or nothing

// Proposed: Granular scope-based permissions
permissions: [
  'users:view:all',              // View all users
  'users:view:own_team',          // View only team members
  'users:create',                 // Create new users
  'users:edit:all',               // Edit any user
  'users:edit:own_team',          // Edit only team members (NEW)
  'users:delete',                 // Delete users
  'users:assign_roles:all',       // Assign any role to anyone
  'users:assign_roles:own_team',  // Assign roles to team only (NEW)
  'users:deactivate:own_team'     // Deactivate team members (NEW)
]
```

**Database Schema Addition**:
```sql
ALTER TABLE permissions ADD COLUMN scope VARCHAR(50);
-- Values: 'all', 'own_team', 'own_department', 'own', null (default)

-- Add team relationship to users
ALTER TABLE users ADD COLUMN team_id UUID REFERENCES teams(id);
ALTER TABLE users ADD COLUMN department VARCHAR(100);
```

**Updated Role Permissions**:
- **Field Manager**: `users:edit:own_team`, `users:assign_roles:own_team` (for Field Techs and Lead Techs)
- **Purchasing Manager**: `users:edit:own_team`, `users:assign_roles:own_team` (for Purchasing team)
- **Warehouse Manager**: `users:edit:own_team`, `users:assign_roles:own_team` (for Warehouse Personnel)
- **Lead Dispatch**: `users:view:own_team` (view dispatchers only)

**Implementation Example**:
```typescript
// Permission checking service
async canEditUser(currentUser: User, targetUser: User, permission: string): Promise<boolean> {
  const userPermissions = await this.getUserPermissions(currentUser.id);
  
  // Check for 'users:edit:all' permission
  if (userPermissions.includes('users:edit:all')) {
    return true;
  }
  
  // Check for 'users:edit:own_team' permission
  if (userPermissions.includes('users:edit:own_team')) {
    return currentUser.teamId === targetUser.teamId;
  }
  
  return false;
}
```

**Benefits**:
- Managers can handle routine team tasks without escalation
- Reduces Super Admin/Admin workload
- Better organizational hierarchy
- Clear audit trail of who managed whom

---

#### 2. Permission Groups/Categories

**Problem**: With 100+ individual permissions, assignment becomes tedious and error-prone.

**Solution**: Group related permissions into logical bundles that can be assigned together while still allowing individual permission cherry-picking.

**Database Schema**:
```sql
CREATE TABLE permission_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50),  -- 'work_orders', 'inventory', 'financial', etc.
  is_system BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permission_group_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES permission_groups(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(group_id, permission_id)
);

-- Assign groups to roles
CREATE TABLE role_permission_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  group_id UUID REFERENCES permission_groups(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(role_id, group_id)
);
```

**TypeScript Models**:
```typescript
interface PermissionGroup {
  id: string;
  name: string;
  description: string;
  category: 'work_orders' | 'inventory' | 'purchasing' | 'financial' | 'crm' | 'dispatch' | 'admin';
  permissions: Permission[];
  isSystem: boolean;
}

// Example groups
const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    name: 'Work Order Basic Access',
    category: 'work_orders',
    permissions: [
      'work_orders:read:own',
      'work_orders:update:own',
      'work_orders:create_notes',
      'work_orders:upload_photos'
    ]
  },
  {
    name: 'Work Order Full Management',
    category: 'work_orders',
    permissions: [
      'work_orders:read:all',
      'work_orders:create',
      'work_orders:update:all',
      'work_orders:delete',
      'work_orders:approve',
      'work_orders:assign',
      'work_orders:close'
    ]
  },
  {
    name: 'Inventory Viewer',
    category: 'inventory',
    permissions: [
      'inventory:read:all',
      'inventory:search',
      'inventory:export'
    ]
  },
  {
    name: 'Inventory Manager',
    category: 'inventory',
    permissions: [
      'inventory:read:all',
      'inventory:create',
      'inventory:update',
      'inventory:delete',
      'inventory:adjust',
      'inventory:transfer',
      'inventory:count'
    ]
  },
  {
    name: 'Financial Viewer',
    category: 'financial',
    permissions: [
      'financial:view:revenue',
      'financial:view:expenses',
      'financial:view:reports',
      'dashboard:view:financial'
    ]
  },
  {
    name: 'Financial Manager',
    category: 'financial',
    permissions: [
      'financial:view:all',
      'financial:manage:invoices',
      'financial:manage:payments',
      'financial:approve:expenses',
      'financial:export'
    ]
  },
  {
    name: 'Dispatch Basic',
    category: 'dispatch',
    permissions: [
      'dispatch:view:schedule',
      'dispatch:assign:work_orders',
      'dispatch:update:status'
    ]
  },
  {
    name: 'Dispatch Advanced',
    category: 'dispatch',
    permissions: [
      'dispatch:view:all',
      'dispatch:create:work_orders',
      'dispatch:reassign:any',
      'dispatch:optimize:routes',
      'dispatch:manage:overtime'
    ]
  }
];
```

**API Endpoints**:
```typescript
// Get all permission groups
GET /api/v1/permission-groups
Response: PermissionGroup[]

// Get permissions in a group
GET /api/v1/permission-groups/:groupId/permissions
Response: Permission[]

// Assign permission group to role
POST /api/v1/roles/:roleId/permission-groups
Body: { groupId: string }

// Assign permission group to user (override)
POST /api/v1/users/:userId/permission-groups
Body: { groupId: string, expiresAt?: Date }
```

**Benefits**:
- Faster role customization (assign groups instead of 50+ individual permissions)
- Reduces human error in permission assignment
- Logical organization makes system easier to understand
- Still allows individual permission cherry-picking when needed
- Easier onboarding for new admins

---

#### 3. Data-Level Permission Scopes (Row-Level Security)

**Problem**: Current permissions are feature-based (can access work orders) but not data-based (which work orders). Need explicit scopes for "own", "team", "department", "all".

**Solution**: Add data scope to every permission and enforce at query level.

**Permission Naming Convention**:
```
Format: {resource}:{action}:{scope}

Examples:
- work_orders:read:own          // Only own work orders
- work_orders:read:team         // Team's work orders
- work_orders:read:department   // Department work orders
- work_orders:read:all          // All work orders
- work_orders:update:own        // Update only own
- work_orders:update:team       // Update team's work orders
- work_orders:delete:all        // Delete any work order
```

**Database Schema Update**:
```sql
ALTER TABLE permissions ADD COLUMN data_scope VARCHAR(20);
-- Values: 'own', 'team', 'department', 'all', 'none'

-- Add organizational structure to users
ALTER TABLE users ADD COLUMN department_id UUID REFERENCES departments(id);
ALTER TABLE users ADD COLUMN team_id UUID REFERENCES teams(id);

CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  parent_id UUID REFERENCES departments(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  department_id UUID REFERENCES departments(id),
  manager_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**TypeScript Models**:
```typescript
type DataScope = 'own' | 'team' | 'department' | 'all' | 'none';

interface Permission {
  id: string;
  name: string;          // Full name: work_orders:read:team
  resource: string;      // work_orders
  action: string;        // read
  dataScope: DataScope;  // team
  category: string;
  isSystem: boolean;
}

interface User {
  id: string;
  email: string;
  teamId?: string;
  departmentId?: string;
  // ... other fields
}
```

**Permission Checking Service**:
```typescript
class PermissionService {
  async checkDataAccess(
    userId: string,
    resource: string,
    action: string,
    targetData: any
  ): Promise<boolean> {
    const user = await this.getUser(userId);
    const permissions = await this.getUserPermissions(userId);
    
    // Find matching permission
    const permission = permissions.find(p => 
      p.resource === resource && p.action === action
    );
    
    if (!permission) return false;
    
    // Check scope
    switch (permission.dataScope) {
      case 'all':
        return true;
        
      case 'department':
        return targetData.departmentId === user.departmentId;
        
      case 'team':
        return targetData.teamId === user.teamId;
        
      case 'own':
        return targetData.userId === userId || 
               targetData.createdBy === userId ||
               targetData.assignedTo === userId;
        
      case 'none':
        return false;
        
      default:
        return false;
    }
  }
  
  // Generate WHERE clause based on permissions
  async getDataScopeFilter(
    userId: string,
    resource: string,
    action: string
  ): Promise<Prisma.WorkOrderWhereInput> {
    const user = await this.getUser(userId);
    const permissions = await this.getUserPermissions(userId);
    
    const permission = permissions.find(p => 
      p.resource === resource && p.action === action
    );
    
    if (!permission) {
      throw new UnauthorizedException();
    }
    
    switch (permission.dataScope) {
      case 'all':
        return {};  // No filter
        
      case 'department':
        return { departmentId: user.departmentId };
        
      case 'team':
        return { teamId: user.teamId };
        
      case 'own':
        return {
          OR: [
            { assignedTo: userId },
            { createdBy: userId }
          ]
        };
        
      default:
        throw new UnauthorizedException();
    }
  }
}
```

**Usage in Controllers**:
```typescript
@Get('work-orders')
async getWorkOrders(@CurrentUser() user: User) {
  // Get scope filter based on permissions
  const scopeFilter = await this.permissionService.getDataScopeFilter(
    user.id,
    'work_orders',
    'read'
  );
  
  // Apply filter to query
  const workOrders = await this.prisma.workOrder.findMany({
    where: {
      ...scopeFilter,
      // ... other filters
    }
  });
  
  return workOrders;
}
```

**Updated Permission Matrix Examples**:
| Role | Work Orders | Inventory | Financial |
|------|-------------|-----------|-----------|
| Technician | read:own, update:own | read:all | none |
| Lead Tech | read:team, update:team | read:all | none |
| Field Manager | read:all, update:all | read:all | read:department |
| Admin | read:all, update:all, delete:all | read:all, update:all | read:all |

**Benefits**:
- Explicit, enforceable data boundaries
- Better multi-tenant support
- Prevents unauthorized data access
- Clear audit trail of who accessed what data
- Easier to reason about security

---

#### 4. Simplified Owner/CEO Permission Implementation

**Problem**: Owner/CEO is defined as "all permissions from all roles except Super Admin" which is complex to maintain as roles evolve.

**Solution**: Use dynamic permission aggregation or wildcard permissions with exclusions.

**Option 1: Dynamic Permission Aggregation** (Recommended)
```typescript
class OwnerCeoPermissionService {
  async getOwnerCeoPermissions(): Promise<Permission[]> {
    // Get all roles except Super Admin
    const allRoles = await this.prisma.role.findMany({
      where: { 
        name: { not: 'Super Admin' }
      },
      include: {
        rolePermissions: {
          include: { permission: true }
        }
      }
    });
    
    // Aggregate all unique permissions
    const allPermissions = new Map<string, Permission>();
    
    for (const role of allRoles) {
      for (const rp of role.rolePermissions) {
        allPermissions.set(rp.permission.id, rp.permission);
      }
    }
    
    return Array.from(allPermissions.values());
  }
  
  async assignOwnerCeoRole(userId: string): Promise<void> {
    // Create user role assignment
    await this.prisma.userRole.create({
      data: {
        userId,
        roleId: OWNER_CEO_ROLE_ID
      }
    });
    
    // Owner/CEO permissions are computed dynamically, not stored
  }
  
  async getUserPermissions(userId: string): Promise<Permission[]> {
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: { role: true }
    });
    
    // Check if user has Owner/CEO role
    const hasOwnerCeoRole = userRoles.some(
      ur => ur.role.name === 'Owner/CEO'
    );
    
    if (hasOwnerCeoRole) {
      // Return dynamically aggregated permissions
      return await this.getOwnerCeoPermissions();
    }
    
    // ... regular permission logic
  }
}
```

**Option 2: Permission Wildcard System**
```typescript
interface Permission {
  id: string;
  name: string;
  resource: string;  // Can be '*' for wildcard
  action: string;    // Can be '*' for wildcard
  dataScope: string;
  excludes?: string[]; // Excluded permissions
}

// Owner/CEO permission definition
const OWNER_CEO_PERMISSION: Permission = {
  id: 'owner-ceo-wildcard',
  name: 'owner:all_operational',
  resource: '*',
  action: '*',
  dataScope: 'all',
  excludes: [
    'system:*',           // All system permissions
    'roles:manage:*',     // Role management
    'users:delete:*',     // User deletion
    'audit:delete:*',     // Audit log deletion
    'api_keys:*'          // API key management
  ]
};

// Permission checking with wildcard support
function hasPermission(
  userPermissions: Permission[],
  required: string
): boolean {
  for (const perm of userPermissions) {
    // Check for wildcard match
    if (perm.resource === '*' && perm.action === '*') {
      // Check if required permission is excluded
      const isExcluded = perm.excludes?.some(exclude => 
        required.match(new RegExp(exclude.replace('*', '.*')))
      );
      
      if (!isExcluded) return true;
    }
    
    // Regular permission match
    if (perm.name === required) return true;
  }
  
  return false;
}
```

**Database Seeding**:
```typescript
async function seedOwnerCeoRole() {
  // Create Owner/CEO role
  const ownerCeoRole = await prisma.role.create({
    data: {
      name: 'Owner/CEO',
      description: 'Executive leadership with all operational permissions',
      isDefault: true,
      canBeEditedByAdmin: false
    }
  });
  
  // Option 1: No permissions stored (dynamic aggregation)
  // Permissions are computed at runtime from all other roles
  
  // Option 2: Store wildcard permission
  const wildcardPermission = await prisma.permission.create({
    data: {
      name: 'owner:all_operational',
      resource: '*',
      action: '*',
      dataScope: 'all',
      category: 'executive',
      isSystem: true
    }
  });
  
  await prisma.rolePermission.create({
    data: {
      roleId: ownerCeoRole.id,
      permissionId: wildcardPermission.id
    }
  });
}
```

**Benefits**:
- Automatically includes new permissions added to other roles
- No manual maintenance needed when permissions change
- Clear exclusion of Super Admin capabilities
- Simple to understand and audit
- Reduces permission synchronization issues

**Recommendation**: Use **Option 1 (Dynamic Aggregation)** for better clarity and auditability. Cache the result with invalidation when roles/permissions change.

---

### Priority 2: Should Have (Phase 2 Implementation)

#### 5. Role Templates and Inheritance

**Problem**: Creating custom roles from scratch is complex with 100+ permissions. Need easier way to create variations of existing roles.

**Solution**: Add role templates with inheritance and modification capabilities.

**Database Schema**:
```sql
CREATE TABLE role_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  base_role_id UUID REFERENCES roles(id),  -- Inherit from this role
  is_system BOOLEAN DEFAULT false,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role_template_modifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID REFERENCES role_templates(id) ON DELETE CASCADE,
  modification_type VARCHAR(20) NOT NULL,  -- 'add' or 'remove'
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE roles ADD COLUMN based_on_template_id UUID REFERENCES role_templates(id);
ALTER TABLE roles ADD COLUMN inherits_from_role_id UUID REFERENCES roles(id);
```

**TypeScript Models**:
```typescript
interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  baseRoleId?: string;  // Role to inherit from
  modifications: RoleModification[];
  isSystem: boolean;
  createdBy: string;
}

interface RoleModification {
  type: 'add' | 'remove';
  permissionId: string;
  permission?: Permission;
}

interface Role {
  id: string;
  name: string;
  description: string;
  basedOnTemplateId?: string;
  inheritsFromRoleId?: string;  // Parent role for inheritance
  // ... other fields
}
```

**Example Role Templates**:
```typescript
const ROLE_TEMPLATES = [
  {
    name: 'Senior Technician',
    baseRole: 'Technician',
    modifications: [
      { type: 'add', permission: 'work_orders:approve:own' },
      { type: 'add', permission: 'technicians:mentor' },
      { type: 'add', permission: 'dashboard:view:operations' },
      { type: 'add', permission: 'training:access:advanced' }
    ]
  },
  {
    name: 'Regional Manager',
    baseRole: 'Field Manager',
    modifications: [
      { type: 'add', permission: 'users:manage:region' },
      { type: 'add', permission: 'financial:view:region' },
      { type: 'add', permission: 'reports:regional:all' }
    ]
  },
  {
    name: 'Inventory Specialist',
    baseRole: 'Warehouse Personnel',
    modifications: [
      { type: 'add', permission: 'inventory:create:sku' },
      { type: 'add', permission: 'inventory:adjust:small' },
      { type: 'add', permission: 'reports:inventory:basic' }
    ]
  },
  {
    name: 'Limited Admin',
    baseRole: 'Admin',
    modifications: [
      { type: 'remove', permission: 'financial:manage' },
      { type: 'remove', permission: 'users:delete' },
      { type: 'remove', permission: 'purchasing:approve:large' }
    ]
  }
];
```

**API Endpoints**:
```typescript
// Create role from template
POST /api/v1/roles/from-template
Body: {
  templateId: string,
  name: string,
  description?: string,
  additionalModifications?: RoleModification[]
}

// Clone existing role
POST /api/v1/roles/:roleId/clone
Body: {
  name: string,
  modifications?: RoleModification[]
}

// Get role with inheritance tree
GET /api/v1/roles/:roleId/inheritance
Response: {
  role: Role,
  inheritedFrom?: Role,
  effectivePermissions: Permission[]
}
```

**Role Creation Service**:
```typescript
class RoleTemplateService {
  async createRoleFromTemplate(
    templateId: string,
    name: string,
    modifications?: RoleModification[]
  ): Promise<Role> {
    const template = await this.getTemplate(templateId);
    
    // Get base role permissions
    const basePermissions = await this.getRolePermissions(template.baseRoleId);
    
    // Apply template modifications
    let effectivePermissions = this.applyModifications(
      basePermissions,
      template.modifications
    );
    
    // Apply additional custom modifications
    if (modifications) {
      effectivePermissions = this.applyModifications(
        effectivePermissions,
        modifications
      );
    }
    
    // Create new role
    const role = await this.prisma.role.create({
      data: {
        name,
        basedOnTemplateId: templateId,
        inheritsFromRoleId: template.baseRoleId
      }
    });
    
    // Assign permissions
    await this.assignPermissions(role.id, effectivePermissions);
    
    return role;
  }
  
  applyModifications(
    permissions: Permission[],
    modifications: RoleModification[]
  ): Permission[] {
    let result = [...permissions];
    
    for (const mod of modifications) {
      if (mod.type === 'add') {
        if (!result.find(p => p.id === mod.permissionId)) {
          result.push(mod.permission);
        }
      } else if (mod.type === 'remove') {
        result = result.filter(p => p.id !== mod.permissionId);
      }
    }
    
    return result;
  }
}
```

**Benefits**:
- Easy creation of role variations
- Clear inheritance chain for understanding
- Reduces duplication of permission assignments
- Faster role customization
- Changes to templates can cascade (optional)

---

#### 6. Approval Workflows for Sensitive Permissions

**Problem**: Some permission changes are too sensitive for immediate effect (e.g., granting financial access, editing Owner/CEO role).

**Solution**: Add approval workflow system for permission and role changes.

**Database Schema**:
```sql
CREATE TABLE permission_change_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requested_by UUID REFERENCES users(id) NOT NULL,
  target_user_id UUID REFERENCES users(id),
  target_role_id UUID REFERENCES roles(id),
  change_type VARCHAR(50) NOT NULL,  -- 'grant_permission', 'revoke_permission', 'assign_role', 'edit_role'
  permission_id UUID REFERENCES permissions(id),
  role_id UUID REFERENCES roles(id),
  reason TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',  -- 'pending', 'approved', 'rejected', 'expired'
  approved_by UUID REFERENCES users(id),
  approval_comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  resolved_at TIMESTAMP
);

CREATE TABLE approval_workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  trigger_condition JSONB NOT NULL,  -- Conditions that trigger approval
  required_approver_role VARCHAR(100),  -- Role that must approve
  auto_expire_hours INTEGER DEFAULT 72,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**TypeScript Models**:
```typescript
interface PermissionChangeRequest {
  id: string;
  requestedBy: string;
  targetUserId?: string;
  targetRoleId?: string;
  changeType: 'grant_permission' | 'revoke_permission' | 'assign_role' | 'edit_role' | 'create_role';
  permissionId?: string;
  roleId?: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  approvedBy?: string;
  approvalComment?: string;
  createdAt: Date;
  expiresAt: Date;
  resolvedAt?: Date;
}

interface ApprovalWorkflow {
  id: string;
  name: string;
  triggerCondition: {
    resourceType: string;  // 'permission', 'role', 'user'
    action: string;        // 'grant', 'revoke', 'edit'
    conditions: Array<{
      field: string;       // 'permission.category', 'role.name', etc.
      operator: string;    // 'equals', 'contains', 'in'
      value: any;
    }>;
  };
  requiredApproverRole: string;  // 'Super Admin', 'Owner/CEO', etc.
  autoExpireHours: number;
}
```

**Workflow Definitions**:
```typescript
const APPROVAL_WORKFLOWS: ApprovalWorkflow[] = [
  {
    name: 'Financial Permission Changes',
    triggerCondition: {
      resourceType: 'permission',
      action: 'grant',
      conditions: [
        { field: 'permission.category', operator: 'equals', value: 'financial' }
      ]
    },
    requiredApproverRole: 'Owner/CEO',
    autoExpireHours: 48
  },
  {
    name: 'Owner/CEO Role Changes',
    triggerCondition: {
      resourceType: 'role',
      action: 'edit',
      conditions: [
        { field: 'role.name', operator: 'equals', value: 'Owner/CEO' }
      ]
    },
    requiredApproverRole: 'Super Admin',
    autoExpireHours: 72
  },
  {
    name: 'User Deletion Requests',
    triggerCondition: {
      resourceType: 'user',
      action: 'delete',
      conditions: []
    },
    requiredApproverRole: 'Super Admin',
    autoExpireHours: 24
  },
  {
    name: 'Sensitive Permission Grants',
    triggerCondition: {
      resourceType: 'permission',
      action: 'grant',
      conditions: [
        { 
          field: 'permission.name', 
          operator: 'in', 
          value: ['users:delete', 'audit:delete', 'system:*'] 
        }
      ]
    },
    requiredApproverRole: 'Super Admin',
    autoExpireHours: 48
  }
];
```

**API Endpoints**:
```typescript
// Request permission change (returns request or applies immediately if no approval needed)
POST /api/v1/permission-change-requests
Body: {
  targetUserId: string,
  changeType: string,
  permissionId?: string,
  roleId?: string,
  reason: string
}
Response: {
  requiresApproval: boolean,
  requestId?: string,
  message: string
}

// Get pending requests (for approvers)
GET /api/v1/permission-change-requests/pending
Response: PermissionChangeRequest[]

// Approve/reject request
POST /api/v1/permission-change-requests/:requestId/approve
Body: { comment?: string }

POST /api/v1/permission-change-requests/:requestId/reject
Body: { comment: string }

// Get user's requests
GET /api/v1/users/:userId/permission-requests
Response: PermissionChangeRequest[]
```

**Approval Service**:
```typescript
class ApprovalWorkflowService {
  async requestPermissionChange(
    requestedBy: string,
    changeRequest: PermissionChangeRequest
  ): Promise<{ requiresApproval: boolean, requestId?: string }> {
    // Check if change requires approval
    const workflow = await this.findMatchingWorkflow(changeRequest);
    
    if (!workflow) {
      // No approval needed, apply immediately
      await this.applyPermissionChange(changeRequest);
      return { requiresApproval: false };
    }
    
    // Create approval request
    const request = await this.prisma.permissionChangeRequest.create({
      data: {
        ...changeRequest,
        requestedBy,
        status: 'pending',
        expiresAt: new Date(Date.now() + workflow.autoExpireHours * 60 * 60 * 1000)
      }
    });
    
    // Notify approvers
    await this.notifyApprovers(request, workflow);
    
    return { requiresApproval: true, requestId: request.id };
  }
  
  async approveRequest(requestId: string, approvedBy: string, comment?: string) {
    const request = await this.getRequest(requestId);
    
    // Verify approver has permission
    const canApprove = await this.canApproveRequest(approvedBy, request);
    if (!canApprove) {
      throw new UnauthorizedException('Insufficient permissions to approve');
    }
    
    // Update request
    await this.prisma.permissionChangeRequest.update({
      where: { id: requestId },
      data: {
        status: 'approved',
        approvedBy,
        approvalComment: comment,
        resolvedAt: new Date()
      }
    });
    
    // Apply the change
    await this.applyPermissionChange(request);
    
    // Notify requester
    await this.notifyRequester(request, 'approved');
    
    // Log to audit
    await this.auditLog.log({
      action: 'permission_request_approved',
      userId: approvedBy,
      details: { requestId, targetUserId: request.targetUserId }
    });
  }
  
  async findMatchingWorkflow(
    request: PermissionChangeRequest
  ): Promise<ApprovalWorkflow | null> {
    const workflows = await this.getActiveWorkflows();
    
    for (const workflow of workflows) {
      if (this.matchesWorkflow(request, workflow)) {
        return workflow;
      }
    }
    
    return null;
  }
}
```

**Benefits**:
- Prevents unauthorized privilege escalation
- Creates accountability for sensitive changes
- Audit trail of who requested and approved what
- Automatic expiration prevents stale requests
- Configurable workflows for different organizations

---

#### 7. Permission Conflict and Violation Detection

**Problem**: No system to prevent incompatible permission combinations or enforce separation of duties.

**Solution**: Add permission rule engine that validates permission assignments.

**Database Schema**:
```sql
CREATE TABLE permission_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  rule_type VARCHAR(50) NOT NULL,  -- 'conflict', 'prerequisite', 'mutual_exclusion', 'separation_of_duty'
  severity VARCHAR(20) DEFAULT 'warning',  -- 'error', 'warning', 'info'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permission_rule_conditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rule_id UUID REFERENCES permission_rules(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id),
  condition_type VARCHAR(50),  -- 'required', 'forbidden', 'prerequisite'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**TypeScript Models**:
```typescript
interface PermissionRule {
  id: string;
  name: string;
  description: string;
  ruleType: 'conflict' | 'prerequisite' | 'mutual_exclusion' | 'separation_of_duty';
  severity: 'error' | 'warning' | 'info';
  permissions: string[];  // Permission IDs involved
  isActive: boolean;
}

interface RuleViolation {
  rule: PermissionRule;
  violationType: string;
  message: string;
  affectedPermissions: Permission[];
  severity: 'error' | 'warning' | 'info';
}
```

**Rule Definitions**:
```typescript
const PERMISSION_RULES: PermissionRule[] = [
  {
    name: 'Separation of Duties: Work Order Creation and Approval',
    ruleType: 'conflict',
    severity: 'error',
    permissions: ['work_orders:create', 'work_orders:approve'],
    description: 'Users who create work orders should not approve them to prevent conflicts of interest'
  },
  {
    name: 'Financial Viewing Prerequisite',
    ruleType: 'prerequisite',
    severity: 'error',
    permissions: ['financial:manage', 'financial:view'],
    description: 'Must have financial:view before getting financial:manage'
  },
  {
    name: 'Mutual Exclusion: Technician and Dispatcher Roles',
    ruleType: 'mutual_exclusion',
    severity: 'warning',
    permissions: ['work_orders:execute:own', 'dispatch:assign:all'],
    description: 'Technicians should not assign their own work orders'
  },
  {
    name: 'Purchasing Approval Prerequisite',
    ruleType: 'prerequisite',
    severity: 'error',
    permissions: ['purchasing:approve', 'purchasing:create'],
    description: 'Must be able to create POs before approving them'
  },
  {
    name: 'Inventory Adjustment Requires View',
    ruleType: 'prerequisite',
    severity: 'error',
    permissions: ['inventory:adjust', 'inventory:read'],
    description: 'Cannot adjust inventory without viewing capability'
  },
  {
    name: 'Self-Permission Escalation Prevention',
    ruleType: 'conflict',
    severity: 'error',
    permissions: ['users:assign_roles', 'users:edit:own'],
    description: 'Users should not be able to change their own roles'
  }
];
```

**Rule Validation Service**:
```typescript
class PermissionRuleService {
  async validatePermissionAssignment(
    userId: string,
    newPermissions: string[]
  ): Promise<{ valid: boolean, violations: RuleViolation[] }> {
    const currentPermissions = await this.getUserPermissions(userId);
    const combinedPermissions = [...currentPermissions, ...newPermissions];
    
    const violations: RuleViolation[] = [];
    const rules = await this.getActiveRules();
    
    for (const rule of rules) {
      const violation = this.checkRule(rule, combinedPermissions);
      if (violation) {
        violations.push(violation);
      }
    }
    
    const hasErrors = violations.some(v => v.severity === 'error');
    
    return {
      valid: !hasErrors,
      violations
    };
  }
  
  checkRule(
    rule: PermissionRule,
    userPermissions: string[]
  ): RuleViolation | null {
    switch (rule.ruleType) {
      case 'conflict':
        return this.checkConflict(rule, userPermissions);
        
      case 'prerequisite':
        return this.checkPrerequisite(rule, userPermissions);
        
      case 'mutual_exclusion':
        return this.checkMutualExclusion(rule, userPermissions);
        
      case 'separation_of_duty':
        return this.checkSeparationOfDuty(rule, userPermissions);
        
      default:
        return null;
    }
  }
  
  checkConflict(rule: PermissionRule, userPermissions: string[]): RuleViolation | null {
    const hasAll = rule.permissions.every(p => userPermissions.includes(p));
    
    if (hasAll) {
      return {
        rule,
        violationType: 'conflict',
        message: rule.description,
        affectedPermissions: rule.permissions,
        severity: rule.severity
      };
    }
    
    return null;
  }
  
  checkPrerequisite(rule: PermissionRule, userPermissions: string[]): RuleViolation | null {
    // First permission is the one being granted
    // Second permission is the prerequisite
    const [granted, prerequisite] = rule.permissions;
    
    if (userPermissions.includes(granted) && !userPermissions.includes(prerequisite)) {
      return {
        rule,
        violationType: 'prerequisite',
        message: `${granted} requires ${prerequisite}`,
        affectedPermissions: rule.permissions,
        severity: rule.severity
      };
    }
    
    return null;
  }
}
```

**API Integration**:
```typescript
@Post('users/:userId/permissions')
async assignPermission(
  @Param('userId') userId: string,
  @Body() body: { permissionId: string }
) {
  // Validate against rules
  const validation = await this.ruleService.validatePermissionAssignment(
    userId,
    [body.permissionId]
  );
  
  if (!validation.valid) {
    const errors = validation.violations.filter(v => v.severity === 'error');
    throw new BadRequestException({
      message: 'Permission assignment violates security rules',
      violations: errors
    });
  }
  
  // Show warnings but allow assignment
  if (validation.violations.length > 0) {
    // Log warnings
    this.logger.warn('Permission assignment has warnings', {
      userId,
      violations: validation.violations
    });
  }
  
  // Proceed with assignment
  return await this.permissionService.assignPermission(userId, body.permissionId);
}
```

**Benefits**:
- Prevents privilege escalation
- Enforces security best practices
- Catches risky permission combinations
- Clear error messages for admins
- Configurable rules per organization
- Audit trail of violations

---

### Priority 3: Nice to Have (Future Enhancements)

#### 8. Time-Based and Conditional Permissions

**Problem**: Some permissions should be temporary or restricted to specific contexts (time, location, conditions).

**Solution**: Add permission modifiers for temporal and conditional access.

**Database Schema**:
```sql
CREATE TABLE permission_conditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_permission_id UUID REFERENCES user_permission_overrides(id) ON DELETE CASCADE,
  condition_type VARCHAR(50) NOT NULL,  -- 'time', 'ip', 'location', 'mfa', 'approval'
  condition_value JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**TypeScript Models**:
```typescript
interface PermissionCondition {
  type: 'time_restriction' | 'ip_restriction' | 'location_restriction' | 'mfa_required' | 'requires_approval';
  value: TimeRestriction | IpRestriction | LocationRestriction | MfaRequirement;
}

interface TimeRestriction {
  daysOfWeek: number[];  // 0-6 (Sunday-Saturday)
  startTime: string;     // HH:MM
  endTime: string;       // HH:MM
  timezone: string;
}

interface IpRestriction {
  allowedIps: string[];  // CIDR notation allowed
  allowedRanges: string[];
}

interface LocationRestriction {
  allowedCountries: string[];
  allowedRegions: string[];
  allowedCities: string[];
}

interface MfaRequirement {
  required: boolean;
  methods: ('totp' | 'sms' | 'email')[];
}

interface UserPermissionOverride {
  id: string;
  userId: string;
  permissionId: string;
  isGranted: boolean;
  expiresAt?: Date;
  conditions?: PermissionCondition[];  // NEW
  createdBy: string;
  reason?: string;
}
```

**Permission Checking with Conditions**:
```typescript
class ConditionalPermissionService {
  async checkPermissionWithConditions(
    userId: string,
    permissionName: string,
    context: {
      ipAddress?: string;
      location?: { country: string, region: string };
      hasMfa?: boolean;
      timestamp: Date;
    }
  ): Promise<boolean> {
    const permission = await this.getUserPermission(userId, permissionName);
    
    if (!permission) return false;
    
    // Check conditions
    if (permission.conditions) {
      for (const condition of permission.conditions) {
        const conditionMet = await this.evaluateCondition(condition, context);
        if (!conditionMet) return false;
      }
    }
    
    return true;
  }
  
  async evaluateCondition(
    condition: PermissionCondition,
    context: any
  ): Promise<boolean> {
    switch (condition.type) {
      case 'time_restriction':
        return this.checkTimeRestriction(condition.value, context.timestamp);
        
      case 'ip_restriction':
        return this.checkIpRestriction(condition.value, context.ipAddress);
        
      case 'mfa_required':
        return context.hasMfa === true;
        
      default:
        return true;
    }
  }
  
  checkTimeRestriction(restriction: TimeRestriction, timestamp: Date): boolean {
    const userTime = new Date(timestamp.toLocaleString('en-US', {
      timeZone: restriction.timezone
    }));
    
    const dayOfWeek = userTime.getDay();
    const timeStr = userTime.toTimeString().slice(0, 5); // HH:MM
    
    // Check day of week
    if (!restriction.daysOfWeek.includes(dayOfWeek)) {
      return false;
    }
    
    // Check time range
    if (timeStr < restriction.startTime || timeStr > restriction.endTime) {
      return false;
    }
    
    return true;
  }
  
  checkIpRestriction(restriction: IpRestriction, ipAddress: string): boolean {
    // Check if IP is in allowed list
    if (restriction.allowedIps.includes(ipAddress)) {
      return true;
    }
    
    // Check if IP is in allowed ranges (CIDR notation)
    for (const range of restriction.allowedRanges) {
      if (this.ipInRange(ipAddress, range)) {
        return true;
      }
    }
    
    return false;
  }
}
```

**Usage Examples**:
```typescript
// Grant temporary elevated access during business hours only
await permissionService.grantPermission({
  userId: 'user-123',
  permissionId: 'financial:view:all',
  expiresAt: new Date('2025-12-31'),
  conditions: [
    {
      type: 'time_restriction',
      value: {
        daysOfWeek: [1, 2, 3, 4, 5],  // Monday-Friday
        startTime: '09:00',
        endTime: '17:00',
        timezone: 'America/New_York'
      }
    }
  ]
});

// Require MFA for sensitive operations
await permissionService.grantPermission({
  userId: 'user-456',
  permissionId: 'users:delete',
  conditions: [
    {
      type: 'mfa_required',
      value: { required: true, methods: ['totp'] }
    }
  ]
});

// Restrict to office IP range
await permissionService.grantPermission({
  userId: 'user-789',
  permissionId: 'audit:view:all',
  conditions: [
    {
      type: 'ip_restriction',
      value: {
        allowedIps: [],
        allowedRanges: ['192.168.1.0/24', '10.0.0.0/8']
      }
    }
  ]
});
```

**Benefits**:
- Temporary elevated access for specific projects
- Restrict sensitive operations to business hours
- Require MFA for high-risk actions
- Limit access to specific locations/IPs
- Better compliance with security policies

---

#### 9. Permission Delegation System

**Problem**: When managers are on vacation or unavailable, there's no way to temporarily delegate their permissions.

**Solution**: Add delegation system for temporary permission transfer.

**Database Schema**:
```sql
CREATE TABLE permission_delegations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID REFERENCES users(id) NOT NULL,
  to_user_id UUID REFERENCES users(id) NOT NULL,
  delegation_type VARCHAR(50) DEFAULT 'specific',  -- 'all', 'role', 'specific'
  role_id UUID REFERENCES roles(id),  -- If delegating entire role
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  reason TEXT,
  approved_by UUID REFERENCES users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT no_self_delegation CHECK (from_user_id != to_user_id)
);

CREATE TABLE delegated_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  delegation_id UUID REFERENCES permission_delegations(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(delegation_id, permission_id)
);
```

**TypeScript Models**:
```typescript
interface PermissionDelegation {
  id: string;
  fromUserId: string;
  toUserId: string;
  delegationType: 'all' | 'role' | 'specific';
  roleId?: string;
  permissions?: Permission[];
  startDate: Date;
  endDate: Date;
  reason: string;
  approvedBy?: string;
  isActive: boolean;
}
```

**API Endpoints**:
```typescript
// Create delegation
POST /api/v1/delegations
Body: {
  toUserId: string,
  delegationType: 'all' | 'role' | 'specific',
  roleId?: string,
  permissionIds?: string[],
  startDate: Date,
  endDate: Date,
  reason: string
}

// Get user's delegations (given and received)
GET /api/v1/users/:userId/delegations
Response: {
  delegatedTo: PermissionDelegation[],
  delegatedFrom: PermissionDelegation[]
}

// Revoke delegation early
DELETE /api/v1/delegations/:delegationId

// Get active delegations requiring approval
GET /api/v1/delegations/pending-approval
```

**Delegation Service**:
```typescript
class DelegationService {
  async createDelegation(
    fromUserId: string,
    delegation: CreateDelegationDto
  ): Promise<PermissionDelegation> {
    // Validate delegation
    await this.validateDelegation(fromUserId, delegation);
    
    // Create delegation record
    const created = await this.prisma.permissionDelegation.create({
      data: {
        fromUserId,
        toUserId: delegation.toUserId,
        delegationType: delegation.delegationType,
        roleId: delegation.roleId,
        startDate: delegation.startDate,
        endDate: delegation.endDate,
        reason: delegation.reason,
        isActive: false  // Requires approval
      }
    });
    
    // Add specific permissions if type is 'specific'
    if (delegation.delegationType === 'specific' && delegation.permissionIds) {
      await this.addDelegatedPermissions(created.id, delegation.permissionIds);
    }
    
    // Request approval if needed
    if (this.requiresApproval(delegation)) {
      await this.requestApproval(created.id);
    } else {
      await this.activateDelegation(created.id);
    }
    
    return created;
  }
  
  async getUserEffectivePermissions(userId: string): Promise<Permission[]> {
    // Get user's own permissions
    const ownPermissions = await this.getOwnPermissions(userId);
    
    // Get delegated permissions (active and current)
    const delegations = await this.prisma.permissionDelegation.findMany({
      where: {
        toUserId: userId,
        isActive: true,
        startDate: { lte: new Date() },
        endDate: { gte: new Date() }
      },
      include: {
        delegatedPermissions: {
          include: { permission: true }
        }
      }
    });
    
    // Aggregate delegated permissions
    const delegatedPerms: Permission[] = [];
    for (const delegation of delegations) {
      if (delegation.delegationType === 'all') {
        const allFromUser = await this.getOwnPermissions(delegation.fromUserId);
        delegatedPerms.push(...allFromUser);
      } else if (delegation.delegationType === 'role') {
        const rolePerms = await this.getRolePermissions(delegation.roleId);
        delegatedPerms.push(...rolePerms);
      } else {
        delegatedPerms.push(...delegation.delegatedPermissions.map(dp => dp.permission));
      }
    }
    
    // Combine and deduplicate
    return this.uniquePermissions([...ownPermissions, ...delegatedPerms]);
  }
  
  // Auto-expire delegations
  @Cron('0 0 * * *')  // Daily at midnight
  async expireDelegations() {
    await this.prisma.permissionDelegation.updateMany({
      where: {
        endDate: { lt: new Date() },
        isActive: true
      },
      data: { isActive: false }
    });
  }
}
```

**Benefits**:
- Continuity when managers are unavailable
- No permanent permission changes needed
- Full audit trail of delegations
- Automatic expiration prevents orphaned permissions
- Approval workflow for sensitive delegations

---

#### 10. Bulk Permission Operations

**Problem**: Assigning/revoking permissions for multiple users one-by-one is time-consuming.

**Solution**: Add bulk operation APIs.

**API Endpoints**:
```typescript
// Bulk assign permissions to multiple users
POST /api/v1/permissions/bulk-assign
Body: {
  userIds: string[],
  permissionIds?: string[],
  roleId?: string,
  reason: string,
  expiresAt?: Date
}

// Bulk revoke permissions
POST /api/v1/permissions/bulk-revoke
Body: {
  userIds: string[],
  permissionIds?: string[],
  roleId?: string,
  reason: string
}

// Bulk role assignment
POST /api/v1/roles/bulk-assign
Body: {
  userIds: string[],
  roleId: string,
  reason: string
}

// Bulk user import with roles
POST /api/v1/users/bulk-import
Body: {
  users: Array<{
    email: string,
    name: string,
    roleIds: string[],
    permissionIds?: string[]
  }>,
  sendWelcomeEmail: boolean
}
```

**Bulk Operation Service**:
```typescript
class BulkPermissionService {
  async bulkAssignPermissions(
    dto: BulkAssignDto,
    performedBy: string
  ): Promise<{ success: number, failed: number, errors: any[] }> {
    const results = {
      success: 0,
      failed: 0,
      errors: []
    };
    
    // Use transaction for atomicity
    await this.prisma.$transaction(async (tx) => {
      for (const userId of dto.userIds) {
        try {
          // Validate
          const validation = await this.ruleService.validatePermissionAssignment(
            userId,
            dto.permissionIds
          );
          
          if (!validation.valid) {
            results.errors.push({
              userId,
              error: 'Permission rule violation',
              violations: validation.violations
            });
            results.failed++;
            continue;
          }
          
          // Assign permissions
          for (const permissionId of dto.permissionIds) {
            await tx.userPermissionOverride.create({
              data: {
                userId,
                permissionId,
                isGranted: true,
                expiresAt: dto.expiresAt,
                createdBy: performedBy,
                reason: dto.reason
              }
            });
          }
          
          results.success++;
          
        } catch (error) {
          results.errors.push({ userId, error: error.message });
          results.failed++;
        }
      }
    });
    
    // Audit log
    await this.auditLog.log({
      action: 'bulk_permission_assign',
      userId: performedBy,
      details: { ...dto, results }
    });
    
    return results;
  }
}
```

**Benefits**:
- Faster team onboarding
- Consistent permission assignment
- Project-based access management
- Better audit trail
- Reduced admin workload

---

#### 11. Permission Testing and Simulation

**Problem**: Admins don't know what impact permission changes will have before applying them.

**Solution**: Add "what-if" testing and simulation.

**API Endpoints**:
```typescript
// Simulate permission changes
POST /api/v1/permissions/simulate
Body: {
  userId: string,
  proposedChanges: {
    addRoles?: string[],
    removeRoles?: string[],
    addPermissions?: string[],
    removePermissions?: string[]
  }
}
Response: {
  currentPermissions: Permission[],
  effectivePermissions: Permission[],
  newCapabilities: string[],
  removedCapabilities: string[],
  conflicts: RuleViolation[],
  warnings: string[]
}

// Test if user would have permission
POST /api/v1/permissions/test
Body: {
  userId: string,
  permissionName: string,
  context?: {
    ipAddress?: string,
    timestamp?: Date,
    hasMfa?: boolean
  }
}
Response: {
  hasPermission: boolean,
  reason: string,
  conditions?: PermissionCondition[]
}

// Compare two users' permissions
GET /api/v1/permissions/compare
Query: { userId1, userId2 }
Response: {
  user1Only: Permission[],
  user2Only: Permission[],
  shared: Permission[]
}
```

**Simulation Service**:
```typescript
class PermissionSimulationService {
  async simulateChanges(
    userId: string,
    changes: ProposedChanges
  ): Promise<SimulationResult> {
    // Get current state
    const currentPermissions = await this.permissionService.getUserPermissions(userId);
    
    // Simulate changes
    let effectivePermissions = [...currentPermissions];
    
    // Add role permissions
    if (changes.addRoles) {
      for (const roleId of changes.addRoles) {
        const rolePerms = await this.getRolePermissions(roleId);
        effectivePermissions.push(...rolePerms);
      }
    }
    
    // Remove role permissions
    if (changes.removeRoles) {
      for (const roleId of changes.removeRoles) {
        const rolePerms = await this.getRolePermissions(roleId);
        effectivePermissions = effectivePermissions.filter(
          p => !rolePerms.find(rp => rp.id === p.id)
        );
      }
    }
    
    // Add individual permissions
    if (changes.addPermissions) {
      const perms = await this.getPermissions(changes.addPermissions);
      effectivePermissions.push(...perms);
    }
    
    // Remove individual permissions
    if (changes.removePermissions) {
      effectivePermissions = effectivePermissions.filter(
        p => !changes.removePermissions.includes(p.id)
      );
    }
    
    // Deduplicate
    effectivePermissions = this.uniquePermissions(effectivePermissions);
    
    // Check for conflicts
    const conflicts = await this.ruleService.validatePermissions(
      userId,
      effectivePermissions.map(p => p.id)
    );
    
    // Calculate differences
    const newCapabilities = this.calculateNewCapabilities(
      currentPermissions,
      effectivePermissions
    );
    
    const removedCapabilities = this.calculateRemovedCapabilities(
      currentPermissions,
      effectivePermissions
    );
    
    return {
      currentPermissions,
      effectivePermissions,
      newCapabilities,
      removedCapabilities,
      conflicts: conflicts.violations,
      warnings: this.generateWarnings(effectivePermissions)
    };
  }
  
  calculateNewCapabilities(current: Permission[], proposed: Permission[]): string[] {
    const newPerms = proposed.filter(
      p => !current.find(c => c.id === p.id)
    );
    
    return newPerms.map(p => this.describeCapability(p));
  }
  
  describeCapability(permission: Permission): string {
    const descriptions = {
      'work_orders:delete:all': 'Delete any work order',
      'financial:view:all': 'View all financial data',
      'users:delete': 'Delete user accounts',
      // ... more descriptions
    };
    
    return descriptions[permission.name] || permission.name;
  }
}
```

**UI Integration**:
```typescript
// Admin UI - Role assignment with preview
function RoleAssignmentForm() {
  const [simulation, setSimulation] = useState(null);
  
  const handleRoleChange = async (roleId) => {
    const result = await api.post('/permissions/simulate', {
      userId: selectedUser.id,
      proposedChanges: { addRoles: [roleId] }
    });
    
    setSimulation(result);
  };
  
  return (
    <div>
      <select onChange={(e) => handleRoleChange(e.target.value)}>
        {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
      </select>
      
      {simulation && (
        <div className="simulation-preview">
          <h3>Preview of Changes</h3>
          
          <div className="new-capabilities">
            <h4>New Capabilities ({simulation.newCapabilities.length})</h4>
            <ul>
              {simulation.newCapabilities.map(cap => <li key={cap}>{cap}</li>)}
            </ul>
          </div>
          
          {simulation.conflicts.length > 0 && (
            <div className="conflicts">
              <h4>⚠️ Conflicts Detected</h4>
              {simulation.conflicts.map(conflict => (
                <div key={conflict.rule.id} className="conflict-item">
                  {conflict.message}
                </div>
              ))}
            </div>
          )}
          
          <button onClick={applyChanges}>Apply Changes</button>
        </div>
      )}
    </div>
  );
}
```

**Benefits**:
- Preview permission changes before applying
- Understand impact of role assignments
- Training tool for new admins
- Prevent accidental privilege escalation
- Better change management

---

#### 12. Enhanced Admin Permission Restrictions

**Problem**: Admin role has broad access but unclear boundaries, especially for audit logs.

**Solution**: More granular Admin permissions with limited audit access.

**Updated Admin Permissions**:
```typescript
const ADMIN_PERMISSIONS = [
  // User Management (Limited)
  'users:view:all',
  'users:create',
  'users:edit',              // Can edit users
  'users:deactivate',        // Can deactivate (not delete)
  // 'users:delete' - REMOVED (Super Admin only)
  
  // Role Management (Conditional)
  'roles:view',
  'roles:edit:editable',     // Only roles where can_be_edited_by_admin = true
  'roles:create:custom',     // Can create new roles
  // 'roles:edit:protected' - REMOVED (Super Admin only)
  
  // Audit Logs (Limited)
  'audit:view:user_activity',      // NEW: View user login/logout
  'audit:view:business_operations', // NEW: View work orders, inventory changes
  'audit:view:financial',           // NEW: View financial transactions
  // 'audit:view:system' - REMOVED (Super Admin only for system changes)
  // 'audit:view:permissions' - REMOVED (Super Admin only for role/permission changes)
  // 'audit:delete' - REMOVED (Super Admin only)
  
  // Full Business Access
  'work_orders:*',
  'inventory:*',
  'purchasing:*',
  'crm:*',
  'dispatch:*',
  'financial:*',
  'dashboard:*',
  'reports:*'
];
```

**Audit Log Categories**:
```sql
ALTER TABLE audit_logs ADD COLUMN log_category VARCHAR(50);
-- Categories: 'user_activity', 'business_operations', 'financial', 'system', 'permissions'

CREATE INDEX idx_audit_logs_category ON audit_logs(log_category);
```

**Audit Access Control**:
```typescript
class AuditLogService {
  async getAuditLogs(
    userId: string,
    filters: AuditLogFilters
  ): Promise<AuditLog[]> {
    const userPermissions = await this.permissionService.getUserPermissions(userId);
    
    // Build category filter based on permissions
    const allowedCategories: string[] = [];
    
    if (userPermissions.includes('audit:view:user_activity')) {
      allowedCategories.push('user_activity');
    }
    if (userPermissions.includes('audit:view:business_operations')) {
      allowedCategories.push('business_operations');
    }
    if (userPermissions.includes('audit:view:financial')) {
      allowedCategories.push('financial');
    }
    if (userPermissions.includes('audit:view:system')) {
      allowedCategories.push('system');
    }
    if (userPermissions.includes('audit:view:permissions')) {
      allowedCategories.push('permissions');
    }
    
    if (allowedCategories.length === 0) {
      throw new UnauthorizedException('No audit log access');
    }
    
    return await this.prisma.auditLog.findMany({
      where: {
        log_category: { in: allowedCategories },
        ...filters
      },
      orderBy: { created_at: 'desc' }
    });
  }
}
```

**Benefits**:
- Admins can view business-related audit logs
- System configuration changes remain Super Admin only
- Better separation of duties
- Clearer permission boundaries
- Compliance-friendly audit access

---

