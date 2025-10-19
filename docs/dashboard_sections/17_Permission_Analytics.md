## Permission System Analytics & Self-Service

### 1. Permission Usage Analytics

**Priority**: Should Have

**Database Schema**:
```sql
CREATE TABLE permission_usage_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  permission_id UUID REFERENCES permissions(id),
  user_id UUID REFERENCES users(id),
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMP,
  date DATE,
  INDEX idx_permission_date (permission_id, date),
  INDEX idx_user_date (user_id, date),
  UNIQUE(permission_id, user_id, date)
);

CREATE TABLE toxic_permission_combinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  permission_ids UUID[],
  risk_level VARCHAR(20),  -- 'low', 'medium', 'high', 'critical'
  description TEXT,
  affected_users_count INTEGER DEFAULT 0,
  detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);
```

**Analytics Service**:
```typescript
@Injectable()
export class PermissionAnalyticsService {
  async trackPermissionUsage(userId: string, permission: string): Promise<void> {
    const today = startOfDay(new Date());
    
    await this.prisma.permissionUsageAnalytics.upsert({
      where: {
        permissionId_userId_date: {
          permissionId: permission.id,
          userId,
          date: today
        }
      },
      update: {
        usageCount: { increment: 1 },
        lastUsedAt: new Date()
      },
      create: {
        permissionId: permission.id,
        userId,
        date: today,
        usageCount: 1,
        lastUsedAt: new Date()
      }
    });
  }
  
  async getUnusedPermissions(userId: string, days: number = 90): Promise<Permission[]> {
    const cutoffDate = subDays(new Date(), days);
    
    const userPermissions = await this.getUserPermissions(userId);
    const usedPermissions = await this.prisma.permissionUsageAnalytics.findMany({
      where: {
        userId,
        lastUsedAt: { gte: cutoffDate }
      },
      select: { permissionId: true }
    });
    
    const usedIds = new Set(usedPermissions.map(p => p.permissionId));
    
    return userPermissions.filter(p => !usedIds.has(p.id));
  }
  
  async detectToxicCombinations(): Promise<ToxicCombination[]> {
    // Find users with dangerous permission combinations
    const users = await this.prisma.user.findMany({
      include: {
        roleAssignments: {
          include: {
            role: {
              include: {
                permissions: true
              }
            }
          }
        }
      }
    });
    
    const toxicCombinations = [];
    
    for (const user of users) {
      const permissions = this.getUserEffectivePermissions(user);
      
      // Check for separation of duties violations
      if (
        permissions.includes('work_orders:create') &&
        permissions.includes('work_orders:approve')
      ) {
        toxicCombinations.push({
          userId: user.id,
          permissions: ['work_orders:create', 'work_orders:approve'],
          riskLevel: 'high',
          description: 'User can create and approve their own work orders'
        });
      }
      
      // Check for financial access violations
      if (
        permissions.includes('financial:view:all') &&
        permissions.includes('financial:modify') &&
        permissions.includes('audit:delete')
      ) {
        toxicCombinations.push({
          userId: user.id,
          permissions: ['financial:view:all', 'financial:modify', 'audit:delete'],
          riskLevel: 'critical',
          description: 'User has unrestricted financial access and can delete audit logs'
        });
      }
    }
    
    return toxicCombinations;
  }
  
  async generateAccessReviewReport(): Promise<AccessReviewReport> {
    return {
      totalUsers: await this.prisma.user.count(),
      usersWithOverprivileges: await this.getUsersWithUnusedPermissions(90),
      toxicCombinations: await this.detectToxicCombinations(),
      expiredPermissions: await this.getExpiredPermissions(),
      pendingApprovals: await this.getPendingApprovalRequests(),
      lastReviewDate: await this.getLastReviewDate()
    };
  }
}
```

**API Endpoints**:
```typescript
GET /api/v1/analytics/permissions/usage
Query: { userId?, startDate, endDate }

GET /api/v1/analytics/permissions/unused
Query: { userId, days }

GET /api/v1/analytics/permissions/toxic-combinations

GET /api/v1/analytics/access-review
Response: AccessReviewReport
```

**Benefits**:
- Identify unused permissions (least privilege)
- Detect risky permission combinations
- Compliance reporting
- Optimize role definitions

---

### 2. Self-Service Permission Requests

**Priority**: Should Have

**Database Schema**:
```sql
CREATE TABLE self_service_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID REFERENCES users(id),
  request_type VARCHAR(50),  -- 'permission', 'role', 'access_extension'
  permission_ids UUID[],
  role_id UUID REFERENCES roles(id),
  business_justification TEXT NOT NULL,
  duration_days INTEGER,  -- For temporary access
  status VARCHAR(20) DEFAULT 'pending',
  approver_id UUID REFERENCES users(id),
  approval_comment TEXT,
  auto_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved_at TIMESTAMP,
  expires_at TIMESTAMP
);
```

**Self-Service Portal Component**:
```typescript
function PermissionRequestPortal() {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [justification, setJustification] = useState('');
  const [duration, setDuration] = useState<number>(30);  // days
  
  const requestAccess = async () => {
    const request = await api.post('/api/v1/self-service/request', {
      permissionIds: selectedPermissions,
      businessJustification: justification,
      durationDays: duration
    });
    
    if (request.autoApproved) {
      toast.success('Access granted automatically!');
    } else {
      toast.info('Your request has been submitted for approval.');
    }
  };
  
  return (
    <div className="permission-request-portal">
      <h2>Request Additional Access</h2>
      
      <PermissionCatalog
        onSelectPermissions={setSelectedPermissions}
        selected={selectedPermissions}
      />
      
      <TextArea
        label="Business Justification (Required)"
        value={justification}
        onChange={(e) => setJustification(e.target.value)}
        placeholder="Explain why you need this access and how it relates to your work..."
        required
      />
      
      <Select
        label="Access Duration"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      >
        <option value={7}>7 days (temporary)</option>
        <option value={30}>30 days</option>
        <option value={90}>90 days</option>
        <option value={0}>Permanent (requires manager approval)</option>
      </Select>
      
      <button onClick={requestAccess}>Submit Request</button>
    </div>
  );
}

// Manager approval interface
function PendingApprovals() {
  const { data: requests } = useQuery('/api/v1/self-service/pending');
  
  const approveRequest = async (requestId: string, comment?: string) => {
    await api.post(`/api/v1/self-service/${requestId}/approve`, { comment });
    toast.success('Request approved');
  };
  
  const rejectRequest = async (requestId: string, comment: string) => {
    await api.post(`/api/v1/self-service/${requestId}/reject`, { comment });
    toast.info('Request rejected');
  };
  
  return (
    <div>
      <h2>Pending Access Requests</h2>
      {requests.map(request => (
        <RequestCard key={request.id}>
          <div>
            <strong>{request.requester.name}</strong> requests access to:
            <ul>
              {request.permissions.map(p => <li key={p.id}>{p.name}</li>)}
            </ul>
            <p><strong>Justification:</strong> {request.businessJustification}</p>
            <p><strong>Duration:</strong> {request.durationDays} days</p>
          </div>
          <div className="actions">
            <button onClick={() => approveRequest(request.id)}>Approve</button>
            <button onClick={() => rejectRequest(request.id, 'Not justified')}>Reject</button>
          </div>
        </RequestCard>
      ))}
    </div>
  );
}
```

**Auto-Approval Rules**:
```typescript
interface AutoApprovalRule {
  id: string;
  permissionIds: string[];
  conditions: Array<{
    field: string;  // 'user.role', 'user.department', 'permission.category'
    operator: string;
    value: any;
  }>;
  maxDurationDays: number;
  requiresJustification: boolean;
}

// Example: Auto-approve inventory view for warehouse personnel
const AUTO_APPROVAL_RULES: AutoApprovalRule[] = [
  {
    permissionIds: ['inventory:read:all', 'inventory:search'],
    conditions: [
      { field: 'user.department', operator: 'equals', value: 'warehouse' }
    ],
    maxDurationDays: 90,
    requiresJustification: true
  },
  {
    permissionIds: ['work_orders:read:team'],
    conditions: [
      { field: 'user.role', operator: 'in', value: ['Lead Tech', 'Field Manager'] }
    ],
    maxDurationDays: 0,  // Permanent
    requiresJustification: true
  }
];
```

**Benefits**:
- Reduce admin workload
- Faster access provisioning
- Better auditability
- Employee empowerment

---

