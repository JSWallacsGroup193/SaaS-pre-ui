# OpsNex HVAC Management System - Technical Reference

**Version:** 1.0  
**Last Updated:** October 21, 2025  
**Purpose:** Complete technical reference for AI prompts and development context

---

## ✅ **1. CURRENT TECH STACK**

### **Frontend Stack**
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 5.x
- **Routing:** React Router v6
- **State Management:** Zustand (auth store at `frontend/src/store/useAuthStore.ts`)
- **HTTP Client:** Axios with JWT interceptors (`frontend/src/services/api.ts`)
- **UI Library:** shadcn/ui components + Tailwind CSS v3
- **Form Handling:** React Hook Form + Zod validation
- **Charts & Visualization:** Recharts (used in forecasting dashboard)
- **Barcode Features:** 
  - JsBarcode (barcode generation)
  - html5-qrcode (camera-based scanning)
- **Icons:** Lucide React
- **Date Handling:** Native JavaScript Date API

### **Backend Stack**
- **Framework:** NestJS 10 + TypeScript
- **ORM:** Prisma 5.x
- **Database:** PostgreSQL (Replit/Neon managed)
- **Authentication:** JWT via @nestjs/jwt
- **Validation:** class-validator, class-transformer
- **Security:** Helmet (HTTP headers), CORS enabled for all origins
- **API Documentation:** @nestjs/swagger (Swagger UI at `/api/v1/docs`)
- **Password Hashing:** bcrypt
- **Environment:** Node.js (managed via Replit modules)

### **External Services**
- **AI Integration:** OpenAI API (GPT model for chat assistant)
- **Database:** PostgreSQL via Replit/Neon
- **Deployment:** Replit (configured for port 5000 frontend, 3000 backend)

### **Development Tools**
- **Package Manager:** npm
- **Version Control:** Git
- **Code Style:** ESLint + Prettier
- **TypeScript:** Strict mode enabled

---

## ✅ **2. APP PURPOSE & DESCRIPTION**

### **What is OpsNex?**
OpsNex is a comprehensive **HVAC Management SaaS platform** designed for HVAC service companies to manage their entire business operations from a single platform.

### **Primary Business Functions**

#### **Work Order Management**
- Create, assign, and track service jobs from initial request to completion
- Status tracking (Pending, In Progress, Completed, Cancelled)
- Priority levels (Low, Medium, High, Emergency)
- Task and parts tracking per work order
- Notes and timeline views

#### **Customer Relationship Management (CRM)**
- Manage customer accounts with complete contact information
- Track contacts associated with each account
- Lead management with conversion tracking
- Activity notes and customer history
- Relationship mapping between accounts and contacts

#### **Inventory & Parts Management**
- SKU tracking with categories and descriptions
- Multi-warehouse and bin location management
- Stock ledger system with real-time on-hand quantities
- Inventory movement tracking (receipts, issues, adjustments)
- Low stock alerts and reorder points

#### **Purchasing**
- Create and manage purchase orders
- Vendor management
- PO receiving workflow with inventory integration
- Status tracking (Pending, Received, Cancelled)
- Cost tracking per SKU

#### **Dispatch & Scheduling**
- Drag-and-drop technician scheduling interface
- Calendar view with weekly scheduling
- Unassigned work orders panel
- Real-time backend persistence of assignments
- Technician workload visualization

#### **Demand Forecasting**
- AI-powered inventory forecasting
- Historical vs. forecasted demand charts
- KPI cards: Forecasted Demand, Stockout Risk, Overstock Items, Forecast Accuracy
- Priority-based reorder recommendations
- Top movers analysis with trend indicators
- Time period selection (7/30/60/90 days)

### **Operational Tools**

#### **Field Tools**
- **21 HVAC Calculators** organized into 6 categories:
  1. **Electrical:** Ohm's Law, Power Calculation, Capacitor Sizing
  2. **Refrigeration:** Superheat, Subcool, Charge Calculation
  3. **Airflow:** CFM Calculation, Static Pressure, Duct Sizing
  4. **Gas/Combustion:** BTU Calculation, Combustion Analysis
  5. **Hydronic/Boiler:** Heat Loss, Flow Rate
  6. **Utilities:** Unit Conversions, Quick Reference
- Save calculation results directly to work orders
- Professional UI with input validation

#### **Barcode Scanner**
- Camera-based scanning using html5-qrcode
- Supports 8 barcode formats: QR Code, EAN-13/8, UPC-A/E, Code-128/39, ITF
- Exact and fuzzy SKU matching via API
- Real-time backend lookup at `/api/v1/scanner/:barcode`
- Direct navigation to SKU detail pages
- Animated scanning UI with pulsing teal corners

#### **Labels Generator**
- Multi-SKU label creation with search and select
- Customizable label sizes: 2x1, 3x2, 4x2, 4x3 inches
- Selectable fields: SKU, name, category, barcode, price, date
- JsBarcode CODE128 barcode generation
- Live preview before printing
- Quantity control per SKU
- Print/PDF export for batch production

#### **AI Assistant**
- OpenAI-powered HVAC technical expert
- HVAC-specific quick suggestions (superheat calculation, diagnostics, procedures)
- Real-time typing indicator with animated dots
- ReactMarkdown support for formatted responses and code blocks
- Feedback buttons (copy, thumbs up/down)
- Full integration with OpenAI backend API

### **Administrative Features**

#### **Super Admin Panel** (Restricted Access)
- **Dashboard:** System-wide metrics (total users, tenants, roles, permissions)
- **User Management:** 
  - CRUD operations for all users across tenants
  - Activate/deactivate user accounts
  - Assign roles to users
  - Add users to existing tenants
- **Role Management:**
  - View and edit roles
  - Assign permissions to roles
  - System roles (like SUPER_ADMIN) are protected from deletion
- **Tenant Management:**
  - View all tenants
  - Update tenant information
  - Activate/deactivate tenant accounts
- **RBAC System:** 38 granular permissions across 5 categories (users, roles, permissions, tenants, system)

#### **User Settings**
- **Profile Tab:** Update name, email, phone, avatar
- **Security Tab:** Change password with current password verification
- **Notifications Tab:** Toggle email, work order, and inventory alerts (UI ready)
- Email uniqueness validation
- Bcrypt password hashing
- Auto-reload user profile after updates

### **System Architecture**

#### **Multi-Tenancy**
- Complete tenant isolation (each company has separate data)
- All data scoped by `tenantId`
- No cross-tenant data access (IDOR protection)
- Tenant-specific user authentication

#### **Authentication & Authorization**
- JWT-based authentication
- Role-based access control (RBAC)
- 38 permissions across 5 categories
- Protected routes requiring authentication
- Token expiration: 1 hour (configurable)

#### **API Design**
- RESTful API at `/api/v1/*`
- Swagger documentation at `/api/v1/docs`
- Consistent error responses
- JSON request/response format
- 80+ endpoints across 13 modules

#### **UI/UX**
- **OpsNex Dark Theme:**
  - Teal accent color (#14b8a6 / teal-500)
  - Dark slate backgrounds (slate-950 for pages, slate-900 for cards, slate-800 for sidebar)
  - Light text (slate-100 primary, slate-300 secondary, slate-400 muted)
- Professional sidebar navigation with 12 menu items
- Responsive design (mobile + desktop)
- Loading states and error handling
- Global error boundary

---

## ✅ **3. CODE STRUCTURE & RELEVANT FILES**

### **Project Directory Structure**

```
/
├── frontend/                  # React TypeScript frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Sidebar.tsx    # Main navigation (12 menu items)
│   │   │   ├── Layout.tsx     # App layout wrapper with sidebar + topbar
│   │   │   ├── TopBar.tsx     # Header with branding + logout
│   │   │   ├── ui/            # 74 shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   └── ... (71 more)
│   │   │   └── admin/         # Super Admin specific components
│   │   │       ├── AddUserModal.tsx
│   │   │       └── ...
│   │   │
│   │   ├── pages/             # Route page components
│   │   │   ├── Dashboard.tsx  # Main dashboard with stats
│   │   │   ├── Login.tsx      # Authentication
│   │   │   ├── Register.tsx   # User registration
│   │   │   ├── WorkOrders.tsx # Work order management
│   │   │   ├── CRM.tsx        # Customer relationship management
│   │   │   ├── Inventory.tsx  # Inventory management
│   │   │   ├── Purchasing.tsx # Purchase orders
│   │   │   ├── Dispatch.tsx   # Drag-and-drop scheduling
│   │   │   ├── Labels.tsx     # Label generator
│   │   │   ├── Forecast.tsx   # Demand forecasting dashboard
│   │   │   ├── Scanner.tsx    # Barcode scanner
│   │   │   ├── AI.tsx         # AI chat assistant
│   │   │   ├── Settings.tsx   # User settings (1450 lines)
│   │   │   ├── FieldTools/    # HVAC calculators
│   │   │   │   ├── FieldToolsPage.tsx
│   │   │   │   └── calculators/ (21 calculator components)
│   │   │   └── admin/         # Super Admin pages
│   │   │       ├── AdminLayout.tsx
│   │   │       ├── Dashboard.tsx
│   │   │       ├── Users.tsx
│   │   │       ├── Roles.tsx
│   │   │       └── Tenants.tsx
│   │   │
│   │   ├── store/             # Zustand state management
│   │   │   └── useAuthStore.ts # Global auth state (user, token, login, logout)
│   │   │
│   │   ├── services/          # API service layer
│   │   │   ├── api.ts         # Axios instance with JWT interceptor
│   │   │   └── index.ts       # Auth service (login, register, getProfile)
│   │   │
│   │   ├── types/             # TypeScript type definitions
│   │   │   └── index.ts       # All types (1032 lines): User, WorkOrder, SKU, etc.
│   │   │
│   │   ├── App.tsx            # Root component with React Router
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Global styles (Tailwind imports)
│   │
│   ├── public/                # Static assets
│   ├── index.html             # HTML template
│   ├── vite.config.ts         # Vite configuration (proxy to backend)
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── tsconfig.json          # TypeScript configuration
│   └── package.json           # Frontend dependencies
│
├── backend/                   # NestJS TypeScript backend
│   ├── src/
│   │   ├── modules/           # Feature modules
│   │   │   │
│   │   │   ├── auth/          # Authentication
│   │   │   │   ├── module.ts
│   │   │   │   ├── controller.ts       # POST /auth/login, /auth/register
│   │   │   │   ├── me.controller.ts    # GET /auth/me (returns user + roles)
│   │   │   │   ├── jwt-auth.guard.ts   # Route protection guard
│   │   │   │   └── jwt.strategy.ts
│   │   │   │
│   │   │   ├── admin/         # Super Admin (22 endpoints)
│   │   │   │   ├── module.ts
│   │   │   │   ├── controller.ts       # All /admin/* endpoints
│   │   │   │   ├── service.ts          # Admin business logic
│   │   │   │   └── admin.guard.ts      # SUPER_ADMIN role guard
│   │   │   │
│   │   │   ├── users/         # User profile management
│   │   │   │   ├── module.ts
│   │   │   │   ├── controller.ts       # PUT /users/profile, /users/password
│   │   │   │   └── service.ts          # Profile update, password change
│   │   │   │
│   │   │   ├── workorder/     # Work Orders
│   │   │   │   ├── module.ts
│   │   │   │   ├── controller.ts       # CRUD endpoints
│   │   │   │   └── service.ts          # Business logic
│   │   │   │
│   │   │   ├── crm/           # CRM (Accounts, Contacts, Leads)
│   │   │   │   ├── module.ts
│   │   │   │   ├── controller.ts
│   │   │   │   └── service.ts
│   │   │   │
│   │   │   ├── inventory/     # Inventory (SKUs, Stock Ledger)
│   │   │   │   ├── module.ts
│   │   │   │   ├── controller.ts
│   │   │   │   └── service.ts
│   │   │   │
│   │   │   ├── purchasing/    # Purchase Orders
│   │   │   │   ├── module.ts
│   │   │   │   ├── controller.ts
│   │   │   │   └── service.ts
│   │   │   │
│   │   │   ├── dispatch/      # Scheduling
│   │   │   │   ├── module.ts
│   │   │   │   ├── controller.ts
│   │   │   │   └── service.ts
│   │   │   │
│   │   │   ├── forecast/      # Demand Forecasting
│   │   │   │   ├── module.ts
│   │   │   │   ├── controller.ts
│   │   │   │   └── service.ts
│   │   │   │
│   │   │   ├── labels/        # Label Generation
│   │   │   │   ├── label.module.ts
│   │   │   │   ├── label.controller.ts
│   │   │   │   └── label.service.ts
│   │   │   │
│   │   │   ├── scanner/       # Barcode Scanner
│   │   │   │   ├── module.ts
│   │   │   │   ├── controller.ts
│   │   │   │   └── service.ts
│   │   │   │
│   │   │   ├── chat/          # AI Assistant
│   │   │   │   ├── module.ts
│   │   │   │   ├── controller.ts
│   │   │   │   └── service.ts
│   │   │   │
│   │   │   └── field-calculation/ # HVAC Calculators
│   │   │       ├── module.ts
│   │   │       ├── controller.ts
│   │   │       └── service.ts
│   │   │
│   │   ├── middleware/
│   │   │   └── jwt.middleware.ts      # Globally attach JWT to req.user
│   │   │
│   │   ├── common/
│   │   │   └── prisma.service.ts      # Prisma client service
│   │   │
│   │   ├── queue/
│   │   │   └── queue.module.ts        # Background job processing
│   │   │
│   │   ├── app.module.ts              # Root module (imports all feature modules)
│   │   ├── app.controller.ts          # Health check endpoint
│   │   ├── health.controller.ts       # /health endpoint
│   │   ├── metrics.controller.ts      # /metrics endpoint
│   │   └── main.ts                    # Bootstrap (CORS, Swagger, port 3000)
│   │
│   ├── prisma/
│   │   └── schema.prisma              # Database schema (all models)
│   │
│   ├── scripts/
│   │   ├── seed-admin.ts              # Create super admin + roles
│   │   ├── seed-crm-purchasing.ts     # Seed CRM + Purchasing data
│   │   └── test-tenant-isolation.ts   # Multi-tenant security test
│   │
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── nest-cli.json                  # NestJS CLI config
│   └── package.json                   # Backend dependencies
│
├── replit.md                          # Project documentation
├── .replit                            # Replit configuration
└── package.json                       # Root package.json (workspaces)
```

### **Key Files for Feature Development**

#### **Authentication & Authorization**
```
frontend/src/store/useAuthStore.ts     # Global auth state (login, logout, user)
frontend/src/services/api.ts           # Axios instance with JWT headers
backend/src/modules/auth/jwt-auth.guard.ts  # Route protection
backend/src/middleware/jwt.middleware.ts    # Attaches req.user to all requests
backend/src/modules/auth/me.controller.ts   # GET /auth/me endpoint
```

#### **Navigation & Routing**
```
frontend/src/components/Sidebar.tsx    # Add new menu items here
frontend/src/App.tsx                   # Add new routes here
frontend/src/components/Layout.tsx     # Main layout wrapper
```

#### **API Integration**
```
frontend/src/services/api.ts           # Centralized API client
backend/src/main.ts                    # CORS config, Swagger setup
```

#### **Database**
```
backend/prisma/schema.prisma           # All database models
backend/src/common/prisma.service.ts   # Prisma client
```

#### **Type Definitions**
```
frontend/src/types/index.ts            # All TypeScript interfaces (1032 lines)
```

---

## 🔑 **KEY PATTERNS & CONVENTIONS**

### **API Endpoint Patterns**

**All endpoints use prefix:** `/api/v1`

**Authentication:**
```typescript
POST /api/v1/auth/login       // Login
POST /api/v1/auth/register    // Register new user
GET  /api/v1/auth/me          // Get current user profile + roles
```

**Protected Endpoints** (require JWT):
```typescript
// Work Orders
GET    /api/v1/work-orders
GET    /api/v1/work-orders/:id
POST   /api/v1/work-orders
PUT    /api/v1/work-orders/:id/status
DELETE /api/v1/work-orders/:id

// CRM
GET    /api/v1/crm/accounts
GET    /api/v1/crm/contacts
POST   /api/v1/crm/accounts
PUT    /api/v1/crm/contacts/:id

// Inventory
GET    /api/v1/inventory/skus
GET    /api/v1/inventory/skus/:id
POST   /api/v1/inventory/skus
GET    /api/v1/inventory/skus/:id/onhand

// User Settings
PUT    /api/v1/users/profile
PUT    /api/v1/users/password

// Super Admin (requires SUPER_ADMIN role)
GET    /api/v1/admin/dashboard
GET    /api/v1/admin/users
POST   /api/v1/admin/users
PUT    /api/v1/admin/users/:id
```

### **Backend Code Patterns**

**Controller Pattern:**
```typescript
import { Controller, Get, Post, Put, Body, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('example')
@UseGuards(JwtAuthGuard)  // Protect all routes
export class ExampleController {
  constructor(private readonly service: ExampleService) {}

  @Get()
  findAll(@Req() req: any) {
    const tenantId = req.user.tenantId;  // Get from JWT
    return this.service.findAll(tenantId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateDto) {
    const tenantId = req.user.tenantId;
    return this.service.create(tenantId, dto);
  }
}
```

**Service Pattern with Prisma:**
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ExampleService {
  async findAll(tenantId: string) {
    return prisma.example.findMany({
      where: { tenantId },  // Always filter by tenant
    });
  }

  async findOne(tenantId: string, id: string) {
    const item = await prisma.example.findFirst({
      where: { id, tenantId },  // Validate ownership
    });
    
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }
}
```

**Multi-Tenant Security:**
- Never accept `tenantId` from client (path/query/body parameters)
- Always get `tenantId` from `req.user.tenantId` (JWT)
- Use `findFirst` with `where: { id, tenantId }` to validate ownership
- Throw `NotFoundException` if not found or wrong tenant

### **Frontend Code Patterns**

**API Call Pattern:**
```typescript
import apiClient from '@/services/api';

// GET request
const response = await apiClient.get('/api/v1/work-orders');
const workOrders = response.data;

// POST request
const newWorkOrder = await apiClient.post('/api/v1/work-orders', {
  title: 'Fix AC Unit',
  status: 'Pending',
});

// PUT request
await apiClient.put(`/api/v1/work-orders/${id}`, { status: 'Completed' });
```

**Auth Store Usage:**
```typescript
import { useAuthStore } from '@/store/useAuthStore';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuthStore();
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return (
    <div>
      <p>Welcome, {user?.firstName}</p>
      {user?.isSuperAdmin && <AdminLink />}
    </div>
  );
}
```

**Component Pattern (shadcn/ui):**
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function MyPage() {
  return (
    <div className="p-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100">Title</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="bg-teal-500 hover:bg-teal-600">
            Click Me
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

### **Styling Conventions**

**OpsNex Dark Theme Colors:**
```css
/* Backgrounds */
bg-slate-950    /* Page background */
bg-slate-900    /* Card/container background */
bg-slate-800    /* Sidebar, secondary containers */

/* Text */
text-slate-100  /* Primary text */
text-slate-300  /* Secondary text */
text-slate-400  /* Muted text */

/* Accent (Teal) */
bg-teal-500     /* Buttons, active states (#14b8a6) */
text-teal-400   /* Links, highlights */
border-teal-500 /* Active borders */

/* Borders */
border-slate-800  /* Standard borders */
border-slate-700  /* Subtle borders */
```

**Component Styling Pattern:**
```tsx
<div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
  <h2 className="text-xl font-semibold text-slate-100 mb-4">Title</h2>
  <p className="text-slate-300">Description text</p>
  <Button className="bg-teal-500 hover:bg-teal-600 text-white">
    Action
  </Button>
</div>
```

---

## 📦 **DEPENDENCIES**

### **Frontend (package.json)**
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "zustand": "^4.x",
    "axios": "^1.x",
    "@hookform/resolvers": "^3.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x",
    "lucide-react": "^0.x",
    "recharts": "^2.x",
    "jsbarcode": "^3.x",
    "html5-qrcode": "^2.x",
    "react-markdown": "^9.x",
    "@dnd-kit/core": "^6.x",
    "@dnd-kit/sortable": "^8.x"
  },
  "devDependencies": {
    "vite": "^5.x",
    "typescript": "^5.x",
    "tailwindcss": "^3.x",
    "@types/react": "^18.x",
    "eslint": "^8.x",
    "prettier": "^3.x"
  }
}
```

### **Backend (package.json)**
```json
{
  "dependencies": {
    "@nestjs/common": "^10.x",
    "@nestjs/core": "^10.x",
    "@nestjs/platform-express": "^10.x",
    "@nestjs/jwt": "^10.x",
    "@nestjs/swagger": "^7.x",
    "@prisma/client": "^5.x",
    "bcrypt": "^5.x",
    "class-validator": "^0.14.x",
    "class-transformer": "^0.5.x",
    "helmet": "^7.x"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.x",
    "prisma": "^5.x",
    "typescript": "^5.x",
    "@types/node": "^20.x",
    "@types/bcrypt": "^5.x"
  }
}
```

---

## 🚀 **USEFUL COMMANDS**

### **Development**
```bash
# Start development server (runs both frontend + backend)
npm run dev

# Frontend only (port 5000)
cd frontend && npm run dev

# Backend only (port 3000)
cd backend && npm run start:dev
```

### **Database**
```bash
# Push schema changes to database (safe)
npm run db:push

# Force push (if data loss warning)
npm run db:push -- --force

# Generate Prisma client
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio
```

### **Seeding**
```bash
# Create super admin + roles
npm run seed:admin

# Seed CRM + Purchasing data
npm run seed:crm
```

### **Testing**
```bash
# Test multi-tenant isolation
npm run test:tenant-isolation
```

---

## 🔐 **DEFAULT CREDENTIALS**

**Super Admin Account:**
- Email: `admin@hvac.com`
- Password: `password123`
- Role: SUPER_ADMIN (all permissions)

---

## 🌐 **ENDPOINTS & PORTS**

- **Frontend:** http://0.0.0.0:5000 (Vite dev server)
- **Backend API:** http://0.0.0.0:3000/api/v1
- **Swagger Docs:** http://0.0.0.0:3000/api/v1/docs
- **Health Check:** http://0.0.0.0:3000/api/v1/health
- **Metrics:** http://0.0.0.0:3000/api/v1/metrics

---

## 📝 **USING THIS REFERENCE FOR AI PROMPTS**

When creating prompts for AI assistants (ChatGPT, Claude, etc.), include:

1. **Tech Stack Section** - So AI knows what libraries/frameworks to use
2. **App Description** - So AI understands the business context
3. **Code Structure** - So AI knows where to place new files
4. **Key Patterns** - So AI follows your existing conventions

**Example Prompt Template:**
```
I'm working on an HVAC Management SaaS platform called OpsNex.

TECH STACK:
[Paste relevant section from above]

APP CONTEXT:
[Paste what the app does from above]

CURRENT CODE STRUCTURE:
[Paste relevant file paths]

TASK:
I need to add [feature description]. Please provide the implementation following our existing patterns.
```

---

## 📚 **ADDITIONAL RESOURCES**

- **Replit Docs:** Project documentation in `replit.md`
- **Prisma Schema:** Full database models in `backend/prisma/schema.prisma`
- **Type Definitions:** All TypeScript types in `frontend/src/types/index.ts`
- **API Docs:** Live Swagger UI at http://localhost:3000/api/v1/docs

---

**End of Technical Reference**
