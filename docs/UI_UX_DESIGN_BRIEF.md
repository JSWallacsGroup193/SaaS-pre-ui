# HVAC Management System - UI/UX Design Brief

**Document Version:** 1.0  
**Last Updated:** October 20, 2025  
**Status:** Production Ready

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Overview](#system-overview)
3. [User Personas](#user-personas)
4. [Module Breakdown](#module-breakdown)
5. [User Workflows](#user-workflows)
6. [Data Model Overview](#data-model-overview)
7. [Technical Requirements](#technical-requirements)
8. [Design Considerations](#design-considerations)
9. [Screen Inventory](#screen-inventory)
10. [Interaction Patterns](#interaction-patterns)
11. [User Stories](#user-stories)

---

## Executive Summary

### What is This System?

The HVAC Management System is a comprehensive enterprise-grade SaaS platform designed to streamline operations for HVAC businesses. It provides end-to-end management of work orders, inventory, customer relationships, purchasing, dispatch, and demand forecasting.

### Core Value Proposition

- **Complete Business Management**: Single platform handling all HVAC business operations
- **Field Technician Empowerment**: 21 professional calculators with work order integration
- **Real-Time Operations**: Live dispatch, inventory tracking, and work order updates
- **Multi-Tenant Architecture**: Supports multiple independent HVAC companies
- **Enterprise Security**: Role-based access with 15 distinct user roles

### System Scale

- **69 Database Tables**: Enterprise-grade data architecture
- **15 User Roles**: From Super Admin to Technician
- **12 Core Modules**: Covering all business operations
- **21 Field Tools**: Professional HVAC calculators across 6 specialties
- **Multi-Tenant**: Secure data isolation per company

---

## System Overview

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Zustand for state management
- React Router for navigation
- Lazy loading and code splitting for performance

**Backend:**
- NestJS framework with TypeScript
- PostgreSQL database (via Neon)
- Prisma ORM
- JWT authentication
- RESTful API with versioning (`/api/v1`)
- Swagger documentation

**Key Features:**
- Mobile-responsive design
- Real-time data updates
- Barcode scanning (exact and fuzzy matching)
- AI-powered chat assistant
- Background job processing
- Comprehensive audit logging

### Architecture Principles

1. **Multi-Tenancy**: Every data record belongs to a tenant (company)
2. **Role-Based Access Control**: Granular permissions for 15 user roles
3. **API-First Design**: All operations through versioned REST API
4. **Mobile-First**: Optimized for field technicians on smartphones
5. **Performance**: Lazy loading, code splitting, optimized bundles
6. **Security**: Helmet, CORS, JWT, input validation, MFA support

---

## User Personas

### 1. Super Admin
**Role:** System-level control and configuration  
**Tech Savviness:** High  
**Primary Device:** Desktop/Laptop  
**Key Goals:**
- Manage multiple tenant organizations
- Configure system settings and roles
- Monitor system health and performance
- Manage API integrations

**Pain Points:**
- Needs quick access to system-wide metrics
- Must manage complex permission configurations
- Requires visibility into all tenant activities

**Daily Activities:**
- Review system health dashboards
- Configure new tenant setups
- Manage role permissions
- Review audit logs

---

### 2. Owner/CEO
**Role:** Executive oversight of HVAC business  
**Tech Savviness:** Medium  
**Primary Device:** Desktop/Tablet  
**Key Goals:**
- View business performance at a glance
- Monitor revenue and profitability
- Oversee all departments
- Make strategic decisions

**Pain Points:**
- Too much data, needs executive summaries
- Needs mobile access for on-the-go decisions
- Requires consolidated view across all operations

**Daily Activities:**
- Review executive dashboard (revenue, jobs, performance)
- Check critical alerts and notifications
- Approve high-value transactions
- Monitor team performance metrics

---

### 3. Admin
**Role:** Business operations management  
**Tech Savviness:** Medium-High  
**Primary Device:** Desktop  
**Key Goals:**
- Manage day-to-day operations
- Coordinate between departments
- Handle customer escalations
- Generate business reports

**Pain Points:**
- Juggling multiple systems and modules
- Needs quick navigation between features
- Requires export capabilities for reporting

**Daily Activities:**
- Review and assign work orders
- Manage customer accounts
- Oversee inventory levels
- Generate weekly reports

---

### 4. Field Manager
**Role:** Oversee field technicians and work execution  
**Tech Savviness:** Medium  
**Primary Device:** Desktop/Tablet  
**Key Goals:**
- Monitor technician performance
- Ensure work quality and efficiency
- Manage workload distribution
- Review completed work orders

**Pain Points:**
- Needs real-time visibility into field operations
- Must quickly identify bottlenecks
- Requires mobile access for site visits

**Daily Activities:**
- Review dispatch schedule and assignments
- Monitor work order status
- Approve technician time and expenses
- Review field calculation submissions

---

### 5. Dispatcher / Lead Dispatch
**Role:** Schedule technicians and optimize routes  
**Tech Savviness:** Medium  
**Primary Device:** Desktop (dual monitors preferred)  
**Key Goals:**
- Optimize technician schedules
- Minimize drive time and maximize efficiency
- Handle emergency calls and reassignments
- Balance workload across team

**Pain Points:**
- Needs calendar/map view for scheduling
- Must see technician availability instantly
- Requires drag-and-drop for quick changes

**Daily Activities:**
- View daily dispatch board
- Assign new work orders
- Rearrange schedules based on priorities
- Communicate with technicians
- Monitor parts availability before assignment

---

### 6. Lead Technician
**Role:** Senior field technician with mentoring responsibilities  
**Tech Savviness:** Medium  
**Primary Device:** Smartphone  
**Key Goals:**
- Complete assigned work efficiently
- Mentor junior technicians
- Use field tools for diagnostics
- Ensure quality work

**Pain Points:**
- Needs quick access to calculators on job site
- Must save results to work orders easily
- Requires offline capability

**Daily Activities:**
- Check assigned work orders
- Use Field Tools calculators (superheat, subcooling, etc.)
- Save calculation results to work orders
- Update work order status
- Review parts needed and scan barcodes

---

### 7. Technician
**Role:** Field service technician  
**Tech Savviness:** Low-Medium  
**Primary Device:** Smartphone  
**Key Goals:**
- View assigned jobs
- Navigate to customer locations
- Access diagnostic tools
- Update job status

**Pain Points:**
- Needs simple, touch-friendly interface
- Must work in bright sunlight conditions
- Limited time between jobs
- May have spotty internet

**Daily Activities:**
- Check today's work orders
- Use Field Tools (Ohm's Law, Voltage Drop, CFM, etc.)
- Scan parts from truck inventory
- Update work order notes and status
- Record time and materials used

---

### 8. Purchasing Manager / Purchasing
**Role:** Procurement and vendor management  
**Tech Savviness:** Medium  
**Primary Device:** Desktop  
**Key Goals:**
- Maintain optimal inventory levels
- Negotiate vendor pricing
- Process purchase orders efficiently
- Track spending and budgets

**Pain Points:**
- Needs visibility into demand forecasting
- Must track multiple vendors and pricing
- Requires approval workflows

**Daily Activities:**
- Review inventory reorder points
- Create and approve purchase orders
- Communicate with vendors
- Track order delivery status
- Review purchasing analytics

---

### 9. Warehouse Manager / Warehouse Personnel
**Role:** Inventory management and fulfillment  
**Tech Savviness:** Medium  
**Primary Device:** Desktop + Handheld Scanner  
**Key Goals:**
- Maintain accurate inventory counts
- Fulfill technician parts requests
- Organize warehouse efficiently
- Process receiving

**Pain Points:**
- Needs barcode scanning for speed
- Must prevent stockouts
- Requires bin location tracking

**Daily Activities:**
- Process incoming deliveries
- Perform cycle counts
- Fulfill pick lists for technicians
- Scan and track inventory movements
- Update bin locations

---

### 10. Accounting
**Role:** Financial management and reporting  
**Tech Savviness:** High  
**Primary Device:** Desktop  
**Key Goals:**
- Track revenue and expenses
- Process invoices and payments
- Generate financial reports
- Ensure compliance

**Pain Points:**
- Needs integration with accounting software
- Must reconcile multiple data sources
- Requires audit trail for transactions

**Daily Activities:**
- Review financial dashboard
- Process customer invoices
- Reconcile accounts
- Generate P&L and cash flow reports
- Review work order costs

---

### 11. Sales/CRM User
**Role:** Customer relationship management  
**Tech Savviness:** Medium  
**Primary Device:** Desktop/Laptop  
**Key Goals:**
- Convert leads to customers
- Maintain customer relationships
- Track sales pipeline
- Generate quotes and estimates

**Pain Points:**
- Needs quick access to customer history
- Must track follow-ups and reminders
- Requires mobile access for site visits

**Daily Activities:**
- Review leads and opportunities
- Contact customers and log interactions
- Create work orders from quotes
- View customer service history
- Generate sales reports

---

### 12. Viewer/Analyst
**Role:** Read-only access for reporting and analysis  
**Tech Savviness:** Medium-High  
**Primary Device:** Desktop  
**Key Goals:**
- Generate business insights
- Create custom reports
- Analyze trends and patterns
- Export data for external analysis

**Pain Points:**
- Needs flexible reporting tools
- Must access historical data easily
- Requires data visualization

**Daily Activities:**
- Run custom reports
- Analyze KPI trends
- Export data to Excel/CSV
- Create dashboards for stakeholders

---

## Module Breakdown

### 1. Dashboard
**Purpose:** Central command center with role-based views  
**Priority:** Critical  
**Users:** All roles (content varies by permission)

**Key Features:**
- KPI cards (revenue, active jobs, technicians, inventory alerts)
- Quick action buttons (Create Work Order, New Lead, etc.)
- Recent activity feed
- Performance charts (weekly revenue, job completion rates)
- Role-specific widgets:
  - **Executive:** Revenue, profitability, growth metrics
  - **Dispatcher:** Today's schedule, technician status
  - **Technician:** My assigned jobs, route map
  - **Warehouse:** Low stock alerts, pending picks
  - **Purchasing:** POs pending approval, budget status

**Design Considerations:**
- Customizable widget layout
- Real-time data updates
- Mobile-responsive card design
- Color-coded status indicators

---

### 2. Work Orders
**Purpose:** Create, track, and manage service jobs  
**Priority:** Critical  
**Users:** Dispatchers, Technicians, Managers, Admins

**Key Features:**
- Work order list with filters (status, technician, date, customer)
- Create/edit work order form
- Status workflow (Scheduled → In Progress → Completed → Invoiced)
- Assign technician(s)
- Link to customer account
- Parts/materials tracking
- Time tracking
- Notes and attachments
- Field calculation results (from Field Tools)
- Signature capture
- Checklist completion
- Status history audit trail

**Design Considerations:**
- Quick status updates (one-tap)
- Mobile-optimized forms for technicians
- Photo upload for before/after
- GPS location stamping
- Offline capability for field use

**Workflow:**
1. Dispatcher creates work order
2. Assigns to technician
3. Technician receives notification
4. Technician completes job, uses Field Tools
5. Technician saves calculations to work order
6. Technician updates status to Completed
7. Manager reviews and approves
8. Accounting generates invoice

---

### 3. CRM (Customer Relationship Management)
**Purpose:** Manage customer accounts, contacts, leads, and interactions  
**Priority:** High  
**Users:** Sales, Admin, Dispatchers, Managers

**Key Features:**
- **Accounts:** Company profiles with service history
- **Contacts:** Individual contact information
- **Leads:** Sales pipeline and opportunity tracking
- **Notes:** Interaction history and communication log
- Customer service history (all work orders)
- Revenue by customer
- Service agreements and contracts
- Customer portal access (future)

**Design Considerations:**
- Unified customer view (360° profile)
- Quick lead-to-customer conversion
- Email/SMS integration
- Mobile-friendly contact lookup
- Search by name, phone, address

**Workflow:**
1. Sales receives lead (web form, phone, referral)
2. Creates lead in CRM
3. Logs follow-up notes
4. Schedules site visit
5. Converts lead to account
6. Creates first work order
7. Maintains ongoing relationship with notes

---

### 4. Inventory
**Purpose:** Track parts, materials, and equipment across warehouses  
**Priority:** Critical  
**Users:** Warehouse, Purchasing, Technicians, Admin

**Key Features:**
- **SKUs:** Part catalog with descriptions, pricing, suppliers
- **Warehouses:** Multiple location support
- **Bins:** Detailed bin/shelf location tracking
- **Stock Ledger:** Transaction history for every SKU
- On-hand quantity (real-time)
- Reorder points and alerts
- Barcode generation and scanning
- SKU details page:
  - Current stock levels
  - Locations (warehouse, bin)
  - Recent transactions
  - Reorder information
  - Supplier details
  - Usage history

**Design Considerations:**
- Barcode scanning for mobile
- Visual bin maps (future)
- Low stock alerts (red badges)
- Quick search by SKU, description, barcode
- Color-coded stock levels (green/yellow/red)

**Workflow:**
1. Purchasing creates PO for parts
2. Warehouse receives delivery
3. Scans barcodes and updates inventory
4. Assigns bin locations
5. Technician requests parts for job
6. Warehouse picks and scans out
7. Stock ledger updated automatically
8. System alerts when below reorder point

---

### 5. Purchasing
**Purpose:** Create and manage purchase orders  
**Priority:** High  
**Users:** Purchasing Manager, Purchasing, Warehouse, Admin

**Key Features:**
- Create purchase order
- Vendor selection
- Line items with SKUs and quantities
- Approval workflow (for high-value POs)
- Status tracking (Draft → Submitted → Approved → Received)
- Receive items and update inventory
- Partial receiving support
- PO history and audit trail
- Budget tracking and spending reports

**Design Considerations:**
- Quick PO creation from inventory alerts
- Vendor contact information accessible
- Email PO to vendor
- Mobile approval capability
- Integration with demand forecasting

**Workflow:**
1. System generates reorder alert
2. Purchasing creates PO
3. Adds line items from SKU catalog
4. Submits for approval (if required)
5. Manager approves PO
6. PO sent to vendor
7. Delivery arrives at warehouse
8. Warehouse receives and updates inventory
9. PO marked as Received

---

### 6. Dispatch & Scheduling
**Purpose:** Assign technicians to work orders and optimize routes  
**Priority:** Critical  
**Users:** Dispatchers, Lead Dispatch, Field Managers

**Key Features:**
- Calendar/board view of schedules
- Technician availability status
- Drag-and-drop work order assignment
- Route optimization (future)
- Emergency call handling
- Technician skill matching
- Parts availability check before assignment
- Time slot blocking
- Travel time estimation
- Performance metrics (jobs per day, drive time)

**Design Considerations:**
- Visual calendar (day/week/month views)
- Color-coding by status/priority
- Real-time technician location (future)
- Mobile notifications to technicians
- Conflict detection (double-booking prevention)

**Workflow:**
1. New work order created
2. Dispatcher checks technician availability
3. Verifies parts availability in inventory
4. Assigns to technician
5. Technician receives mobile notification
6. Technician accepts/declines assignment
7. Dispatcher monitors progress throughout day
8. Reassigns if needed (emergency, delays)

---

### 7. Labels (Barcode Generation)
**Purpose:** Generate barcode labels for inventory items  
**Priority:** Medium  
**Users:** Warehouse Personnel, Admin

**Key Features:**
- Generate barcode for any SKU
- Multiple format support (Code 128, QR)
- Print-ready label format
- Batch label printing

**Design Considerations:**
- Simple SKU selection
- Print preview
- Standard label sizes (Dymo, Zebra)

---

### 8. Forecasting
**Purpose:** Demand forecasting for inventory planning  
**Priority:** Medium  
**Users:** Purchasing Manager, Warehouse Manager, Admin

**Key Features:**
- Historical usage analysis
- Seasonal trend detection
- Reorder recommendations
- What-if scenarios
- Export forecast data

**Design Considerations:**
- Visual charts and graphs
- Adjustable time periods
- SKU-level and category-level forecasts

---

### 9. Barcode Scanner
**Purpose:** Quick SKU lookup via barcode scanning  
**Priority:** High  
**Users:** Technicians, Warehouse Personnel

**Key Features:**
- Camera-based barcode scanning
- Exact match and fuzzy matching
- Instant SKU information display
- Stock level visibility
- Add to work order from scan

**Design Considerations:**
- Large scan button for mobile
- Works in various lighting conditions
- Instant feedback (sound/vibration)
- Fallback to manual entry

**Workflow:**
1. Technician needs part information
2. Opens scanner
3. Points camera at barcode
4. System identifies SKU (exact or fuzzy match)
5. Displays SKU details, stock level, location
6. Option to add to work order

---

### 10. Field Tools (21 Professional Calculators)
**Purpose:** HVAC diagnostic and design calculators for field technicians  
**Priority:** Critical  
**Users:** Technicians, Lead Technicians, Field Managers

**Calculator Categories:**

#### **Electrical (4 tools)**
1. **Ohm's Law Calculator** - Calculate V, I, R, and Power
2. **Capacitor Test Tool** - Test capacitors with ±10% tolerance
3. **Motor Amps Checker** - Check motor load percentage
4. **Voltage Drop Tool** - Calculate voltage drop and wire sizing

#### **Refrigeration (4 tools)**
5. **Superheat Calculator** - Measure superheat for charge diagnosis
6. **Subcooling Calculator** - Measure subcooling for charge verification
7. **Target Superheat Tool** - Calculate target superheat from conditions
8. **PT Chart** - Pressure-Temperature reference chart

#### **Airflow (3 tools)**
9. **CFM Calculator** - Calculate airflow from BTU/hr and ΔT
10. **Duct Sizer** - Size ducts based on CFM and velocity
11. **Static Pressure Tool** - Calculate total external static pressure

#### **Gas/Combustion (3 tools)**
12. **Gas Pipe Sizer** - Size gas pipes for furnaces and appliances
13. **Combustion Air Calculator** - Calculate combustion air requirements
14. **Combustion Analysis Tool** - Reference values for combustion testing

#### **Hydronic/Boiler (3 tools)**
15. **Expansion Tank Sizer** - Size expansion tanks for closed systems
16. **Hydronic Flow Calculator** - Calculate GPM and pump sizing
17. **Radiant Floor Heating** - Design radiant floor heating systems

#### **Utilities (4 tools)**
18. **Psychrometric Calculator** - Dew point, wet bulb, humidity calculations
19. **Tonnage Converter** - Convert BTU/hr to tons and vice versa
20. **Unit Converter** - General HVAC unit conversions
21. **Heat Load Calculator (Manual J)** - Simplified heat load estimation

**Key Features:**
- All calculators follow industry standards (NEC, NFPA 54, ACCA, ASHRAE)
- Large, touch-friendly inputs for mobile use
- Real-time calculation as you type
- **Save to Work Order:** Button on 19 calculators (excludes PT Chart, Combustion Analysis)
- Results saved with full audit trail (technician, timestamp, inputs, outputs)
- Calculator results viewable in work order history
- Color-coded results (green = good, yellow = check, red = problem)

**Design Considerations:**
- Mobile-first design (large buttons, easy scrolling)
- Lazy loading (only load calculator when selected)
- Offline capability
- Clear result display with units
- Help text for each input
- Professional appearance (technicians show to customers)

**Workflow:**
1. Technician on job site opens Field Tools
2. Selects category (e.g., Refrigeration)
3. Selects calculator (e.g., Superheat)
4. Enters measurements from equipment
5. Views calculated result
6. Clicks "Save to Work Order"
7. Selects active work order
8. Adds optional notes
9. Saves - calculation stored in work order
10. Manager can review calculation later in work order details

---

### 11. AI Assistant (Chat)
**Purpose:** AI-powered help and support  
**Priority:** Medium  
**Users:** All users

**Key Features:**
- Natural language queries
- HVAC knowledge base
- Work order assistance
- System help and navigation
- Chat history per tenant
- OpenAI integration

**Design Considerations:**
- Chat interface (persistent sidebar or modal)
- Quick suggestion buttons
- Context-aware responses
- Mobile-friendly chat

---

### 12. Login & Authentication
**Purpose:** Secure access control  
**Priority:** Critical  
**Users:** All users

**Key Features:**
- Email/password login
- JWT token-based authentication
- Multi-factor authentication (MFA) support
- Password reset flow
- Email verification
- Session management
- Remember device (trusted devices)
- Account lockout after failed attempts

**Design Considerations:**
- Clean, professional login page
- Mobile-responsive
- Clear error messages
- Remember me checkbox
- Forgot password link
- MFA setup wizard

---

## User Workflows

### Workflow 1: Technician Completes Job with Field Tools

**Actors:** Technician, Dispatcher, Manager

**Steps:**
1. **Morning:** Technician logs in on smartphone
2. **Dashboard:** Views assigned work orders for the day
3. **Navigate:** Clicks on first work order → sees customer address, notes
4. **Drive:** Uses GPS navigation to customer location
5. **Arrive:** Updates work order status to "In Progress"
6. **Diagnose:** Customer complains AC isn't cooling
7. **Field Tools:** Opens Field Tools → Refrigeration → Superheat Calculator
8. **Measure:** Takes suction line temp (55°F) and pressure (68 PSI)
9. **Calculate:** Enters values, sees result: 15°F superheat
10. **Interpret:** Yellow alert: "Should be 10-15°F" - borderline low charge
11. **Save:** Clicks "Save to Work Order" button
12. **Confirm:** Selects current work order, adds note "Checked superheat before adding refrigerant"
13. **Second Tool:** Uses Subcooling Calculator to verify liquid line
14. **Add Refrigerant:** Adds 1 lb R-410A
15. **Recheck:** Uses Superheat Calculator again, saves new result
16. **Complete:** Updates work order status to "Completed"
17. **Materials:** Records 1 lb R-410A used from truck stock
18. **Signature:** Customer signs on smartphone screen
19. **Next Job:** Moves to next work order
20. **Evening:** Manager reviews work order, sees superheat calculations in history, approves job

**Pain Points Addressed:**
- Quick access to professional calculators
- Results automatically saved (no manual logging)
- Audit trail for quality assurance
- Mobile-optimized for field use

---

### Workflow 2: Dispatcher Schedules Emergency Call

**Actors:** Dispatcher, Customer, Technician

**Steps:**
1. **Call Received:** Customer calls with heating emergency
2. **CRM Lookup:** Dispatcher searches customer by phone number
3. **Account Found:** Views customer history, active service agreement
4. **Create Work Order:** Clicks "New Work Order" from customer profile
5. **Fill Details:** Priority: Emergency, Type: No Heat, Customer auto-filled
6. **Check Availability:** Opens Dispatch board, sees technician statuses
7. **Check Parts:** Verifies common furnace parts in stock at main warehouse
8. **Find Technician:** Identifies nearest available technician (John - 15 min away)
9. **Assign:** Drags work order to John's schedule, assigns 2-hour time block
10. **Notify:** John receives push notification on smartphone
11. **Accept:** John accepts assignment
12. **Update Customer:** Dispatcher calls customer, confirms technician ETA
13. **Monitor:** Dispatcher watches real-time status updates as John travels, arrives, diagnoses
14. **Parts Needed:** John texts dispatcher: "Need igniter, part #IG-4421"
15. **Check Stock:** Dispatcher checks inventory, confirms in stock
16. **Coordinate:** Dispatcher arranges parts pickup or delivery
17. **Complete:** John completes job, updates status
18. **Follow-up:** Dispatcher calls customer to confirm satisfaction

**Pain Points Addressed:**
- Quick customer lookup
- Real-time technician availability
- Parts availability check before assignment
- Mobile notifications
- Live status updates

---

### Workflow 3: Warehouse Receives Purchase Order

**Actors:** Purchasing, Vendor, Warehouse Personnel

**Steps:**
1. **PO Created:** Purchasing creates PO for 50 air filters
2. **Vendor Ships:** Vendor delivers shipment to warehouse
3. **Receiving:** Warehouse personnel opens app on tablet
4. **Find PO:** Navigates to Purchasing → finds pending PO #1234
5. **Scan Shipment:** Scans barcode on shipping label (matches PO)
6. **Verify Contents:** Checks quantity (50 filters received)
7. **Receive Items:** Clicks "Receive" button
8. **Assign Location:** Scans bin location barcode (Warehouse A, Aisle 3, Bin 12)
9. **Generate Labels:** Prints barcode labels for individual filters (if needed)
10. **Update System:** Clicks "Complete Receiving"
11. **Inventory Updated:** Stock ledger automatically updated (+50 filters)
12. **Notifications:** Purchasing notified PO received, Technicians see parts now available
13. **PO Closed:** PO status changed to "Received"

**Pain Points Addressed:**
- Barcode scanning for speed and accuracy
- Automatic inventory updates
- Bin location tracking
- Real-time stock visibility for technicians

---

### Workflow 4: Manager Reviews Weekly Performance

**Actors:** Field Manager, Owner/CEO

**Steps:**
1. **Monday Morning:** Manager logs in, sees executive dashboard
2. **KPI Overview:** Reviews key metrics:
   - Jobs completed last week: 127
   - Average job time: 2.3 hours
   - Revenue: $45,230
   - Customer satisfaction: 4.7/5
3. **Technician Performance:** Clicks "Team Performance" widget
4. **Individual Metrics:** Reviews each technician:
   - Jobs completed
   - Average time per job
   - Parts usage
   - Field Tool usage (quality indicator)
5. **Identify Outlier:** Notices new technician completing jobs 50% slower
6. **Drill Down:** Views technician's work orders
7. **Review Field Calculations:** Sees minimal use of Field Tools
8. **Action:** Schedules training session on Field Tools
9. **Export Report:** Generates PDF report for CEO
10. **Share Insights:** Emails report to CEO with recommendations
11. **CEO Review:** CEO logs in, views dashboard, sees upward revenue trend
12. **Strategic Decision:** Approves hiring additional technician

**Pain Points Addressed:**
- Consolidated performance metrics
- Drill-down capability for root cause analysis
- Field calculation audit trail (quality indicator)
- Export for stakeholder reporting

---

## Data Model Overview

### Core Entities and Relationships

**Tenant (Multi-Tenancy Foundation)**
- Root entity for data isolation
- Contains: name, subdomain, settings, plan tier
- Relations: All other entities belong to a tenant

**User (Authentication & Authorization)**
- Fields: email, password, firstName, lastName, phone, avatarUrl
- MFA: mfaEnabled, mfaSecret, mfaMethod
- Organization: departmentId, teamId, managerId, jobTitle
- Status: isActive, emailVerified, lastLoginAt
- Relations: roles (many-to-many), department, team, manager

**Role & Permission (RBAC)**
- 15 predefined roles: Super Admin, Owner/CEO, Admin, Field Manager, Lead Dispatch, Dispatcher, Lead Tech, Technician, Purchasing Manager, Purchasing, Warehouse Manager, Warehouse Personnel, Accounting, Sales/CRM User, Viewer/Analyst
- Permissions: Granular access control per module/action
- UserRole: Junction table linking users to roles

**WorkOrder (Service Jobs)**
- Fields: status, priority, type, scheduledDate, customerId
- Status flow: Scheduled → In Progress → Completed → Invoiced
- Relations: customer (Account), technicians (many-to-many), lineItems, notes, attachments, fieldCalculations, signatures, checklists

**Account (Customer Companies)**
- Fields: name, type, address, phone, email, website
- Relations: contacts, workOrders, serviceAgreements, notes, invoices

**Contact (Individual People)**
- Fields: firstName, lastName, email, phone, title
- Relations: account (parent company), notes, leads

**Lead (Sales Pipeline)**
- Fields: source, status, estimatedValue, probability
- Relations: contact, account (after conversion), notes

**SKU (Inventory Items)**
- Fields: sku, description, unitCost, unitPrice, category, manufacturer
- Relations: warehouses (many-to-many through stock), bins, stockLedger, purchaseOrderItems

**Warehouse**
- Fields: name, address, type (main, satellite, truck)
- Relations: bins, stock

**Bin (Storage Locations)**
- Fields: warehouseId, aisle, rack, shelf, binNumber
- Relations: stock (SKU quantities)

**StockLedger (Inventory Transactions)**
- Fields: skuId, warehouseId, transactionType, quantity, balanceAfter
- Tracks every inventory movement (receive, issue, adjust, transfer)

**PurchaseOrder**
- Fields: poNumber, vendorId, status, totalAmount, orderDate
- Relations: lineItems (SKUs and quantities), tenant

**DispatchSlot**
- Fields: technicianId, workOrderId, startTime, endTime, status
- Relations: technician (User), workOrder

**FieldCalculation (Saved Calculator Results)**
- Fields: calculatorType, inputs (JSON), outputs (JSON), workOrderId, technicianId
- Relations: workOrder, technician (User)
- Purpose: Audit trail for all field tool calculations

**ChatLog (AI Assistant)**
- Fields: userMessage, aiResponse, timestamp
- Relations: tenant, user

**Forecast**
- Fields: skuId, period, predictedDemand, algorithm
- Relations: SKU

**Department**
- Fields: name, description, parentId (nested hierarchy), managerId
- Relations: users, teams, parent/children

**Team**
- Fields: name, departmentId
- Relations: members (users), department

**Invoice**
- Fields: invoiceNumber, workOrderId, amount, dueDate, status
- Relations: workOrder, customer (Account), lineItems, payments

**Payment**
- Fields: invoiceId, amount, paymentDate, method
- Relations: invoice

**Expense**
- Fields: category, amount, date, approvedBy
- Relations: workOrder, user

**AuditLog**
- Fields: action, entityType, entityId, changes (JSON), userId
- Purpose: Track all data modifications for compliance

---

### Key Relationships

**Tenant → Everything**: All data scoped by tenant for multi-tenancy

**WorkOrder Relationships:**
- WorkOrder → Customer (Account): Many-to-one
- WorkOrder → Technicians (User): Many-to-many
- WorkOrder → FieldCalculations: One-to-many
- WorkOrder → Attachments: One-to-many
- WorkOrder → Notes: One-to-many
- WorkOrder → Invoice: One-to-one

**Inventory Relationships:**
- SKU → StockLedger: One-to-many
- SKU → Bins: Many-to-many (SKU can be in multiple bins)
- Warehouse → Bins: One-to-many
- PurchaseOrder → SKUs: Many-to-many (through line items)

**User Relationships:**
- User → Roles: Many-to-many (user can have multiple roles)
- User → Department: Many-to-one
- User → Team: Many-to-one
- User → Manager: Self-referencing (user reports to another user)
- User → WorkOrders (as technician): Many-to-many
- User → FieldCalculations: One-to-many

**CRM Relationships:**
- Account → Contacts: One-to-many
- Account → WorkOrders: One-to-many
- Account → Leads: One-to-many
- Contact → Notes: One-to-many

---

## Technical Requirements

### 1. Multi-Tenancy
- All data queries must filter by tenant ID
- URL subdomain routing (company1.hvacapp.com)
- Tenant isolation enforced at database level
- Shared schema with tenant_id column

### 2. Authentication & Security
- JWT tokens with expiration
- Refresh token support
- MFA (TOTP, SMS, Email methods)
- Password complexity requirements
- Account lockout after 5 failed attempts
- Session management with trusted devices
- Helmet for HTTP security headers
- CORS configuration
- Input validation with class-validator

### 3. Authorization (RBAC)
- 15 predefined roles with specific permissions
- Custom role creation capability
- Permission inheritance and templates
- Row-level security (users only see their tenant's data)
- Sensitive permission approval workflows
- Audit logging for all permission changes

### 4. Performance
- Lazy loading for all 21 Field Tools calculators
- Route-based code splitting for main modules
- React.memo for frequently rendered components (SaveToWorkOrder, Sidebar)
- Suspense boundaries with loading spinners
- Database indexing on tenantId, status, dates
- API pagination for large datasets
- Caching strategy for static data

### 5. Mobile Responsiveness
- Mobile-first design for Field Tools
- Touch-friendly buttons (minimum 44px tap targets)
- Responsive grid layouts
- Viewport optimization for smartphones
- Offline capability for field technicians (future)
- GPS location services integration

### 6. API Design
- RESTful API with versioning (`/api/v1`)
- Consistent response format (success, data, error)
- HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- Swagger/OpenAPI documentation
- Rate limiting with throttler
- CORS headers for frontend integration

### 7. Data Integrity
- Foreign key constraints
- Transaction support (ACID compliance)
- Soft deletes (deletedAt timestamp)
- Audit logging for critical operations
- Stock ledger for inventory accuracy
- Optimistic locking for concurrent updates

### 8. Monitoring & Logging
- Health check endpoint (`/api/v1/health`)
- Metrics endpoint (`/api/v1/metrics`)
- Error logging and tracking
- Performance monitoring
- Audit logs for compliance (SOX, GDPR, HIPAA ready)

### 9. Integration Points
- OpenAI API for AI chat assistant
- Email service for notifications
- SMS service for alerts (future)
- Barcode scanning (camera API)
- GPS location services (future)
- Accounting software export (future)
- Payment gateway integration (future)

### 10. Database
- PostgreSQL (Neon cloud database)
- Prisma ORM with type safety
- Migrations via `npm run db:push`
- 69 tables with optimized indexes
- Full-text search capability
- JSON fields for flexible data (settings, preferences)

---

## Design Considerations

### 1. Industry-Specific Needs

**HVAC Standards Compliance:**
- NEC (National Electrical Code) for electrical calculations
- NFPA 54 for gas pipe sizing
- ACCA (Air Conditioning Contractors of America) for load calculations
- ASHRAE standards for HVAC design

**Field Environment:**
- Bright sunlight readability
- Glove-friendly touch targets
- Minimal scrolling (tall pages = hard on ladders)
- Quick access (technicians have limited time)

### 2. Visual Design

**Color Palette:**
- Primary: Professional blue (#2563eb) - trust, reliability
- Success: Green (#10b981) - completed, good readings
- Warning: Yellow (#f59e0b) - attention needed
- Error: Red (#ef4444) - critical issues, out of spec
- Neutral: Grays (#6b7280, #f3f4f6) - backgrounds, borders

**Typography:**
- Headers: 24-32px, bold, high contrast
- Body: 16-18px for desktop, 18-20px for mobile
- Monospace for technical values (temperatures, pressures)
- System fonts for performance (no custom font loading)

**Icons:**
- Consistent icon library (heroicons, feather)
- Meaningful icons for modules (wrench, calendar, box, etc.)
- Emoji icons for Field Tools (friendly, recognizable)

**Layout:**
- Sidebar navigation (collapsible on mobile)
- Top bar with user profile, notifications, search
- Card-based design for modularity
- Ample whitespace for clarity

### 3. Accessibility

**WCAG 2.1 AA Compliance:**
- Color contrast ratio 4.5:1 minimum
- Keyboard navigation support
- Screen reader friendly labels
- Focus indicators
- Alt text for images
- Semantic HTML

**Touch Accessibility:**
- Minimum 44x44px touch targets
- Adequate spacing between interactive elements
- Swipe gestures for mobile navigation
- Haptic feedback for actions

### 4. Error Handling

**User-Friendly Messages:**
- No technical jargon in error messages
- Clear next steps ("Check your connection and try again")
- Toast notifications for success/error
- Form validation with inline errors

**Graceful Degradation:**
- Offline mode for critical features (work order view)
- Retry mechanisms for failed API calls
- Loading states for all async operations
- Fallbacks for missing data

### 5. Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Mobile bundle size: < 500KB (initial load)
- API response time: < 200ms (p95)

### 6. Branding

**Professional HVAC Image:**
- Clean, modern design (not dated)
- Industry credibility (standards compliance)
- Trust indicators (security badges, certifications)
- Customizable per tenant (logo, colors)

---

## Screen Inventory

### Authentication Screens
1. **Login** - Email/password, MFA, forgot password
2. **Register** - New user signup (if enabled by tenant)
3. **Forgot Password** - Email-based reset
4. **Reset Password** - New password entry
5. **MFA Setup** - TOTP/SMS configuration
6. **Email Verification** - Confirm email link

### Main Application Screens
7. **Dashboard** - Role-based home screen
8. **Work Orders List** - Table with filters, search
9. **Work Order Detail** - Full work order view/edit
10. **Work Order Create** - New work order form
11. **CRM Accounts List** - Customer accounts table
12. **CRM Account Detail** - 360° customer view
13. **CRM Contacts List** - Contacts table
14. **CRM Contact Detail** - Individual contact view
15. **CRM Leads List** - Sales pipeline
16. **CRM Lead Detail** - Lead information and history
17. **Inventory SKUs List** - Parts catalog
18. **Inventory SKU Detail** - SKU information, stock levels, locations
19. **Inventory Warehouses** - Warehouse list and management
20. **Inventory Bins** - Bin locations and mapping
21. **Purchasing List** - Purchase orders table
22. **Purchasing Detail** - PO view/edit
23. **Purchasing Create** - New PO form
24. **Dispatch Board** - Calendar/schedule view
25. **Dispatch Technician View** - Individual technician schedule
26. **Labels Generator** - Barcode label creation
27. **Forecast Dashboard** - Demand forecasting charts
28. **Scanner** - Barcode camera scan interface
29. **AI Assistant** - Chat interface
30. **User Profile** - Personal settings, preferences
31. **Admin Settings** - System configuration (Super Admin only)

### Field Tools Screens (21 Calculators)
32. **Field Tools Home** - Calculator category grid
33. **Ohm's Law Calculator**
34. **Capacitor Test Tool**
35. **Motor Amps Checker**
36. **Voltage Drop Tool**
37. **Superheat Calculator**
38. **Subcooling Calculator**
39. **Target Superheat Tool**
40. **PT Chart**
41. **CFM Calculator**
42. **Duct Sizer**
43. **Static Pressure Tool**
44. **Gas Pipe Sizer**
45. **Combustion Air Calculator**
46. **Combustion Analysis Tool**
47. **Expansion Tank Sizer**
48. **Hydronic Flow Calculator**
49. **Radiant Floor Heating Calculator**
50. **Psychrometric Calculator**
51. **Tonnage Converter**
52. **Unit Converter**
53. **Heat Load Calculator**

### Shared Components
54. **Sidebar Navigation** - Left sidebar menu
55. **Top Bar** - User menu, notifications, search
56. **Notification Panel** - Alert center
57. **Search Results** - Global search overlay
58. **Modal Dialogs** - Confirmations, forms
59. **Toast Notifications** - Success/error messages

**Total Screens:** 59 unique views

---

## Interaction Patterns

### 1. Navigation

**Primary Navigation (Sidebar):**
- Always visible on desktop
- Collapsible hamburger menu on mobile
- Active state highlighting
- Icon + label for each module
- Grouped by function (Operations, Inventory, Business)

**Secondary Navigation:**
- Breadcrumbs for deep pages (Account → Work Orders → WO #1234)
- Tabs within modules (CRM: Accounts | Contacts | Leads | Notes)
- Back buttons on mobile

**Global Actions:**
- Top bar search (global search across all entities)
- Notifications dropdown (alerts, assignments)
- User profile menu (settings, logout)
- Quick action buttons (+ New Work Order, + New Lead)

### 2. Data Display

**Tables:**
- Sortable columns (click header to sort)
- Filterable (dropdown filters, search)
- Paginated (show 25, 50, 100 rows)
- Row actions (view, edit, delete icons)
- Responsive (card view on mobile)
- Export to CSV/Excel

**Cards:**
- Dashboard KPIs (metric, value, trend)
- Entity summaries (customer card, WO card)
- Hover effects for interactivity

**Charts:**
- Line charts for trends (revenue over time)
- Bar charts for comparisons (technician performance)
- Pie charts for breakdowns (work order status distribution)
- Real-time updates where applicable

**Status Indicators:**
- Color badges (green, yellow, red)
- Progress bars (job completion %)
- Icons (checkmark, warning, error)

### 3. Forms

**Input Fields:**
- Clear labels above fields
- Placeholder text for examples
- Required field indicators (*)
- Inline validation (real-time error display)
- Help text for complex fields

**Form Actions:**
- Primary button (Save, Submit) - prominent blue
- Secondary button (Cancel) - ghost/outline
- Destructive button (Delete) - red with confirmation

**Smart Forms:**
- Auto-save drafts (work orders, notes)
- Autocomplete for common fields (customer search)
- Date pickers for date fields
- Dropdown selects for enums (status, priority)

### 4. Mobile Patterns

**Gestures:**
- Swipe to delete (work order from list)
- Pull to refresh (update lists)
- Tap to expand (accordion details)
- Long press for context menu

**Mobile Optimizations:**
- Bottom navigation bar (frequently used actions)
- Floating action button (+ Add)
- Sticky headers on scroll
- Modal forms (full screen on mobile)

### 5. Real-Time Updates

**Push Notifications:**
- Browser notifications for new assignments
- Mobile push for critical alerts
- In-app notification badge (red dot)

**Live Data:**
- Work order status updates (polling or WebSocket)
- Dispatch board real-time changes
- Inventory level updates after transactions

### 6. Feedback Mechanisms

**Success States:**
- Green toast notification ("Work order created successfully")
- Checkmark animation
- Redirect to created entity

**Error States:**
- Red toast notification with error message
- Form field highlighting
- Retry buttons for failed operations

**Loading States:**
- Skeleton screens for page loads
- Spinner for button actions
- Progress bars for uploads

**Empty States:**
- Friendly message ("No work orders yet")
- Call-to-action button ("Create your first work order")
- Illustration or icon

---

## User Stories

### Super Admin Stories

**As a Super Admin, I want to...**
1. Create and configure new tenant organizations so HVAC companies can use the platform
2. Manage role permissions across all tenants to ensure security compliance
3. View system-wide health metrics so I can proactively address issues
4. Access audit logs for all tenants for security and compliance purposes
5. Configure API integrations (OpenAI, email, SMS) to enable advanced features

---

### Owner/CEO Stories

**As an Owner/CEO, I want to...**
1. See total monthly revenue on my dashboard so I understand business performance at a glance
2. View the number of active jobs and completed jobs this month to gauge productivity
3. Monitor technician utilization rates to optimize staffing levels
4. Review customer satisfaction scores to ensure quality service delivery
5. Access financial reports (P&L, cash flow) to make strategic business decisions

---

### Admin Stories

**As an Admin, I want to...**
1. Create new work orders quickly so I can respond to customer calls efficiently
2. Assign work orders to available technicians to balance workload
3. View all customer accounts and their service history in one place
4. Generate monthly performance reports for management review
5. Export data to Excel for custom analysis and presentations

---

### Field Manager Stories

**As a Field Manager, I want to...**
1. See all technicians' current locations and job status so I can coordinate the team
2. Review field calculation submissions to ensure quality work and proper diagnostics
3. Identify technicians who need additional training based on performance metrics
4. Approve technician time entries and expense reports efficiently
5. Monitor job completion times to identify bottlenecks and inefficiencies

---

### Dispatcher Stories

**As a Dispatcher, I want to...**
1. View a calendar showing all technicians' schedules for the week
2. Drag and drop work orders to reassign them quickly during emergencies
3. Check parts availability before assigning jobs to avoid delays
4. Send mobile notifications to technicians when assigning new jobs
5. See estimated drive times between jobs to optimize routes

---

### Lead Technician Stories

**As a Lead Technician, I want to...**
1. Use the Superheat Calculator on my phone while on a job site to diagnose refrigerant charge issues
2. Save calculator results directly to the work order so my manager can review my diagnostic process
3. View my assigned work orders for the day with customer addresses and notes
4. Mentor junior technicians by reviewing their field calculation submissions
5. Update work order status from my phone without typing detailed notes (quick status buttons)

---

### Technician Stories

**As a Technician, I want to...**
1. Check my daily schedule on my smartphone before leaving home
2. Navigate to customer locations using GPS from the work order
3. Use Field Tools (Voltage Drop, Ohm's Law, CFM) without memorizing complex formulas
4. Scan barcodes of parts I use so inventory is updated automatically
5. Mark jobs complete and get customer signatures on my phone to avoid paperwork

---

### Purchasing Manager Stories

**As a Purchasing Manager, I want to...**
1. See which SKUs are below reorder points so I can create purchase orders proactively
2. Review demand forecasts before ordering seasonal items to optimize inventory
3. Track vendor performance (delivery times, pricing) to negotiate better terms
4. Approve purchase orders submitted by my purchasing team efficiently
5. View spending by category to manage budgets

---

### Warehouse Manager Stories

**As a Warehouse Manager, I want to...**
1. Scan incoming deliveries to update inventory quickly and accurately
2. Assign bin locations to new SKUs to maintain organized storage
3. Perform cycle counts and reconcile discrepancies to ensure inventory accuracy
4. View inventory turnover reports to identify slow-moving items
5. Fulfill parts requests from technicians and update stock levels in real-time

---

### Accounting Stories

**As an Accounting user, I want to...**
1. Generate invoices from completed work orders automatically
2. Track accounts receivable and see which customers have outstanding balances
3. Process customer payments and reconcile them with invoices
4. Export financial data to QuickBooks or other accounting software
5. View revenue by service type to understand profitability

---

### Sales/CRM User Stories

**As a Sales/CRM User, I want to...**
1. Convert a lead to a customer account when they agree to service
2. Log all customer interactions (phone calls, emails, site visits) in one place
3. See a customer's complete service history before making a sales call
4. Create work orders from sales quotes once approved by the customer
5. Track my sales pipeline (leads, opportunities, conversions) to measure performance

---

### Viewer/Analyst Stories

**As a Viewer/Analyst, I want to...**
1. Create custom reports combining data from multiple modules (work orders + CRM + inventory)
2. Export reports to PDF or Excel for stakeholder presentations
3. View historical trends (year-over-year comparisons) to identify growth patterns
4. Filter and segment data by technician, customer, service type, or date range
5. Build dashboards with visualizations (charts, graphs) for executive review

---

## Conclusion

This UI/UX design brief provides a comprehensive foundation for designing the HVAC Management System. It captures:

- **User Needs:** 12 detailed personas with goals, pain points, and daily activities
- **System Scope:** 12 core modules with 59 screens
- **Functionality:** 21 Field Tools calculators with work order integration
- **Data Architecture:** 69-table database with clear entity relationships
- **Technical Requirements:** Multi-tenancy, RBAC, performance, security
- **Design Guidelines:** Mobile-first, HVAC industry standards, accessibility
- **Interaction Patterns:** Navigation, forms, real-time updates, feedback
- **User Stories:** 50+ stories covering all user roles

**Next Steps for UI/UX Design:**

1. **Wireframing:** Create low-fidelity wireframes for key screens (Dashboard, Work Orders, Field Tools)
2. **Visual Design:** Apply color palette, typography, and branding
3. **Prototype:** Build interactive prototypes for user testing
4. **User Testing:** Test with actual HVAC technicians, dispatchers, and managers
5. **Iterate:** Refine based on feedback
6. **Design System:** Create reusable component library (buttons, forms, cards)
7. **Responsive Design:** Ensure mobile optimization for field use
8. **Accessibility Audit:** WCAG 2.1 AA compliance verification

**Key Success Metrics:**

- Technician job completion time (target: reduce by 20%)
- Field Tools usage rate (target: 80% of jobs include calculator use)
- Work order creation to assignment time (target: < 5 minutes)
- Mobile user satisfaction (target: 4.5/5 stars)
- Dashboard load time (target: < 2 seconds)
- Inventory accuracy (target: 99%+ with barcode scanning)

This brief is ready to be shared with AI design tools (MidJourney, DALL-E for mockups), UI design platforms (Figma, Sketch), or AI assistants (Claude, GPT-4) for detailed screen design and prototyping.

---

**Document End**
