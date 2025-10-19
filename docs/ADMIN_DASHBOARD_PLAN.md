# Admin Dashboard Plan - HVAC Management System

## Document Information
- **Version**: 1.5
- **Last Updated**: October 19, 2025
- **Status**: Planning Phase
- **Recent Changes**: Added Owner/CEO role with protected permissions system

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

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-18 | System | Initial comprehensive plan created |
| 1.1 | 2025-10-18 | System | Added zero dollar work order and call back tracking throughout plan:<br>- Added zero dollar WO and call back KPIs<br>- Integrated into all dashboard sections<br>- Added dedicated analytics endpoints<br>- Updated database schema with new columns<br>- Added labor tracking table<br>- Created detailed API response examples<br>- Added financial impact tracking |
| 1.2 | 2025-10-18 | System | Restructured user roles and permissions:<br>- Renamed: Inventory Manager → Warehouse Manager<br>- Removed: Manager role<br>- Added: Field Manager, Lead Dispatch, Lead Tech<br>- Added: Purchasing Manager, Purchasing<br>- Added: Warehouse Personnel<br>- Added: Accounting role<br>- Reorganized permission matrix into 3 tables for clarity<br>- Updated all role descriptions and permission details |
| 1.3 | 2025-10-19 | System | Added comprehensive role and permission customization system:<br>- Documented that current roles/permissions are defaults<br>- Added ability for admins to add/remove permissions from any role<br>- Implemented two permission assignment methods (full role or cherry-pick)<br>- Enabled dynamic permission management<br>- Roles are fully customizable but pre-loaded with defaults<br>- Added access control guidelines for permission management<br>- Included best practices for permission customization |
| 1.4 | 2025-10-19 | System | Added comprehensive technical implementation guide for custom roles:<br>- Complete database schema (6 tables) for roles, permissions, and assignments<br>- TypeScript data models and DTOs for all entities<br>- Full API endpoint specifications (25+ endpoints)<br>- Permission checking service with priority logic (deny > grant > role)<br>- NestJS authorization guard examples<br>- Permission naming conventions (resource:action:scope)<br>- Database seeding examples for default roles<br>- Caching strategy and performance optimization guidance<br>- Security considerations and testing best practices |
| 1.5 | 2025-10-19 | System | Added Owner/CEO role with protected permissions system:<br>- New role: Owner/CEO (position #2, between Super Admin and Admin)<br>- Owner/CEO has ALL permissions from ALL roles except Super Admin permissions<br>- Added "can_be_edited_by_admin" field to roles table and model<br>- Owner/CEO role is protected and cannot be edited by Admins by default<br>- Only Super Admin can toggle "can be edited by admin" setting<br>- Updated all permission matrix tables to include Owner/CEO<br>- Updated role hierarchy from 14 to 15 total roles<br>- Updated seeding examples with canBeEditedByAdmin flags<br>- Updated access control documentation |

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
