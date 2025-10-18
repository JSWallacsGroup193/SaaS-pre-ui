# HVAC Management System

## Overview
A full-stack HVAC (Heating, Ventilation, and Air Conditioning) management application built with NestJS backend and React frontend. This system helps manage work orders, inventory, customer relationships, dispatching, purchasing, forecasting, and more.

## Project Structure

### Backend (NestJS + Prisma + PostgreSQL)
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL (via Neon)
- **ORM**: Prisma
- **Port**: 3000
- **Key Features**:
  - Authentication with JWT
  - Work Order management
  - CRM (Accounts, Contacts, Leads, Notes)
  - Inventory tracking (SKUs, Warehouses, Bins, Stock Ledger)
  - Purchasing and Purchase Orders
  - Dispatch scheduling
  - Barcode generation and label printing
  - Demand forecasting
  - AI-powered chat assistant

### Frontend (React + Vite)
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Port**: 5000
- **Routing**: React Router
- **Pages**:
  - Login
  - Dashboard
  - Work Orders
  - CRM
  - Inventory
  - Purchasing
  - Dispatch
  - Labels
  - Forecast
  - Scanner
  - AI Chat

## Getting Started

### Running the Application
The application is currently running with:
- **Frontend**: Port 5000 (Vite dev server)
- **Backend**: Running in background on port 3000

The workflow "HVAC App" runs the frontend, while the backend is started separately in the background.

### Login Credentials
Use the following demo credentials to log in:
- **Email**: admin@demo.com
- **Password**: demo123

## Database

The application uses a PostgreSQL database with the following main tables:
- `User` - System users
- `Tenant` - Multi-tenancy support
- `Role` & `Permission` - Access control
- `WorkOrder` - HVAC work orders
- `Account`, `Contact`, `Lead`, `Note` - CRM
- `SKU`, `Warehouse`, `Bin`, `StockLedger` - Inventory management
- `PurchaseOrder` - Purchasing
- `DispatchSlot` - Technician scheduling
- `Forecast` - Demand forecasting
- `ChatLog` - AI chat history

### Database Commands
- **Push schema changes**: `cd backend && npx prisma db push`
- **Generate Prisma client**: `cd backend && npx prisma generate`
- **View database**: Use the Replit Database pane

## Development

### Starting the App
The app is configured to start automatically with the "HVAC App" workflow. If you need to restart manually:

1. **Backend** (in background):
   ```bash
   cd backend && npm run start:dev
   ```

2. **Frontend** (main workflow):
   ```bash
   cd frontend && npm run dev
   ```

### Installing Dependencies
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

### Environment Variables
The following environment variables are configured:
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Backend port (3000)
- `VITE_API_URL` - API base URL (/api/v1 - proxied to backend)
- `CORS_ORIGIN` - CORS allowed origins (default: http://localhost:5000)
- `JWT_SECRET` - JWT token secret for authentication

## Testing & CI/CD

### Running Tests
```bash
cd backend && npm test              # Run all tests
cd backend && npm run test:watch    # Watch mode
cd backend && npm run test:cov      # With coverage
```

### OpenAPI Generation
Generate the OpenAPI specification and typed frontend client:
```bash
cd backend && npm run openapi:gen   # Generates backend/openapi.json
cd frontend && npm run api:gen      # Generates typed API client in frontend/src/api
```

### CI/CD
- **GitHub Actions**: `.github/workflows/ci.yml` runs on every push/PR
- **Pipeline Steps**:
  1. Backend tests with Jest
  2. OpenAPI spec generation
  3. Typed API client generation
  4. Frontend build/typecheck
  5. OpenAPI drift detection

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Documentation
- **Swagger UI**: Available at `/api/v1/docs` - Interactive API documentation with bearer auth support
- **OpenAPI JSON**: Available at `/api/v1/api-json` - Machine-readable spec

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user

### Work Orders
- `GET /work-orders/:tenantId` - List work orders
- `POST /work-orders` - Create work order
- `PUT /work-orders/:id/status` - Update status

### CRM
- `GET /crm/accounts/:tenantId` - List accounts
- `POST /crm/accounts` - Create account
- `GET /crm/contacts/:tenantId` - List contacts
- `POST /crm/contacts` - Create contact
- `GET /crm/leads/:tenantId` - List leads
- `POST /crm/leads` - Create lead
- `GET /crm/notes/:contactId` - Get contact notes
- `POST /crm/notes` - Create note

### Inventory
- `GET /inventory/skus/:tenantId` - List SKUs
- `POST /inventory/skus` - Create SKU
- `GET /inventory/ledger/:tenantId` - Stock ledger
- `POST /inventory/ledger` - Record stock movement
- `GET /inventory/warehouses/:tenantId` - List warehouses
- `POST /inventory/warehouses` - Create warehouse
- `GET /inventory/bins/:tenantId` - List bins
- `POST /inventory/bins` - Create bin

### Other Features
- Barcode generation: `GET /barcodes/:text`
- Labels: `GET /labels/:skuId`
- Purchasing: Manage purchase orders
- Dispatch: Schedule technicians
- Forecast: Demand forecasting
- Chat: AI-powered assistant

## Recent Changes

### October 18, 2025 - Production-Ready Enhancements
- **Testing Infrastructure**:
  - Added Jest test framework with ts-jest
  - Configured Prisma test environment for isolated testing
  - Added test scripts: `test`, `test:watch`, `test:cov`
- **CI/CD Pipeline**:
  - Added GitHub Actions workflow (`.github/workflows/ci.yml`)
  - Automated: backend tests, OpenAPI generation, frontend build, drift detection
- **OpenAPI Client Generation**:
  - Added `openapi:gen` script to generate OpenAPI spec from NestJS code
  - Added `api:gen` script to generate typed frontend client
  - Generated 647-line OpenAPI specification
- **Security Enhancements**:
  - Added Helmet middleware for security headers
  - Implemented CORS whitelist (configurable via CORS_ORIGIN)
  - Proper port configuration (backend: 3000, frontend: 5000)
- **Dependencies Added**:
  - Backend: helmet, jest, ts-jest, supertest, @nestjs/testing, pg, @types/pg
  - Frontend: openapi-typescript-codegen
- **Bug Fixes**:
  - Fixed port conflicts between frontend and backend
  - Updated CORS default to match frontend origin (localhost:5000)
  - Fixed CI workflow build command

### October 18, 2025 - Latest Session
- **API Versioning**: Upgraded API from `/api` to `/api/v1`
  - Updated backend global prefix to `api/v1`
  - Updated frontend axios client base URL to `/api/v1`
- **Swagger Documentation**: Added interactive API docs
  - Installed `@nestjs/swagger@^7.0.0` (compatible with NestJS 10)
  - Configured Swagger UI at `/api/v1/docs` with bearer auth support
  - Added API documentation with title, description, and versioning
- **Frontend API Client Wrapper**: Created abstraction layer
  - Added `frontend/src/api/client.ts` with helper functions
  - Added `frontend/src/api/client-config.ts` for configuration
  - Updated Forecast page to use new client wrapper
  - Implemented dynamic imports to prevent Vite build-time errors
- **Bug Fixes**:
  - Fixed Vite import analysis errors with optional OpenAPI client
  - Resolved NestJS/Swagger version compatibility issues
  - Fixed duplicate menu items in Sidebar component

### October 18, 2025 - Initial Setup
- Extracted project from zip file
- Set up PostgreSQL database with Prisma
- Installed all dependencies
- Fixed duplicate imports in App.tsx
- Fixed syntax errors in Inventory.tsx and CRM.tsx
- Configured Vite with `allowedHosts: true` for Replit proxy compatibility
- Set up workflow to run frontend on port 5000
- Started backend in background on port 3000
- Fixed authentication service to handle tenant relationships
- Created demo user (admin@demo.com / demo123)

## Technical Notes

### Architecture
- **Multi-tenant**: All data scoped by tenant ID
- **API Versioning**: Routes prefixed with `/api/v1` for future compatibility
- **Role-based Access Control**: Permissions system for authorization
- **Stock Ledger System**: Tracks all inventory movements

### Security
- **Helmet**: Security headers middleware enabled
- **CORS Whitelist**: Configurable allowed origins (env: CORS_ORIGIN)
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Global validation pipe with class-validator
- **Rate Limiting**: Throttling enabled via @nestjs/throttler

### Frontend Features
- **Generated API Client**: Optional typed client with fetch (from OpenAPI)
- **Axios Fallback**: Axios used when generated client unavailable
- **401 Auto-redirect**: Automatic redirect to login on token expiration

### Development Tools
- **Swagger UI**: Interactive API docs at `/api/v1/docs`
- **OpenAPI Generation**: Automated spec generation from code
- **Jest Testing**: Unit test framework with Prisma test environment
- **GitHub Actions**: Automated CI/CD pipeline
- **Barcode Generation**: Uses bwip-js library
