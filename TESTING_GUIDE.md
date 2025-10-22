# OpsNex Testing Guide
**Complete Feature Testing & User Guide**

---

## 🔐 Demo Account Credentials

### HVAC Demo Corp Tenant
**All demo user passwords:** `demo123`

| Email | Role | Access Level |
|-------|------|--------------|
| `owner@hvac.com` | OWNER | Full system access |
| `admin@hvac.com` | ADMIN | Administrative access |
| `manager@hvac.com` | FIELD_MANAGER | Field operations management |
| `supervisor@hvac.com` | FIELD_SUPERVISOR | Team supervision |
| `tech@hvac.com` | TECHNICIAN | Field technician access |
| `office@hvac.com` | OFFICE_MANAGER | Office operations |
| `warehouse@hvac.com` | WAREHOUSE_MANAGER | Inventory management |
| `sales@hvac.com` | SALES_REPRESENTATIVE | Sales & CRM |
| `service@hvac.com` | CUSTOMER_SERVICE_REPRESENTATIVE | Customer service |
| `accountant@hvac.com` | ACCOUNTANT | Financial access |
| `viewer@hvac.com` | VIEWER | Read-only access |
| `user@hvac.com` | USER | Basic user access |

### Super Admin Account
- **Email:** `admin@hvac.com`
- **Password:** `password123`
- **Access:** System-wide administration

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Login
1. Open the application
2. Use `owner@hvac.com` / `demo123` (recommended for first-time testing)
3. Click **Sign In**

### Step 2: Explore Dashboard
- View overview statistics (work orders, revenue, customers)
- Notice the clean interface with navigation sidebar

### Step 3: Try New Feature - Theme Toggle 🆕
1. Look at the **top-right corner** of the navigation bar
2. Click the **Sun icon** (☀️) to switch to **Light Mode**
3. Click the **Moon icon** (🌙) to switch back to **Dark Mode**
4. Your preference is automatically saved for next visit

### Step 4: Test Core Features
- Create a work order
- Browse inventory items
- Explore the Service Catalog (new pricing system)

---

## 🎨 NEW FEATURE: Light/Dark Mode Toggle

**Location:** Top navigation bar (top-right corner)

### How to Use:
1. **Current Theme Indicator:**
   - **Sun icon** (☀️) = Currently in dark mode (click to switch to light)
   - **Moon icon** (🌙) = Currently in light mode (click to switch to dark)

2. **Switching Themes:**
   - Simply click the icon to toggle between modes
   - The entire app updates instantly

3. **Persistence:**
   - Your theme preference is saved automatically
   - Returns to your preferred theme on next login

4. **Coverage:**
   - Login/Register pages
   - All dashboard modules
   - Navigation and sidebar
   - Forms and dialogs
   - Charts and reports

---

## 📋 Complete Feature Testing Checklist

### ✅ Authentication & User Management
- [ ] Login with different role accounts
- [ ] Test "Remember me" checkbox
- [ ] Logout functionality
- [ ] View user profile in Settings
- [ ] Change password in Settings

### ✅ Work Orders Management
- [ ] Browse 20 pre-loaded work orders
- [ ] Filter by status (Open, In Progress, Completed)
- [ ] Create new work order
- [ ] View work order details
- [ ] Edit existing work order
- [ ] Change work order status

### ✅ CRM (Customer Relationship Management)
- [ ] Browse 12 demo customer accounts
- [ ] View customer details
- [ ] Create new customer account
- [ ] Add contacts to accounts
- [ ] Manage leads (8 pre-loaded)
- [ ] Add notes to customer records

### ✅ Service Catalog & Pricebook 🆕
**Services Tab:**
- [ ] Browse 10 HVAC services ($49.99 - $149.99)
- [ ] View service details (description, pricing model, duration)
- [ ] Create new service with pricing:
  - Flat Rate (fixed price)
  - Hourly (rate × hours)
  - Time & Material (labor + materials)
- [ ] Edit existing service
- [ ] Delete service (with confirmation)

**Bundles Tab:**
- [ ] View Spring Maintenance Package
- [ ] View Fall Maintenance Package
- [ ] See bundle savings calculations
- [ ] Create new bundle
- [ ] Edit bundle pricing

**Labor Rates Tab:**
- [ ] View 4 rate tiers ($85 - $150/hour)
- [ ] Edit labor rates
- [ ] Set after-hours multipliers
- [ ] Mark default rate
- [ ] Create new labor rate tier

### ✅ Inventory Management
- [ ] Browse 35 HVAC SKUs
- [ ] View inventory by category:
  - Equipment (condensers, furnaces)
  - Parts (capacitors, motors, thermostats)
  - Supplies (filters, refrigerants, tubing)
  - Tools (gauges, pumps, kits)
- [ ] Check stock levels across 3 warehouses
- [ ] View SKU detail page
- [ ] See stock ledger transactions
- [ ] Add new SKU
- [ ] Update stock quantities

### ✅ Dispatch & Scheduling
- [ ] View technician calendars
- [ ] See unassigned work orders list
- [ ] **Drag and drop** work orders to technicians
- [ ] Test with 5 active technician accounts
- [ ] Verify schedule persistence (refresh page)
- [ ] Reassign work orders

### ✅ Purchasing
- [ ] View purchase orders
- [ ] Create new purchase order
- [ ] Add items to PO
- [ ] Submit for approval
- [ ] Track PO status

### ✅ Demand Forecasting
- [ ] View forecast dashboard
- [ ] Check KPIs (reorder points, turnover)
- [ ] Explore interactive charts
- [ ] Filter by time period
- [ ] Review reorder recommendations

### ✅ Labels Generator
- [ ] Search for SKU (try "filter")
- [ ] Select label size
- [ ] Choose fields to display
- [ ] Preview barcode label
- [ ] Download as PDF
- [ ] Print label

### ✅ Barcode Scanner
- [ ] Allow camera access
- [ ] Scan product barcode
- [ ] Test exact SKU match
- [ ] Test fuzzy matching
- [ ] Navigate to SKU detail page
- [ ] Scan multiple items

### ✅ Field Tools (21 Calculators)
**Airflow & Ventilation:**
- [ ] CFM Calculator
- [ ] Duct Sizing Calculator
- [ ] Static Pressure Calculator

**Cooling & Heating:**
- [ ] BTU Calculator
- [ ] Tonnage Calculator
- [ ] Heat Load Calculator

**Electrical:**
- [ ] Voltage Drop Calculator
- [ ] Amperage Calculator
- [ ] Wire Size Calculator

**Refrigeration:**
- [ ] Superheat Calculator
- [ ] Subcooling Calculator
- [ ] Charging Calculator

**And more categories...**

**AI Cost Estimator:** 🤖
- [ ] Click "AI Cost Estimator"
- [ ] Try **Quick Estimate** (5-min)
  - Describe job: "Replace 3-ton AC unit"
  - Get instant pricing breakdown
- [ ] Try **Comprehensive Estimate** (full)
  - Provide detailed job info
  - Receive complete estimate with:
    - Labor costs
    - Materials list
    - Permits & fees
    - Overhead & profit margins
- [ ] Save estimate to work order
- [ ] View estimate history

### ✅ AI Assistant
- [ ] Open AI chat
- [ ] Try quick suggestions:
  - Diagnose low airflow
  - Refrigerant charging guide
  - Troubleshooting tips
- [ ] Ask custom HVAC questions
- [ ] Use feedback buttons (helpful/not helpful)
- [ ] View formatted responses with markdown

### ✅ Notifications System
- [ ] View notification bell (top-right)
- [ ] See unread count badge
- [ ] Open notification panel
- [ ] Mark notifications as read
- [ ] View notification history
- [ ] Receive new notifications (30s polling)

### ✅ Settings
- [ ] View user profile
- [ ] Update profile information
- [ ] Change password
- [ ] Configure notification preferences

### ✅ Super Admin Panel
**Login as:** `admin@hvac.com` / `password123`
- [ ] Access Super Admin menu
- [ ] View all users across tenants
- [ ] Manage roles & permissions
- [ ] View tenant list
- [ ] Create new tenant
- [ ] Assign user permissions

### ✅ Theme Toggle 🆕
- [ ] Switch to light mode
- [ ] Switch to dark mode
- [ ] Verify all pages render correctly in both themes
- [ ] Check theme persistence after logout/login
- [ ] Test on different pages (dashboard, forms, charts)

### ✅ Mobile Responsive Design
- [ ] Resize browser to mobile width (375px)
- [ ] Test hamburger menu navigation
- [ ] Check touch-friendly inputs
- [ ] Verify responsive tables (horizontal scroll)
- [ ] Test forms on mobile
- [ ] Try drag-and-drop on touchscreen

---

## 🎯 Role-Based Testing

### Test Permission Levels
1. **OWNER** (`owner@hvac.com`) - Should see everything
2. **VIEWER** (`viewer@hvac.com`) - Should have read-only access
3. **TECHNICIAN** (`tech@hvac.com`) - Should see field-focused features
4. **WAREHOUSE_MANAGER** (`warehouse@hvac.com`) - Should focus on inventory

### What to Check:
- Which menu items appear for each role
- Create/Edit/Delete button visibility
- Access to sensitive features
- Data visibility scope

---

## 🔍 Advanced Testing Scenarios

### Scenario 1: Complete Work Order Lifecycle
1. Login as `sales@hvac.com`
2. Create customer account
3. Create work order for customer
4. Login as `manager@hvac.com`
5. Assign work order to technician via Dispatch
6. Login as `tech@hvac.com`
7. View assigned work order
8. Use Field Tools to calculate job requirements
9. Use AI Cost Estimator for pricing
10. Update work order status to "Completed"

### Scenario 2: Inventory Management Flow
1. Login as `warehouse@hvac.com`
2. Check low-stock items in Forecasting
3. Create purchase order in Purchasing
4. Generate labels for new inventory
5. Update stock quantities
6. Verify stock ledger entries

### Scenario 3: Service Catalog Setup
1. Login as `admin@hvac.com`
2. Create new HVAC service (e.g., "Emergency Repair")
3. Set pricing model to Hourly
4. Create seasonal bundle with multiple services
5. Assign labor rates
6. Test pricing calculations

---

## 💡 Testing Tips

### Performance Testing
- Open multiple tabs/windows
- Test with slow network (browser dev tools)
- Check page load times
- Verify lazy loading on navigation

### Data Integrity
- Create records and verify they persist
- Test form validations
- Try invalid inputs
- Check error messages

### Browser Compatibility
- Test on Chrome, Firefox, Safari, Edge
- Check mobile browsers (iOS Safari, Chrome Mobile)
- Verify responsive breakpoints

### UI/UX Testing
- Check loading states
- Verify error states
- Test empty states (no data)
- Confirm success messages
- Review toast notifications

---

## 📊 Sample Test Data

### Demo Work Orders (20 total)
- Statuses: Open, In Progress, On Hold, Completed, Cancelled
- Priorities: Low, Medium, High, Urgent
- Types: Maintenance, Repair, Installation, Inspection

### Demo Inventory (35 SKUs)
- **Filters:** 1" MERV 8, 4" MERV 13, 20x25x1
- **Refrigerants:** R-410A, R-22
- **Equipment:** 3-4 Ton Condensers, 80-100K BTU Furnaces
- **Parts:** Capacitors, Motors, Contactors
- **Tools:** Manifold Gauges, Vacuum Pumps

### Demo Services (10 items)
- AC Tune-Up: $149.99
- Furnace Inspection: $99.99
- Filter Replacement: $49.99
- Duct Cleaning: $299.99
- System Installation: $5,999.99

---

## 🐛 Known Limitations

1. **Service Bundles:** Can edit pricing but cannot add/remove services via UI (requires API calls)
2. **Notifications:** Uses HTTP polling (30s interval) instead of WebSocket
3. **Demo Environment:** All data resets periodically

---

## 🚀 Deployment Ready

The application is production-ready and can be deployed with:
- Multi-tenant architecture
- Role-based access control (13 roles, 114 permissions)
- PostgreSQL database with 69 tables
- JWT authentication
- API documentation at `/api/v1/docs`

---

## 📞 Support & Documentation

- **API Documentation:** Visit `/api/v1/docs` (Swagger UI)
- **Database Seeding:** Run `npm run seed:all` for complete demo data
- **RBAC Setup:** Run `npm run seed:rbac` for roles & permissions

---

## ✨ Summary

OpsNex is a comprehensive HVAC management platform with:
- ✅ 12 demo users across all roles
- ✅ Complete work order management
- ✅ Advanced CRM system
- ✅ Real-time inventory tracking
- ✅ Service catalog with flexible pricing
- ✅ AI-powered tools (Chat + Cost Estimator)
- ✅ Barcode scanning & label generation
- ✅ 21 HVAC field calculators
- ✅ Drag-and-drop dispatch scheduling
- ✅ Demand forecasting & analytics
- ✅ Light/dark mode toggle
- ✅ Mobile-responsive design
- ✅ Multi-tenant support

**Start testing with:** `owner@hvac.com` / `demo123`

**Happy Testing!** 🎉
