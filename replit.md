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