# HVAC Management System

## Overview
This project is a full-stack HVAC (Heating, Ventilation, and Air Conditioning) management application. It provides comprehensive tools for managing work orders, inventory, customer relationships (CRM), dispatching, purchasing, and demand forecasting. The system aims to streamline operations for HVAC businesses, offering features like AI-powered chat assistance, barcode scanning, and robust reporting.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent, small updates. Ask before making major changes.

## System Architecture

### UI/UX Decisions
The frontend is built with React and Vite, utilizing Zustand for state management and React Router for navigation. Key UI components include a global ErrorBoundary for graceful error handling, and reusable components like Card, Sidebar, and TopBar. The application includes a login page, dashboard, and dedicated pages for Work Orders, CRM, Inventory, SKU Details, Purchasing, Dispatch, Labels, Forecast, Scanner, and AI Chat. The system provides a seamless user experience across these modules.

### Technical Implementations
The backend is developed using NestJS with TypeScript, leveraging Prisma as the ORM for a PostgreSQL database. It features JWT-based authentication, a multi-tenant architecture, and role-based access control. Core modules include Work Order Management, CRM (Accounts, Contacts, Leads, Notes), Inventory Tracking (SKUs, Warehouses, Bins, Stock Ledger with on-hand quantity calculation), Purchasing, Dispatch Scheduling, and Demand Forecasting. A barcode scanner module supports both exact and fuzzy matching for SKU lookups, and a queue module is integrated for background job processing. Health and metrics endpoints (`/health`, `/metrics`) are provided for monitoring. API versioning is implemented with a `/api/v1` prefix, and Swagger UI is available for interactive API documentation.

### Feature Specifications
- **Authentication**: JWT-based user authentication and authorization.
- **Work Order Management**: Creation, tracking, and status updates for HVAC work orders.
- **CRM**: Management of customer accounts, contacts, leads, and associated notes.
- **Inventory**: Detailed tracking of SKUs, warehouses, bins, and a comprehensive stock ledger. Includes real-time on-hand quantity calculations.
- **Purchasing**: Management of purchase orders.
- **Dispatch**: Scheduling and management of technician dispatch slots.
- **Forecasting**: Demand forecasting capabilities.
- **Barcode System**: Generation and scanning of barcodes for inventory management, supporting exact and fuzzy matching.
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

The application is configured for Replit Autoscale deployment with automatic Prisma client generation.

**Build Configuration:**
```bash
cd backend && npm ci && npm run build
```

The build process:
1. **`npm ci`** - Clean install of dependencies from package-lock.json
2. **Automatic Prisma Generate** - The `postinstall` script in `backend/package.json` automatically runs `prisma generate` after installing dependencies
3. **`npm run build`** - Compiles TypeScript to JavaScript using NestJS CLI

**Run Configuration:**
```bash
cd backend && npm run start:prod
```
This starts the production server using `node dist/src/main.js`

**Health Check Endpoint:**
The deployment monitors the root endpoint `/` which returns:
```json
{"status":"ok","message":"HVAC Management System API"}
```

Additional health endpoints:
- `GET /` - Root health check (HTTP 200)
- `GET /api/v1/health` - Versioned health check
- `GET /api/v1/metrics` - Application metrics (uptime, memory, Node.js version)

**Port Configuration:**
- Backend binds to `0.0.0.0:3000` for external access
- Replit automatically maps internal port 3000 to external port 80

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