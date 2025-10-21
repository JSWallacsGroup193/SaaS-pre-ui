# HVAC Management System

## Overview
This project is a full-stack HVAC management application designed to streamline operations for HVAC businesses. It offers comprehensive tools for managing work orders, inventory, customer relationships (CRM), dispatching, purchasing, and demand forecasting. Key capabilities include AI-powered chat assistance, barcode scanning, and robust reporting, aiming to provide a complete SaaS solution for the HVAC industry. The entire application uses the OpsNex dark theme (#14b8a6 teal accent with dark slate backgrounds) for consistent UX across all pages.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent, small updates. Ask before making major changes.

## Recent Changes (October 2025)

### User Settings Module (October 21, 2025)
- **Settings Page Integration**: Added comprehensive Settings page to navigation (1450 lines)
- **Backend API Endpoints**: 
  - PUT /api/v1/users/profile - Update user profile (firstName, lastName, email, phone)
  - PUT /api/v1/users/password - Change password with current password verification
- **UsersModule**: Complete module with controller, service, and JWT authentication guard
- **Settings UI Features**: Three tabs (Profile, Security, Notifications), avatar management, form validation, email uniqueness check, bcrypt password hashing
- **Navigation**: Settings link added to sidebar (12th item) with gear icon
- **Profile Updates**: Auto-reload user data after profile changes to reflect in UI

### Super Admin System (October 21, 2025)
- **Complete RBAC Implementation**: Full role-based access control with 38 permissions across 5 categories (users, roles, permissions, tenants, system)
- **Super Admin Role**: Created SUPER_ADMIN role with all permissions, marked as system role (cannot be deleted)
- **Admin Backend API**: Complete AdminModule with protected endpoints at /api/v1/admin/*:
  - Dashboard: System metrics (users, tenants, roles, permissions)
  - Users: CRUD operations, activate/deactivate, role assignment
  - Roles: CRUD operations, permission assignment
  - Permissions: CRUD operations
  - Tenants: View, update, activate/deactivate
- **AdminGuard**: Dedicated guard restricting all admin endpoints to SUPER_ADMIN role only
- **Auth Enhancement**: Updated /auth/me to return user roles and isSuperAdmin flag for frontend authorization
- **Admin UI**: Professional admin panel with 4 pages (Dashboard, Users, Roles, Tenants) using OpsNex dark theme
- **Sidebar Integration**: Conditional "Super Admin" navigation link visible only to users with SUPER_ADMIN role
- **Authenticated API Client**: All admin pages use centralized apiClient with automatic JWT header injection
- **Seed Script**: Idempotent seed script (`npm run seed:admin`) creates default roles, permissions, and admin@hvac.com user

**Default Credentials**: admin@hvac.com / password123 (SUPER_ADMIN)

### Security Enhancements
- **Complete Backend API Coverage**: Added 21 missing CRUD endpoints across all modules (Work Orders, Inventory, CRM, Purchasing, Dispatch, Forecast, Field Calculations)
- **Multi-Tenant Security Hardening**: Implemented comprehensive tenant isolation to prevent IDOR (Insecure Direct Object Reference) vulnerabilities:
  - Created JwtAuthGuard with strict tenant validation (requires authenticated user with valid tenantId)
  - Applied @UseGuards(JwtAuthGuard) to all protected controllers
  - Removed all client-supplied tenantId parameters (path/query/body) - now derived exclusively from authenticated user context
  - All services enforce tenant scoping with findFirst/WHERE tenantId checks
  - Cross-tenant relationship validation (e.g., SKU ownership, WorkOrder ownership, Account/Contact relationships)
  - Consistent error handling with NotFoundException across all services
  - JwtAttachMiddleware globally applied to all routes for authentication enforcement
- **Route Optimization**: Simplified routes by removing :tenantId path parameters (e.g., /crm/accounts/:tenantId → /crm/accounts, /work-orders/by-tenant/:tenantId → /work-orders)
- **Work Orders Routing Fix**: Resolved routing conflict by changing GET ':tenantId' to GET 'by-tenant/:tenantId' to prevent shadowing of GET ':id' route

### Deployment Readiness
- Backend builds successfully with zero TypeScript errors
- All endpoints tested and verified functional
- Application running with proper authentication and authorization
- Database provisioned and accessible via DATABASE_URL
- Environment variables configured correctly

## System Architecture

### UI/UX Decisions
The frontend is a React application built with Vite, utilizing Zustand for state management and React Router for navigation. It features a global ErrorBoundary and a suite of reusable components. The application provides a seamless user experience across modules such as Login, Register, Dashboard, Work Orders, CRM, Inventory, SKU Details, Purchasing, Dispatch, Labels, Forecast, Scanner, Field Tools, and AI Chat. Authentication routing includes smart redirect guards: unauthenticated users can only access /login and /register (all other routes redirect to /login), while authenticated users are automatically redirected from /login and /register to the dashboard. Performance optimizations include lazy loading for Field Tools calculators, route-based code splitting, and component memoization. The UI component system is built with `shadcn/ui` and Tailwind CSS, featuring an OpsNex dark theme and 74 custom components for HVAC operations.

**OpsNex Dark Theme Implementation**: The entire application features a consistent OpsNex dark theme with:
- **Color Palette**: Dark slate backgrounds (slate-950 for pages, slate-900 for cards/containers, slate-800 for sidebar), teal-500 (#14b8a6) accent color for active states and CTAs, light text (slate-100 for primary, slate-300 for secondary, slate-400 for muted)
- **Navigation**: Professional sidebar with OpsNex branding, icon-based navigation with 11 menu items, teal accent for active states with left border indicator, smooth hover transitions
- **Top Bar**: Consistent header with OpsNex logo, company branding, and logout functionality
- **Global Theme Enforcement**: HTML root has `class="dark"` for Tailwind dark mode, body background set to slate-950 (#0f172a)
- **Loading States**: Teal-colored loading spinners and consistent dark backgrounds throughout all lazy-loaded routes

### Technical Implementations
The backend is developed with NestJS and TypeScript, using Prisma as the ORM for a PostgreSQL database. It incorporates JWT-based authentication, a multi-tenant architecture, and role-based access control. Core modules handle Work Order Management, CRM, Inventory Tracking (SKUs, Warehouses, Bins, Stock Ledger with on-hand quantity), Purchasing, Dispatch Scheduling, and Demand Forecasting. A barcode scanner module supports exact and fuzzy SKU matching. The system includes a queue module for background job processing, health and metrics endpoints for monitoring, and API versioning (`/api/v1`) with Swagger UI for documentation. The frontend is configured with Vite for TypeScript support and environment variable handling. Comprehensive TypeScript type definitions cover all Prisma models and backend DTOs.

### Feature Specifications
- **Authentication & Registration**: Complete JWT-based authentication system with professional login and registration flows. Registration page includes form validation with Zod (email, password strength with visual indicator, confirm password, company name, first/last name, phone with auto-formatting, role selection), terms & privacy policy checkbox with react-hook-form Controller integration, OpsNex dark theme (#14b8a6 teal), and seamless auto-login after successful registration with immediate redirect to dashboard. Smart routing prevents authenticated users from accessing auth pages.
- **Work Order Management**: Creation, tracking, and status updates, with detailed views including tasks, parts, notes, and timelines.
- **CRM**: Management of customer accounts, contacts, leads, and notes.
- **Inventory**: Tracking SKUs, warehouses, bins, and a stock ledger with real-time on-hand quantity.
- **Purchasing**: Management of purchase orders.
- **Dispatch**: Drag-and-drop scheduling with real-time backend integration and full persistence. Features include: fully connected backend API (`GET /api/v1/dispatch/all`, `POST /api/v1/dispatch`, `PUT /api/v1/dispatch/:id` for updates, `GET /api/v1/dispatch/technician/:id`), real-time data loading with loading and error states, support for unassigned work orders in UnassignedPanel, automatic data transformation from backend DispatchSlot to frontend WorkOrder view models, technician extraction from dispatch slots with avatar generation, OpsNex dark theme applied to all dispatch components (header, sidebar, week view, work order cards), and drag-and-drop interface with backend persistence for both assignment and unassignment (sends `technicianId: null` for unassigned work orders). Prisma schema updated to allow nullable `technicianId` on DispatchSlot model. Test data seeder available (`backend/scripts/seed-dispatch.ts`) with 3 technicians, 5 customers, and 7 work orders (5 assigned, 2 unassigned).
- **Demand Forecasting Dashboard**: Comprehensive forecasting module with interactive line charts (historical vs. forecasted demand using Recharts), 4 KPI cards (Forecasted Demand, Stockout Risk, Overstock Items, Forecast Accuracy), priority-based reorder recommendations with Create PO integration, Top Movers table with trend indicators (up/down/stable), time period selection (7/30/60/90 days), and Generate Forecast button for backend recalculation.
- **Labels Generator**: Professional inventory label creation tool with SKU search and multi-select (live filtering by SKU or name), customizable label sizes (2x1, 3x2, 4x2, 4x3 inches), selectable fields (SKU, product name, category, barcode, price, date), live preview with JsBarcode CODE128 barcode generation, quantity control per SKU, and print/PDF export functionality for batch label production.
- **Barcode Scanner**: Production-ready camera-based scanning with html5-qrcode, supporting 8 barcode formats (QR Code, EAN-13/8, UPC-A/E, Code-128/39, ITF), exact and fuzzy SKU matching via `/api/v1/scanner/:barcode`, real-time backend lookup, animated scanning frame with pulsing teal corners, sliding bottom sheet UI for results, and direct navigation to SKU detail pages.
- **Field Tools with Work Order Integration**: 21 professional HVAC calculators across electrical, refrigeration, airflow, gas/combustion, hydronic/boiler, and utilities categories, with results savable to work orders.
- **AI Chat**: OpenAI-powered HVAC assistant with HVAC-specific quick suggestions (superheat calculation, diagnostics, procedures), typing indicator with animated dots, feedback buttons (copy/thumbs up/down), ReactMarkdown support for code blocks and formatted responses, and full integration with existing OpenAI backend.
- **Error Pages**: Professional error handling with custom 404 and 500 pages featuring OpsNex dark theme, 10-second auto-redirect countdown on 404 errors, quick navigation links (Dashboard, Work Orders, AI Support), retry functionality on 500 errors, and admin-only error details with stack traces, timestamps, and request IDs.
- **Super Admin Panel**: Complete system administration interface with dashboard (system metrics), user management (CRUD, activate/deactivate, role assignment), role management (view, edit, permission assignment), and tenant management (view, activate/deactivate). Protected by AdminGuard requiring SUPER_ADMIN role, accessible only via /admin/* routes with auth-loading guard preventing premature redirects.
- **Monitoring**: Health checks and application metrics endpoints.
- **Background Jobs**: Queue module for asynchronous task processing.
- **Form System**: Comprehensive form components with React Hook Form, Zod validation, auto-save, and multi-step form capabilities.
- **Notification System**: OpsNex Toast component with various variants for success, error, warning, and info messages.

### System Design Choices
- **Multi-tenancy**: Data is scoped by tenant ID.
- **API Versioning**: All APIs are prefixed with `/api/v1`.
- **Role-based Access Control**: Granular permissions system.
- **Stock Ledger System**: Centralized tracking for accurate inventory levels.
- **Security**: Utilizes Helmet, configurable CORS, JWT authentication, and `class-validator` for input validation.

## External Dependencies

- **Database**: PostgreSQL (via Neon)
- **ORM**: Prisma
- **Frontend Framework**: React
- **Backend Framework**: NestJS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Testing Framework**: Jest
- **Barcode Generation & Scanning**: `jsbarcode` for label barcodes, `html5-qrcode` for camera-based scanning
- **OpenAPI Documentation**: `@nestjs/swagger`
- **OpenAI API**: For the AI-powered chat assistant
- **Data Visualization**: Recharts for demand forecasting charts