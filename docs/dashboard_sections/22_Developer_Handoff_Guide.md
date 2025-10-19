## Appendix

### A. Glossary of Terms
- **KPI**: Key Performance Indicator - a measurable value that demonstrates effectiveness
- **DAU/WAU/MAU**: Daily/Weekly/Monthly Active Users
- **COGS**: Cost of Goods Sold
- **AR**: Accounts Receivable
- **P&L**: Profit and Loss statement
- **FIFO/LIFO**: First-In-First-Out / Last-In-First-Out inventory methods
- **Churn Rate**: Percentage of customers who stop doing business
- **Conversion Rate**: Percentage of leads that become customers
- **Utilization Rate**: Percentage of available time that is productively used
- **Zero Dollar Work Order**: A work order with no billable revenue ($0), including warranty work, goodwill service, callbacks, diagnostics, or training
- **Call Back**: A return visit required to address an issue from a previous work order, either the same problem, a related issue, or parts failure
- **First-Time Fix Rate**: Percentage of work orders completed successfully on the first visit (inverse of callback rate)
- **Billable vs Non-Billable**: Classification of work orders based on whether they generate revenue or not

### B. Sample Data for Testing
Use the following sample data ranges for realistic testing:
- **Work Orders**: 1,000-5,000 records spanning 12 months
- **Inventory**: 500-1,000 SKUs across 3-5 warehouses
- **Customers**: 200-500 accounts, 1,000-2,000 contacts
- **Technicians**: 10-20 users
- **Stock Movements**: 5,000-10,000 transactions

### C. Performance Benchmarks
Target performance metrics:
- **API Response Time**: < 200ms for dashboard endpoints (P95)
- **Page Load Time**: < 2 seconds for initial dashboard load
- **Chart Render Time**: < 500ms for complex visualizations
- **Database Query Time**: < 100ms for KPI calculations
- **Real-Time Update Latency**: < 5 seconds for polling updates

### D. Browser Support
- **Modern Browsers**: Latest 2 versions of Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Not Supported**: Internet Explorer

### E. Accessibility Compliance
- **Standard**: WCAG 2.1 Level AA
- **Tools**: Use aXe, Lighthouse for testing
- **Testing**: Manual keyboard navigation and screen reader testing

---

# DEVELOPER HANDOFF GUIDE

This section provides everything your development team needs to build this HVAC Management System from scratch.

---

## 1. Executive Summary for Developers

### Project Overview
You're building a comprehensive HVAC Management System with an enterprise-grade admin dashboard. This is a **full-stack web application** with real-time features, complex permissions, and third-party integrations.

### Estimated Timeline
**Total: 12-16 weeks** (3-4 months) with a team of 4-6 developers

- **Phase 1** (Weeks 1-4): Core infrastructure, authentication, basic dashboard
- **Phase 2** (Weeks 5-8): Permission system, role management, contractor tools
- **Phase 3** (Weeks 9-12): Advanced features (SSO, MFA, integrations, analytics)
- **Phase 4** (Weeks 13-16): Security hardening, testing, performance optimization, deployment

### Team Composition
- **2 Frontend Developers** - React/TypeScript experts
- **2 Backend Developers** - Node.js/NestJS, database design
- **1 Full-Stack Developer** - Integration work, DevOps
- **1 QA Engineer** - Testing, automation

### Key Deliverables
1. ✅ Admin dashboard with real-time analytics
2. ✅ 15-role permission system with granular access control
3. ✅ Contractor tools (20+ HVAC calculators)
4. ✅ SSO/MFA authentication
5. ✅ Third-party integrations (QuickBooks, Twilio, etc.)
6. ✅ Mobile-responsive, WCAG 2.1 AA accessible
7. ✅ Automated backups and disaster recovery
8. ✅ Comprehensive API documentation

---

## 2. Technology Stack Specifications

### Core Technologies

```json
{
  "runtime": {
    "node": "20.x LTS",
    "npm": "10.x"
  },
  "frontend": {
    "framework": "React 18.2+",
    "bundler": "Vite 5.x",
    "language": "TypeScript 5.3+",
    "routing": "React Router 6.x",
    "stateManagement": "Redux Toolkit 2.x OR Zustand 4.x",
    "styling": "Tailwind CSS 3.4+",
    "uiComponents": "shadcn/ui (Radix UI primitives)",
    "forms": "React Hook Form 7.x",
    "validation": "Zod 3.x",
    "charts": "Recharts 2.x OR Chart.js 4.x",
    "dateHandling": "date-fns 3.x"
  },
  "backend": {
    "framework": "NestJS 10.x",
    "language": "TypeScript 5.3+",
    "orm": "Drizzle ORM 0.29+",
    "validation": "class-validator 0.14+",
    "documentation": "@nestjs/swagger 7.x"
  },
  "database": {
    "primary": "PostgreSQL 16.x",
    "caching": "Redis 7.x (optional for session storage)"
  },
  "authentication": {
    "jwt": "jsonwebtoken 9.x",
    "passport": "@nestjs/passport 10.x",
    "bcrypt": "bcryptjs 2.x",
    "mfa": "otplib 12.x (TOTP)"
  },
  "realtime": {
    "websocket": "Socket.io 4.x",
    "server": "@nestjs/websockets 10.x",
    "client": "socket.io-client 4.x"
  },
  "testing": {
    "unitTests": "Jest 29.x",
    "e2eTests": "Playwright 1.40+",
    "componentTests": "@testing-library/react 14.x",
    "apiTesting": "supertest 6.x"
  },
  "thirdPartyServices": {
    "email": "SendGrid API (@sendgrid/mail 8.x) OR AWS SES",
    "sms": "Twilio (twilio 4.x)",
    "storage": "AWS S3 (@aws-sdk/client-s3 3.x)",
    "accounting": "QuickBooks Online API (node-quickbooks 3.x)",
    "logging": "Winston 3.x",
    "monitoring": "Sentry 7.x"
  },
  "devTools": {
    "linter": "ESLint 8.x",
    "formatter": "Prettier 3.x",
    "preCommitHooks": "Husky 8.x + lint-staged 15.x",
    "typeChecking": "tsc (TypeScript compiler)"
  }
}
```

### Version Lock File
**CRITICAL**: Use exact versions in `package.json`:
```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "@nestjs/core": "10.3.0",
    "drizzle-orm": "0.29.3",
    "zod": "3.22.4"
  }
}
```

---

## 3. Development Environment Setup

### Prerequisites
1. **Node.js 20.x LTS** - Download from https://nodejs.org/
2. **PostgreSQL 16** - Install locally OR use Docker
3. **Git** - Version control
4. **VS Code** (recommended) with extensions:
   - ESLint
   - Prettier
   - TypeScript and JavaScript Language Features
   - Tailwind CSS IntelliSense
   - Thunder Client (API testing)

### Step-by-Step Setup

#### 1. Clone Repository
```bash
git clone <repository-url>
cd hvac-management-system
```

#### 2. Install Dependencies
```bash
# Install all packages (frontend + backend)
npm install

# Or if using workspaces
npm install --workspaces
```

#### 3. Set Up PostgreSQL Database

**Option A: Local PostgreSQL**
```bash
# Create database
createdb hvac_management_dev

# Verify connection
psql -d hvac_management_dev -c "SELECT version();"
```

**Option B: Docker**
```bash
docker run --name hvac-postgres \
  -e POSTGRES_DB=hvac_management_dev \
  -e POSTGRES_USER=hvac_user \
  -e POSTGRES_PASSWORD=secure_password \
  -p 5432:5432 \
  -d postgres:16
```

#### 4. Environment Variables

Create `.env` files for each environment:

**Backend `.env` (root or `/backend/.env`)**:
```bash
# Database
DATABASE_URL="postgresql://hvac_user:secure_password@localhost:5432/hvac_management_dev"
PGHOST=localhost
PGPORT=5432
PGUSER=hvac_user
PGPASSWORD=secure_password
PGDATABASE=hvac_management_dev

# App Config
NODE_ENV=development
PORT=3000
API_PREFIX=/api/v1

# JWT Secrets (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5000

# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@your domain.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Storage (AWS S3)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=hvac-uploads-dev

# Redis (optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Logging
LOG_LEVEL=debug
SENTRY_DSN=your-sentry-dsn (optional)
```

**Frontend `.env` (/ frontend/.env`)**:
```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_WS_URL=ws://localhost:3000
VITE_APP_NAME=HVAC Management System
VITE_ENABLE_ANALYTICS=false
```

**IMPORTANT**: Copy `.env.example` files provided in the repo and fill in your values.

#### 5. Database Migrations

```bash
# Generate initial migration from schema
npm run db:generate

# Push schema to database (dev only - no migration files)
npm run db:push

# Or use migrations (recommended for production)
npm run db:migrate

# Verify tables created
npm run db:studio  # Opens Drizzle Studio UI at http://localhost:4983
```

#### 6. Seed Database with Sample Data

```bash
npm run db:seed

# This creates:
# - 15 default roles with permissions
# - 1 Super Admin user (email: admin@hvac.com, password: Admin123!)
# - Sample work orders, customers, inventory
# - PT chart data for refrigerants
```

#### 7. Start Development Servers

**Option A: Run both (recommended)**
```bash
npm run dev

# This starts:
# - Backend: http://localhost:3000
# - Frontend: http://localhost:5000
```

**Option B: Run separately**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### 8. Verify Setup

1. **Backend health check**: http://localhost:3000/api/v1/health
   - Should return: `{ "status": "ok", "database": "connected" }`

2. **Frontend**: http://localhost:5000
   - Should show login page

3. **API documentation**: http://localhost:3000/api/docs
   - Swagger UI with all endpoints

4. **Login with default admin**:
   - Email: `admin@hvac.com`
   - Password: `Admin123!`

---

## 4. Frontend Architecture

### Folder Structure

```
frontend/
├── public/              # Static assets
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── @types/          # TypeScript type definitions
│   │   └── index.d.ts
│   ├── assets/          # Images, fonts, icons
│   │   ├── generated_images/
│   │   └── stock_images/
│   ├── components/      # Reusable React components
│   │   ├── ui/          # shadcn/ui components (Button, Input, etc.)
│   │   ├── common/      # Shared components (Header, Sidebar, etc.)
│   │   ├── dashboard/   # Dashboard-specific components
│   │   ├── forms/       # Form components
│   │   └── charts/      # Chart components
│   ├── features/        # Feature-based modules
│   │   ├── auth/        # Authentication
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types.ts
│   │   ├── work-orders/
│   │   ├── inventory/
│   │   ├── users/
│   │   └── contractor-tools/
│   ├── hooks/           # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── usePermissions.ts
│   │   └── useWebSocket.ts
│   ├── layouts/         # Page layouts
│   │   ├── DashboardLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── PublicLayout.tsx
│   ├── lib/             # Utilities and helpers
│   │   ├── api-client.ts      # Axios instance
│   │   ├── utils.ts           # Helper functions
│   │   └── constants.ts
│   ├── pages/           # Route pages
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── WorkOrders.tsx
│   │   └── Settings.tsx
│   ├── routes/          # Routing configuration
│   │   ├── index.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── PublicRoute.tsx
│   ├── services/        # API services
│   │   ├── auth.service.ts
│   │   ├── workOrder.service.ts
│   │   └── user.service.ts
│   ├── store/           # State management (Redux/Zustand)
│   │   ├── slices/      # Redux Toolkit slices
│   │   │   ├── authSlice.ts
│   │   │   └── userSlice.ts
│   │   ├── hooks.ts     # Typed hooks
│   │   └── store.ts     # Store configuration
│   ├── styles/          # Global styles
│   │   ├── globals.css
│   │   └── tailwind.css
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Entry point
│   └── vite-env.d.ts
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### State Management

**Option 1: Redux Toolkit (Recommended for complex state)**
```typescript
// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**Option 2: Zustand (Lighter alternative)**
```typescript
// store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null })
    }),
    { name: 'auth-storage' }
  )
);
```

### Routing Configuration

```typescript
// routes/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'work-orders', element: <WorkOrders /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'users', element: <Users /> },
      { path: 'contractor-tools', element: <ContractorTools /> }
    ]
  }
]);

export default router;
```

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          700: '#1d4ed8'
        },
        // Add your brand colors
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};
```

---

## 5. Backend Architecture

### Folder Structure

```
backend/
├── src/
│   ├── common/              # Shared utilities
│   │   ├── decorators/      # Custom decorators
│   │   ├── filters/         # Exception filters
│   │   ├── guards/          # Auth guards
│   │   ├── interceptors/    # Response interceptors
│   │   ├── pipes/           # Validation pipes
│   │   └── utils/           # Helper functions
│   ├── config/              # Configuration
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   └── app.config.ts
│   ├── database/            # Database layer
│   │   ├── migrations/      # Drizzle migrations
│   │   ├── schemas/         # Drizzle table schemas
│   │   │   ├── users.schema.ts
│   │   │   ├── roles.schema.ts
│   │   │   └── workOrders.schema.ts
│   │   ├── seeders/         # Seed scripts
│   │   │   └── seed.ts
│   │   └── drizzle.ts       # DB connection
│   ├── modules/             # Feature modules
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── guards/
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   └── permission.guard.ts
│   │   │   └── strategies/
│   │   │       └── jwt.strategy.ts
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.module.ts
│   │   │   └── dto/
│   │   ├── work-orders/
│   │   ├── inventory/
│   │   ├── roles/
│   │   ├── permissions/
│   │   ├── contractor-tools/
│   │   └── notifications/
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── app.module.ts
│   └── main.ts              # Entry point
├── test/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── drizzle.config.ts
├── nest-cli.json
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```

### Module Structure Pattern

Each module follows this pattern:

```typescript
// modules/work-orders/work-orders.module.ts
import { Module } from '@nestjs/common';
import { WorkOrdersController } from './work-orders.controller';
import { WorkOrdersService } from './work-orders.service';

@Module({
  imports: [],  // Other modules this depends on
  controllers: [WorkOrdersController],
  providers: [WorkOrdersService],
  exports: [WorkOrdersService]  // Export if other modules need it
})
export class WorkOrdersModule {}
```

### Service Layer Pattern

```typescript
// modules/work-orders/work-orders.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@/database/drizzle';
import { workOrders } from '@/database/schemas/workOrders.schema';
import { eq } from 'drizzle-orm';
import { CreateWorkOrderDto, UpdateWorkOrderDto } from './dto';

@Injectable()
export class WorkOrdersService {
  async findAll(filters?: any) {
    return await db.select().from(workOrders);
  }

  async findOne(id: string) {
    const workOrder = await db
      .select()
      .from(workOrders)
      .where(eq(workOrders.id, id))
      .limit(1);

    if (!workOrder.length) {
      throw new NotFoundException(`Work order ${id} not found`);
    }

    return workOrder[0];
  }

  async create(dto: CreateWorkOrderDto) {
    const [newWorkOrder] = await db
      .insert(workOrders)
      .values(dto)
      .returning();

    return newWorkOrder;
  }

  async update(id: string, dto: UpdateWorkOrderDto) {
    const [updated] = await db
      .update(workOrders)
      .set(dto)
      .where(eq(workOrders.id, id))
      .returning();

    if (!updated) {
      throw new NotFoundException(`Work order ${id} not found`);
    }

    return updated;
  }

  async remove(id: string) {
    await db.delete(workOrders).where(eq(workOrders.id, id));
    return { message: 'Work order deleted successfully' };
  }
}
```

### Controller Pattern

```typescript
// modules/work-orders/work-orders.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WorkOrdersService } from './work-orders.service';
import { CreateWorkOrderDto, UpdateWorkOrderDto } from './dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { PermissionGuard } from '@/modules/auth/guards/permission.guard';
import { RequirePermissions } from '@/common/decorators/permissions.decorator';

@ApiTags('work-orders')
@ApiBearerAuth()
@Controller('work-orders')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all work orders' })
  @RequirePermissions('work_orders:read')
  async findAll(@Query() filters: any) {
    return this.workOrdersService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get work order by ID' })
  @RequirePermissions('work_orders:read')
  async findOne(@Param('id') id: string) {
    return this.workOrdersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create work order' })
  @RequirePermissions('work_orders:create')
  async create(@Body() dto: CreateWorkOrderDto) {
    return this.workOrdersService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update work order' })
  @RequirePermissions('work_orders:update')
  async update(@Param('id') id: string, @Body() dto: UpdateWorkOrderDto) {
    return this.workOrdersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete work order' })
  @RequirePermissions('work_orders:delete')
  async remove(@Param('id') id: string) {
    return this.workOrdersService.remove(id);
  }
}
```

---

## 6. Database Schema & Migration Strategy

### Drizzle ORM Configuration

```typescript
// drizzle.config.ts
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  schema: './src/database/schemas/*.schema.ts',
  out: './src/database/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
  },
  verbose: true,
  strict: true
} satisfies Config;
```

```typescript
// database/drizzle.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schemas';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const db = drizzle(pool, { schema });
```

### Schema Example

```typescript
// database/schemas/users.schema.ts
import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { roles } from './roles.schema';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  phone: varchar('phone', { length: 20 }),
  isActive: boolean('is_active').default(true),
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const usersRelations = relations(users, ({ many }) => ({
  userRoles: many(userRoles)
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
```

### Migration Workflow

**Development (Schema Push - No Migration Files)**:
```bash
# Make changes to schema files
# Push directly to database
npm run db:push

# This automatically syncs schema → database
# Good for rapid prototyping
```

**Production (Migration Files)**:
```bash
# 1. Make schema changes
# 2. Generate migration
npm run db:generate
# Creates: src/database/migrations/0001_migration_name.sql

# 3. Review generated SQL
cat src/database/migrations/0001_*.sql

# 4. Apply migration
npm run db:migrate

# 5. Commit migration files to Git
git add src/database/migrations/
git commit -m "Add users table migration"
```

### Package.json Scripts

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate:pg",
    "db:push": "drizzle-kit push:pg",
    "db:migrate": "tsx src/database/migrate.ts",
    "db:seed": "tsx src/database/seeders/seed.ts",
    "db:studio": "drizzle-kit studio"
  }
}
```

### Migration Runner

```typescript
// database/migrate.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const db = drizzle(pool);

async function main() {
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './src/database/migrations' });
  console.log('Migrations completed!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
```

### Seeding Strategy

```typescript
// database/seeders/seed.ts
import { db } from '../drizzle';
import { users, roles, permissions } from '../schemas';
import * as bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');

  // 1. Create permissions
  const createdPermissions = await db.insert(permissions).values([
    { name: 'work_orders:create', description: 'Create work orders' },
    { name: 'work_orders:read', description: 'View work orders' },
    // ... all permissions
  ]).returning();

  // 2. Create roles
  const superAdminRole = await db.insert(roles).values({
    name: 'Super Admin',
    description: 'Full system access',
    isDefault: true
  }).returning();

  // 3. Assign permissions to roles
  // ... role-permission assignments

  // 4. Create default admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  await db.insert(users).values({
    email: 'admin@hvac.com',
    passwordHash: hashedPassword,
    firstName: 'Super',
    lastName: 'Admin',
    isActive: true,
    emailVerified: true
  });

  console.log('Seeding completed!');
}

seed().catch(console.error).finally(() => process.exit(0));
```

---

## 7. Frontend-Backend Integration

### API Client Setup (Axios)

```typescript
// lib/api-client.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors & token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt token refresh
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        const { accessToken } = response.data;
        useAuthStore.getState().login(accessToken, response.data.user);

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      console.error('Permission denied');
      // Show toast notification
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

### API Service Pattern

```typescript
// services/workOrder.service.ts
import apiClient from '@/lib/api-client';
import type { WorkOrder, CreateWorkOrderDto } from '@/types';

export const workOrderService = {
  async getAll(filters?: any): Promise<WorkOrder[]> {
    const response = await apiClient.get('/work-orders', { params: filters });
    return response.data;
  },

  async getById(id: string): Promise<WorkOrder> {
    const response = await apiClient.get(`/work-orders/${id}`);
    return response.data;
  },

  async create(data: CreateWorkOrderDto): Promise<WorkOrder> {
    const response = await apiClient.post('/work-orders', data);
    return response.data;
  },

  async update(id: string, data: Partial<CreateWorkOrderDto>): Promise<WorkOrder> {
    const response = await apiClient.put(`/work-orders/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/work-orders/${id}`);
  }
};
```

### TypeScript Types Sharing

Create a `shared` directory for types used by both frontend and backend:

```typescript
// shared/types/work-order.types.ts
export interface WorkOrder {
  id: string;
  number: string;
  customerId: string;
  technicianId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledAt: Date;
  completedAt?: Date;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkOrderDto {
  customerId: string;
  technicianId: string;
  priority: WorkOrder['priority'];
  scheduledAt: Date;
  description: string;
}
```

Import in both frontend and backend:
```typescript
import type { WorkOrder, CreateWorkOrderDto } from '@shared/types/work-order.types';
```

---

## 8. Authentication & Authorization Flows

### Login Flow

```
┌─────────┐                ┌──────────┐                ┌──────────┐
│ Browser │                │ Frontend │                │ Backend  │
└────┬────┘                └────┬─────┘                └────┬─────┘
     │                          │                           │
     │  1. Enter credentials    │                           │
     ├─────────────────────────>│                           │
     │                          │                           │
     │                          │  2. POST /auth/login      │
     │                          │  { email, password }      │
     │                          ├──────────────────────────>│
     │                          │                           │
     │                          │                           │  3. Verify credentials
     │                          │                           │     Hash password & compare
     │                          │                           │
     │                          │  4. Return tokens & user  │
     │                          │  { accessToken,           │
     │                          │    refreshToken,          │
     │                          │    user }                 │
     │                          │<──────────────────────────│
     │                          │                           │
     │  5. Store tokens         │                           │
     │     localStorage         │                           │
     │     + Redux/Zustand      │                           │
     │                          │                           │
     │  6. Redirect to dashboard│                           │
     │<─────────────────────────│                           │
     │                          │                           │
```

### Protected API Request Flow

```
┌─────────┐                ┌──────────┐                ┌──────────┐
│ Browser │                │ Frontend │                │ Backend  │
└────┬────┘                └────┬─────┘                └────┬─────┘
     │                          │                           │
     │  1. Request data         │                           │
     ├─────────────────────────>│                           │
     │                          │                           │
     │                          │  2. GET /work-orders      │
     │                          │  Headers:                 │
     │                          │  Authorization: Bearer... │
     │                          ├──────────────────────────>│
     │                          │                           │
     │                          │                           │  3. Verify JWT
     │                          │                           │     jwt.verify(token)
     │                          │                           │     
     │                          │                           │  4. Check permissions
     │                          │                           │     user.hasPermission('work_orders:read')
     │                          │                           │
     │                          │  5. Return data           │
     │                          │<──────────────────────────│
     │                          │                           │
     │  6. Display data         │                           │
     │<─────────────────────────│                           │
     │                          │                           │
```

### Token Refresh Flow

```
┌─────────┐                ┌──────────┐                ┌──────────┐
│ Browser │                │ Frontend │                │ Backend  │
└────┬────┘                └────┬─────┘                └────┬─────┘
     │                          │                           │
     │  1. API request          │                           │
     ├─────────────────────────>│                           │
     │                          │  2. GET /work-orders      │
     │                          │  (expired token)          │
     │                          ├──────────────────────────>│
     │                          │                           │
     │                          │  3. 401 Unauthorized      │
     │                          │<──────────────────────────│
     │                          │                           │
     │                          │  4. POST /auth/refresh    │
     │                          │  { refreshToken }         │
     │                          ├──────────────────────────>│
     │                          │                           │
     │                          │                           │  5. Verify refresh token
     │                          │                           │     Check not blacklisted
     │                          │                           │
     │                          │  6. New access token      │
     │                          │  { accessToken }          │
     │                          │<──────────────────────────│
     │                          │                           │
     │  7. Update stored token  │                           │
     │                          │                           │
     │                          │  8. Retry original request│
     │                          │  (with new token)         │
     │                          ├──────────────────────────>│
     │                          │                           │
     │                          │  9. Return data           │
     │                          │<──────────────────────────│
     │                          │                           │
     │  10. Display data        │                           │
     │<─────────────────────────│                           │
     │                          │                           │
```

### MFA Flow

```
┌─────────┐                ┌──────────┐                ┌──────────┐
│ Browser │                │ Frontend │                │ Backend  │
└────┬────┘                └────┬─────┘                └────┬─────┘
     │                          │                           │
     │  1. Enter credentials    │                           │
     ├─────────────────────────>│                           │
     │                          │                           │
     │                          │  2. POST /auth/login      │
     │                          ├──────────────────────────>│
     │                          │                           │
     │                          │                           │  3. Credentials valid
     │                          │                           │     Check MFA enabled
     │                          │                           │
     │                          │  4. MFA required          │
     │                          │  { requiresMFA: true,     │
     │                          │    sessionId,             │
     │                          │    methods: ['totp', 'sms'] }
     │                          │<──────────────────────────│
     │                          │                           │
     │  5. Show MFA input       │                           │
     │<─────────────────────────│                           │
     │                          │                           │
     │  6. Enter MFA code       │                           │
     ├─────────────────────────>│                           │
     │                          │                           │
     │                          │  7. POST /auth/mfa/verify │
     │                          │  { sessionId, code }      │
     │                          ├──────────────────────────>│
     │                          │                           │
     │                          │                           │  8. Verify TOTP code
     │                          │                           │     otplib.verify()
     │                          │                           │
     │                          │  9. Return tokens         │
     │                          │  { accessToken,           │
     │                          │    refreshToken, user }   │
     │                          │<──────────────────────────│
     │                          │                           │
     │  10. Store & redirect    │                           │
     │<─────────────────────────│                           │
     │                          │                           │
```

### Permission Check Implementation

```typescript
// Backend: guards/permission.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler()
    );

    if (!requiredPermissions) {
      return true; // No permissions required
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.hasAllPermissions(user.permissions, requiredPermissions);
  }

  private hasAllPermissions(userPermissions: string[], required: string[]): boolean {
    return required.every((perm) => userPermissions.includes(perm));
  }
}

// Decorator
export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);
```

---

## 9. Real-time Features (WebSocket)

### Backend Setup (Socket.io)

```typescript
// modules/notifications/notifications.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, string>(); // userId -> socketId

  constructor(private jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      // Extract token from handshake
      const token = client.handshake.auth.token;
      const payload = await this.jwtService.verifyAsync(token);

      // Map user to socket
      this.userSockets.set(payload.sub, client.id);
      client.data.userId = payload.sub;

      console.log(`User ${payload.sub} connected (${client.id})`);
      
      // Join user-specific room
      client.join(`user:${payload.sub}`);
    } catch (error) {
      console.error('WebSocket auth failed:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (userId) {
      this.userSockets.delete(userId);
      console.log(`User ${userId} disconnected`);
    }
  }

  // Send notification to specific user
  sendToUser(userId: string, event: string, data: any) {
    this.server.to(`user:${userId}`).emit(event, data);
  }

  // Broadcast to all connected clients
  broadcast(event: string, data: any) {
    this.server.emit(event, data);
  }

  @SubscribeMessage('join_work_order')
  handleJoinWorkOrder(client: Socket, workOrderId: string) {
    client.join(`work_order:${workOrderId}`);
    console.log(`User ${client.data.userId} joined work order ${workOrderId}`);
  }
}
```

### Frontend Setup (Socket.io Client)

```typescript
// hooks/useWebSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/authStore';

let socket: Socket | null = null;

export function useWebSocket() {
  const [connected, setConnected] = useState(false);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) return;

    // Create socket connection
    socket = io(import.meta.env.VITE_WS_URL, {
      auth: { token },
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [token]);

  return { socket, connected };
}

// Usage in component
function NotificationListener() {
  const { socket } = useWebSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('notification', (data) => {
      // Show toast notification
      toast.info(data.message);
    });

    socket.on('work_order_updated', (workOrder) => {
      // Update state or refetch data
      console.log('Work order updated:', workOrder);
    });

    return () => {
      socket.off('notification');
      socket.off('work_order_updated');
    };
  }, [socket]);

  return null;
}
```

### Emitting Events from Backend

```typescript
// modules/work-orders/work-orders.service.ts
import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class WorkOrdersService {
  constructor(private notificationsGateway: NotificationsGateway) {}

  async update(id: string, dto: UpdateWorkOrderDto) {
    const updated = await db.update(workOrders)...;

    // Emit real-time update
    this.notificationsGateway.broadcast('work_order_updated', updated);

    // Send notification to assigned technician
    if (updated.technicianId) {
      this.notificationsGateway.sendToUser(
        updated.technicianId,
        'notification',
        {
          type: 'work_order_assigned',
          message: `You have been assigned to work order #${updated.number}`,
          workOrderId: updated.id
        }
      );
    }

    return updated;
  }
}
```

---

## 10. API Documentation Standards

### Swagger Setup

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('HVAC Management API')
    .setDescription('API documentation for HVAC Management System')
    .setVersion('2.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('work-orders', 'Work order operations')
    .addTag('inventory', 'Inventory management')
    .addTag('contractor-tools', 'HVAC calculators and tools')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({ origin: process.env.FRONTEND_URL });

  await app.listen(3000);
  console.log('API Documentation: http://localhost:3000/api/docs');
}
bootstrap();
```

### DTO Documentation

```typescript
// modules/work-orders/dto/create-work-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsEnum, IsDateString, IsOptional } from 'class-validator';

export class CreateWorkOrderDto {
  @ApiProperty({
    description: 'Customer UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  customerId: string;

  @ApiProperty({
    description: 'Assigned technician UUID',
    example: '123e4567-e89b-12d3-a456-426614174001'
  })
  @IsUUID()
  technicianId: string;

  @ApiProperty({
    description: 'Work order priority level',
    enum: ['low', 'medium', 'high', 'urgent'],
    example: 'high'
  })
  @IsEnum(['low', 'medium', 'high', 'urgent'])
  priority: string;

  @ApiProperty({
    description: 'Scheduled date and time (ISO 8601)',
    example: '2025-10-20T14:00:00Z'
  })
  @IsDateString()
  scheduledAt: string;

  @ApiProperty({
    description: 'Work description and notes',
    example: 'AC unit not cooling properly'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Service address (if different from customer address)',
    required: false
  })
  @IsOptional()
  @IsString()
  serviceAddress?: string;
}
```

### Response Documentation

```typescript
// Endpoint with response examples
@Post()
@ApiOperation({ summary: 'Create a new work order' })
@ApiResponse({
  status: 201,
  description: 'Work order created successfully',
  schema: {
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      number: 'WO-2025-001234',
      customerId: '...',
      technicianId: '...',
      status: 'pending',
      priority: 'high',
      createdAt: '2025-10-19T10:30:00Z'
    }
  }
})
@ApiResponse({
  status: 400,
  description: 'Invalid input data'
})
@ApiResponse({
  status: 401,
  description: 'Unauthorized - Missing or invalid token'
})
@ApiResponse({
  status: 403,
  description: 'Forbidden - Insufficient permissions'
})
async create(@Body() dto: CreateWorkOrderDto) {
  return this.workOrdersService.create(dto);
}
```

---

## 11. Third-Party Integrations Setup

### QuickBooks OAuth 2.0

**Step 1: Create QuickBooks App**
1. Go to https://developer.intuit.com/
2. Create new app → Select "QuickBooks Online"
3. Get credentials:
   - Client ID
   - Client Secret
4. Add redirect URI: `http://localhost:3000/api/v1/integrations/quickbooks/callback`

**Step 2: Environment Variables**
```bash
QUICKBOOKS_CLIENT_ID=your-client-id
QUICKBOOKS_CLIENT_SECRET=your-client-secret
QUICKBOOKS_REDIRECT_URI=http://localhost:3000/api/v1/integrations/quickbooks/callback
QUICKBOOKS_ENVIRONMENT=sandbox  # or 'production'
```

**Step 3: Implementation**
```typescript
// modules/integrations/quickbooks.service.ts
import OAuthClient from 'intuit-oauth';

@Injectable()
export class QuickBooksService {
  private oauthClient: OAuthClient;

  constructor() {
    this.oauthClient = new OAuthClient({
      clientId: process.env.QUICKBOOKS_CLIENT_ID!,
      clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET!,
      environment: process.env.QUICKBOOKS_ENVIRONMENT,
      redirectUri: process.env.QUICKBOOKS_REDIRECT_URI!
    });
  }

  // Generate authorization URL
  getAuthUrl(): string {
    return this.oauthClient.authorizeUri({
      scope: [OAuthClient.scopes.Accounting],
      state: 'randomState'  // CSRF protection
    });
  }

  // Handle OAuth callback
  async handleCallback(url: string) {
    const authResponse = await this.oauthClient.createToken(url);
    
    // Store tokens securely in database
    await this.storeTokens({
      accessToken: authResponse.access_token,
      refreshToken: authResponse.refresh_token,
      realmId: authResponse.realmId,
      expiresAt: new Date(Date.now() + authResponse.expires_in * 1000)
    });

    return authResponse;
  }
}
```

### Twilio (SMS & Voice)

**Step 1: Create Twilio Account**
1. Sign up at https://www.twilio.com/
2. Get credentials from Console Dashboard:
   - Account SID
   - Auth Token
3. Buy a phone number for SMS/calls

**Step 2: Environment Variables**
```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

**Step 3: Implementation**
```typescript
// modules/communications/sms.service.ts
import { Twilio } from 'twilio';

@Injectable()
export class SMSService {
  private client: Twilio;

  constructor() {
    this.client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  async sendSMS(to: string, message: string) {
    const result = await this.client.messages.create({
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: message
    });

    return result;
  }
}
```

### SendGrid (Email)

**Step 1: Create SendGrid Account**
1. Sign up at https://sendgrid.com/
2. Create API Key (Settings → API Keys)
3. Verify sender email

**Step 2: Environment Variables**
```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME=HVAC Management
```

**Step 3: Implementation**
```typescript
// modules/communications/email.service.ts
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  async sendEmail(to: string, subject: string, html: string) {
    const msg = {
      to,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: process.env.SENDGRID_FROM_NAME!
      },
      subject,
      html
    };

    const result = await sgMail.send(msg);
    return result;
  }
}
```

### AWS S3 (File Storage)

**Step 1: Create AWS Account & S3 Bucket**
1. Sign up at https://aws.amazon.com/
2. Create IAM user with S3 permissions
3. Get credentials (Access Key + Secret Key)
4. Create S3 bucket: `hvac-uploads-dev`

**Step 2: Environment Variables**
```bash
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=hvac-uploads-dev
```

**Step 3: Implementation**
```typescript
// modules/storage/s3.service.ts
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
      }
    });
  }

  async uploadFile(key: string, file: Buffer, contentType: string) {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file,
      ContentType: contentType
    });

    await this.s3Client.send(command);
    return { key, url: this.getPublicUrl(key) };
  }

  async getSignedDownloadUrl(key: string, expiresIn = 3600) {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn });
  }

  private getPublicUrl(key: string): string {
    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }
}
```

---

## 12. Testing Strategy & Requirements

### Test Coverage Requirements

- **Minimum Coverage**: 80% overall
- **Critical Paths**: 90%+ (auth, permissions, financial calculations)
- **New Features**: Must include tests before PR approval

### Testing Pyramid

```
           /\
          /  \    E2E Tests (10%)
         /    \   - Critical user journeys
        /______\  - Cross-browser testing
       /        \
      /          \ Integration Tests (30%)
     /            \ - API endpoint testing
    /______________\ - Database interactions
   /                \
  /                  \ Unit Tests (60%)
 /____________________\ - Business logic
                        - Utility functions
                        - Component logic
```

### Unit Testing (Jest)

**Backend Unit Test Example**:
```typescript
// modules/work-orders/work-orders.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrdersService } from './work-orders.service';
import { NotFoundException } from '@nestjs/common';

describe('WorkOrdersService', () => {
  let service: WorkOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkOrdersService]
    }).compile();

    service = module.get<WorkOrdersService>(WorkOrdersService);
  });

  describe('findOne', () => {
    it('should return a work order if found', async () => {
      const workOrder = { id: '123', number: 'WO-001' };
      jest.spyOn(service, 'findOne').mockResolvedValue(workOrder as any);

      const result = await service.findOne('123');
      expect(result).toEqual(workOrder);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a work order with correct data', async () => {
      const dto = {
        customerId: 'cust-1',
        technicianId: 'tech-1',
        priority: 'high',
        scheduledAt: new Date()
      };

      const result = await service.create(dto);
      
      expect(result).toHaveProperty('id');
      expect(result.priority).toBe('high');
      expect(result.status).toBe('pending');
    });
  });
});
```

**Frontend Component Test Example**:
```typescript
// components/WorkOrderCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkOrderCard } from './WorkOrderCard';

describe('WorkOrderCard', () => {
  const mockWorkOrder = {
    id: '123',
    number: 'WO-001',
    customer: { name: 'John Doe' },
    status: 'pending',
    priority: 'high'
  };

  it('renders work order information correctly', () => {
    render(<WorkOrderCard workOrder={mockWorkOrder} />);

    expect(screen.getByText('WO-001')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('High Priority')).toBeInTheDocument();
  });

  it('calls onEdit when edit button clicked', () => {
    const onEdit = jest.fn();
    render(<WorkOrderCard workOrder={mockWorkOrder} onEdit={onEdit} />);

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledWith(mockWorkOrder.id);
  });
});
```

### API Testing (Supertest)

```typescript
// test/work-orders.e2e-spec.ts
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';

describe('Work Orders (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    // Login and get auth token
    const loginResponse = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'admin@hvac.com', password: 'Admin123!' });

    authToken = loginResponse.body.accessToken;
  });

  describe('/api/v1/work-orders (GET)', () => {
    it('should return array of work orders', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/work-orders')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 401 without auth token', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/work-orders')
        .expect(401);
    });
  });

  describe('/api/v1/work-orders (POST)', () => {
    it('should create a work order', async () => {
      const dto = {
        customerId: 'uuid-here',
        technicianId: 'uuid-here',
        priority: 'high',
        scheduledAt: new Date().toISOString()
      };

      const response = await request(app.getHttpServer())
        .post('/api/v1/work-orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(dto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.priority).toBe('high');
    });

    it('should validate required fields', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/work-orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send({}) // Missing required fields
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
```

### E2E Testing (Playwright)

```typescript
// e2e/work-orders.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Work Orders Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('http://localhost:5000/login');
    await page.fill('input[name="email"]', 'admin@hvac.com');
    await page.fill('input[name="password"]', 'Admin123!');
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:5000/dashboard');
  });

  test('should create new work order', async ({ page }) => {
    await page.click('text=Work Orders');
    await page.click('button:has-text("New Work Order")');

    // Fill form
    await page.selectOption('select[name="customerId"]', { label: 'John Doe' });
    await page.selectOption('select[name="technicianId"]', { label: 'Bob Smith' });
    await page.selectOption('select[name="priority"]', 'high');
    await page.fill('textarea[name="description"]', 'AC not cooling');
    
    // Submit
    await page.click('button:has-text("Create")');

    // Verify success
    await expect(page.locator('text=Work order created successfully')).toBeVisible();
  });

  test('should filter work orders by status', async ({ page }) => {
    await page.goto('http://localhost:5000/work-orders');

    // Apply filter
    await page.selectOption('select[name="status"]', 'completed');
    await page.click('button:has-text("Apply Filters")');

    // Verify filtered results
    const workOrders = page.locator('.work-order-card');
    const count = await workOrders.count();

    for (let i = 0; i < count; i++) {
      await expect(workOrders.nth(i)).toContainText('Completed');
    }
  });
});
```

### Test Scripts (package.json)

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "test:playwright": "playwright test",
    "test:playwright:ui": "playwright test --ui",
    "test:ci": "jest --coverage && playwright test"
  }
}
```

### CI/CD Pipeline (GitHub Actions)

```.yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: hvac_test
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_password
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:cov
        env:
          DATABASE_URL: postgresql://test_user:test_password@localhost:5432/hvac_test

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          DATABASE_URL: postgresql://test_user:test_password@localhost:5432/hvac_test

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npm run test:playwright

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

---

## 13. Code Organization & Style Guide

### File Naming Conventions

```
✅ CORRECT:
- work-order.service.ts        (kebab-case for files)
- WorkOrderCard.tsx             (PascalCase for React components)
- useWorkOrders.ts              (camelCase for hooks)
- create-work-order.dto.ts      (kebab-case for DTOs)
- work-orders.controller.ts     (kebab-case for controllers)
- IWorkOrder.ts                 (PascalCase for interfaces with I prefix)

❌ INCORRECT:
- WorkOrder.service.ts
- work_order_card.tsx
- CreateWorkOrderDTO.ts
- WorkOrdersController.ts
```

### ESLint Configuration

```javascript
// .eslintrc.json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "import"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always",
        "alphabetize": { "order": "asc" }
      }
    ],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### Import Order

```typescript
// 1. External libraries
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

// 2. Internal modules (absolute imports)
import { db } from '@/database/drizzle';
import { users } from '@/database/schemas/users.schema';
import { CreateUserDto } from '@/modules/users/dto';

// 3. Relative imports
import { AuthService } from '../auth/auth.service';
import { UserMapper } from './user.mapper';

// 4. Types
import type { User } from '@/types';
```

### Folder Organization Examples

**Feature-based (Recommended)**:
```
src/
├── features/
│   ├── work-orders/
│   │   ├── components/
│   │   │   ├── WorkOrderCard.tsx
│   │   │   ├── WorkOrderForm.tsx
│   │   │   └── WorkOrderList.tsx
│   │   ├── hooks/
│   │   │   └── useWorkOrders.ts
│   │   ├── services/
│   │   │   └── workOrder.service.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts  (exports all public APIs)
│   ├── inventory/
│   └── users/
```

### Code Comments Guidelines

```typescript
// ✅ GOOD: Explain WHY, not WHAT
/**
 * Applies soft delete instead of hard delete to maintain audit trail.
 * Work orders are never permanently deleted per SOX compliance requirements.
 */
async softDelete(id: string) {
  return await db.update(workOrders)
    .set({ deletedAt: new Date() })
    .where(eq(workOrders.id, id));
}

// ❌ BAD: Stating the obvious
/**
 * Updates the work order
 */
async update(id: string, data: any) {
  // Update work order in database
  return await db.update(workOrders).set(data).where(eq(workOrders.id, id));
}

// ✅ GOOD: Document complex business logic
/**
 * Calculate technician utilization rate.
 * 
 * Formula: (Billable Hours / Available Hours) × 100
 * 
 * Billable Hours: Time spent on completed, paid work orders
 * Available Hours: Total work hours minus PTO/holidays
 * 
 * @param technicianId - UUID of technician
 * @param startDate - Period start date
 * @param endDate - Period end date
 * @returns Utilization rate as percentage (0-100)
 */
calculateUtilization(technicianId: string, startDate: Date, endDate: Date): number {
  // Implementation...
}
```

### Pre-commit Hooks (Husky + lint-staged)

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
npm run test -- --bail --findRelatedTests
```

---

## 14. Error Handling & Logging

### Error Classes

```typescript
// common/errors/app-error.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id 
      ? `${resource} with ID ${id} not found`
      : `${resource} not found`;
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public errors?: any[]) {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403);
  }
}
```

### Global Exception Filter

```typescript
// common/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '@/common/services/logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : 500;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal server error';

    // Log error
    this.logger.error('HTTP Exception', {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      stack: exception instanceof Error ? exception.stack : undefined,
      user: (request as any).user?.id
    });

    // Send error response
    response.status(status).json({
      statusCode: status,
      message: typeof message === 'string' ? message : (message as any).message,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(process.env.NODE_ENV === 'development' && {
        stack: exception instanceof Error ? exception.stack : undefined
      })
    });
  }
}
```

### Winston Logger Service

```typescript
// common/services/logger.service.ts
import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        }),
        new winston.transports.File({ 
          filename: 'logs/error.log', 
          level: 'error' 
        }),
        new winston.transports.File({ 
          filename: 'logs/combined.log' 
        })
      ]
    });
  }

  log(message: string, context?: any) {
    this.logger.info(message, { context });
  }

  error(message: string, context?: any) {
    this.logger.error(message, { context });
  }

  warn(message: string, context?: any) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: any) {
    this.logger.debug(message, { context });
  }
}
```

### Sentry Integration (Production Error Tracking)

```typescript
// main.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,  // 10% of transactions
  beforeSend(event) {
    // Remove sensitive data
    if (event.request) {
      delete event.request.cookies;
      if (event.request.headers) {
        delete event.request.headers['authorization'];
      }
    }
    return event;
  }
});
```

### User-Friendly Error Messages

```typescript
// Frontend error handling
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

export function handleApiError(error: unknown) {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    switch (status) {
      case 400:
        toast.error(message || 'Invalid input. Please check your data.');
        break;
      case 401:
        toast.error('Your session has expired. Please log in again.');
        // Redirect to login
        break;
      case 403:
        toast.error('You don\'t have permission to perform this action.');
        break;
      case 404:
        toast.error(message || 'The requested resource was not found.');
        break;
      case 500:
        toast.error('Something went wrong on our end. Please try again later.');
        // Send to Sentry
        break;
      default:
        toast.error('An unexpected error occurred. Please try again.');
    }
  } else {
    toast.error('Network error. Please check your connection.');
  }
}
```

---

## 15. Performance Requirements & Optimization

### Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Page Load Time** (First Contentful Paint) | < 1.5s | Lighthouse |
| **Time to Interactive** | < 3.0s | Lighthouse |
| **API Response Time** (P95) | < 200ms | Server logs |
| **Dashboard Load** (with data) | < 2.0s | Browser DevTools |
| **Database Queries** | < 100ms | Query logs |
| **Bundle Size** (initial JS) | < 300KB gzipped | Webpack Bundle Analyzer |
| **Largest Contentful Paint** | < 2.5s | Lighthouse |

### Database Query Optimization

**1. Use Indexes**:
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_work_orders_status ON work_orders(status);
CREATE INDEX idx_work_orders_technician ON work_orders(technician_id);
CREATE INDEX idx_work_orders_date ON work_orders(scheduled_at);
CREATE INDEX idx_work_orders_customer ON work_orders(customer_id);

-- Composite indexes for common filter combinations
CREATE INDEX idx_work_orders_status_date ON work_orders(status, scheduled_at);
```

**2. Use SELECT Specific Columns**:
```typescript
// ❌ BAD: Select all columns
const workOrders = await db.select().from(workOrders);

// ✅ GOOD: Select only needed columns
const workOrders = await db
  .select({
    id: workOrders.id,
    number: workOrders.number,
    status: workOrders.status,
    customerName: customers.name
  })
  .from(workOrders)
  .leftJoin(customers, eq(workOrders.customerId, customers.id));
```

**3. Use Pagination**:
```typescript
async findAll(page = 1, limit = 20) {
  const offset = (page - 1) * limit;
  
  const [data, total] = await Promise.all([
    db.select().from(workOrders).limit(limit).offset(offset),
    db.select({ count: sql`count(*)` }).from(workOrders)
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total: Number(total[0].count),
      totalPages: Math.ceil(Number(total[0].count) / limit)
    }
  };
}
```

### Caching Strategy

**Backend Caching (Redis)**:
```typescript
// common/services/cache.service.ts
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class CacheService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl = 3600) {
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }

  async del(key: string) {
    await this.redis.del(key);
  }

  async invalidatePattern(pattern: string) {
    const keys = await this.redis.keys(pattern);
    if (keys.length) {
      await this.redis.del(...keys);
    }
  }
}

// Usage in service
@Injectable()
export class WorkOrdersService {
  constructor(private cacheService: CacheService) {}

  async findAll() {
    const cacheKey = 'work_orders:all';
    
    // Try cache first
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    // Fetch from DB
    const data = await db.select().from(workOrders);

    // Cache for 5 minutes
    await this.cacheService.set(cacheKey, data, 300);

    return data;
  }

  async update(id: string, dto: UpdateWorkOrderDto) {
    const updated = await db.update(workOrders)...;

    // Invalidate cache
    await this.cacheService.invalidatePattern('work_orders:*');

    return updated;
  }
}
```

**Frontend Caching (React Query)**:
```typescript
// hooks/useWorkOrders.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workOrderService } from '@/services/workOrder.service';

export function useWorkOrders(filters?: any) {
  return useQuery({
    queryKey: ['work-orders', filters],
    queryFn: () => workOrderService.getAll(filters),
    staleTime: 5 * 60 * 1000,  // 5 minutes
    cacheTime: 10 * 60 * 1000   // 10 minutes
  });
}

export function useCreateWorkOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workOrderService.create,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['work-orders']);
    }
  });
}
```

### Bundle Optimization

**1. Code Splitting**:
```typescript
// routes/index.tsx
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const WorkOrders = lazy(() => import('@/pages/WorkOrders'));
const ContractorTools = lazy(() => import('@/pages/ContractorTools'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/work-orders" element={<WorkOrders />} />
        <Route path="/contractor-tools" element={<ContractorTools />} />
      </Routes>
    </Suspense>
  );
}
```

**2. Tree Shaking & Dead Code Elimination**:
```typescript
// ❌ BAD: Imports entire library
import _ from 'lodash';

// ✅ GOOD: Import only needed functions
import debounce from 'lodash/debounce';
import groupBy from 'lodash/groupBy';
```

**3. Image Optimization**:
```typescript
// Use optimized image formats
import { lazy } from 'react';

function ProductImage({ src }: { src: string }) {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <source srcSet={`${src}.avif`} type="image/avif" />
      <img src={src} alt="Product" loading="lazy" />
    </picture>
  );
}
```

**4. Vite Build Optimization**:
```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'chart-vendor': ['recharts', 'date-fns']
        }
      }
    },
    chunkSizeWarningLimit: 500
  }
});
```

---

## 16. Security Implementation Checklist

### OWASP Top 10 Mitigation

#### 1. **Broken Access Control**
- ✅ Implement permission-based guards on all endpoints
- ✅ Validate user permissions server-side (never trust client)
- ✅ Use data-level scopes (own/team/all)
- ✅ Prevent IDOR (Insecure Direct Object Reference) attacks

```typescript
// ❌ BAD: No permission check
@Get(':id')
async getWorkOrder(@Param('id') id: string) {
  return this.workOrdersService.findOne(id);
}

// ✅ GOOD: Permission + ownership check
@Get(':id')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RequirePermissions('work_orders:read')
async getWorkOrder(@Param('id') id: string, @CurrentUser() user: User) {
  const workOrder = await this.workOrdersService.findOne(id);
  
  // Check ownership if user doesn't have 'all' scope
  if (!user.hasScope('all') && workOrder.technicianId !== user.id) {
    throw new ForbiddenError();
  }
  
  return workOrder;
}
```

#### 2. **SQL Injection**
- ✅ Always use parameterized queries (Drizzle ORM handles this)
- ✅ Never concatenate user input into SQL strings

```typescript
// ❌ BAD: String concatenation
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ GOOD: Parameterized with Drizzle
const user = await db.select().from(users).where(eq(users.email, email));
```

#### 3. **XSS (Cross-Site Scripting)**
- ✅ Use Helmet middleware for security headers
- ✅ Sanitize user input before storage
- ✅ Use CSP (Content Security Policy)
- ✅ React escapes by default, but use `dangerouslySetInnerHTML` carefully

```typescript
// Backend: Helmet setup
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],  // Avoid unsafe-inline in production
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:']
    }
  }
}));

// Frontend: Sanitize HTML if needed
import DOMPurify from 'dompurify';

function SafeHTML({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

#### 4. **CSRF (Cross-Site Request Forgery)**
- ✅ Use CSRF tokens for state-changing operations
- ✅ Validate `Origin` and `Referer` headers
- ✅ Use `SameSite` cookie attribute

```typescript
// Backend: CSRF protection
import * as csurf from 'csurf';

app.use(csurf({ cookie: true }));

// Frontend: Include CSRF token
const csrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];

axios.post('/api/work-orders', data, {
  headers: { 'X-XSRF-TOKEN': csrfToken }
});
```

#### 5. **Sensitive Data Exposure**
- ✅ Encrypt sensitive data at rest (use KMS)
- ✅ Use HTTPS everywhere (TLS 1.3)
- ✅ Never log sensitive data (passwords, tokens, SSN)
- ✅ Mask sensitive data in logs

```typescript
// Encrypt sensitive fields
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

class EncryptionService {
  encrypt(text: string): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-gcm', Buffer.from(process.env.ENCRYPTION_KEY!), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  }

  decrypt(encrypted: string): string {
    const [ivHex, encryptedText] = encrypted.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = createDecipheriv('aes-256-gcm', Buffer.from(process.env.ENCRYPTION_KEY!), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

// Use for SSN, credit cards, etc.
user.ssn = encryptionService.encrypt(user.ssn);
```

#### 6. **Security Misconfiguration**
- ✅ Remove default credentials
- ✅ Disable directory listing
- ✅ Keep dependencies updated
- ✅ Use environment-specific configs

```bash
# Security checklist
npm audit  # Check for vulnerabilities
npm outdated  # Check outdated packages
npm update  # Update dependencies
```

#### 7. **Insecure Deserialization**
- ✅ Validate and sanitize all JSON inputs
- ✅ Use DTOs with class-validator
- ✅ Never deserialize untrusted data

```typescript
// Use class-validator DTOs
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

// NestJS will automatically validate
@Post()
async create(@Body() dto: CreateUserDto) {
  // dto is guaranteed to be valid
}
```

#### 8. **Using Components with Known Vulnerabilities**
- ✅ Run `npm audit` regularly
- ✅ Use Dependabot/Renovate for automated updates
- ✅ Subscribe to security advisories

```json
// .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

#### 9. **Insufficient Logging & Monitoring**
- ✅ Log all authentication attempts
- ✅ Log permission changes
- ✅ Log sensitive operations (delete, financial)
- ✅ Monitor for suspicious patterns

```typescript
// Log security events
async login(email: string, password: string, ip: string) {
  this.logger.log('Login attempt', {
    email,
    ip,
    timestamp: new Date()
  });

  const user = await this.validateUser(email, password);

  if (!user) {
    this.logger.warn('Failed login', { email, ip });
    throw new UnauthorizedError();
  }

  this.logger.log('Successful login', {
    userId: user.id,
    email,
    ip
  });

  return this.generateTokens(user);
}
```

#### 10. **Server-Side Request Forgery (SSRF)**
- ✅ Validate and sanitize URLs
- ✅ Use allowlists for external requests
- ✅ Block private IP ranges

```typescript
// Validate URLs before fetching
import { URL } from 'url';

function isAllowedUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    
    // Block private IPs
    const privateRanges = ['127.0.0.1', 'localhost', '0.0.0.0', '10.', '192.168.'];
    if (privateRanges.some(range => url.hostname.startsWith(range))) {
      return false;
    }

    // Allowlist domains
    const allowed = ['api.quickbooks.com', 'api.twilio.com'];
    return allowed.some(domain => url.hostname.endsWith(domain));
  } catch {
    return false;
  }
}
```

### Input Validation Checklist

```typescript
// Complete validation example
import {
  IsString,
  IsEmail,
  IsUUID,
  IsEnum,
  IsOptional,
  IsInt,
  Min,
  Max,
  MinLength,
  MaxLength,
  Matches,
  IsDateString,
  ValidateNested,
  IsArray,
  ArrayMinSize
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorkOrderDto {
  @IsUUID()
  customerId: string;

  @IsUUID()
  technicianId: string;

  @IsEnum(['low', 'medium', 'high', 'urgent'])
  priority: string;

  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  description: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)  // Phone format: 555-555-5555
  phone?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1000000)
  estimatedCost?: number;

  @IsDateString()
  scheduledAt: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => LineItemDto)
  lineItems: LineItemDto[];
}
```

---

## 17. Deployment & Infrastructure (Replit)

### Deployment Configuration

```typescript
// Configure deployment in Replit
// File: .replit (auto-generated)
run = "npm run dev"
entrypoint = "backend/src/main.ts"

[deployment]
run = ["npm", "run", "start:prod"]
deploymentTarget = "autoscale"
ignorePorts = false
```

**Deployment Types**:
- **Autoscale**: For stateless web apps (recommended for this project)
- **Reserved VM**: For apps needing persistent state
- **Static**: For frontend-only apps

### Environment Variables (Secrets)

**Setting Secrets in Replit**:
1. Go to Tools → Secrets
2. Add environment variables:

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# JWT
JWT_SECRET=your-production-secret
JWT_REFRESH_SECRET=your-production-refresh-secret

# Third-party APIs
SENDGRID_API_KEY=SG.xxx
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
AWS_ACCESS_KEY_ID=AKIAxxx
AWS_SECRET_ACCESS_KEY=xxx

# Production URLs
FRONTEND_URL=https://your-app.repl.co
```

### Build Commands

```json
// package.json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev",
    
    "build": "npm run build:backend && npm run build:frontend",
    "build:backend": "cd backend && npm run build",
    "build:frontend": "cd frontend && npm run build",
    
    "start:prod": "NODE_ENV=production node backend/dist/main.js",
    
    "db:migrate:prod": "cd backend && npm run db:migrate",
    "db:seed:prod": "cd backend && npm run db:seed"
  }
}
```

### Health Check Endpoint

```typescript
// Backend health check
@Controller()
export class AppController {
  @Get('/health')
  async healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: await this.checkDatabase(),
      redis: await this.checkRedis()
    };
  }

  private async checkDatabase() {
    try {
      await db.select().from(users).limit(1);
      return 'connected';
    } catch {
      return 'disconnected';
    }
  }
}
```

### Monitoring & Logging

```typescript
// Production logging setup
if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.File({
    filename: 'logs/production.log',
    maxsize: 5242880, // 5MB
    maxFiles: 5
  }));

  // Send errors to Sentry
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}
```

### Backup Schedule (Automated)

```bash
# Cron job for database backups (runs on Replit)
# File: .replit.cron (if supported) or use backend scheduler

0 2 * * *  # Daily at 2 AM
npm run db:backup
```

```typescript
// Backend backup service
@Injectable()
export class BackupService {
  @Cron('0 2 * * *')  // Daily at 2 AM
  async performBackup() {
    const timestamp = format(new Date(), 'yyyy-MM-dd-HHmmss');
    const filename = `backup-${timestamp}.sql`;
    
    // Create database dump
    const { exec } = require('child_process');
    exec(`pg_dump ${process.env.DATABASE_URL} > backups/${filename}`);
    
    // Upload to S3
    await this.s3Service.uploadFile(
      `backups/${filename}`,
      fs.readFileSync(`backups/${filename}`),
      'application/sql'
    );
    
    // Clean up local file
    fs.unlinkSync(`backups/${filename}`);
  }
}
```

---

## 18. Development Workflow & Git Strategy

### Git Branching Model

```
main (production)
  │
  ├── develop (staging)
  │     │
  │     ├── feature/user-authentication
  │     ├── feature/work-order-crud
  │     ├── feature/contractor-tools
  │     │
  │     ├── bugfix/login-redirect-issue
  │     └── hotfix/critical-security-patch
  │
  └── release/v1.0.0
```

**Branch Naming**:
- `feature/short-description` - New features
- `bugfix/issue-description` - Bug fixes
- `hotfix/critical-issue` - Urgent production fixes
- `release/v1.0.0` - Release preparation

### Commit Message Format (Conventional Commits)

```bash
# Format: <type>(<scope>): <subject>

# Types:
feat: New feature
fix: Bug fix
docs: Documentation changes
style: Code formatting (no logic change)
refactor: Code restructuring
perf: Performance improvements
test: Adding/updating tests
chore: Build process, dependencies

# Examples:
feat(auth): add SSO login with SAML
fix(work-orders): resolve date picker timezone issue
docs(api): update Swagger documentation for permissions
refactor(database): optimize work order queries
test(users): add unit tests for user service
```

### Pull Request Template

```markdown
<!-- .github/pull_request_template.md -->
## Description
<!-- Brief description of changes -->

## Type of Change
- [ ] Feature (new functionality)
- [ ] Bugfix (fixes an issue)
- [ ] Refactor (code improvement)
- [ ] Documentation
- [ ] Performance improvement

## Checklist
- [ ] Code follows style guide (ESLint/Prettier)
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] Database migrations included (if applicable)
- [ ] Tested locally
- [ ] Screenshots attached (for UI changes)

## Related Issues
Closes #123

## Screenshots (if applicable)
<!-- Add before/after screenshots -->

## Additional Notes
<!-- Any additional context -->
```

### Code Review Checklist

**Reviewer Checklist**:
- ✅ Code follows project conventions
- ✅ No hardcoded secrets or sensitive data
- ✅ Proper error handling implemented
- ✅ Tests are comprehensive and passing
- ✅ No unnecessary dependencies added
- ✅ Performance implications considered
- ✅ Security vulnerabilities addressed
- ✅ Database queries optimized
- ✅ API endpoints documented
- ✅ Accessibility standards met (WCAG 2.1 AA)

### Versioning Strategy (Semantic Versioning)

```
MAJOR.MINOR.PATCH
  2  .  1  .  3

MAJOR: Breaking changes (v1 → v2)
MINOR: New features (backward compatible)
PATCH: Bug fixes
```

**Examples**:
- `1.0.0` - Initial release
- `1.1.0` - Added contractor tools feature
- `1.1.1` - Fixed calculator bug
- `2.0.0` - Redesigned permission system (breaking change)

---

## 19. UI Component Library & Design System

### shadcn/ui Components

**Installation**:
```bash
npx shadcn-ui@latest init
```

**Component Configuration**:
```typescript
// components.json
{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

**Add Components**:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add table
npx shadcn-ui@latest add card
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
```

### Design Tokens

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Colors */
    --primary: 210 100% 50%;        /* #0080FF */
    --primary-foreground: 0 0% 100%;
    
    --secondary: 210 20% 95%;
    --secondary-foreground: 210 20% 20%;
    
    --accent: 160 60% 50%;          /* Success green */
    --accent-foreground: 0 0% 100%;
    
    --destructive: 0 72% 51%;       /* Error red */
    --destructive-foreground: 0 0% 100%;
    
    --background: 0 0% 100%;
    --foreground: 210 15% 10%;
    
    --card: 0 0% 100%;
    --card-foreground: 210 15% 10%;
    
    --border: 210 15% 90%;
    --input: 210 15% 90%;
    --ring: 210 100% 50%;
    
    /* Spacing */
    --radius: 0.5rem;
    
    /* Typography */
    --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
    --font-mono: 'Fira Code', 'Courier New', monospace;
  }

  .dark {
    --primary: 210 100% 60%;
    --background: 210 20% 10%;
    --foreground: 0 0% 95%;
    /* ... dark mode tokens */
  }
}
```

### Component Examples

**Button Variants**:
```typescript
import { Button } from '@/components/ui/button';

function Examples() {
  return (
    <>
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      
      <Button disabled>Disabled</Button>
      <Button loading>Loading...</Button>
    </>
  );
}
```

**Form Example**:
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">
            {errors.email.message as string}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <p className="text-sm text-destructive mt-1">
            {errors.password.message as string}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Log in
      </Button>
    </form>
  );
}
```

### Accessibility Standards (WCAG 2.1 AA)

**Keyboard Navigation**:
```typescript
// All interactive elements must be keyboard accessible
<button onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' && handleClick()}>
  Click me
</button>

// Skip to main content
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

**ARIA Labels**:
```typescript
<button aria-label="Close dialog" onClick={onClose}>
  <X className="h-4 w-4" aria-hidden="true" />
</button>

<input
  type="text"
  aria-label="Search work orders"
  aria-describedby="search-help"
/>
<p id="search-help" className="sr-only">
  Search by work order number or customer name
</p>
```

**Color Contrast**:
- Text: Minimum 4.5:1 contrast ratio
- Large text (18pt+): Minimum 3:1
- UI components: Minimum 3:1

**Focus Indicators**:
```css
/* Visible focus styles */
button:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

---

## 20. Implementation Roadmap & Timeline

### Phase 1: Foundation (Weeks 1-4)

**Week 1: Project Setup**
- Day 1-2: Environment setup, repository initialization
- Day 3-4: Database schema design and creation
- Day 5: Authentication system (JWT, login/register)

**Week 2: Core Backend**
- Day 1-3: User management API
- Day 4-5: Role and permission system

**Week 3: Core Frontend**
- Day 1-2: React app setup, routing, layouts
- Day 3-4: Login/register UI
- Day 5: Dashboard skeleton

**Week 4: Integration**
- Day 1-2: Frontend-backend integration
- Day 3-4: Permission-based UI rendering
- Day 5: Testing and bug fixes

**Deliverables**:
- ✅ Working authentication
- ✅ Basic dashboard
- ✅ User/role management

---

### Phase 2: Core Features (Weeks 5-8)

**Week 5: Work Orders Module**
- CRUD operations
- Status workflow
- Assignment to technicians

**Week 6: Inventory Module**
- Stock management
- Purchase orders
- Warehouse operations

**Week 7: Dashboard Analytics**
- KPI cards
- Charts and graphs
- Real-time updates

**Week 8: Contractor Tools**
- Implement 20+ HVAC calculators
- Calculation history
- Mobile optimization

**Deliverables**:
- ✅ Complete work order management
- ✅ Inventory tracking
- ✅ Analytics dashboard
- ✅ Contractor tools operational

---

### Phase 3: Advanced Features (Weeks 9-12)

**Week 9: SSO & MFA**
- SAML integration
- TOTP/SMS MFA
- Session management

**Week 10: Third-Party Integrations**
- QuickBooks sync
- Twilio (SMS/Voice)
- SendGrid (Email)

**Week 11: Notifications & Real-time**
- WebSocket setup
- Multi-channel notifications
- Live updates

**Week 12: Permission Analytics**
- Usage tracking
- Self-service requests
- Compliance reports

**Deliverables**:
- ✅ Enterprise authentication
- ✅ Accounting integration
- ✅ Communication system
- ✅ Permission analytics

---

### Phase 4: Polish & Deploy (Weeks 13-16)

**Week 13: Security Hardening**
- Penetration testing
- OWASP Top 10 compliance
- Encryption implementation

**Week 14: Performance Optimization**
- Database query optimization
- Frontend bundle optimization
- Caching implementation

**Week 15: Testing & QA**
- Unit test coverage (80%+)
- E2E test suite
- Accessibility audit

**Week 16: Deployment & Documentation**
- Production deployment
- User documentation
- Training materials

**Deliverables**:
- ✅ Production-ready application
- ✅ Complete test coverage
- ✅ User documentation

---

### Dependency Matrix

```mermaid
graph TD
    A[Week 1: Project Setup] --> B[Week 2: Core Backend]
    A --> C[Week 3: Core Frontend]
    B --> D[Week 4: Integration]
    C --> D
    D --> E[Week 5: Work Orders]
    D --> F[Week 6: Inventory]
    D --> G[Week 7: Dashboard]
    E --> H[Week 8: Contractor Tools]
    F --> H
    D --> I[Week 9: SSO/MFA]
    E --> J[Week 10: Integrations]
    I --> K[Week 11: Notifications]
    J --> K
    G --> L[Week 12: Analytics]
    K --> M[Week 13: Security]
    M --> N[Week 14: Performance]
    N --> O[Week 15: Testing]
    O --> P[Week 16: Deploy]
```

---

### Milestones & Success Criteria

| Milestone | Week | Success Criteria |
|-----------|------|------------------|
| **M1: MVP Auth** | 4 | Users can login, roles assigned, permissions enforced |
| **M2: Core Modules** | 8 | Work orders and inventory fully functional |
| **M3: Enterprise Features** | 12 | SSO, MFA, integrations working |
| **M4: Production Ready** | 16 | All tests passing, deployed to production |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.1 | 2025-10-19 | System | **DEVELOPER HANDOFF GUIDE** - Complete technical implementation documentation for development team:<br>**20 Comprehensive Sections**:<br>1. Executive Summary - Project overview, 12-16 week timeline, team composition (4-6 developers), key deliverables<br>2. Technology Stack - Exact versions for all dependencies (Node 20.x, React 18.2+, NestJS 10.x, PostgreSQL 16.x, TypeScript 5.3+)<br>3. Development Environment - Step-by-step setup guide with PostgreSQL, environment variables, migrations, seeding<br>4. Frontend Architecture - Complete folder structure, state management (Redux/Zustand), routing patterns<br>5. Backend Architecture - NestJS module structure, service/controller patterns, dependency injection<br>6. Database Schema & Migrations - Drizzle ORM configuration, migration workflow, seeding strategy<br>7. Frontend-Backend Integration - Axios setup, interceptors, token refresh, API service patterns<br>8. Authentication & Authorization - Complete flow diagrams (login, token refresh, MFA, SSO), permission guards<br>9. Real-time Features - Socket.io implementation for WebSocket notifications and live updates<br>10. API Documentation - Swagger/OpenAPI setup, DTO documentation, response examples<br>11. Third-Party Integrations - QuickBooks OAuth, Twilio SMS/Voice, SendGrid email, AWS S3 storage<br>12. Testing Strategy - Jest unit tests, Playwright E2E, 80% coverage requirement, CI/CD pipeline<br>13. Code Organization - File naming conventions, ESLint/Prettier config, import ordering, folder structure<br>14. Error Handling - Custom error classes, Winston logging, Sentry integration, user-friendly messages<br>15. Performance Optimization - Caching strategy (Redis), database indexes, bundle optimization, lazy loading<br>16. Security Checklist - OWASP Top 10 mitigation, input validation, encryption, CSRF protection<br>17. Deployment Guide - Replit Autoscale configuration, secrets management, health checks, backup automation<br>18. Git Workflow - Branching model (main/develop/feature), PR templates, commit conventions, semantic versioning<br>19. UI Component Library - shadcn/ui setup, design tokens, Tailwind config, WCAG 2.1 AA accessibility<br>20. Implementation Roadmap - 4-phase timeline with dependencies, milestones, success criteria<br>**Total Addition**: 3,800+ lines of production-ready technical documentation<br>**Ready for**: Immediate development team handoff and implementation |
| 1.0 | 2025-10-18 | System | Initial comprehensive plan created |
| 1.1 | 2025-10-18 | System | Added zero dollar work order and call back tracking throughout plan:<br>- Added zero dollar WO and call back KPIs<br>- Integrated into all dashboard sections<br>- Added dedicated analytics endpoints<br>- Updated database schema with new columns<br>- Added labor tracking table<br>- Created detailed API response examples<br>- Added financial impact tracking |
| 1.2 | 2025-10-18 | System | Restructured user roles and permissions:<br>- Renamed: Inventory Manager → Warehouse Manager<br>- Removed: Manager role<br>- Added: Field Manager, Lead Dispatch, Lead Tech<br>- Added: Purchasing Manager, Purchasing<br>- Added: Warehouse Personnel<br>- Added: Accounting role<br>- Reorganized permission matrix into 3 tables for clarity<br>- Updated all role descriptions and permission details |
| 1.3 | 2025-10-19 | System | Added comprehensive role and permission customization system:<br>- Documented that current roles/permissions are defaults<br>- Added ability for admins to add/remove permissions from any role<br>- Implemented two permission assignment methods (full role or cherry-pick)<br>- Enabled dynamic permission management<br>- Roles are fully customizable but pre-loaded with defaults<br>- Added access control guidelines for permission management<br>- Included best practices for permission customization |
| 1.4 | 2025-10-19 | System | Added comprehensive technical implementation guide for custom roles:<br>- Complete database schema (6 tables) for roles, permissions, and assignments<br>- TypeScript data models and DTOs for all entities<br>- Full API endpoint specifications (25+ endpoints)<br>- Permission checking service with priority logic (deny > grant > role)<br>- NestJS authorization guard examples<br>- Permission naming conventions (resource:action:scope)<br>- Database seeding examples for default roles<br>- Caching strategy and performance optimization guidance<br>- Security considerations and testing best practices |
| 1.5 | 2025-10-19 | System | Added Owner/CEO role with protected permissions system:<br>- New role: Owner/CEO (position #2, between Super Admin and Admin)<br>- Owner/CEO has ALL permissions from ALL roles except Super Admin permissions<br>- Added "can_be_edited_by_admin" field to roles table and model<br>- Owner/CEO role is protected and cannot be edited by Admins by default<br>- Only Super Admin can toggle "can be edited by admin" setting<br>- Updated all permission matrix tables to include Owner/CEO<br>- Updated role hierarchy from 14 to 15 total roles<br>- Updated seeding examples with canBeEditedByAdmin flags<br>- Updated access control documentation |
| 1.6 | 2025-10-19 | System | Added 12 advanced permission system recommendations:<br>**Priority 1 (Must Have)**:<br>1. Team-scoped user management permissions (managers can manage their teams)<br>2. Permission groups/categories (bundle permissions for easier assignment)<br>3. Data-level permission scopes (own/team/department/all)<br>4. Simplified Owner/CEO implementation (dynamic aggregation or wildcard)<br>**Priority 2 (Should Have)**:<br>5. Role templates and inheritance (easier custom role creation)<br>6. Approval workflows for sensitive permissions<br>7. Permission conflict and violation detection<br>**Priority 3 (Nice to Have)**:<br>8. Time-based and conditional permissions<br>9. Permission delegation system<br>10. Bulk permission operations<br>11. Permission testing and simulation<br>12. Enhanced Admin audit log access<br>Added complete database schemas, TypeScript models, API endpoints, and implementation examples for all 12 recommendations. Includes impact summary: 13 new tables, 5 modified tables, ~25 new endpoints. |
| 2.0 | 2025-10-19 | System | **MAJOR RELEASE** - Comprehensive enterprise-ready enhancements covering security, usability, and integrations:<br>**Security Enhancements**:<br>- SSO/SAML/OIDC integration (Azure AD, Okta, Google Workspace)<br>- Multi-factor authentication (TOTP, SMS, Email, U2F, WebAuthn)<br>- Advanced session management (idle timeout, device trust, anomaly detection)<br>- Encryption standards (AES-256-GCM, KMS integration, field-level encryption)<br>- API security (rate limiting, input validation, XSS/CSRF prevention)<br>- Tamper-evident audit logs with cryptographic chain integrity<br>- Compliance reports (SOX, GDPR, HIPAA, PCI-DSS)<br>- Retention policies and automated data lifecycle<br>**User-Friendliness Enhancements**:<br>- Interactive onboarding tours (role-specific guided walkthroughs)<br>- Contextual help system with searchable knowledge base<br>- In-app notifications with multi-channel delivery (email, SMS, push)<br>- WCAG 2.1 AA accessibility compliance<br>- Mobile-responsive design with breakpoints<br>- Keyboard shortcuts and navigation<br>- User feedback widget (bug reports, feature requests, NPS surveys)<br>**Business Integrations**:<br>- Accounting/ERP sync (QuickBooks, Sage, Xero, NetSuite)<br>- Email integration (SendGrid, AWS SES) with templates<br>- SMS integration (Twilio) for notifications<br>- Phone integration with call tracking and recording<br>- Communication logs and cost tracking<br>**Disaster Recovery & Data Protection**:<br>- Automated backup system (full, incremental, differential)<br>- Encrypted backups with S3 Glacier storage<br>- RPO/RTO targets (1 hour / 4 hours)<br>- Backup integrity testing<br>- Point-in-time restoration<br>**Permission System Analytics**:<br>- Permission usage tracking and analytics<br>- Unused permission detection<br>- Toxic permission combination alerts<br>- Access review reports for compliance<br>- Self-service permission requests with approval workflows<br>- Auto-approval rules for routine requests<br>**Multi-Language Support**:<br>- i18n implementation with translation database<br>- User language preferences<br>- Timezone and date format customization<br>**Database Impact**: Added 25+ new tables, 10+ modified tables<br>**API Impact**: Added 60+ new endpoints across all features<br>**Total New Content**: 2,800+ lines of specifications, schemas, and implementation code |

---

## Approval & Sign-Off

This plan document serves as the blueprint for implementing the Admin Dashboard for the HVAC Management System. All stakeholders should review and approve before development begins.

**Stakeholders**:
- [ ] Product Owner
- [ ] Development Team Lead
- [ ] UX/UI Designer
- [ ] Database Administrator
- [ ] Quality Assurance Lead

---

**End of Admin Dashboard Plan**
