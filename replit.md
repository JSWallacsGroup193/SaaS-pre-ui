# HVAC Management System

## Overview
This project is a full-stack HVAC management application designed to streamline operations for HVAC businesses. It offers comprehensive tools for managing work orders, inventory, customer relationships (CRM), dispatching, purchasing, and demand forecasting. Key capabilities include AI-powered chat assistance, barcode scanning, and robust reporting, aiming to provide a complete SaaS solution for the HVAC industry.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent, small updates. Ask before making major changes.

## System Architecture

### UI/UX Decisions
The frontend is a React application built with Vite, utilizing Zustand for state management and React Router for navigation. It features a global ErrorBoundary and a suite of reusable components. The application provides a seamless user experience across modules such as Login, Dashboard, Work Orders, CRM, Inventory, SKU Details, Purchasing, Dispatch, Labels, Forecast, Scanner, Field Tools, and AI Chat. Performance optimizations include lazy loading for Field Tools calculators, route-based code splitting, and component memoization. The UI component system is built with `shadcn/ui` and Tailwind CSS, featuring an OpsNex dark theme and 74 custom components for HVAC operations.

### Technical Implementations
The backend is developed with NestJS and TypeScript, using Prisma as the ORM for a PostgreSQL database. It incorporates JWT-based authentication, a multi-tenant architecture, and role-based access control. Core modules handle Work Order Management, CRM, Inventory Tracking (SKUs, Warehouses, Bins, Stock Ledger with on-hand quantity), Purchasing, Dispatch Scheduling, and Demand Forecasting. A barcode scanner module supports exact and fuzzy SKU matching. The system includes a queue module for background job processing, health and metrics endpoints for monitoring, and API versioning (`/api/v1`) with Swagger UI for documentation. The frontend is configured with Vite for TypeScript support and environment variable handling. Comprehensive TypeScript type definitions cover all Prisma models and backend DTOs.

### Feature Specifications
- **Authentication**: JWT-based user authentication and authorization.
- **Work Order Management**: Creation, tracking, and status updates, with detailed views including tasks, parts, notes, and timelines.
- **CRM**: Management of customer accounts, contacts, leads, and notes.
- **Inventory**: Tracking SKUs, warehouses, bins, and a stock ledger with real-time on-hand quantity.
- **Purchasing**: Management of purchase orders.
- **Dispatch**: Drag-and-drop scheduling of technicians with real-time status and various view modes.
- **Forecasting**: Demand forecasting capabilities.
- **Barcode System**: Production-ready camera-based scanning with html5-qrcode, supporting 8 barcode formats (QR Code, EAN-13/8, UPC-A/E, Code-128/39, ITF), exact and fuzzy SKU matching via `/api/v1/scanner/:barcode`, real-time backend lookup, comprehensive error handling, and direct navigation to SKU detail pages.
- **Field Tools with Work Order Integration**: 21 professional HVAC calculators across electrical, refrigeration, airflow, gas/combustion, hydronic/boiler, and utilities categories, with results savable to work orders.
- **AI Chat**: An AI-powered assistant integrated into the system.
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
- **Barcode Generation & Scanning**: `bwip-js` for generation, `html5-qrcode` for camera-based scanning
- **OpenAPI Documentation**: `@nestjs/swagger`
- **OpenAI API**: For the AI-powered chat assistant