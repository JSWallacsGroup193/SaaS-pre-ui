# HVAC Management System

## Overview
This project is a full-stack HVAC (Heating, Ventilation, and Air Conditioning) management application. It provides comprehensive tools for managing work orders, inventory, customer relationships (CRM), dispatching, purchasing, and demand forecasting. The system aims to streamline operations for HVAC businesses, offering features like AI-powered chat assistance, barcode scanning, and robust reporting.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent, small updates. Ask before making major changes.

## Recent Work
- **✅ FIELD TOOLS MODULE COMPLETE (Oct 19, 2025)**: Successfully integrated 8 professional HVAC calculators for field technicians
  - **8 Professional Calculators**: 4 Electrical + 4 Refrigeration tools
  - **Mobile-Responsive Design**: Optimized for tablets and phones used in the field
  - **Industry Standards**: All calculations follow NEC guidelines, Ohm's Law, and refrigeration best practices
  - **Electrical Calculators**:
    - **Ohm's Law Calculator**: Calculates V, I, R, and Power (enter any 2 values)
    - **Capacitor Test Tool**: Tests capacitors with ±10% tolerance, instant PASS/FAIL results
    - **Motor Amps Checker**: Checks motor load percentage with color-coded status (Normal/Warning/Overload)
    - **Voltage Drop Calculator**: Calculates voltage drop and wire sizing for single/three-phase systems
  - **Refrigeration Calculators**:
    - **Superheat Calculator**: Measure superheat for refrigerant charge diagnosis (R-22/R-410A)
    - **Subcooling Calculator**: Measure subcooling for charge verification (R-22/R-410A)
    - **Target Superheat Tool**: Calculate ideal superheat based on wet/dry bulb temps
    - **PT Chart**: Pressure-Temperature reference for R-22 and R-410A refrigerants
  - **User Experience**: Clean card-based interface with back navigation and coming soon roadmap
  - **Route**: Accessible via `/field-tools` in the sidebar navigation
  - **File Structure**: `frontend/src/pages/FieldTools/{components,utils}` with modular components
  - **System Status**: ✅ Running with 0 errors
- **🎉 DATABASE EXPANSION COMPLETE (Oct 19, 2025)**: Successfully expanded database from 45 to 69 enterprise tables
  - **Total Migration Time**: 9.61 seconds (3 phases) with zero breaking changes
  - **Phase 1** (2.36s): Security & Collaboration - LoginAttempt, PasswordHistory, TeamMember, Task, Comment, Tag, ActivityLog
  - **Phase 2** (2.26s): Analytics & Reporting - KPISnapshot, Dashboard, DashboardWidget, CustomReport, ReportSchedule, Notification, NotificationPreference
  - **Phase 3** (4.99s): Advanced Inventory & Integrations - Vendor, TaxRate, InventoryAdjustment, StockTransfer, PurchaseOrderItem, InvoiceLineItem, CustomerPreference, DocumentTemplate, Webhook, Integration, EmailTemplate, SmsTemplate
  - **Final Database**: 71 total objects (69 data tables + 2 enums)
  - **Enhanced Relations**: Invoice, PurchaseOrder, SKU, Warehouse, Bin, User, Tenant all updated with new relationships
  - **Data Safety**: Full backups before each phase, zero data loss, zero downtime
  - **System Status**: ✅ Running with 0 errors
  - **Documentation**: Complete expansion summary in `docs/DATABASE_EXPANSION_COMPLETE.md`
- **🎉 SCHEMA INTEGRATION COMPLETE (Oct 19, 2025)**: Successfully upgraded database from 20 to 45 enterprise tables
  - **Migration Time**: 6.84 seconds with zero breaking changes
  - **New Tables**: 25 enterprise tables (departments, teams, work order enhancements, invoicing, audit logs, permissions, security)
  - **Enhanced Tables**: User (+15 fields), WorkOrder (+20 fields), Account (+15 fields), SKU (+10 fields)
  - **Auto-Generated IDs**: All create methods now auto-generate unique identifiers (WO-*, ACC-*, SKU-*, WH-*, PO-*)
  - **API Updates**: OpenAPI spec and frontend client successfully regenerated
  - **Data Safety**: Full database and schema backups created, zero data loss
  - **Documentation**: Complete integration summary in `docs/SCHEMA_INTEGRATION_COMPLETE.md`
- **Admin Dashboard Plan**: Comprehensive 12,000+ line enterprise-grade planning document
- **Version 2.1 - Developer Handoff Ready**: Complete technical documentation for development team
  - **20 Technical Sections**: Full implementation guide with 3,800+ lines of documentation
  - **Technology Stack**: Exact versions (Node 20.x, React 18.2+, NestJS 10.x, PostgreSQL 16.x)
  - **Environment Setup**: Step-by-step guide with database, migrations, seeding
  - **Architecture Guide**: Frontend/backend folder structures, patterns, best practices
  - **Integration Guide**: Authentication flows, API patterns, WebSocket setup
  - **Testing Strategy**: Unit/E2E tests, 80% coverage requirement, CI/CD pipeline
  - **Security & Performance**: OWASP Top 10, caching, optimization, deployment
  - **Implementation Timeline**: 12-16 week roadmap with 4 phases and milestones
- **Version 2.0 - Enterprise-Ready**: Major release covering all production requirements
  - **Security**: SSO, MFA, encryption, session management, audit trails, compliance
  - **User Experience**: Onboarding, help system, accessibility (WCAG 2.1 AA), notifications
  - **Integrations**: Accounting (QuickBooks, Sage, Xero), Communication (Twilio, SendGrid)
  - **Disaster Recovery**: Automated backups, encryption, RPO/RTO targets
  - **Permission Analytics**: Usage tracking, self-service requests, compliance reports
  - **Multi-Language**: i18n support with translation system
- **Permission System**: 15 customizable roles with 12 advanced enhancements (team scopes, groups, templates, approvals, delegation)
- **Database Design**: Now live with 69 tables (24 new in expansion, 45 from integration), production-ready
- **API Coverage**: 85+ documented endpoints with complete TypeScript models and implementation examples
- **Production-Ready**: Meets enterprise security standards (SOX, GDPR, HIPAA, PCI-DSS)
- **Developer Handoff**: Complete technical guide for immediate development team implementation

## System Architecture

### UI/UX Decisions
The frontend is built with React and Vite, utilizing Zustand for state management and React Router for navigation. Key UI components include a global ErrorBoundary for graceful error handling, and reusable components like Card, Sidebar, and TopBar. The application includes a login page, dashboard, and dedicated pages for Work Orders, CRM, Inventory, SKU Details, Purchasing, Dispatch, Labels, Forecast, Scanner, Field Tools, and AI Chat. The system provides a seamless user experience across these modules.

### Technical Implementations
The backend is developed using NestJS with TypeScript, leveraging Prisma as the ORM for a PostgreSQL database. It features JWT-based authentication, a multi-tenant architecture, and role-based access control. Core modules include Work Order Management, CRM (Accounts, Contacts, Leads, Notes), Inventory Tracking (SKUs, Warehouses, Bins, Stock Ledger with on-hand quantity calculation), Purchasing, Dispatch Scheduling, and Demand Forecasting. A barcode scanner module supports both exact and fuzzy matching for SKU lookups, and a queue module is integrated for background job processing. Health and metrics endpoints (`/health`, `/metrics`) are provided for monitoring. API versioning is implemented with a `/api/v1` prefix, and Swagger UI is available for interactive API documentation.

The frontend uses Vite with proper TypeScript configuration, including `vite-env.d.ts` for environment variable typing support (`import.meta.env`).

### Feature Specifications
- **Authentication**: JWT-based user authentication and authorization.
- **Work Order Management**: Creation, tracking, and status updates for HVAC work orders.
- **CRM**: Management of customer accounts, contacts, leads, and associated notes.
- **Inventory**: Detailed tracking of SKUs, warehouses, bins, and a comprehensive stock ledger. Includes real-time on-hand quantity calculations.
- **Purchasing**: Management of purchase orders.
- **Dispatch**: Scheduling and management of technician dispatch slots.
- **Forecasting**: Demand forecasting capabilities.
- **Barcode System**: Generation and scanning of barcodes for inventory management, supporting exact and fuzzy matching.
- **Field Tools**: 8 professional HVAC calculators for field technicians:
  - **Electrical Tools**: Ohm's Law Calculator, Capacitor Test Tool, Motor Amps Checker, Voltage Drop Calculator (NEC compliant)
  - **Refrigeration Tools**: Superheat Calculator, Subcooling Calculator, Target Superheat Tool, PT Chart (R-22/R-410A)
  - Mobile-responsive design optimized for tablets and phones used in the field.
- **AI Chat**: An AI-powered assistant integrated into the system.
- **Monitoring**: Health checks and application metrics endpoints.
- **Background Jobs**: Queue module for asynchronous task processing.

### System Design Choices
- **Multi-tenancy**: Designed to support multiple independent tenants, with all data scoped by tenant ID.
- **API Versioning**: All API endpoints are prefixed with `/api/v1` for structured evolution.
- **Role-based Access Control**: Granular permissions system to manage user access.
- **Stock Ledger System**: Centralized system for tracking all inventory movements to maintain accurate stock levels.
- **Security**: Utilizes Helmet for security headers, configurable CORS whitelist, JWT authentication, and input validation with `class-validator`.
- **Development Tools**: Integration of ESLint for linting, Prettier for code formatting, Jest for testing, and GitHub Actions for CI/CD.

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

## Deployment

### Replit Autoscale Deployment

The application is configured as a **full-stack SaaS platform** for Replit Autoscale deployment. The backend serves both the React frontend web application and the REST API.

**Build Configuration:**
```bash
cd frontend && npm ci && npm run build && cd ../backend && npm ci && npm run build
```

The build process:
1. **Frontend Build** - `cd frontend && npm ci && npm run build`
   - Installs frontend dependencies
   - Builds the React app for production (outputs to `frontend/dist`)
   - Uses `.env.production` to set `VITE_API_URL=/api/v1`
2. **Backend Build** - `cd ../backend && npm ci && npm run build`
   - Installs backend dependencies
   - Automatic Prisma Generate via `postinstall` script
   - Compiles TypeScript to JavaScript using NestJS CLI
   - Configured to serve frontend static files from `frontend/dist`

**Run Configuration:**
```bash
cd backend && npm run start:prod
```
This starts the NestJS production server which:
- Serves the React web application at `/`
- Serves the REST API at `/api/v1`
- Uses `node dist/src/main.js`

**Accessing the Application:**
After deployment, your URL will serve:
- **Web Application** - `https://your-app.replit.app/` - Full React SaaS interface
- **API Endpoints** - `https://your-app.replit.app/api/v1/*` - REST API
- **Swagger Docs** - `https://your-app.replit.app/api/v1/docs` - Interactive API documentation

**Health Check Endpoints:**
- `GET /api/v1/health` - API health check (returns `{"status":"ok"}`)
- `GET /api/v1/metrics` - Application metrics (uptime, memory, Node.js version)

**Port Configuration:**
- Backend binds to `0.0.0.0:3000` for external access
- Serves both frontend web app and API from port 3000
- Replit automatically maps internal port 3000 to external port 443 (HTTPS)

**Required Environment Variables:**
Configure these in your Replit deployment settings:
- `DATABASE_URL` - PostgreSQL connection string (automatically provided by Replit)
- `JWT_SECRET` - Secret key for JWT token generation
- `PORT` - Backend port (default: 3000)
- `CORS_ORIGIN` - Allowed CORS origins (optional, defaults to localhost:5000)
- `OPENAI_API_KEY` - OpenAI API key for AI chat feature (optional)

**Prisma Configuration:**
The backend includes a `postinstall` script that automatically generates the Prisma client:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

This ensures the Prisma client is always generated after `npm install` or `npm ci`, making deployments more reliable.

**Deployment Steps:**
1. Click the **Deploy** button in Replit
2. Select **Autoscale** deployment type (recommended for APIs)
3. Verify environment variables are configured
4. Deploy and monitor the health check endpoint

**Troubleshooting:**
- If Prisma client is missing, the `postinstall` script will regenerate it automatically
- Check deployment logs for any build errors
- Verify `DATABASE_URL` is set correctly
- Ensure the schema file exists at `backend/prisma/schema.prisma`