# HVAC Management System

## Overview
This project is a full-stack HVAC (Heating, Ventilation, and Air Conditioning) management application designed to streamline operations for HVAC businesses. It offers comprehensive tools for managing work orders, inventory, customer relationships (CRM), dispatching, purchasing, and demand forecasting. Key capabilities include AI-powered chat assistance, barcode scanning, and robust reporting, aiming to provide a complete SaaS solution for the HVAC industry.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent, small updates. Ask before making major changes.

## System Architecture

### UI/UX Decisions
The frontend is a React application built with Vite, utilizing Zustand for state management and React Router for navigation. It features a global ErrorBoundary and a suite of reusable components (Card, Sidebar, TopBar). The application provides a seamless user experience across modules such as Login, Dashboard, Work Orders, CRM, Inventory, SKU Details, Purchasing, Dispatch, Labels, Forecast, Scanner, Field Tools, and AI Chat.

**Performance Optimizations:**
- **Lazy Loading**: All 21 Field Tools calculators are lazy-loaded using React.lazy(), loading only when users click on them, significantly reducing initial bundle size.
- **Route-Based Code Splitting**: Main application routes (Dashboard, Work Orders, CRM, Inventory, etc.) are code-split and loaded on-demand, improving initial page load time.
- **Component Memoization**: Frequently rendered components (SaveToWorkOrder, Sidebar navigation items) are optimized with React.memo to prevent unnecessary re-renders.
- **Loading States**: Suspense boundaries with loading spinners provide smooth transitions during lazy component loads.
- **Codebase Cleanup**: Removed entire `attached_assets/` directory containing duplicate project copies, old archives, and screenshots, achieving 60-80% reduction in project size with zero production dependencies affected.

### Frontend Architecture (Updated: October 20, 2025)

**UI Component System:**
- **shadcn/ui** fully integrated with Tailwind CSS v3.4 and OpsNex dark theme
- **65+ production-ready components** in `frontend/src/components/ui/`
- Component library configured at `frontend/components.json`
- OpsNex dark theme with teal accent (#14b8a6) and slate backgrounds (#0f172a, #1e293b, #334155)
- Utility function for className merging (`cn()`) in `frontend/src/lib/utils.ts`
- All Radix UI primitives installed (26 packages) + supporting libraries (charts, forms, calendars, etc.)
- v0.dev components can be installed using: `npx shadcn@latest add <url>`
- **Custom HVAC Components:** BaseCard, WorkOrderCard, KPICard, CalculatorCard - purpose-built components for HVAC business operations
- **Complete component inventory:** accordion, alert-dialog, alert, aspect-ratio, avatar, badge, base-card, breadcrumb, button-group, button, calculator-card, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, date-input, dialog, drawer, dropdown-menu, empty, field, form, hover-card, input-group, input-otp, input, item, kbd, kpi-card, label, menubar, navigation-menu, number-input, pagination, popover, progress, radio-group, resizable, scroll-area, select-input, select, separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch, table, tabs, text-area, textarea, text-input, toaster, toast, toggle-group, toggle, tooltip, work-order-card, and custom hooks

**TypeScript Type System:**
- Comprehensive type definitions in `frontend/src/types/index.ts` (750+ lines)
- Covers all 69 Prisma models and backend DTOs
- Ensures type safety across the entire frontend application

**API Client Infrastructure:**
- Centralized Axios client (`frontend/src/services/api.ts`) with:
  - Automatic JWT token injection in request headers
  - Global error handling for 401, 403, 404, 422, 500 errors
  - Automatic redirect to login on authentication failure
  - 30-second request timeout
- 12 typed service modules for backend integration:
  - `auth.service.ts` - Authentication (login, register, profile)
  - `workorder.service.ts` - Work order management
  - `inventory.service.ts` - SKU, warehouse, bin operations
  - `crm.service.ts` - Accounts, contacts, leads, notes
  - `purchasing.service.ts` - Purchase order management
  - `dispatch.service.ts` - Technician scheduling
  - `forecast.service.ts` - Demand forecasting
  - `field-calculation.service.ts` - HVAC calculator results
  - `scanner.service.ts` - Barcode scanning
  - `chat.service.ts` - AI assistant
  - `monitoring.service.ts` - Health checks and metrics

**State Management:**
- Enhanced Zustand stores with full TypeScript support:
  - `useAuthStore` - Authentication state, login/logout, user profile
  - `useWorkOrderStore` - Work order CRUD operations, status updates
  - `useInventoryStore` - SKU/warehouse/bin management with pagination
  - `useCRMStore` - Account/contact/lead/note management
- Each store includes loading states, error handling, and optimistic updates

**Authentication System:**
- React Auth Context (`frontend/src/contexts/AuthContext.tsx`)
- Protected route component for authenticated pages
- Public route component (redirects authenticated users)
- Token persistence in localStorage
- Automatic user profile loading on app initialization

**Environment Configuration:**
- Development: API proxied through Vite dev server (`/api/v1` → `http://localhost:3000/api/v1`)
- Production: Direct API calls to `/api/v1`
- Vite config optimized for Replit (port 5000, host 0.0.0.0, allowedHosts: true)

### Technical Implementations
The backend is developed with NestJS and TypeScript, using Prisma as the ORM for a PostgreSQL database. It incorporates JWT-based authentication, a multi-tenant architecture, and role-based access control. Core modules handle Work Order Management, CRM, Inventory Tracking (SKUs, Warehouses, Bins, Stock Ledger with on-hand quantity), Purchasing, Dispatch Scheduling, and Demand Forecasting. A barcode scanner module supports exact and fuzzy SKU matching. The system includes a queue module for background job processing, health and metrics endpoints for monitoring, and API versioning (`/api/v1`) with Swagger UI for documentation. The frontend is configured with Vite for TypeScript support and environment variable handling.

### Feature Specifications
- **Authentication**: JWT-based user authentication and authorization.
- **Work Order Management**: Creation, tracking, and status updates.
- **CRM**: Management of customer accounts, contacts, leads, and notes.
- **Inventory**: Tracking SKUs, warehouses, bins, and a stock ledger with real-time on-hand quantity.
- **Purchasing**: Management of purchase orders.
- **Dispatch**: Scheduling and management of technician dispatch.
- **Forecasting**: Demand forecasting capabilities.
- **Barcode System**: Generation and scanning for inventory, supporting exact and fuzzy matching.
- **Field Tools with Work Order Integration**: 21 professional HVAC calculators for field technicians across 6 categories:
    - Electrical (Ohm's Law, Capacitor Test, Motor Amps, Voltage Drop)
    - Refrigeration (Superheat, Subcooling, Target Superheat, PT Chart)
    - Airflow (CFM, Duct Sizer, Static Pressure)
    - Gas/Combustion (Gas Pipe Sizer, Combustion Air, Combustion Analysis)
    - Hydronic/Boiler (Expansion Tank Sizer, Hydronic Flow Calculator, Radiant Floor Heating)
    - Utilities (Psychrometric Calculator, Tonnage Converter, Unit Converter, Heat Load/Manual J)
    All tools are mobile-responsive and adhere to industry standards (NEC, NFPA 54, ACCA, ASHRAE).
    Technicians can save calculation results directly to work orders with full audit trails via the SaveToWorkOrder component.
    FieldCalculation API endpoints support create, read, and delete operations with proper multi-tenant isolation and DTO validation.
- **AI Chat**: An AI-powered assistant integrated into the system.
- **Monitoring**: Health checks and application metrics endpoints.
- **Background Jobs**: Queue module for asynchronous task processing.

### System Design Choices
- **Multi-tenancy**: Data is scoped by tenant ID to support multiple independent clients.
- **API Versioning**: All APIs are prefixed with `/api/v1`.
- **Role-based Access Control**: Granular permissions system for user access management.
- **Stock Ledger System**: Centralized tracking for accurate inventory levels.
- **Security**: Utilizes Helmet, configurable CORS, JWT authentication, and `class-validator` for input validation.
- **Development Tools**: ESLint, Prettier, Jest, and GitHub Actions for CI/CD.

## External Dependencies

- **Database**: PostgreSQL (via Neon)
- **ORM**: Prisma
- **Frontend Framework**: React
- **Backend Framework**: NestJS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Testing Framework**: Jest
- **Barcode Generation**: `bwip-js` library
- **OpenAPI Documentation**: `@nestjs/swagger`
- **OpenAI API**: For the AI-powered chat assistant (requires `OPENAI_API_KEY`)

## Development Resources

### UI Component Library (v0.dev Prompts)
- **Location**: `docs/V0_PROMPTS_COMPLETE.md`
- **Description**: Comprehensive collection of 68 copy-paste-ready v0.dev prompts for generating all UI components and pages
- **Coverage**: Complete design system, authentication, dashboards, work orders, CRM, inventory, purchasing, dispatch, Field Tools (all 21 calculators), and utility pages
- **Theme**: All prompts use OpsNex dark theme with teal accents (#14b8a6) matching the application's design system
- **Usage**: Copy any prompt to https://v0.dev to generate production-ready React + TypeScript components with Tailwind CSS
- **Organization**: 13 categorized parts with table of contents for easy navigation