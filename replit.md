# HVAC Management System

## Overview
This project is a full-stack HVAC management application designed to streamline operations for HVAC businesses. It provides comprehensive tools for managing work orders, inventory, customer relationships (CRM), dispatching, purchasing, and demand forecasting. Key capabilities include AI-powered chat assistance, barcode scanning, and robust reporting, aiming to be a complete SaaS solution for the HVAC industry. The application utilizes a consistent OpsNex dark theme across all interfaces.

## User Preferences
I prefer simple language and detailed explanations. I want iterative development with frequent, small updates. Ask before making major changes.

## System Architecture

### UI/UX Decisions
The frontend is a React application built with Vite, utilizing Zustand for state management and React Router for navigation. It features a global ErrorBoundary and reusable components. The application provides a seamless user experience across modules such as Login, Register, Dashboard, Work Orders, CRM, Inventory, SKU Details, Purchasing, Dispatch, Labels, Forecast, Scanner, Field Tools, and AI Chat. Authentication routing includes smart redirect guards. Performance optimizations include lazy loading, route-based code splitting, and component memoization. The UI component system is built with `shadcn/ui` and Tailwind CSS, featuring an OpsNex dark theme (dark slate backgrounds, teal-500 accent) and 74 custom components. Error pages are professional with auto-redirects and quick navigation links.

### Technical Implementations
The backend is developed with NestJS and TypeScript, using Prisma as the ORM for a PostgreSQL database. It incorporates JWT-based authentication, a multi-tenant architecture, and role-based access control (RBAC). Core modules handle Work Order Management, CRM, Inventory Tracking (SKUs, Warehouses, Bins, Stock Ledger), Purchasing, Dispatch Scheduling, and Demand Forecasting. A barcode scanner module supports SKU matching. The system includes a queue module for background job processing, health and metrics endpoints, and API versioning (`/api/v1`) with Swagger UI for documentation. Frontend is configured with Vite for TypeScript and environment variable handling. Comprehensive TypeScript type definitions cover Prisma models and backend DTOs. A real-time notification system with multi-channel delivery (in-app, email, SMS) and WebSocket support is implemented, with HTTP polling as a fallback. A Super Admin system provides full RBAC implementation with a dedicated role and protected backend API for managing users, roles, permissions, and tenants, complete with an Admin UI. User settings include profile and password management. Security enhancements include comprehensive multi-tenant isolation and tenant scoping on all service operations.

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
- **Field Tools**: 21 professional HVAC calculators across various categories, with results savable to work orders.
- **AI Chat**: OpenAI-powered HVAC assistant with quick suggestions, rich text support, and feedback options.
- **Super Admin Panel**: System administration interface for user, role, permission, and tenant management, protected by `AdminGuard`.
- **Notification System**: In-app, email, and SMS notifications with user preferences and WebSocket support (with HTTP polling fallback).
- **Monitoring**: Health checks and application metrics.
- **Background Jobs**: Queue module for asynchronous tasks.
- **Form System**: Comprehensive components with React Hook Form, Zod validation, auto-save, and multi-step capabilities.

### System Design Choices
- **Multi-tenancy**: Data is scoped by tenant ID.
- **API Versioning**: All APIs are prefixed with `/api/v1`.
- **Role-based Access Control**: Granular permissions system.
- **Stock Ledger System**: Centralized tracking for accurate inventory levels.
- **Security**: Utilizes Helmet, configurable CORS, JWT authentication, and `class-validator` for input validation; comprehensive tenant isolation implemented.

## External Dependencies

- **Database**: PostgreSQL (via Neon)
- **ORM**: Prisma
- **Frontend Framework**: React
- **Backend Framework**: NestJS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Testing Framework**: Jest
- **Barcode Generation**: `jsbarcode`
- **Barcode Scanning**: `html5-qrcode`
- **OpenAPI Documentation**: `@nestjs/swagger`
- **OpenAI API**: For AI Chat
- **Data Visualization**: Recharts