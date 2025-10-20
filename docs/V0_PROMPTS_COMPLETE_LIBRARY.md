# Complete v0.dev Prompt Library - HVAC Management System
**Copy-Paste Ready Prompts for Every Component**

---

## 📋 How to Use This Document

1. Copy any prompt below
2. Go to https://v0.dev
3. Paste the prompt
4. Select the design you like (v0 shows 3 variations)
5. Click "Code" → Copy the TypeScript/React code
6. Paste into your app at `frontend/src/components/ui/[ComponentName].tsx`

**Colors Reference:**
- Primary Blue: `#2563eb`
- Success Green: `#10b981`
- Warning Yellow: `#f59e0b`
- Error Red: `#ef4444`
- Grays: `#f3f4f6`, `#e5e7eb`, `#9ca3af`, `#6b7280`, `#374151`

---

## 🎨 Part 1: Core Design System Components

### 1.1 Button Component

```
Create a reusable Button component for an HVAC management app using React and TypeScript.

Requirements:
- 4 variants: primary, secondary, destructive, ghost
- 3 sizes: small (40px), medium (48px), large (56px for mobile touch)
- States: default, hover, focus, disabled, loading
- Props: variant, size, disabled, loading, onClick, children, className
- Primary: solid blue (#2563eb), white text
- Secondary: outline blue, blue text
- Destructive: solid red (#ef4444), white text
- Ghost: transparent, gray text
- Loading state: spinner icon
- Focus: blue ring for accessibility
- Disabled: 50% opacity, not-allowed cursor

Use Tailwind CSS, TypeScript, make fully accessible with ARIA labels.
Mobile-first with large touch targets.

Export as: export const Button = ({ ... }) => { ... }
```

---

### 1.2 Input Components

```
Create a comprehensive Input component library for HVAC app with React TypeScript.

Components needed:

1. TextInput
- Label above input
- Placeholder text
- Error message below (red text)
- Helper text (gray)
- Required indicator (*)
- States: default, focus (blue ring), error (red border), disabled
- Height: 56px for mobile touch
- Props: label, placeholder, error, helperText, required, disabled, value, onChange

2. NumberInput
- Same as TextInput but type="number"
- Step controls (+ / - buttons on right)
- Large buttons for mobile (44px min)

3. Select (Dropdown)
- Custom styled select with chevron icon
- Options list
- Same states as TextInput
- Props: label, options, value, onChange, error

4. TextArea
- Multi-line input
- Auto-resize option
- Character count (optional)
- Minimum 120px height

5. DateInput
- Native date picker
- Calendar icon on right
- Format: MM/DD/YYYY placeholder

Use Tailwind CSS, TypeScript, WCAG AA accessible.
Blue theme (#2563eb), large touch targets for mobile.
Export each component separately.
```

---

### 1.3 Card Components

```
Create 4 card component variants for HVAC management app using React TypeScript.

1. BaseCard
- White background, shadow, rounded corners (8px)
- Padding: 16px on mobile, 24px on desktop
- Hover: slight shadow increase
- Props: children, className, onClick (optional)

2. WorkOrderCard
- Display work order summary
- Props: 
  - status: 'scheduled' | 'in-progress' | 'completed' | 'invoiced'
  - customer: string
  - address: string
  - timeSlot: string
  - jobType: string
  - technicianName?: string
- Layout:
  - Status badge (top right)
  - Customer name (bold, 18px)
  - Address (gray, 14px)
  - Time slot (blue, 16px)
  - Job type (16px)
  - Technician (if assigned)
  - "View Details" button at bottom
- Status colors:
  - Scheduled: gray (#6b7280)
  - In Progress: blue (#2563eb)
  - Completed: green (#10b981)
  - Invoiced: purple (#8b5cf6)
- Mobile: full width, stack vertically
- Desktop: max-width 400px

3. KPICard
- Dashboard metric display
- Props:
  - title: string
  - value: string | number
  - trend?: number (percentage change)
  - icon?: React.ReactNode
- Layout:
  - Icon (top left, 40px)
  - Title (gray, 14px, top)
  - Value (large, 32px, bold)
  - Trend indicator (green ↑ or red ↓)
- Colors: trend green if positive, red if negative

4. CalculatorCard
- Field Tools calculator selector
- Props:
  - icon: string (emoji)
  - name: string
  - description: string
  - onClick: () => void
- Layout:
  - Large emoji icon (48px, centered)
  - Calculator name (16px, bold)
  - Description (14px, gray)
  - Hover: scale 1.02, shadow increase
- Mobile: min height 140px, full tap area

Use Tailwind CSS, TypeScript, responsive, accessible.
Export all 4 variants.
```

---

### 1.4 Badge Component

```
Create a StatusBadge component for HVAC app using React TypeScript.

Requirements:
- Show work order status with color coding
- Props: status: 'scheduled' | 'in-progress' | 'completed' | 'invoiced' | 'cancelled'
- Styles:
  - Scheduled: gray background (#e5e7eb), gray text (#6b7280)
  - In Progress: blue background (#dbeafe), blue text (#2563eb)
  - Completed: green background (#d1fae5), green text (#10b981)
  - Invoiced: purple background (#e9d5ff), purple text (#8b5cf6)
  - Cancelled: red background (#fee2e2), red text (#ef4444)
- Size: padding 4px 12px, rounded-full, 14px font, medium weight
- Display: inline-flex, center items
- Optional dot indicator before text
- Mobile: min height 28px for touch

Also create variants:
- PriorityBadge: low (gray), medium (yellow), high (orange), emergency (red)
- TypeBadge: for job types (maintenance, repair, installation, emergency)

Use Tailwind CSS, TypeScript.
Export all badge variants.
```

---

### 1.5 Modal/Dialog Component

```
Create a Modal component for HVAC app using React TypeScript.

Requirements:
- Overlay: semi-transparent black background
- Modal: white card, centered, max-width 600px on desktop, full-width on mobile
- Header: title, close button (X)
- Body: children content
- Footer: action buttons (optional)
- Props:
  - isOpen: boolean
  - onClose: () => void
  - title: string
  - children: React.ReactNode
  - footer?: React.ReactNode
  - size?: 'small' | 'medium' | 'large'
- Animation: fade in/out, scale
- Close on: click outside, press Escape, click X
- Accessibility: trap focus, ARIA labels, role="dialog"
- Prevent body scroll when open
- Mobile: slide up from bottom, full height
- Desktop: center with max-height 90vh, scrollable body

Use Tailwind CSS, TypeScript, Framer Motion for animations (optional).
Fully accessible with keyboard navigation.
```

---

### 1.6 Toast Notification Component

```
Create a Toast notification system for HVAC app using React TypeScript.

Requirements:
- 4 types: success, error, warning, info
- Position: top-right on desktop, top-center on mobile
- Auto-dismiss: 5 seconds (configurable)
- Manual dismiss: X button
- Stacking: multiple toasts stack vertically
- Animation: slide in from right, fade out
- Icons: checkmark (success), X (error), warning triangle, info circle
- Colors:
  - Success: green (#10b981) border/icon, white bg
  - Error: red (#ef4444) border/icon, white bg
  - Warning: yellow (#f59e0b) border/icon, white bg
  - Info: blue (#2563eb) border/icon, white bg

Props:
- type: 'success' | 'error' | 'warning' | 'info'
- message: string
- duration?: number (ms)
- onClose: () => void

Also create ToastProvider/useToast hook:
```typescript
const { showToast } = useToast();
showToast({ type: 'success', message: 'Work order created!' });
```

Use Tailwind CSS, TypeScript, accessible with ARIA live regions.
```

---

## 🧭 Part 2: Navigation Components

### 2.1 Sidebar Navigation

```
Create a Sidebar navigation component for HVAC desktop app using React TypeScript.

Requirements:
- Fixed left sidebar, 280px width
- White background, border-right
- Logo/company name at top (48px height)
- Navigation items:
  - Dashboard
  - Work Orders
  - CRM
  - Inventory
  - Purchasing
  - Dispatch & Scheduling
  - Labels
  - Forecasting
  - Barcode Scanner
  - Field Tools
  - AI Assistant
- Each item:
  - Icon (left, 20px)
  - Label (16px)
  - Active state: blue background (#eff6ff), blue text (#2563eb), left border (3px)
  - Hover: light gray background
  - Height: 44px, padding 12px
- User profile at bottom:
  - Avatar (32px circle)
  - Name and role
  - Logout button
- Mobile: collapsible hamburger menu
- Props: activeItem, onNavigate, userInfo
- Use React Router Link for navigation

Use Tailwind CSS, TypeScript, responsive.
Include collapse/expand button for desktop.
```

---

### 2.2 Top Bar

```
Create a TopBar component for HVAC app using React TypeScript.

Requirements:
- Fixed top, full width, 64px height
- White background, bottom border
- Layout (left to right):
  1. Hamburger menu icon (mobile only, toggle sidebar)
  2. Page title (20px, bold)
  3. Search bar (center on desktop, hidden on mobile)
  4. Notification bell icon with badge count
  5. User avatar with dropdown menu
- Search bar:
  - Input with magnifying glass icon
  - Placeholder: "Search work orders, customers, SKUs..."
  - Width: 400px max on desktop
  - Focus: blue ring
- Notification badge:
  - Red dot if unread
  - Number badge if count > 1
  - Dropdown: list of recent notifications
- User dropdown:
  - Profile
  - Settings
  - Logout
- Z-index high for fixed positioning

Props: 
- pageTitle: string
- notificationCount: number
- userInfo: { name, avatar, role }
- onSearch: (query: string) => void

Use Tailwind CSS, TypeScript, responsive.
Dropdown menus with click-outside-to-close.
```

---

### 2.3 Bottom Navigation (Mobile)

```
Create a mobile BottomNavigation component for HVAC app using React TypeScript.

Requirements:
- Fixed bottom, full width, 72px height
- White background, top border, shadow
- 4 navigation items:
  1. Home (house icon)
  2. Work Orders (clipboard icon)
  3. Field Tools (wrench icon)
  4. Profile (person icon)
- Each item:
  - Icon (24px)
  - Label (12px)
  - Active state: blue icon and text (#2563eb)
  - Inactive: gray (#6b7280)
  - Center aligned, stacked vertically
  - Tap area: full width of item
- Props: activeTab, onTabChange
- Safe area padding for iOS devices
- Only show on mobile (hidden above 768px breakpoint)

Use Tailwind CSS, TypeScript.
Include haptic feedback on tap (if supported).
Export as: export const BottomNav = ({ ... }) => { ... }
```

---

### 2.4 Breadcrumbs Component

```
Create a Breadcrumbs component for HVAC app using React TypeScript.

Requirements:
- Display navigation path: Home > CRM > Accounts > Johnson Residence
- Each item clickable except last (current page)
- Separator: > or / (chevron-right icon)
- Active (current) item: bold, not clickable
- Previous items: blue links, hover underline
- Mobile: show only last 2 items to save space
- Props: items: Array<{ label: string, href?: string }>

Example usage:
```typescript
<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'CRM', href: '/crm' },
  { label: 'Accounts', href: '/crm/accounts' },
  { label: 'Johnson Residence' } // current page, no href
]} />
```

Use Tailwind CSS, TypeScript, React Router Link.
Accessibility: ARIA breadcrumb navigation.
```

---

## 📊 Part 3: Dashboard Components

### 3.1 Technician Dashboard

```
Create a mobile-first Technician Dashboard for HVAC app using React TypeScript.

Requirements:
- Header: "Today's Schedule" with current date
- User greeting: "Good morning, John!" with avatar
- KPI Summary (2 cards in row):
  - Jobs Today: number with icon
  - Hours Worked: number with icon
- Work Orders Section:
  - Title: "Assigned Jobs"
  - List of WorkOrderCards (3-5)
  - Each card shows: customer, address, time slot, job type, status
  - Click to view details
  - Empty state: "No jobs scheduled for today"
- Quick Actions (grid 2x2):
  - "Field Tools" (large, blue, wrench icon)
  - "Scanner" (barcode icon)
  - "Update Status" (checkmark icon)
  - "Report Issue" (warning icon)
- Map Preview (optional):
  - Show today's route with pins
  - "View Full Route" button

Props:
- technicianName: string
- jobsToday: number
- hoursWorked: number
- workOrders: WorkOrder[]

Styling:
- Mobile-first, padding 16px
- Card spacing 12px
- Touch-friendly (min 44px tap targets)
- Blue theme (#2563eb)

Use Tailwind CSS, TypeScript, responsive.
Include pull-to-refresh gesture area at top.
```

---

### 3.2 Dispatcher Dashboard

```
Create a Dispatcher Dashboard for HVAC app using React TypeScript.

Requirements:
- Header: "Dispatch Overview" with date/time (live clock)
- KPI Row (4 cards):
  - Active Jobs: count with trend
  - Available Techs: count with status dots (green=available, yellow=break, red=busy)
  - Emergency Calls: count with alert icon
  - Avg Response Time: time in minutes
- Today's Schedule Section:
  - Calendar/timeline view of all technicians
  - Time slots: 7 AM - 7 PM
  - Drag-and-drop work orders to assign
  - Color-coded by status
  - Click technician to see details
- Unassigned Jobs Panel (right sidebar):
  - List of work orders not yet assigned
  - Priority indicators (emergency = red)
  - "Assign" button on each
  - Drag to schedule
- Quick Actions:
  - "Create Work Order" button (large, blue)
  - "Emergency Call" button (red)
  - Filter/Search bar
- Real-time updates indicator (badge)

Props:
- activeJobs: number
- availableTechs: number
- emergencyCalls: number
- avgResponseTime: number
- technicians: Technician[]
- workOrders: WorkOrder[]
- unassigned: WorkOrder[]

Desktop optimized, responsive for tablet.
Use Tailwind CSS, TypeScript.
Drag-and-drop library: @dnd-kit or react-beautiful-dnd
```

---

### 3.3 Manager Dashboard

```
Create an Executive Manager Dashboard for HVAC app using React TypeScript.

Requirements:
- Header: "Executive Overview" with date range selector
- KPI Grid (2 rows x 3 columns):
  Row 1:
  - Total Revenue: $ amount with trend % (green/red arrow)
  - Active Work Orders: count
  - Customer Satisfaction: rating (4.7/5 stars)
  Row 2:
  - Technician Utilization: % with gauge
  - Avg Job Duration: hours
  - Parts Cost: $ amount
- Charts Section (2 columns):
  - Revenue Chart (left): Line chart, last 30 days
  - Job Status Distribution (right): Donut chart (scheduled, in-progress, completed)
- Performance Table:
  - Top 5 Technicians ranking
  - Columns: Name, Jobs Completed, Avg Duration, Customer Rating
  - Click to drill down
- Recent Activity Feed:
  - Last 10 activities (job completed, new customer, etc.)
  - Timestamps
  - Icons per activity type
- Quick Actions:
  - "View Reports" button
  - "Export Data" button
  - Date range picker

Props:
- revenue: { value: number, trend: number }
- activeWorkOrders: number
- satisfaction: number
- utilization: number
- avgDuration: number
- partsCost: number
- revenueData: Array<{ date: string, amount: number }>
- jobDistribution: { scheduled: number, inProgress: number, completed: number }
- topTechnicians: Technician[]
- recentActivity: Activity[]

Desktop optimized (1280px+), tablet responsive.
Use Tailwind CSS, TypeScript.
Charts: Recharts or Chart.js
```

---

## 📝 Part 4: Work Order Components

### 4.1 Work Order List Page

```
Create a Work Order List page for HVAC app using React TypeScript.

Requirements:
- Header:
  - Title: "Work Orders"
  - "Create Work Order" button (blue, top right)
  - Search bar (search by customer, WO#, address)
- Filters Bar:
  - Status dropdown: All, Scheduled, In Progress, Completed, Invoiced
  - Date range picker
  - Technician filter (multi-select)
  - Priority filter: All, Emergency, High, Medium, Low
  - "Clear Filters" button
  - Active filter count badge
- Table (desktop) / Cards (mobile):
  - Columns: WO#, Customer, Status, Technician, Scheduled Date, Job Type, Actions
  - Sortable columns (click header)
  - Pagination: 25 per page
  - Row actions: View, Edit, Delete (icons)
  - Row click: navigate to detail page
- Mobile view:
  - WorkOrderCard for each item
  - Swipe left to delete
  - Pull to refresh
- Empty state: "No work orders found" with illustration
- Loading state: skeleton cards

Props:
- workOrders: WorkOrder[]
- totalCount: number
- currentPage: number
- filters: FilterState
- onFilterChange: (filters) => void
- onCreateNew: () => void
- onView: (id) => void
- onEdit: (id) => void
- onDelete: (id) => void

Use Tailwind CSS, TypeScript, React Table or TanStack Table.
Responsive, mobile-first.
```

---

### 4.2 Work Order Detail Page

```
Create a Work Order Detail page for HVAC app using React TypeScript.

Requirements:
- Header:
  - WO# and status badge
  - Action buttons: Edit, Delete, Print, Export
  - Back button
- Status Bar:
  - Visual progress: Scheduled → In Progress → Completed → Invoiced
  - Current step highlighted
  - Update Status dropdown (inline)
- Tabs:
  1. Details
  2. Tasks
  3. Parts
  4. Field Calculations
  5. Notes
  6. Photos
  7. History

Tab 1 - Details:
- Customer Info: name, address, phone (click to call), email
- Scheduled Date/Time: editable date picker
- Assigned Technician(s): avatar chips, reassign button
- Job Type: dropdown
- Priority: badge with edit
- Description: text area

Tab 2 - Tasks:
- Checklist items with checkboxes
- Add task button
- Mark all complete button
- Completed tasks: strikethrough, gray

Tab 3 - Parts:
- Table: SKU, Description, Qty, Unit Cost, Total
- Add Part button (opens SKU search)
- Barcode scanner button
- Total Parts Cost at bottom

Tab 4 - Field Calculations:
- List of saved calculator results
- Each shows: Calculator Type, Technician, Timestamp, View Details
- Click to expand: inputs, outputs, interpretation
- Example: "Superheat: 12°F (Normal ✓)" with green badge

Tab 5 - Notes:
- Timeline of notes with timestamps and author
- Add note textarea at top
- Submit button
- Notes sortable by newest/oldest

Tab 6 - Photos:
- Image grid (3 columns)
- Upload button (camera on mobile, file picker on desktop)
- Click to enlarge (lightbox)
- Before/After labels

Tab 7 - History:
- Audit log of all changes
- Timestamp, user, action (e.g., "Status changed from Scheduled to In Progress")

Props:
- workOrder: WorkOrder (with all related data)
- onUpdate: (field, value) => void
- onAddNote: (note) => void
- onAddPhoto: (file) => void
- onAddPart: (sku) => void

Use Tailwind CSS, TypeScript, React Tabs library.
Mobile responsive (tabs become accordion on mobile).
```

---

### 4.3 Work Order Create/Edit Form

```
Create a Work Order Create/Edit form for HVAC app using React TypeScript.

Requirements:
- Multi-step form (wizard):
  Step 1: Customer & Schedule
  Step 2: Job Details
  Step 3: Assignment
  Step 4: Review & Submit

Step 1 - Customer & Schedule:
- Customer Search: autocomplete input (search by name, phone, address)
- Selected customer: show card with contact info
- "New Customer" button (quick create modal)
- Scheduled Date: date picker
- Time Slot: time picker or preset slots (9-11 AM, 11-1 PM, etc.)
- Duration Estimate: number input (hours)

Step 2 - Job Details:
- Job Type: select (Maintenance, Repair, Installation, Emergency)
- Priority: select (Low, Medium, High, Emergency)
- Description: textarea (required)
- Special Instructions: textarea (optional)

Step 3 - Assignment:
- Assign Technician: select or multi-select
- Show technician availability (color dots: green=available, yellow=partially, red=busy)
- Auto-assign button (AI suggests best tech based on skills, location, availability)
- Check Parts Availability: toggle
- If toggled, show parts search and add to job

Step 4 - Review & Submit:
- Summary of all entered data
- Edit buttons for each section
- Terms checkbox (if required)
- Submit button (large, blue)
- Save as Draft button (gray)

Progress indicator: dots or progress bar showing current step
Navigation: Back, Next, Cancel buttons

Props:
- mode: 'create' | 'edit'
- initialData?: WorkOrder
- onSubmit: (data) => void
- onSaveDraft: (data) => void
- onCancel: () => void

Validation:
- Required fields highlighted
- Inline error messages
- Can't proceed to next step if current step invalid

Use Tailwind CSS, TypeScript, React Hook Form for validation.
Mobile-first, responsive.
Auto-save draft every 30 seconds.
```

---

## 🔧 Part 5: Field Tools - All 21 Calculators

### 5.1 Field Tools Home Page

```
Create a Field Tools home page for HVAC app using React TypeScript.

Requirements:
- Header: "Field Tools" with search bar
- Category sections (6 sections):

1. ⚡ Electrical (4 tools)
2. ❄️ Refrigeration (4 tools)
3. 💨 Airflow (3 tools)
4. 🔥 Gas/Combustion (3 tools)
5. 💧 Hydronic/Boiler (3 tools)
6. 🔄 Utilities (4 tools)

Each section:
- Category header with icon and count
- Grid of calculator cards (2 columns on mobile, 3 on tablet, 4 on desktop)
- Each card:
  - Large emoji icon (48px)
  - Calculator name (16px, bold)
  - Brief description (14px, gray)
  - Click to open calculator
  - Hover: scale 1.02, shadow increase

Calculator Cards (21 total):

Electrical:
- 🔋 Ohm's Law - Calculate V, I, R, and Power
- ⚡ Capacitor Test - Test capacitors with ±10% tolerance
- 🔌 Motor Amps - Check motor load percentage
- 📊 Voltage Drop - Calculate voltage drop & wire sizing

Refrigeration:
- 🌡️ Superheat - Measure superheat for charge diagnosis
- ❄️ Subcooling - Measure subcooling for charge verification
- 🎯 Target Superheat - Calculate target superheat from conditions
- 📋 PT Chart - Pressure-Temperature reference chart

Airflow:
- 💨 CFM Calculator - Calculate airflow from BTU/hr and ΔT
- 🔧 Duct Sizer - Size ducts based on CFM and velocity
- 📏 Static Pressure - Calculate total external static pressure

Gas/Combustion:
- 🔥 Gas Pipe Sizer - Size gas pipes for furnaces
- 💨 Combustion Air - Calculate combustion air requirements
- 🔬 Combustion Analysis - Reference values for testing

Hydronic/Boiler:
- 💧 Expansion Tank - Size expansion tanks for closed systems
- 🌊 Hydronic Flow - Calculate GPM and pump sizing
- 🏠 Radiant Floor - Design radiant floor heating

Utilities:
- 🌡️ Psychrometric - Dew point, wet bulb, humidity
- ⚖️ Tonnage Converter - Convert BTU/hr to tons
- 🔄 Unit Converter - General HVAC unit conversions
- 📐 Heat Load - Simplified Manual J calculation

Props:
- onSelectCalculator: (calculatorId) => void
- recentlyUsed?: string[] (show "Recently Used" section at top)

Search: filter calculators by name or description
Mobile-first, lazy load calculator components
Use Tailwind CSS, TypeScript
```

---

### 5.2 Electrical - Ohm's Law Calculator

```
Create an Ohm's Law Calculator for HVAC technicians using React TypeScript.

Requirements:
- Title: "Ohm's Law Calculator" with back button
- Formula display: V = I × R, P = V × I
- Calculate any value when you have 2 others
- 4 input fields (large, 56px height for mobile):
  1. Voltage (V) - Volts
  2. Current (I) - Amps
  3. Resistance (R) - Ohms
  4. Power (P) - Watts
- Logic: When user enters 2 values, calculate the other 2
- Clear distinction: filled inputs (user entered) vs calculated (read-only, blue background)
- Reset button to clear all
- Result Display:
  - Show all 4 values with units
  - Calculated values in blue boxes
- Example button: prefill with common scenario
- Save to Work Order button (green, full width)
  - Opens modal to select work order
  - Saves inputs, outputs, timestamp
- Help section (expandable):
  - When to use this calculator
  - Common HVAC applications
  - Formula explanations

Props:
- onSave?: (data) => void

Validation:
- Only allow 2 inputs at a time
- Show "Enter 2 values to calculate" message
- Prevent negative numbers

Mobile-first, large touch targets
Use Tailwind CSS, TypeScript
Real-time calculation (no "Calculate" button needed)
```

---

### 5.3 Electrical - Capacitor Test Tool

```
Create a Capacitor Test Tool for HVAC technicians using React TypeScript.

Requirements:
- Title: "Capacitor Test Tool" with back button
- Subtitle: "Test run/start capacitors with ±10% tolerance"
- Input Section:
  1. Rated Capacity (from capacitor label) - μF (microfarads)
  2. Measured Capacity (from meter) - μF
- Calculate Button (large, blue)
- Result Display:
  - Acceptable Range: [min - max] μF (green box)
  - Your Reading: [measured] μF
  - Status (large, prominent):
    - ✓ PASS - Green background if within ±10%
    - ✗ FAIL - Red background if outside ±10%
    - Show percentage difference
- Visual Gauge:
  - Bar chart showing acceptable range (green zone)
  - Your measurement plotted on the bar
- Explanation:
  - "This capacitor is [X]% of rated capacity"
  - If fail: "Replace capacitor - too [high/low]"
- Common Capacitor Values (quick buttons):
  - 5 μF, 7.5 μF, 10 μF, 15 μF, 20 μF, 25 μF, 35 μF, 45 μF
  - Click to autofill rated capacity
- Save to Work Order button
- Clear button

Props:
- onSave?: (data) => void

Validation:
- Capacity must be > 0
- Show helpful errors

Industry Standard: ±10% tolerance per NEC
Mobile-first, touch-friendly
Use Tailwind CSS, TypeScript
```

---

### 5.4 Electrical - Motor Amps Checker

```
Create a Motor Amps Checker for HVAC technicians using React TypeScript.

Requirements:
- Title: "Motor Amps Checker" with back button
- Subtitle: "Check motor load percentage vs nameplate"
- Input Section:
  1. Nameplate FLA (Full Load Amps) - number input
  2. Measured Running Amps - number input
  3. Voltage (optional) - for 3-phase calculations
  4. Phase: Single or Three-Phase toggle
- Calculate Button
- Result Display:
  - Load Percentage: [X]% (large, prominent)
  - Color-coded:
    - Green (70-100%): "✓ Normal Load"
    - Yellow (100-115%): "⚠ High Load - Monitor"
    - Red (>115% or <70%): "✗ Problem - Check Unit"
  - Recommendation text based on result
- Visual Gauge:
  - 0% to 130% scale
  - Color zones: red (0-70), green (70-100), yellow (100-115), red (115+)
  - Needle pointing to current load %
- Additional Info:
  - Overload protection: calculated at 125% of FLA
  - Wire size recommendation (based on NEC)
- Common Motor FLA Values (quick select):
  - 1/4 HP: 3.6A, 1/3 HP: 4.4A, 1/2 HP: 5.8A, 3/4 HP: 8.4A, 1 HP: 11A
- Save to Work Order button
- Clear button

Props:
- onSave?: (data) => void

Industry Standard: NEC Article 430
Mobile-first, large inputs
Use Tailwind CSS, TypeScript
```

---

### 5.5 Electrical - Voltage Drop Calculator

```
Create a Voltage Drop Calculator for HVAC technicians using React TypeScript.

Requirements:
- Title: "Voltage Drop Calculator" with back button
- Subtitle: "Calculate voltage drop and wire sizing per NEC"
- Input Section:
  1. Voltage (V) - select: 120V, 208V, 240V, 480V
  2. Current (A) - Amps
  3. One-Way Distance (ft) - feet
  4. Wire Size - select AWG: 14, 12, 10, 8, 6, 4, 2, 1, 0, 00, 000, 0000
  5. Wire Material - toggle: Copper / Aluminum
  6. Conduit Type - select: PVC, Steel, Aluminum
- Calculate Button
- Result Display:
  - Voltage Drop: [X] volts
  - Percentage Drop: [X]% (large)
  - Status:
    - Green (<3%): "✓ Acceptable - NEC Compliant"
    - Yellow (3-5%): "⚠ Marginal - Consider Larger Wire"
    - Red (>5%): "✗ Excessive - Increase Wire Size"
  - Voltage at Load: [X] volts
- Wire Size Recommendation:
  - "Minimum recommended wire size: [AWG]"
  - Show next 2 larger sizes as alternatives
- NEC Reference:
  - "NEC recommends <3% for branch circuits, <5% total"
- Voltage Drop Chart (table):
  - Show voltage drop for AWG 14, 12, 10, 8, 6 at this distance/current
  - Highlight compliant sizes in green
- Save to Work Order button
- Clear button

Props:
- onSave?: (data) => void

Formulas based on NEC Table 8
Mobile-optimized, large selects
Use Tailwind CSS, TypeScript
```

---

### 5.6 Refrigeration - Superheat Calculator

```
Create a Superheat Calculator for HVAC technicians using React TypeScript.

Requirements:
- Title: "Superheat Calculator" with back button
- Subtitle: "Diagnose refrigerant charge - measure suction line"
- Input Section:
  1. Refrigerant Type - select: R-410A, R-22, R-134a, R-404A, R-407C
  2. Suction Pressure (PSI) - large number input
  3. Suction Line Temperature (°F) - large number input
- Calculate Button (large, blue)
- Result Display:
  - Saturation Temperature: [X]°F (from PT chart)
  - Suction Line Temp: [X]°F (entered value)
  - Superheat: [X]°F (large, prominent)
  - Status (color-coded):
    - Green (10-15°F): "✓ Superheat Normal - Charge OK"
    - Yellow (7-9°F or 16-20°F): "⚠ Check Charge - Borderline"
    - Red (<7°F): "✗ Low Superheat - Overcharged or Other Issue"
    - Red (>20°F): "✗ High Superheat - Undercharged"
- Visual Gauge:
  - 0°F to 30°F scale
  - Green zone: 10-15°F
  - Yellow zones: 7-9°F and 16-20°F
  - Red zones: <7°F and >20°F
  - Marker showing current superheat
- Diagnosis Help:
  - Low Superheat (<10°F): "Possible overcharge, check for liquid slugging"
  - High Superheat (>15°F): "Possible undercharge, low airflow, or restriction"
- Target Superheat Note:
  - "For fixed orifice systems, use Target Superheat calculator for accurate reading"
  - Link to Target Superheat calculator
- Save to Work Order button
- Clear button
- PT Chart quick reference (expandable)

Props:
- onSave?: (data) => void

Industry Standard: ACCA/ASHRAE guidelines
Mobile-first, large touch targets
Use Tailwind CSS, TypeScript
Include PT chart data for all refrigerant types
```

---

### 5.7 Refrigeration - Subcooling Calculator

```
Create a Subcooling Calculator for HVAC technicians using React TypeScript.

Requirements:
- Title: "Subcooling Calculator" with back button
- Subtitle: "Verify refrigerant charge - measure liquid line"
- Input Section:
  1. Refrigerant Type - select: R-410A, R-22, R-134a, R-404A, R-407C
  2. Liquid Pressure (PSI) - large number input
  3. Liquid Line Temperature (°F) - large number input
- Calculate Button
- Result Display:
  - Saturation Temperature: [X]°F (from PT chart)
  - Liquid Line Temp: [X]°F (entered value)
  - Subcooling: [X]°F (large, prominent)
  - Status (color-coded):
    - Green (8-12°F): "✓ Subcooling Normal - Charge OK"
    - Yellow (5-7°F or 13-15°F): "⚠ Check Charge - Borderline"
    - Red (<5°F): "✗ Low Subcooling - Undercharged"
    - Red (>15°F): "✗ High Subcooling - Overcharged or Restriction"
- Visual Gauge:
  - 0°F to 25°F scale
  - Green zone: 8-12°F
  - Yellow zones: 5-7°F and 13-15°F
  - Red zones: <5°F and >15°F
  - Marker showing current subcooling
- Diagnosis Help:
  - Low Subcooling (<8°F): "Add refrigerant, check for leaks"
  - High Subcooling (>12°F): "Possible overcharge or liquid line restriction"
- System Type Note:
  - "For TXV systems, subcooling is the preferred charging method"
- Combined Reading:
  - "Use with Superheat for complete diagnosis"
  - Link to Superheat calculator
- Save to Work Order button
- Clear button

Props:
- onSave?: (data) => void

Industry Standard: ACCA/ASHRAE guidelines
Typical range: 8-12°F for most systems
Mobile-optimized
Use Tailwind CSS, TypeScript
```

---

### 5.8 Refrigeration - Target Superheat Calculator

```
Create a Target Superheat Calculator for HVAC technicians using React TypeScript.

Requirements:
- Title: "Target Superheat Calculator" with back button
- Subtitle: "For fixed orifice/piston systems - calculate ideal superheat"
- Input Section:
  1. Indoor Dry Bulb Temperature (°F) - return air temp
  2. Outdoor Dry Bulb Temperature (°F) - ambient temp
  3. Indoor Wet Bulb Temperature (°F) - for humidity
- Calculate Button
- Result Display:
  - Target Superheat: [X]°F (large, prominent)
  - Acceptable Range: [X-Y]°F (±3°F tolerance)
- Then measure actual superheat:
  4. Measured Superheat (°F) - from Superheat Calculator
- Comparison Result:
  - Status (color-coded):
    - Green (within ±3°F): "✓ Charge Correct"
    - Yellow (±3-5°F): "⚠ Minor Adjustment Needed"
    - Red (>5°F difference): "✗ Significant Charge Issue"
  - Difference: [X]°F [high/low]
  - Recommendation:
    - If low: "Add [estimated oz] refrigerant"
    - If high: "Remove [estimated oz] refrigerant"
- Formula Display (expandable):
  - Target SH = (Outdoor DB - Indoor DB) + (Indoor DB - Indoor WB) + Constants
  - Show calculation breakdown
- System Type Warning:
  - "⚠ Only for fixed orifice/piston systems"
  - "For TXV systems, use standard superheat (10-15°F)"
- Quick Reference:
  - Typical indoor DB: 70-75°F
  - Typical outdoor DB: 75-95°F
- Save to Work Order button
- Clear button

Props:
- onSave?: (data) => void

Industry Standard: ACCA/Sporlan charging charts
Mobile-first, large inputs
Use Tailwind CSS, TypeScript
```

---

### 5.9 Refrigeration - PT Chart

```
Create a Pressure-Temperature (PT) Chart for HVAC technicians using React TypeScript.

Requirements:
- Title: "PT Chart - Pressure/Temperature Reference" with back button
- Refrigerant Selector (tabs or buttons):
  - R-410A, R-22, R-134a, R-404A, R-407C
- Two lookup modes (toggle):

Mode 1: Pressure → Temperature
- Input: Pressure (PSI)
- Output: Saturation Temperature (°F)

Mode 2: Temperature → Pressure
- Input: Temperature (°F)
- Output: Saturation Pressure (PSI)

- Full PT Table (scrollable):
  - Columns: Temperature (°F) | Pressure (PSI)
  - Range: -40°F to 120°F in 5° increments
  - Highlight row when user searches
  - Sticky header
- Search/Quick Find:
  - Input box: "Find temperature or pressure"
  - Auto-scroll to matching row
  - Highlight match
- Interpolation:
  - If exact value not in table, interpolate between nearest values
  - Show: "~[X] (interpolated)"
- Color Zones:
  - Blue: Low pressure/temp (< 0°F)
  - Green: Normal range (40-80°F)
  - Orange: High range (> 80°F)
- Common Scenarios (quick reference):
  - "Typical suction pressure: 68 PSI (40°F) for R-410A"
  - "Typical liquid pressure: 260 PSI (95°F) for R-410A"
- Note: "This is a reference tool only - does not save to work order"
- Back to Field Tools button

Props: none (reference tool only)

Mobile-optimized table, pinch to zoom
Use Tailwind CSS, TypeScript
Include accurate PT data for all 5 refrigerants
```

---

### 5.10 Airflow - CFM Calculator

```
Create a CFM (Cubic Feet per Minute) Calculator for HVAC technicians using React TypeScript.

Requirements:
- Title: "CFM Calculator" with back button
- Subtitle: "Calculate airflow from BTU/hr and temperature rise"
- Two calculation modes (tabs):

Mode 1: CFM from BTU and ΔT
- Inputs:
  1. BTU/hr (heating or cooling capacity)
  2. Temperature Rise (ΔT in °F) - supply temp minus return temp
- Formula: CFM = BTU/hr ÷ (1.08 × ΔT)
- Calculate Button
- Result:
  - Required CFM: [X] CFM (large)
  - Per Ton (if cooling): [X] CFM/ton
  - Status:
    - Green (350-450 CFM/ton): "✓ Normal Airflow"
    - Yellow (300-350 or 450-500): "⚠ Check Ductwork"
    - Red (<300 or >500): "✗ Airflow Problem"

Mode 2: BTU from CFM and ΔT
- Inputs:
  1. CFM (measured airflow)
  2. Temperature Rise (ΔT in °F)
- Formula: BTU/hr = CFM × 1.08 × ΔT
- Result:
  - Actual BTU/hr: [X] BTU/hr
  - Tonnage: [X] tons
  - System efficiency note

- Quick Reference:
  - Typical cooling: 400 CFM/ton
  - Typical heating ΔT: 40-70°F
  - Typical cooling ΔT: 18-22°F
- Visual Gauge:
  - Show CFM/ton ratio on scale
  - Color zones for acceptable range
- Save to Work Order button
- Clear button

Props:
- onSave?: (data) => void

Industry Standard: ACCA Manual D
Formula: BTU = 1.08 × CFM × ΔT
Mobile-first design
Use Tailwind CSS, TypeScript
```

---

### 5.11 Airflow - Duct Sizer

```
Create a Duct Sizer calculator for HVAC technicians using React TypeScript.

Requirements:
- Title: "Duct Sizer" with back button
- Subtitle: "Size rectangular or round ducts"
- Duct Shape Selector (toggle):
  - Round
  - Rectangular

For Round Ducts:
- Inputs:
  1. Required CFM
  2. Desired Air Velocity (FPM - feet per minute)
     - Presets: Main Trunk (900), Branch (700), Return (600)
- Calculate Button
- Result:
  - Required Duct Diameter: [X] inches
  - Nearest Standard Size: [X] inches (round up to available size)
  - Actual Velocity at Standard Size: [X] FPM
  - Status:
    - Green (600-900 FPM): "✓ Good Velocity"
    - Yellow (900-1200 FPM): "⚠ High Velocity - May Be Noisy"
    - Red (>1200 FPM): "✗ Too High - Reduce Velocity"

For Rectangular Ducts:
- Inputs:
  1. Required CFM
  2. Desired Air Velocity (FPM)
  3. Aspect Ratio preference (optional): Width ÷ Height
- Result:
  - Recommended Dimensions: [W] × [H] inches
  - Multiple options with trade-offs
  - Equivalent Round Diameter
  - Actual Velocity

- Velocity Guidelines (reference table):
  - Main trunks: 900 FPM max
  - Branch ducts: 700 FPM max
  - Return ducts: 600 FPM max
  - Note noise levels at different velocities
- Standard Duct Sizes (reference):
  - Round: 4", 5", 6", 7", 8", 10", 12", 14", 16", 18", 20"
  - Rectangular common sizes
- Formula Display (expandable):
  - Area = CFM ÷ Velocity
  - Diameter = √(Area ÷ 0.7854)
- Save to Work Order button
- Clear button

Props:
- onSave?: (data) => void

Industry Standard: ACCA Manual D
Mobile-optimized
Use Tailwind CSS, TypeScript
```

---

### 5.12 Airflow - Static Pressure Tool

```
Create a Static Pressure calculator for HVAC technicians using React TypeScript.

Requirements:
- Title: "Static Pressure Calculator" with back button
- Subtitle: "Calculate total external static pressure (TESP)"
- Input Section:
  1. Supply Plenum Pressure (inches w.c.) - positive number
  2. Return Plenum Pressure (inches w.c.) - negative number or positive (will be subtracted)
- Calculate Button
- Result Display:
  - Total External Static Pressure: [X] inches w.c. (large)
  - Status (color-coded based on equipment specs):
    - Green (<0.5): "✓ Excellent Airflow"
    - Yellow (0.5-0.8): "✓ Acceptable"
    - Orange (0.8-1.2): "⚠ High - Check Filters/Ductwork"
    - Red (>1.2): "✗ Too High - Restricted Airflow"
- Common Issues Guide:
  - If TESP too high:
    - Check filter (dirty?)
    - Check duct sizing (too small?)
    - Check number of bends
    - Check grilles/registers
- Measurement Guide (expandable):
  - Where to measure: show diagram
  - How to use manometer
  - Proper probe placement
- Equipment Specifications:
  - Input field: "Max rated TESP" (from equipment manual)
  - Compare actual vs rated
- Additional Measurements (optional):
  - Filter static pressure drop
  - Coil static pressure drop
  - Helps identify specific restrictions
- Quick Reference:
  - 0.1 - 0.3: Residential, good ductwork
  - 0.4 - 0.6: Residential, typical
  - 0.7 - 1.0: Borderline, monitor
  - >1.0: Problem, investigate
- Save to Work Order button
- Clear button

Props:
- onSave?: (data) => void

Industry Standard: ACCA Manual S
Units: inches w.c. (water column)
Mobile-first
Use Tailwind CSS, TypeScript
```

---

### 5.13 Gas/Combustion - Gas Pipe Sizer

```
Create a Gas Pipe Sizer calculator for HVAC technicians using React TypeScript.

Requirements:
- Title: "Gas Pipe Sizer" with back button
- Subtitle: "Size natural gas piping per NFPA 54"
- Input Section:
  1. Gas Type - select: Natural Gas, Propane (LP)
  2. Total Input (BTU/hr) - sum of all appliances
  3. Pipe Length (ft) - longest run from meter to appliance
  4. Pressure Drop - select: 0.3" w.c. (low), 0.5" w.c. (typical), 1.0" w.c. (high)
  5. Pipe Material - select: Black Iron, CSST (Corrugated Stainless Steel Tubing)
- Calculate Button
- Result Display:
  - Minimum Pipe Size: [X] inches (large, prominent)
  - Recommended Size: [X] inches (next size up for safety margin)
  - Actual Capacity at This Size: [X] BTU/hr
  - Status:
    - Green: "✓ Adequate Capacity"
    - Red: "✗ Undersized - Increase Pipe Size"
- Sizing Table:
  - Show BTU capacity for different pipe sizes at this length
  - Highlight sizes that meet requirement in green
  - Common sizes: 1/2", 3/4", 1", 1-1/4", 1-1/2", 2"
- Multiple Appliance Calculator:
  - Add appliances: Furnace, Water Heater, Range, Dryer
  - Auto-sum total BTU/hr
  - List of appliances with individual BTU ratings
- NFPA 54 Reference:
  - Note about code compliance
  - Local code may vary - consult authority
- Common Appliance BTU (quick reference):
  - Furnace: 60,000-120,000 BTU/hr
  - Water Heater: 30,000-50,000 BTU/hr
  - Range: 65,000 BTU/hr
  - Dryer: 35,000 BTU/hr
- Warnings:
  - "⚠ This is a guide only - consult local codes"
  - "⚠ Professional installation required"
- Save to Work Order button
- Clear button

Props:
- onSave?: (data) => void

Industry Standard: NFPA 54 (National Fuel Gas Code)
Tables based on NFPA 54 Appendix
Mobile-optimized
Use Tailwind CSS, TypeScript
```

---

### 5.14 Gas/Combustion - Combustion Air Calculator

```
Create a Combustion Air Calculator for HVAC technicians using React TypeScript.

Requirements:
- Title: "Combustion Air Calculator" with back button
- Subtitle: "Calculate required combustion air per NFPA 54"
- Installation Type Selector (tabs):
  - Confined Space
  - Unconfined Space

Confined Space (< 50 cu ft per 1000 BTU/hr):
- Inputs:
  1. Total Appliance Input (BTU/hr)
  2. Air Source - select:
     - All air from inside (two openings)
     - All air from outdoors (two openings)
     - Combined indoor/outdoor
- Calculate Button
- Result:
  - Required Opening Size: [X] sq inches per opening (large)
  - Number of openings: 2 (one high, one low)
  - Minimum: 100 sq inches per opening
  - Equivalent Round Duct: [X] inches diameter
- Opening Placement:
  - Top opening: within 12" of ceiling
  - Bottom opening: within 12" of floor
  - Diagram showing placement

Unconfined Space (≥ 50 cu ft per 1000 BTU/hr):
- Inputs:
  1. Room Volume (Length × Width × Height in ft)
  2. Total Appliance Input (BTU/hr)
- Result:
  - Is space unconfined? Yes/No
  - If Yes: "✓ No additional combustion air required"
  - If No: "✗ Space is confined - use Confined Space calculator"
  - Calculation: [X] cu ft per 1000 BTU/hr

- Calculation Method Reference:
  - Indoor air: 1 sq in per 1000 BTU/hr
  - Outdoor air: 1 sq in per 4000 BTU/hr
  - Ducts/horizontal openings: double the area
- Common Duct Sizes (reference):
  - Show sq inch area for standard round ducts
  - 6", 8", 10", 12" diameter equivalents
- NFPA 54 Reference:
  - Code section: Chapter 9
  - Note about proper ventilation
- Warnings:
  - "⚠ Inadequate combustion air = CO risk"
  - "⚠ Consult local codes and professional installer"
- Save to Work Order button
- Clear button

Props:
- onSave?: (data) => void

Industry Standard: NFPA 54 Chapter 9
Mobile-first
Use Tailwind CSS, TypeScript
```

---

### 5.15 Gas/Combustion - Combustion Analysis Tool

```
Create a Combustion Analysis reference tool for HVAC technicians using React TypeScript.

Requirements:
- Title: "Combustion Analysis Reference" with back button
- Subtitle: "Target values for combustion testing"
- Fuel Type Selector (tabs):
  - Natural Gas
  - Propane (LP)
  - Oil (#2 Fuel Oil)

For Each Fuel Type, show reference tables:

1. Flue Gas Analysis Targets:
   - O₂ (Oxygen): Target range with min/max
   - CO₂ (Carbon Dioxide): Target range
   - CO (Carbon Monoxide): Max acceptable (0 ppm ideal, <50 acceptable, >200 dangerous)
   - Combustion Efficiency: Target %
   - Stack Temperature: Typical range

2. Color-coded Values:
   - Green zone: Ideal/safe
   - Yellow zone: Acceptable but monitor
   - Red zone: Dangerous/requires action

3. Visual Indicators:
   - Gauges or bar charts for each parameter
   - Show where typical readings fall

4. Draft Pressure:
   - Target draft (inches w.c.)
   - Too high/too low implications

5. Actual Reading Input (optional):
   - Allow tech to enter their measurements
   - Compare to targets
   - Show if in acceptable range
   - Diagnosis based on readings

Example for Natural Gas:
- O₂: 5-9% (ideal: 6-8%)
- CO₂: 8-10%
- CO: <50 ppm air-free (>200 ppm = danger)
- Efficiency: 78-82% (non-condensing), 90-97% (condensing)
- Stack Temp: 300-500°F (non-condensing), 100-140°F (condensing)
- Draft: -0.02 to -0.04 inches w.c.

6. Troubleshooting Guide:
   - High O₂ / Low CO₂: Excess air, check burner
   - Low O₂ / High CO₂: Insufficient air, dangerous
   - High CO: Incomplete combustion, check heat exchanger
   - High Stack Temp: Poor heat transfer, dirty heat exchanger

7. Equipment Type:
   - Select: Conventional, Mid-Efficiency, Condensing
   - Adjust target values based on type

8. Safety Warnings:
   - "⚠ High CO levels = immediate danger"
   - "⚠ Carbon monoxide is deadly - never ignore CO readings"
   - Action steps for dangerous readings

Note: "This is a reference tool only - does not save to work order"

Back to Field Tools button

Props: none (reference only)

Industry Standards: ANSI Z21.47, NFPA 54
Mobile-optimized tables
Use Tailwind CSS, TypeScript
```

---

### 5.16 Hydronic/Boiler - Expansion Tank Sizer

```
Create an Expansion Tank Sizer for HVAC technicians using React TypeScript.

Requirements:
- Title: "Expansion Tank Sizer" with back button
- Subtitle: "Size expansion tanks for closed hydronic systems"
- System Type Selector:
  - Heating
  - Chilled Water
- Input Section:
  1. System Volume (gallons) - total water in system
     - If unknown, estimate button:
       - Enter: Boiler size (BTU/hr) or Boiler GPM
       - Calculate approximate system volume
  2. Fill Pressure (PSI) - initial system pressure
  3. Maximum Operating Pressure (PSI) - from relief valve or design
  4. Fill Temperature (°F) - usually 50-60°F
  5. Maximum Operating Temperature (°F)
     - Typical: 180°F (heating), 40°F (chilled water)
- Calculate Button
- Result Display:
  - Acceptance Volume Required: [X] gallons (large)
  - Recommended Tank Size: [X] gallons (next standard size up)
  - Tank Acceptance Volume at Given Pressure: [X] gallons
  - Status:
    - Green: "✓ Tank Adequate"
    - Red: "✗ Tank Too Small - Risk of Relief Valve Opening"
- Calculation Breakdown (expandable):
  - Expansion volume = System volume × Expansion coefficient
  - Expansion coefficient based on temp change
  - Tank acceptance calculation formula
- Standard Tank Sizes (reference):
  - Show common sizes: 2, 4.4, 8, 15, 30, 60, 90 gallons
  - Pre-charge pressure for each
- Pre-Charge Pressure:
  - Recommended: Fill pressure - 5 PSI
  - Show calculation
- Pressure Relief Valve Note:
  - "Ensure PRV set at or below max operating pressure"
- Diagram (optional):
  - Show how expansion tank works
  - Proper installation (air side up)
- Save to Work Order button
- Clear button

Props:
- onSave?: (data) => void

Industry Standards: ASME, ASHRAE
Expansion coefficients from water property tables
Mobile-first
Use Tailwind CSS, TypeScript
```

---

### 5.17 Hydronic/Boiler - Hydronic Flow Calculator

```
Create a Hydronic Flow Calculator for HVAC technicians using React TypeScript.

Requirements:
- Title: "Hydronic Flow Calculator" with back button
- Subtitle: "Calculate GPM and pump sizing for hydronic systems"
- Two calculation modes (tabs):

Mode 1: GPM from BTU and ΔT
- Inputs:
  1. Heating/Cooling Load (BTU/hr)
  2. Temperature Differential (ΔT in °F)
     - Typical heating: 20°F
     - Typical cooling: 10°F (chilled water)
- Formula: GPM = BTU/hr ÷ (500 × ΔT)
- Calculate Button
- Result:
  - Required Flow Rate: [X] GPM (large)
  - For [BTU] BTU/hr with [ΔT]°F ΔT
  - Recommended Pump Size: [X] GPM (round up)

Mode 2: BTU from GPM and ΔT
- Inputs:
  1. Flow Rate (GPM)
  2. Temperature Differential (ΔT in °F)
- Formula: BTU/hr = GPM × 500 × ΔT
- Result:
  - Heating/Cooling Capacity: [X] BTU/hr
  - Equivalent Tonnage: [X] tons (if cooling)

- Pipe Sizing Recommendation:
  - Based on GPM, recommend pipe size
  - Keep velocity 2-4 FPS (feet per second)
  - Show pipe size chart for calculated GPM
- Pump Head Calculation (optional):
  - Inputs: Pipe length, fittings, elevation
  - Estimate total head (feet)
  - Basic pump selection guidance
- Common Applications (quick select):
  - Residential radiant floor: 20°F ΔT
  - Commercial hot water: 40°F ΔT
  - Chilled water: 10°F ΔT
- Formula Reference:
  - BTU = 500 × GPM × ΔT
  - 500 = constant (8.33 lb/gal × 60 min/hr ÷ 1 BTU/lb-°F)
- Visual Flow Chart:
  - Show relationship between GPM, BTU, and ΔT
- Save to Work Order button
- Clear button

Props:
- onSave?: (data) => void

Industry Standard: ASHRAE, Hydronic Institute
Mobile-optimized
Use Tailwind CSS, TypeScript
```

---

### 5.18 Hydronic/Boiler - Radiant Floor Heating Calculator

```
Create a Radiant Floor Heating Calculator for HVAC technicians using React TypeScript.

Requirements:
- Title: "Radiant Floor Heating Designer" with back button
- Subtitle: "Design radiant floor heating systems"
- Input Section:
  1. Room Dimensions:
     - Length (ft)
     - Width (ft)
     - Calculate: Area = L × W
  2. Heat Loss (BTU/hr)
     - If unknown, estimate: Area × 25-35 BTU/sq ft (typical residential)
  3. Floor Covering - select:
     - Tile/Stone (high conductivity)
     - Hardwood (medium)
     - Carpet (low - not ideal)
  4. Tube Spacing - select:
     - 6" (high output)
     - 9" (typical)
     - 12" (low output)
  5. Water Supply Temperature (°F)
     - Typical: 100-120°F
  6. Desired Floor Surface Temperature (°F)
     - Typical: 75-85°F
- Calculate Button
- Result Display:
  - Required Tube Length: [X] feet (large)
  - Number of Loops: [X] (based on max 300 ft per loop)
  - Heat Output: [X] BTU/hr per sq ft
  - Status:
    - Green: "✓ Design Adequate"
    - Yellow: "⚠ Marginal - Check Insulation"
    - Red: "✗ Insufficient - Reduce Spacing or Increase Temp"
  - Flow Rate per Loop: [X] GPM
  - Total System GPM: [X] GPM
- Tube Layout Plan:
  - Show pattern: Serpentine or Counter-flow
  - Recommended manifold locations
- Floor Covering Warning:
  - If carpet selected: "⚠ Carpet reduces heat output by 20-30%"
- Insulation Check:
  - "Ensure R-10+ insulation below tubing"
  - R-value recommendations
- Manifold Sizing:
  - Number of ports needed
  - Manifold flow rate
- Supply Temperature Warning:
  - "⚠ Max 120°F for wood floors"
  - "⚠ Max 140°F for tile (comfortable at 85°F surface)"
- Quick Reference:
  - Typical output: 25-30 BTU/hr/sq ft at 9" spacing
  - Max loop length: 300 ft (to prevent excess pressure drop)
  - Typical flow: 0.5-0.75 GPM per loop
- Save to Work Order button
- Clear button

Props:
- onSave?: (data) => void

Industry Standards: Radiant Panel Association (RPA), ASHRAE
Mobile-first
Use Tailwind CSS, TypeScript
```

---

### 5.19 Utilities - Psychrometric Calculator

```
Create a Psychrometric Calculator for HVAC technicians using React TypeScript.

Requirements:
- Title: "Psychrometric Calculator" with back button
- Subtitle: "Calculate humidity, dew point, wet bulb temperature"
- Input Section (enter any 2 of these 3):
  1. Dry Bulb Temperature (°F) - actual air temp
  2. Wet Bulb Temperature (°F) - from wet bulb thermometer
  3. Relative Humidity (%) - from hygrometer
- Or alternatively:
  - Dry Bulb Temperature (°F)
  - Dew Point Temperature (°F)
- Altitude (ft) - optional, affects calculations (default sea level)
- Calculate Button
- Result Display (calculate all properties):
  - Dry Bulb Temperature: [X]°F
  - Wet Bulb Temperature: [X]°F
  - Dew Point: [X]°F
  - Relative Humidity: [X]%
  - Humidity Ratio: [X] grains/lb (or lb moisture/lb dry air)
  - Enthalpy: [X] BTU/lb
  - Specific Volume: [X] cu ft/lb
- Comfort Analysis:
  - Status:
    - Green (40-60% RH): "✓ Comfortable Humidity"
    - Yellow (30-40% or 60-70% RH): "⚠ Borderline Comfort"
    - Red (<30% or >70% RH): "✗ Uncomfortable - Adjust Humidity"
  - Condensation Risk:
    - Show surface temp needed to prevent condensation
    - "Surfaces below [dew point] will condense"
- Applications Guide:
  - Cooling load calculations
  - Dehumidification needs
  - Humidification needs
  - Mold risk assessment (high dew point)
- Visual Psychrometric Chart (optional):
  - Simplified chart showing current conditions
  - Plot point on chart
- Quick Scenarios:
  - "Comfortable home": 72°F, 50% RH
  - "Humid summer": 78°F, 70% RH
  - "Dry winter": 70°F, 25% RH
- Formulas (expandable):
  - Show equations used
  - Reference: ASHRAE psychrometric formulas
- Save to Work Order button
- Clear button

Props:
- onSave?: (data) => void

Industry Standard: ASHRAE psychrometric equations
Mobile-optimized
Use Tailwind CSS, TypeScript
Use psychrometric library or implement ASHRAE formulas
```

---

### 5.20 Utilities - Tonnage Converter

```
Create a Tonnage Converter for HVAC technicians using React TypeScript.

Requirements:
- Title: "Tonnage Converter" with back button
- Subtitle: "Convert BTU/hr ↔ Tons of cooling"
- Two-way conversion (automatic):

Input Option 1: BTU/hr
- Input: BTU/hr
- Auto-calculate: Tons
- Formula: Tons = BTU/hr ÷ 12,000

Input Option 2: Tons
- Input: Tons
- Auto-calculate: BTU/hr
- Formula: BTU/hr = Tons × 12,000

- Large Display:
  - Show both values prominently
  - Bidirectional arrows between them
  - Update in real-time as you type

- Additional Conversions:
  - Kilowatts (kW): 1 ton = 3.517 kW
  - BTU/hr to kW: BTU/hr × 0.000293
  - Show all three: Tons | BTU/hr | kW

- Common Residential Sizes (quick select buttons):
  - 1.5 ton = 18,000 BTU/hr
  - 2 ton = 24,000 BTU/hr
  - 2.5 ton = 30,000 BTU/hr
  - 3 ton = 36,000 BTU/hr
  - 3.5 ton = 42,000 BTU/hr
  - 4 ton = 48,000 BTU/hr
  - 5 ton = 60,000 BTU/hr
  - Click to auto-fill

- Commercial Sizes:
  - 7.5, 10, 12.5, 15, 20, 25, 30+ tons

- Rule of Thumb Guide:
  - Residential: 400-600 sq ft per ton (depends on climate, insulation)
  - Example: 2000 sq ft house = 3.5-5 tons (hot climate = higher)
  - "⚠ Proper sizing requires heat load calculation"

- Conversion Reference Card:
  - 1 Ton = 12,000 BTU/hr
  - 1 Ton = 3,517 Watts (3.517 kW)
  - 1 Ton = 200 CFM (typical airflow rule)

- History of "Ton":
  - Fun fact: "Based on energy to melt 1 ton of ice in 24 hours"

- Save to Work Order button (saves conversion for reference)
- Clear button

Props:
- onSave?: (data) => void

Standard: 1 ton = 12,000 BTU/hr (cooling)
Simple, fast, mobile-optimized
Use Tailwind CSS, TypeScript
Real-time conversion (no button needed)
```

---

### 5.21 Utilities - Unit Converter

```
Create a general HVAC Unit Converter for HVAC technicians using React TypeScript.

Requirements:
- Title: "HVAC Unit Converter" with back button
- Subtitle: "Convert common HVAC measurements"
- Category Selector (tabs or dropdown):
  1. Temperature
  2. Pressure
  3. Flow Rate
  4. Length
  5. Area
  6. Power/Energy

Category 1: Temperature
- Convert between: °F, °C, °R (Rankine), K (Kelvin)
- Two dropdowns: From unit, To unit
- Large number input
- Result displayed live

Category 2: Pressure
- Convert between:
  - PSI (pounds per square inch)
  - kPa (kilopascals)
  - inches Hg (mercury)
  - inches w.c. (water column)
  - mmHg (millimeters mercury)
  - Bar
  - ATM (atmospheres)

Category 3: Flow Rate
- Convert between:
  - CFM (cubic feet per minute)
  - GPM (gallons per minute)
  - L/s (liters per second)
  - L/min (liters per minute)
  - m³/h (cubic meters per hour)

Category 4: Length
- Convert between:
  - Inches
  - Feet
  - Millimeters
  - Centimeters
  - Meters

Category 5: Area
- Convert between:
  - Square feet
  - Square inches
  - Square meters
  - Square centimeters

Category 6: Power/Energy
- Convert between:
  - BTU/hr
  - Watts
  - Kilowatts (kW)
  - Horsepower (HP)
  - Tons (refrigeration)
  - Therms

Design:
- Clean, simple interface
- Large input field (56px height)
- "From" and "To" dropdowns
- Result displays automatically as you type
- Swap button (↔️) to reverse conversion direction
- Decimal precision: 2 places (adjustable)

Common Conversions (quick reference):
- 1 BTU/hr = 0.293 watts
- 1 ton = 12,000 BTU/hr = 3.517 kW
- 1 HP = 745.7 watts = 2,545 BTU/hr
- 1 PSI = 2.036 inches Hg = 27.7 inches w.c.
- 1 GPM = 0.0631 L/s
- °F to °C: (°F - 32) × 5/9

Clear button
Save to Work Order button (saves conversion reference)

Props:
- onSave?: (data) => void

Mobile-optimized, simple interface
Use Tailwind CSS, TypeScript
Real-time conversion (live update)
```

---

### 5.22 Utilities - Heat Load Calculator (Manual J Simplified)

```
Create a simplified Heat Load Calculator for HVAC technicians using React TypeScript.

Requirements:
- Title: "Heat Load Calculator (Simplified Manual J)" with back button
- Subtitle: "Estimate cooling/heating load for residential"
- Warning: "⚠ This is a simplified estimate. Use full Manual J software for accurate sizing."

Input Section (Step-by-step):

Step 1: Building Info
- Square Footage
- Number of Stories: 1, 2, 3+
- Ceiling Height (ft): default 8
- Climate Zone: select from list (Hot-Humid, Hot-Dry, Mixed, Cold, Very Cold)

Step 2: Envelope
- Insulation Level - select:
  - Poor (R-11 walls, R-19 attic)
  - Average (R-13 walls, R-30 attic)
  - Good (R-19 walls, R-38 attic)
  - Excellent (R-21+ walls, R-49+ attic)
- Windows:
  - Total Window Area (sq ft) or % of floor area
  - Window Type: Single pane, Double pane, Low-E
  - Orientation: Mostly N/S or E/W (sun exposure)
- Infiltration/Air Tightness:
  - Loose (old house, drafty)
  - Average (typical)
  - Tight (new construction, sealed)

Step 3: Internal Loads
- Number of Occupants
- Appliances/Lighting: Low, Average, High

Step 4: Design Conditions
- Outdoor Design Temp (summer): auto-fill based on climate zone
- Indoor Target Temp: default 75°F
- Outdoor Design Temp (winter): auto-fill
- Indoor Target Temp (winter): default 70°F

Calculate Button

Results Display:
- Cooling Load: [X] BTU/hr → [X] tons
- Heating Load: [X] BTU/hr
- Recommended AC Size: [X] ton
- Recommended Furnace Size: [X] BTU/hr input
- Recommended Airflow: [X] CFM
- Status:
  - Show if typical for this size house
  - Flag if unusually high/low (check inputs)

Breakdown (expandable):
- Roof/Ceiling load: [X] BTU/hr
- Walls: [X] BTU/hr
- Windows: [X] BTU/hr
- Infiltration: [X] BTU/hr
- Internal gains: [X] BTU/hr
- Total: [X] BTU/hr

Recommendations:
- "For [sq ft] house: [tons] typical"
- Derating note: "Actual installed capacity may be lower due to ductwork inefficiencies"

Disclaimers:
- "⚠ This is a rough estimate only"
- "⚠ Use ACCA Manual J software for accurate load calculations"
- "⚠ Sizing affects efficiency and comfort - consult professional"
- Link to full Manual J resources

Save to Work Order button
Clear button
Print/Export button

Props:
- onSave?: (data) => void

Industry Standard: ACCA Manual J (simplified version)
Mobile-first, wizard-style flow
Use Tailwind CSS, TypeScript
```

---

## 👥 Part 6: CRM Components

### 6.1 CRM Accounts List

```
Create a CRM Accounts List page for HVAC app using React TypeScript.

Requirements:
- Header:
  - Title: "Customer Accounts"
  - "Add Account" button (blue, top right)
  - Search bar (search by name, phone, address, email)
- Filters:
  - Account Type: All, Residential, Commercial
  - Status: All, Active, Inactive
  - Service Agreement: All, Active Agreement, No Agreement
- Stats Bar (3 KPI cards):
  - Total Accounts
  - Active Service Agreements
  - Total Revenue (YTD)
- Table (desktop) / Cards (mobile):
  - Columns: Account Name, Type, Address, Phone, Last Service Date, Revenue (YTD), Actions
  - Sortable columns
  - Pagination: 25 per page
  - Row click: navigate to account detail
  - Actions: View, Edit, Create Work Order, Archive
- Mobile:
  - Account cards with key info
  - Swipe actions (call, email, view)
- Empty state: "No accounts found" with "Add First Account" button
- Export button: Export to CSV

Props:
- accounts: Account[]
- totalCount: number
- stats: { total, agreements, revenue }
- onCreateNew: () => void
- onView: (id) => void
- onEdit: (id) => void

Use Tailwind CSS, TypeScript, React Table
Mobile-first, responsive
```

---

### 6.2 CRM Account Detail Page

```
Create a CRM Account Detail page (360° customer view) for HVAC app using React TypeScript.

Requirements:
- Header:
  - Account name and type badge (Residential/Commercial)
  - Action buttons: Edit, Archive, Create Work Order, Quick Call, Send Email
  - Back button
- Summary Cards (top row):
  - Contact Info: Phone (click to call), Email (click to email), Address (click for map)
  - Account Stats: Total Work Orders, Total Revenue, Customer Since
  - Service Agreement: Status, Renewal Date, Quick renew button
- Tabs:
  1. Work Orders
  2. Contacts
  3. Service Agreements
  4. Invoices & Payments
  5. Equipment
  6. Notes
  7. Activity History

Tab 1 - Work Orders:
- List of all work orders for this account
- Filter by status, date range
- Quick create new work order button
- Click to view work order detail

Tab 2 - Contacts:
- List of contact persons at this account
- Primary contact highlighted
- Add contact button
- Contact cards with: Name, Title, Phone, Email, Actions

Tab 3 - Service Agreements:
- Active agreements
- Coverage details (what's included)
- Renewal date with auto-renew toggle
- Pricing
- Create new agreement button

Tab 4 - Invoices & Payments:
- List of invoices with status (Paid, Pending, Overdue)
- Payment history
- Outstanding balance (if any) - prominent red if overdue
- Quick payment button

Tab 5 - Equipment:
- List of installed equipment at this location
- Equipment type, brand, model, serial#, install date
- Next service due date
- Add equipment button
- Link equipment to work orders

Tab 6 - Notes:
- Timeline of notes with timestamps and author
- Add note button (large textarea)
- Pin important notes to top
- Filter by author, date

Tab 7 - Activity History:
- Audit log of all account activity
- Work orders created, calls made, emails sent, notes added
- Timeline view with icons

Sidebar (right):
- Quick Actions widget
- Upcoming appointments
- Recent work orders (last 3)
- Tags (Preferred, VIP, High Value, etc.)

Props:
- account: Account (with all related data)
- workOrders: WorkOrder[]
- contacts: Contact[]
- agreements: ServiceAgreement[]
- invoices: Invoice[]
- equipment: Equipment[]
- notes: Note[]
- onUpdate: (field, value) => void

Use Tailwind CSS, TypeScript, responsive
Desktop-optimized with sidebar, mobile stacks sections
```

---

## 📦 Part 7: Inventory Components

### 7.1 Inventory SKU List

```
Create an Inventory SKU List page for HVAC app using React TypeScript.

Requirements:
- Header:
  - Title: "Inventory"
  - "Add SKU" button (blue)
  - Search bar (search by SKU, description, manufacturer, category)
- Filters:
  - Category: All, Filters, Refrigerant, Parts, Equipment, etc.
  - Stock Status: All, In Stock, Low Stock, Out of Stock
  - Warehouse: All locations or specific warehouse
- Stats Bar:
  - Total SKUs
  - Low Stock Alerts (red badge if > 0)
  - Total Inventory Value
- Table (desktop) / Cards (mobile):
  - Columns: SKU, Description, Category, On Hand Qty, Reorder Point, Unit Cost, Total Value, Actions
  - Color coding:
    - Green: on hand > reorder point
    - Yellow: on hand = reorder point ±20%
    - Red: on hand < reorder point (low stock alert)
  - Sortable columns
  - Pagination
  - Actions: View, Edit, Generate Label, Adjust Stock, Create PO
- Mobile:
  - SKU cards with key info and stock level badge
  - Low stock items highlighted in red
- Quick Actions:
  - Scan barcode button (open scanner)
  - Import SKUs (CSV upload)
  - Export inventory (CSV download)
- Empty state: "No SKUs found"

Props:
- skus: SKU[]
- totalCount: number
- stats: { totalSkus, lowStockCount, totalValue }
- filters: FilterState
- onFilterChange: (filters) => void

Use Tailwind CSS, TypeScript, React Table
Mobile-first, responsive
```

---

### 7.2 SKU Detail Page

```
Create an SKU Detail page for HVAC app using React TypeScript.

Requirements:
- Header:
  - SKU and description
  - Stock level badge (Green: In Stock, Red: Low Stock)
  - Actions: Edit, Generate Label, Adjust Stock, Delete
  - Back button
- Summary Cards (grid):
  - On Hand Quantity (large, prominent)
  - Reorder Point (with alert if below)
  - Unit Cost
  - Total Value (qty × cost)
- Barcode:
  - Display barcode image (Code 128)
  - Print label button
- Tabs:
  1. Details
  2. Locations
  3. Transaction History
  4. Purchase Orders
  5. Usage Analytics

Tab 1 - Details:
- SKU: text
- Description: text
- Category: dropdown
- Manufacturer: text
- Part Number: text
- Unit of Measure: text (each, box, case, lb, etc.)
- Unit Cost: currency
- Unit Price (selling price): currency
- Reorder Point: number
- Reorder Quantity: number
- Lead Time: number (days)
- Supplier: link to vendor
- Notes: textarea
- Edit button (saves all fields)

Tab 2 - Locations:
- Table of warehouse locations where this SKU is stocked
- Columns: Warehouse, Bin Location, Quantity, Last Updated
- Total across all locations
- Quick navigation to bin (if bin mapping exists)

Tab 3 - Transaction History (Stock Ledger):
- List of all inventory transactions for this SKU
- Columns: Date, Type (Receive, Issue, Adjust, Transfer), Qty, Balance After, User, Reference (WO#, PO#)
- Filter by date range, transaction type
- Pagination
- Export to CSV

Tab 4 - Purchase Orders:
- List of POs that include this SKU
- Active POs (ordered but not received)
- Historical POs
- Click to view PO detail

Tab 5 - Usage Analytics:
- Chart: quantity over time (last 30/90/365 days)
- Average monthly usage
- Turnover rate
- Days until stockout (at current usage rate)
- Reorder recommendation based on lead time

Quick Actions Panel (sidebar):
- Adjust Stock button → opens modal:
  - Reason: dropdown (Receive, Issue, Adjust, Transfer, Physical Count)
  - Quantity: +/- number
  - New balance preview
  - Submit
- Generate Label button
- Create PO button (pre-filled with this SKU)

Props:
- sku: SKU (with all related data)
- locations: Location[]
- transactions: StockLedger[]
- purchaseOrders: PO[]
- onUpdate: (field, value) => void

Use Tailwind CSS, TypeScript, Charts (Recharts)
Mobile responsive, desktop-optimized
```

---

## 📅 Part 8: Dispatch Components

### 8.1 Dispatch Board (Calendar View)

```
Create a Dispatch Board calendar view for HVAC app using React TypeScript.

Requirements:
- Header:
  - Title: "Dispatch & Scheduling"
  - Date navigation: < Today > (jump to today button)
  - View selector: Day, Week, Month
  - "Create Work Order" button
- Week View (default, most useful):
  - 7 columns (Mon-Sun)
  - Rows: time slots (7 AM - 7 PM in 30-min increments)
  - Each technician gets a swimlane/column group
  - Drag-and-drop work orders between time slots and technicians
- Work Order Cards (on calendar):
  - Customer name
  - Time slot
  - Status badge (color-coded)
  - Job type icon
  - Priority indicator (red flag if emergency)
  - Click to view/edit work order
  - Drag handle to move
- Technician Lanes (left sidebar):
  - Technician name and avatar
  - Status indicator: Available (green), On Job (yellow), Off (gray)
  - Click to view technician schedule
  - Filter: show/hide specific technicians
- Unassigned Jobs Panel (right sidebar):
  - List of work orders not yet assigned to technician or time
  - Drag to calendar to assign
  - Priority sorting (emergency first)
  - Count badge
- Day View:
  - Single day, all technicians
  - Hourly time slots
  - More detail on each work order card
- Month View:
  - Calendar grid
  - Dots/counts for jobs each day
  - Click day to open day view
- Real-time Updates:
  - Show live status changes (when tech updates from mobile)
  - Badge or pulse animation for new/changed items
- Conflict Detection:
  - Red outline if overlapping appointments
  - Warning icon if technician double-booked
- Color Coding:
  - Emergency: Red
  - Scheduled: Blue
  - In Progress: Yellow
  - Completed: Green
- Quick Actions:
  - Right-click work order: Reassign, Reschedule, Cancel, View Customer
- Mobile:
  - List view instead of grid
  - Filter by technician
  - Simplified drag-and-drop or button to reassign

Props:
- workOrders: WorkOrder[]
- technicians: Technician[]
- selectedDate: Date
- viewMode: 'day' | 'week' | 'month'
- onDrop: (workOrderId, technicianId, startTime) => void
- onCreateNew: () => void

Use Tailwind CSS, TypeScript
Drag-and-drop: @dnd-kit or react-big-calendar
Desktop-optimized (1280px+), responsive for tablet
```

---

## 🎨 Part 9: Design System Components

### 9.1 Complete Design System Package

```
Create a complete design system component library for HVAC management app using React TypeScript.

Export all components in a single file: DesignSystem.tsx

Components to include:

1. Typography
- Heading (h1-h6 with predefined sizes)
- Paragraph
- Label
- Code/Mono (for technical values)

2. Buttons
- Primary, Secondary, Destructive, Ghost variants
- Small, Medium, Large sizes
- Loading state, Disabled state
- Icon button variant

3. Inputs
- TextInput
- NumberInput
- Select
- TextArea
- DateInput
- Checkbox
- Radio
- Toggle/Switch

4. Cards
- BaseCard
- WorkOrderCard
- KPICard
- CalculatorCard

5. Badges & Tags
- StatusBadge
- PriorityBadge
- Tag (removable)

6. Modals & Overlays
- Modal
- Drawer (slide from side)
- Dropdown
- Tooltip
- Popover

7. Feedback
- Toast notification
- Alert box (success, error, warning, info)
- Loading spinner
- Progress bar
- Skeleton loader

8. Navigation
- Tabs
- Breadcrumbs
- Pagination
- Link

9. Layout
- Container
- Grid
- Stack (vertical/horizontal)
- Divider

10. Data Display
- Table
- Avatar
- Icon
- Empty state
- Stats card

Color System:
- Primary: #2563eb (blue)
- Success: #10b981 (green)
- Warning: #f59e0b (yellow)
- Error: #ef4444 (red)
- Grays: #f3f4f6, #e5e7eb, #9ca3af, #6b7280, #374151, #1f2937

Spacing Scale:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

Typography Scale:
- xs: 12px
- sm: 14px
- base: 16px
- lg: 18px
- xl: 20px
- 2xl: 24px
- 3xl: 30px
- 4xl: 36px

Requirements:
- All components use Tailwind CSS
- TypeScript with proper prop types
- Accessible (ARIA labels, keyboard nav)
- Mobile-first responsive
- Dark mode ready (optional)
- Consistent API across components
- Well-documented props
- Usage examples in comments

Export structure:
```typescript
export const Button = ({ ... }) => { ... }
export const TextInput = ({ ... }) => { ... }
// etc.

// Also export as namespace
export const DesignSystem = {
  Button,
  TextInput,
  // etc.
}
```

Use Tailwind CSS, TypeScript, shadcn/ui style API
Production-ready, fully accessible
```

---

## 🎯 Usage Summary

You now have prompts for:
- ✅ Core Design System (10 components)
- ✅ Navigation (4 components)
- ✅ Dashboards (3 role-specific)
- ✅ Work Orders (3 components)
- ✅ Field Tools (21 calculators)
- ✅ CRM (2 components)
- ✅ Inventory (2 components)
- ✅ Dispatch (1 component)

**Total: 46 copy-paste ready prompts**

---

## 📁 Saving Generated Code

After generating each component:

1. Copy code from v0.dev
2. Save to your project:
```
frontend/src/components/ui/
  ├── Button.tsx
  ├── Input.tsx
  ├── Card.tsx
  └── ... (all design system components)

frontend/src/pages/
  ├── Dashboard/
  │   ├── TechnicianDashboard.tsx
  │   ├── DispatcherDashboard.tsx
  │   └── ManagerDashboard.tsx
  ├── FieldTools/
  │   ├── FieldToolsHome.tsx
  │   ├── SuperheatCalculator.tsx
  │   └── ... (all 21 calculators)
  └── ... (other pages)
```

3. Import and use in your app

---

**You're ready to build! Start with the calculators your technicians need most. 🚀**
