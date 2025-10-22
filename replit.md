# OpsNex

## Overview
OpsNex is a full-stack HVAC operations management platform designed to streamline operations for HVAC service businesses. It provides comprehensive tools for managing work orders, inventory, customer relationships (CRM), dispatching, purchasing, and demand forecasting. Key capabilities include AI-powered chat assistance, barcode scanning, and robust reporting, delivering a complete SaaS solution for the HVAC industry. The application features a consistent OpsNex dark theme across all interfaces.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent, small updates. Ask before making major changes.

## System Architecture

### UI/UX Decisions
The frontend is a React application built with Vite, utilizing Zustand for state management and React Router for navigation. It features a global ErrorBoundary and reusable components. The application provides a seamless user experience across modules such as Login, Register, Dashboard, Work Orders, CRM, Inventory, SKU Details, Purchasing, Dispatch, Labels, Forecast, Scanner, Field Tools, and AI Chat. Authentication routing includes smart redirect guards. Performance optimizations include lazy loading, route-based code splitting, and component memoization. The UI component system is built with `shadcn/ui` and Tailwind CSS, featuring an OpsNex dark theme (dark slate backgrounds, teal-500 accent) and 74 custom components. Error pages are professional with auto-redirects and quick navigation links.

**Mobile-First Responsive Design**: Comprehensive mobile optimizations including touch-friendly inputs (h-11 on mobile, h-10 on desktop), responsive grid layouts with adaptive columns (1 column on mobile, 2+ on larger screens), touch-manipulation CSS for improved mobile tap responsiveness, larger minimum touch targets (44-48px), responsive typography and spacing, horizontal scrolling tables for mobile, and adaptive button sizes across all components.

### Technical Implementations
The backend is developed with NestJS and TypeScript, using Prisma as the ORM for a PostgreSQL database. It incorporates JWT-based authentication, a multi-tenant architecture, and role-based access control (RBAC). Core modules handle Work Order Management, CRM, Inventory Tracking (SKUs, Warehouses, Bins, Stock Ledger), Purchasing, Dispatch Scheduling, and Demand Forecasting. A barcode scanner module supports SKU matching. The system includes a queue module for background job processing, health and metrics endpoints, and API versioning (`/api/v1`) with Swagger UI for documentation. Frontend is configured with Vite for TypeScript and environment variable handling. Comprehensive TypeScript type definitions cover Prisma models and backend DTOs. A notification system with multi-channel delivery (in-app, email, SMS) uses HTTP polling (30s interval) for real-time updates. A Super Admin system provides full RBAC implementation with a dedicated role and protected backend API for managing users, roles, permissions, and tenants, complete with an Admin UI. User settings include profile and password management. Security enhancements include comprehensive multi-tenant isolation and tenant scoping on all service operations. System runs on Node.js 20 LTS (v20.19.3) for stability.

### Feature Specifications
- **Authentication & Registration**: JWT-based system with professional login/registration flows, Zod validation, and auto-login post-registration.
- **Work Order Management**: Creation, tracking, and status updates with detailed views.
- **CRM**: Management of accounts, contacts, leads, and notes.
- **Inventory**: Tracking SKUs, warehouses, bins, and stock ledger with real-time on-hand quantity.
- **Purchasing**: Management of purchase orders.
- **Dispatch**: Drag-and-drop scheduling with real-time backend integration and persistence, including unassigned work orders and technician management.
- **Demand Forecasting Dashboard**: Comprehensive module with interactive charts, KPIs, reorder recommendations, and time period selection.
- **Labels Generator**: Professional inventory label creation tool with SKU search, customizable sizes, selectable fields, live preview (JsBarcode CODE128), and print/PDF export.
- **Barcode Scanner**: Production-ready camera-based scanning (html5-qrcode) supporting multiple formats, exact/fuzzy SKU matching, real-time backend lookup, and navigation to SKU detail pages.
- **Field Tools**: 21 professional HVAC calculators across various categories, with results savable to work orders. Includes AI Cost Estimator with Quick (5-min) and Comprehensive (full) modes using OpenAI GPT-4o.
- **AI Chat**: OpenAI-powered HVAC assistant with quick suggestions, rich text support, and feedback options.
- **AI Cost Estimator**: Advanced AI-powered HVAC cost estimation module with Quick and Comprehensive modes. Uses OpenAI GPT-4o to generate detailed estimates including labor, materials, permits, overhead, and profit margins. Integrates with Field Tools and persists estimates to database with full tenant isolation. Backend API endpoint: POST /api/v1/estimator/calculate with JWT authentication.
- **Service Catalog & Pricebook**: Comprehensive service catalog management system for HVAC businesses. Supports three pricing models (flat_rate, hourly, time_and_material). Includes full CRUD for services and labor rates. Database models: ServiceCatalog, ServiceBundle, ServiceBundleItem, LaborRate. Tab-based UI with create/edit dialogs. Backend API: `/api/v1/service-catalog/*`. Seed script: `npm run seed:service-catalog` creates realistic HVAC services, bundles, and labor rates. Known limitation: Bundle item management UI is simplified - bundles created via seed script are viewable/editable for pricing, but adding/removing services from bundles requires backend API calls.
- **Super Admin Panel**: System administration interface for user, role, permission, and tenant management, protected by `AdminGuard`.
- **Notification System**: In-app, email, and SMS notifications with user preferences using HTTP polling (30-second interval). WebSocket disabled due to engine.io/NestJS compatibility issues; HTTP polling provides reliable notification delivery with ~30s latency. Frontend automatically starts polling on login and stops on logout. Toast notifications display for new unread items.
- **Monitoring**: Health checks and application metrics.
- **Background Jobs**: Queue module for asynchronous tasks.
- **Form System**: Comprehensive components with React Hook Form, Zod validation, auto-save, and multi-step capabilities.

### System Design Choices
- **Multi-tenancy**: Data is scoped by tenant ID.
- **API Versioning**: All APIs are prefixed with `/api/v1`.
- **Role-based Access Control**: Granular permissions system with 13 roles (SUPER_ADMIN, OWNER, ADMIN, FIELD_MANAGER, FIELD_SUPERVISOR, TECHNICIAN, OFFICE_MANAGER, WAREHOUSE_MANAGER, SALES_REPRESENTATIVE, CUSTOMER_SERVICE_REPRESENTATIVE, ACCOUNTANT, VIEWER, USER) and 114 permissions across all modules.
- **Stock Ledger System**: Centralized tracking for accurate inventory levels.
- **Security**: Utilizes Helmet, configurable CORS, JWT authentication, and `class-validator` for input validation; comprehensive tenant isolation implemented.

## Demo Data & Testing

### System Credentials

**Super Admin** (system-wide):
- admin@hvac.com / password123 (SUPER_ADMIN role)

**Demo Tenant Users** (HVAC Demo Corp) - All passwords: **demo123**
- owner@hvac.com → OWNER
- admin@hvac.com → ADMIN  
- manager@hvac.com → FIELD_MANAGER
- supervisor@hvac.com → FIELD_SUPERVISOR
- tech@hvac.com → TECHNICIAN
- office@hvac.com → OFFICE_MANAGER
- warehouse@hvac.com → WAREHOUSE_MANAGER
- sales@hvac.com → SALES_REPRESENTATIVE
- service@hvac.com → CUSTOMER_SERVICE_REPRESENTATIVE
- accountant@hvac.com → ACCOUNTANT
- viewer@hvac.com → VIEWER
- user@hvac.com → USER

### Database Seed Scripts
Three database seeding scripts are available for setting up the system:

1. **RBAC Seeding** (`npm run seed:rbac`)
   - Creates all 13 roles with proper hierarchy
   - Creates 114 permissions across all modules
   - Assigns permissions to roles based on comprehensive permission matrix
   - Idempotent (safe to run multiple times)

2. **Demo Tenant Seeding** (`npm run seed:demo`)
   - Creates "HVAC Demo Corp" tenant with complete sample data
   - 12 demo users (one for each role, excluding SUPER_ADMIN)
   - All demo user passwords: **demo123**
   - 5 additional technician users for dispatch testing
   - 12 customer accounts (retail, commercial, residential, property management)
   - 18 contacts across various accounts
   - 8 leads in different stages
   - 20 work orders with varied statuses and priorities
   - 35 realistic HVAC SKUs (filters, refrigerants, parts, equipment, tools)
   - 3 warehouses (Main, Branch, Service Vans)
   - 10 storage bins with organized locations
   - Purchase orders, field calculations, and notifications
   - Idempotent for users/warehouses/SKUs (some CRM entities may duplicate on reruns)

3. **Service Catalog Seeding** (`npm run seed:service-catalog`)
   - Creates sample HVAC services with flat_rate, hourly, and time_and_material pricing
   - 10 realistic services (AC Tune-Up, Furnace Inspection, Filter Replacement, etc.)
   - 4 labor rates (Standard, Emergency, Weekend, Master Technician)
   - 2 seasonal service bundles (Spring and Fall packages)
   - Idempotent for all tenants

4. **Complete Seeding** (`npm run seed:all`)
   - Runs admin seed, RBAC seed, demo tenant seed, and service catalog seed in sequence
   - One-command setup for development/testing environments

### Demo Data Details
The demo tenant includes realistic HVAC business scenarios:
- **Equipment**: Condensers (3-4 ton, various SEER ratings), furnaces (80-100K BTU)
- **Parts**: Capacitors, motors, contactors, thermostats, coils, ignitors, sensors
- **Supplies**: Air filters (various sizes/MERV ratings), refrigerants (R-410A, R-22), copper tubing, flex duct
- **Tools**: Manifold gauges, vacuum pumps, brazing kits, multimeters
- **Work Orders**: Mix of maintenance, repair, and installation jobs across different customer types
- **Dispatch**: Ready for testing with 5 active technician accounts

## Project Structure

```
opsnex/
├── backend/              # NestJS backend API
│   ├── prisma/          # Database schema and migrations
│   ├── scripts/         # Seed scripts (RBAC, demo data)
│   └── src/             # Source code (modules, controllers, services)
├── frontend/            # React + Vite frontend
│   ├── app/            # App-specific components
│   └── src/            # Source code (pages, components, stores)
├── package.json         # Root package configuration
├── replit.md           # Project documentation (this file)
├── TECH_STACK_REFERENCE.md  # Technical reference
└── Shell Scripts:
    ├── build.sh        # Production build script
    ├── dev.sh          # Development server script
    └── setup_merge.sh  # Setup merge script
```

## External Dependencies

- **Database**: PostgreSQL (via Neon)
- **ORM**: Prisma
- **Frontend Framework**: React
- **Backend Framework**: NestJS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Barcode Generation**: `jsbarcode`
- **Barcode Scanning**: `html5-qrcode`
- **OpenAPI Documentation**: `@nestjs/swagger`
- **OpenAI API**: For AI Chat and AI Cost Estimator
- **Data Visualization**: Recharts
- **Validation Library**: Zod (for AI response validation)