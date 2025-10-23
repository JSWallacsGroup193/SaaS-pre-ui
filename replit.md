# OpsNex

## Overview
OpsNex is a comprehensive full-stack HVAC operations management platform designed to streamline business operations for HVAC service companies. It offers tools for work order management, inventory tracking, customer relationship management (CRM), dispatching, purchasing, and demand forecasting. The platform includes AI-powered chat assistance, barcode scanning capabilities, and robust reporting, providing a complete SaaS solution for the HVAC industry. The project aims to deliver a consistent, dark-themed user experience across all functionalities.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent, small updates. Ask before making major changes.

## System Architecture

### UI/UX Decisions
The frontend is a React application built with Vite, utilizing Zustand for state management and React Router for navigation. It features a global ErrorBoundary and reusable components, ensuring a seamless experience across various modules (Login, Register, Dashboard, Work Orders, CRM, Inventory, Purchasing, Dispatch, Forecast, AI Chat, etc.). Authentication includes smart redirect guards. Performance is optimized through lazy loading, route-based code splitting, and component memoization. The UI component system leverages `shadcn/ui` and Tailwind CSS, adhering to an OpsNex dark theme (dark slate backgrounds, teal-500 accent) and including 75 custom components. The design is mobile-first and responsive, with touch-friendly inputs, adaptive grid layouts, and responsive typography.

### Technical Implementations
The backend is developed with NestJS and TypeScript, using Prisma as the ORM for a PostgreSQL database. It incorporates JWT-based authentication, a multi-tenant architecture, and role-based access control (RBAC). Core modules manage Work Orders, CRM, Inventory (SKUs, Warehouses, Bins, Stock Ledger), Purchasing, Dispatch, and Demand Forecasting. A barcode scanner module is integrated for SKU matching. The system includes a queue module for background job processing, health/metrics endpoints, and API versioning (`/api/v1`) with Swagger UI. Frontend configuration uses Vite for TypeScript and environment variable handling. Comprehensive TypeScript types cover Prisma models and backend DTOs. A notification system uses HTTP polling for real-time updates. A Super Admin system provides full RBAC management with a dedicated UI. Security enhancements include multi-tenant isolation and tenant scoping on all service operations.

### Feature Specifications
- **Authentication & Registration**: JWT-based system with Zod validation.
- **Work Order Management**: Creation, tracking, and status updates.
- **CRM**: Management of accounts, contacts, leads, and notes.
- **Inventory**: Tracking SKUs, warehouses, bins, and stock ledger.
- **Purchasing**: Management of purchase orders.
- **Dispatch**: Drag-and-drop scheduling with real-time integration.
- **Demand Forecasting Dashboard**: Interactive charts, KPIs, and reorder recommendations.
- **Labels Generator**: Professional inventory label creation with live preview and export.
- **Barcode Scanner**: Camera-based scanning with SKU matching and backend lookup.
- **Field Tools**: 22 professional HVAC calculators, including AI-powered and Manual Cost Estimators.
- **AI Chat**: OpenAI-powered HVAC assistant.
- **AI Cost Estimator**: Uses OpenAI GPT-4o for detailed HVAC cost estimates.
- **Manual Cost Estimator**: Full-featured manual estimation tool with Quick and Comprehensive modes.
- **Proposals System**: Generation of customer-facing proposals from estimates, with status tracking and PDF export.
- **Service Catalog & Pricebook**: Management of services and labor rates with three pricing models.
- **Super Admin Panel**: UI for user, role, permission, and tenant management.
- **Notification System**: In-app, email, and SMS notifications via HTTP polling.
- **Feedback System**: User feedback collection with categories, ratings, and admin dashboard.
- **Monitoring**: Health checks and application metrics.
- **Background Jobs**: Queue module for asynchronous tasks.
- **Form System**: Components with React Hook Form, Zod validation, auto-save, and multi-step capabilities.

### System Design Choices
- **Multi-tenancy**: Data isolated by tenant ID.
- **API Versioning**: All APIs prefixed with `/api/v1`.
- **Role-based Access Control**: Granular permissions across 13 roles and 114 permissions.
- **Stock Ledger System**: Centralized tracking for inventory accuracy.
- **Security**: Utilizes Helmet, environment-based CORS, JWT authentication, `class-validator`, and comprehensive tenant isolation.
- **AI System Prompts**: AI Cost Estimator uses a detailed system prompt stored in `backend/prompts/AI_Cost_Estimator_Prompt.md`.

## Testing

### Backend Tests
- **Framework**: Jest with ts-jest preset
- **Configuration**: `backend/jest.config.ts`
- **Test Directory**: `backend/test/`
- **Setup File**: `backend/test/setup.ts` - Configures test environment, JWT secrets, and database URL
- **Run Tests**: `npm test` (from backend directory)
- **Coverage**: `npm run test:cov`
- **Watch Mode**: `npm run test:watch`
- **Note**: Currently configured with `--passWithNoTests` flag to allow zero test files

## Recent Changes (October 23, 2025)

### Enhanced CRM Integration with Hierarchical Data Model
- **Database Schema Consolidation**: Enforced proper hierarchy: Account → Property → Equipment → Work Orders
  - Made `CustomerEquipment.propertyId` required (equipment must belong to a property)
  - Removed `CustomerEquipment.accountId` (equipment no longer directly linked to account)
  - Added `WorkOrder.equipmentId` field for equipment-specific service tracking
  - Removed ServiceRequest module entirely - Work Orders are now the single source of truth
- **Backend**: Complete NestJS modules for Property, CustomerPerformance with multi-tenant scoping
- **Frontend PropertiesTab**: Hierarchical accordion view in Account Details
  - Properties displayed as expandable cards with type, address
  - Equipment nested under each property with expandable details
  - "View Service History" button for each equipment navigates to filtered work orders
- **Service History Filtering**: 
  - Backend: Work Orders API accepts `equipmentId` query parameter
  - Frontend: Work Orders page reads URL parameter and filters accordingly
  - Visual banner shows active equipment filter with "Clear Filter" option
- **Navigation**: Removed separate Properties and Service Requests from sidebar - all customer data unified in CRM

### New API Endpoints
- `POST/GET/PUT/DELETE /api/v1/properties` - Property management
- `GET /api/v1/work-orders?equipmentId={id}` - Equipment-filtered work orders
- `POST/GET/PUT/DELETE /api/v1/customer-performance` - Customer analytics
- `POST /api/v1/customer-performance/recalculate/:accountId` - Auto-calculate customer metrics

## External Dependencies

- **Database**: PostgreSQL (via Neon) - 79 tables total
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
- **Validation Library**: Zod
- **Testing Framework**: Jest with @nestjs/testing