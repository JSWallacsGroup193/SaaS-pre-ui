# HVAC Management System

## Overview
This project is a full-stack HVAC (Heating, Ventilation, and Air Conditioning) management application designed to streamline operations for HVAC businesses. It offers comprehensive tools for managing work orders, inventory, customer relationships (CRM), dispatching, purchasing, and demand forecasting. Key capabilities include AI-powered chat assistance, barcode scanning, and robust reporting, aiming to provide a complete SaaS solution for the HVAC industry.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent, small updates. Ask before making major changes.

## System Architecture

### UI/UX Decisions
The frontend is a React application built with Vite, utilizing Zustand for state management and React Router for navigation. It features a global ErrorBoundary and a suite of reusable components (Card, Sidebar, TopBar). The application provides a seamless user experience across modules such as Login, Dashboard, Work Orders, CRM, Inventory, SKU Details, Purchasing, Dispatch, Labels, Forecast, Scanner, Field Tools, and AI Chat.

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
- **Field Tools**: 14 professional HVAC calculators for field technicians, including:
    - Electrical (Ohm's Law, Capacitor Test, Motor Amps, Voltage Drop)
    - Refrigeration (Superheat, Subcooling, Target Superheat, PT Chart)
    - Airflow (CFM, Duct Sizer, Static Pressure)
    - Gas/Combustion (Gas Pipe Sizer, Combustion Air, Combustion Analysis)
    All tools are mobile-responsive and adhere to industry standards (NEC, NFPA 54, ACCA).
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