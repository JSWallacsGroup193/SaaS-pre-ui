# Admin Dashboard Plan - HVAC Management System

## Document Information
- **Version**: 2.0
- **Last Updated**: October 19, 2025
- **Status**: Planning Phase - Enterprise-Ready
- **Recent Changes**: Comprehensive security, usability, and integration enhancements added

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Dashboard Overview](#dashboard-overview)
3. [Key Performance Indicators (KPIs)](#key-performance-indicators-kpis)
4. [Dashboard Sections](#dashboard-sections)
5. [User Roles & Permissions](#user-roles--permissions)
6. [Data Visualizations](#data-visualizations)
7. [Technical Architecture](#technical-architecture)
8. [API Requirements](#api-requirements)
9. [UI/UX Design Guidelines](#uiux-design-guidelines)
10. [Implementation Phases](#implementation-phases)
11. [Future Enhancements](#future-enhancements)

---

## Executive Summary

The Admin Dashboard serves as the central command center for the HVAC Management System, providing real-time insights into business operations, system health, and key performance metrics. It enables administrators to monitor, analyze, and manage all aspects of the HVAC business including work orders, inventory, customer relationships, technician dispatch, and financial performance.

### Primary Objectives
- **Real-time Monitoring**: Provide instant visibility into business operations and system performance
- **Data-Driven Decisions**: Enable informed decision-making through comprehensive analytics and reporting
- **Operational Efficiency**: Streamline administrative tasks and workflow management
- **System Health**: Monitor application performance, database status, and system resources
- **User Management**: Centralized control over users, roles, and permissions
- **Business Intelligence**: Generate actionable insights from operational data

---

## Dashboard Overview

### Main Dashboard Layout

#### Top-Level Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Header: Logo | Search | Notifications | User Profile        │
├─────────────────────────────────────────────────────────────┤
│         │                                                    │
│ Sidebar │              Main Dashboard Area                  │
│  Menu   │                                                    │
│         │  ┌──────────────┐ ┌──────────────┐               │
│         │  │ KPI Card 1   │ │ KPI Card 2   │               │
│         │  └──────────────┘ └──────────────┘               │
│         │                                                    │
│         │  ┌──────────────────────────────────────┐         │
│         │  │ Chart/Graph Area                     │         │
│         │  └──────────────────────────────────────┘         │
│         │                                                    │
│         │  ┌──────────────┐ ┌──────────────┐               │
│         │  │ Recent Items │ │ Activity Feed│               │
│         │  └──────────────┘ └──────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

#### Sidebar Navigation
- **Dashboard** (Home)
- **Analytics & Reports**
  - Business Analytics
  - Financial Reports
  - Operational Reports
  - Custom Reports
- **Work Order Management**
  - Active Work Orders
  - Work Order Status Board
  - Technician Performance
- **Inventory Management**
  - Stock Overview
  - Low Stock Alerts
  - Inventory Valuation
  - Warehouse Analytics
- **CRM Analytics**
  - Customer Overview
  - Lead Pipeline
  - Sales Performance
  - Customer Retention
- **Dispatch Management**
  - Schedule Overview
  - Technician Utilization
  - Route Optimization
- **System Administration**
  - User Management
  - Role & Permissions
  - System Settings
  - Audit Logs
- **System Monitoring**
  - Application Health
  - Database Metrics
  - Performance Analytics
  - Error Logs
- **Financial Dashboard**
  - Revenue Analytics
  - Expense Tracking
  - Profitability Analysis
  - Purchase Order Analytics

---

## Key Performance Indicators (KPIs)

### Business KPIs

#### 1. Work Order Metrics
- **Total Active Work Orders**: Count of open/in-progress work orders
- **Work Order Completion Rate**: Percentage of completed work orders (daily/weekly/monthly)
- **Average Time to Complete**: Mean time from creation to completion
- **Overdue Work Orders**: Count and percentage of past-due work orders
- **First-Time Fix Rate**: Percentage of work orders completed in one visit
- **Customer Satisfaction Score**: Average rating from completed work orders
- **Zero Dollar Work Orders**: Count and percentage of work orders with $0 revenue
  - Tracked by service type (warranty, goodwill, diagnostic, etc.)
  - Trend analysis to identify patterns
  - Impact on technician productivity
- **Call Back Rate**: Percentage of work orders requiring return visits
  - Call backs within 7, 14, and 30 days
  - Call back reasons (same issue, related issue, new issue)
  - Call back rate by technician and service type
  - Cost impact of call backs (labor + materials)

#### 2. Revenue & Financial Metrics
- **Total Revenue**: Sum of completed work order values (daily/weekly/monthly/yearly)
- **Revenue by Service Type**: Breakdown of revenue by work order categories
- **Average Work Order Value**: Mean revenue per work order (excluding zero dollar WOs)
- **Billable vs Non-Billable Work Orders**: Count and percentage split
- **Zero Dollar Work Order Impact**: 
  - Total count and percentage of all work orders
  - Labor hours spent on zero dollar work
  - Opportunity cost analysis
  - Reason code breakdown (warranty, goodwill, callback, diagnostic, training)
- **Outstanding Invoices**: Total value of unpaid invoices
- **Accounts Receivable Aging**: Distribution of unpaid invoices by age
- **Profitability by Job**: Margin analysis per work order
- **Revenue Recovery from Call Backs**: Additional revenue from callback work orders

#### 3. Inventory Metrics
- **Total Inventory Value**: Current valuation of all on-hand stock
- **Stock Turnover Ratio**: Inventory movement efficiency
- **Low Stock Items**: Count of SKUs below reorder point
- **Out of Stock Items**: Count of SKUs with zero on-hand quantity
- **Inventory Accuracy**: Percentage match between physical and system counts
- **Average Days to Restock**: Mean time from order to receipt

#### 4. Customer Metrics (CRM)
- **Total Active Customers**: Count of accounts with activity in last 90 days
- **New Customers**: Count of newly created accounts (daily/weekly/monthly)
- **Customer Retention Rate**: Percentage of repeat customers
- **Lead Conversion Rate**: Percentage of leads converted to accounts
- **Customer Lifetime Value**: Average revenue per customer over time
- **Active Leads in Pipeline**: Count of leads by stage

#### 5. Technician & Dispatch Metrics
- **Technician Utilization Rate**: Percentage of scheduled vs available time
- **Average Jobs per Technician**: Work orders completed per technician per period
- **On-Time Arrival Rate**: Percentage of appointments met on time
- **Travel Time vs Service Time**: Ratio of travel to productive work
- **Technician Revenue**: Total revenue generated per technician (billable work)
- **Technician Call Back Rate**: Call backs per technician with trend analysis
- **Zero Dollar Work by Technician**: Hours and count of non-billable work per technician
- **Overtime Hours**: Total overtime logged by all technicians

#### 6. Purchasing Metrics
- **Open Purchase Orders**: Count and value of pending POs
- **Purchase Order Cycle Time**: Average time from creation to fulfillment
- **Vendor Performance**: On-time delivery rates by vendor
- **Total Purchasing Spend**: Sum of all purchase order values (monthly/yearly)
- **Cost Variance**: Actual vs budgeted purchasing costs

### System Performance KPIs

#### 1. Application Health
- **System Uptime**: Percentage of time system is operational
- **API Response Time**: Average latency for API endpoints
- **Error Rate**: Count and percentage of failed requests
- **Active Users**: Current logged-in user count
- **Database Query Performance**: Average query execution time
- **Background Job Queue**: Pending and failed job counts

#### 2. User Engagement
- **Daily Active Users (DAU)**: Unique users per day
- **Weekly Active Users (WAU)**: Unique users per week
- **Monthly Active Users (MAU)**: Unique users per month
- **Average Session Duration**: Mean time users spend in the system
- **Most Used Features**: Page views by module
- **Mobile vs Desktop Usage**: Device type distribution

---

## Dashboard Sections

### 1. Executive Dashboard (Main View)

**Purpose**: High-level overview for business owners and executives

**Components**:
- **KPI Summary Cards** (Top Row)
  - Today's Revenue
  - Active Work Orders
  - Technicians on Duty
  - Customer Satisfaction Score
  
- **Revenue Trend Chart** (Primary Chart)
  - Line graph showing daily/weekly/monthly revenue trends
  - Comparison with previous period
  - Filterable by date range
  
- **Work Order Status Distribution** (Pie Chart)
  - Breakdown by status: Open, In Progress, Completed, On Hold, Cancelled
  - Click to drill down into specific status
  
- **Billable vs Non-Billable Work** (Secondary KPI Card)
  - Percentage of billable work orders
  - Count of zero dollar work orders
  - Trend indicator
  
- **Call Back Alert Card** (Quality Metric)
  - Current call back rate percentage
  - Count of active call backs this week/month
  - Color-coded alert (Green <5%, Yellow 5-10%, Red >10%)
  - Comparison to previous period
  
- **Top Performing Technicians** (Table/Card)
  - List of technicians by revenue generated
  - Completion rate and customer ratings
  
- **Recent Activity Feed** (Right Sidebar)
  - Real-time updates on work orders, inventory alerts, new leads
  - Clickable links to detailed views
  
- **Upcoming Appointments** (Calendar Widget)
  - Next 7 days of scheduled work orders
  - Color-coded by priority/status

### 2. Analytics & Reports Dashboard

**Purpose**: Detailed business intelligence and custom reporting

**Components**:

#### Business Analytics
- **Revenue Analytics**
  - Revenue by time period (day, week, month, quarter, year)
  - Revenue by service type/category
  - Revenue by customer segment
  - Year-over-year comparison
  - Revenue forecasting based on historical data
  
- **Work Order Analytics**
  - Completion rate trends
  - Average time to complete by service type
  - Cancellation rate analysis
  - Rework rate (repeat visits)
  - Geographic distribution heat map
  - **Zero Dollar Work Order Analysis**:
    - Trend over time (daily/weekly/monthly)
    - Breakdown by reason code
    - Percentage of total work orders
    - Impact on revenue and productivity
    - Top customers with zero dollar work
  - **Call Back Analysis**:
    - Call back rate trends
    - Call back reasons categorization
    - Time between original and call back work order
    - Call back rate by service type
    - Call back rate by technician
    - Financial impact (cost of rework)
  
- **Customer Analytics**
  - Customer acquisition trends
  - Customer lifetime value distribution
  - Churn rate analysis
  - Customer segmentation (high-value, at-risk, new)
  - Repeat business rate
  
- **Technician Performance**
  - Productivity metrics by technician
  - Revenue generated per technician
  - Customer satisfaction by technician
  - Overtime analysis
  - Skills utilization
  - **Call back rate by technician** with peer comparison
  - **Zero dollar work distribution** per technician
  - **First-time fix rate** by technician (inverse of call backs)

#### Financial Reports
- **Profit & Loss Statement**
  - Revenue summary (billable work only)
  - Non-billable work cost (zero dollar work orders)
  - Cost of goods sold (COGS from inventory)
  - Operating expenses
  - Call back costs (labor + materials for rework)
  - Net profit/loss
  - Filterable by date range
  
- **Accounts Receivable Report**
  - Outstanding invoices by age (30, 60, 90+ days)
  - Customer payment history
  - Collection trends
  
- **Inventory Valuation Report**
  - Current stock value by warehouse
  - Stock movement summary
  - Inventory write-offs/adjustments
  - FIFO/LIFO calculations
  
- **Purchase Order Summary**
  - Total spend by vendor
  - Purchase trends over time
  - Open vs closed PO analysis

#### Custom Report Builder
- **Drag-and-Drop Report Designer**
  - Select data sources (work orders, inventory, CRM, etc.)
  - Choose metrics and dimensions
  - Apply filters and date ranges
  - Select visualization type (table, chart, graph)
  - Save and schedule reports
  - Export to PDF, Excel, CSV

### 3. Work Order Management Dashboard

**Purpose**: Comprehensive work order tracking and management

**Components**:
- **Work Order Status Board** (Kanban View)
  - Columns: New, Assigned, In Progress, On Hold, Completed, Cancelled
  - Drag-and-drop to change status
  - Color-coded by priority and type
  - Card shows: WO number, customer, technician, scheduled date
  - Visual indicators: 💰 (billable), $0 (zero dollar), 🔄 (call back)
  - Filter by: All, Billable Only, Zero Dollar, Call Backs
  
- **Work Order Calendar View**
  - Full calendar with scheduled appointments
  - Filter by technician, status, service type
  - Click to view/edit work order
  
- **Work Order Metrics Panel**
  - Total WOs by status (with percentages)
  - Average completion time
  - Overdue work orders (red alert)
  - First-time fix rate
  - **Zero Dollar Work Orders**:
    - Count and percentage (This Week/Month)
    - Trend indicator vs previous period
    - Breakdown by reason code (Warranty, Goodwill, Call Back, Diagnostic, Other)
    - Quick filter to view zero dollar WOs only
  - **Call Back Metrics**:
    - Active call backs count
    - Call back rate percentage
    - Average time to call back
    - Call back reason distribution
  
- **Service Type Distribution**
  - Bar chart showing work orders by category (Installation, Repair, Maintenance, Call Back, etc.)
  - Stacked bars showing billable vs zero dollar within each category
  - Click to filter dashboard by service type
  
- **Technician Workload View**
  - List of technicians with assigned work order count
  - Visual indicator of capacity (e.g., progress bar showing % booked)
  - Click to view technician's schedule
  
- **Recent Work Order Activity**
  - Table of latest work order updates
  - Filters: All, Created, Updated, Completed, Zero Dollar, Call Backs
  - Quick actions: View, Edit, Reassign
  - Highlighted rows for call backs and zero dollar work orders
  
- **Zero Dollar Work Order Details Table**
  - Dedicated view for all zero dollar work orders
  - Columns: WO#, Customer, Technician, Date, Reason Code, Original WO (if call back), Labor Hours
  - Sortable and filterable
  - Export capability
  - Link to related work orders
  
- **Call Back Tracking Panel**
  - List of all call backs with original work order reference
  - Call back reason dropdown/tags
  - Days since original work order
  - Technician comparison (original vs call back)
  - Cost tracking (labor + materials)
  - Resolution status

### 4. Inventory Management Dashboard

**Purpose**: Real-time inventory visibility and control

**Components**:
- **Inventory Overview Cards**
  - Total Inventory Value ($)
  - Total SKU Count
  - Low Stock Items (count with alert)
  - Out of Stock Items (count with critical alert)
  
- **Stock Level Chart**
  - Bar chart showing on-hand quantity by category
  - Color-coded: Green (healthy), Yellow (low), Red (out of stock)
  
- **Top Moving Items** (Table)
  - SKUs with highest movement in last 30 days
  - Shows: SKU, description, quantity moved, current on-hand
  
- **Low Stock Alerts** (Alert Panel)
  - List of SKUs below reorder point
  - Suggested reorder quantities
  - Quick action: Create Purchase Order
  
- **Warehouse Breakdown**
  - Inventory distribution across warehouses
  - Pie chart or bar chart by location
  - Click to drill down into warehouse details
  
- **Recent Stock Movements** (Activity Log)
  - Latest stock ledger entries
  - Shows: Date, SKU, quantity, movement type (IN/OUT), warehouse
  - Filterable by warehouse, SKU, movement type
  
- **Inventory Turnover Analysis**
  - Chart showing turnover ratio by category
  - Identifies slow-moving and fast-moving inventory
  
- **Demand Forecast Integration**
  - Projected stock needs based on forecast
  - Comparison: Current stock vs forecasted demand
  - Reorder recommendations

### 5. CRM Analytics Dashboard

**Purpose**: Customer relationship insights and sales pipeline management

**Components**:
- **CRM Overview Cards**
  - Total Active Accounts
  - Total Contacts
  - Active Leads
  - Lead Conversion Rate (%)
  
- **Lead Pipeline Funnel**
  - Visualization of leads by stage (New, Qualified, Proposal, Negotiation, Won, Lost)
  - Count and value at each stage
  - Conversion rate between stages
  
- **Customer Acquisition Trend**
  - Line graph showing new accounts over time
  - Month-over-month growth rate
  
- **Top Customers by Revenue** (Table)
  - List of highest-value customers
  - Total lifetime revenue
  - Last activity date
  - Quick action: View account details
  
- **Customer Retention Analysis**
  - Retention rate by cohort
  - Churn rate trends
  - At-risk customers (no activity in X days)
  
- **Lead Source Analysis**
  - Pie chart showing lead origin (Referral, Website, Social, Phone, etc.)
  - Conversion rate by source
  
- **Recent CRM Activity**
  - Latest notes, leads created, accounts updated
  - Activity timeline

### 6. Dispatch Management Dashboard

**Purpose**: Optimize technician scheduling and routing

**Components**:
- **Dispatch Calendar Overview**
  - Weekly/daily view of technician schedules
  - Color-coded by technician
  - Shows: Time slots, work order assignments, travel time
  
- **Technician Utilization Chart**
  - Bar chart showing % of scheduled time per technician
  - Highlights over/under-utilized technicians
  
- **Route Map Visualization**
  - Interactive map showing technician locations and routes
  - Optimized route suggestions
  - Real-time traffic integration (future enhancement)
  
- **Dispatch Metrics Panel**
  - On-time arrival rate
  - Average travel time
  - Jobs per technician per day
  - Schedule adherence rate
  
- **Available Slots Finder**
  - Tool to find next available appointment slots
  - Filter by technician, service type, location
  - Quick scheduling capability
  
- **Overtime Alert Panel**
  - List of technicians approaching or in overtime
  - Total overtime hours this week/month

### 7. System Administration Dashboard

**Purpose**: User management, security, and system configuration

**Components**:

#### User Management
- **User List Table**
  - All system users with: Name, Email, Role, Status, Last Login
  - Search and filter capabilities
  - Actions: Edit, Deactivate, Reset Password, View Activity
  
- **User Activity Overview**
  - Active users right now
  - Login history
  - Failed login attempts (security monitoring)
  
- **Create User Form** (Modal)
  - User details: Name, email, password
  - Assign role and permissions
  - Set tenant association (multi-tenant)
  - Account activation toggle

#### Role & Permissions Management
- **Role List**
  - Predefined roles: Admin, Manager, Technician, Dispatcher, Viewer
  - Custom role creation
  - Permission matrix by role
  
- **Permission Editor**
  - Granular permissions by module (Work Orders, Inventory, CRM, etc.)
  - CRUD permissions (Create, Read, Update, Delete)
  - Special permissions (Approve, Export, Admin)

#### System Settings
- **General Settings**
  - Company information
  - Time zone and locale
  - Currency settings
  - Date/time format preferences
  
- **Email Configuration**
  - SMTP settings
  - Email templates
  - Notification preferences
  
- **Integration Settings**
  - API key management
  - Third-party integrations (OpenAI, payment gateways, etc.)
  - Webhook configurations
  
- **Security Settings**
  - Password policy
  - Session timeout
  - Two-factor authentication toggle
  - CORS whitelist

#### Audit Logs
- **Activity Log Table**
  - Timestamp, User, Action, Resource, IP Address
  - Filter by: User, action type, date range, module
  - Export audit trail
  
- **Change History**
  - Track all data modifications
  - Before/after values
  - Compliance and debugging

### 8. System Monitoring Dashboard

**Purpose**: Real-time application health and performance monitoring

**Components**:

#### Application Health Overview
- **Health Status Cards**
  - API Status (Green/Red indicator)
  - Database Status (connection pool stats)
  - Queue Status (pending/failed jobs)
  - Cache Status (hit rate, memory usage)
  
- **Uptime Monitor**
  - Current uptime percentage
  - Uptime history chart (last 30 days)
  - Downtime incidents log

#### Performance Metrics
- **API Response Time Chart**
  - Line graph of average response time over time
  - Breakdown by endpoint
  - 95th/99th percentile latency
  
- **Database Performance**
  - Query execution time trends
  - Slow query log
  - Connection pool utilization
  - Database size and growth
  
- **Error Rate Monitor**
  - Count of errors over time
  - Error breakdown by type (4xx, 5xx)
  - Recent error log with stack traces

#### System Resources
- **Server Metrics**
  - CPU usage (current and trend)
  - Memory usage (current and trend)
  - Disk usage
  - Network I/O
  
- **Background Jobs**
  - Queue length over time
  - Job processing rate
  - Failed jobs with retry status
  - Job type breakdown

#### Logs Viewer
- **Application Logs**
  - Real-time log stream
  - Filter by: Level (Info, Warn, Error), timestamp, module
  - Search functionality
  - Export logs
  
- **Access Logs**
  - HTTP request logs
  - Filter by: Status code, endpoint, user
  - Performance insights

### 9. Financial Dashboard

**Purpose**: Financial insights and budget management

**Components**:
- **Revenue Summary Cards**
  - Today's Revenue (Billable Work)
  - This Week's Revenue
  - This Month's Revenue
  - Year-to-Date Revenue
  - Non-Billable Work Cost (Zero Dollar WOs)
  
- **Revenue Trend Chart**
  - Multi-line graph: Daily, weekly, monthly comparisons
  - Year-over-year overlay
  - Revenue targets and actuals
  
- **Revenue by Service Type**
  - Pie chart or stacked bar chart
  - Shows contribution of each service category
  - Separate visualization for billable vs zero dollar work volume
  
- **Zero Dollar Work Order Cost Analysis**
  - Total labor hours on zero dollar work
  - Calculated cost (hours × labor rate)
  - Percentage of total operating costs
  - Trend over time (monthly)
  - Breakdown by reason code:
    - Warranty work
    - Goodwill/customer satisfaction
    - Call backs (rework)
    - Diagnostics (free estimates)
    - Training/demo
    - Other
  - Cost recovery opportunities
  
- **Call Back Financial Impact**
  - Total cost of call backs (labor + materials)
  - Revenue impact (lost opportunity cost)
  - Call back cost trend over time
  - Cost per call back (average)
  - Comparison to revenue (call back cost as % of total revenue)
  
- **Accounts Receivable Summary**
  - Total outstanding amount
  - Aging buckets (Current, 30, 60, 90+ days)
  - Overdue percentage
  
- **Purchasing & Expenses**
  - Total purchasing spend
  - Budget vs actual comparison
  - Top vendors by spend
  - Expense trends
  
- **Profitability Analysis**
  - Gross margin by service type
  - Net profit trend
  - Cost breakdown (labor, materials, overhead)
  
- **Cash Flow Overview** (Future Enhancement)
  - Cash inflow vs outflow
  - Projected cash position
  - Working capital analysis

---

## Contractor Tools Module

### Overview

The Contractor Tools module provides field technicians and contractors with instant access to essential HVAC calculation tools. These tools eliminate the need for separate apps, physical slide rules, or manual chart lookups, enabling faster and more accurate on-site work.

**Key Benefits**:
- Instant calculations without internet (offline-capable)
- Save calculation history for job records
- Attach calculations to work orders
- Mobile-optimized for field use
- No ads or subscriptions (unlike third-party apps)

---

### Tool Categories

#### 1. Electrical Calculations

##### Ohm's Law Calculator
**Purpose**: Calculate voltage, current, resistance, or power

**Formulas**:
```typescript
// V = I × R (Voltage = Current × Resistance)
// P = V × I (Power = Voltage × Current)
// P = I² × R (Power = Current² × Resistance)
// P = V² / R (Power = Voltage² / Resistance)

interface OhmsLawInput {
  voltage?: number;     // Volts (V)
  current?: number;     // Amps (A)
  resistance?: number;  // Ohms (Ω)
  power?: number;       // Watts (W)
}

function calculateOhmsLaw(input: OhmsLawInput): OhmsLawResult {
  // Calculate missing values based on provided inputs
  // Must provide at least 2 values
  
  if (input.voltage && input.current) {
    return {
      voltage: input.voltage,
      current: input.current,
      resistance: input.voltage / input.current,
      power: input.voltage * input.current
    };
  }
  
  // ... other combinations
}
```

**UI Features**:
- Interactive input fields (enter any 2 values)
- Real-time calculation as you type
- Color-coded results
- Copy to clipboard
- Save to work order

---

##### Wire Size Calculator
**Purpose**: Determine proper electrical wire gauge for HVAC equipment

**Inputs**:
- Load (Amps or Watts)
- Voltage (120V, 208V, 240V, 480V)
- Wire run length (feet)
- Temperature rating (60°C, 75°C, 90°C)
- Conduit type (metal, PVC, none)
- Number of conductors

**Outputs**:
- Recommended wire gauge (14 AWG, 12 AWG, 10 AWG, etc.)
- Voltage drop (%)
- Max safe ampacity
- Conduit fill percentage

**Formula**:
```typescript
function calculateWireSize(
  load: number,       // Amps
  voltage: number,    // Volts
  distance: number,   // One-way distance in feet
  maxVoltageDrop: number = 3  // Percentage
): WireSizeResult {
  // Voltage drop formula: VD = (2 × K × I × L) / CM
  // K = resistance constant (12.9 for copper)
  // I = current in amps
  // L = one-way length in feet
  // CM = circular mils
  
  const allowedDrop = voltage * (maxVoltageDrop / 100);
  const minCircularMils = (2 * 12.9 * load * distance) / allowedDrop;
  
  // AWG circular mil table
  const wireGauges = [
    { awg: 14, circularMils: 4110, ampacity60C: 15, ampacity75C: 20 },
    { awg: 12, circularMils: 6530, ampacity60C: 20, ampacity75C: 25 },
    { awg: 10, circularMils: 10380, ampacity60C: 30, ampacity75C: 35 },
    { awg: 8, circularMils: 16510, ampacity60C: 40, ampacity75C: 50 },
    { awg: 6, circularMils: 26240, ampacity60C: 55, ampacity75C: 65 },
    // ... more gauges
  ];
  
  const recommendedWire = wireGauges.find(w => w.circularMils >= minCircularMils);
  
  return {
    wireGauge: recommendedWire.awg,
    actualVoltageDrop: calculateActualDrop(recommendedWire, load, distance),
    ampacity: recommendedWire.ampacity75C,
    notes: checkNECCompliance(recommendedWire, load)
  };
}
```

---

#### 2. Airflow & Ductwork

##### Ductulator (Duct Sizing Calculator)
**Purpose**: Calculate proper duct size for airflow and pressure requirements

**Inputs**:
- Airflow (CFM)
- Friction rate (inches of water per 100 ft)
- Duct shape (round, rectangular)
- For rectangular: aspect ratio preference

**Outputs**:
- Duct diameter (round) or dimensions (rectangular)
- Velocity (FPM - feet per minute)
- Pressure drop per 100 ft
- Equivalent diameter (for rectangular)

**Formulas**:
```typescript
interface DuctulatorInput {
  cfm: number;              // Cubic feet per minute
  frictionRate: number;     // Inches of water per 100 ft
  ductShape: 'round' | 'rectangular';
  aspectRatio?: number;     // For rectangular (width/height)
}

function calculateDuctSize(input: DuctulatorInput): DuctSizeResult {
  if (input.ductShape === 'round') {
    // Round duct formula: D = 1.3 × (CFM × P)^0.2
    // D = diameter in inches
    // CFM = airflow
    // P = friction rate
    
    const diameter = 1.3 * Math.pow(input.cfm * input.frictionRate, 0.2);
    const area = Math.PI * Math.pow(diameter / 24, 2); // sq ft
    const velocity = input.cfm / area;
    
    return {
      diameter: Math.ceil(diameter),
      velocity,
      pressureDrop: input.frictionRate,
      standardSize: getNearestStandardSize(diameter)  // 6", 8", 10", etc.
    };
  } else {
    // Rectangular duct calculation
    // Use equivalent diameter: De = 1.30 × [(a × b)^0.625] / [(a + b)^0.25]
    
    const targetArea = input.cfm / 600; // Target velocity ~600 FPM for mains
    const aspectRatio = input.aspectRatio || 2;
    
    const height = Math.sqrt(targetArea / aspectRatio);
    const width = aspectRatio * height;
    
    return {
      width: roundToStandard(width * 12),    // Convert to inches
      height: roundToStandard(height * 12),
      equivalentDiameter: calculateEquivalentDiameter(width * 12, height * 12),
      velocity: input.cfm / targetArea
    };
  }
}
```

---

##### CFM Calculator
**Purpose**: Calculate airflow requirements and measurements

**Calculation Types**:

1. **CFM from Tonnage**
   ```typescript
   // Rule of thumb: 400 CFM per ton of cooling
   function cfmFromTons(tons: number): number {
     return tons * 400;
   }
   ```

2. **CFM from Temperature Rise/Drop**
   ```typescript
   // CFM = (BTU/hr) / (1.08 × ΔT)
   // 1.08 = constant for air (0.24 BTU/lb/°F × 4.5 lb/CFM)
   function cfmFromDeltaT(btuPerHour: number, deltaT: number): number {
     return btuPerHour / (1.08 * deltaT);
   }
   ```

3. **CFM from Velocity & Area**
   ```typescript
   // CFM = Velocity (FPM) × Area (sq ft)
   function cfmFromVelocity(velocity: number, area: number): number {
     return velocity * area;
   }
   ```

4. **CFM from Anemometer Reading**
   ```typescript
   interface AnemometerReading {
     velocity: number;  // FPM
     grillArea: number; // Square inches
     multiplier: number; // Grill correction factor (0.75-0.90)
   }
   
   function cfmFromAnemometer(reading: AnemometerReading): number {
     const areaInFeet = reading.grillArea / 144;
     return reading.velocity * areaInFeet * reading.multiplier;
   }
   ```

**UI Features**:
- Tabbed interface for different calculation types
- Preset values for common scenarios
- Visual diagram showing what's being calculated

---

##### Static Pressure Calculator
**Purpose**: Calculate total external static pressure (TESP)

**Inputs**:
- Supply plenum pressure (inches H₂O)
- Return plenum pressure (inches H₂O)
- Optional: Individual component pressures (filter, coil, etc.)

**Formula**:
```typescript
interface StaticPressureInput {
  supplyPressure: number;   // Positive pressure
  returnPressure: number;   // Negative pressure (enter as negative)
  filterDrop?: number;
  coilDrop?: number;
  ductworkDrop?: number;
}

function calculateTESP(input: StaticPressureInput): number {
  // TESP = Supply Static - Return Static
  const baseTE SP = input.supplyPressure - input.returnPressure;
  
  // Add component drops if provided
  const componentTotal = (input.filterDrop || 0) + 
                        (input.coilDrop || 0) + 
                        (input.ductworkDrop || 0);
  
  return {
    tesp: baseTESP,
    totalWithComponents: baseTESP + componentTotal,
    recommendation: getTESPRecommendation(baseTESP)
  };
}

function getTESPRecommendation(tesp: number): string {
  if (tesp < 0.3) return 'Low - Check for oversized ductwork';
  if (tesp < 0.8) return 'Optimal range';
  if (tesp < 1.2) return 'Acceptable but high end';
  return 'Too high - Restrict airflow, check for blockages';
}
```

---

#### 3. Refrigerant & Charging

##### Refrigerant Charging Calculator
**Purpose**: Calculate proper subcooling and superheat

**Inputs**:
- Refrigerant type (R-22, R-410A, R-32, R-134a, etc.)
- Outdoor temperature
- Indoor wet bulb temperature (for TXV systems)
- Liquid line temperature
- Suction line temperature
- Liquid line pressure (PSI)
- Suction line pressure (PSI)

**Formulas**:
```typescript
interface ChargingInput {
  refrigerantType: string;
  outdoorTemp: number;
  indoorWetBulb?: number;
  liquidLineTemp: number;
  suctionLineTemp: number;
  liquidLinePressure: number;
  suctionLinePressure: number;
  meteringDevice: 'TXV' | 'piston' | 'capillary';
}

function calculateCharge(input: ChargingInput): ChargingResult {
  // Get saturation temps from PT chart
  const liquidSatTemp = getSaturationTemp(input.refrigerantType, input.liquidLinePressure);
  const suctionSatTemp = getSaturationTemp(input.refrigerantType, input.suctionLinePressure);
  
  // Subcooling = Liquid Sat Temp - Liquid Line Temp
  const subcooling = liquidSatTemp - input.liquidLineTemp;
  
  // Superheat = Suction Line Temp - Suction Sat Temp
  const superheat = input.suctionLineTemp - suctionSatTemp;
  
  // Target ranges based on metering device
  const targets = getTargetRanges(input.meteringDevice, input.outdoorTemp, input.indoorWetBulb);
  
  return {
    subcooling,
    superheat,
    targetSubcooling: targets.subcooling,
    targetSuperheat: targets.superheat,
    diagnosis: diagnoseCharge(subcooling, superheat, targets),
    recommendation: getChargingRecommendation(subcooling, superheat, targets)
  };
}

function diagnoseCharge(actual: any, target: any): string {
  const subcoolDiff = actual.subcooling - target.subcooling.ideal;
  const superheatDiff = actual.superheat - target.superheat.ideal;
  
  if (subcoolDiff < -5 && superheatDiff > 5) {
    return 'System is undercharged';
  } else if (subcoolDiff > 5 && superheatDiff < -5) {
    return 'System is overcharged';
  } else if (superheatDiff > 10) {
    return 'Check for restriction or low airflow';
  }
  
  return 'Charge appears normal';
}
```

---

##### Refrigerant PT Chart (Pressure-Temperature)
**Purpose**: Quick lookup of saturation temperature for given pressure

**Features**:
- Support for all common refrigerants
- Interpolation for values between chart points
- Pressure ↔ Temperature conversion
- Visual chart display
- Offline data storage

**Data Structure**:
```typescript
const REFRIGERANT_PT_DATA = {
  'R-410A': [
    { tempF: -50, pressurePSI: 13.7 },
    { tempF: -40, pressurePSI: 21.9 },
    { tempF: -30, pressurePSI: 32.7 },
    { tempF: -20, pressurePSI: 46.6 },
    { tempF: 0, pressurePSI: 83.2 },
    { tempF: 20, pressurePSI: 134.6 },
    { tempF: 40, pressurePSI: 206.5 },
    { tempF: 60, pressurePSI: 304.2 },
    { tempF: 80, pressurePSI: 434.0 },
    { tempF: 100, pressurePSI: 602.2 },
    { tempF: 120, pressurePSI: 816.5 },
    // ... complete table
  ],
  'R-22': [
    // ... complete table
  ],
  'R-32': [
    // ... complete table
  ]
};

function getPressureFromTemp(refrigerant: string, tempF: number): number {
  const data = REFRIGERANT_PT_DATA[refrigerant];
  // Linear interpolation between data points
  return interpolate(data, 'tempF', 'pressurePSI', tempF);
}
```

---

##### Refrigerant Charge Weight Calculator
**Purpose**: Calculate total refrigerant charge needed

**Inputs**:
- System tonnage
- Line set length
- Line set diameter (liquid and suction)
- Factory charge included (lbs)
- Refrigerant type

**Formula**:
```typescript
interface ChargeWeightInput {
  tonnage: number;
  lineSetLength: number;    // feet
  liquidLineDiameter: number;  // inches (3/8", 1/2", etc.)
  suctionLineDiameter: number; // inches (3/4", 7/8", etc.)
  factoryCharge: number;    // lbs
  refrigerantType: string;
}

function calculateChargeWeight(input: ChargeWeightInput): ChargeWeightResult {
  // Refrigerant volume per foot of line (oz/ft)
  const liquidLineVolume = getLineVolume(input.liquidLineDiameter, input.refrigerantType);
  const suctionLineVolume = getLineVolume(input.suctionLineDiameter, input.refrigerantType);
  
  // Total additional charge needed
  const liquidLineCharge = (liquidLineVolume * input.lineSetLength) / 16; // Convert oz to lbs
  const suctionLineCharge = (suctionLineVolume * input.lineSetLength) / 16;
  
  const totalFieldCharge = liquidLineCharge + suctionLineCharge;
  const totalSystemCharge = input.factoryCharge + totalFieldCharge;
  
  return {
    factoryCharge: input.factoryCharge,
    fieldCharge: totalFieldCharge,
    totalCharge: totalSystemCharge,
    liquidLineCharge,
    suctionLineCharge,
    recommendation: `Add ${totalFieldCharge.toFixed(2)} lbs to factory charge`
  };
}
```

---

#### 4. Load Calculations

##### Quick Manual J Calculator
**Purpose**: Simplified heating/cooling load calculation

**Inputs**:
- Building dimensions (length, width, ceiling height)
- Number of windows and sizes
- Insulation levels (walls, ceiling, floor)
- Geographic location (for design temps)
- Number of occupants
- Orientation (N, S, E, W)

**Simplified Formula**:
```typescript
interface ManualJInput {
  squareFootage: number;
  ceilingHeight: number;
  windowArea: number;      // Total sq ft of windows
  insulation: {
    walls: 'poor' | 'average' | 'good' | 'excellent';
    ceiling: 'poor' | 'average' | 'good' | 'excellent';
    floor: 'slab' | 'crawlspace' | 'basement';
  };
  location: string;  // Zip code or city
  orientation: 'N' | 'S' | 'E' | 'W';
  occupants: number;
}

function calculateQuickManualJ(input: ManualJInput): ManualJResult {
  // Get design temperatures for location
  const designTemps = getDesignTemperatures(input.location);
  
  // Base load from square footage
  // Rule of thumb: 20-30 BTU/sq ft depending on climate
  const baseLoadPerSqFt = getBaseLoad(input.location);
  let totalCoolingLoad = input.squareFootage * baseLoadPerSqFt;
  
  // Window heat gain (cooling)
  const windowMultiplier = getWindowMultiplier(input.orientation);
  const windowLoad = input.windowArea * windowMultiplier * 40; // BTU/hr per sq ft
  totalCoolingLoad += windowLoad;
  
  // Insulation adjustments
  const insulationFactor = getInsulationFactor(input.insulation);
  totalCoolingLoad *= insulationFactor;
  
  // Occupant load (250 BTU/hr per person)
  totalCoolingLoad += input.occupants * 250;
  
  // Ceiling height adjustment
  if (input.ceilingHeight > 8) {
    const heightFactor = input.ceilingHeight / 8;
    totalCoolingLoad *= heightFactor;
  }
  
  // Convert to tons (1 ton = 12,000 BTU/hr)
  const tons = totalCoolingLoad / 12000;
  
  // Heating load (simplified)
  const heatingLoad = calculateHeatingLoad(input, designTemps);
  
  return {
    coolingLoadBTU: Math.round(totalCoolingLoad),
    coolingTons: Math.round(tons * 2) / 2,  // Round to nearest 0.5 ton
    heatingLoadBTU: Math.round(heatingLoad),
    recommendedUnit: getUnitRecommendation(tons),
    notes: [
      'This is a simplified calculation',
      'Full Manual J recommended for new construction',
      `Based on ${designTemps.coolingDesignTemp}°F outdoor design temp`
    ]
  };
}
```

**UI Features**:
- Interactive floor plan input
- Room-by-room breakdown option
- Climate zone auto-detection from zip code
- Export PDF report
- Save to work order

---

##### BTU Calculator & Converter
**Purpose**: Convert between heating/cooling units

**Conversions**:
```typescript
// BTU ↔ Tons
function btuToTons(btu: number): number {
  return btu / 12000;
}

function tonsToBTU(tons: number): number {
  return tons * 12000;
}

// BTU ↔ Watts
function btuToWatts(btu: number): number {
  return btu * 0.293071;
}

function wattsToBTU(watts: number): number {
  return watts / 0.293071;
}

// BTU ↔ Kilowatts
function btuToKW(btu: number): number {
  return btu * 0.000293071;
}

// CFM ↔ BTU (with temperature difference)
function cfmToBTU(cfm: number, deltaT: number): number {
  return cfm * deltaT * 1.08;
}
```

---

#### 5. Efficiency & Performance

##### Delta T Calculator
**Purpose**: Calculate temperature difference across system components

**Calculation Types**:

1. **System Delta T** (Supply - Return)
   - Cooling: Target 18-22°F
   - Heating: Target 35-45°F

2. **Coil Delta T** (Entering - Leaving)

3. **Condenser Split** (Outdoor - Condensing Temp)

```typescript
interface DeltaTInput {
  supplyTemp: number;
  returnTemp: number;
  mode: 'cooling' | 'heating';
}

function calculateDeltaT(input: DeltaTInput): DeltaTResult {
  const deltaT = input.returnTemp - input.supplyTemp;
  
  const targets = input.mode === 'cooling' 
    ? { min: 18, ideal: 20, max: 22 }
    : { min: 35, ideal: 40, max: 45 };
  
  let diagnosis = '';
  if (deltaT < targets.min) {
    diagnosis = input.mode === 'cooling' 
      ? 'Low Delta T - Check for airflow issues, dirty filter, or oversized unit'
      : 'Low Delta T - Check gas pressure, heat exchanger, or burner';
  } else if (deltaT > targets.max) {
    diagnosis = input.mode === 'cooling'
      ? 'High Delta T - Check for low airflow, dirty coil, or low refrigerant'
      : 'High Delta T - Check for restricted airflow or oversized furnace';
  } else {
    diagnosis = 'Delta T is within normal range';
  }
  
  return {
    deltaT,
    target: targets,
    status: getDeltaTStatus(deltaT, targets),
    diagnosis
  };
}
```

---

##### SEER/EER/COP Calculator
**Purpose**: Calculate efficiency ratings

**Formulas**:
```typescript
// SEER (Seasonal Energy Efficiency Ratio)
// SEER = Total Cooling Output (BTU) / Total Energy Input (Watt-hours)
function calculateSEER(coolingBTU: number, energyWh: number): number {
  return coolingBTU / energyWh;
}

// EER (Energy Efficiency Ratio)
// EER = Cooling Capacity (BTU/hr) / Power Input (Watts)
function calculateEER(capacityBTU: number, powerWatts: number): number {
  return capacityBTU / powerWatts;
}

// COP (Coefficient of Performance)
// COP = Heat Output / Energy Input (same units)
function calculateCOP(heatOutput: number, energyInput: number): number {
  return heatOutput / energyInput;
}

// Convert SEER to EER (approximate)
function seerToEER(seer: number): number {
  return seer / 1.1;  // Approximation factor
}

// Annual energy cost
function calculateAnnualCost(
  tons: number,
  seer: number,
  annualHours: number,
  costPerKWh: number
): number {
  const btuPerYear = tons * 12000 * annualHours;
  const kwhPerYear = btuPerYear / seer / 1000;
  return kwhPerYear * costPerKWh;
}
```

---

#### 6. Plumbing & Gas

##### Gas Pipe Sizing Calculator
**Purpose**: Determine proper gas pipe size for appliances

**Inputs**:
- Total BTU load
- Pipe length
- Gas type (natural gas or propane)
- Pipe material (black iron, CSST)
- Number of elbows/fittings

**Formula**:
```typescript
interface GasPipeInput {
  totalBTU: number;
  pipeLength: number;  // feet
  gasType: 'natural' | 'propane';
  pipeMaterial: 'black_iron' | 'csst';
  elbows: number;
}

function calculateGasPipeSize(input: GasPipeInput): GasPipeSizeResult {
  // Add equivalent length for fittings
  const equivalentLength = input.pipeLength + (input.elbows * 5);
  
  // CFH (Cubic feet per hour) from BTU
  const cfh = input.gasType === 'natural' 
    ? input.totalBTU / 1000  // Natural gas ~1000 BTU/cf
    : input.totalBTU / 2500; // Propane ~2500 BTU/cf
  
  // Lookup table for pipe sizes (NFPA 54 / ANSI Z223.1)
  const pipeSizes = getPipeSizeTable(input.gasType, input.pipeMaterial);
  
  // Find smallest pipe that can handle the CFH at this length
  const recommendedPipe = pipeSizes.find(pipe => 
    pipe.capacityAtLength[equivalentLength] >= cfh
  );
  
  return {
    recommendedSize: recommendedPipe.size,  // "3/4 inch", "1 inch", etc.
    cfh,
    pressureDrop: calculatePressureDrop(cfh, equivalentLength, recommendedPipe.size),
    velocityFPS: calculateGasVelocity(cfh, recommendedPipe.size)
  };
}
```

---

##### Condensate Drain Sizing
**Purpose**: Calculate proper condensate drain size

**Formula**:
```typescript
interface CondensateInput {
  tons: number;
  humidityLevel: 'low' | 'medium' | 'high';
}

function calculateCondensateDrain(input: CondensateInput): CondensateDrainResult {
  // Condensate production: ~0.5-2 gallons per hour per ton
  const productionRate = input.humidityLevel === 'high' ? 2 :
                        input.humidityLevel === 'medium' ? 1.25 : 0.5;
  
  const gallonsPerHour = input.tons * productionRate;
  
  // Minimum 3/4" PVC for up to 5 tons
  // 1" PVC for 5-10 tons
  const recommendedSize = input.tons <= 5 ? '3/4"' : '1"';
  
  return {
    condensateGPH: gallonsPerHour,
    recommendedPipeSize: recommendedSize,
    trapRequired: true,
    trapDepth: '2-3 inches',
    slope: '1/4 inch per foot minimum'
  };
}
```

---

#### 7. Psychrometric Calculations

##### Psychrometric Calculator
**Purpose**: Calculate air properties and humidity

**Inputs**:
- Dry bulb temperature
- Wet bulb temperature (or relative humidity)
- Barometric pressure (altitude adjustment)

**Outputs**:
- Relative humidity (%)
- Dew point temperature
- Enthalpy (BTU/lb)
- Specific volume (cu ft/lb)
- Humidity ratio (grains/lb)

**Formulas**:
```typescript
interface PsychrometricInput {
  dryBulb: number;    // °F
  wetBulb?: number;   // °F
  relativeHumidity?: number;  // %
  pressure: number;   // inches Hg (default 29.92 at sea level)
}

function calculatePsychrometrics(input: PsychrometricInput): PsychrometricResult {
  // Convert to absolute units
  const dryBulbR = input.dryBulb + 459.67;  // °R (Rankine)
  
  // Calculate saturation pressure
  const pws = calculateSaturationPressure(input.dryBulb);
  
  // If wet bulb provided, calculate RH
  let rh: number;
  if (input.wetBulb) {
    const pwsWet = calculateSaturationPressure(input.wetBulb);
    const pw = pwsWet - ((input.pressure - pwsWet) * (input.dryBulb - input.wetBulb) / 1800);
    rh = (pw / pws) * 100;
  } else {
    rh = input.relativeHumidity;
  }
  
  // Partial pressure of water vapor
  const pw = pws * (rh / 100);
  
  // Humidity ratio (W) in lb water / lb dry air
  const W = 0.622 * (pw / (input.pressure - pw));
  
  // Dew point temperature
  const dewPoint = calculateDewPoint(pw);
  
  // Enthalpy (h) in BTU/lb dry air
  const h = 0.240 * input.dryBulb + W * (1061 + 0.444 * input.dryBulb);
  
  // Specific volume (v) in cu ft/lb dry air
  const v = (0.754 * dryBulbR) / input.pressure;
  
  return {
    relativeHumidity: rh,
    humidityRatio: W * 7000,  // Convert to grains/lb
    dewPoint,
    enthalpy: h,
    specificVolume: v,
    wetBulb: input.wetBulb || calculateWetBulb(input.dryBulb, rh)
  };
}
```

---

### Database Schema

```sql
CREATE TABLE contractor_tool_calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  work_order_id UUID REFERENCES work_orders(id),
  tool_name VARCHAR(50) NOT NULL,  -- 'ohms_law', 'ductulator', 'manual_j', etc.
  inputs JSONB NOT NULL,
  results JSONB NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_tool (user_id, tool_name, created_at),
  INDEX idx_work_order (work_order_id)
);

CREATE TABLE tool_presets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  tool_name VARCHAR(50) NOT NULL,
  preset_name VARCHAR(100) NOT NULL,
  preset_values JSONB NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, tool_name, preset_name)
);

CREATE TABLE refrigerant_pt_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  refrigerant_type VARCHAR(20) NOT NULL,  -- 'R-410A', 'R-22', etc.
  temperature_f INTEGER NOT NULL,
  pressure_psi DECIMAL(10, 2) NOT NULL,
  UNIQUE(refrigerant_type, temperature_f)
);
```

---

### API Endpoints

```typescript
// Perform calculation
POST /api/v1/contractor-tools/calculate
Body: {
  toolName: string,
  inputs: any,
  workOrderId?: string
}
Response: {
  results: any,
  calculationId: string
}

// Get calculation history
GET /api/v1/contractor-tools/history
Query: { toolName?, workOrderId?, limit, offset }

// Save preset
POST /api/v1/contractor-tools/presets
Body: {
  toolName: string,
  presetName: string,
  values: any
}

// Get PT chart data
GET /api/v1/contractor-tools/pt-chart/:refrigerantType
Query: { minTemp?, maxTemp? }

// Unit conversion
POST /api/v1/contractor-tools/convert
Body: {
  value: number,
  fromUnit: string,
  toUnit: string
}
```

---

### UI Design

#### Tool Launcher
```typescript
function ContractorToolsLauncher() {
  const tools = [
    {
      category: 'Electrical',
      tools: [
        { id: 'ohms-law', name: 'Ohm\'s Law', icon: '⚡' },
        { id: 'wire-size', name: 'Wire Sizing', icon: '🔌' }
      ]
    },
    {
      category: 'Airflow',
      tools: [
        { id: 'ductulator', name: 'Ductulator', icon: '🌬️' },
        { id: 'cfm', name: 'CFM Calculator', icon: '💨' },
        { id: 'static-pressure', name: 'Static Pressure', icon: '📊' }
      ]
    },
    {
      category: 'Refrigerant',
      tools: [
        { id: 'charging', name: 'Charging Calc', icon: '🧊' },
        { id: 'pt-chart', name: 'PT Chart', icon: '📈' },
        { id: 'charge-weight', name: 'Charge Weight', icon: '⚖️' }
      ]
    },
    {
      category: 'Load Calc',
      tools: [
        { id: 'manual-j', name: 'Quick Manual J', icon: '🏠' },
        { id: 'btu', name: 'BTU Calculator', icon: '🔥' }
      ]
    }
  ];
  
  return (
    <div className="contractor-tools">
      <h1>Contractor Tools</h1>
      {tools.map(category => (
        <ToolCategory key={category.category} {...category} />
      ))}
    </div>
  );
}
```

#### Tool Interface Template
```typescript
function ToolInterface({ toolId }: { toolId: string }) {
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  
  const calculate = async () => {
    const response = await api.post('/api/v1/contractor-tools/calculate', {
      toolName: toolId,
      inputs
    });
    setResults(response.results);
  };
  
  return (
    <div className="tool-interface">
      <ToolHeader toolId={toolId} />
      
      <div className="tool-inputs">
        <InputSection inputs={inputs} onChange={setInputs} />
        <button onClick={calculate}>Calculate</button>
      </div>
      
      {results && (
        <div className="tool-results">
          <ResultsDisplay results={results} />
          <ActionButtons
            onSaveToWorkOrder={() => saveToWorkOrder(results)}
            onCopy={() => copyToClipboard(results)}
            onPrint={() => printResults(results)}
          />
        </div>
      )}
      
      <CalculationHistory history={history} />
    </div>
  );
}
```

---

### Mobile Optimization

- **Offline First**: All calculations work without internet
- **Large Touch Targets**: Buttons minimum 44×44px
- **Quick Access**: Favorite tools pinned to home screen
- **Voice Input**: Speak values instead of typing
- **Camera OCR**: Scan equipment nameplate for data input
- **Saved Calculations**: Auto-sync when back online

---

### Benefits

1. **Time Savings**: Instant calculations vs manual charts
2. **Accuracy**: Eliminate calculation errors
3. **Professional**: Generate PDF reports for customers
4. **Integration**: Attach calcs directly to work orders
5. **Offline**: No internet required in basements/attics
6. **No Ads**: Unlike third-party calculator apps
7. **Compliance**: Ensure code-compliant installations

---

## User Roles & Permissions

### Role Hierarchy

#### 1. Super Admin
- **Full System Access**: Complete control over all features and data
- **Permissions**:
  - User management (create, edit, delete users)
  - Role and permission configuration (including Owner/CEO role)
  - System settings and configuration
  - Multi-tenant management
  - Access to all modules and dashboards
  - Audit log viewing
  - Database operations
  - API key management
  - Toggle "can be edited by admin" setting on any role
  
#### 2. Owner/CEO
- **Executive Leadership**: Complete business oversight with all operational permissions
- **Special Characteristics**:
  - **Protected Role**: Cannot be edited by Admins unless Super Admin enables it
  - **Comprehensive Access**: Has ALL permissions from ALL roles (except Super Admin permissions)
  - **Admin Edit Lock**: Controlled by "can be edited by admin" toggle (Super Admin only)
- **Permissions**:
  - All Admin permissions
  - All Field Manager permissions
  - All Lead Dispatch permissions
  - All Lead Tech permissions
  - All Purchasing Manager permissions
  - All Warehouse Manager permissions
  - All Accounting permissions
  - All Sales/CRM permissions
  - Combined access to every module and dashboard
  - View all audit logs (except system-level changes)
  - Access all reports and analytics
  - Approve all workflows and transactions
  - Cannot: System configuration, role management, database operations, API key management (Super Admin only)
  - Cannot be modified by: Admins (unless "can be edited by admin" is toggled on by Super Admin)
  
#### 3. Admin
- **Business Management**: Manage operations without system configuration
- **Permissions**:
  - View all dashboards
  - Manage work orders, inventory, CRM, purchasing
  - Create/edit users (cannot delete or change roles)
  - View reports and analytics
  - Export data
  - Cannot: Modify system settings, manage roles (except if "can be edited by admin" is enabled), access audit logs
  - Cannot: Edit Owner/CEO role permissions (unless Super Admin grants permission)
  
#### 4. Field Manager
- **Field Operations Leadership**: Oversee field technicians and work order execution
- **Permissions**:
  - View executive and operational dashboards
  - Manage work orders and technician assignments
  - Approve technician time and expenses
  - View and manage dispatch schedule
  - Monitor technician performance metrics
  - Access customer information
  - Generate field operations reports
  - Cannot: User management, system settings, purchasing, full financial access
  
#### 5. Lead Dispatch
- **Dispatch Leadership**: Senior dispatcher with additional oversight
- **Permissions**:
  - Full access to dispatch dashboard and analytics
  - Create, assign, and reassign work orders
  - Manage all technician schedules
  - Optimize routes and workload distribution
  - Approve schedule changes and overtime
  - Train and mentor dispatchers
  - View dispatch performance metrics
  - Cannot: User management, system settings, purchasing approval, full financial data
  
#### 6. Dispatcher
- **Scheduling Focus**: Manage technician schedules and work order assignments
- **Permissions**:
  - Full access to dispatch dashboard
  - Create and assign work orders
  - View technician schedules and availability
  - Update work order status
  - View basic inventory (parts availability)
  - Cannot: Financial data, system administration, user management
  
#### 7. Lead Tech
- **Senior Technician**: Lead technician with mentoring and quality oversight
- **Permissions**:
  - All technician permissions
  - View team performance metrics
  - Assist with complex work orders
  - Provide technical guidance to other technicians
  - Review and approve technician work (quality control)
  - Access to training materials and documentation
  - Limited access to dispatch for coordination
  - Cannot: Create work orders, access financial data, user management
  
#### 8. Technician
- **Field Operations**: Access to assigned work orders and mobile features
- **Permissions**:
  - View own assigned work orders
  - Update work order status and notes
  - Record time and materials used
  - Scanner access for inventory
  - View customer information (limited)
  - Cannot: Dashboard access, create work orders, view other technicians' data
  
#### 9. Purchasing Manager
- **Procurement Leadership**: Oversee purchasing operations and vendor relationships
- **Permissions**:
  - Full access to purchasing dashboard
  - Create, approve, and manage all purchase orders
  - Manage vendor relationships and contracts
  - Set purchasing budgets and approval limits
  - View and analyze purchasing analytics
  - Negotiate pricing and terms
  - Manage purchasing team and workflows
  - View inventory levels and demand forecasts
  - Cannot: User management (except purchasing team), system settings, work order management
  
#### 10. Purchasing
- **Procurement Specialist**: Create and manage purchase orders
- **Permissions**:
  - Access to purchasing dashboard
  - Create purchase orders (up to approval limit)
  - Track and receive orders
  - Communicate with vendors
  - View inventory levels and reorder points
  - Generate purchasing reports
  - Cannot: Approve high-value POs, manage vendors, user management, financial analytics
  
#### 11. Warehouse Manager
- **Warehouse Operations Leadership**: Oversee warehouse and inventory operations
- **Permissions**:
  - Full access to inventory dashboard and analytics
  - Manage SKUs, warehouses, bins, and locations
  - Oversee stock movements and cycle counts
  - Approve inventory adjustments
  - Manage warehouse personnel
  - Create and review purchase orders
  - Set reorder points and stock levels
  - View inventory valuation and turnover reports
  - Cannot: Work order management, CRM, user administration, system settings
  
#### 12. Warehouse Personnel
- **Warehouse Operations**: Handle day-to-day inventory tasks
- **Permissions**:
  - Access to inventory management features
  - Process stock movements (receiving, picking, transfers)
  - Update bin locations and quantities
  - Perform cycle counts
  - Use barcode scanner for inventory
  - View SKU information and stock levels
  - Generate pick lists and packing slips
  - Cannot: Create SKUs, approve adjustments, create POs, access analytics, user management
  
#### 13. Accounting
- **Financial Management**: Manage financial data and reporting
- **Permissions**:
  - Full access to financial dashboard and reports
  - View all revenue and expense data
  - Manage accounts receivable and payable
  - Process invoices and payments
  - Reconcile accounts
  - Generate financial reports (P&L, balance sheet, cash flow)
  - View all work order financial data
  - Access audit logs for financial transactions
  - Cannot: Create/edit work orders, manage inventory (view only), user management, system settings
  
#### 14. Sales/CRM User
- **Customer Relations**: Manage leads and customer accounts
- **Permissions**:
  - Full access to CRM dashboard
  - Manage accounts, contacts, leads, notes
  - Create work orders for customers
  - View revenue by customer
  - Generate CRM reports
  - Cannot: Inventory, purchasing, system administration
  
#### 15. Viewer/Analyst
- **Read-Only Access**: View dashboards and reports without modification
- **Permissions**:
  - View-only access to dashboards
  - Generate and export reports
  - View analytics
  - Cannot: Create, edit, or delete any data

---

### Role & Permission Customization

**Important**: The roles and permissions documented above represent the **default configuration** of the system. The permission system is fully customizable to meet the specific needs of each organization.

#### Customization Capabilities

**1. Default Roles**
- All 15 roles are pre-configured with the permissions listed above
- These defaults serve as a starting point and best-practice templates
- Organizations can use them as-is or customize to fit their workflows
- **Special Note**: Owner/CEO role has additional protection and cannot be edited by Admins unless Super Admin grants permission

**2. Role Customization**
- Users with appropriate access (Super Admin/Admin) can **add or remove permissions** from any role at any time
- Each role can be tailored to match specific job responsibilities
- Permissions can be modified without affecting users already assigned to that role (changes apply immediately)

**3. User Permission Assignment**
There are two methods to assign permissions to users:

**Option A: Assign Entire Role**
- Grant a user all permissions associated with a specific role
- Quick setup for standard positions
- Example: Assign "Technician" role → user gets all technician permissions

**Option B: Cherry-Pick Individual Permissions**
- Select specific permissions for a user regardless of role
- Create custom permission sets for unique positions
- Example: Grant "View Dashboard" + "Create Work Orders" + "View Inventory" without assigning a full role

**4. Dynamic Permission Management**
- Admins can add new permissions to existing roles as the system evolves
- Permissions can be removed from roles when responsibilities change
- No limit to the number of custom permission combinations

**5. Permission Flexibility**
- Organizations are not limited to the 15 default roles
- Can create entirely new roles with custom permission sets
- Can modify default roles extensively (add/remove/change permissions)
- Each user can have a unique permission set if needed
- **Protected Roles**: Certain roles (like Owner/CEO) can be locked from Admin editing via the "can be edited by admin" toggle

#### Access Control for Permission Management
- **Super Admin**: Full access to create, modify, and delete roles and permissions; can toggle "can be edited by admin" setting on any role
- **Admin**: Can view roles and assign permissions to users (limited role editing); **cannot edit roles where "can be edited by admin" is disabled** (e.g., Owner/CEO by default)
- **Owner/CEO**: Cannot modify roles or permissions; this is a protected executive role
- **Other Roles**: Cannot modify role or permission configurations

#### Best Practices
- Start with default roles for standard positions
- Customize roles based on actual job responsibilities
- Regularly audit permission assignments for security
- Document any customizations to default roles for training purposes
- Use the principle of least privilege (grant only necessary permissions)

---

### Technical Implementation Guide for Custom Roles & Permissions

This section provides detailed technical guidance for implementing the customizable role and permission system.

#### Database Schema Design

**1. Roles Table**
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  is_default BOOLEAN DEFAULT false,  -- True for the 15 system default roles
  is_custom BOOLEAN DEFAULT false,   -- True for user-created roles
  can_be_edited_by_admin BOOLEAN DEFAULT true,  -- False for protected roles like Owner/CEO
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  tenant_id UUID REFERENCES tenants(id),
  
  CONSTRAINT unique_role_per_tenant UNIQUE(name, tenant_id)
);

CREATE INDEX idx_roles_tenant ON roles(tenant_id);
CREATE INDEX idx_roles_is_default ON roles(is_default);
CREATE INDEX idx_roles_can_be_edited_by_admin ON roles(can_be_edited_by_admin);
```

**2. Permissions Table**
```sql
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,  -- e.g., "work_orders:create"
  resource VARCHAR(50) NOT NULL,       -- e.g., "work_orders"
  action VARCHAR(50) NOT NULL,         -- e.g., "create", "read", "update", "delete"
  description TEXT,
  category VARCHAR(50),                -- e.g., "operations", "financial", "admin"
  is_system BOOLEAN DEFAULT true,      -- System permissions vs custom permissions
  created_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT unique_permission_name UNIQUE(resource, action)
);

CREATE INDEX idx_permissions_resource ON permissions(resource);
CREATE INDEX idx_permissions_category ON permissions(category);
```

**3. Role-Permission Mapping Table**
```sql
CREATE TABLE role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  granted_by UUID REFERENCES users(id),
  granted_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT unique_role_permission UNIQUE(role_id, permission_id)
);

CREATE INDEX idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX idx_role_permissions_permission ON role_permissions(permission_id);
```

**4. User-Role Assignment Table**
```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES users(id),
  assigned_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,  -- Optional: for temporary role assignments
  
  CONSTRAINT unique_user_role UNIQUE(user_id, role_id)
);

CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role_id);
```

**5. User-Permission Overrides Table**
```sql
-- For cherry-picked permissions that override role defaults
CREATE TABLE user_permission_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  is_granted BOOLEAN NOT NULL,  -- True = granted, False = explicitly denied
  granted_by UUID REFERENCES users(id),
  granted_at TIMESTAMP DEFAULT NOW(),
  reason TEXT,  -- Why this override was applied
  
  CONSTRAINT unique_user_permission UNIQUE(user_id, permission_id)
);

CREATE INDEX idx_user_permission_overrides_user ON user_permission_overrides(user_id);
```

**6. Permission Audit Log Table**
```sql
CREATE TABLE permission_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL,  -- "role_assigned", "permission_granted", "permission_revoked"
  target_user_id UUID REFERENCES users(id),
  target_role_id UUID REFERENCES roles(id),
  target_permission_id UUID REFERENCES permissions(id),
  old_value JSONB,
  new_value JSONB,
  reason TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  tenant_id UUID REFERENCES tenants(id)
);

CREATE INDEX idx_permission_audit_user ON permission_audit_log(user_id);
CREATE INDEX idx_permission_audit_target ON permission_audit_log(target_user_id);
CREATE INDEX idx_permission_audit_created ON permission_audit_log(created_at DESC);
```

---

#### Data Models / DTOs

**Permission Model**
```typescript
interface Permission {
  id: string;
  name: string;              // "work_orders:create"
  resource: string;          // "work_orders"
  action: string;            // "create"
  description: string;
  category: 'operations' | 'financial' | 'admin' | 'warehouse' | 'crm';
  isSystem: boolean;
  createdAt: Date;
}
```

**Role Model**
```typescript
interface Role {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;        // One of the 15 system defaults
  isCustom: boolean;         // User-created custom role
  canBeEditedByAdmin: boolean; // False for protected roles (Owner/CEO)
  permissions: Permission[]; // All permissions assigned to this role
  userCount?: number;        // Number of users with this role
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  tenantId: string;
}
```

**User Permission Set Model**
```typescript
interface UserPermissionSet {
  userId: string;
  roles: Role[];                    // All roles assigned to user
  effectivePermissions: Permission[]; // Computed final permission set
  permissionOverrides: {
    permissionId: string;
    isGranted: boolean;
    reason: string;
  }[];
}
```

**Create/Update Role DTO**
```typescript
interface CreateRoleDto {
  name: string;
  description: string;
  permissionIds: string[];   // Initial permissions to assign
  tenantId: string;
}

interface UpdateRoleDto {
  name?: string;
  description?: string;
  permissionIds?: string[];  // Replace all permissions
}

interface AddPermissionsToRoleDto {
  roleId: string;
  permissionIds: string[];
}

interface RemovePermissionsFromRoleDto {
  roleId: string;
  permissionIds: string[];
}
```

**Assign Permissions DTO**
```typescript
interface AssignRoleToUserDto {
  userId: string;
  roleId: string;
  expiresAt?: Date;
  reason?: string;
}

interface GrantPermissionOverrideDto {
  userId: string;
  permissionId: string;
  isGranted: boolean;  // true = grant, false = explicitly deny
  reason: string;
}
```

---

#### API Endpoints

**Role Management Endpoints**

```typescript
// GET /api/v1/roles
// List all roles (with optional filters)
// Query params: ?includePermissions=true&isDefault=true&isCustom=false
GET /api/v1/roles
Response: {
  roles: Role[];
  total: number;
}

// GET /api/v1/roles/:roleId
// Get single role with all permissions
GET /api/v1/roles/:roleId
Response: Role

// POST /api/v1/roles
// Create new custom role
POST /api/v1/roles
Body: CreateRoleDto
Response: Role

// PUT /api/v1/roles/:roleId
// Update role (name, description, permissions)
PUT /api/v1/roles/:roleId
Body: UpdateRoleDto
Response: Role

// DELETE /api/v1/roles/:roleId
// Delete custom role (cannot delete default roles)
DELETE /api/v1/roles/:roleId
Response: { success: true, message: string }

// POST /api/v1/roles/:roleId/permissions
// Add permissions to a role
POST /api/v1/roles/:roleId/permissions
Body: { permissionIds: string[] }
Response: Role

// DELETE /api/v1/roles/:roleId/permissions
// Remove permissions from a role
DELETE /api/v1/roles/:roleId/permissions
Body: { permissionIds: string[] }
Response: Role

// POST /api/v1/roles/:roleId/clone
// Clone an existing role (useful for creating custom variants)
POST /api/v1/roles/:roleId/clone
Body: { name: string, description: string }
Response: Role
```

**Permission Management Endpoints**

```typescript
// GET /api/v1/permissions
// List all available permissions
// Query params: ?category=operations&resource=work_orders
GET /api/v1/permissions
Response: {
  permissions: Permission[];
  total: number;
  categories: string[];
  resources: string[];
}

// GET /api/v1/permissions/:permissionId
// Get single permission details
GET /api/v1/permissions/:permissionId
Response: Permission

// POST /api/v1/permissions
// Create custom permission (Super Admin only)
POST /api/v1/permissions
Body: {
  name: string;
  resource: string;
  action: string;
  description: string;
  category: string;
}
Response: Permission
```

**User Permission Assignment Endpoints**

```typescript
// GET /api/v1/users/:userId/permissions
// Get user's complete permission set (roles + overrides)
GET /api/v1/users/:userId/permissions
Response: UserPermissionSet

// POST /api/v1/users/:userId/roles
// Assign role to user
POST /api/v1/users/:userId/roles
Body: AssignRoleToUserDto
Response: { success: true, userPermissionSet: UserPermissionSet }

// DELETE /api/v1/users/:userId/roles/:roleId
// Remove role from user
DELETE /api/v1/users/:userId/roles/:roleId
Response: { success: true }

// POST /api/v1/users/:userId/permission-overrides
// Grant or deny specific permission (cherry-pick)
POST /api/v1/users/:userId/permission-overrides
Body: GrantPermissionOverrideDto
Response: { success: true, userPermissionSet: UserPermissionSet }

// DELETE /api/v1/users/:userId/permission-overrides/:permissionId
// Remove permission override
DELETE /api/v1/users/:userId/permission-overrides/:permissionId
Response: { success: true }

// GET /api/v1/users/:userId/check-permission/:permissionName
// Check if user has specific permission
GET /api/v1/users/:userId/check-permission/:permissionName
Response: { hasPermission: boolean, source: 'role' | 'override' | 'denied' }
```

**Permission Audit Endpoints**

```typescript
// GET /api/v1/audit/permissions
// Get permission change audit log
// Query params: ?userId=xxx&startDate=xxx&endDate=xxx&action=role_assigned
GET /api/v1/audit/permissions
Response: {
  logs: PermissionAuditLog[];
  total: number;
}
```

---

#### Permission Checking Logic

**Core Permission Checking Function**
```typescript
class PermissionService {
  /**
   * Check if user has a specific permission
   * Priority: Explicit Deny > Explicit Grant > Role-based Permission
   */
  async checkPermission(
    userId: string,
    permissionName: string // e.g., "work_orders:create"
  ): Promise<boolean> {
    // 1. Check for explicit denial in overrides
    const denial = await this.db.userPermissionOverrides.findFirst({
      where: {
        userId,
        permission: { name: permissionName },
        isGranted: false // Explicit denial
      }
    });
    
    if (denial) {
      return false; // Explicit denial takes highest priority
    }
    
    // 2. Check for explicit grant in overrides
    const grant = await this.db.userPermissionOverrides.findFirst({
      where: {
        userId,
        permission: { name: permissionName },
        isGranted: true
      }
    });
    
    if (grant) {
      return true; // Explicit grant
    }
    
    // 3. Check role-based permissions
    const rolePermission = await this.db.userRoles.findFirst({
      where: {
        userId,
        role: {
          rolePermissions: {
            some: {
              permission: { name: permissionName }
            }
          }
        }
      }
    });
    
    return !!rolePermission;
  }
  
  /**
   * Get all effective permissions for a user
   */
  async getUserEffectivePermissions(userId: string): Promise<Permission[]> {
    // Get permissions from all assigned roles
    const rolePermissions = await this.db.rolePermissions.findMany({
      where: {
        role: {
          userRoles: {
            some: { userId }
          }
        }
      },
      include: { permission: true }
    });
    
    // Get permission overrides
    const overrides = await this.db.userPermissionOverrides.findMany({
      where: { userId, isGranted: true },
      include: { permission: true }
    });
    
    // Get explicit denials
    const denials = await this.db.userPermissionOverrides.findMany({
      where: { userId, isGranted: false },
      include: { permission: true }
    });
    
    const deniedIds = new Set(denials.map(d => d.permission.id));
    
    // Combine and deduplicate
    const allPermissions = new Map<string, Permission>();
    
    // Add role-based permissions
    rolePermissions.forEach(rp => {
      if (!deniedIds.has(rp.permission.id)) {
        allPermissions.set(rp.permission.id, rp.permission);
      }
    });
    
    // Add granted overrides
    overrides.forEach(o => {
      allPermissions.set(o.permission.id, o.permission);
    });
    
    return Array.from(allPermissions.values());
  }
  
  /**
   * Bulk permission check for multiple permissions
   */
  async checkMultiplePermissions(
    userId: string,
    permissionNames: string[]
  ): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};
    
    for (const permissionName of permissionNames) {
      results[permissionName] = await this.checkPermission(userId, permissionName);
    }
    
    return results;
  }
}
```

**Authorization Guard/Middleware Example**
```typescript
// NestJS Guard Example
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private permissionService: PermissionService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler()
    );
    
    if (!requiredPermissions) {
      return true; // No permissions required
    }
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // Check if user has ALL required permissions (AND logic)
    for (const permission of requiredPermissions) {
      const hasPermission = await this.permissionService.checkPermission(
        user.id,
        permission
      );
      
      if (!hasPermission) {
        throw new ForbiddenException(
          `Missing required permission: ${permission}`
        );
      }
    }
    
    return true;
  }
}

// Usage in controllers
@Controller('work-orders')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class WorkOrderController {
  @Post()
  @Permissions('work_orders:create')
  async createWorkOrder(@Body() dto: CreateWorkOrderDto) {
    // Only users with 'work_orders:create' permission can access this
  }
  
  @Delete(':id')
  @Permissions('work_orders:delete', 'admin:all')
  async deleteWorkOrder(@Param('id') id: string) {
    // Requires BOTH permissions
  }
}
```

---

#### Permission Naming Convention

Follow a consistent naming pattern for permissions:

**Format**: `{resource}:{action}:{scope?}`

**Examples**:
```
work_orders:create
work_orders:read:own          // Read only own work orders
work_orders:read:all          // Read all work orders
work_orders:update:own
work_orders:update:all
work_orders:delete

inventory:read
inventory:create
inventory:update
inventory:adjust              // Special action for inventory adjustments

users:create
users:update
users:delete
users:manage_roles            // Special action for role management

dashboard:view:executive
dashboard:view:operations
dashboard:view:financial

reports:export
reports:generate
reports:schedule

admin:all                     // Super admin wildcard
```

---

#### Seeding Default Roles & Permissions

**Seed Script Example**
```typescript
async function seedRolesAndPermissions() {
  // 1. Create all system permissions first
  const permissions = await createSystemPermissions();
  
  // 2. Create the 14 default roles
  const roles = await createDefaultRoles();
  
  // 3. Assign permissions to default roles
  await assignDefaultPermissions(roles, permissions);
}

async function createSystemPermissions() {
  const permissionDefinitions = [
    // Work Orders
    { resource: 'work_orders', action: 'create', category: 'operations' },
    { resource: 'work_orders', action: 'read:own', category: 'operations' },
    { resource: 'work_orders', action: 'read:all', category: 'operations' },
    { resource: 'work_orders', action: 'update:own', category: 'operations' },
    { resource: 'work_orders', action: 'update:all', category: 'operations' },
    { resource: 'work_orders', action: 'delete', category: 'operations' },
    
    // Inventory
    { resource: 'inventory', action: 'read', category: 'warehouse' },
    { resource: 'inventory', action: 'create', category: 'warehouse' },
    { resource: 'inventory', action: 'update', category: 'warehouse' },
    { resource: 'inventory', action: 'adjust', category: 'warehouse' },
    
    // Dashboards
    { resource: 'dashboard', action: 'view:executive', category: 'admin' },
    { resource: 'dashboard', action: 'view:operations', category: 'operations' },
    { resource: 'dashboard', action: 'view:financial', category: 'financial' },
    
    // Financial
    { resource: 'financial', action: 'view:revenue', category: 'financial' },
    { resource: 'financial', action: 'view:expenses', category: 'financial' },
    { resource: 'financial', action: 'manage', category: 'financial' },
    
    // ... more permissions
  ];
  
  return await Promise.all(
    permissionDefinitions.map(p => 
      db.permission.create({
        data: {
          name: `${p.resource}:${p.action}`,
          resource: p.resource,
          action: p.action,
          category: p.category,
          isSystem: true
        }
      })
    )
  );
}

async function createDefaultRoles() {
  const roleDefinitions = [
    { 
      name: 'Super Admin', 
      description: 'Full system access', 
      isDefault: true,
      canBeEditedByAdmin: false  // Protected from Admins
    },
    { 
      name: 'Owner/CEO', 
      description: 'Executive leadership with all operational permissions', 
      isDefault: true,
      canBeEditedByAdmin: false  // Protected - only Super Admin can modify
    },
    { 
      name: 'Admin', 
      description: 'Business management', 
      isDefault: true,
      canBeEditedByAdmin: true
    },
    { 
      name: 'Field Manager', 
      description: 'Field operations leadership', 
      isDefault: true,
      canBeEditedByAdmin: true
    },
    // ... all 15 roles (remaining 11 with canBeEditedByAdmin: true)
  ];
  
  return await Promise.all(
    roleDefinitions.map(r => 
      db.role.create({ data: r })
    )
  );
}
```

---

#### Implementation Best Practices

1. **Caching Strategy**
   - Cache user permissions in Redis/memory with TTL
   - Invalidate cache when permissions change
   - Use cache key pattern: `user:{userId}:permissions`

2. **Performance Optimization**
   - Lazy-load permissions (don't fetch on every request)
   - Use database indexes on foreign keys
   - Batch permission checks when possible

3. **Security Considerations**
   - Always validate permission names against whitelist
   - Log all permission changes in audit table
   - Prevent users from escalating their own privileges
   - Require Super Admin approval for sensitive permission grants

4. **Error Handling**
   - Return 403 Forbidden with clear error messages
   - Don't leak system information in permission errors
   - Log failed permission checks for security monitoring

5. **Testing**
   - Unit test permission checking logic thoroughly
   - Integration test role assignment flows
   - Test permission inheritance and overrides
   - Test edge cases (expired roles, deleted permissions)

---

### Permission Matrix

#### Management & Operations Roles

| Feature/Module | Super Admin | Owner/CEO | Admin | Field Manager | Lead Dispatch | Dispatcher | Lead Tech | Technician |
|----------------|-------------|-----------|-------|---------------|---------------|------------|-----------|------------|
| Executive Dashboard | Full | Full | Full | View | View | View | No | No |
| Analytics & Reports | Full | Full | Full | Limited | Limited | No | Limited | No |
| Work Orders | Full | Full | Full | Full | Full | Full | Own+Team | Own Only |
| Inventory | Full | Full | Full | View | Limited | Limited | View | Scanner |
| CRM | Full | Full | Full | View | View | View | View | View |
| Dispatch | Full | Full | Full | Full | Full | Full | Limited | Own Only |
| Purchasing | Full | Full | Full | No | No | No | No | No |
| User Management | Full | No* | Limited | No | No | No | No | No |
| System Settings | Full | No | No | No | No | No | No | No |
| Audit Logs | Full | View | View | No | No | No | No | No |
| Financial Data | Full | Full | Full | Limited | Limited | No | No | No |

**\*Owner/CEO Note**: Cannot manage users/roles unless Super Admin grants permission

#### Warehouse & Purchasing Roles

| Feature/Module | Purchasing Mgr | Purchasing | Warehouse Mgr | Warehouse Personnel |
|----------------|----------------|------------|---------------|---------------------|
| Executive Dashboard | View | No | View | No |
| Analytics & Reports | Limited | No | Limited | No |
| Work Orders | View | No | View | No |
| Inventory | View | View | Full | Full |
| CRM | No | No | No | No |
| Dispatch | No | No | No | No |
| Purchasing | Full | Create/Track | Create | No |
| User Management | No | No | No | No |
| System Settings | No | No | No | No |
| Audit Logs | No | No | No | No |
| Financial Data | Limited | No | Limited | No |

**Note**: Owner/CEO has Full access to all Warehouse & Purchasing features (Inventory: Full, Purchasing: Full, etc.)

#### Support Roles

| Feature/Module | Accounting | Sales/CRM | Viewer/Analyst |
|----------------|------------|-----------|----------------|
| Executive Dashboard | Full | View | View |
| Analytics & Reports | Full | Limited | View |
| Work Orders | View | Create | View |
| Inventory | View | View | View |
| CRM | View | Full | View |
| Dispatch | View | No | View |
| Purchasing | View | No | View |
| User Management | No | No | No |
| System Settings | No | No | No |
| Audit Logs | Full (Financial) | No | No |
| Financial Data | Full | Limited | View |

**Note**: Owner/CEO has Full access to all Support role features (Accounting: Full, CRM: Full, Reports: Full)

**Legend:**
- **Full**: Complete CRUD access and management
- **Create**: Can create but limited edit/delete
- **View**: Read-only access
- **Limited**: Restricted subset of features
- **Own Only**: Access only to items assigned to user
- **Own+Team**: Access to own and team members' items
- **Scanner**: Mobile scanner access only
- **Create/Track**: Can create and track but not approve
- **No**: No access to this feature

---

## Data Visualizations

### Chart Types & Usage

#### 1. Line Charts
- **Use Cases**: Trends over time
- **Examples**:
  - Revenue trends (daily, weekly, monthly)
  - Work order completion rate over time
  - API response time trends
  - Customer acquisition trends
- **Features**:
  - Multi-line comparisons (this year vs last year)
  - Zoom and pan capabilities
  - Tooltips with detailed data
  - Downloadable as image/PDF

#### 2. Bar Charts
- **Use Cases**: Comparisons across categories
- **Examples**:
  - Work orders by service type
  - Technician performance comparison
  - Revenue by category
  - Inventory levels by warehouse
- **Features**:
  - Horizontal and vertical orientations
  - Stacked and grouped variations
  - Click to drill down
  - Color-coded by threshold

#### 3. Pie/Donut Charts
- **Use Cases**: Part-to-whole relationships
- **Examples**:
  - Work order status distribution
  - Lead source breakdown
  - Expense category distribution
  - Inventory value by category
- **Features**:
  - Percentage labels
  - Interactive legends
  - Slice highlighting
  - Center value display (donut)

#### 4. Area Charts
- **Use Cases**: Volume trends over time
- **Examples**:
  - Cumulative revenue
  - Stock levels over time
  - Work order volume trends
- **Features**:
  - Stacked area for multi-series
  - Gradient fills
  - Baseline comparisons

#### 5. Gauge/Meter Charts
- **Use Cases**: Single metric with target/threshold
- **Examples**:
  - Technician utilization (0-100%)
  - Customer satisfaction score
  - System uptime percentage
  - Inventory turnover ratio
- **Features**:
  - Color zones (red, yellow, green)
  - Target indicator
  - Current vs target comparison

#### 6. Heat Maps
- **Use Cases**: Geographic or time-based density
- **Examples**:
  - Work order density by location
  - System usage by time of day
  - Technician schedule availability
- **Features**:
  - Color intensity by value
  - Tooltips with exact values
  - Zoom and filter capabilities

#### 7. Funnel Charts
- **Use Cases**: Sequential process stages
- **Examples**:
  - Lead pipeline (stages to conversion)
  - Work order workflow (new to completed)
- **Features**:
  - Conversion rate between stages
  - Drop-off highlighting
  - Click to view details

#### 8. Tables/Data Grids
- **Use Cases**: Detailed data display
- **Examples**:
  - Work order list
  - User management table
  - Audit logs
  - Inventory list
- **Features**:
  - Sortable columns
  - Filterable rows
  - Pagination
  - Export to CSV/Excel
  - Inline editing (where applicable)
  - Row actions (view, edit, delete)

#### 9. Sparklines
- **Use Cases**: Inline micro-charts in tables/cards
- **Examples**:
  - Mini trend in KPI cards
  - Quick performance indicators in tables
- **Features**:
  - Compact size
  - Shows trend without axes
  - Tooltip on hover

#### 10. Kanban Boards
- **Use Cases**: Status-based workflow visualization
- **Examples**:
  - Work order status board
  - Lead pipeline stages
- **Features**:
  - Drag-and-drop cards
  - Swimlanes for categorization
  - Card detail previews
  - Status totals

### Visualization Library Recommendations
- **Recharts**: React-friendly, simple charts (recommended for MVP)
- **Chart.js**: Versatile, lightweight, excellent documentation
- **D3.js**: Complex, custom visualizations (for advanced needs)
- **Apache ECharts**: Feature-rich, interactive charts
- **Nivo**: React-based D3 wrapper, beautiful defaults

---

## Technical Architecture

### Frontend Architecture

#### Technology Stack
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand (current) + React Query for server state
- **Routing**: React Router v6
- **UI Components**: 
  - Existing: Card, Sidebar, TopBar
  - New: Dashboard grid system, chart components, data tables
- **Charting**: Recharts (recommended) or Chart.js
- **Styling**: CSS Modules or Tailwind CSS
- **Date Handling**: date-fns or Day.js
- **Data Tables**: TanStack Table (React Table v8)
- **Icons**: Lucide React or Heroicons

#### Component Structure
```
frontend/src/
├── components/
│   ├── dashboard/
│   │   ├── DashboardLayout.tsx
│   │   ├── KPICard.tsx
│   │   ├── DashboardGrid.tsx
│   │   └── widgets/
│   │       ├── RevenueChart.tsx
│   │       ├── WorkOrderStatusChart.tsx
│   │       ├── ActivityFeed.tsx
│   │       ├── TechnicianTable.tsx
│   │       └── ...
│   ├── charts/
│   │   ├── LineChart.tsx
│   │   ├── BarChart.tsx
│   │   ├── PieChart.tsx
│   │   ├── GaugeChart.tsx
│   │   └── ...
│   ├── tables/
│   │   ├── DataTable.tsx
│   │   ├── TableFilters.tsx
│   │   ├── TablePagination.tsx
│   │   └── ...
│   ├── admin/
│   │   ├── UserManagement.tsx
│   │   ├── RoleEditor.tsx
│   │   ├── AuditLogViewer.tsx
│   │   └── ...
│   └── monitoring/
│       ├── HealthStatus.tsx
│       ├── PerformanceChart.tsx
│       ├── ErrorLogViewer.tsx
│       └── ...
├── pages/
│   ├── Dashboard.tsx (update existing)
│   ├── Analytics.tsx (new)
│   ├── Admin.tsx (new)
│   ├── Monitoring.tsx (new)
│   └── ...
├── hooks/
│   ├── useKPI.ts
│   ├── useDashboardData.ts
│   ├── useRealTimeUpdates.ts
│   └── ...
└── api/
    ├── dashboard.ts
    ├── analytics.ts
    ├── admin.ts
    └── monitoring.ts
```

#### State Management Strategy
- **Global State (Zustand)**:
  - User authentication and session
  - User preferences (theme, dashboard layout)
  - UI state (sidebar collapsed, filters)
  
- **Server State (React Query)**:
  - Dashboard data and KPIs
  - Analytics and reports
  - Real-time updates with polling/WebSockets
  - Cache management for better performance
  - Automatic refetch on window focus
  
- **Local State (React useState)**:
  - Component-specific UI state
  - Form inputs
  - Temporary filters

#### Real-Time Updates
- **Polling Strategy**: Short-interval polling for critical metrics (30-60 seconds)
- **WebSocket Support** (Future): Real-time push for instant updates
- **Optimistic Updates**: Update UI immediately, sync with server
- **Background Refresh**: React Query stale-while-revalidate pattern

### Backend Architecture

#### New API Endpoints Required

##### Dashboard Endpoints
```typescript
// Executive Dashboard
GET /api/v1/dashboard/executive
  - Returns: KPI summary, revenue trends, work order stats, recent activity
  - Query params: dateRange, tenantId

GET /api/v1/dashboard/kpis
  - Returns: All KPIs with current values and trends
  - Query params: metric[], period (day/week/month/year)

// Analytics Endpoints
GET /api/v1/analytics/revenue
  - Returns: Revenue data by period, service type, customer
  - Query params: startDate, endDate, groupBy, filterBy

GET /api/v1/analytics/workorders
  - Returns: Work order analytics and trends
  - Query params: startDate, endDate, status, technician, serviceType, includeZeroDollar, isCallback

GET /api/v1/analytics/workorders/zero-dollar
  - Returns: Zero dollar work order analysis
  - Query params: startDate, endDate, reasonCode, technician
  - Returns: Count, trend, breakdown by reason, labor hours, cost impact

GET /api/v1/analytics/workorders/callbacks
  - Returns: Call back analysis and metrics
  - Query params: startDate, endDate, technician, serviceType
  - Returns: Call back rate, reasons, time between visits, financial impact

GET /api/v1/analytics/inventory
  - Returns: Inventory analytics, turnover, valuation
  - Query params: warehouse, category

GET /api/v1/analytics/crm
  - Returns: Customer and lead analytics
  - Query params: startDate, endDate, segment

GET /api/v1/analytics/dispatch
  - Returns: Dispatch and technician analytics
  - Query params: startDate, endDate, technician

// Reports Endpoints
GET /api/v1/reports/financial
  - Returns: Financial reports (P&L, AR, etc.)
  - Query params: reportType, startDate, endDate, format (json/pdf/excel)

POST /api/v1/reports/custom
  - Body: Report configuration (metrics, filters, grouping)
  - Returns: Custom report data

GET /api/v1/reports/export/:reportId
  - Returns: Report file (PDF, Excel, CSV)

// Admin Endpoints
GET /api/v1/admin/users
  - Returns: List of all users with roles and status
  - Query params: page, limit, search, role, status

POST /api/v1/admin/users
  - Body: User creation data
  - Returns: Created user

PUT /api/v1/admin/users/:userId
  - Body: User update data
  - Returns: Updated user

DELETE /api/v1/admin/users/:userId
  - Returns: Success confirmation

GET /api/v1/admin/roles
  - Returns: List of roles with permissions

PUT /api/v1/admin/roles/:roleId
  - Body: Role permission updates
  - Returns: Updated role

GET /api/v1/admin/audit-logs
  - Returns: Audit log entries
  - Query params: page, limit, userId, action, startDate, endDate

GET /api/v1/admin/settings
  - Returns: System settings

PUT /api/v1/admin/settings
  - Body: Settings updates
  - Returns: Updated settings

// Monitoring Endpoints
GET /api/v1/monitoring/health-detailed
  - Returns: Detailed health status (API, DB, cache, queue)

GET /api/v1/monitoring/performance
  - Returns: Performance metrics (response times, error rates)
  - Query params: startDate, endDate

GET /api/v1/monitoring/errors
  - Returns: Recent error logs
  - Query params: page, limit, level, startDate, endDate

GET /api/v1/monitoring/system-resources
  - Returns: Server resources (CPU, memory, disk)

GET /api/v1/monitoring/background-jobs
  - Returns: Queue status and job stats

// Work Order Type Tracking Endpoints
GET /api/v1/workorders/zero-dollar
  - Returns: List of zero dollar work orders
  - Query params: page, limit, startDate, endDate, reasonCode, technician

GET /api/v1/workorders/callbacks
  - Returns: List of callback work orders with original WO references
  - Query params: page, limit, startDate, endDate, technician, resolved

POST /api/v1/workorders/:workOrderId/mark-callback
  - Body: { originalWorkOrderId, callbackReason, notes }
  - Returns: Updated work order with callback flag

GET /api/v1/workorders/:workOrderId/callback-history
  - Returns: All callbacks related to a specific work order
```

#### Database Schema Additions

##### Users Table (if not exists)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role_id UUID REFERENCES roles(id),
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, suspended
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

##### Roles Table
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB, -- {"workorders": ["create", "read", "update"], ...}
  is_system_role BOOLEAN DEFAULT false,
  tenant_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

##### Audit Logs Table
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL, -- create, update, delete, login, etc.
  resource_type VARCHAR(100), -- workorder, inventory, user, etc.
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

##### Dashboard Preferences Table
```sql
CREATE TABLE dashboard_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  dashboard_type VARCHAR(50), -- executive, analytics, etc.
  layout_config JSONB, -- Widget positions and sizes
  filters JSONB, -- Saved filters
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, dashboard_type)
);
```

##### System Metrics Table (for historical tracking)
```sql
CREATE TABLE system_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type VARCHAR(100) NOT NULL, -- api_response_time, error_rate, etc.
  metric_value DECIMAL,
  tags JSONB, -- {endpoint: "/api/v1/workorders", method: "GET"}
  recorded_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_system_metrics_type_time ON system_metrics(metric_type, recorded_at DESC);
```

##### Work Orders Table Updates (Add columns to existing table)
```sql
-- Add columns to existing work_orders table for zero dollar and callback tracking
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS is_billable BOOLEAN DEFAULT true;
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS is_zero_dollar BOOLEAN DEFAULT false;
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS zero_dollar_reason VARCHAR(50); 
  -- Enum: 'warranty', 'goodwill', 'callback', 'diagnostic', 'training', 'other'
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS is_callback BOOLEAN DEFAULT false;
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS original_work_order_id UUID REFERENCES work_orders(id);
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS callback_reason VARCHAR(100);
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS callback_resolution_notes TEXT;
ALTER TABLE work_orders ADD COLUMN IF NOT EXISTS service_type VARCHAR(50);
  -- Enum: 'installation', 'repair', 'maintenance', 'callback', 'diagnostic', 'emergency', 'other'

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_work_orders_billable ON work_orders(is_billable, tenant_id);
CREATE INDEX IF NOT EXISTS idx_work_orders_zero_dollar ON work_orders(is_zero_dollar, tenant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_work_orders_callback ON work_orders(is_callback, tenant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_work_orders_original ON work_orders(original_work_order_id);
CREATE INDEX IF NOT EXISTS idx_work_orders_service_type ON work_orders(service_type, tenant_id);

-- Add constraint to ensure callback work orders have original_work_order_id
ALTER TABLE work_orders ADD CONSTRAINT check_callback_has_original 
  CHECK (
    (is_callback = false) OR 
    (is_callback = true AND original_work_order_id IS NOT NULL)
  );
```

##### Work Order Labor Tracking Table (for zero dollar cost calculation)
```sql
CREATE TABLE IF NOT EXISTS work_order_labor (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_id UUID REFERENCES work_orders(id) ON DELETE CASCADE,
  technician_id UUID NOT NULL,
  hours_worked DECIMAL(5,2) NOT NULL,
  labor_rate DECIMAL(10,2), -- Rate at time of work
  labor_cost DECIMAL(10,2), -- Calculated: hours * rate
  date_worked DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_work_order_labor_wo ON work_order_labor(work_order_id);
CREATE INDEX idx_work_order_labor_tech ON work_order_labor(technician_id);
```

#### NestJS Module Structure
```
backend/src/modules/
├── dashboard/
│   ├── dashboard.controller.ts
│   ├── dashboard.service.ts
│   ├── dashboard.module.ts
│   └── dto/
│       ├── kpi-query.dto.ts
│       └── dashboard-response.dto.ts
├── analytics/
│   ├── analytics.controller.ts
│   ├── analytics.service.ts
│   ├── analytics.module.ts
│   └── dto/
├── admin/
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   ├── roles/
│   │   ├── roles.controller.ts
│   │   ├── roles.service.ts
│   │   └── dto/
│   ├── audit/
│   │   ├── audit.controller.ts
│   │   ├── audit.service.ts
│   │   └── dto/
│   └── admin.module.ts
└── monitoring/
    ├── monitoring.controller.ts
    ├── monitoring.service.ts
    ├── monitoring.module.ts
    └── dto/
```

#### Caching Strategy
- **Redis Cache** (Future Enhancement):
  - Cache KPI calculations (TTL: 1-5 minutes)
  - Cache dashboard queries
  - Invalidate on data updates
  
- **In-Memory Cache** (Current):
  - Use NestJS cache-manager
  - Cache frequently accessed data
  - Set appropriate TTLs based on data volatility

#### Performance Optimization
- **Database Indexing**:
  - Index all foreign keys
  - Index commonly filtered columns (status, date, tenant_id)
  - Composite indexes for complex queries
  
- **Query Optimization**:
  - Use database views for complex KPI calculations
  - Aggregate queries with proper grouping
  - Limit result sets with pagination
  
- **Materialized Views** (Future):
  - Pre-calculate expensive aggregations
  - Refresh on schedule or triggers
  
- **Background Processing**:
  - Calculate complex analytics asynchronously
  - Store results in cache or dedicated table
  - Use queue module for heavy computations

#### Security Considerations
- **Authentication**: JWT tokens with refresh mechanism
- **Authorization**: Role-based access control on all endpoints
- **Audit Logging**: Track all sensitive operations
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Validate all inputs with DTOs and class-validator
- **SQL Injection Prevention**: Use Prisma ORM (parameterized queries)
- **XSS Protection**: Sanitize outputs, use Helmet middleware
- **CORS**: Configure allowed origins

---

## API Requirements

### Dashboard API Response Formats

#### Executive Dashboard Response
```json
{
  "kpis": {
    "todayRevenue": {
      "value": 15420.50,
      "currency": "USD",
      "trend": "+12.5%",
      "comparison": "vs yesterday"
    },
    "activeWorkOrders": {
      "value": 48,
      "trend": "+5",
      "comparison": "vs yesterday"
    },
    "techniciansOnDuty": {
      "value": 12,
      "available": 8,
      "busy": 4
    },
    "customerSatisfaction": {
      "value": 4.7,
      "max": 5,
      "trend": "+0.2",
      "sampleSize": 45
    }
  },
  "revenueTrend": {
    "labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "datasets": [
      {
        "label": "This Week",
        "data": [12500, 13200, 11800, 14500, 15420, 16200, 14800]
      },
      {
        "label": "Last Week",
        "data": [11200, 12100, 10900, 13200, 13700, 14800, 13500]
      }
    ]
  },
  "workOrderStatus": [
    {"status": "Open", "count": 12, "percentage": 25},
    {"status": "In Progress", "count": 28, "percentage": 58.3},
    {"status": "Completed", "count": 8, "percentage": 16.7}
  ],
  "topTechnicians": [
    {
      "id": "tech-001",
      "name": "John Smith",
      "revenue": 8500,
      "completionRate": 95,
      "rating": 4.9,
      "jobsCompleted": 24
    }
  ],
  "recentActivity": [
    {
      "id": "act-001",
      "type": "workorder_completed",
      "description": "Work Order #1234 completed by John Smith",
      "timestamp": "2025-10-18T14:30:00Z",
      "link": "/workorders/1234"
    }
  ],
  "upcomingAppointments": [
    {
      "id": "wo-1235",
      "customer": "ABC Corp",
      "technician": "John Smith",
      "scheduledAt": "2025-10-18T16:00:00Z",
      "serviceType": "Maintenance",
      "priority": "medium"
    }
  ]
}
```

#### Analytics Response (Revenue)
```json
{
  "summary": {
    "totalRevenue": 125400.50,
    "periodStart": "2025-10-01",
    "periodEnd": "2025-10-18",
    "growth": "+18.3%",
    "comparisonPeriod": "Previous month same dates"
  },
  "byPeriod": [
    {"date": "2025-10-01", "revenue": 6500.00},
    {"date": "2025-10-02", "revenue": 7200.00}
  ],
  "byServiceType": [
    {"serviceType": "Installation", "revenue": 45000, "count": 15, "avgValue": 3000},
    {"serviceType": "Repair", "revenue": 38000, "count": 45, "avgValue": 844},
    {"serviceType": "Maintenance", "revenue": 42400, "count": 78, "avgValue": 543}
  ],
  "byCustomerSegment": [
    {"segment": "Enterprise", "revenue": 65000, "customerCount": 8},
    {"segment": "Small Business", "revenue": 45000, "customerCount": 32},
    {"segment": "Residential", "revenue": 15400, "customerCount": 54}
  ]
}
```

#### Zero Dollar Work Order Analytics Response
```json
{
  "summary": {
    "totalZeroDollarWOs": 45,
    "percentageOfAllWOs": 15.2,
    "totalLaborHours": 127.5,
    "estimatedCost": 6375.00,
    "trend": "+3.2%",
    "comparisonPeriod": "Previous month"
  },
  "byReasonCode": [
    {"reason": "warranty", "count": 18, "percentage": 40, "laborHours": 52.5, "cost": 2625.00},
    {"reason": "goodwill", "count": 12, "percentage": 26.7, "laborHours": 38.0, "cost": 1900.00},
    {"reason": "callback", "count": 8, "percentage": 17.8, "laborHours": 22.0, "cost": 1100.00},
    {"reason": "diagnostic", "count": 5, "percentage": 11.1, "laborHours": 12.0, "cost": 600.00},
    {"reason": "training", "count": 2, "percentage": 4.4, "laborHours": 3.0, "cost": 150.00}
  ],
  "trend": [
    {"date": "2025-10-01", "count": 2, "laborHours": 6.5},
    {"date": "2025-10-02", "count": 3, "laborHours": 9.0},
    {"date": "2025-10-03", "count": 1, "laborHours": 3.5}
  ],
  "topCustomers": [
    {"customerId": "cust-001", "customerName": "ABC Corp", "zeroDollarWOs": 5, "reason": "warranty"},
    {"customerId": "cust-002", "customerName": "XYZ Inc", "zeroDollarWOs": 3, "reason": "goodwill"}
  ],
  "byTechnician": [
    {"technicianId": "tech-001", "name": "John Smith", "count": 8, "laborHours": 28.5, "percentageOfWorkload": 12.5},
    {"technicianId": "tech-002", "name": "Jane Doe", "count": 6, "laborHours": 22.0, "percentageOfWorkload": 10.8}
  ]
}
```

#### Call Back Analytics Response
```json
{
  "summary": {
    "totalCallbacks": 32,
    "callbackRate": 6.8,
    "callbackRateTarget": 5.0,
    "status": "warning",
    "trend": "-1.2%",
    "comparisonPeriod": "Previous month",
    "totalCost": 4800.00,
    "avgCostPerCallback": 150.00
  },
  "callbacksByTimeframe": [
    {"timeframe": "0-7 days", "count": 18, "percentage": 56.3},
    {"timeframe": "8-14 days", "count": 8, "percentage": 25.0},
    {"timeframe": "15-30 days", "count": 6, "percentage": 18.7}
  ],
  "callbackReasons": [
    {"reason": "same_issue_unresolved", "count": 15, "percentage": 46.9, "cost": 2250.00},
    {"reason": "related_issue", "count": 10, "percentage": 31.3, "cost": 1500.00},
    {"reason": "parts_failed", "count": 5, "percentage": 15.6, "cost": 750.00},
    {"reason": "new_issue", "count": 2, "percentage": 6.2, "cost": 300.00}
  ],
  "byServiceType": [
    {"serviceType": "repair", "total": 120, "callbacks": 15, "callbackRate": 12.5},
    {"serviceType": "installation", "total": 80, "callbacks": 8, "callbackRate": 10.0},
    {"serviceType": "maintenance", "total": 95, "callbacks": 9, "callbackRate": 9.5}
  ],
  "byTechnician": [
    {
      "technicianId": "tech-001",
      "name": "John Smith",
      "totalJobs": 45,
      "callbacks": 2,
      "callbackRate": 4.4,
      "avgDaysToCallback": 8.5,
      "status": "excellent"
    },
    {
      "technicianId": "tech-003",
      "name": "Bob Wilson",
      "totalJobs": 38,
      "callbacks": 7,
      "callbackRate": 18.4,
      "avgDaysToCallback": 6.2,
      "status": "needs_improvement"
    }
  ],
  "trend": [
    {"date": "2025-10-01", "totalWOs": 12, "callbacks": 1, "rate": 8.3},
    {"date": "2025-10-02", "totalWOs": 15, "callbacks": 2, "rate": 13.3},
    {"date": "2025-10-03", "totalWOs": 10, "callbacks": 0, "rate": 0}
  ],
  "financialImpact": {
    "totalCallbackCost": 4800.00,
    "laborCost": 3200.00,
    "materialCost": 1600.00,
    "lostOpportunityCost": 8500.00,
    "percentageOfRevenue": 3.8
  }
}
```

### Query Parameter Standards
- **Date Ranges**: `startDate`, `endDate` (ISO 8601 format)
- **Pagination**: `page` (1-based), `limit` (default: 50, max: 1000)
- **Sorting**: `sortBy`, `sortOrder` (asc/desc)
- **Filtering**: Use specific field names (e.g., `status`, `technician`, `warehouse`)
- **Tenant Isolation**: Include `tenantId` in JWT, not query params

### Error Response Format
```json
{
  "statusCode": 400,
  "message": "Invalid date range",
  "error": "Bad Request",
  "timestamp": "2025-10-18T15:00:00Z",
  "path": "/api/v1/analytics/revenue"
}
```

---

## UI/UX Design Guidelines

### Design Principles
1. **Clarity**: Information should be easy to understand at a glance
2. **Hierarchy**: Most important data should be most prominent
3. **Consistency**: Uniform styling, spacing, and interaction patterns
4. **Responsiveness**: Works well on desktop, tablet, and mobile
5. **Accessibility**: WCAG 2.1 Level AA compliance
6. **Performance**: Fast load times, smooth interactions

### Color Scheme
- **Primary**: Blue (#0066CC) - Actions, links, primary CTAs
- **Success**: Green (#28A745) - Positive metrics, completed states
- **Warning**: Yellow/Orange (#FFC107) - Warnings, moderate alerts
- **Danger**: Red (#DC3545) - Errors, critical alerts, overdue items
- **Neutral**: Grays (#F8F9FA to #343A40) - Backgrounds, text, borders
- **Info**: Light Blue (#17A2B8) - Informational messages

### Typography
- **Headings**: 
  - H1: 32px, bold (page titles)
  - H2: 24px, semi-bold (section headers)
  - H3: 18px, semi-bold (subsections)
- **Body**: 14px, regular (default text)
- **Small**: 12px (captions, labels)
- **Font Family**: System fonts (sans-serif) for performance

### Spacing
- **Grid System**: 8px base unit
- **Card Padding**: 16px (mobile), 24px (desktop)
- **Section Spacing**: 24px between dashboard sections
- **Component Spacing**: 8px-16px within components

### KPI Card Design
```
┌────────────────────────┐
│ 📊 METRIC NAME         │
│                        │
│     $15,420            │ <- Large, bold value
│     +12.5% ↑           │ <- Trend indicator
│     vs yesterday       │ <- Context
│ ───────────────────    │
│ [Sparkline Chart]      │ <- Optional mini chart
└────────────────────────┘
```

### Chart Design Guidelines
- **Colors**: Use consistent color palette, avoid overuse
- **Labels**: Clear, concise axis labels and legends
- **Tooltips**: Show detailed data on hover
- **Responsive**: Adapt to container size
- **Loading States**: Show skeleton or spinner while loading
- **Empty States**: Helpful message when no data available
- **Export**: Option to download chart as image

### Table Design
- **Headers**: Sticky headers for long tables
- **Sorting**: Click column headers to sort
- **Filtering**: Filter inputs above table
- **Pagination**: Show page numbers and total count
- **Row Actions**: Dropdown menu or icon buttons
- **Hover State**: Highlight row on hover
- **Zebra Striping**: Alternate row colors for readability

### Responsive Breakpoints
- **Mobile**: < 768px (stacked layout, simplified charts)
- **Tablet**: 768px - 1024px (2-column grid)
- **Desktop**: > 1024px (full dashboard grid)

### Loading & Error States
- **Loading**: 
  - Skeleton screens for initial load
  - Spinner for data refresh
  - Progress bar for long operations
- **Error**:
  - Clear error message
  - Retry button
  - Fallback to last known good data if applicable
- **Empty**:
  - Friendly message
  - Action to add data (if applicable)
  - Illustration or icon

### Accessibility
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Readers**: Proper ARIA labels and roles
- **Color Contrast**: Minimum 4.5:1 for text, 3:1 for UI components
- **Focus Indicators**: Visible focus state for all focusable elements
- **Alt Text**: All images and charts have descriptive alt text

---

## Advanced Permission System Recommendations

This section outlines 12 enhancements to the role and permission system to improve security, usability, and flexibility. These recommendations are organized by priority and complexity.

### Priority 1: Must Have (Phase 1 Implementation)

#### 1. Team-Scoped User Management Permissions

**Problem**: Manager roles (Field Manager, Purchasing Manager, Warehouse Manager) need to manage their team members but shouldn't have full user management access.

**Solution**: Add scope-based user management permissions instead of binary yes/no.

**Permission Structure**:
```typescript
// Current: Binary user management
permissions: ['users:manage']  // All or nothing

// Proposed: Granular scope-based permissions
permissions: [
  'users:view:all',              // View all users
  'users:view:own_team',          // View only team members
  'users:create',                 // Create new users
  'users:edit:all',               // Edit any user
  'users:edit:own_team',          // Edit only team members (NEW)
  'users:delete',                 // Delete users
  'users:assign_roles:all',       // Assign any role to anyone
  'users:assign_roles:own_team',  // Assign roles to team only (NEW)
  'users:deactivate:own_team'     // Deactivate team members (NEW)
]
```

**Database Schema Addition**:
```sql
ALTER TABLE permissions ADD COLUMN scope VARCHAR(50);
-- Values: 'all', 'own_team', 'own_department', 'own', null (default)

-- Add team relationship to users
ALTER TABLE users ADD COLUMN team_id UUID REFERENCES teams(id);
ALTER TABLE users ADD COLUMN department VARCHAR(100);
```

**Updated Role Permissions**:
- **Field Manager**: `users:edit:own_team`, `users:assign_roles:own_team` (for Field Techs and Lead Techs)
- **Purchasing Manager**: `users:edit:own_team`, `users:assign_roles:own_team` (for Purchasing team)
- **Warehouse Manager**: `users:edit:own_team`, `users:assign_roles:own_team` (for Warehouse Personnel)
- **Lead Dispatch**: `users:view:own_team` (view dispatchers only)

**Implementation Example**:
```typescript
// Permission checking service
async canEditUser(currentUser: User, targetUser: User, permission: string): Promise<boolean> {
  const userPermissions = await this.getUserPermissions(currentUser.id);
  
  // Check for 'users:edit:all' permission
  if (userPermissions.includes('users:edit:all')) {
    return true;
  }
  
  // Check for 'users:edit:own_team' permission
  if (userPermissions.includes('users:edit:own_team')) {
    return currentUser.teamId === targetUser.teamId;
  }
  
  return false;
}
```

**Benefits**:
- Managers can handle routine team tasks without escalation
- Reduces Super Admin/Admin workload
- Better organizational hierarchy
- Clear audit trail of who managed whom

---

#### 2. Permission Groups/Categories

**Problem**: With 100+ individual permissions, assignment becomes tedious and error-prone.

**Solution**: Group related permissions into logical bundles that can be assigned together while still allowing individual permission cherry-picking.

**Database Schema**:
```sql
CREATE TABLE permission_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50),  -- 'work_orders', 'inventory', 'financial', etc.
  is_system BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permission_group_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES permission_groups(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(group_id, permission_id)
);

-- Assign groups to roles
CREATE TABLE role_permission_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  group_id UUID REFERENCES permission_groups(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(role_id, group_id)
);
```

**TypeScript Models**:
```typescript
interface PermissionGroup {
  id: string;
  name: string;
  description: string;
  category: 'work_orders' | 'inventory' | 'purchasing' | 'financial' | 'crm' | 'dispatch' | 'admin';
  permissions: Permission[];
  isSystem: boolean;
}

// Example groups
const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    name: 'Work Order Basic Access',
    category: 'work_orders',
    permissions: [
      'work_orders:read:own',
      'work_orders:update:own',
      'work_orders:create_notes',
      'work_orders:upload_photos'
    ]
  },
  {
    name: 'Work Order Full Management',
    category: 'work_orders',
    permissions: [
      'work_orders:read:all',
      'work_orders:create',
      'work_orders:update:all',
      'work_orders:delete',
      'work_orders:approve',
      'work_orders:assign',
      'work_orders:close'
    ]
  },
  {
    name: 'Inventory Viewer',
    category: 'inventory',
    permissions: [
      'inventory:read:all',
      'inventory:search',
      'inventory:export'
    ]
  },
  {
    name: 'Inventory Manager',
    category: 'inventory',
    permissions: [
      'inventory:read:all',
      'inventory:create',
      'inventory:update',
      'inventory:delete',
      'inventory:adjust',
      'inventory:transfer',
      'inventory:count'
    ]
  },
  {
    name: 'Financial Viewer',
    category: 'financial',
    permissions: [
      'financial:view:revenue',
      'financial:view:expenses',
      'financial:view:reports',
      'dashboard:view:financial'
    ]
  },
  {
    name: 'Financial Manager',
    category: 'financial',
    permissions: [
      'financial:view:all',
      'financial:manage:invoices',
      'financial:manage:payments',
      'financial:approve:expenses',
      'financial:export'
    ]
  },
  {
    name: 'Dispatch Basic',
    category: 'dispatch',
    permissions: [
      'dispatch:view:schedule',
      'dispatch:assign:work_orders',
      'dispatch:update:status'
    ]
  },
  {
    name: 'Dispatch Advanced',
    category: 'dispatch',
    permissions: [
      'dispatch:view:all',
      'dispatch:create:work_orders',
      'dispatch:reassign:any',
      'dispatch:optimize:routes',
      'dispatch:manage:overtime'
    ]
  }
];
```

**API Endpoints**:
```typescript
// Get all permission groups
GET /api/v1/permission-groups
Response: PermissionGroup[]

// Get permissions in a group
GET /api/v1/permission-groups/:groupId/permissions
Response: Permission[]

// Assign permission group to role
POST /api/v1/roles/:roleId/permission-groups
Body: { groupId: string }

// Assign permission group to user (override)
POST /api/v1/users/:userId/permission-groups
Body: { groupId: string, expiresAt?: Date }
```

**Benefits**:
- Faster role customization (assign groups instead of 50+ individual permissions)
- Reduces human error in permission assignment
- Logical organization makes system easier to understand
- Still allows individual permission cherry-picking when needed
- Easier onboarding for new admins

---

#### 3. Data-Level Permission Scopes (Row-Level Security)

**Problem**: Current permissions are feature-based (can access work orders) but not data-based (which work orders). Need explicit scopes for "own", "team", "department", "all".

**Solution**: Add data scope to every permission and enforce at query level.

**Permission Naming Convention**:
```
Format: {resource}:{action}:{scope}

Examples:
- work_orders:read:own          // Only own work orders
- work_orders:read:team         // Team's work orders
- work_orders:read:department   // Department work orders
- work_orders:read:all          // All work orders
- work_orders:update:own        // Update only own
- work_orders:update:team       // Update team's work orders
- work_orders:delete:all        // Delete any work order
```

**Database Schema Update**:
```sql
ALTER TABLE permissions ADD COLUMN data_scope VARCHAR(20);
-- Values: 'own', 'team', 'department', 'all', 'none'

-- Add organizational structure to users
ALTER TABLE users ADD COLUMN department_id UUID REFERENCES departments(id);
ALTER TABLE users ADD COLUMN team_id UUID REFERENCES teams(id);

CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  parent_id UUID REFERENCES departments(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  department_id UUID REFERENCES departments(id),
  manager_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**TypeScript Models**:
```typescript
type DataScope = 'own' | 'team' | 'department' | 'all' | 'none';

interface Permission {
  id: string;
  name: string;          // Full name: work_orders:read:team
  resource: string;      // work_orders
  action: string;        // read
  dataScope: DataScope;  // team
  category: string;
  isSystem: boolean;
}

interface User {
  id: string;
  email: string;
  teamId?: string;
  departmentId?: string;
  // ... other fields
}
```

**Permission Checking Service**:
```typescript
class PermissionService {
  async checkDataAccess(
    userId: string,
    resource: string,
    action: string,
    targetData: any
  ): Promise<boolean> {
    const user = await this.getUser(userId);
    const permissions = await this.getUserPermissions(userId);
    
    // Find matching permission
    const permission = permissions.find(p => 
      p.resource === resource && p.action === action
    );
    
    if (!permission) return false;
    
    // Check scope
    switch (permission.dataScope) {
      case 'all':
        return true;
        
      case 'department':
        return targetData.departmentId === user.departmentId;
        
      case 'team':
        return targetData.teamId === user.teamId;
        
      case 'own':
        return targetData.userId === userId || 
               targetData.createdBy === userId ||
               targetData.assignedTo === userId;
        
      case 'none':
        return false;
        
      default:
        return false;
    }
  }
  
  // Generate WHERE clause based on permissions
  async getDataScopeFilter(
    userId: string,
    resource: string,
    action: string
  ): Promise<Prisma.WorkOrderWhereInput> {
    const user = await this.getUser(userId);
    const permissions = await this.getUserPermissions(userId);
    
    const permission = permissions.find(p => 
      p.resource === resource && p.action === action
    );
    
    if (!permission) {
      throw new UnauthorizedException();
    }
    
    switch (permission.dataScope) {
      case 'all':
        return {};  // No filter
        
      case 'department':
        return { departmentId: user.departmentId };
        
      case 'team':
        return { teamId: user.teamId };
        
      case 'own':
        return {
          OR: [
            { assignedTo: userId },
            { createdBy: userId }
          ]
        };
        
      default:
        throw new UnauthorizedException();
    }
  }
}
```

**Usage in Controllers**:
```typescript
@Get('work-orders')
async getWorkOrders(@CurrentUser() user: User) {
  // Get scope filter based on permissions
  const scopeFilter = await this.permissionService.getDataScopeFilter(
    user.id,
    'work_orders',
    'read'
  );
  
  // Apply filter to query
  const workOrders = await this.prisma.workOrder.findMany({
    where: {
      ...scopeFilter,
      // ... other filters
    }
  });
  
  return workOrders;
}
```

**Updated Permission Matrix Examples**:
| Role | Work Orders | Inventory | Financial |
|------|-------------|-----------|-----------|
| Technician | read:own, update:own | read:all | none |
| Lead Tech | read:team, update:team | read:all | none |
| Field Manager | read:all, update:all | read:all | read:department |
| Admin | read:all, update:all, delete:all | read:all, update:all | read:all |

**Benefits**:
- Explicit, enforceable data boundaries
- Better multi-tenant support
- Prevents unauthorized data access
- Clear audit trail of who accessed what data
- Easier to reason about security

---

#### 4. Simplified Owner/CEO Permission Implementation

**Problem**: Owner/CEO is defined as "all permissions from all roles except Super Admin" which is complex to maintain as roles evolve.

**Solution**: Use dynamic permission aggregation or wildcard permissions with exclusions.

**Option 1: Dynamic Permission Aggregation** (Recommended)
```typescript
class OwnerCeoPermissionService {
  async getOwnerCeoPermissions(): Promise<Permission[]> {
    // Get all roles except Super Admin
    const allRoles = await this.prisma.role.findMany({
      where: { 
        name: { not: 'Super Admin' }
      },
      include: {
        rolePermissions: {
          include: { permission: true }
        }
      }
    });
    
    // Aggregate all unique permissions
    const allPermissions = new Map<string, Permission>();
    
    for (const role of allRoles) {
      for (const rp of role.rolePermissions) {
        allPermissions.set(rp.permission.id, rp.permission);
      }
    }
    
    return Array.from(allPermissions.values());
  }
  
  async assignOwnerCeoRole(userId: string): Promise<void> {
    // Create user role assignment
    await this.prisma.userRole.create({
      data: {
        userId,
        roleId: OWNER_CEO_ROLE_ID
      }
    });
    
    // Owner/CEO permissions are computed dynamically, not stored
  }
  
  async getUserPermissions(userId: string): Promise<Permission[]> {
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: { role: true }
    });
    
    // Check if user has Owner/CEO role
    const hasOwnerCeoRole = userRoles.some(
      ur => ur.role.name === 'Owner/CEO'
    );
    
    if (hasOwnerCeoRole) {
      // Return dynamically aggregated permissions
      return await this.getOwnerCeoPermissions();
    }
    
    // ... regular permission logic
  }
}
```

**Option 2: Permission Wildcard System**
```typescript
interface Permission {
  id: string;
  name: string;
  resource: string;  // Can be '*' for wildcard
  action: string;    // Can be '*' for wildcard
  dataScope: string;
  excludes?: string[]; // Excluded permissions
}

// Owner/CEO permission definition
const OWNER_CEO_PERMISSION: Permission = {
  id: 'owner-ceo-wildcard',
  name: 'owner:all_operational',
  resource: '*',
  action: '*',
  dataScope: 'all',
  excludes: [
    'system:*',           // All system permissions
    'roles:manage:*',     // Role management
    'users:delete:*',     // User deletion
    'audit:delete:*',     // Audit log deletion
    'api_keys:*'          // API key management
  ]
};

// Permission checking with wildcard support
function hasPermission(
  userPermissions: Permission[],
  required: string
): boolean {
  for (const perm of userPermissions) {
    // Check for wildcard match
    if (perm.resource === '*' && perm.action === '*') {
      // Check if required permission is excluded
      const isExcluded = perm.excludes?.some(exclude => 
        required.match(new RegExp(exclude.replace('*', '.*')))
      );
      
      if (!isExcluded) return true;
    }
    
    // Regular permission match
    if (perm.name === required) return true;
  }
  
  return false;
}
```

**Database Seeding**:
```typescript
async function seedOwnerCeoRole() {
  // Create Owner/CEO role
  const ownerCeoRole = await prisma.role.create({
    data: {
      name: 'Owner/CEO',
      description: 'Executive leadership with all operational permissions',
      isDefault: true,
      canBeEditedByAdmin: false
    }
  });
  
  // Option 1: No permissions stored (dynamic aggregation)
  // Permissions are computed at runtime from all other roles
  
  // Option 2: Store wildcard permission
  const wildcardPermission = await prisma.permission.create({
    data: {
      name: 'owner:all_operational',
      resource: '*',
      action: '*',
      dataScope: 'all',
      category: 'executive',
      isSystem: true
    }
  });
  
  await prisma.rolePermission.create({
    data: {
      roleId: ownerCeoRole.id,
      permissionId: wildcardPermission.id
    }
  });
}
```

**Benefits**:
- Automatically includes new permissions added to other roles
- No manual maintenance needed when permissions change
- Clear exclusion of Super Admin capabilities
- Simple to understand and audit
- Reduces permission synchronization issues

**Recommendation**: Use **Option 1 (Dynamic Aggregation)** for better clarity and auditability. Cache the result with invalidation when roles/permissions change.

---

### Priority 2: Should Have (Phase 2 Implementation)

#### 5. Role Templates and Inheritance

**Problem**: Creating custom roles from scratch is complex with 100+ permissions. Need easier way to create variations of existing roles.

**Solution**: Add role templates with inheritance and modification capabilities.

**Database Schema**:
```sql
CREATE TABLE role_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  base_role_id UUID REFERENCES roles(id),  -- Inherit from this role
  is_system BOOLEAN DEFAULT false,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role_template_modifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID REFERENCES role_templates(id) ON DELETE CASCADE,
  modification_type VARCHAR(20) NOT NULL,  -- 'add' or 'remove'
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE roles ADD COLUMN based_on_template_id UUID REFERENCES role_templates(id);
ALTER TABLE roles ADD COLUMN inherits_from_role_id UUID REFERENCES roles(id);
```

**TypeScript Models**:
```typescript
interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  baseRoleId?: string;  // Role to inherit from
  modifications: RoleModification[];
  isSystem: boolean;
  createdBy: string;
}

interface RoleModification {
  type: 'add' | 'remove';
  permissionId: string;
  permission?: Permission;
}

interface Role {
  id: string;
  name: string;
  description: string;
  basedOnTemplateId?: string;
  inheritsFromRoleId?: string;  // Parent role for inheritance
  // ... other fields
}
```

**Example Role Templates**:
```typescript
const ROLE_TEMPLATES = [
  {
    name: 'Senior Technician',
    baseRole: 'Technician',
    modifications: [
      { type: 'add', permission: 'work_orders:approve:own' },
      { type: 'add', permission: 'technicians:mentor' },
      { type: 'add', permission: 'dashboard:view:operations' },
      { type: 'add', permission: 'training:access:advanced' }
    ]
  },
  {
    name: 'Regional Manager',
    baseRole: 'Field Manager',
    modifications: [
      { type: 'add', permission: 'users:manage:region' },
      { type: 'add', permission: 'financial:view:region' },
      { type: 'add', permission: 'reports:regional:all' }
    ]
  },
  {
    name: 'Inventory Specialist',
    baseRole: 'Warehouse Personnel',
    modifications: [
      { type: 'add', permission: 'inventory:create:sku' },
      { type: 'add', permission: 'inventory:adjust:small' },
      { type: 'add', permission: 'reports:inventory:basic' }
    ]
  },
  {
    name: 'Limited Admin',
    baseRole: 'Admin',
    modifications: [
      { type: 'remove', permission: 'financial:manage' },
      { type: 'remove', permission: 'users:delete' },
      { type: 'remove', permission: 'purchasing:approve:large' }
    ]
  }
];
```

**API Endpoints**:
```typescript
// Create role from template
POST /api/v1/roles/from-template
Body: {
  templateId: string,
  name: string,
  description?: string,
  additionalModifications?: RoleModification[]
}

// Clone existing role
POST /api/v1/roles/:roleId/clone
Body: {
  name: string,
  modifications?: RoleModification[]
}

// Get role with inheritance tree
GET /api/v1/roles/:roleId/inheritance
Response: {
  role: Role,
  inheritedFrom?: Role,
  effectivePermissions: Permission[]
}
```

**Role Creation Service**:
```typescript
class RoleTemplateService {
  async createRoleFromTemplate(
    templateId: string,
    name: string,
    modifications?: RoleModification[]
  ): Promise<Role> {
    const template = await this.getTemplate(templateId);
    
    // Get base role permissions
    const basePermissions = await this.getRolePermissions(template.baseRoleId);
    
    // Apply template modifications
    let effectivePermissions = this.applyModifications(
      basePermissions,
      template.modifications
    );
    
    // Apply additional custom modifications
    if (modifications) {
      effectivePermissions = this.applyModifications(
        effectivePermissions,
        modifications
      );
    }
    
    // Create new role
    const role = await this.prisma.role.create({
      data: {
        name,
        basedOnTemplateId: templateId,
        inheritsFromRoleId: template.baseRoleId
      }
    });
    
    // Assign permissions
    await this.assignPermissions(role.id, effectivePermissions);
    
    return role;
  }
  
  applyModifications(
    permissions: Permission[],
    modifications: RoleModification[]
  ): Permission[] {
    let result = [...permissions];
    
    for (const mod of modifications) {
      if (mod.type === 'add') {
        if (!result.find(p => p.id === mod.permissionId)) {
          result.push(mod.permission);
        }
      } else if (mod.type === 'remove') {
        result = result.filter(p => p.id !== mod.permissionId);
      }
    }
    
    return result;
  }
}
```

**Benefits**:
- Easy creation of role variations
- Clear inheritance chain for understanding
- Reduces duplication of permission assignments
- Faster role customization
- Changes to templates can cascade (optional)

---

#### 6. Approval Workflows for Sensitive Permissions

**Problem**: Some permission changes are too sensitive for immediate effect (e.g., granting financial access, editing Owner/CEO role).

**Solution**: Add approval workflow system for permission and role changes.

**Database Schema**:
```sql
CREATE TABLE permission_change_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requested_by UUID REFERENCES users(id) NOT NULL,
  target_user_id UUID REFERENCES users(id),
  target_role_id UUID REFERENCES roles(id),
  change_type VARCHAR(50) NOT NULL,  -- 'grant_permission', 'revoke_permission', 'assign_role', 'edit_role'
  permission_id UUID REFERENCES permissions(id),
  role_id UUID REFERENCES roles(id),
  reason TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',  -- 'pending', 'approved', 'rejected', 'expired'
  approved_by UUID REFERENCES users(id),
  approval_comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  resolved_at TIMESTAMP
);

CREATE TABLE approval_workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  trigger_condition JSONB NOT NULL,  -- Conditions that trigger approval
  required_approver_role VARCHAR(100),  -- Role that must approve
  auto_expire_hours INTEGER DEFAULT 72,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**TypeScript Models**:
```typescript
interface PermissionChangeRequest {
  id: string;
  requestedBy: string;
  targetUserId?: string;
  targetRoleId?: string;
  changeType: 'grant_permission' | 'revoke_permission' | 'assign_role' | 'edit_role' | 'create_role';
  permissionId?: string;
  roleId?: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  approvedBy?: string;
  approvalComment?: string;
  createdAt: Date;
  expiresAt: Date;
  resolvedAt?: Date;
}

interface ApprovalWorkflow {
  id: string;
  name: string;
  triggerCondition: {
    resourceType: string;  // 'permission', 'role', 'user'
    action: string;        // 'grant', 'revoke', 'edit'
    conditions: Array<{
      field: string;       // 'permission.category', 'role.name', etc.
      operator: string;    // 'equals', 'contains', 'in'
      value: any;
    }>;
  };
  requiredApproverRole: string;  // 'Super Admin', 'Owner/CEO', etc.
  autoExpireHours: number;
}
```

**Workflow Definitions**:
```typescript
const APPROVAL_WORKFLOWS: ApprovalWorkflow[] = [
  {
    name: 'Financial Permission Changes',
    triggerCondition: {
      resourceType: 'permission',
      action: 'grant',
      conditions: [
        { field: 'permission.category', operator: 'equals', value: 'financial' }
      ]
    },
    requiredApproverRole: 'Owner/CEO',
    autoExpireHours: 48
  },
  {
    name: 'Owner/CEO Role Changes',
    triggerCondition: {
      resourceType: 'role',
      action: 'edit',
      conditions: [
        { field: 'role.name', operator: 'equals', value: 'Owner/CEO' }
      ]
    },
    requiredApproverRole: 'Super Admin',
    autoExpireHours: 72
  },
  {
    name: 'User Deletion Requests',
    triggerCondition: {
      resourceType: 'user',
      action: 'delete',
      conditions: []
    },
    requiredApproverRole: 'Super Admin',
    autoExpireHours: 24
  },
  {
    name: 'Sensitive Permission Grants',
    triggerCondition: {
      resourceType: 'permission',
      action: 'grant',
      conditions: [
        { 
          field: 'permission.name', 
          operator: 'in', 
          value: ['users:delete', 'audit:delete', 'system:*'] 
        }
      ]
    },
    requiredApproverRole: 'Super Admin',
    autoExpireHours: 48
  }
];
```

**API Endpoints**:
```typescript
// Request permission change (returns request or applies immediately if no approval needed)
POST /api/v1/permission-change-requests
Body: {
  targetUserId: string,
  changeType: string,
  permissionId?: string,
  roleId?: string,
  reason: string
}
Response: {
  requiresApproval: boolean,
  requestId?: string,
  message: string
}

// Get pending requests (for approvers)
GET /api/v1/permission-change-requests/pending
Response: PermissionChangeRequest[]

// Approve/reject request
POST /api/v1/permission-change-requests/:requestId/approve
Body: { comment?: string }

POST /api/v1/permission-change-requests/:requestId/reject
Body: { comment: string }

// Get user's requests
GET /api/v1/users/:userId/permission-requests
Response: PermissionChangeRequest[]
```

**Approval Service**:
```typescript
class ApprovalWorkflowService {
  async requestPermissionChange(
    requestedBy: string,
    changeRequest: PermissionChangeRequest
  ): Promise<{ requiresApproval: boolean, requestId?: string }> {
    // Check if change requires approval
    const workflow = await this.findMatchingWorkflow(changeRequest);
    
    if (!workflow) {
      // No approval needed, apply immediately
      await this.applyPermissionChange(changeRequest);
      return { requiresApproval: false };
    }
    
    // Create approval request
    const request = await this.prisma.permissionChangeRequest.create({
      data: {
        ...changeRequest,
        requestedBy,
        status: 'pending',
        expiresAt: new Date(Date.now() + workflow.autoExpireHours * 60 * 60 * 1000)
      }
    });
    
    // Notify approvers
    await this.notifyApprovers(request, workflow);
    
    return { requiresApproval: true, requestId: request.id };
  }
  
  async approveRequest(requestId: string, approvedBy: string, comment?: string) {
    const request = await this.getRequest(requestId);
    
    // Verify approver has permission
    const canApprove = await this.canApproveRequest(approvedBy, request);
    if (!canApprove) {
      throw new UnauthorizedException('Insufficient permissions to approve');
    }
    
    // Update request
    await this.prisma.permissionChangeRequest.update({
      where: { id: requestId },
      data: {
        status: 'approved',
        approvedBy,
        approvalComment: comment,
        resolvedAt: new Date()
      }
    });
    
    // Apply the change
    await this.applyPermissionChange(request);
    
    // Notify requester
    await this.notifyRequester(request, 'approved');
    
    // Log to audit
    await this.auditLog.log({
      action: 'permission_request_approved',
      userId: approvedBy,
      details: { requestId, targetUserId: request.targetUserId }
    });
  }
  
  async findMatchingWorkflow(
    request: PermissionChangeRequest
  ): Promise<ApprovalWorkflow | null> {
    const workflows = await this.getActiveWorkflows();
    
    for (const workflow of workflows) {
      if (this.matchesWorkflow(request, workflow)) {
        return workflow;
      }
    }
    
    return null;
  }
}
```

**Benefits**:
- Prevents unauthorized privilege escalation
- Creates accountability for sensitive changes
- Audit trail of who requested and approved what
- Automatic expiration prevents stale requests
- Configurable workflows for different organizations

---

#### 7. Permission Conflict and Violation Detection

**Problem**: No system to prevent incompatible permission combinations or enforce separation of duties.

**Solution**: Add permission rule engine that validates permission assignments.

**Database Schema**:
```sql
CREATE TABLE permission_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  rule_type VARCHAR(50) NOT NULL,  -- 'conflict', 'prerequisite', 'mutual_exclusion', 'separation_of_duty'
  severity VARCHAR(20) DEFAULT 'warning',  -- 'error', 'warning', 'info'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permission_rule_conditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rule_id UUID REFERENCES permission_rules(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id),
  condition_type VARCHAR(50),  -- 'required', 'forbidden', 'prerequisite'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**TypeScript Models**:
```typescript
interface PermissionRule {
  id: string;
  name: string;
  description: string;
  ruleType: 'conflict' | 'prerequisite' | 'mutual_exclusion' | 'separation_of_duty';
  severity: 'error' | 'warning' | 'info';
  permissions: string[];  // Permission IDs involved
  isActive: boolean;
}

interface RuleViolation {
  rule: PermissionRule;
  violationType: string;
  message: string;
  affectedPermissions: Permission[];
  severity: 'error' | 'warning' | 'info';
}
```

**Rule Definitions**:
```typescript
const PERMISSION_RULES: PermissionRule[] = [
  {
    name: 'Separation of Duties: Work Order Creation and Approval',
    ruleType: 'conflict',
    severity: 'error',
    permissions: ['work_orders:create', 'work_orders:approve'],
    description: 'Users who create work orders should not approve them to prevent conflicts of interest'
  },
  {
    name: 'Financial Viewing Prerequisite',
    ruleType: 'prerequisite',
    severity: 'error',
    permissions: ['financial:manage', 'financial:view'],
    description: 'Must have financial:view before getting financial:manage'
  },
  {
    name: 'Mutual Exclusion: Technician and Dispatcher Roles',
    ruleType: 'mutual_exclusion',
    severity: 'warning',
    permissions: ['work_orders:execute:own', 'dispatch:assign:all'],
    description: 'Technicians should not assign their own work orders'
  },
  {
    name: 'Purchasing Approval Prerequisite',
    ruleType: 'prerequisite',
    severity: 'error',
    permissions: ['purchasing:approve', 'purchasing:create'],
    description: 'Must be able to create POs before approving them'
  },
  {
    name: 'Inventory Adjustment Requires View',
    ruleType: 'prerequisite',
    severity: 'error',
    permissions: ['inventory:adjust', 'inventory:read'],
    description: 'Cannot adjust inventory without viewing capability'
  },
  {
    name: 'Self-Permission Escalation Prevention',
    ruleType: 'conflict',
    severity: 'error',
    permissions: ['users:assign_roles', 'users:edit:own'],
    description: 'Users should not be able to change their own roles'
  }
];
```

**Rule Validation Service**:
```typescript
class PermissionRuleService {
  async validatePermissionAssignment(
    userId: string,
    newPermissions: string[]
  ): Promise<{ valid: boolean, violations: RuleViolation[] }> {
    const currentPermissions = await this.getUserPermissions(userId);
    const combinedPermissions = [...currentPermissions, ...newPermissions];
    
    const violations: RuleViolation[] = [];
    const rules = await this.getActiveRules();
    
    for (const rule of rules) {
      const violation = this.checkRule(rule, combinedPermissions);
      if (violation) {
        violations.push(violation);
      }
    }
    
    const hasErrors = violations.some(v => v.severity === 'error');
    
    return {
      valid: !hasErrors,
      violations
    };
  }
  
  checkRule(
    rule: PermissionRule,
    userPermissions: string[]
  ): RuleViolation | null {
    switch (rule.ruleType) {
      case 'conflict':
        return this.checkConflict(rule, userPermissions);
        
      case 'prerequisite':
        return this.checkPrerequisite(rule, userPermissions);
        
      case 'mutual_exclusion':
        return this.checkMutualExclusion(rule, userPermissions);
        
      case 'separation_of_duty':
        return this.checkSeparationOfDuty(rule, userPermissions);
        
      default:
        return null;
    }
  }
  
  checkConflict(rule: PermissionRule, userPermissions: string[]): RuleViolation | null {
    const hasAll = rule.permissions.every(p => userPermissions.includes(p));
    
    if (hasAll) {
      return {
        rule,
        violationType: 'conflict',
        message: rule.description,
        affectedPermissions: rule.permissions,
        severity: rule.severity
      };
    }
    
    return null;
  }
  
  checkPrerequisite(rule: PermissionRule, userPermissions: string[]): RuleViolation | null {
    // First permission is the one being granted
    // Second permission is the prerequisite
    const [granted, prerequisite] = rule.permissions;
    
    if (userPermissions.includes(granted) && !userPermissions.includes(prerequisite)) {
      return {
        rule,
        violationType: 'prerequisite',
        message: `${granted} requires ${prerequisite}`,
        affectedPermissions: rule.permissions,
        severity: rule.severity
      };
    }
    
    return null;
  }
}
```

**API Integration**:
```typescript
@Post('users/:userId/permissions')
async assignPermission(
  @Param('userId') userId: string,
  @Body() body: { permissionId: string }
) {
  // Validate against rules
  const validation = await this.ruleService.validatePermissionAssignment(
    userId,
    [body.permissionId]
  );
  
  if (!validation.valid) {
    const errors = validation.violations.filter(v => v.severity === 'error');
    throw new BadRequestException({
      message: 'Permission assignment violates security rules',
      violations: errors
    });
  }
  
  // Show warnings but allow assignment
  if (validation.violations.length > 0) {
    // Log warnings
    this.logger.warn('Permission assignment has warnings', {
      userId,
      violations: validation.violations
    });
  }
  
  // Proceed with assignment
  return await this.permissionService.assignPermission(userId, body.permissionId);
}
```

**Benefits**:
- Prevents privilege escalation
- Enforces security best practices
- Catches risky permission combinations
- Clear error messages for admins
- Configurable rules per organization
- Audit trail of violations

---

### Priority 3: Nice to Have (Future Enhancements)

#### 8. Time-Based and Conditional Permissions

**Problem**: Some permissions should be temporary or restricted to specific contexts (time, location, conditions).

**Solution**: Add permission modifiers for temporal and conditional access.

**Database Schema**:
```sql
CREATE TABLE permission_conditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_permission_id UUID REFERENCES user_permission_overrides(id) ON DELETE CASCADE,
  condition_type VARCHAR(50) NOT NULL,  -- 'time', 'ip', 'location', 'mfa', 'approval'
  condition_value JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**TypeScript Models**:
```typescript
interface PermissionCondition {
  type: 'time_restriction' | 'ip_restriction' | 'location_restriction' | 'mfa_required' | 'requires_approval';
  value: TimeRestriction | IpRestriction | LocationRestriction | MfaRequirement;
}

interface TimeRestriction {
  daysOfWeek: number[];  // 0-6 (Sunday-Saturday)
  startTime: string;     // HH:MM
  endTime: string;       // HH:MM
  timezone: string;
}

interface IpRestriction {
  allowedIps: string[];  // CIDR notation allowed
  allowedRanges: string[];
}

interface LocationRestriction {
  allowedCountries: string[];
  allowedRegions: string[];
  allowedCities: string[];
}

interface MfaRequirement {
  required: boolean;
  methods: ('totp' | 'sms' | 'email')[];
}

interface UserPermissionOverride {
  id: string;
  userId: string;
  permissionId: string;
  isGranted: boolean;
  expiresAt?: Date;
  conditions?: PermissionCondition[];  // NEW
  createdBy: string;
  reason?: string;
}
```

**Permission Checking with Conditions**:
```typescript
class ConditionalPermissionService {
  async checkPermissionWithConditions(
    userId: string,
    permissionName: string,
    context: {
      ipAddress?: string;
      location?: { country: string, region: string };
      hasMfa?: boolean;
      timestamp: Date;
    }
  ): Promise<boolean> {
    const permission = await this.getUserPermission(userId, permissionName);
    
    if (!permission) return false;
    
    // Check conditions
    if (permission.conditions) {
      for (const condition of permission.conditions) {
        const conditionMet = await this.evaluateCondition(condition, context);
        if (!conditionMet) return false;
      }
    }
    
    return true;
  }
  
  async evaluateCondition(
    condition: PermissionCondition,
    context: any
  ): Promise<boolean> {
    switch (condition.type) {
      case 'time_restriction':
        return this.checkTimeRestriction(condition.value, context.timestamp);
        
      case 'ip_restriction':
        return this.checkIpRestriction(condition.value, context.ipAddress);
        
      case 'mfa_required':
        return context.hasMfa === true;
        
      default:
        return true;
    }
  }
  
  checkTimeRestriction(restriction: TimeRestriction, timestamp: Date): boolean {
    const userTime = new Date(timestamp.toLocaleString('en-US', {
      timeZone: restriction.timezone
    }));
    
    const dayOfWeek = userTime.getDay();
    const timeStr = userTime.toTimeString().slice(0, 5); // HH:MM
    
    // Check day of week
    if (!restriction.daysOfWeek.includes(dayOfWeek)) {
      return false;
    }
    
    // Check time range
    if (timeStr < restriction.startTime || timeStr > restriction.endTime) {
      return false;
    }
    
    return true;
  }
  
  checkIpRestriction(restriction: IpRestriction, ipAddress: string): boolean {
    // Check if IP is in allowed list
    if (restriction.allowedIps.includes(ipAddress)) {
      return true;
    }
    
    // Check if IP is in allowed ranges (CIDR notation)
    for (const range of restriction.allowedRanges) {
      if (this.ipInRange(ipAddress, range)) {
        return true;
      }
    }
    
    return false;
  }
}
```

**Usage Examples**:
```typescript
// Grant temporary elevated access during business hours only
await permissionService.grantPermission({
  userId: 'user-123',
  permissionId: 'financial:view:all',
  expiresAt: new Date('2025-12-31'),
  conditions: [
    {
      type: 'time_restriction',
      value: {
        daysOfWeek: [1, 2, 3, 4, 5],  // Monday-Friday
        startTime: '09:00',
        endTime: '17:00',
        timezone: 'America/New_York'
      }
    }
  ]
});

// Require MFA for sensitive operations
await permissionService.grantPermission({
  userId: 'user-456',
  permissionId: 'users:delete',
  conditions: [
    {
      type: 'mfa_required',
      value: { required: true, methods: ['totp'] }
    }
  ]
});

// Restrict to office IP range
await permissionService.grantPermission({
  userId: 'user-789',
  permissionId: 'audit:view:all',
  conditions: [
    {
      type: 'ip_restriction',
      value: {
        allowedIps: [],
        allowedRanges: ['192.168.1.0/24', '10.0.0.0/8']
      }
    }
  ]
});
```

**Benefits**:
- Temporary elevated access for specific projects
- Restrict sensitive operations to business hours
- Require MFA for high-risk actions
- Limit access to specific locations/IPs
- Better compliance with security policies

---

#### 9. Permission Delegation System

**Problem**: When managers are on vacation or unavailable, there's no way to temporarily delegate their permissions.

**Solution**: Add delegation system for temporary permission transfer.

**Database Schema**:
```sql
CREATE TABLE permission_delegations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID REFERENCES users(id) NOT NULL,
  to_user_id UUID REFERENCES users(id) NOT NULL,
  delegation_type VARCHAR(50) DEFAULT 'specific',  -- 'all', 'role', 'specific'
  role_id UUID REFERENCES roles(id),  -- If delegating entire role
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  reason TEXT,
  approved_by UUID REFERENCES users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT no_self_delegation CHECK (from_user_id != to_user_id)
);

CREATE TABLE delegated_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  delegation_id UUID REFERENCES permission_delegations(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(delegation_id, permission_id)
);
```

**TypeScript Models**:
```typescript
interface PermissionDelegation {
  id: string;
  fromUserId: string;
  toUserId: string;
  delegationType: 'all' | 'role' | 'specific';
  roleId?: string;
  permissions?: Permission[];
  startDate: Date;
  endDate: Date;
  reason: string;
  approvedBy?: string;
  isActive: boolean;
}
```

**API Endpoints**:
```typescript
// Create delegation
POST /api/v1/delegations
Body: {
  toUserId: string,
  delegationType: 'all' | 'role' | 'specific',
  roleId?: string,
  permissionIds?: string[],
  startDate: Date,
  endDate: Date,
  reason: string
}

// Get user's delegations (given and received)
GET /api/v1/users/:userId/delegations
Response: {
  delegatedTo: PermissionDelegation[],
  delegatedFrom: PermissionDelegation[]
}

// Revoke delegation early
DELETE /api/v1/delegations/:delegationId

// Get active delegations requiring approval
GET /api/v1/delegations/pending-approval
```

**Delegation Service**:
```typescript
class DelegationService {
  async createDelegation(
    fromUserId: string,
    delegation: CreateDelegationDto
  ): Promise<PermissionDelegation> {
    // Validate delegation
    await this.validateDelegation(fromUserId, delegation);
    
    // Create delegation record
    const created = await this.prisma.permissionDelegation.create({
      data: {
        fromUserId,
        toUserId: delegation.toUserId,
        delegationType: delegation.delegationType,
        roleId: delegation.roleId,
        startDate: delegation.startDate,
        endDate: delegation.endDate,
        reason: delegation.reason,
        isActive: false  // Requires approval
      }
    });
    
    // Add specific permissions if type is 'specific'
    if (delegation.delegationType === 'specific' && delegation.permissionIds) {
      await this.addDelegatedPermissions(created.id, delegation.permissionIds);
    }
    
    // Request approval if needed
    if (this.requiresApproval(delegation)) {
      await this.requestApproval(created.id);
    } else {
      await this.activateDelegation(created.id);
    }
    
    return created;
  }
  
  async getUserEffectivePermissions(userId: string): Promise<Permission[]> {
    // Get user's own permissions
    const ownPermissions = await this.getOwnPermissions(userId);
    
    // Get delegated permissions (active and current)
    const delegations = await this.prisma.permissionDelegation.findMany({
      where: {
        toUserId: userId,
        isActive: true,
        startDate: { lte: new Date() },
        endDate: { gte: new Date() }
      },
      include: {
        delegatedPermissions: {
          include: { permission: true }
        }
      }
    });
    
    // Aggregate delegated permissions
    const delegatedPerms: Permission[] = [];
    for (const delegation of delegations) {
      if (delegation.delegationType === 'all') {
        const allFromUser = await this.getOwnPermissions(delegation.fromUserId);
        delegatedPerms.push(...allFromUser);
      } else if (delegation.delegationType === 'role') {
        const rolePerms = await this.getRolePermissions(delegation.roleId);
        delegatedPerms.push(...rolePerms);
      } else {
        delegatedPerms.push(...delegation.delegatedPermissions.map(dp => dp.permission));
      }
    }
    
    // Combine and deduplicate
    return this.uniquePermissions([...ownPermissions, ...delegatedPerms]);
  }
  
  // Auto-expire delegations
  @Cron('0 0 * * *')  // Daily at midnight
  async expireDelegations() {
    await this.prisma.permissionDelegation.updateMany({
      where: {
        endDate: { lt: new Date() },
        isActive: true
      },
      data: { isActive: false }
    });
  }
}
```

**Benefits**:
- Continuity when managers are unavailable
- No permanent permission changes needed
- Full audit trail of delegations
- Automatic expiration prevents orphaned permissions
- Approval workflow for sensitive delegations

---

#### 10. Bulk Permission Operations

**Problem**: Assigning/revoking permissions for multiple users one-by-one is time-consuming.

**Solution**: Add bulk operation APIs.

**API Endpoints**:
```typescript
// Bulk assign permissions to multiple users
POST /api/v1/permissions/bulk-assign
Body: {
  userIds: string[],
  permissionIds?: string[],
  roleId?: string,
  reason: string,
  expiresAt?: Date
}

// Bulk revoke permissions
POST /api/v1/permissions/bulk-revoke
Body: {
  userIds: string[],
  permissionIds?: string[],
  roleId?: string,
  reason: string
}

// Bulk role assignment
POST /api/v1/roles/bulk-assign
Body: {
  userIds: string[],
  roleId: string,
  reason: string
}

// Bulk user import with roles
POST /api/v1/users/bulk-import
Body: {
  users: Array<{
    email: string,
    name: string,
    roleIds: string[],
    permissionIds?: string[]
  }>,
  sendWelcomeEmail: boolean
}
```

**Bulk Operation Service**:
```typescript
class BulkPermissionService {
  async bulkAssignPermissions(
    dto: BulkAssignDto,
    performedBy: string
  ): Promise<{ success: number, failed: number, errors: any[] }> {
    const results = {
      success: 0,
      failed: 0,
      errors: []
    };
    
    // Use transaction for atomicity
    await this.prisma.$transaction(async (tx) => {
      for (const userId of dto.userIds) {
        try {
          // Validate
          const validation = await this.ruleService.validatePermissionAssignment(
            userId,
            dto.permissionIds
          );
          
          if (!validation.valid) {
            results.errors.push({
              userId,
              error: 'Permission rule violation',
              violations: validation.violations
            });
            results.failed++;
            continue;
          }
          
          // Assign permissions
          for (const permissionId of dto.permissionIds) {
            await tx.userPermissionOverride.create({
              data: {
                userId,
                permissionId,
                isGranted: true,
                expiresAt: dto.expiresAt,
                createdBy: performedBy,
                reason: dto.reason
              }
            });
          }
          
          results.success++;
          
        } catch (error) {
          results.errors.push({ userId, error: error.message });
          results.failed++;
        }
      }
    });
    
    // Audit log
    await this.auditLog.log({
      action: 'bulk_permission_assign',
      userId: performedBy,
      details: { ...dto, results }
    });
    
    return results;
  }
}
```

**Benefits**:
- Faster team onboarding
- Consistent permission assignment
- Project-based access management
- Better audit trail
- Reduced admin workload

---

#### 11. Permission Testing and Simulation

**Problem**: Admins don't know what impact permission changes will have before applying them.

**Solution**: Add "what-if" testing and simulation.

**API Endpoints**:
```typescript
// Simulate permission changes
POST /api/v1/permissions/simulate
Body: {
  userId: string,
  proposedChanges: {
    addRoles?: string[],
    removeRoles?: string[],
    addPermissions?: string[],
    removePermissions?: string[]
  }
}
Response: {
  currentPermissions: Permission[],
  effectivePermissions: Permission[],
  newCapabilities: string[],
  removedCapabilities: string[],
  conflicts: RuleViolation[],
  warnings: string[]
}

// Test if user would have permission
POST /api/v1/permissions/test
Body: {
  userId: string,
  permissionName: string,
  context?: {
    ipAddress?: string,
    timestamp?: Date,
    hasMfa?: boolean
  }
}
Response: {
  hasPermission: boolean,
  reason: string,
  conditions?: PermissionCondition[]
}

// Compare two users' permissions
GET /api/v1/permissions/compare
Query: { userId1, userId2 }
Response: {
  user1Only: Permission[],
  user2Only: Permission[],
  shared: Permission[]
}
```

**Simulation Service**:
```typescript
class PermissionSimulationService {
  async simulateChanges(
    userId: string,
    changes: ProposedChanges
  ): Promise<SimulationResult> {
    // Get current state
    const currentPermissions = await this.permissionService.getUserPermissions(userId);
    
    // Simulate changes
    let effectivePermissions = [...currentPermissions];
    
    // Add role permissions
    if (changes.addRoles) {
      for (const roleId of changes.addRoles) {
        const rolePerms = await this.getRolePermissions(roleId);
        effectivePermissions.push(...rolePerms);
      }
    }
    
    // Remove role permissions
    if (changes.removeRoles) {
      for (const roleId of changes.removeRoles) {
        const rolePerms = await this.getRolePermissions(roleId);
        effectivePermissions = effectivePermissions.filter(
          p => !rolePerms.find(rp => rp.id === p.id)
        );
      }
    }
    
    // Add individual permissions
    if (changes.addPermissions) {
      const perms = await this.getPermissions(changes.addPermissions);
      effectivePermissions.push(...perms);
    }
    
    // Remove individual permissions
    if (changes.removePermissions) {
      effectivePermissions = effectivePermissions.filter(
        p => !changes.removePermissions.includes(p.id)
      );
    }
    
    // Deduplicate
    effectivePermissions = this.uniquePermissions(effectivePermissions);
    
    // Check for conflicts
    const conflicts = await this.ruleService.validatePermissions(
      userId,
      effectivePermissions.map(p => p.id)
    );
    
    // Calculate differences
    const newCapabilities = this.calculateNewCapabilities(
      currentPermissions,
      effectivePermissions
    );
    
    const removedCapabilities = this.calculateRemovedCapabilities(
      currentPermissions,
      effectivePermissions
    );
    
    return {
      currentPermissions,
      effectivePermissions,
      newCapabilities,
      removedCapabilities,
      conflicts: conflicts.violations,
      warnings: this.generateWarnings(effectivePermissions)
    };
  }
  
  calculateNewCapabilities(current: Permission[], proposed: Permission[]): string[] {
    const newPerms = proposed.filter(
      p => !current.find(c => c.id === p.id)
    );
    
    return newPerms.map(p => this.describeCapability(p));
  }
  
  describeCapability(permission: Permission): string {
    const descriptions = {
      'work_orders:delete:all': 'Delete any work order',
      'financial:view:all': 'View all financial data',
      'users:delete': 'Delete user accounts',
      // ... more descriptions
    };
    
    return descriptions[permission.name] || permission.name;
  }
}
```

**UI Integration**:
```typescript
// Admin UI - Role assignment with preview
function RoleAssignmentForm() {
  const [simulation, setSimulation] = useState(null);
  
  const handleRoleChange = async (roleId) => {
    const result = await api.post('/permissions/simulate', {
      userId: selectedUser.id,
      proposedChanges: { addRoles: [roleId] }
    });
    
    setSimulation(result);
  };
  
  return (
    <div>
      <select onChange={(e) => handleRoleChange(e.target.value)}>
        {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
      </select>
      
      {simulation && (
        <div className="simulation-preview">
          <h3>Preview of Changes</h3>
          
          <div className="new-capabilities">
            <h4>New Capabilities ({simulation.newCapabilities.length})</h4>
            <ul>
              {simulation.newCapabilities.map(cap => <li key={cap}>{cap}</li>)}
            </ul>
          </div>
          
          {simulation.conflicts.length > 0 && (
            <div className="conflicts">
              <h4>⚠️ Conflicts Detected</h4>
              {simulation.conflicts.map(conflict => (
                <div key={conflict.rule.id} className="conflict-item">
                  {conflict.message}
                </div>
              ))}
            </div>
          )}
          
          <button onClick={applyChanges}>Apply Changes</button>
        </div>
      )}
    </div>
  );
}
```

**Benefits**:
- Preview permission changes before applying
- Understand impact of role assignments
- Training tool for new admins
- Prevent accidental privilege escalation
- Better change management

---

#### 12. Enhanced Admin Permission Restrictions

**Problem**: Admin role has broad access but unclear boundaries, especially for audit logs.

**Solution**: More granular Admin permissions with limited audit access.

**Updated Admin Permissions**:
```typescript
const ADMIN_PERMISSIONS = [
  // User Management (Limited)
  'users:view:all',
  'users:create',
  'users:edit',              // Can edit users
  'users:deactivate',        // Can deactivate (not delete)
  // 'users:delete' - REMOVED (Super Admin only)
  
  // Role Management (Conditional)
  'roles:view',
  'roles:edit:editable',     // Only roles where can_be_edited_by_admin = true
  'roles:create:custom',     // Can create new roles
  // 'roles:edit:protected' - REMOVED (Super Admin only)
  
  // Audit Logs (Limited)
  'audit:view:user_activity',      // NEW: View user login/logout
  'audit:view:business_operations', // NEW: View work orders, inventory changes
  'audit:view:financial',           // NEW: View financial transactions
  // 'audit:view:system' - REMOVED (Super Admin only for system changes)
  // 'audit:view:permissions' - REMOVED (Super Admin only for role/permission changes)
  // 'audit:delete' - REMOVED (Super Admin only)
  
  // Full Business Access
  'work_orders:*',
  'inventory:*',
  'purchasing:*',
  'crm:*',
  'dispatch:*',
  'financial:*',
  'dashboard:*',
  'reports:*'
];
```

**Audit Log Categories**:
```sql
ALTER TABLE audit_logs ADD COLUMN log_category VARCHAR(50);
-- Categories: 'user_activity', 'business_operations', 'financial', 'system', 'permissions'

CREATE INDEX idx_audit_logs_category ON audit_logs(log_category);
```

**Audit Access Control**:
```typescript
class AuditLogService {
  async getAuditLogs(
    userId: string,
    filters: AuditLogFilters
  ): Promise<AuditLog[]> {
    const userPermissions = await this.permissionService.getUserPermissions(userId);
    
    // Build category filter based on permissions
    const allowedCategories: string[] = [];
    
    if (userPermissions.includes('audit:view:user_activity')) {
      allowedCategories.push('user_activity');
    }
    if (userPermissions.includes('audit:view:business_operations')) {
      allowedCategories.push('business_operations');
    }
    if (userPermissions.includes('audit:view:financial')) {
      allowedCategories.push('financial');
    }
    if (userPermissions.includes('audit:view:system')) {
      allowedCategories.push('system');
    }
    if (userPermissions.includes('audit:view:permissions')) {
      allowedCategories.push('permissions');
    }
    
    if (allowedCategories.length === 0) {
      throw new UnauthorizedException('No audit log access');
    }
    
    return await this.prisma.auditLog.findMany({
      where: {
        log_category: { in: allowedCategories },
        ...filters
      },
      orderBy: { created_at: 'desc' }
    });
  }
}
```

**Benefits**:
- Admins can view business-related audit logs
- System configuration changes remain Super Admin only
- Better separation of duties
- Clearer permission boundaries
- Compliance-friendly audit access

---

## Critical Security Enhancements

After comprehensive review, the following security features must be added to meet enterprise standards:

### 1. Advanced Authentication & Identity

#### Single Sign-On (SSO) Integration
**Priority**: Must Have

**Supported Protocols**:
```typescript
interface SSOConfig {
  provider: 'saml' | 'oidc' | 'oauth2';
  name: string;
  enabled: boolean;
  config: SAMLConfig | OIDCConfig | OAuth2Config;
}

interface SAMLConfig {
  entryPoint: string;  // IdP login URL
  issuer: string;      // SP entity ID
  cert: string;        // IdP certificate
  wantAssertionsSigned: boolean;
  attributeMapping: {
    email: string;
    firstName: string;
    lastName: string;
    groups?: string;
  };
}

interface OIDCConfig {
  issuer: string;
  clientId: string;
  clientSecret: string;
  authorizationURL: string;
  tokenURL: string;
  userInfoURL: string;
  scopes: string[];
}
```

**Database Schema**:
```sql
CREATE TABLE sso_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id),
  provider_type VARCHAR(20) NOT NULL,  -- 'saml', 'oidc', 'oauth2'
  name VARCHAR(100) NOT NULL,
  enabled BOOLEAN DEFAULT true,
  config JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sso_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  provider_id UUID REFERENCES sso_providers(id),
  session_id VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_session_id (session_id)
);
```

**Benefits**:
- Enterprise customer requirement
- Centralized authentication management
- Reduced password fatigue
- Automatic user provisioning from IdP
- Support for Microsoft Azure AD, Okta, Google Workspace, OneLogin

---

#### Multi-Factor Authentication (MFA)

**Priority**: Must Have

**Supported MFA Methods**:
```typescript
type MFAMethod = 'totp' | 'sms' | 'email' | 'u2f' | 'webauthn';

interface UserMFAConfig {
  userId: string;
  mfaEnabled: boolean;
  enforcedByPolicy: boolean;  // Admin can enforce MFA
  methods: Array<{
    type: MFAMethod;
    enabled: boolean;
    isPrimary: boolean;
    identifier?: string;  // Phone number or email
    secret?: string;      // TOTP secret (encrypted)
    backupCodes?: string[];  // Encrypted recovery codes
    deviceInfo?: {
      name: string;
      registeredAt: Date;
      lastUsed: Date;
    };
  }>;
}

interface MFAPolicy {
  tenantId: string;
  enforceForRoles: string[];  // Require MFA for specific roles
  enforceForPermissions: string[];  // Require MFA for sensitive permissions
  allowedMethods: MFAMethod[];
  backupCodesCount: number;
  totpWindow: number;  // Time window in seconds
}
```

**Database Schema**:
```sql
CREATE TABLE mfa_configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) UNIQUE,
  mfa_enabled BOOLEAN DEFAULT false,
  enforced_by_policy BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mfa_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  method_type VARCHAR(20) NOT NULL,  -- 'totp', 'sms', 'email', 'u2f', 'webauthn'
  is_enabled BOOLEAN DEFAULT true,
  is_primary BOOLEAN DEFAULT false,
  identifier VARCHAR(255),  -- Phone or email
  secret TEXT,  -- Encrypted TOTP secret
  device_name VARCHAR(100),
  device_info JSONB,
  backup_codes TEXT[],  -- Encrypted recovery codes
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used_at TIMESTAMP,
  UNIQUE(user_id, method_type, identifier)
);

CREATE TABLE mfa_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id),
  enforce_for_roles JSONB,  -- Array of role IDs
  enforce_for_permissions JSONB,  -- Array of permission names
  allowed_methods JSONB,  -- Array of allowed MFA methods
  backup_codes_count INTEGER DEFAULT 10,
  totp_window INTEGER DEFAULT 30,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**API Endpoints**:
```typescript
// Setup MFA
POST /api/v1/auth/mfa/setup
Body: { method: MFAMethod }
Response: { secret: string, qrCode: string, backupCodes: string[] }

// Verify MFA setup
POST /api/v1/auth/mfa/verify-setup
Body: { method: MFAMethod, code: string }

// Login with MFA
POST /api/v1/auth/login
Body: { email: string, password: string }
Response: { requiresMFA: boolean, sessionId?: string, methods?: MFAMethod[] }

POST /api/v1/auth/mfa/verify
Body: { sessionId: string, code: string, method: MFAMethod }
Response: { token: string }

// Manage MFA
GET /api/v1/users/:userId/mfa
DELETE /api/v1/users/:userId/mfa/:methodId
POST /api/v1/users/:userId/mfa/regenerate-backup-codes
```

**Benefits**:
- Required for compliance (SOX, PCI-DSS)
- Protects against credential compromise
- Supports hardware security keys (U2F/WebAuthn)
- Backup codes for account recovery
- Can enforce MFA for specific roles or permissions

---

#### Session Management

**Priority**: Must Have

**Session Security Features**:
```typescript
interface SessionConfig {
  idleTimeout: number;      // Inactivity timeout (minutes)
  absoluteTimeout: number;  // Maximum session duration (hours)
  refreshTokenRotation: boolean;
  singleDeviceOnly: boolean;
  requireReauthForSensitive: string[];  // Permissions requiring re-auth
}

interface UserSession {
  id: string;
  userId: string;
  deviceId: string;
  deviceInfo: {
    userAgent: string;
    browser: string;
    os: string;
    ip: string;
    location?: string;
  };
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  lastActivityAt: Date;
  expiresAt: Date;
  isActive: boolean;
}
```

**Database Schema**:
```sql
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  device_id VARCHAR(255) NOT NULL,
  device_info JSONB NOT NULL,
  access_token_hash VARCHAR(255) NOT NULL,  -- Hashed token
  refresh_token_hash VARCHAR(255) NOT NULL,  -- Hashed token
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  is_active BOOLEAN DEFAULT true,
  INDEX idx_user_active (user_id, is_active),
  INDEX idx_token_hash (access_token_hash)
);

CREATE TABLE session_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id),
  idle_timeout_minutes INTEGER DEFAULT 30,
  absolute_timeout_hours INTEGER DEFAULT 8,
  refresh_token_rotation BOOLEAN DEFAULT true,
  single_device_only BOOLEAN DEFAULT false,
  require_reauth_permissions JSONB,  -- Array of sensitive permissions
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trusted_devices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  device_id VARCHAR(255) NOT NULL,
  device_name VARCHAR(100),
  device_fingerprint TEXT,
  is_trusted BOOLEAN DEFAULT false,
  trust_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used_at TIMESTAMP,
  UNIQUE(user_id, device_id)
);
```

**API Endpoints**:
```typescript
// Session management
GET /api/v1/users/:userId/sessions
DELETE /api/v1/users/:userId/sessions/:sessionId  // Revoke specific session
DELETE /api/v1/users/:userId/sessions  // Revoke all sessions (force logout)

// Device management
GET /api/v1/users/:userId/devices
POST /api/v1/users/:userId/devices/:deviceId/trust
DELETE /api/v1/users/:userId/devices/:deviceId

// Token refresh with rotation
POST /api/v1/auth/refresh
Body: { refreshToken: string }
Response: { accessToken: string, refreshToken: string }  // New tokens
```

**Session Monitoring Service**:
```typescript
@Injectable()
export class SessionMonitorService {
  @Cron('*/5 * * * *')  // Every 5 minutes
  async expireInactiveSessions() {
    const policy = await this.getSessionPolicy();
    const expireAfter = new Date(Date.now() - policy.idleTimeoutMinutes * 60 * 1000);
    
    await this.prisma.userSession.updateMany({
      where: {
        lastActivityAt: { lt: expireAfter },
        isActive: true
      },
      data: { isActive: false }
    });
  }
  
  async detectAnomalousLogin(userId: string, deviceInfo: any): Promise<boolean> {
    // Check for login from new location/device
    const recentSessions = await this.getUserRecentSessions(userId);
    
    if (this.isNewLocation(recentSessions, deviceInfo.location)) {
      await this.sendSecurityAlert(userId, 'New location detected');
      return true;
    }
    
    return false;
  }
}
```

**Benefits**:
- Automatic logout on inactivity
- Prevent token theft with rotation
- Remote session revocation
- Device trust management
- Anomaly detection for suspicious logins

---

### 2. Data Protection & Encryption

#### Encryption Standards

**Priority**: Must Have

**Encryption Configuration**:
```typescript
interface EncryptionConfig {
  atRest: {
    algorithm: 'AES-256-GCM';
    keyManagement: 'AWS-KMS' | 'Azure-KeyVault' | 'HashiCorp-Vault' | 'local';
    keyRotationDays: number;
    encryptedFields: string[];  // Database fields requiring encryption
  };
  inTransit: {
    tlsVersion: '1.2' | '1.3';
    cipherSuites: string[];
    hsts: boolean;
    certPinning: boolean;
  };
  application: {
    sensitiveDataMask: boolean;  // Mask sensitive data in logs
    piiRedaction: string[];  // Fields to redact in audit logs
  };
}
```

**Database Field Encryption**:
```sql
-- Encrypted fields in database
CREATE TABLE users (
  -- ... other fields
  ssn TEXT,  -- Encrypted SSN
  phone_encrypted TEXT,  -- Encrypted phone
  encryption_key_id UUID REFERENCES encryption_keys(id),
  -- ... other fields
);

CREATE TABLE encryption_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key_identifier VARCHAR(255) NOT NULL,  -- KMS key ID
  algorithm VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  rotated_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);
```

**Encryption Service**:
```typescript
@Injectable()
export class EncryptionService {
  async encryptField(plaintext: string, context: string): Promise<string> {
    const kms = this.getKMSClient();
    const encrypted = await kms.encrypt({
      KeyId: process.env.KMS_KEY_ID,
      Plaintext: plaintext,
      EncryptionContext: { field: context }
    });
    return encrypted.CiphertextBlob.toString('base64');
  }
  
  async decryptField(ciphertext: string, context: string): Promise<string> {
    const kms = this.getKMSClient();
    const decrypted = await kms.decrypt({
      CiphertextBlob: Buffer.from(ciphertext, 'base64'),
      EncryptionContext: { field: context }
    });
    return decrypted.Plaintext.toString('utf8');
  }
  
  @Cron('0 0 1 * *')  // Monthly
  async rotateEncryptionKeys() {
    // Implement key rotation strategy
    const oldKeyId = await this.getCurrentKeyId();
    const newKeyId = await this.createNewKey();
    
    // Re-encrypt data with new key
    await this.reEncryptData(oldKeyId, newKeyId);
    
    // Mark old key as rotated
    await this.markKeyAsRotated(oldKeyId);
  }
}
```

**Benefits**:
- Compliance with GDPR, HIPAA, PCI-DSS
- Protect sensitive customer data
- Automated key rotation
- Centralized key management

---

### 3. API Security & Protection

#### Rate Limiting & Throttling

**Priority**: Must Have

**Rate Limit Configuration**:
```typescript
interface RateLimitConfig {
  global: {
    requestsPerMinute: number;
    requestsPerHour: number;
  };
  perUser: {
    requestsPerMinute: number;
    requestsPerHour: number;
  };
  perEndpoint: Record<string, {
    requestsPerMinute: number;
    burst: number;
  }>;
  ipBased: {
    enabled: boolean;
    trustProxy: boolean;
    blacklist: string[];
    whitelist: string[];
  };
}
```

**Database Schema**:
```sql
CREATE TABLE rate_limit_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  endpoint_pattern VARCHAR(255) NOT NULL,  -- '/api/v1/work-orders/*'
  requests_per_minute INTEGER NOT NULL,
  burst_allowance INTEGER DEFAULT 0,
  per_user BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rate_limit_violations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  ip_address VARCHAR(45),
  endpoint VARCHAR(255),
  violation_count INTEGER DEFAULT 1,
  blocked_until TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ip_blocked (ip_address, blocked_until)
);
```

**Implementation**:
```typescript
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,  // Time window in seconds
      limit: 100,  // Max requests per window
    })
  ]
})
export class AppModule {}

// Custom rate limiter with user-based limits
@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  async handleRequest(context: ExecutionContext, limit: number, ttl: number): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // Different limits for different roles
    if (user?.role === 'Super Admin') {
      return true;  // No limits for Super Admin
    }
    
    const key = user ? `user:${user.id}` : `ip:${request.ip}`;
    return await super.handleRequest(context, limit, ttl);
  }
}
```

**Benefits**:
- Prevent API abuse and DDoS attacks
- Protect backend resources
- Different limits per role/endpoint
- Automatic IP blocking for violations

---

#### API Input Validation & Sanitization

**Priority**: Must Have

**Validation Schema Example**:
```typescript
import { IsEmail, IsString, MinLength, MaxLength, Matches, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';

export class CreateWorkOrderDto {
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  @Transform(({ value }) => value.trim())
  @sanitize()
  title: string;
  
  @IsString()
  @MaxLength(2000)
  @Transform(({ value }) => value.trim())
  @sanitize()
  description: string;
  
  @IsUUID()
  customerId: string;
  
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  customerEmail: string;
  
  @Matches(/^\+?[1-9]\d{1,14}$/)  // E.164 format
  phone?: string;
}

// Global validation pipe configuration
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,  // Strip properties not in DTO
    forbidNonWhitelisted: true,  // Throw error if extra properties
    transform: true,  // Auto-transform to DTO types
    transformOptions: {
      enableImplicitConversion: true
    }
  })
);
```

**SQL Injection Prevention**:
```typescript
// Always use parameterized queries (Prisma does this automatically)
// Bad: Direct string interpolation
const users = await prisma.$queryRaw(`SELECT * FROM users WHERE email = '${email}'`);

// Good: Parameterized query
const users = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email}`;

// Best: Use Prisma's type-safe query builder
const users = await prisma.user.findMany({
  where: { email }
});
```

**XSS Prevention**:
```typescript
import helmet from 'helmet';
import { escape } from 'html-escaper';

// Helmet middleware for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Sanitize user input before storage
function sanitizeUserInput(input: string): string {
  return escape(input);
}
```

**Benefits**:
- Prevent SQL injection, XSS, CSRF attacks
- Type-safe API contracts
- Automatic input sanitization
- Security headers for browsers

---

### 4. Compliance & Audit Enhancements

#### Tamper-Evident Audit Logs

**Priority**: Should Have

**Database Schema**:
```sql
CREATE TABLE audit_logs_immutable (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sequence_number BIGSERIAL UNIQUE NOT NULL,  -- Monotonic counter
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50),
  resource_id UUID,
  changes JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  log_category VARCHAR(50),  -- 'user_activity', 'business_operations', 'financial', 'system', 'permissions'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  previous_hash VARCHAR(64),  -- SHA-256 hash of previous record
  record_hash VARCHAR(64) NOT NULL,  -- SHA-256 hash of this record
  CONSTRAINT no_update CHECK (created_at = created_at)  -- Prevent updates
);

-- Make table append-only (no UPDATE or DELETE)
CREATE RULE audit_log_no_update AS ON UPDATE TO audit_logs_immutable DO INSTEAD NOTHING;
CREATE RULE audit_log_no_delete AS ON DELETE TO audit_logs_immutable DO INSTEAD NOTHING;

CREATE INDEX idx_audit_sequence ON audit_logs_immutable(sequence_number);
CREATE INDEX idx_audit_user ON audit_logs_immutable(user_id, created_at);
CREATE INDEX idx_audit_category ON audit_logs_immutable(log_category, created_at);
```

**Audit Service with Chain Integrity**:
```typescript
@Injectable()
export class ImmutableAuditService {
  async log(entry: AuditLogEntry): Promise<void> {
    const lastLog = await this.getLastAuditLog();
    
    const recordData = {
      userId: entry.userId,
      action: entry.action,
      resourceType: entry.resourceType,
      resourceId: entry.resourceId,
      changes: entry.changes,
      ipAddress: entry.ipAddress,
      userAgent: entry.userAgent,
      logCategory: entry.category,
      createdAt: new Date()
    };
    
    const previousHash = lastLog?.recordHash || '0';
    const recordHash = this.calculateHash({
      ...recordData,
      previousHash,
      sequenceNumber: (lastLog?.sequenceNumber || 0) + 1
    });
    
    await this.prisma.auditLogsImmutable.create({
      data: {
        ...recordData,
        previousHash,
        recordHash
      }
    });
  }
  
  calculateHash(data: any): string {
    return createHash('sha256')
      .update(JSON.stringify(data))
      .digest('hex');
  }
  
  async verifyAuditChainIntegrity(): Promise<boolean> {
    const logs = await this.prisma.auditLogsImmutable.findMany({
      orderBy: { sequenceNumber: 'asc' }
    });
    
    for (let i = 1; i < logs.length; i++) {
      if (logs[i].previousHash !== logs[i - 1].recordHash) {
        throw new Error(`Audit log integrity violation at sequence ${logs[i].sequenceNumber}`);
      }
    }
    
    return true;
  }
}
```

**Benefits**:
- Tamper-evident audit trail
- Compliance with SOX, GDPR, HIPAA
- Cryptographic verification of log integrity
- Prevents unauthorized modifications

---

#### Compliance Reports & Retention Policies

**Database Schema**:
```sql
CREATE TABLE compliance_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_type VARCHAR(50) NOT NULL,  -- 'sox', 'gdpr', 'hipaa', 'pci_dss'
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  generated_by UUID REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending',  -- 'pending', 'completed', 'failed'
  report_data JSONB,
  file_path TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE retention_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource_type VARCHAR(50) NOT NULL,  -- 'audit_logs', 'work_orders', 'financial_records'
  retention_days INTEGER NOT NULL,
  archive_after_days INTEGER,
  auto_delete BOOLEAN DEFAULT false,
  regulation VARCHAR(50),  -- 'sox', 'gdpr', 'hipaa', 'custom'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Compliance Report Generator**:
```typescript
@Injectable()
export class ComplianceReportService {
  async generateSOXReport(startDate: Date, endDate: Date): Promise<ComplianceReport> {
    // SOX requires audit trail of all financial transactions and access changes
    const financialAudits = await this.prisma.auditLogsImmutable.findMany({
      where: {
        logCategory: 'financial',
        createdAt: { gte: startDate, lte: endDate }
      }
    });
    
    const permissionChanges = await this.prisma.auditLogsImmutable.findMany({
      where: {
        logCategory: 'permissions',
        createdAt: { gte: startDate, lte: endDate }
      }
    });
    
    const report = {
      period: { start: startDate, end: endDate },
      financialTransactions: financialAudits.length,
      accessChanges: permissionChanges.length,
      criticalPermissions: await this.getCriticalPermissionChanges(permissionChanges),
      segregationOfDutiesViolations: await this.checkSoDViolations(),
      userAccessReview: await this.generateUserAccessReview()
    };
    
    return await this.prisma.complianceReport.create({
      data: {
        reportType: 'sox',
        periodStart: startDate,
        periodEnd: endDate,
        reportData: report,
        status: 'completed'
      }
    });
  }
  
  async generateGDPRReport(startDate: Date, endDate: Date): Promise<ComplianceReport> {
    // GDPR requires data access logs and processing activities
    const dataAccess = await this.prisma.auditLogsImmutable.findMany({
      where: {
        action: { in: ['read', 'export', 'share'] },
        resourceType: { in: ['customer', 'contact', 'user'] },
        createdAt: { gte: startDate, lte: endDate }
      }
    });
    
    return {
      dataAccessLogs: dataAccess,
      dataSubjectRequests: await this.getDataSubjectRequests(startDate, endDate),
      dataBreaches: await this.getDataBreaches(startDate, endDate),
      processingActivities: await this.getProcessingActivities(startDate, endDate)
    };
  }
}
```

**Benefits**:
- Automated compliance reporting
- Regulatory retention enforcement
- Audit-ready documentation
- Reduced compliance costs

---

## User-Friendliness Enhancements

### 1. Interactive Onboarding & Help System

**Priority**: Must Have

**Database Schema**:
```sql
CREATE TABLE onboarding_tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  target_role VARCHAR(50),  -- Role this tour is for
  steps JSONB NOT NULL,  -- Array of tour steps
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_onboarding_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  tour_id UUID REFERENCES onboarding_tours(id),
  completed_steps JSONB,  -- Array of completed step IDs
  is_completed BOOLEAN DEFAULT false,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  UNIQUE(user_id, tour_id)
);

CREATE TABLE help_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50),
  tags TEXT[],
  role_visibility TEXT[],  -- Which roles can see this article
  search_vector tsvector,  -- Full-text search
  view_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_help_search ON help_articles USING GIN(search_vector);
```

**Onboarding Tour Example**:
```typescript
const TECHNICIAN_ONBOARDING_TOUR = {
  name: 'Technician Quick Start',
  targetRole: 'Technician',
  steps: [
    {
      id: 'welcome',
      title: 'Welcome to the HVAC System!',
      content: 'Let\'s get you started with the basics.',
      target: '#dashboard',
      placement: 'center'
    },
    {
      id: 'view-work-orders',
      title: 'Your Work Orders',
      content: 'Here you can see all work orders assigned to you.',
      target: '#work-orders-tab',
      placement: 'right',
      action: 'Click to view your work orders'
    },
    {
      id: 'scanner',
      title: 'Inventory Scanner',
      content: 'Use this to scan parts and update inventory.',
      target: '#scanner-button',
      placement: 'bottom'
    },
    {
      id: 'complete-wo',
      title: 'Completing Work Orders',
      content: 'Click here to mark a work order as complete and add notes.',
      target: '.complete-button',
      placement: 'left'
    }
  ]
};
```

**Contextual Help Component**:
```typescript
interface ContextualHelpProps {
  topic: string;  // e.g., 'work-orders', 'inventory'
  position?: 'right' | 'bottom';
}

function ContextualHelp({ topic, position = 'right' }: ContextualHelpProps) {
  const [helpContent, setHelpContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Load context-specific help
    api.get(`/api/v1/help/context/${topic}`).then(setHelpContent);
  }, [topic]);
  
  return (
    <div className="contextual-help">
      <button onClick={() => setIsOpen(true)} className="help-icon">
        <QuestionMarkIcon />
      </button>
      
      {isOpen && helpContent && (
        <div className={`help-popover help-${position}`}>
          <h3>{helpContent.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: helpContent.content }} />
          <div className="help-actions">
            <button onClick={() => markAsHelpful(helpContent.id)}>
              👍 Helpful
            </button>
            <a href={`/help/articles/${helpContent.id}`}>Learn more</a>
          </div>
        </div>
      )}
    </div>
  );
}
```

**API Endpoints**:
```typescript
// Onboarding
GET /api/v1/onboarding/tours  // Get tours for current user's role
POST /api/v1/onboarding/tours/:tourId/progress
Body: { stepId: string, completed: boolean }

// Help system
GET /api/v1/help/search?q={query}
GET /api/v1/help/context/{topic}
GET /api/v1/help/articles/:articleId
POST /api/v1/help/articles/:articleId/helpful
```

**Benefits**:
- Faster user adoption
- Reduced support tickets
- Role-specific guidance
- Self-service help

---

### 2. In-App Notifications & Communication

**Priority**: Must Have

**Database Schema**:
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(50) NOT NULL,  -- 'info', 'warning', 'error', 'success'
  category VARCHAR(50),  -- 'work_order', 'inventory', 'permission', 'system'
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  action_url VARCHAR(500),
  action_label VARCHAR(50),
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  priority VARCHAR(20) DEFAULT 'normal',  -- 'low', 'normal', 'high', 'urgent'
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_unread (user_id, is_read, created_at)
);

CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) UNIQUE,
  email_enabled BOOLEAN DEFAULT true,
  sms_enabled BOOLEAN DEFAULT false,
  push_enabled BOOLEAN DEFAULT true,
  in_app_enabled BOOLEAN DEFAULT true,
  categories JSONB,  -- Per-category preferences
  quiet_hours JSONB,  -- { start: '22:00', end: '08:00' }
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notification_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  channels JSONB,  -- ['email', 'sms', 'push', 'in_app']
  subject_template TEXT,
  body_template TEXT,
  variables JSONB,  -- Available variables for template
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Notification Service**:
```typescript
@Injectable()
export class NotificationService {
  async send(notification: CreateNotificationDto): Promise<void> {
    const user = await this.getUser(notification.userId);
    const prefs = await this.getUserPreferences(notification.userId);
    
    // Respect quiet hours
    if (this.isQuietHours(prefs.quietHours)) {
      notification.priority = 'low';  // Defer non-urgent notifications
    }
    
    // Create in-app notification
    if (prefs.inAppEnabled) {
      await this.prisma.notification.create({
        data: notification
      });
      
      // Real-time push via WebSocket
      this.websocket.sendToUser(user.id, 'notification', notification);
    }
    
    // Send email
    if (prefs.emailEnabled && this.shouldSendEmail(notification, prefs)) {
      await this.emailService.send({
        to: user.email,
        subject: notification.title,
        body: notification.message
      });
    }
    
    // Send SMS
    if (prefs.smsEnabled && this.shouldSendSMS(notification, prefs)) {
      await this.smsService.send({
        to: user.phone,
        message: notification.message
      });
    }
  }
  
  async sendBulk(userIds: string[], notification: NotificationDto): Promise<void> {
    // Batch send to multiple users efficiently
    await Promise.all(
      userIds.map(userId => this.send({ ...notification, userId }))
    );
  }
}
```

**Notification Examples**:
```typescript
// Work order assigned
await notificationService.send({
  userId: technician.id,
  type: 'info',
  category: 'work_order',
  title: 'New Work Order Assigned',
  message: `Work order #${workOrder.number} has been assigned to you`,
  actionUrl: `/work-orders/${workOrder.id}`,
  actionLabel: 'View Work Order',
  priority: 'high'
});

// Low inventory alert
await notificationService.send({
  userId: warehouseManager.id,
  type: 'warning',
  category: 'inventory',
  title: 'Low Stock Alert',
  message: `${sku.name} is below reorder point (${sku.onHand} remaining)`,
  actionUrl: `/inventory/sku/${sku.id}`,
  actionLabel: 'Create Purchase Order',
  priority: 'normal'
});

// Permission change notification
await notificationService.send({
  userId: user.id,
  type: 'success',
  category: 'permission',
  title: 'Permission Updated',
  message: 'Your access to Financial Dashboard has been granted',
  priority: 'normal'
});
```

**API Endpoints**:
```typescript
GET /api/v1/notifications  // Get user's notifications
GET /api/v1/notifications/unread/count
POST /api/v1/notifications/:id/read
DELETE /api/v1/notifications/:id
GET /api/v1/notifications/preferences
PUT /api/v1/notifications/preferences
```

**Benefits**:
- Real-time user alerts
- Multi-channel delivery (email, SMS, push, in-app)
- User-controlled preferences
- Reduced missed updates

---

### 3. Accessibility & Mobile Responsiveness

**Priority**: Must Have

**WCAG 2.1 AA Compliance Checklist**:
```typescript
// Accessibility testing configuration
const ACCESSIBILITY_STANDARDS = {
  wcagLevel: 'AA',
  standards: ['WCAG2AA'],
  rules: {
    // Color contrast
    'color-contrast': 'error',  // Minimum 4.5:1 for text
    'color-contrast-enhanced': 'warn',  // 7:1 for AAA
    
    // Keyboard navigation
    'keyboard': 'error',
    'focus-visible': 'error',
    'tabindex': 'warn',
    
    // Screen readers
    'label': 'error',  // All form inputs must have labels
    'image-alt': 'error',  // All images must have alt text
    'aria-*': 'error',  // Proper ARIA usage
    
    // Structure
    'heading-order': 'warn',
    'landmark-one-main': 'error',
    'page-has-heading-one': 'error'
  }
};
```

**Responsive Breakpoints**:
```css
/* Mobile-first approach */
:root {
  --breakpoint-xs: 320px;   /* Small phones */
  --breakpoint-sm: 640px;   /* Large phones */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 1024px;  /* Laptops */
  --breakpoint-xl: 1280px;  /* Desktops */
  --breakpoint-2xl: 1536px; /* Large desktops */
}

/* Dashboard layout adjustments */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;  /* Single column on mobile */
  }
  
  .sidebar {
    transform: translateX(-100%);  /* Off-screen by default */
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
  
  .kpi-card {
    min-height: 100px;  /* Smaller cards on mobile */
  }
  
  .data-table {
    overflow-x: auto;  /* Horizontal scroll for tables */
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);  /* 2 columns on tablets */
  }
}

@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(3, 1fr);  /* 3 columns on desktop */
  }
}
```

**Keyboard Navigation**:
```typescript
// Implement keyboard shortcuts
const KEYBOARD_SHORTCUTS = {
  'Ctrl+K': 'Open command palette',
  '/': 'Focus search',
  'g w': 'Go to work orders',
  'g i': 'Go to inventory',
  'g d': 'Go to dispatch',
  'Esc': 'Close modal/dropdown',
  '?': 'Show keyboard shortcuts help'
};

function useKeyboardShortcuts() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        openCommandPalette();
      }
      // ... other shortcuts
    };
    
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
}
```

**Screen Reader Support**:
```typescript
// Proper ARIA labels for interactive elements
function DataTable({ data, columns }: DataTableProps) {
  return (
    <table role="table" aria-label="Work Orders">
      <thead>
        <tr role="row">
          {columns.map(col => (
            <th key={col.key} role="columnheader" scope="col">
              {col.label}
              {col.sortable && (
                <button
                  aria-label={`Sort by ${col.label}`}
                  onClick={() => sort(col.key)}
                >
                  <SortIcon aria-hidden="true" />
                </button>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={row.id} role="row">
            {columns.map(col => (
              <td key={col.key} role="cell">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Live region for dynamic content
function NotificationToast({ message }: { message: string }) {
  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className="toast"
    >
      {message}
    </div>
  );
}
```

**Benefits**:
- Meets legal accessibility requirements (ADA, Section 508)
- Better user experience for all users
- Mobile field technician support
- Keyboard power-user efficiency

---

### 4. User Feedback & Support System

**Priority**: Should Have

**Database Schema**:
```sql
CREATE TABLE feedback_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  feedback_type VARCHAR(50),  -- 'bug', 'feature_request', 'question', 'complaint', 'praise'
  page_url VARCHAR(500),
  subject VARCHAR(200),
  description TEXT NOT NULL,
  screenshot_url TEXT,
  browser_info JSONB,
  priority VARCHAR(20),  -- 'low', 'medium', 'high'
  status VARCHAR(20) DEFAULT 'submitted',  -- 'submitted', 'in_review', 'planned', 'completed', 'closed'
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);

CREATE TABLE nps_surveys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 10),
  feedback TEXT,
  page_context VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feature_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  feedback_id UUID REFERENCES feedback_submissions(id),
  vote_type VARCHAR(10),  -- 'upvote', 'downvote'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, feedback_id)
);
```

**In-App Feedback Widget**:
```typescript
function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('bug');
  
  const submitFeedback = async (data: FeedbackData) => {
    // Capture screenshot
    const screenshot = await captureScreenshot();
    
    // Collect browser info
    const browserInfo = {
      userAgent: navigator.userAgent,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      url: window.location.href
    };
    
    await api.post('/api/v1/feedback', {
      ...data,
      screenshot,
      browserInfo
    });
    
    toast.success('Thank you for your feedback!');
    setIsOpen(false);
  };
  
  return (
    <>
      <button className="feedback-button" onClick={() => setIsOpen(true)}>
        💬 Feedback
      </button>
      
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <h2>Send Feedback</h2>
          <FeedbackForm
            type={feedbackType}
            onTypeChange={setFeedbackType}
            onSubmit={submitFeedback}
          />
        </Modal>
      )}
    </>
  );
}

// NPS Survey (triggered periodically)
function NPSSurvey() {
  return (
    <div className="nps-survey">
      <h3>How likely are you to recommend this system?</h3>
      <div className="nps-scale">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
          <button
            key={score}
            onClick={() => submitNPS(score)}
            className="nps-button"
          >
            {score}
          </button>
        ))}
      </div>
      <div className="nps-labels">
        <span>Not at all likely</span>
        <span>Extremely likely</span>
      </div>
    </div>
  );
}
```

**API Endpoints**:
```typescript
POST /api/v1/feedback
Body: { type, subject, description, screenshot, browserInfo }

POST /api/v1/nps
Body: { score, feedback, context }

GET /api/v1/feedback/popular  // Most voted feature requests
POST /api/v1/feedback/:id/vote
Body: { voteType: 'upvote' | 'downvote' }
```

**Benefits**:
- Direct user feedback collection
- Prioritize features based on demand
- Track user satisfaction (NPS)
- Identify and fix usability issues

---

## Business Integrations

### 1. Accounting & ERP Integration

**Priority**: Should Have

**Supported Systems**:
- QuickBooks Online
- Sage Intacct
- Xero
- NetSuite
- Microsoft Dynamics

**Database Schema**:
```sql
CREATE TABLE integration_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id),
  integration_type VARCHAR(50) NOT NULL,  -- 'quickbooks', 'sage', 'xero'
  connection_name VARCHAR(100),
  credentials JSONB,  -- Encrypted OAuth tokens or API keys
  sync_enabled BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMP,
  sync_status VARCHAR(20),  -- 'success', 'failed', 'in_progress'
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sync_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connection_id UUID REFERENCES integration_connections(id),
  local_resource VARCHAR(50),  -- 'customer', 'invoice', 'payment'
  remote_resource VARCHAR(50),
  field_mappings JSONB,  -- Map local fields to remote fields
  sync_direction VARCHAR(20),  -- 'push', 'pull', 'bidirectional'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sync_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connection_id UUID REFERENCES integration_connections(id),
  sync_type VARCHAR(50),
  direction VARCHAR(10),
  records_processed INTEGER,
  records_succeeded INTEGER,
  records_failed INTEGER,
  errors JSONB,
  started_at TIMESTAMP,
  completed_at TIMESTAMP
);
```

**QuickBooks Integration Example**:
```typescript
@Injectable()
export class QuickBooksIntegration {
  async syncInvoices(): Promise<void> {
    const connection = await this.getConnection('quickbooks');
    const qbo = this.getQuickBooksClient(connection);
    
    // Get work orders that need invoicing
    const workOrders = await this.prisma.workOrder.findMany({
      where: {
        status: 'completed',
        invoiceId: null
      },
      include: { customer: true, lineItems: true }
    });
    
    for (const wo of workOrders) {
      try {
        // Create invoice in QuickBooks
        const invoice = await qbo.invoice.create({
          CustomerRef: { value: wo.customer.qbCustomerId },
          Line: wo.lineItems.map(item => ({
            Amount: item.total,
            DetailType: 'SalesItemLineDetail',
            SalesItemLineDetail: {
              ItemRef: { value: item.qbItemId },
              Qty: item.quantity,
              UnitPrice: item.unitPrice
            },
            Description: item.description
          })),
          DueDate: addDays(new Date(), 30)
        });
        
        // Update work order with invoice ID
        await this.prisma.workOrder.update({
          where: { id: wo.id },
          data: {
            invoiceId: invoice.Id,
            qbSyncedAt: new Date()
          }
        });
        
      } catch (error) {
        await this.logSyncError(wo.id, error);
      }
    }
  }
  
  async syncCustomers(): Promise<void> {
    // Bidirectional sync of customers
    const connection = await this.getConnection('quickbooks');
    const qbo = this.getQuickBooksClient(connection);
    
    // Pull new customers from QB
    const qbCustomers = await qbo.customer.query({
      where: `MetaData.LastUpdatedTime > '${connection.lastSyncAt}'`
    });
    
    for (const qbCustomer of qbCustomers) {
      await this.upsertCustomer(qbCustomer);
    }
    
    // Push new customers to QB
    const localCustomers = await this.prisma.account.findMany({
      where: {
        qbCustomerId: null,
        type: 'customer'
      }
    });
    
    for (const customer of localCustomers) {
      const qbCustomer = await qbo.customer.create({
        DisplayName: customer.name,
        PrimaryEmailAddr: { Address: customer.email },
        PrimaryPhone: { FreeFormNumber: customer.phone }
      });
      
      await this.prisma.account.update({
        where: { id: customer.id },
        data: { qbCustomerId: qbCustomer.Id }
      });
    }
  }
}
```

**API Endpoints**:
```typescript
// OAuth connection
GET /api/v1/integrations/quickbooks/auth
GET /api/v1/integrations/quickbooks/callback

// Sync operations
POST /api/v1/integrations/:connectionId/sync
Body: { resources: ['customers', 'invoices', 'payments'] }

GET /api/v1/integrations/:connectionId/sync-status
GET /api/v1/integrations/:connectionId/logs
```

**Benefits**:
- Eliminate double data entry
- Real-time financial sync
- Automated invoicing
- Accurate financial reporting

---

### 2. Communication Integrations (Email, SMS, Phone)

**Priority**: Should Have

**Email Integration (SendGrid/AWS SES)**:
```typescript
interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  bodyHtml: string;
  bodyText: string;
  variables: string[];  // ['{customer_name}', '{work_order_number}']
}

@Injectable()
export class EmailService {
  async sendWorkOrderConfirmation(workOrder: WorkOrder): Promise<void> {
    const template = await this.getTemplate('work_order_confirmation');
    
    const email = {
      to: workOrder.customer.email,
      subject: this.replaceVariables(template.subject, {
        work_order_number: workOrder.number
      }),
      html: this.replaceVariables(template.bodyHtml, {
        customer_name: workOrder.customer.name,
        work_order_number: workOrder.number,
        scheduled_date: format(workOrder.scheduledAt, 'PPP'),
        technician_name: workOrder.technician.name
      }),
      attachments: [
        {
          filename: 'work-order.pdf',
          content: await this.generateWorkOrderPDF(workOrder)
        }
      ]
    };
    
    await this.sendgrid.send(email);
    
    // Log email sent
    await this.prisma.communicationLog.create({
      data: {
        type: 'email',
        recipient: email.to,
        subject: email.subject,
        status: 'sent',
        workOrderId: workOrder.id
      }
    });
  }
}
```

**SMS Integration (Twilio)**:
```typescript
@Injectable()
export class SMSService {
  async sendTechnicianDispatchNotification(workOrder: WorkOrder): Promise<void> {
    const message = `New work order assigned! #${workOrder.number} at ${workOrder.customer.address}. Due: ${format(workOrder.scheduledAt, 'PP p')}. View: ${process.env.APP_URL}/work-orders/${workOrder.id}`;
    
    await this.twilio.messages.create({
      to: workOrder.technician.phone,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: message
    });
    
    // Log SMS sent
    await this.prisma.communicationLog.create({
      data: {
        type: 'sms',
        recipient: workOrder.technician.phone,
        message,
        status: 'sent',
        workOrderId: workOrder.id
      }
    });
  }
  
  async sendCustomerReminder(workOrder: WorkOrder): Promise<void> {
    const message = `Reminder: Your HVAC service is scheduled for ${format(workOrder.scheduledAt, 'PPP')} between ${workOrder.timeWindow}. Technician: ${workOrder.technician.name}. Questions? Call ${process.env.COMPANY_PHONE}`;
    
    await this.twilio.messages.create({
      to: workOrder.customer.phone,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: message
    });
  }
}
```

**Phone Integration (Twilio Voice)**:
```typescript
@Injectable()
export class PhoneService {
  async initiateCall(to: string, from: string): Promise<Call> {
    const call = await this.twilio.calls.create({
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
      url: `${process.env.APP_URL}/api/v1/phone/twiml/greeting`,
      statusCallback: `${process.env.APP_URL}/api/v1/phone/status`,
      record: true
    });
    
    return call;
  }
  
  // TwiML endpoint for call handling
  @Get('phone/twiml/greeting')
  generateGreeting(@Query('to') to: string) {
    const twiml = new Twilio.twiml.VoiceResponse();
    
    twiml.say(
      { voice: 'alice' },
      'Thank you for calling HVAC Company. Please hold while we connect you.'
    );
    
    twiml.dial(to);
    
    return twiml.toString();
  }
}
```

**Communication Log Schema**:
```sql
CREATE TABLE communication_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(20) NOT NULL,  -- 'email', 'sms', 'phone'
  direction VARCHAR(10),  -- 'inbound', 'outbound'
  recipient VARCHAR(255),
  sender VARCHAR(255),
  subject VARCHAR(500),
  message TEXT,
  status VARCHAR(20),  -- 'sent', 'delivered', 'failed', 'bounced'
  work_order_id UUID REFERENCES work_orders(id),
  user_id UUID REFERENCES users(id),
  cost DECIMAL(10, 4),  -- Cost of sending (for SMS/calls)
  metadata JSONB,  -- Provider-specific data
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Benefits**:
- Automated customer communication
- Technician dispatch notifications
- Two-way SMS conversation
- Call tracking and recording

---

## Disaster Recovery & Data Protection

### Backup Strategy

**Priority**: Must Have

**Database Schema**:
```sql
CREATE TABLE backup_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  backup_type VARCHAR(20),  -- 'full', 'incremental', 'differential'
  status VARCHAR(20),  -- 'in_progress', 'completed', 'failed'
  file_size_bytes BIGINT,
  file_path TEXT,
  storage_location VARCHAR(100),  -- 's3', 'azure_blob', 'local'
  retention_until DATE,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  error_message TEXT
);

CREATE TABLE restore_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  backup_id UUID REFERENCES backup_jobs(id),
  checkpoint_name VARCHAR(100),
  description TEXT,
  database_size_bytes BIGINT,
  can_restore_to BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Backup Service**:
```typescript
@Injectable()
export class BackupService {
  @Cron('0 2 * * *')  // Daily at 2 AM
  async performFullBackup() {
    const backup = await this.prisma.backupJob.create({
      data: {
        backupType: 'full',
        status: 'in_progress',
        startedAt: new Date()
      }
    });
    
    try {
      // Create database dump
      const dumpFile = await this.createDatabaseDump();
      
      // Encrypt backup
      const encryptedFile = await this.encryptBackup(dumpFile);
      
      // Upload to S3 with lifecycle policy
      const s3Key = `backups/${format(new Date(), 'yyyy-MM-dd')}/full-backup.sql.gz.enc`;
      await this.s3.upload({
        Bucket: process.env.BACKUP_BUCKET,
        Key: s3Key,
        Body: fs.createReadStream(encryptedFile),
        ServerSideEncryption: 'AES256',
        StorageClass: 'GLACIER_IR',  // Instant Retrieval for compliance
        Tagging: `RetentionYears=7&Type=DatabaseBackup`
      });
      
      const fileSize = (await fs.stat(encryptedFile)).size;
      
      await this.prisma.backupJob.update({
        where: { id: backup.id },
        data: {
          status: 'completed',
          filePath: s3Key,
          fileSizeBytes: fileSize,
          storageLocation: 's3',
          retentionUntil: addYears(new Date(), 7),
          completedAt: new Date()
        }
      });
      
      // Clean up local files
      await fs.unlink(dumpFile);
      await fs.unlink(encryptedFile);
      
    } catch (error) {
      await this.prisma.backupJob.update({
        where: { id: backup.id },
        data: {
          status: 'failed',
          errorMessage: error.message,
          completedAt: new Date()
        }
      });
      
      throw error;
    }
  }
  
  async restoreFromBackup(backupId: string): Promise<void> {
    const backup = await this.prisma.backupJob.findUnique({
      where: { id: backupId }
    });
    
    if (!backup) {
      throw new Error('Backup not found');
    }
    
    // Download from S3
    const encryptedFile = await this.s3.download(backup.filePath);
    
    // Decrypt backup
    const dumpFile = await this.decryptBackup(encryptedFile);
    
    // Create restore point before restoration
    await this.createRestorePoint('before_restore');
    
    // Restore database
    await this.restoreDatabase(dumpFile);
    
    // Cleanup
    await fs.unlink(encryptedFile);
    await fs.unlink(dumpFile);
  }
  
  @Cron('0 */6 * * *')  // Every 6 hours
  async testBackupIntegrity() {
    const latestBackup = await this.getLatestBackup();
    
    // Download and verify backup can be decrypted
    const isValid = await this.verifyBackup(latestBackup);
    
    if (!isValid) {
      await this.alertAdmins('Backup integrity check failed!');
    }
  }
}
```

**Recovery Time Objective (RTO) / Recovery Point Objective (RPO)**:
```typescript
const DR_POLICY = {
  RPO: '1 hour',  // Maximum data loss acceptable (1 hour of transactions)
  RTO: '4 hours',  // Maximum downtime acceptable (4 hours to restore)
  
  backupSchedule: {
    full: 'daily at 2 AM',
    incremental: 'every 6 hours',
    transactionLog: 'every 15 minutes'
  },
  
  retentionPolicy: {
    daily: 30,    // Keep 30 days of daily backups
    weekly: 52,   // Keep 52 weeks of weekly backups
    monthly: 84,  // Keep 7 years of monthly backups (compliance)
    yearly: 7     // Keep 7 years of yearly backups
  }
};
```

**Benefits**:
- Protect against data loss
- Compliance with retention requirements
- Fast disaster recovery
- Point-in-time restoration

---

## Permission System Analytics & Self-Service

### 1. Permission Usage Analytics

**Priority**: Should Have

**Database Schema**:
```sql
CREATE TABLE permission_usage_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  permission_id UUID REFERENCES permissions(id),
  user_id UUID REFERENCES users(id),
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMP,
  date DATE,
  INDEX idx_permission_date (permission_id, date),
  INDEX idx_user_date (user_id, date),
  UNIQUE(permission_id, user_id, date)
);

CREATE TABLE toxic_permission_combinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  permission_ids UUID[],
  risk_level VARCHAR(20),  -- 'low', 'medium', 'high', 'critical'
  description TEXT,
  affected_users_count INTEGER DEFAULT 0,
  detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);
```

**Analytics Service**:
```typescript
@Injectable()
export class PermissionAnalyticsService {
  async trackPermissionUsage(userId: string, permission: string): Promise<void> {
    const today = startOfDay(new Date());
    
    await this.prisma.permissionUsageAnalytics.upsert({
      where: {
        permissionId_userId_date: {
          permissionId: permission.id,
          userId,
          date: today
        }
      },
      update: {
        usageCount: { increment: 1 },
        lastUsedAt: new Date()
      },
      create: {
        permissionId: permission.id,
        userId,
        date: today,
        usageCount: 1,
        lastUsedAt: new Date()
      }
    });
  }
  
  async getUnusedPermissions(userId: string, days: number = 90): Promise<Permission[]> {
    const cutoffDate = subDays(new Date(), days);
    
    const userPermissions = await this.getUserPermissions(userId);
    const usedPermissions = await this.prisma.permissionUsageAnalytics.findMany({
      where: {
        userId,
        lastUsedAt: { gte: cutoffDate }
      },
      select: { permissionId: true }
    });
    
    const usedIds = new Set(usedPermissions.map(p => p.permissionId));
    
    return userPermissions.filter(p => !usedIds.has(p.id));
  }
  
  async detectToxicCombinations(): Promise<ToxicCombination[]> {
    // Find users with dangerous permission combinations
    const users = await this.prisma.user.findMany({
      include: {
        roleAssignments: {
          include: {
            role: {
              include: {
                permissions: true
              }
            }
          }
        }
      }
    });
    
    const toxicCombinations = [];
    
    for (const user of users) {
      const permissions = this.getUserEffectivePermissions(user);
      
      // Check for separation of duties violations
      if (
        permissions.includes('work_orders:create') &&
        permissions.includes('work_orders:approve')
      ) {
        toxicCombinations.push({
          userId: user.id,
          permissions: ['work_orders:create', 'work_orders:approve'],
          riskLevel: 'high',
          description: 'User can create and approve their own work orders'
        });
      }
      
      // Check for financial access violations
      if (
        permissions.includes('financial:view:all') &&
        permissions.includes('financial:modify') &&
        permissions.includes('audit:delete')
      ) {
        toxicCombinations.push({
          userId: user.id,
          permissions: ['financial:view:all', 'financial:modify', 'audit:delete'],
          riskLevel: 'critical',
          description: 'User has unrestricted financial access and can delete audit logs'
        });
      }
    }
    
    return toxicCombinations;
  }
  
  async generateAccessReviewReport(): Promise<AccessReviewReport> {
    return {
      totalUsers: await this.prisma.user.count(),
      usersWithOverprivileges: await this.getUsersWithUnusedPermissions(90),
      toxicCombinations: await this.detectToxicCombinations(),
      expiredPermissions: await this.getExpiredPermissions(),
      pendingApprovals: await this.getPendingApprovalRequests(),
      lastReviewDate: await this.getLastReviewDate()
    };
  }
}
```

**API Endpoints**:
```typescript
GET /api/v1/analytics/permissions/usage
Query: { userId?, startDate, endDate }

GET /api/v1/analytics/permissions/unused
Query: { userId, days }

GET /api/v1/analytics/permissions/toxic-combinations

GET /api/v1/analytics/access-review
Response: AccessReviewReport
```

**Benefits**:
- Identify unused permissions (least privilege)
- Detect risky permission combinations
- Compliance reporting
- Optimize role definitions

---

### 2. Self-Service Permission Requests

**Priority**: Should Have

**Database Schema**:
```sql
CREATE TABLE self_service_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID REFERENCES users(id),
  request_type VARCHAR(50),  -- 'permission', 'role', 'access_extension'
  permission_ids UUID[],
  role_id UUID REFERENCES roles(id),
  business_justification TEXT NOT NULL,
  duration_days INTEGER,  -- For temporary access
  status VARCHAR(20) DEFAULT 'pending',
  approver_id UUID REFERENCES users(id),
  approval_comment TEXT,
  auto_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved_at TIMESTAMP,
  expires_at TIMESTAMP
);
```

**Self-Service Portal Component**:
```typescript
function PermissionRequestPortal() {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [justification, setJustification] = useState('');
  const [duration, setDuration] = useState<number>(30);  // days
  
  const requestAccess = async () => {
    const request = await api.post('/api/v1/self-service/request', {
      permissionIds: selectedPermissions,
      businessJustification: justification,
      durationDays: duration
    });
    
    if (request.autoApproved) {
      toast.success('Access granted automatically!');
    } else {
      toast.info('Your request has been submitted for approval.');
    }
  };
  
  return (
    <div className="permission-request-portal">
      <h2>Request Additional Access</h2>
      
      <PermissionCatalog
        onSelectPermissions={setSelectedPermissions}
        selected={selectedPermissions}
      />
      
      <TextArea
        label="Business Justification (Required)"
        value={justification}
        onChange={(e) => setJustification(e.target.value)}
        placeholder="Explain why you need this access and how it relates to your work..."
        required
      />
      
      <Select
        label="Access Duration"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      >
        <option value={7}>7 days (temporary)</option>
        <option value={30}>30 days</option>
        <option value={90}>90 days</option>
        <option value={0}>Permanent (requires manager approval)</option>
      </Select>
      
      <button onClick={requestAccess}>Submit Request</button>
    </div>
  );
}

// Manager approval interface
function PendingApprovals() {
  const { data: requests } = useQuery('/api/v1/self-service/pending');
  
  const approveRequest = async (requestId: string, comment?: string) => {
    await api.post(`/api/v1/self-service/${requestId}/approve`, { comment });
    toast.success('Request approved');
  };
  
  const rejectRequest = async (requestId: string, comment: string) => {
    await api.post(`/api/v1/self-service/${requestId}/reject`, { comment });
    toast.info('Request rejected');
  };
  
  return (
    <div>
      <h2>Pending Access Requests</h2>
      {requests.map(request => (
        <RequestCard key={request.id}>
          <div>
            <strong>{request.requester.name}</strong> requests access to:
            <ul>
              {request.permissions.map(p => <li key={p.id}>{p.name}</li>)}
            </ul>
            <p><strong>Justification:</strong> {request.businessJustification}</p>
            <p><strong>Duration:</strong> {request.durationDays} days</p>
          </div>
          <div className="actions">
            <button onClick={() => approveRequest(request.id)}>Approve</button>
            <button onClick={() => rejectRequest(request.id, 'Not justified')}>Reject</button>
          </div>
        </RequestCard>
      ))}
    </div>
  );
}
```

**Auto-Approval Rules**:
```typescript
interface AutoApprovalRule {
  id: string;
  permissionIds: string[];
  conditions: Array<{
    field: string;  // 'user.role', 'user.department', 'permission.category'
    operator: string;
    value: any;
  }>;
  maxDurationDays: number;
  requiresJustification: boolean;
}

// Example: Auto-approve inventory view for warehouse personnel
const AUTO_APPROVAL_RULES: AutoApprovalRule[] = [
  {
    permissionIds: ['inventory:read:all', 'inventory:search'],
    conditions: [
      { field: 'user.department', operator: 'equals', value: 'warehouse' }
    ],
    maxDurationDays: 90,
    requiresJustification: true
  },
  {
    permissionIds: ['work_orders:read:team'],
    conditions: [
      { field: 'user.role', operator: 'in', value: ['Lead Tech', 'Field Manager'] }
    ],
    maxDurationDays: 0,  // Permanent
    requiresJustification: true
  }
];
```

**Benefits**:
- Reduce admin workload
- Faster access provisioning
- Better auditability
- Employee empowerment

---

## Multi-Language & Localization

**Priority**: Nice to Have

**Database Schema**:
```sql
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language_code VARCHAR(10) NOT NULL,  -- 'en', 'es', 'fr', 'de', 'zh'
  namespace VARCHAR(50),  -- 'common', 'work_orders', 'inventory'
  key VARCHAR(255) NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_code, namespace, key)
);

CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  language VARCHAR(10) DEFAULT 'en',
  timezone VARCHAR(50) DEFAULT 'UTC',
  date_format VARCHAR(20) DEFAULT 'MM/DD/YYYY',
  number_format VARCHAR(20) DEFAULT 'en-US',
  currency VARCHAR(10) DEFAULT 'USD',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**i18n Implementation (React)**:
```typescript
// i18n configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: {
          welcome: 'Welcome',
          work_orders: 'Work Orders',
          inventory: 'Inventory'
        },
        work_orders: {
          create_new: 'Create New Work Order',
          status_completed: 'Completed',
          assigned_to: 'Assigned to {{name}}'
        }
      },
      es: {
        common: {
          welcome: 'Bienvenido',
          work_orders: 'Órdenes de Trabajo',
          inventory: 'Inventario'
        },
        work_orders: {
          create_new: 'Crear Nueva Orden de Trabajo',
          status_completed: 'Completado',
          assigned_to: 'Asignado a {{name}}'
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Usage in components
function WorkOrderList() {
  const { t } = useTranslation('work_orders');
  
  return (
    <div>
      <h1>{t('common:work_orders')}</h1>
      <button>{t('create_new')}</button>
      
      {workOrders.map(wo => (
        <div key={wo.id}>
          <span>{t('status_' + wo.status)}</span>
          <span>{t('assigned_to', { name: wo.technician.name })}</span>
        </div>
      ))}
    </div>
  );
}
```

**Benefits**:
- Support international markets
- Better user experience for non-English speakers
- Compliance with local regulations
- Increased market reach

---

## Implementation Priority Summary

### Phase 1 (Must Have) - Weeks 1-4
1. ✅ Team-scoped user management permissions
2. ✅ Permission groups/categories
3. ✅ Data-level permission scopes (own/team/all)
4. ✅ Simplified Owner/CEO implementation

**Why**: These are foundational features that affect core security and usability.

### Phase 2 (Should Have) - Weeks 5-8
5. ✅ Role templates and inheritance
6. ✅ Approval workflows for sensitive permissions
7. ✅ Permission conflict and violation detection

**Why**: Important for security and ease of use, but not blockers.

### Phase 3 (Nice to Have) - Weeks 9-12
8. ✅ Time-based and conditional permissions
9. ✅ Permission delegation system
10. ✅ Bulk permission operations
11. ✅ Permission testing and simulation
12. ✅ Enhanced Admin audit log access

**Why**: Advanced features that add significant value but can be deferred.

---

## Database Schema Impact Summary

**New Tables**:
1. `permission_groups` - Group related permissions
2. `permission_group_mappings` - Link permissions to groups
3. `role_permission_groups` - Assign groups to roles
4. `departments` - Organizational structure
5. `teams` - Team structure
6. `permission_change_requests` - Approval workflows
7. `approval_workflows` - Workflow definitions
8. `permission_rules` - Conflict detection rules
9. `permission_rule_conditions` - Rule conditions
10. `permission_conditions` - Conditional permissions
11. `permission_delegations` - Delegation system
12. `delegated_permissions` - Delegated permission details
13. `role_templates` - Role templates
14. `role_template_modifications` - Template modifications

**Modified Tables**:
1. `permissions` - Add `scope`, `data_scope` columns
2. `roles` - Add `based_on_template_id`, `inherits_from_role_id` columns
3. `users` - Add `team_id`, `department_id` columns
4. `audit_logs` - Add `log_category` column
5. `user_permission_overrides` - Add `conditions` JSONB column

**Total**: 13 new tables, 5 modified tables

---

## API Endpoint Impact Summary

**New Endpoint Categories**:
- Permission Groups: 5 endpoints
- Bulk Operations: 4 endpoints
- Approval Workflows: 6 endpoints
- Delegations: 4 endpoints
- Simulation/Testing: 3 endpoints
- Role Templates: 3 endpoints

**Total**: ~25 new endpoints

---

## Next Steps

1. **Review and Approve**: Stakeholder review of all 12 recommendations
2. **Prioritize**: Confirm implementation priority (1-2-3)
3. **Resource Planning**: Allocate development resources
4. **Database Migration Strategy**: Plan schema changes
5. **Begin Phase 1**: Implement Must-Have features first

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
**Goal**: Set up basic dashboard infrastructure

**Tasks**:
1. **Backend Setup**
   - Create dashboard, analytics, admin modules
   - Implement basic authentication and authorization middleware
   - Set up Prisma models for users, roles, audit logs
   - Create initial KPI calculation functions
   
2. **Frontend Setup**
   - Set up dashboard route and layout component
   - Create reusable chart components (Line, Bar, Pie)
   - Build KPI card component
   - Implement dashboard grid system
   
3. **API Development**
   - `/api/v1/dashboard/executive` endpoint
   - `/api/v1/dashboard/kpis` endpoint
   - Basic error handling and validation

**Deliverables**:
- Basic executive dashboard with 4-6 KPI cards
- One working chart (revenue trend)
- Responsive layout
- Authentication-protected routes

### Phase 2: Core Analytics (Weeks 3-4)
**Goal**: Implement work order and inventory analytics

**Tasks**:
1. **Work Order Analytics**
   - Status distribution chart
   - Completion rate trends
   - Technician performance table
   - Work order calendar view
   
2. **Inventory Analytics**
   - Stock level overview
   - Low stock alerts
   - Recent movements table
   - Inventory valuation
   
3. **API Expansion**
   - `/api/v1/analytics/workorders`
   - `/api/v1/analytics/inventory`
   - Query optimization for large datasets

**Deliverables**:
- Work order management dashboard
- Inventory dashboard with alerts
- 5-7 new charts and visualizations

### Phase 3: CRM & Dispatch Analytics (Weeks 5-6)
**Goal**: Add customer and dispatch insights

**Tasks**:
1. **CRM Analytics**
   - Lead pipeline funnel
   - Customer acquisition trends
   - Top customers table
   - Customer retention metrics
   
2. **Dispatch Analytics**
   - Technician utilization chart
   - Schedule overview calendar
   - Route visualization (basic)
   - On-time performance metrics
   
3. **API Development**
   - `/api/v1/analytics/crm`
   - `/api/v1/analytics/dispatch`

**Deliverables**:
- CRM analytics dashboard
- Dispatch management dashboard
- Customer and technician insights

### Phase 4: Admin & Monitoring (Weeks 7-8)
**Goal**: System administration and health monitoring

**Tasks**:
1. **User Management**
   - User list table with CRUD operations
   - Role and permission editor
   - User activity tracking
   
2. **System Monitoring**
   - Health status dashboard
   - Performance metrics charts
   - Error log viewer
   - Background job monitoring
   
3. **Audit Logging**
   - Implement audit log interceptor
   - Audit log viewer with filters
   - Export functionality
   
4. **API Development**
   - `/api/v1/admin/*` endpoints
   - `/api/v1/monitoring/*` endpoints

**Deliverables**:
- Full admin dashboard
- System monitoring dashboard
- Audit trail functionality

### Phase 5: Reporting & Financial (Weeks 9-10)
**Goal**: Advanced reporting and financial dashboards

**Tasks**:
1. **Financial Dashboard**
   - Revenue summary cards
   - Accounts receivable summary
   - Expense tracking integration
   - Profitability analysis
   
2. **Report Builder**
   - Custom report configuration UI
   - Report generation engine
   - Export to PDF, Excel, CSV
   - Scheduled reports (future)
   
3. **API Development**
   - `/api/v1/reports/*` endpoints
   - Report export service

**Deliverables**:
- Financial analytics dashboard
- Custom report builder
- Export functionality

### Phase 6: Polish & Optimization (Weeks 11-12)
**Goal**: Performance optimization and UX refinement

**Tasks**:
1. **Performance Optimization**
   - Implement caching strategy
   - Optimize database queries
   - Add query result pagination
   - Lazy loading for charts
   
2. **UX Enhancements**
   - Dashboard customization (widget positioning)
   - User preferences (saved filters, date ranges)
   - Dark mode support
   - Improved mobile experience
   
3. **Real-Time Updates**
   - Implement polling for critical metrics
   - WebSocket support for notifications (future)
   
4. **Documentation**
   - API documentation in Swagger
   - User guide for dashboards
   - Admin documentation

**Deliverables**:
- Optimized, production-ready dashboards
- Customization features
- Complete documentation

---

## Future Enhancements

### Short-Term (3-6 months)
1. **AI-Powered Insights**
   - Anomaly detection (unusual patterns in data)
   - Predictive analytics (forecast future trends)
   - Intelligent recommendations (e.g., optimal reorder points)
   
2. **Advanced Visualizations**
   - Geographic heat maps with real-time data
   - 3D charts for multi-dimensional analysis
   - Network graphs for relationship visualization
   
3. **Mobile App**
   - Native iOS/Android apps
   - Offline mode support
   - Push notifications for critical alerts
   
4. **Real-Time Collaboration**
   - WebSocket-based live updates
   - Shared dashboard sessions
   - Commenting on charts and metrics
   
5. **Enhanced Export & Sharing**
   - Automated report scheduling
   - Email distribution lists
   - Public dashboard sharing (with auth)

### Medium-Term (6-12 months)
1. **Advanced Forecasting**
   - Machine learning models for demand prediction
   - Revenue forecasting with confidence intervals
   - Technician workload prediction
   
2. **Integrated Business Intelligence**
   - Data warehouse integration
   - ETL pipelines for external data sources
   - Advanced SQL query builder
   
3. **White-Label Customization**
   - Custom branding per tenant
   - Configurable dashboard templates
   - Custom KPI definitions
   
4. **Advanced Security**
   - Two-factor authentication (2FA)
   - Single sign-on (SSO) integration
   - IP whitelisting
   - Advanced audit trail with video recording
   
5. **API Marketplace**
   - Third-party integrations (QuickBooks, Salesforce, etc.)
   - Webhook support for external systems
   - Public API for partners

### Long-Term (12+ months)
1. **AI Virtual Assistant**
   - Natural language queries ("Show me revenue for last month")
   - Voice-activated dashboard control
   - Automated insight generation
   
2. **Augmented Reality (AR)**
   - AR overlays for field technicians
   - Interactive 3D facility maps
   
3. **Blockchain Integration**
   - Immutable audit trails
   - Smart contracts for automated payments
   
4. **Global Multi-Tenancy**
   - Multi-region support
   - Compliance with international regulations (GDPR, CCPA)
   - Multi-currency and multi-language

---

## Appendix

### A. Glossary of Terms
- **KPI**: Key Performance Indicator - a measurable value that demonstrates effectiveness
- **DAU/WAU/MAU**: Daily/Weekly/Monthly Active Users
- **COGS**: Cost of Goods Sold
- **AR**: Accounts Receivable
- **P&L**: Profit and Loss statement
- **FIFO/LIFO**: First-In-First-Out / Last-In-First-Out inventory methods
- **Churn Rate**: Percentage of customers who stop doing business
- **Conversion Rate**: Percentage of leads that become customers
- **Utilization Rate**: Percentage of available time that is productively used
- **Zero Dollar Work Order**: A work order with no billable revenue ($0), including warranty work, goodwill service, callbacks, diagnostics, or training
- **Call Back**: A return visit required to address an issue from a previous work order, either the same problem, a related issue, or parts failure
- **First-Time Fix Rate**: Percentage of work orders completed successfully on the first visit (inverse of callback rate)
- **Billable vs Non-Billable**: Classification of work orders based on whether they generate revenue or not

### B. Sample Data for Testing
Use the following sample data ranges for realistic testing:
- **Work Orders**: 1,000-5,000 records spanning 12 months
- **Inventory**: 500-1,000 SKUs across 3-5 warehouses
- **Customers**: 200-500 accounts, 1,000-2,000 contacts
- **Technicians**: 10-20 users
- **Stock Movements**: 5,000-10,000 transactions

### C. Performance Benchmarks
Target performance metrics:
- **API Response Time**: < 200ms for dashboard endpoints (P95)
- **Page Load Time**: < 2 seconds for initial dashboard load
- **Chart Render Time**: < 500ms for complex visualizations
- **Database Query Time**: < 100ms for KPI calculations
- **Real-Time Update Latency**: < 5 seconds for polling updates

### D. Browser Support
- **Modern Browsers**: Latest 2 versions of Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Not Supported**: Internet Explorer

### E. Accessibility Compliance
- **Standard**: WCAG 2.1 Level AA
- **Tools**: Use aXe, Lighthouse for testing
- **Testing**: Manual keyboard navigation and screen reader testing

---

# DEVELOPER HANDOFF GUIDE

This section provides everything your development team needs to build this HVAC Management System from scratch.

---

## 1. Executive Summary for Developers

### Project Overview
You're building a comprehensive HVAC Management System with an enterprise-grade admin dashboard. This is a **full-stack web application** with real-time features, complex permissions, and third-party integrations.

### Estimated Timeline
**Total: 12-16 weeks** (3-4 months) with a team of 4-6 developers

- **Phase 1** (Weeks 1-4): Core infrastructure, authentication, basic dashboard
- **Phase 2** (Weeks 5-8): Permission system, role management, contractor tools
- **Phase 3** (Weeks 9-12): Advanced features (SSO, MFA, integrations, analytics)
- **Phase 4** (Weeks 13-16): Security hardening, testing, performance optimization, deployment

### Team Composition
- **2 Frontend Developers** - React/TypeScript experts
- **2 Backend Developers** - Node.js/NestJS, database design
- **1 Full-Stack Developer** - Integration work, DevOps
- **1 QA Engineer** - Testing, automation

### Key Deliverables
1. ✅ Admin dashboard with real-time analytics
2. ✅ 15-role permission system with granular access control
3. ✅ Contractor tools (20+ HVAC calculators)
4. ✅ SSO/MFA authentication
5. ✅ Third-party integrations (QuickBooks, Twilio, etc.)
6. ✅ Mobile-responsive, WCAG 2.1 AA accessible
7. ✅ Automated backups and disaster recovery
8. ✅ Comprehensive API documentation

---

## 2. Technology Stack Specifications

### Core Technologies

```json
{
  "runtime": {
    "node": "20.x LTS",
    "npm": "10.x"
  },
  "frontend": {
    "framework": "React 18.2+",
    "bundler": "Vite 5.x",
    "language": "TypeScript 5.3+",
    "routing": "React Router 6.x",
    "stateManagement": "Redux Toolkit 2.x OR Zustand 4.x",
    "styling": "Tailwind CSS 3.4+",
    "uiComponents": "shadcn/ui (Radix UI primitives)",
    "forms": "React Hook Form 7.x",
    "validation": "Zod 3.x",
    "charts": "Recharts 2.x OR Chart.js 4.x",
    "dateHandling": "date-fns 3.x"
  },
  "backend": {
    "framework": "NestJS 10.x",
    "language": "TypeScript 5.3+",
    "orm": "Drizzle ORM 0.29+",
    "validation": "class-validator 0.14+",
    "documentation": "@nestjs/swagger 7.x"
  },
  "database": {
    "primary": "PostgreSQL 16.x",
    "caching": "Redis 7.x (optional for session storage)"
  },
  "authentication": {
    "jwt": "jsonwebtoken 9.x",
    "passport": "@nestjs/passport 10.x",
    "bcrypt": "bcryptjs 2.x",
    "mfa": "otplib 12.x (TOTP)"
  },
  "realtime": {
    "websocket": "Socket.io 4.x",
    "server": "@nestjs/websockets 10.x",
    "client": "socket.io-client 4.x"
  },
  "testing": {
    "unitTests": "Jest 29.x",
    "e2eTests": "Playwright 1.40+",
    "componentTests": "@testing-library/react 14.x",
    "apiTesting": "supertest 6.x"
  },
  "thirdPartyServices": {
    "email": "SendGrid API (@sendgrid/mail 8.x) OR AWS SES",
    "sms": "Twilio (twilio 4.x)",
    "storage": "AWS S3 (@aws-sdk/client-s3 3.x)",
    "accounting": "QuickBooks Online API (node-quickbooks 3.x)",
    "logging": "Winston 3.x",
    "monitoring": "Sentry 7.x"
  },
  "devTools": {
    "linter": "ESLint 8.x",
    "formatter": "Prettier 3.x",
    "preCommitHooks": "Husky 8.x + lint-staged 15.x",
    "typeChecking": "tsc (TypeScript compiler)"
  }
}
```

### Version Lock File
**CRITICAL**: Use exact versions in `package.json`:
```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "@nestjs/core": "10.3.0",
    "drizzle-orm": "0.29.3",
    "zod": "3.22.4"
  }
}
```

---

## 3. Development Environment Setup

### Prerequisites
1. **Node.js 20.x LTS** - Download from https://nodejs.org/
2. **PostgreSQL 16** - Install locally OR use Docker
3. **Git** - Version control
4. **VS Code** (recommended) with extensions:
   - ESLint
   - Prettier
   - TypeScript and JavaScript Language Features
   - Tailwind CSS IntelliSense
   - Thunder Client (API testing)

### Step-by-Step Setup

#### 1. Clone Repository
```bash
git clone <repository-url>
cd hvac-management-system
```

#### 2. Install Dependencies
```bash
# Install all packages (frontend + backend)
npm install

# Or if using workspaces
npm install --workspaces
```

#### 3. Set Up PostgreSQL Database

**Option A: Local PostgreSQL**
```bash
# Create database
createdb hvac_management_dev

# Verify connection
psql -d hvac_management_dev -c "SELECT version();"
```

**Option B: Docker**
```bash
docker run --name hvac-postgres \
  -e POSTGRES_DB=hvac_management_dev \
  -e POSTGRES_USER=hvac_user \
  -e POSTGRES_PASSWORD=secure_password \
  -p 5432:5432 \
  -d postgres:16
```

#### 4. Environment Variables

Create `.env` files for each environment:

**Backend `.env` (root or `/backend/.env`)**:
```bash
# Database
DATABASE_URL="postgresql://hvac_user:secure_password@localhost:5432/hvac_management_dev"
PGHOST=localhost
PGPORT=5432
PGUSER=hvac_user
PGPASSWORD=secure_password
PGDATABASE=hvac_management_dev

# App Config
NODE_ENV=development
PORT=3000
API_PREFIX=/api/v1

# JWT Secrets (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5000

# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@your domain.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Storage (AWS S3)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=hvac-uploads-dev

# Redis (optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Logging
LOG_LEVEL=debug
SENTRY_DSN=your-sentry-dsn (optional)
```

**Frontend `.env` (/ frontend/.env`)**:
```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_WS_URL=ws://localhost:3000
VITE_APP_NAME=HVAC Management System
VITE_ENABLE_ANALYTICS=false
```

**IMPORTANT**: Copy `.env.example` files provided in the repo and fill in your values.

#### 5. Database Migrations

```bash
# Generate initial migration from schema
npm run db:generate

# Push schema to database (dev only - no migration files)
npm run db:push

# Or use migrations (recommended for production)
npm run db:migrate

# Verify tables created
npm run db:studio  # Opens Drizzle Studio UI at http://localhost:4983
```

#### 6. Seed Database with Sample Data

```bash
npm run db:seed

# This creates:
# - 15 default roles with permissions
# - 1 Super Admin user (email: admin@hvac.com, password: Admin123!)
# - Sample work orders, customers, inventory
# - PT chart data for refrigerants
```

#### 7. Start Development Servers

**Option A: Run both (recommended)**
```bash
npm run dev

# This starts:
# - Backend: http://localhost:3000
# - Frontend: http://localhost:5000
```

**Option B: Run separately**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### 8. Verify Setup

1. **Backend health check**: http://localhost:3000/api/v1/health
   - Should return: `{ "status": "ok", "database": "connected" }`

2. **Frontend**: http://localhost:5000
   - Should show login page

3. **API documentation**: http://localhost:3000/api/docs
   - Swagger UI with all endpoints

4. **Login with default admin**:
   - Email: `admin@hvac.com`
   - Password: `Admin123!`

---

## 4. Frontend Architecture

### Folder Structure

```
frontend/
├── public/              # Static assets
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── @types/          # TypeScript type definitions
│   │   └── index.d.ts
│   ├── assets/          # Images, fonts, icons
│   │   ├── generated_images/
│   │   └── stock_images/
│   ├── components/      # Reusable React components
│   │   ├── ui/          # shadcn/ui components (Button, Input, etc.)
│   │   ├── common/      # Shared components (Header, Sidebar, etc.)
│   │   ├── dashboard/   # Dashboard-specific components
│   │   ├── forms/       # Form components
│   │   └── charts/      # Chart components
│   ├── features/        # Feature-based modules
│   │   ├── auth/        # Authentication
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types.ts
│   │   ├── work-orders/
│   │   ├── inventory/
│   │   ├── users/
│   │   └── contractor-tools/
│   ├── hooks/           # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── usePermissions.ts
│   │   └── useWebSocket.ts
│   ├── layouts/         # Page layouts
│   │   ├── DashboardLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── PublicLayout.tsx
│   ├── lib/             # Utilities and helpers
│   │   ├── api-client.ts      # Axios instance
│   │   ├── utils.ts           # Helper functions
│   │   └── constants.ts
│   ├── pages/           # Route pages
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── WorkOrders.tsx
│   │   └── Settings.tsx
│   ├── routes/          # Routing configuration
│   │   ├── index.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── PublicRoute.tsx
│   ├── services/        # API services
│   │   ├── auth.service.ts
│   │   ├── workOrder.service.ts
│   │   └── user.service.ts
│   ├── store/           # State management (Redux/Zustand)
│   │   ├── slices/      # Redux Toolkit slices
│   │   │   ├── authSlice.ts
│   │   │   └── userSlice.ts
│   │   ├── hooks.ts     # Typed hooks
│   │   └── store.ts     # Store configuration
│   ├── styles/          # Global styles
│   │   ├── globals.css
│   │   └── tailwind.css
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Entry point
│   └── vite-env.d.ts
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### State Management

**Option 1: Redux Toolkit (Recommended for complex state)**
```typescript
// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**Option 2: Zustand (Lighter alternative)**
```typescript
// store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null })
    }),
    { name: 'auth-storage' }
  )
);
```

### Routing Configuration

```typescript
// routes/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'work-orders', element: <WorkOrders /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'users', element: <Users /> },
      { path: 'contractor-tools', element: <ContractorTools /> }
    ]
  }
]);

export default router;
```

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          700: '#1d4ed8'
        },
        // Add your brand colors
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};
```

---

## 5. Backend Architecture

### Folder Structure

```
backend/
├── src/
│   ├── common/              # Shared utilities
│   │   ├── decorators/      # Custom decorators
│   │   ├── filters/         # Exception filters
│   │   ├── guards/          # Auth guards
│   │   ├── interceptors/    # Response interceptors
│   │   ├── pipes/           # Validation pipes
│   │   └── utils/           # Helper functions
│   ├── config/              # Configuration
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   └── app.config.ts
│   ├── database/            # Database layer
│   │   ├── migrations/      # Drizzle migrations
│   │   ├── schemas/         # Drizzle table schemas
│   │   │   ├── users.schema.ts
│   │   │   ├── roles.schema.ts
│   │   │   └── workOrders.schema.ts
│   │   ├── seeders/         # Seed scripts
│   │   │   └── seed.ts
│   │   └── drizzle.ts       # DB connection
│   ├── modules/             # Feature modules
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── guards/
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   └── permission.guard.ts
│   │   │   └── strategies/
│   │   │       └── jwt.strategy.ts
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.module.ts
│   │   │   └── dto/
│   │   ├── work-orders/
│   │   ├── inventory/
│   │   ├── roles/
│   │   ├── permissions/
│   │   ├── contractor-tools/
│   │   └── notifications/
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── app.module.ts
│   └── main.ts              # Entry point
├── test/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── drizzle.config.ts
├── nest-cli.json
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```

### Module Structure Pattern

Each module follows this pattern:

```typescript
// modules/work-orders/work-orders.module.ts
import { Module } from '@nestjs/common';
import { WorkOrdersController } from './work-orders.controller';
import { WorkOrdersService } from './work-orders.service';

@Module({
  imports: [],  // Other modules this depends on
  controllers: [WorkOrdersController],
  providers: [WorkOrdersService],
  exports: [WorkOrdersService]  // Export if other modules need it
})
export class WorkOrdersModule {}
```

### Service Layer Pattern

```typescript
// modules/work-orders/work-orders.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@/database/drizzle';
import { workOrders } from '@/database/schemas/workOrders.schema';
import { eq } from 'drizzle-orm';
import { CreateWorkOrderDto, UpdateWorkOrderDto } from './dto';

@Injectable()
export class WorkOrdersService {
  async findAll(filters?: any) {
    return await db.select().from(workOrders);
  }

  async findOne(id: string) {
    const workOrder = await db
      .select()
      .from(workOrders)
      .where(eq(workOrders.id, id))
      .limit(1);

    if (!workOrder.length) {
      throw new NotFoundException(`Work order ${id} not found`);
    }

    return workOrder[0];
  }

  async create(dto: CreateWorkOrderDto) {
    const [newWorkOrder] = await db
      .insert(workOrders)
      .values(dto)
      .returning();

    return newWorkOrder;
  }

  async update(id: string, dto: UpdateWorkOrderDto) {
    const [updated] = await db
      .update(workOrders)
      .set(dto)
      .where(eq(workOrders.id, id))
      .returning();

    if (!updated) {
      throw new NotFoundException(`Work order ${id} not found`);
    }

    return updated;
  }

  async remove(id: string) {
    await db.delete(workOrders).where(eq(workOrders.id, id));
    return { message: 'Work order deleted successfully' };
  }
}
```

### Controller Pattern

```typescript
// modules/work-orders/work-orders.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WorkOrdersService } from './work-orders.service';
import { CreateWorkOrderDto, UpdateWorkOrderDto } from './dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { PermissionGuard } from '@/modules/auth/guards/permission.guard';
import { RequirePermissions } from '@/common/decorators/permissions.decorator';

@ApiTags('work-orders')
@ApiBearerAuth()
@Controller('work-orders')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all work orders' })
  @RequirePermissions('work_orders:read')
  async findAll(@Query() filters: any) {
    return this.workOrdersService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get work order by ID' })
  @RequirePermissions('work_orders:read')
  async findOne(@Param('id') id: string) {
    return this.workOrdersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create work order' })
  @RequirePermissions('work_orders:create')
  async create(@Body() dto: CreateWorkOrderDto) {
    return this.workOrdersService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update work order' })
  @RequirePermissions('work_orders:update')
  async update(@Param('id') id: string, @Body() dto: UpdateWorkOrderDto) {
    return this.workOrdersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete work order' })
  @RequirePermissions('work_orders:delete')
  async remove(@Param('id') id: string) {
    return this.workOrdersService.remove(id);
  }
}
```

---

## 6. Database Schema & Migration Strategy

### Drizzle ORM Configuration

```typescript
// drizzle.config.ts
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  schema: './src/database/schemas/*.schema.ts',
  out: './src/database/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
  },
  verbose: true,
  strict: true
} satisfies Config;
```

```typescript
// database/drizzle.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schemas';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const db = drizzle(pool, { schema });
```

### Schema Example

```typescript
// database/schemas/users.schema.ts
import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { roles } from './roles.schema';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  phone: varchar('phone', { length: 20 }),
  isActive: boolean('is_active').default(true),
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const usersRelations = relations(users, ({ many }) => ({
  userRoles: many(userRoles)
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
```

### Migration Workflow

**Development (Schema Push - No Migration Files)**:
```bash
# Make changes to schema files
# Push directly to database
npm run db:push

# This automatically syncs schema → database
# Good for rapid prototyping
```

**Production (Migration Files)**:
```bash
# 1. Make schema changes
# 2. Generate migration
npm run db:generate
# Creates: src/database/migrations/0001_migration_name.sql

# 3. Review generated SQL
cat src/database/migrations/0001_*.sql

# 4. Apply migration
npm run db:migrate

# 5. Commit migration files to Git
git add src/database/migrations/
git commit -m "Add users table migration"
```

### Package.json Scripts

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate:pg",
    "db:push": "drizzle-kit push:pg",
    "db:migrate": "tsx src/database/migrate.ts",
    "db:seed": "tsx src/database/seeders/seed.ts",
    "db:studio": "drizzle-kit studio"
  }
}
```

### Migration Runner

```typescript
// database/migrate.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const db = drizzle(pool);

async function main() {
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './src/database/migrations' });
  console.log('Migrations completed!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
```

### Seeding Strategy

```typescript
// database/seeders/seed.ts
import { db } from '../drizzle';
import { users, roles, permissions } from '../schemas';
import * as bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');

  // 1. Create permissions
  const createdPermissions = await db.insert(permissions).values([
    { name: 'work_orders:create', description: 'Create work orders' },
    { name: 'work_orders:read', description: 'View work orders' },
    // ... all permissions
  ]).returning();

  // 2. Create roles
  const superAdminRole = await db.insert(roles).values({
    name: 'Super Admin',
    description: 'Full system access',
    isDefault: true
  }).returning();

  // 3. Assign permissions to roles
  // ... role-permission assignments

  // 4. Create default admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  await db.insert(users).values({
    email: 'admin@hvac.com',
    passwordHash: hashedPassword,
    firstName: 'Super',
    lastName: 'Admin',
    isActive: true,
    emailVerified: true
  });

  console.log('Seeding completed!');
}

seed().catch(console.error).finally(() => process.exit(0));
```

---

## 7. Frontend-Backend Integration

### API Client Setup (Axios)

```typescript
// lib/api-client.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors & token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt token refresh
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        const { accessToken } = response.data;
        useAuthStore.getState().login(accessToken, response.data.user);

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      console.error('Permission denied');
      // Show toast notification
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

### API Service Pattern

```typescript
// services/workOrder.service.ts
import apiClient from '@/lib/api-client';
import type { WorkOrder, CreateWorkOrderDto } from '@/types';

export const workOrderService = {
  async getAll(filters?: any): Promise<WorkOrder[]> {
    const response = await apiClient.get('/work-orders', { params: filters });
    return response.data;
  },

  async getById(id: string): Promise<WorkOrder> {
    const response = await apiClient.get(`/work-orders/${id}`);
    return response.data;
  },

  async create(data: CreateWorkOrderDto): Promise<WorkOrder> {
    const response = await apiClient.post('/work-orders', data);
    return response.data;
  },

  async update(id: string, data: Partial<CreateWorkOrderDto>): Promise<WorkOrder> {
    const response = await apiClient.put(`/work-orders/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/work-orders/${id}`);
  }
};
```

### TypeScript Types Sharing

Create a `shared` directory for types used by both frontend and backend:

```typescript
// shared/types/work-order.types.ts
export interface WorkOrder {
  id: string;
  number: string;
  customerId: string;
  technicianId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledAt: Date;
  completedAt?: Date;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkOrderDto {
  customerId: string;
  technicianId: string;
  priority: WorkOrder['priority'];
  scheduledAt: Date;
  description: string;
}
```

Import in both frontend and backend:
```typescript
import type { WorkOrder, CreateWorkOrderDto } from '@shared/types/work-order.types';
```

---

## 8. Authentication & Authorization Flows

### Login Flow

```
┌─────────┐                ┌──────────┐                ┌──────────┐
│ Browser │                │ Frontend │                │ Backend  │
└────┬────┘                └────┬─────┘                └────┬─────┘
     │                          │                           │
     │  1. Enter credentials    │                           │
     ├─────────────────────────>│                           │
     │                          │                           │
     │                          │  2. POST /auth/login      │
     │                          │  { email, password }      │
     │                          ├──────────────────────────>│
     │                          │                           │
     │                          │                           │  3. Verify credentials
     │                          │                           │     Hash password & compare
     │                          │                           │
     │                          │  4. Return tokens & user  │
     │                          │  { accessToken,           │
     │                          │    refreshToken,          │
     │                          │    user }                 │
     │                          │<──────────────────────────│
     │                          │                           │
     │  5. Store tokens         │                           │
     │     localStorage         │                           │
     │     + Redux/Zustand      │                           │
     │                          │                           │
     │  6. Redirect to dashboard│                           │
     │<─────────────────────────│                           │
     │                          │                           │
```

### Protected API Request Flow

```
┌─────────┐                ┌──────────┐                ┌──────────┐
│ Browser │                │ Frontend │                │ Backend  │
└────┬────┘                └────┬─────┘                └────┬─────┘
     │                          │                           │
     │  1. Request data         │                           │
     ├─────────────────────────>│                           │
     │                          │                           │
     │                          │  2. GET /work-orders      │
     │                          │  Headers:                 │
     │                          │  Authorization: Bearer... │
     │                          ├──────────────────────────>│
     │                          │                           │
     │                          │                           │  3. Verify JWT
     │                          │                           │     jwt.verify(token)
     │                          │                           │     
     │                          │                           │  4. Check permissions
     │                          │                           │     user.hasPermission('work_orders:read')
     │                          │                           │
     │                          │  5. Return data           │
     │                          │<──────────────────────────│
     │                          │                           │
     │  6. Display data         │                           │
     │<─────────────────────────│                           │
     │                          │                           │
```

### Token Refresh Flow

```
┌─────────┐                ┌──────────┐                ┌──────────┐
│ Browser │                │ Frontend │                │ Backend  │
└────┬────┘                └────┬─────┘                └────┬─────┘
     │                          │                           │
     │  1. API request          │                           │
     ├─────────────────────────>│                           │
     │                          │  2. GET /work-orders      │
     │                          │  (expired token)          │
     │                          ├──────────────────────────>│
     │                          │                           │
     │                          │  3. 401 Unauthorized      │
     │                          │<──────────────────────────│
     │                          │                           │
     │                          │  4. POST /auth/refresh    │
     │                          │  { refreshToken }         │
     │                          ├──────────────────────────>│
     │                          │                           │
     │                          │                           │  5. Verify refresh token
     │                          │                           │     Check not blacklisted
     │                          │                           │
     │                          │  6. New access token      │
     │                          │  { accessToken }          │
     │                          │<──────────────────────────│
     │                          │                           │
     │  7. Update stored token  │                           │
     │                          │                           │
     │                          │  8. Retry original request│
     │                          │  (with new token)         │
     │                          ├──────────────────────────>│
     │                          │                           │
     │                          │  9. Return data           │
     │                          │<──────────────────────────│
     │                          │                           │
     │  10. Display data        │                           │
     │<─────────────────────────│                           │
     │                          │                           │
```

### MFA Flow

```
┌─────────┐                ┌──────────┐                ┌──────────┐
│ Browser │                │ Frontend │                │ Backend  │
└────┬────┘                └────┬─────┘                └────┬─────┘
     │                          │                           │
     │  1. Enter credentials    │                           │
     ├─────────────────────────>│                           │
     │                          │                           │
     │                          │  2. POST /auth/login      │
     │                          ├──────────────────────────>│
     │                          │                           │
     │                          │                           │  3. Credentials valid
     │                          │                           │     Check MFA enabled
     │                          │                           │
     │                          │  4. MFA required          │
     │                          │  { requiresMFA: true,     │
     │                          │    sessionId,             │
     │                          │    methods: ['totp', 'sms'] }
     │                          │<──────────────────────────│
     │                          │                           │
     │  5. Show MFA input       │                           │
     │<─────────────────────────│                           │
     │                          │                           │
     │  6. Enter MFA code       │                           │
     ├─────────────────────────>│                           │
     │                          │                           │
     │                          │  7. POST /auth/mfa/verify │
     │                          │  { sessionId, code }      │
     │                          ├──────────────────────────>│
     │                          │                           │
     │                          │                           │  8. Verify TOTP code
     │                          │                           │     otplib.verify()
     │                          │                           │
     │                          │  9. Return tokens         │
     │                          │  { accessToken,           │
     │                          │    refreshToken, user }   │
     │                          │<──────────────────────────│
     │                          │                           │
     │  10. Store & redirect    │                           │
     │<─────────────────────────│                           │
     │                          │                           │
```

### Permission Check Implementation

```typescript
// Backend: guards/permission.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler()
    );

    if (!requiredPermissions) {
      return true; // No permissions required
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.hasAllPermissions(user.permissions, requiredPermissions);
  }

  private hasAllPermissions(userPermissions: string[], required: string[]): boolean {
    return required.every((perm) => userPermissions.includes(perm));
  }
}

// Decorator
export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);
```

---

## 9. Real-time Features (WebSocket)

### Backend Setup (Socket.io)

```typescript
// modules/notifications/notifications.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, string>(); // userId -> socketId

  constructor(private jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      // Extract token from handshake
      const token = client.handshake.auth.token;
      const payload = await this.jwtService.verifyAsync(token);

      // Map user to socket
      this.userSockets.set(payload.sub, client.id);
      client.data.userId = payload.sub;

      console.log(`User ${payload.sub} connected (${client.id})`);
      
      // Join user-specific room
      client.join(`user:${payload.sub}`);
    } catch (error) {
      console.error('WebSocket auth failed:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (userId) {
      this.userSockets.delete(userId);
      console.log(`User ${userId} disconnected`);
    }
  }

  // Send notification to specific user
  sendToUser(userId: string, event: string, data: any) {
    this.server.to(`user:${userId}`).emit(event, data);
  }

  // Broadcast to all connected clients
  broadcast(event: string, data: any) {
    this.server.emit(event, data);
  }

  @SubscribeMessage('join_work_order')
  handleJoinWorkOrder(client: Socket, workOrderId: string) {
    client.join(`work_order:${workOrderId}`);
    console.log(`User ${client.data.userId} joined work order ${workOrderId}`);
  }
}
```

### Frontend Setup (Socket.io Client)

```typescript
// hooks/useWebSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/authStore';

let socket: Socket | null = null;

export function useWebSocket() {
  const [connected, setConnected] = useState(false);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) return;

    // Create socket connection
    socket = io(import.meta.env.VITE_WS_URL, {
      auth: { token },
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [token]);

  return { socket, connected };
}

// Usage in component
function NotificationListener() {
  const { socket } = useWebSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('notification', (data) => {
      // Show toast notification
      toast.info(data.message);
    });

    socket.on('work_order_updated', (workOrder) => {
      // Update state or refetch data
      console.log('Work order updated:', workOrder);
    });

    return () => {
      socket.off('notification');
      socket.off('work_order_updated');
    };
  }, [socket]);

  return null;
}
```

### Emitting Events from Backend

```typescript
// modules/work-orders/work-orders.service.ts
import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class WorkOrdersService {
  constructor(private notificationsGateway: NotificationsGateway) {}

  async update(id: string, dto: UpdateWorkOrderDto) {
    const updated = await db.update(workOrders)...;

    // Emit real-time update
    this.notificationsGateway.broadcast('work_order_updated', updated);

    // Send notification to assigned technician
    if (updated.technicianId) {
      this.notificationsGateway.sendToUser(
        updated.technicianId,
        'notification',
        {
          type: 'work_order_assigned',
          message: `You have been assigned to work order #${updated.number}`,
          workOrderId: updated.id
        }
      );
    }

    return updated;
  }
}
```

---

## 10. API Documentation Standards

### Swagger Setup

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('HVAC Management API')
    .setDescription('API documentation for HVAC Management System')
    .setVersion('2.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('work-orders', 'Work order operations')
    .addTag('inventory', 'Inventory management')
    .addTag('contractor-tools', 'HVAC calculators and tools')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({ origin: process.env.FRONTEND_URL });

  await app.listen(3000);
  console.log('API Documentation: http://localhost:3000/api/docs');
}
bootstrap();
```

### DTO Documentation

```typescript
// modules/work-orders/dto/create-work-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsEnum, IsDateString, IsOptional } from 'class-validator';

export class CreateWorkOrderDto {
  @ApiProperty({
    description: 'Customer UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  customerId: string;

  @ApiProperty({
    description: 'Assigned technician UUID',
    example: '123e4567-e89b-12d3-a456-426614174001'
  })
  @IsUUID()
  technicianId: string;

  @ApiProperty({
    description: 'Work order priority level',
    enum: ['low', 'medium', 'high', 'urgent'],
    example: 'high'
  })
  @IsEnum(['low', 'medium', 'high', 'urgent'])
  priority: string;

  @ApiProperty({
    description: 'Scheduled date and time (ISO 8601)',
    example: '2025-10-20T14:00:00Z'
  })
  @IsDateString()
  scheduledAt: string;

  @ApiProperty({
    description: 'Work description and notes',
    example: 'AC unit not cooling properly'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Service address (if different from customer address)',
    required: false
  })
  @IsOptional()
  @IsString()
  serviceAddress?: string;
}
```

### Response Documentation

```typescript
// Endpoint with response examples
@Post()
@ApiOperation({ summary: 'Create a new work order' })
@ApiResponse({
  status: 201,
  description: 'Work order created successfully',
  schema: {
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      number: 'WO-2025-001234',
      customerId: '...',
      technicianId: '...',
      status: 'pending',
      priority: 'high',
      createdAt: '2025-10-19T10:30:00Z'
    }
  }
})
@ApiResponse({
  status: 400,
  description: 'Invalid input data'
})
@ApiResponse({
  status: 401,
  description: 'Unauthorized - Missing or invalid token'
})
@ApiResponse({
  status: 403,
  description: 'Forbidden - Insufficient permissions'
})
async create(@Body() dto: CreateWorkOrderDto) {
  return this.workOrdersService.create(dto);
}
```

---

## 11. Third-Party Integrations Setup

### QuickBooks OAuth 2.0

**Step 1: Create QuickBooks App**
1. Go to https://developer.intuit.com/
2. Create new app → Select "QuickBooks Online"
3. Get credentials:
   - Client ID
   - Client Secret
4. Add redirect URI: `http://localhost:3000/api/v1/integrations/quickbooks/callback`

**Step 2: Environment Variables**
```bash
QUICKBOOKS_CLIENT_ID=your-client-id
QUICKBOOKS_CLIENT_SECRET=your-client-secret
QUICKBOOKS_REDIRECT_URI=http://localhost:3000/api/v1/integrations/quickbooks/callback
QUICKBOOKS_ENVIRONMENT=sandbox  # or 'production'
```

**Step 3: Implementation**
```typescript
// modules/integrations/quickbooks.service.ts
import OAuthClient from 'intuit-oauth';

@Injectable()
export class QuickBooksService {
  private oauthClient: OAuthClient;

  constructor() {
    this.oauthClient = new OAuthClient({
      clientId: process.env.QUICKBOOKS_CLIENT_ID!,
      clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET!,
      environment: process.env.QUICKBOOKS_ENVIRONMENT,
      redirectUri: process.env.QUICKBOOKS_REDIRECT_URI!
    });
  }

  // Generate authorization URL
  getAuthUrl(): string {
    return this.oauthClient.authorizeUri({
      scope: [OAuthClient.scopes.Accounting],
      state: 'randomState'  // CSRF protection
    });
  }

  // Handle OAuth callback
  async handleCallback(url: string) {
    const authResponse = await this.oauthClient.createToken(url);
    
    // Store tokens securely in database
    await this.storeTokens({
      accessToken: authResponse.access_token,
      refreshToken: authResponse.refresh_token,
      realmId: authResponse.realmId,
      expiresAt: new Date(Date.now() + authResponse.expires_in * 1000)
    });

    return authResponse;
  }
}
```

### Twilio (SMS & Voice)

**Step 1: Create Twilio Account**
1. Sign up at https://www.twilio.com/
2. Get credentials from Console Dashboard:
   - Account SID
   - Auth Token
3. Buy a phone number for SMS/calls

**Step 2: Environment Variables**
```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

**Step 3: Implementation**
```typescript
// modules/communications/sms.service.ts
import { Twilio } from 'twilio';

@Injectable()
export class SMSService {
  private client: Twilio;

  constructor() {
    this.client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  async sendSMS(to: string, message: string) {
    const result = await this.client.messages.create({
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: message
    });

    return result;
  }
}
```

### SendGrid (Email)

**Step 1: Create SendGrid Account**
1. Sign up at https://sendgrid.com/
2. Create API Key (Settings → API Keys)
3. Verify sender email

**Step 2: Environment Variables**
```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME=HVAC Management
```

**Step 3: Implementation**
```typescript
// modules/communications/email.service.ts
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  async sendEmail(to: string, subject: string, html: string) {
    const msg = {
      to,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: process.env.SENDGRID_FROM_NAME!
      },
      subject,
      html
    };

    const result = await sgMail.send(msg);
    return result;
  }
}
```

### AWS S3 (File Storage)

**Step 1: Create AWS Account & S3 Bucket**
1. Sign up at https://aws.amazon.com/
2. Create IAM user with S3 permissions
3. Get credentials (Access Key + Secret Key)
4. Create S3 bucket: `hvac-uploads-dev`

**Step 2: Environment Variables**
```bash
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=hvac-uploads-dev
```

**Step 3: Implementation**
```typescript
// modules/storage/s3.service.ts
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
      }
    });
  }

  async uploadFile(key: string, file: Buffer, contentType: string) {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file,
      ContentType: contentType
    });

    await this.s3Client.send(command);
    return { key, url: this.getPublicUrl(key) };
  }

  async getSignedDownloadUrl(key: string, expiresIn = 3600) {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn });
  }

  private getPublicUrl(key: string): string {
    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }
}
```

---

## 12. Testing Strategy & Requirements

### Test Coverage Requirements

- **Minimum Coverage**: 80% overall
- **Critical Paths**: 90%+ (auth, permissions, financial calculations)
- **New Features**: Must include tests before PR approval

### Testing Pyramid

```
           /\
          /  \    E2E Tests (10%)
         /    \   - Critical user journeys
        /______\  - Cross-browser testing
       /        \
      /          \ Integration Tests (30%)
     /            \ - API endpoint testing
    /______________\ - Database interactions
   /                \
  /                  \ Unit Tests (60%)
 /____________________\ - Business logic
                        - Utility functions
                        - Component logic
```

### Unit Testing (Jest)

**Backend Unit Test Example**:
```typescript
// modules/work-orders/work-orders.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrdersService } from './work-orders.service';
import { NotFoundException } from '@nestjs/common';

describe('WorkOrdersService', () => {
  let service: WorkOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkOrdersService]
    }).compile();

    service = module.get<WorkOrdersService>(WorkOrdersService);
  });

  describe('findOne', () => {
    it('should return a work order if found', async () => {
      const workOrder = { id: '123', number: 'WO-001' };
      jest.spyOn(service, 'findOne').mockResolvedValue(workOrder as any);

      const result = await service.findOne('123');
      expect(result).toEqual(workOrder);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a work order with correct data', async () => {
      const dto = {
        customerId: 'cust-1',
        technicianId: 'tech-1',
        priority: 'high',
        scheduledAt: new Date()
      };

      const result = await service.create(dto);
      
      expect(result).toHaveProperty('id');
      expect(result.priority).toBe('high');
      expect(result.status).toBe('pending');
    });
  });
});
```

**Frontend Component Test Example**:
```typescript
// components/WorkOrderCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkOrderCard } from './WorkOrderCard';

describe('WorkOrderCard', () => {
  const mockWorkOrder = {
    id: '123',
    number: 'WO-001',
    customer: { name: 'John Doe' },
    status: 'pending',
    priority: 'high'
  };

  it('renders work order information correctly', () => {
    render(<WorkOrderCard workOrder={mockWorkOrder} />);

    expect(screen.getByText('WO-001')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('High Priority')).toBeInTheDocument();
  });

  it('calls onEdit when edit button clicked', () => {
    const onEdit = jest.fn();
    render(<WorkOrderCard workOrder={mockWorkOrder} onEdit={onEdit} />);

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledWith(mockWorkOrder.id);
  });
});
```

### API Testing (Supertest)

```typescript
// test/work-orders.e2e-spec.ts
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';

describe('Work Orders (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    // Login and get auth token
    const loginResponse = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'admin@hvac.com', password: 'Admin123!' });

    authToken = loginResponse.body.accessToken;
  });

  describe('/api/v1/work-orders (GET)', () => {
    it('should return array of work orders', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/work-orders')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 401 without auth token', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/work-orders')
        .expect(401);
    });
  });

  describe('/api/v1/work-orders (POST)', () => {
    it('should create a work order', async () => {
      const dto = {
        customerId: 'uuid-here',
        technicianId: 'uuid-here',
        priority: 'high',
        scheduledAt: new Date().toISOString()
      };

      const response = await request(app.getHttpServer())
        .post('/api/v1/work-orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(dto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.priority).toBe('high');
    });

    it('should validate required fields', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/work-orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send({}) // Missing required fields
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
```

### E2E Testing (Playwright)

```typescript
// e2e/work-orders.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Work Orders Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('http://localhost:5000/login');
    await page.fill('input[name="email"]', 'admin@hvac.com');
    await page.fill('input[name="password"]', 'Admin123!');
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:5000/dashboard');
  });

  test('should create new work order', async ({ page }) => {
    await page.click('text=Work Orders');
    await page.click('button:has-text("New Work Order")');

    // Fill form
    await page.selectOption('select[name="customerId"]', { label: 'John Doe' });
    await page.selectOption('select[name="technicianId"]', { label: 'Bob Smith' });
    await page.selectOption('select[name="priority"]', 'high');
    await page.fill('textarea[name="description"]', 'AC not cooling');
    
    // Submit
    await page.click('button:has-text("Create")');

    // Verify success
    await expect(page.locator('text=Work order created successfully')).toBeVisible();
  });

  test('should filter work orders by status', async ({ page }) => {
    await page.goto('http://localhost:5000/work-orders');

    // Apply filter
    await page.selectOption('select[name="status"]', 'completed');
    await page.click('button:has-text("Apply Filters")');

    // Verify filtered results
    const workOrders = page.locator('.work-order-card');
    const count = await workOrders.count();

    for (let i = 0; i < count; i++) {
      await expect(workOrders.nth(i)).toContainText('Completed');
    }
  });
});
```

### Test Scripts (package.json)

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "test:playwright": "playwright test",
    "test:playwright:ui": "playwright test --ui",
    "test:ci": "jest --coverage && playwright test"
  }
}
```

### CI/CD Pipeline (GitHub Actions)

```.yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: hvac_test
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_password
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:cov
        env:
          DATABASE_URL: postgresql://test_user:test_password@localhost:5432/hvac_test

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          DATABASE_URL: postgresql://test_user:test_password@localhost:5432/hvac_test

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npm run test:playwright

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

---

## 13. Code Organization & Style Guide

### File Naming Conventions

```
✅ CORRECT:
- work-order.service.ts        (kebab-case for files)
- WorkOrderCard.tsx             (PascalCase for React components)
- useWorkOrders.ts              (camelCase for hooks)
- create-work-order.dto.ts      (kebab-case for DTOs)
- work-orders.controller.ts     (kebab-case for controllers)
- IWorkOrder.ts                 (PascalCase for interfaces with I prefix)

❌ INCORRECT:
- WorkOrder.service.ts
- work_order_card.tsx
- CreateWorkOrderDTO.ts
- WorkOrdersController.ts
```

### ESLint Configuration

```javascript
// .eslintrc.json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "import"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always",
        "alphabetize": { "order": "asc" }
      }
    ],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### Import Order

```typescript
// 1. External libraries
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

// 2. Internal modules (absolute imports)
import { db } from '@/database/drizzle';
import { users } from '@/database/schemas/users.schema';
import { CreateUserDto } from '@/modules/users/dto';

// 3. Relative imports
import { AuthService } from '../auth/auth.service';
import { UserMapper } from './user.mapper';

// 4. Types
import type { User } from '@/types';
```

### Folder Organization Examples

**Feature-based (Recommended)**:
```
src/
├── features/
│   ├── work-orders/
│   │   ├── components/
│   │   │   ├── WorkOrderCard.tsx
│   │   │   ├── WorkOrderForm.tsx
│   │   │   └── WorkOrderList.tsx
│   │   ├── hooks/
│   │   │   └── useWorkOrders.ts
│   │   ├── services/
│   │   │   └── workOrder.service.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts  (exports all public APIs)
│   ├── inventory/
│   └── users/
```

### Code Comments Guidelines

```typescript
// ✅ GOOD: Explain WHY, not WHAT
/**
 * Applies soft delete instead of hard delete to maintain audit trail.
 * Work orders are never permanently deleted per SOX compliance requirements.
 */
async softDelete(id: string) {
  return await db.update(workOrders)
    .set({ deletedAt: new Date() })
    .where(eq(workOrders.id, id));
}

// ❌ BAD: Stating the obvious
/**
 * Updates the work order
 */
async update(id: string, data: any) {
  // Update work order in database
  return await db.update(workOrders).set(data).where(eq(workOrders.id, id));
}

// ✅ GOOD: Document complex business logic
/**
 * Calculate technician utilization rate.
 * 
 * Formula: (Billable Hours / Available Hours) × 100
 * 
 * Billable Hours: Time spent on completed, paid work orders
 * Available Hours: Total work hours minus PTO/holidays
 * 
 * @param technicianId - UUID of technician
 * @param startDate - Period start date
 * @param endDate - Period end date
 * @returns Utilization rate as percentage (0-100)
 */
calculateUtilization(technicianId: string, startDate: Date, endDate: Date): number {
  // Implementation...
}
```

### Pre-commit Hooks (Husky + lint-staged)

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
npm run test -- --bail --findRelatedTests
```

---

## 14. Error Handling & Logging

### Error Classes

```typescript
// common/errors/app-error.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id 
      ? `${resource} with ID ${id} not found`
      : `${resource} not found`;
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public errors?: any[]) {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403);
  }
}
```

### Global Exception Filter

```typescript
// common/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '@/common/services/logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : 500;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal server error';

    // Log error
    this.logger.error('HTTP Exception', {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      stack: exception instanceof Error ? exception.stack : undefined,
      user: (request as any).user?.id
    });

    // Send error response
    response.status(status).json({
      statusCode: status,
      message: typeof message === 'string' ? message : (message as any).message,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(process.env.NODE_ENV === 'development' && {
        stack: exception instanceof Error ? exception.stack : undefined
      })
    });
  }
}
```

### Winston Logger Service

```typescript
// common/services/logger.service.ts
import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        }),
        new winston.transports.File({ 
          filename: 'logs/error.log', 
          level: 'error' 
        }),
        new winston.transports.File({ 
          filename: 'logs/combined.log' 
        })
      ]
    });
  }

  log(message: string, context?: any) {
    this.logger.info(message, { context });
  }

  error(message: string, context?: any) {
    this.logger.error(message, { context });
  }

  warn(message: string, context?: any) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: any) {
    this.logger.debug(message, { context });
  }
}
```

### Sentry Integration (Production Error Tracking)

```typescript
// main.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,  // 10% of transactions
  beforeSend(event) {
    // Remove sensitive data
    if (event.request) {
      delete event.request.cookies;
      if (event.request.headers) {
        delete event.request.headers['authorization'];
      }
    }
    return event;
  }
});
```

### User-Friendly Error Messages

```typescript
// Frontend error handling
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

export function handleApiError(error: unknown) {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    switch (status) {
      case 400:
        toast.error(message || 'Invalid input. Please check your data.');
        break;
      case 401:
        toast.error('Your session has expired. Please log in again.');
        // Redirect to login
        break;
      case 403:
        toast.error('You don\'t have permission to perform this action.');
        break;
      case 404:
        toast.error(message || 'The requested resource was not found.');
        break;
      case 500:
        toast.error('Something went wrong on our end. Please try again later.');
        // Send to Sentry
        break;
      default:
        toast.error('An unexpected error occurred. Please try again.');
    }
  } else {
    toast.error('Network error. Please check your connection.');
  }
}
```

---

## 15. Performance Requirements & Optimization

### Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Page Load Time** (First Contentful Paint) | < 1.5s | Lighthouse |
| **Time to Interactive** | < 3.0s | Lighthouse |
| **API Response Time** (P95) | < 200ms | Server logs |
| **Dashboard Load** (with data) | < 2.0s | Browser DevTools |
| **Database Queries** | < 100ms | Query logs |
| **Bundle Size** (initial JS) | < 300KB gzipped | Webpack Bundle Analyzer |
| **Largest Contentful Paint** | < 2.5s | Lighthouse |

### Database Query Optimization

**1. Use Indexes**:
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_work_orders_status ON work_orders(status);
CREATE INDEX idx_work_orders_technician ON work_orders(technician_id);
CREATE INDEX idx_work_orders_date ON work_orders(scheduled_at);
CREATE INDEX idx_work_orders_customer ON work_orders(customer_id);

-- Composite indexes for common filter combinations
CREATE INDEX idx_work_orders_status_date ON work_orders(status, scheduled_at);
```

**2. Use SELECT Specific Columns**:
```typescript
// ❌ BAD: Select all columns
const workOrders = await db.select().from(workOrders);

// ✅ GOOD: Select only needed columns
const workOrders = await db
  .select({
    id: workOrders.id,
    number: workOrders.number,
    status: workOrders.status,
    customerName: customers.name
  })
  .from(workOrders)
  .leftJoin(customers, eq(workOrders.customerId, customers.id));
```

**3. Use Pagination**:
```typescript
async findAll(page = 1, limit = 20) {
  const offset = (page - 1) * limit;
  
  const [data, total] = await Promise.all([
    db.select().from(workOrders).limit(limit).offset(offset),
    db.select({ count: sql`count(*)` }).from(workOrders)
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total: Number(total[0].count),
      totalPages: Math.ceil(Number(total[0].count) / limit)
    }
  };
}
```

### Caching Strategy

**Backend Caching (Redis)**:
```typescript
// common/services/cache.service.ts
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class CacheService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl = 3600) {
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }

  async del(key: string) {
    await this.redis.del(key);
  }

  async invalidatePattern(pattern: string) {
    const keys = await this.redis.keys(pattern);
    if (keys.length) {
      await this.redis.del(...keys);
    }
  }
}

// Usage in service
@Injectable()
export class WorkOrdersService {
  constructor(private cacheService: CacheService) {}

  async findAll() {
    const cacheKey = 'work_orders:all';
    
    // Try cache first
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    // Fetch from DB
    const data = await db.select().from(workOrders);

    // Cache for 5 minutes
    await this.cacheService.set(cacheKey, data, 300);

    return data;
  }

  async update(id: string, dto: UpdateWorkOrderDto) {
    const updated = await db.update(workOrders)...;

    // Invalidate cache
    await this.cacheService.invalidatePattern('work_orders:*');

    return updated;
  }
}
```

**Frontend Caching (React Query)**:
```typescript
// hooks/useWorkOrders.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workOrderService } from '@/services/workOrder.service';

export function useWorkOrders(filters?: any) {
  return useQuery({
    queryKey: ['work-orders', filters],
    queryFn: () => workOrderService.getAll(filters),
    staleTime: 5 * 60 * 1000,  // 5 minutes
    cacheTime: 10 * 60 * 1000   // 10 minutes
  });
}

export function useCreateWorkOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workOrderService.create,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['work-orders']);
    }
  });
}
```

### Bundle Optimization

**1. Code Splitting**:
```typescript
// routes/index.tsx
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const WorkOrders = lazy(() => import('@/pages/WorkOrders'));
const ContractorTools = lazy(() => import('@/pages/ContractorTools'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/work-orders" element={<WorkOrders />} />
        <Route path="/contractor-tools" element={<ContractorTools />} />
      </Routes>
    </Suspense>
  );
}
```

**2. Tree Shaking & Dead Code Elimination**:
```typescript
// ❌ BAD: Imports entire library
import _ from 'lodash';

// ✅ GOOD: Import only needed functions
import debounce from 'lodash/debounce';
import groupBy from 'lodash/groupBy';
```

**3. Image Optimization**:
```typescript
// Use optimized image formats
import { lazy } from 'react';

function ProductImage({ src }: { src: string }) {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <source srcSet={`${src}.avif`} type="image/avif" />
      <img src={src} alt="Product" loading="lazy" />
    </picture>
  );
}
```

**4. Vite Build Optimization**:
```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'chart-vendor': ['recharts', 'date-fns']
        }
      }
    },
    chunkSizeWarningLimit: 500
  }
});
```

---

## 16. Security Implementation Checklist

### OWASP Top 10 Mitigation

#### 1. **Broken Access Control**
- ✅ Implement permission-based guards on all endpoints
- ✅ Validate user permissions server-side (never trust client)
- ✅ Use data-level scopes (own/team/all)
- ✅ Prevent IDOR (Insecure Direct Object Reference) attacks

```typescript
// ❌ BAD: No permission check
@Get(':id')
async getWorkOrder(@Param('id') id: string) {
  return this.workOrdersService.findOne(id);
}

// ✅ GOOD: Permission + ownership check
@Get(':id')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RequirePermissions('work_orders:read')
async getWorkOrder(@Param('id') id: string, @CurrentUser() user: User) {
  const workOrder = await this.workOrdersService.findOne(id);
  
  // Check ownership if user doesn't have 'all' scope
  if (!user.hasScope('all') && workOrder.technicianId !== user.id) {
    throw new ForbiddenError();
  }
  
  return workOrder;
}
```

#### 2. **SQL Injection**
- ✅ Always use parameterized queries (Drizzle ORM handles this)
- ✅ Never concatenate user input into SQL strings

```typescript
// ❌ BAD: String concatenation
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ GOOD: Parameterized with Drizzle
const user = await db.select().from(users).where(eq(users.email, email));
```

#### 3. **XSS (Cross-Site Scripting)**
- ✅ Use Helmet middleware for security headers
- ✅ Sanitize user input before storage
- ✅ Use CSP (Content Security Policy)
- ✅ React escapes by default, but use `dangerouslySetInnerHTML` carefully

```typescript
// Backend: Helmet setup
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],  // Avoid unsafe-inline in production
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:']
    }
  }
}));

// Frontend: Sanitize HTML if needed
import DOMPurify from 'dompurify';

function SafeHTML({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

#### 4. **CSRF (Cross-Site Request Forgery)**
- ✅ Use CSRF tokens for state-changing operations
- ✅ Validate `Origin` and `Referer` headers
- ✅ Use `SameSite` cookie attribute

```typescript
// Backend: CSRF protection
import * as csurf from 'csurf';

app.use(csurf({ cookie: true }));

// Frontend: Include CSRF token
const csrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];

axios.post('/api/work-orders', data, {
  headers: { 'X-XSRF-TOKEN': csrfToken }
});
```

#### 5. **Sensitive Data Exposure**
- ✅ Encrypt sensitive data at rest (use KMS)
- ✅ Use HTTPS everywhere (TLS 1.3)
- ✅ Never log sensitive data (passwords, tokens, SSN)
- ✅ Mask sensitive data in logs

```typescript
// Encrypt sensitive fields
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

class EncryptionService {
  encrypt(text: string): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-gcm', Buffer.from(process.env.ENCRYPTION_KEY!), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  }

  decrypt(encrypted: string): string {
    const [ivHex, encryptedText] = encrypted.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = createDecipheriv('aes-256-gcm', Buffer.from(process.env.ENCRYPTION_KEY!), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

// Use for SSN, credit cards, etc.
user.ssn = encryptionService.encrypt(user.ssn);
```

#### 6. **Security Misconfiguration**
- ✅ Remove default credentials
- ✅ Disable directory listing
- ✅ Keep dependencies updated
- ✅ Use environment-specific configs

```bash
# Security checklist
npm audit  # Check for vulnerabilities
npm outdated  # Check outdated packages
npm update  # Update dependencies
```

#### 7. **Insecure Deserialization**
- ✅ Validate and sanitize all JSON inputs
- ✅ Use DTOs with class-validator
- ✅ Never deserialize untrusted data

```typescript
// Use class-validator DTOs
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

// NestJS will automatically validate
@Post()
async create(@Body() dto: CreateUserDto) {
  // dto is guaranteed to be valid
}
```

#### 8. **Using Components with Known Vulnerabilities**
- ✅ Run `npm audit` regularly
- ✅ Use Dependabot/Renovate for automated updates
- ✅ Subscribe to security advisories

```json
// .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

#### 9. **Insufficient Logging & Monitoring**
- ✅ Log all authentication attempts
- ✅ Log permission changes
- ✅ Log sensitive operations (delete, financial)
- ✅ Monitor for suspicious patterns

```typescript
// Log security events
async login(email: string, password: string, ip: string) {
  this.logger.log('Login attempt', {
    email,
    ip,
    timestamp: new Date()
  });

  const user = await this.validateUser(email, password);

  if (!user) {
    this.logger.warn('Failed login', { email, ip });
    throw new UnauthorizedError();
  }

  this.logger.log('Successful login', {
    userId: user.id,
    email,
    ip
  });

  return this.generateTokens(user);
}
```

#### 10. **Server-Side Request Forgery (SSRF)**
- ✅ Validate and sanitize URLs
- ✅ Use allowlists for external requests
- ✅ Block private IP ranges

```typescript
// Validate URLs before fetching
import { URL } from 'url';

function isAllowedUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    
    // Block private IPs
    const privateRanges = ['127.0.0.1', 'localhost', '0.0.0.0', '10.', '192.168.'];
    if (privateRanges.some(range => url.hostname.startsWith(range))) {
      return false;
    }

    // Allowlist domains
    const allowed = ['api.quickbooks.com', 'api.twilio.com'];
    return allowed.some(domain => url.hostname.endsWith(domain));
  } catch {
    return false;
  }
}
```

### Input Validation Checklist

```typescript
// Complete validation example
import {
  IsString,
  IsEmail,
  IsUUID,
  IsEnum,
  IsOptional,
  IsInt,
  Min,
  Max,
  MinLength,
  MaxLength,
  Matches,
  IsDateString,
  ValidateNested,
  IsArray,
  ArrayMinSize
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorkOrderDto {
  @IsUUID()
  customerId: string;

  @IsUUID()
  technicianId: string;

  @IsEnum(['low', 'medium', 'high', 'urgent'])
  priority: string;

  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  description: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)  // Phone format: 555-555-5555
  phone?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1000000)
  estimatedCost?: number;

  @IsDateString()
  scheduledAt: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => LineItemDto)
  lineItems: LineItemDto[];
}
```

---

## 17. Deployment & Infrastructure (Replit)

### Deployment Configuration

```typescript
// Configure deployment in Replit
// File: .replit (auto-generated)
run = "npm run dev"
entrypoint = "backend/src/main.ts"

[deployment]
run = ["npm", "run", "start:prod"]
deploymentTarget = "autoscale"
ignorePorts = false
```

**Deployment Types**:
- **Autoscale**: For stateless web apps (recommended for this project)
- **Reserved VM**: For apps needing persistent state
- **Static**: For frontend-only apps

### Environment Variables (Secrets)

**Setting Secrets in Replit**:
1. Go to Tools → Secrets
2. Add environment variables:

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# JWT
JWT_SECRET=your-production-secret
JWT_REFRESH_SECRET=your-production-refresh-secret

# Third-party APIs
SENDGRID_API_KEY=SG.xxx
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
AWS_ACCESS_KEY_ID=AKIAxxx
AWS_SECRET_ACCESS_KEY=xxx

# Production URLs
FRONTEND_URL=https://your-app.repl.co
```

### Build Commands

```json
// package.json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev",
    
    "build": "npm run build:backend && npm run build:frontend",
    "build:backend": "cd backend && npm run build",
    "build:frontend": "cd frontend && npm run build",
    
    "start:prod": "NODE_ENV=production node backend/dist/main.js",
    
    "db:migrate:prod": "cd backend && npm run db:migrate",
    "db:seed:prod": "cd backend && npm run db:seed"
  }
}
```

### Health Check Endpoint

```typescript
// Backend health check
@Controller()
export class AppController {
  @Get('/health')
  async healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: await this.checkDatabase(),
      redis: await this.checkRedis()
    };
  }

  private async checkDatabase() {
    try {
      await db.select().from(users).limit(1);
      return 'connected';
    } catch {
      return 'disconnected';
    }
  }
}
```

### Monitoring & Logging

```typescript
// Production logging setup
if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.File({
    filename: 'logs/production.log',
    maxsize: 5242880, // 5MB
    maxFiles: 5
  }));

  // Send errors to Sentry
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}
```

### Backup Schedule (Automated)

```bash
# Cron job for database backups (runs on Replit)
# File: .replit.cron (if supported) or use backend scheduler

0 2 * * *  # Daily at 2 AM
npm run db:backup
```

```typescript
// Backend backup service
@Injectable()
export class BackupService {
  @Cron('0 2 * * *')  // Daily at 2 AM
  async performBackup() {
    const timestamp = format(new Date(), 'yyyy-MM-dd-HHmmss');
    const filename = `backup-${timestamp}.sql`;
    
    // Create database dump
    const { exec } = require('child_process');
    exec(`pg_dump ${process.env.DATABASE_URL} > backups/${filename}`);
    
    // Upload to S3
    await this.s3Service.uploadFile(
      `backups/${filename}`,
      fs.readFileSync(`backups/${filename}`),
      'application/sql'
    );
    
    // Clean up local file
    fs.unlinkSync(`backups/${filename}`);
  }
}
```

---

## 18. Development Workflow & Git Strategy

### Git Branching Model

```
main (production)
  │
  ├── develop (staging)
  │     │
  │     ├── feature/user-authentication
  │     ├── feature/work-order-crud
  │     ├── feature/contractor-tools
  │     │
  │     ├── bugfix/login-redirect-issue
  │     └── hotfix/critical-security-patch
  │
  └── release/v1.0.0
```

**Branch Naming**:
- `feature/short-description` - New features
- `bugfix/issue-description` - Bug fixes
- `hotfix/critical-issue` - Urgent production fixes
- `release/v1.0.0` - Release preparation

### Commit Message Format (Conventional Commits)

```bash
# Format: <type>(<scope>): <subject>

# Types:
feat: New feature
fix: Bug fix
docs: Documentation changes
style: Code formatting (no logic change)
refactor: Code restructuring
perf: Performance improvements
test: Adding/updating tests
chore: Build process, dependencies

# Examples:
feat(auth): add SSO login with SAML
fix(work-orders): resolve date picker timezone issue
docs(api): update Swagger documentation for permissions
refactor(database): optimize work order queries
test(users): add unit tests for user service
```

### Pull Request Template

```markdown
<!-- .github/pull_request_template.md -->
## Description
<!-- Brief description of changes -->

## Type of Change
- [ ] Feature (new functionality)
- [ ] Bugfix (fixes an issue)
- [ ] Refactor (code improvement)
- [ ] Documentation
- [ ] Performance improvement

## Checklist
- [ ] Code follows style guide (ESLint/Prettier)
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] Database migrations included (if applicable)
- [ ] Tested locally
- [ ] Screenshots attached (for UI changes)

## Related Issues
Closes #123

## Screenshots (if applicable)
<!-- Add before/after screenshots -->

## Additional Notes
<!-- Any additional context -->
```

### Code Review Checklist

**Reviewer Checklist**:
- ✅ Code follows project conventions
- ✅ No hardcoded secrets or sensitive data
- ✅ Proper error handling implemented
- ✅ Tests are comprehensive and passing
- ✅ No unnecessary dependencies added
- ✅ Performance implications considered
- ✅ Security vulnerabilities addressed
- ✅ Database queries optimized
- ✅ API endpoints documented
- ✅ Accessibility standards met (WCAG 2.1 AA)

### Versioning Strategy (Semantic Versioning)

```
MAJOR.MINOR.PATCH
  2  .  1  .  3

MAJOR: Breaking changes (v1 → v2)
MINOR: New features (backward compatible)
PATCH: Bug fixes
```

**Examples**:
- `1.0.0` - Initial release
- `1.1.0` - Added contractor tools feature
- `1.1.1` - Fixed calculator bug
- `2.0.0` - Redesigned permission system (breaking change)

---

## 19. UI Component Library & Design System

### shadcn/ui Components

**Installation**:
```bash
npx shadcn-ui@latest init
```

**Component Configuration**:
```typescript
// components.json
{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

**Add Components**:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add table
npx shadcn-ui@latest add card
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
```

### Design Tokens

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Colors */
    --primary: 210 100% 50%;        /* #0080FF */
    --primary-foreground: 0 0% 100%;
    
    --secondary: 210 20% 95%;
    --secondary-foreground: 210 20% 20%;
    
    --accent: 160 60% 50%;          /* Success green */
    --accent-foreground: 0 0% 100%;
    
    --destructive: 0 72% 51%;       /* Error red */
    --destructive-foreground: 0 0% 100%;
    
    --background: 0 0% 100%;
    --foreground: 210 15% 10%;
    
    --card: 0 0% 100%;
    --card-foreground: 210 15% 10%;
    
    --border: 210 15% 90%;
    --input: 210 15% 90%;
    --ring: 210 100% 50%;
    
    /* Spacing */
    --radius: 0.5rem;
    
    /* Typography */
    --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
    --font-mono: 'Fira Code', 'Courier New', monospace;
  }

  .dark {
    --primary: 210 100% 60%;
    --background: 210 20% 10%;
    --foreground: 0 0% 95%;
    /* ... dark mode tokens */
  }
}
```

### Component Examples

**Button Variants**:
```typescript
import { Button } from '@/components/ui/button';

function Examples() {
  return (
    <>
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      
      <Button disabled>Disabled</Button>
      <Button loading>Loading...</Button>
    </>
  );
}
```

**Form Example**:
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">
            {errors.email.message as string}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <p className="text-sm text-destructive mt-1">
            {errors.password.message as string}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Log in
      </Button>
    </form>
  );
}
```

### Accessibility Standards (WCAG 2.1 AA)

**Keyboard Navigation**:
```typescript
// All interactive elements must be keyboard accessible
<button onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' && handleClick()}>
  Click me
</button>

// Skip to main content
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

**ARIA Labels**:
```typescript
<button aria-label="Close dialog" onClick={onClose}>
  <X className="h-4 w-4" aria-hidden="true" />
</button>

<input
  type="text"
  aria-label="Search work orders"
  aria-describedby="search-help"
/>
<p id="search-help" className="sr-only">
  Search by work order number or customer name
</p>
```

**Color Contrast**:
- Text: Minimum 4.5:1 contrast ratio
- Large text (18pt+): Minimum 3:1
- UI components: Minimum 3:1

**Focus Indicators**:
```css
/* Visible focus styles */
button:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

---

## 20. Implementation Roadmap & Timeline

### Phase 1: Foundation (Weeks 1-4)

**Week 1: Project Setup**
- Day 1-2: Environment setup, repository initialization
- Day 3-4: Database schema design and creation
- Day 5: Authentication system (JWT, login/register)

**Week 2: Core Backend**
- Day 1-3: User management API
- Day 4-5: Role and permission system

**Week 3: Core Frontend**
- Day 1-2: React app setup, routing, layouts
- Day 3-4: Login/register UI
- Day 5: Dashboard skeleton

**Week 4: Integration**
- Day 1-2: Frontend-backend integration
- Day 3-4: Permission-based UI rendering
- Day 5: Testing and bug fixes

**Deliverables**:
- ✅ Working authentication
- ✅ Basic dashboard
- ✅ User/role management

---

### Phase 2: Core Features (Weeks 5-8)

**Week 5: Work Orders Module**
- CRUD operations
- Status workflow
- Assignment to technicians

**Week 6: Inventory Module**
- Stock management
- Purchase orders
- Warehouse operations

**Week 7: Dashboard Analytics**
- KPI cards
- Charts and graphs
- Real-time updates

**Week 8: Contractor Tools**
- Implement 20+ HVAC calculators
- Calculation history
- Mobile optimization

**Deliverables**:
- ✅ Complete work order management
- ✅ Inventory tracking
- ✅ Analytics dashboard
- ✅ Contractor tools operational

---

### Phase 3: Advanced Features (Weeks 9-12)

**Week 9: SSO & MFA**
- SAML integration
- TOTP/SMS MFA
- Session management

**Week 10: Third-Party Integrations**
- QuickBooks sync
- Twilio (SMS/Voice)
- SendGrid (Email)

**Week 11: Notifications & Real-time**
- WebSocket setup
- Multi-channel notifications
- Live updates

**Week 12: Permission Analytics**
- Usage tracking
- Self-service requests
- Compliance reports

**Deliverables**:
- ✅ Enterprise authentication
- ✅ Accounting integration
- ✅ Communication system
- ✅ Permission analytics

---

### Phase 4: Polish & Deploy (Weeks 13-16)

**Week 13: Security Hardening**
- Penetration testing
- OWASP Top 10 compliance
- Encryption implementation

**Week 14: Performance Optimization**
- Database query optimization
- Frontend bundle optimization
- Caching implementation

**Week 15: Testing & QA**
- Unit test coverage (80%+)
- E2E test suite
- Accessibility audit

**Week 16: Deployment & Documentation**
- Production deployment
- User documentation
- Training materials

**Deliverables**:
- ✅ Production-ready application
- ✅ Complete test coverage
- ✅ User documentation

---

### Dependency Matrix

```mermaid
graph TD
    A[Week 1: Project Setup] --> B[Week 2: Core Backend]
    A --> C[Week 3: Core Frontend]
    B --> D[Week 4: Integration]
    C --> D
    D --> E[Week 5: Work Orders]
    D --> F[Week 6: Inventory]
    D --> G[Week 7: Dashboard]
    E --> H[Week 8: Contractor Tools]
    F --> H
    D --> I[Week 9: SSO/MFA]
    E --> J[Week 10: Integrations]
    I --> K[Week 11: Notifications]
    J --> K
    G --> L[Week 12: Analytics]
    K --> M[Week 13: Security]
    M --> N[Week 14: Performance]
    N --> O[Week 15: Testing]
    O --> P[Week 16: Deploy]
```

---

### Milestones & Success Criteria

| Milestone | Week | Success Criteria |
|-----------|------|------------------|
| **M1: MVP Auth** | 4 | Users can login, roles assigned, permissions enforced |
| **M2: Core Modules** | 8 | Work orders and inventory fully functional |
| **M3: Enterprise Features** | 12 | SSO, MFA, integrations working |
| **M4: Production Ready** | 16 | All tests passing, deployed to production |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-18 | System | Initial comprehensive plan created |
| 1.1 | 2025-10-18 | System | Added zero dollar work order and call back tracking throughout plan:<br>- Added zero dollar WO and call back KPIs<br>- Integrated into all dashboard sections<br>- Added dedicated analytics endpoints<br>- Updated database schema with new columns<br>- Added labor tracking table<br>- Created detailed API response examples<br>- Added financial impact tracking |
| 1.2 | 2025-10-18 | System | Restructured user roles and permissions:<br>- Renamed: Inventory Manager → Warehouse Manager<br>- Removed: Manager role<br>- Added: Field Manager, Lead Dispatch, Lead Tech<br>- Added: Purchasing Manager, Purchasing<br>- Added: Warehouse Personnel<br>- Added: Accounting role<br>- Reorganized permission matrix into 3 tables for clarity<br>- Updated all role descriptions and permission details |
| 1.3 | 2025-10-19 | System | Added comprehensive role and permission customization system:<br>- Documented that current roles/permissions are defaults<br>- Added ability for admins to add/remove permissions from any role<br>- Implemented two permission assignment methods (full role or cherry-pick)<br>- Enabled dynamic permission management<br>- Roles are fully customizable but pre-loaded with defaults<br>- Added access control guidelines for permission management<br>- Included best practices for permission customization |
| 1.4 | 2025-10-19 | System | Added comprehensive technical implementation guide for custom roles:<br>- Complete database schema (6 tables) for roles, permissions, and assignments<br>- TypeScript data models and DTOs for all entities<br>- Full API endpoint specifications (25+ endpoints)<br>- Permission checking service with priority logic (deny > grant > role)<br>- NestJS authorization guard examples<br>- Permission naming conventions (resource:action:scope)<br>- Database seeding examples for default roles<br>- Caching strategy and performance optimization guidance<br>- Security considerations and testing best practices |
| 1.5 | 2025-10-19 | System | Added Owner/CEO role with protected permissions system:<br>- New role: Owner/CEO (position #2, between Super Admin and Admin)<br>- Owner/CEO has ALL permissions from ALL roles except Super Admin permissions<br>- Added "can_be_edited_by_admin" field to roles table and model<br>- Owner/CEO role is protected and cannot be edited by Admins by default<br>- Only Super Admin can toggle "can be edited by admin" setting<br>- Updated all permission matrix tables to include Owner/CEO<br>- Updated role hierarchy from 14 to 15 total roles<br>- Updated seeding examples with canBeEditedByAdmin flags<br>- Updated access control documentation |
| 1.6 | 2025-10-19 | System | Added 12 advanced permission system recommendations:<br>**Priority 1 (Must Have)**:<br>1. Team-scoped user management permissions (managers can manage their teams)<br>2. Permission groups/categories (bundle permissions for easier assignment)<br>3. Data-level permission scopes (own/team/department/all)<br>4. Simplified Owner/CEO implementation (dynamic aggregation or wildcard)<br>**Priority 2 (Should Have)**:<br>5. Role templates and inheritance (easier custom role creation)<br>6. Approval workflows for sensitive permissions<br>7. Permission conflict and violation detection<br>**Priority 3 (Nice to Have)**:<br>8. Time-based and conditional permissions<br>9. Permission delegation system<br>10. Bulk permission operations<br>11. Permission testing and simulation<br>12. Enhanced Admin audit log access<br>Added complete database schemas, TypeScript models, API endpoints, and implementation examples for all 12 recommendations. Includes impact summary: 13 new tables, 5 modified tables, ~25 new endpoints. |
| 2.0 | 2025-10-19 | System | **MAJOR RELEASE** - Comprehensive enterprise-ready enhancements covering security, usability, and integrations:<br>**Security Enhancements**:<br>- SSO/SAML/OIDC integration (Azure AD, Okta, Google Workspace)<br>- Multi-factor authentication (TOTP, SMS, Email, U2F, WebAuthn)<br>- Advanced session management (idle timeout, device trust, anomaly detection)<br>- Encryption standards (AES-256-GCM, KMS integration, field-level encryption)<br>- API security (rate limiting, input validation, XSS/CSRF prevention)<br>- Tamper-evident audit logs with cryptographic chain integrity<br>- Compliance reports (SOX, GDPR, HIPAA, PCI-DSS)<br>- Retention policies and automated data lifecycle<br>**User-Friendliness Enhancements**:<br>- Interactive onboarding tours (role-specific guided walkthroughs)<br>- Contextual help system with searchable knowledge base<br>- In-app notifications with multi-channel delivery (email, SMS, push)<br>- WCAG 2.1 AA accessibility compliance<br>- Mobile-responsive design with breakpoints<br>- Keyboard shortcuts and navigation<br>- User feedback widget (bug reports, feature requests, NPS surveys)<br>**Business Integrations**:<br>- Accounting/ERP sync (QuickBooks, Sage, Xero, NetSuite)<br>- Email integration (SendGrid, AWS SES) with templates<br>- SMS integration (Twilio) for notifications<br>- Phone integration with call tracking and recording<br>- Communication logs and cost tracking<br>**Disaster Recovery & Data Protection**:<br>- Automated backup system (full, incremental, differential)<br>- Encrypted backups with S3 Glacier storage<br>- RPO/RTO targets (1 hour / 4 hours)<br>- Backup integrity testing<br>- Point-in-time restoration<br>**Permission System Analytics**:<br>- Permission usage tracking and analytics<br>- Unused permission detection<br>- Toxic permission combination alerts<br>- Access review reports for compliance<br>- Self-service permission requests with approval workflows<br>- Auto-approval rules for routine requests<br>**Multi-Language Support**:<br>- i18n implementation with translation database<br>- User language preferences<br>- Timezone and date format customization<br>**Database Impact**: Added 25+ new tables, 10+ modified tables<br>**API Impact**: Added 60+ new endpoints across all features<br>**Total New Content**: 2,800+ lines of specifications, schemas, and implementation code |

---

## Approval & Sign-Off

This plan document serves as the blueprint for implementing the Admin Dashboard for the HVAC Management System. All stakeholders should review and approve before development begins.

**Stakeholders**:
- [ ] Product Owner
- [ ] Development Team Lead
- [ ] UX/UI Designer
- [ ] Database Administrator
- [ ] Quality Assurance Lead

---

**End of Admin Dashboard Plan**
