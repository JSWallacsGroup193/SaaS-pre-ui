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
- **Password**: (use demo password)

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
- `VITE_API_URL` - API base URL (/api - proxied to backend)

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user

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
- October 18, 2025: Initial setup
  - Extracted project from zip file
  - Set up PostgreSQL database with Prisma
  - Installed all dependencies
  - Fixed duplicate imports in App.tsx
  - Fixed syntax errors in Inventory.tsx and CRM.tsx
  - Configured Vite to bind to 0.0.0.0:5000 for Replit compatibility
  - Set up workflow to run frontend on port 5000
  - Started backend in background on port 3000

## Notes
- The application uses a multi-tenant architecture
- All API routes are prefixed with `/api` (configured in Vite proxy)
- The backend uses role-based access control
- Stock movements are tracked in a ledger system
- The barcode module uses bwip-js for generation
