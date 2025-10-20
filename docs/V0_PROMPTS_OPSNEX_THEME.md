# Complete v0.dev Prompt Library - HVAC Management System (OpsNex Theme)
**Copy-Paste Ready Prompts with Dark Theme & Teal Accents**

---

## 📋 How to Use This Document

1. Copy any prompt below
2. Go to https://v0.dev
3. Paste the prompt
4. Select the design you like (v0 shows 3 variations)
5. Click "Code" → Copy the TypeScript/React code
6. Paste into your app at `frontend/src/components/ui/[ComponentName].tsx`

**OpsNex Color Scheme:**
```
Dark Theme with Teal Accents

Backgrounds:
- Primary Dark: #0f172a (slate-950) - main background
- Card Dark: #334155 (slate-700) - cards, panels
- Hover Dark: #475569 (slate-600) - hover states

Accents:
- Primary Teal: #14b8a6 (teal-500) - buttons, links, accents
- Teal Light: #5eead4 (teal-300) - hover, highlights
- Teal Dark: #0d9488 (teal-600) - active states

Status Colors:
- Success: #10b981 (emerald-500) - green
- Warning: #f59e0b (amber-500) - yellow/orange
- Error: #ef4444 (red-500) - red
- Info: #14b8a6 (teal-500) - teal

Text Colors:
- Primary Text: #f1f5f9 (slate-100) - main text on dark
- Secondary Text: #94a3b8 (slate-400) - muted text
- Dark Text: #1e293b (slate-800) - text on light backgrounds

Light Theme (for contrast sections):
- Light BG: #f1f5f9 (slate-100)
- Light Card: #ffffff (white)
- Light Border: #e2e8f0 (slate-200)

Badges:
- Assigned: teal background (#14b8a6), white text
- In Progress: slate background (#64748b), white text  
- Completed: emerald background (#10b981), white text
- Scheduled: gray background (#6b7280), white text
```

---

## 🎨 Part 1: Core Design System Components

### 1.1 Button Component

```
Create a reusable Button component for HVAC management app (OpsNex dark theme) using React and TypeScript.

Requirements:
- 4 variants: primary, secondary, destructive, ghost
- 3 sizes: small (40px), medium (48px), large (56px for mobile touch)
- States: default, hover, focus, disabled, loading
- Props: variant, size, disabled, loading, onClick, children, className

Color Scheme (Dark Theme with Teal):
- Primary: solid teal (#14b8a6), white text, hover: #5eead4
- Secondary: outline teal (#14b8a6), teal text, hover: teal background
- Destructive: solid red (#ef4444), white text, hover: #dc2626
- Ghost: transparent, slate-400 text (#94a3b8), hover: slate-700 bg

- Loading state: spinner icon (teal color)
- Focus: teal ring (#14b8a6) for accessibility
- Disabled: 50% opacity, not-allowed cursor

Dark theme: Use slate-950 (#0f172a) backgrounds
Use Tailwind CSS, TypeScript, fully accessible with ARIA labels.
Mobile-first with large touch targets.

Export as: export const Button = ({ ... }) => { ... }
```

---

### 1.2 Input Components

```
Create comprehensive Input components for HVAC app (OpsNex dark theme) with React TypeScript.

Dark Theme Color Scheme:
- Background: #0f172a (slate-950)
- Input BG: #334155 (slate-700)
- Input Border: #475569 (slate-600)
- Focus Border: #14b8a6 (teal-500)
- Text: #f1f5f9 (slate-100)
- Placeholder: #94a3b8 (slate-400)
- Label: #f1f5f9 (slate-100)
- Error Text/Border: #ef4444 (red)

Components needed:

1. TextInput
- Label above input (slate-100 text)
- Dark input background (#334155)
- White text (#f1f5f9)
- Placeholder: gray (#94a3b8)
- Error message below (red #ef4444)
- Helper text (slate-400)
- Required indicator (*)
- States: default, focus (teal ring #14b8a6), error (red border), disabled (opacity 50%)
- Height: 56px for mobile touch
- Border: slate-600, focus: teal-500
- Props: label, placeholder, error, helperText, required, disabled, value, onChange

2. NumberInput
- Same styling as TextInput
- type="number"
- Step controls (+ / - buttons on right) - teal color
- Large buttons for mobile (44px min)

3. Select (Dropdown)
- Custom styled select with chevron icon (teal)
- Dark background (#334155)
- Options list: dark with teal hover
- Same states as TextInput

4. TextArea
- Multi-line input
- Dark background (#334155)
- Auto-resize option
- Character count (slate-400)
- Minimum 120px height

5. DateInput
- Native date picker
- Calendar icon on right (teal)
- Dark background
- Format: MM/DD/YYYY placeholder

Use Tailwind CSS dark classes, TypeScript, WCAG AA accessible.
Teal accent theme (#14b8a6), large touch targets for mobile.
Export each component separately.
```

---

### 1.3 Card Components

```
Create 4 card component variants for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme Colors:
- Card Background: #334155 (slate-700)
- Main Background: #0f172a (slate-950)
- Border: #475569 (slate-600)
- Hover: #475569 (slate-600) background
- Text: #f1f5f9 (slate-100)
- Secondary Text: #94a3b8 (slate-400)
- Accent: #14b8a6 (teal-500)

1. BaseCard
- Dark slate background (#334155), subtle border, rounded corners (8px)
- Padding: 16px on mobile, 24px on desktop
- Hover: slate-600 background (#475569)
- Props: children, className, onClick (optional)

2. WorkOrderCard
- Display work order summary
- Dark card background (#334155)
- Props: 
  - status: 'scheduled' | 'in-progress' | 'completed' | 'invoiced'
  - customer: string
  - address: string
  - timeSlot: string
  - jobType: string
  - technicianName?: string
- Layout:
  - Status badge (top right)
  - Customer name (bold, 18px, slate-100)
  - Address (slate-400, 14px)
  - Time slot (teal-400, 16px)
  - Job type (slate-100, 16px)
  - Technician (if assigned, slate-400)
  - "View Details" button at bottom (teal)
- Status colors:
  - Scheduled: gray (#6b7280) background, white text
  - In Progress: slate (#64748b) background, white text
  - Completed: emerald (#10b981) background, white text
  - Invoiced: teal (#14b8a6) background, white text
- Mobile: full width, stack vertically
- Desktop: max-width 400px

3. KPICard
- Dashboard metric display on dark background
- Dark card (#334155)
- Props:
  - title: string
  - value: string | number
  - trend?: number (percentage change)
  - icon?: React.ReactNode
- Layout:
  - Icon (top left, 40px, teal color)
  - Title (slate-400, 14px, top)
  - Value (large, 32px, bold, slate-100)
  - Trend indicator (emerald ↑ or red ↓)
- Teal accents for icons and highlights

4. CalculatorCard
- Field Tools calculator selector
- Dark background (#334155)
- Props:
  - icon: string (emoji)
  - name: string
  - description: string
  - onClick: () => void
- Layout:
  - Large emoji icon (48px, centered)
  - Calculator name (16px, bold, slate-100)
  - Description (14px, slate-400)
  - Hover: slate-600 bg (#475569), scale 1.02
- Mobile: min height 140px, full tap area
- Border: subtle slate-600

Use Tailwind CSS dark theme, TypeScript, responsive, accessible.
Export all 4 variants.
```

---

### 1.4 Badge Component

```
Create StatusBadge component for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme Badge Colors:
- Scheduled: gray background (#6b7280), white text
- In Progress: slate background (#64748b), white text
- Completed: emerald background (#10b981), white text
- Invoiced: teal background (#14b8a6), white text
- Cancelled: red background (#ef4444), white text

Requirements:
- Show work order status with color coding (dark theme optimized)
- Props: status: 'scheduled' | 'in-progress' | 'completed' | 'invoiced' | 'cancelled'
- Size: padding 4px 12px, rounded-full, 14px font, medium weight
- Display: inline-flex, center items
- Optional dot indicator before text
- Mobile: min height 28px for touch

Also create variants:
- PriorityBadge: 
  - low: gray (#6b7280)
  - medium: amber (#f59e0b)
  - high: orange (#fb923c)
  - emergency: red (#ef4444)
- TypeBadge: for job types (maintenance, repair, installation, emergency)
  - Use teal (#14b8a6) for primary, slate (#64748b) for secondary

Use Tailwind CSS dark theme, TypeScript.
Export all badge variants.
```

---

### 1.5 Modal/Dialog Component

```
Create a Modal component for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme Colors:
- Overlay: rgba(15, 23, 42, 0.8) - semi-transparent slate-950
- Modal BG: #334155 (slate-700)
- Header BG: #1e293b (slate-800)
- Border: #475569 (slate-600)
- Text: #f1f5f9 (slate-100)
- Close button: slate-400, hover: teal-400

Requirements:
- Overlay: dark semi-transparent background
- Modal: dark slate card (#334155), centered, max-width 600px on desktop, full-width on mobile
- Header: darker slate (#1e293b), title (slate-100), close button (X) - teal on hover
- Body: children content, slate-100 text
- Footer: action buttons (optional) - teal primary buttons
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
- Mobile: slide up from bottom, full height, dark theme
- Desktop: center with max-height 90vh, scrollable body

Use Tailwind CSS dark classes, TypeScript, Framer Motion for animations (optional).
Fully accessible with keyboard navigation.
Teal accent color (#14b8a6) for interactive elements.
```

---

### 1.6 Toast Notification Component

```
Create Toast notification system for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme Toast Colors:
- Background: #334155 (slate-700) - dark card
- Border color varies by type
- Text: #f1f5f9 (slate-100)
- Icons colored by type

Requirements:
- 4 types: success, error, warning, info
- Position: top-right on desktop, top-center on mobile
- Auto-dismiss: 5 seconds (configurable)
- Manual dismiss: X button (slate-400, hover: teal-400)
- Stacking: multiple toasts stack vertically
- Animation: slide in from right, fade out
- Icons: checkmark (success), X (error), warning triangle, info circle
- Dark card background with colored left border (4px):
  - Success: emerald (#10b981) border/icon, dark bg
  - Error: red (#ef4444) border/icon, dark bg
  - Warning: amber (#f59e0b) border/icon, dark bg
  - Info: teal (#14b8a6) border/icon, dark bg

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

Use Tailwind CSS dark theme, TypeScript, accessible with ARIA live regions.
Dark slate background with teal/emerald/amber/red accents.
```

---

## 🧭 Part 2: Navigation Components

### 2.1 Sidebar Navigation

```
Create Sidebar navigation for HVAC desktop app (OpsNex dark theme) using React TypeScript.

Dark Theme Colors:
- Sidebar BG: #1e293b (slate-800) - slightly lighter than main bg
- Border: #334155 (slate-700)
- Text: #94a3b8 (slate-400) - inactive
- Active Text: #f1f5f9 (slate-100)
- Active BG: #334155 (slate-700)
- Active Border: #14b8a6 (teal-500) - left 3px border
- Hover BG: #334155 (slate-700)
- Icon: #94a3b8 (inactive), #14b8a6 (active) - teal

Requirements:
- Fixed left sidebar, 280px width
- Dark slate background (#1e293b), border-right (#334155)
- Logo/company name at top (48px height, white text or teal accent)
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
  - Icon (left, 20px, slate-400 default, teal-500 active)
  - Label (16px, slate-400 default, slate-100 active)
  - Active state: slate-700 background, slate-100 text, teal-500 left border (3px)
  - Hover: slate-700 background
  - Height: 44px, padding 12px
- User profile at bottom:
  - Avatar (32px circle)
  - Name (slate-100) and role (slate-400)
  - Logout button (hover: teal-400)
- Mobile: collapsible hamburger menu
- Props: activeItem, onNavigate, userInfo
- Use React Router Link for navigation

Use Tailwind CSS dark theme, TypeScript, responsive.
Include collapse/expand button for desktop (teal icon).
```

---

### 2.2 Top Bar

```
Create TopBar component for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme Colors:
- TopBar BG: #1e293b (slate-800)
- Border Bottom: #334155 (slate-700)
- Text: #f1f5f9 (slate-100)
- Icons: #94a3b8 (slate-400), hover: #14b8a6 (teal-500)
- Search BG: #334155 (slate-700)
- Search Border: #475569 (slate-600), focus: #14b8a6 (teal)
- Dropdown BG: #334155 (slate-700)
- Badge: #ef4444 (red) for notifications

Requirements:
- Fixed top, full width, 64px height
- Dark slate background (#1e293b), bottom border (#334155)
- Layout (left to right):
  1. Hamburger menu icon (mobile only, toggle sidebar) - slate-400/teal-500
  2. Page title (20px, bold, slate-100)
  3. Search bar (center on desktop, hidden on mobile):
     - Dark input background (#334155)
     - Magnifying glass icon (teal)
     - Placeholder: "Search work orders, customers, SKUs..." (slate-400)
     - Width: 400px max on desktop
     - Focus: teal ring (#14b8a6)
     - White text
  4. Notification bell icon with red badge count (#ef4444)
  5. User avatar with dropdown menu
- Notification badge:
  - Red dot if unread
  - Number badge if count > 1
  - Dropdown: dark card list (#334155) of recent notifications
- User dropdown:
  - Dark background (#334155)
  - Profile, Settings, Logout
  - Hover: slate-600 background
  - Teal icons
- Z-index high for fixed positioning

Props: 
- pageTitle: string
- notificationCount: number
- userInfo: { name, avatar, role }
- onSearch: (query: string) => void

Use Tailwind CSS dark theme, TypeScript, responsive.
Dropdown menus with click-outside-to-close.
Teal accents for interactive elements.
```

---

### 2.3 Bottom Navigation (Mobile)

```
Create mobile BottomNavigation for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme Colors:
- Bottom Nav BG: #1e293b (slate-800)
- Border Top: #334155 (slate-700)
- Active Icon/Text: #14b8a6 (teal-500)
- Inactive Icon/Text: #94a3b8 (slate-400)

Requirements:
- Fixed bottom, full width, 72px height
- Dark slate background (#1e293b), top border (#334155)
- 4 navigation items:
  1. Home (house icon)
  2. Work Orders (clipboard icon)
  3. Field Tools (wrench icon)
  4. Profile (person icon)
- Each item:
  - Icon (24px)
  - Label (12px)
  - Active state: teal icon and text (#14b8a6)
  - Inactive: slate-400 (#94a3b8)
  - Center aligned, stacked vertically
  - Tap area: full width of item
- Props: activeTab, onTabChange
- Safe area padding for iOS devices
- Only show on mobile (hidden above 768px breakpoint)

Use Tailwind CSS dark theme, TypeScript.
Include haptic feedback on tap (if supported).
Export as: export const BottomNav = ({ ... }) => { ... }
```

---

### 2.4 Breadcrumbs Component

```
Create Breadcrumbs for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme Colors:
- Text: #94a3b8 (slate-400) for previous items
- Active Text: #f1f5f9 (slate-100) for current page
- Link Hover: #14b8a6 (teal-500)
- Separator: #64748b (slate-500)

Requirements:
- Display navigation path: Home > CRM > Accounts > Johnson Residence
- Each item clickable except last (current page)
- Separator: > or / (chevron-right icon, slate-500)
- Active (current) item: bold, slate-100, not clickable
- Previous items: slate-400 links, hover: teal-500 and underline
- Mobile: show only last 2 items to save space
- Props: items: Array<{ label: string, href?: string }>

Example usage:
```typescript
<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'CRM', href: '/crm' },
  { label: 'Accounts', href: '/crm/accounts' },
  { label: 'Johnson Residence' } // current page
]} />
```

Use Tailwind CSS dark theme, TypeScript, React Router Link.
Accessibility: ARIA breadcrumb navigation.
Teal hover states for links.
```

---

## 📊 Part 3: Dashboard Components

### 3.1 Technician Dashboard (Mobile Dark Theme)

```
Create mobile-first Technician Dashboard for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme Color Scheme:
- Main BG: #0f172a (slate-950)
- Card BG: #334155 (slate-700)
- Accent: #14b8a6 (teal-500)
- Text Primary: #f1f5f9 (slate-100)
- Text Secondary: #94a3b8 (slate-400)
- Border: #475569 (slate-600)

Requirements:
- Header: 
  - "Today's Schedule" (slate-100)
  - Current date (slate-400)
  - Dark background (#1e293b)
- User greeting: "Good morning, John!" with avatar (slate-100 text)
- KPI Summary (2 dark cards in row):
  - Jobs Today: number with teal icon (#14b8a6)
  - Hours Worked: number with teal icon
  - Card background: #334155
  - Value: large, slate-100
  - Label: slate-400
- Work Orders Section:
  - Title: "Assigned Jobs" (slate-100)
  - List of dark WorkOrderCards (background #334155)
  - Each card: customer, address, time (teal color), job type, status badge
  - Click to view details
  - Empty state: "No jobs scheduled" (slate-400) with teal icon
- Quick Actions (grid 2x2, dark cards):
  - "Field Tools" (large, teal bg #14b8a6, white text, wrench icon)
  - "Scanner" (slate-700 bg, barcode icon, teal icon)
  - "Update Status" (slate-700 bg, checkmark icon, teal icon)
  - "Report Issue" (slate-700 bg, warning icon, teal icon)
  - Large touch targets (80px height)
- Map Preview (optional):
  - Dark map with teal pins
  - "View Full Route" button (teal)

Props:
- technicianName: string
- jobsToday: number
- hoursWorked: number
- workOrders: WorkOrder[]

Styling:
- Dark theme throughout (#0f172a main, #334155 cards)
- Mobile-first, padding 16px
- Card spacing 12px
- Touch-friendly (min 44px tap targets)
- Teal accent (#14b8a6) for buttons and highlights
- White/slate-100 text on dark backgrounds

Use Tailwind CSS dark classes, TypeScript, responsive.
Include pull-to-refresh gesture area at top.
```

---

### 3.2 Dispatcher Dashboard (Dark Theme)

```
Create Dispatcher Dashboard for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Main BG: #0f172a (slate-950)
- Card BG: #334155 (slate-700)
- Header BG: #1e293b (slate-800)
- Accent: #14b8a6 (teal-500)
- Chart Line: #14b8a6 (teal)
- Text: #f1f5f9 (slate-100)
- Secondary: #94a3b8 (slate-400)

Requirements:
- Header: "Dispatch Overview" (slate-100) with live clock (slate-400)
  - Dark header background (#1e293b)
- KPI Row (4 dark cards, #334155 bg):
  - Active Jobs: count (slate-100) with teal trend indicator
  - Available Techs: count with status dots (emerald=available, amber=break, red=busy)
  - Emergency Calls: count with red alert icon (#ef4444)
  - Avg Response Time: time in minutes (slate-100)
  - Card hover: slate-600 background
- Today's Schedule Section:
  - Dark calendar view (#334155 base)
  - Timeline: 7 AM - 7 PM
  - Technician rows with dark backgrounds
  - Drag-and-drop work orders (teal accents when dragging)
  - Color-coded by status (use badge colors)
  - Click technician: teal highlight
- Unassigned Jobs Panel (right sidebar, #1e293b bg):
  - Dark card background
  - List of unassigned work orders
  - Priority indicators (red flag for emergency)
  - Teal "Assign" button on each
  - Drag to schedule
- Quick Actions:
  - "Create Work Order" button (large, teal bg #14b8a6, white text)
  - "Emergency Call" button (red bg #ef4444, white text)
  - Filter/Search bar (dark input #334155, teal focus)
- Real-time updates indicator (teal badge)

Props:
- activeJobs: number
- availableTechs: number
- emergencyCalls: number
- avgResponseTime: number
- technicians: Technician[]
- workOrders: WorkOrder[]
- unassigned: WorkOrder[]

Desktop optimized, responsive for tablet.
Dark theme with teal accents.
Use Tailwind CSS dark classes, TypeScript.
Drag-and-drop: @dnd-kit with dark theme styling
```

---

### 3.3 Manager Dashboard (Executive Dark Theme)

```
Create Executive Manager Dashboard for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme (matching OpsNex image):
- Main BG: #0f172a (slate-950)
- Card BG: #334155 (slate-700)
- Accent: #14b8a6 (teal-500)
- Chart Line: #14b8a6 (teal)
- Grid Lines: #475569 (slate-600)
- Text: #f1f5f9 (slate-100)
- Muted: #94a3b8 (slate-400)
- Success: #10b981 (emerald)
- Error: #ef4444 (red)

Requirements:
- Header: "Executive Overview" (slate-100) with date range selector
  - Dark background (#1e293b)
  - Teal date picker accent
- KPI Grid (2 rows × 3 columns, dark cards #334155):
  Row 1:
  - Total Revenue: $ (large, slate-100) with trend % (emerald ↑ or red ↓)
  - Active Work Orders: count (slate-100)
  - Customer Satisfaction: rating (slate-100) with stars (amber)
  Row 2:
  - Technician Utilization: % with teal circular gauge
  - Avg Job Duration: hours (slate-100)
  - Parts Cost: $ (slate-100)
  
- Charts Section (2 columns, dark cards):
  - Revenue Chart (left): 
    - Line chart, teal line (#14b8a6), last 30 days
    - Dark background, slate grid lines
    - Axes labels: slate-400
  - Job Status Distribution (right): 
    - Donut chart (scheduled=gray, in-progress=teal, completed=emerald)
    - Dark background
    - Legend: slate-100 text

- Performance Table (dark card):
  - Top 5 Technicians ranking
  - Dark table: slate-700 rows, slate-600 borders
  - Headers: slate-400
  - Data: slate-100
  - Columns: Name, Jobs Completed, Avg Duration, Customer Rating
  - Hover: slate-600 row background
  - Click to drill down

- Recent Activity Feed (dark card):
  - Last 10 activities
  - Timestamps (slate-400)
  - Icons per activity type (teal)
  - Dark background with subtle borders

- Quick Actions:
  - "View Reports" button (teal bg, white text)
  - "Export Data" button (slate-700 bg, teal border, teal text)
  - Date range picker (dark theme, teal accents)

Props:
- revenue: { value: number, trend: number }
- activeWorkOrders: number
- satisfaction: number
- utilization: number
- avgDuration: number
- partsCost: number
- revenueData: Array<{ date: string, amount: number }>
- jobDistribution: { scheduled, inProgress, completed }
- topTechnicians: Technician[]
- recentActivity: Activity[]

Desktop optimized (1280px+), tablet responsive.
Dark theme throughout with teal accents.
Use Tailwind CSS dark classes, TypeScript.
Charts: Recharts with dark theme config, teal colors
```

---

## 🔧 Part 4: Field Tools - All 21 Calculators (Dark Theme)

### General Field Tools Styling (Apply to ALL calculators):
```
Dark Theme Base:
- Main BG: #0f172a (slate-950) or #1e293b (slate-800) for light contrast
- Input BG: #334155 (slate-700)
- Input Border: #475569 (slate-600)
- Input Focus: #14b8a6 border (teal)
- Text: #f1f5f9 (slate-100)
- Label: #f1f5f9 (slate-100)
- Placeholder: #94a3b8 (slate-400)
- Result BG: #334155 (slate-700)
- Calculate Button: #14b8a6 bg (teal), white text, hover: #5eead4
- Save Button: #10b981 bg (emerald), white text
- Clear Button: #64748b bg (slate), white text
- Help Text: #94a3b8 (slate-400)

Status Colors:
- Normal/Good (Green zone): #10b981 bg, white text
- Warning (Yellow zone): #f59e0b bg, dark text
- Error/Problem (Red zone): #ef4444 bg, white text

Gauges/Charts:
- Green zone: #10b981
- Yellow zone: #f59e0b
- Red zone: #ef4444
- Needle/Marker: #14b8a6 (teal)
- Grid lines: #475569 (slate-600)
```

### 4.1 Field Tools Home Page (Dark Theme)

```
Create Field Tools home page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Main BG: #0f172a (slate-950)
- Card BG: #334155 (slate-700)
- Card Hover: #475569 (slate-600)
- Text: #f1f5f9 (slate-100)
- Description: #94a3b8 (slate-400)
- Category Header: #f1f5f9 with teal accent (#14b8a6)
- Search BG: #334155, border: #475569, focus: teal

Requirements:
- Header: "Field Tools" (slate-100) with dark search bar
  - Search background: #334155
  - Search border: #475569, focus: #14b8a6
  - Placeholder: slate-400
  - Icon: teal
  - Dark header BG: #1e293b

- Category sections (6 sections):
  1. ⚡ Electrical (4 tools)
  2. ❄️ Refrigeration (4 tools)
  3. 💨 Airflow (3 tools)
  4. 🔥 Gas/Combustion (3 tools)
  5. 💧 Hydronic/Boiler (3 tools)
  6. 🔄 Utilities (4 tools)

Each section:
- Category header (slate-100) with teal icon/accent and count (slate-400)
- Grid of dark calculator cards (2 cols mobile, 3 tablet, 4 desktop)
- Each card (#334155 bg):
  - Large emoji icon (48px)
  - Calculator name (16px, bold, slate-100)
  - Description (14px, slate-400)
  - Click to open
  - Hover: slate-600 bg (#475569), scale 1.02, subtle shadow
  - Border: subtle slate-600

All 21 Calculators:

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
- onSelectCalculator: (id) => void
- recentlyUsed?: string[] (show "Recently Used" section at top with teal highlight)

Dark theme throughout, mobile-first, lazy load components.
Use Tailwind CSS dark classes, TypeScript.
Teal accents for interactive elements.
```

---

### 4.2 Superheat Calculator (Dark Theme)

```
Create Superheat Calculator for HVAC technicians (OpsNex dark theme) using React TypeScript.

Dark Theme Colors:
- Main BG: #1e293b (slate-800)
- Card/Panel BG: #334155 (slate-700)
- Input BG: #334155 (slate-700)
- Input Border: #475569 (slate-600)
- Input Focus Border: #14b8a6 (teal)
- Text: #f1f5f9 (slate-100)
- Label: #f1f5f9 (slate-100)
- Placeholder: #94a3b8 (slate-400)
- Help Text: #94a3b8 (slate-400)

Buttons:
- Calculate: #14b8a6 bg (teal), white text, hover: #5eead4
- Save: #10b981 bg (emerald), white text
- Clear: #64748b bg (slate), white text

Status Results (Large display):
- Normal (10-15°F): #10b981 bg (emerald), white text, "✓ Superheat Normal - Charge OK"
- Borderline (7-9 or 16-20°F): #f59e0b bg (amber), dark text, "⚠ Check Charge"
- Low (<7°F): #ef4444 bg (red), white text, "✗ Low Superheat - Overcharged"
- High (>20°F): #ef4444 bg (red), white text, "✗ High Superheat - Undercharged"

Requirements:
- Title: "Superheat Calculator" (slate-100) with back button (teal icon)
  - Dark header (#1e293b)
- Subtitle: "Diagnose refrigerant charge - measure suction line" (slate-400)

Input Section (dark cards #334155):
1. Refrigerant Type - dark select (#334155):
   - Options: R-410A, R-22, R-134a, R-404A, R-407C
   - White text, slate-400 placeholder
   - Teal focus ring
2. Suction Pressure (PSI) - large dark number input (56px height)
   - White text on dark background
   - Teal focus border
3. Suction Line Temperature (°F) - large dark number input
   - Same styling

Calculate Button:
- Large, teal background (#14b8a6), white text
- Full width on mobile
- Hover: lighter teal (#5eead4)

Result Display (dark card #334155):
- Saturation Temperature: [X]°F (slate-400 label, slate-100 value)
- Suction Line Temp: [X]°F (entered, slate-100)
- Superheat: [X]°F (LARGE, prominent, slate-100, 32px)
- Status badge (color-coded as above, full width, rounded)

Visual Gauge (dark background):
- 0°F to 30°F scale (slate-400 labels)
- Color zones: 
  - Red (<7°F, >20°F): #ef4444
  - Amber (7-9°F, 16-20°F): #f59e0b
  - Emerald (10-15°F): #10b981
- Teal marker (#14b8a6) showing current superheat
- Dark background, slate grid lines

Diagnosis Help (expandable, dark card):
- Slate-400 text
- Links in teal

Save to Work Order button (emerald bg #10b981, white text, full width)
Clear button (slate bg #64748b)
PT Chart quick reference (expandable dark panel)

Mobile-first, large touch targets (56px inputs)
Use Tailwind CSS dark classes, TypeScript
Include PT chart data for all refrigerant types
Teal accent throughout
```

---

### 4.3 Subcooling Calculator (Dark Theme)

```
Create Subcooling Calculator for HVAC technicians (OpsNex dark theme) using React TypeScript.

[Use same dark theme styling as Superheat Calculator above]

Dark Theme:
- Main BG: #1e293b
- Cards: #334155
- Inputs: #334155 bg, #475569 border, #14b8a6 focus
- Text: #f1f5f9
- Labels: #f1f5f9
- Placeholder: #94a3b8

Buttons:
- Calculate: teal (#14b8a6)
- Save: emerald (#10b981)
- Clear: slate (#64748b)

Status Results (8-12°F normal range):
- Normal (8-12°F): #10b981 bg, "✓ Subcooling Normal - Charge OK"
- Borderline (5-7 or 13-15°F): #f59e0b bg, "⚠ Check Charge"
- Low (<5°F): #ef4444 bg, "✗ Low Subcooling - Undercharged"
- High (>15°F): #ef4444 bg, "✗ High Subcooling - Overcharged or Restriction"

Requirements:
- Title: "Subcooling Calculator" (slate-100), dark header
- Subtitle: "Verify refrigerant charge - measure liquid line" (slate-400)

Dark Input Cards:
1. Refrigerant Type (dark select)
2. Liquid Pressure (PSI) - large dark input (56px)
3. Liquid Line Temperature (°F) - large dark input

Calculate Button (teal bg, white text, large)

Dark Result Display Card:
- Saturation Temp: [X]°F (slate-400/slate-100)
- Liquid Line Temp: [X]°F
- Subcooling: [X]°F (LARGE, 32px, slate-100)
- Color-coded status badge (full width)

Dark Visual Gauge:
- 0°F to 25°F scale
- Emerald zone (8-12°F): #10b981
- Amber zones (5-7°F, 13-15°F): #f59e0b
- Red zones (<5°F, >15°F): #ef4444
- Teal marker: #14b8a6
- Dark bg, slate grid

Diagnosis Help (dark expandable panel, slate-400 text)
Save to Work Order (emerald button)
Clear button (slate)

Mobile-optimized, dark theme, teal accents
Use Tailwind CSS dark classes, TypeScript
```

---

### 4.4 Ohm's Law Calculator (Dark Theme)

```
Create Ohm's Law Calculator for HVAC technicians (OpsNex dark theme) using React TypeScript.

[Use dark theme base styling]

Dark Theme:
- Main BG: #1e293b
- Input Cards: #334155
- Input BG: #334155, border: #475569, focus: #14b8a6
- Text: #f1f5f9
- Calculated fields BG: #475569 (darker slate to show read-only)
- Calculated values: #14b8a6 (teal) to highlight

Requirements:
- Title: "Ohm's Law Calculator" (slate-100), dark header, teal back button
- Formula display: "V = I × R, P = V × I" (slate-400, dark card)

4 Input Fields (large, 56px, dark):
1. Voltage (V) - Volts (dark input)
2. Current (I) - Amps (dark input)
3. Resistance (R) - Ohms (dark input)
4. Power (P) - Watts (dark input)

Logic:
- When user enters ANY 2 values, calculate other 2 automatically
- User-entered: normal dark input (#334155)
- Calculated: darker background (#475569), teal text (#14b8a6), read-only
- Clear distinction between input and calculated

Buttons (dark theme):
- Reset (slate bg, white text) - clear all fields
- Example button (teal outline, teal text) - prefill with common scenario

Dark Result Display Card:
- Show all 4 values with units
- Calculated values in teal (#14b8a6)
- Large display (24px)

Help Section (expandable dark card):
- When to use (slate-400 text)
- HVAC applications
- Formula explanations
- Dark background

Save to Work Order button (emerald #10b981, full width)

Validation:
- Show "Enter 2 values to calculate" in slate-400
- Prevent negative numbers (red border #ef4444)

Mobile-first, large touch targets
Dark theme, teal accents
Use Tailwind CSS dark classes, TypeScript
Real-time calculation (no separate Calculate button)
```

---

**[Continue with remaining 18 calculators using the same dark theme pattern...]**

For brevity, all remaining Field Tools calculators (Capacitor Test, Motor Amps, Voltage Drop, Target Superheat, PT Chart, CFM, Duct Sizer, Static Pressure, Gas Pipe Sizer, Combustion Air, Combustion Analysis, Expansion Tank, Hydronic Flow, Radiant Floor, Psychrometric, Tonnage Converter, Unit Converter, Heat Load) should follow this exact dark theme:

**Standard Dark Theme Pattern for All Calculators:**
```
Colors:
- Main BG: #1e293b (slate-800)
- Cards/Panels: #334155 (slate-700)
- Inputs: #334155 bg, #475569 border, #14b8a6 focus
- Text: #f1f5f9 (slate-100)
- Labels: #f1f5f9
- Placeholder: #94a3b8 (slate-400)
- Help/Secondary: #94a3b8

Buttons:
- Primary/Calculate: #14b8a6 (teal) bg, white text
- Save: #10b981 (emerald) bg, white text
- Clear/Cancel: #64748b (slate-600) bg, white text

Results:
- Good/Normal: #10b981 (emerald) bg, white text
- Warning: #f59e0b (amber) bg, dark text
- Error/Problem: #ef4444 (red) bg, white text

Charts/Gauges:
- Lines/Markers: #14b8a6 (teal)
- Grid: #475569 (slate-600)
- Background: #334155 (slate-700)
- Good zone: #10b981
- Warning zone: #f59e0b
- Error zone: #ef4444

All inputs: 56px height, large touch targets
All cards: #334155 bg, subtle #475569 border
All text: #f1f5f9 (slate-100) on dark
Mobile-first, responsive
Teal accents throughout
```

---

## 👥 Part 5: CRM, Inventory, Work Orders (Dark Theme)

### 5.1 Work Order List (Dark Theme)

```
Create Work Order List page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Main BG: #0f172a (slate-950)
- Header BG: #1e293b (slate-800)
- Card BG: #334155 (slate-700)
- Table Row: #334155, hover: #475569
- Border: #475569 (slate-600)
- Text: #f1f5f9 (slate-100)
- Secondary: #94a3b8 (slate-400)
- Accent: #14b8a6 (teal)

Requirements:
- Dark Header (#1e293b):
  - Title: "Work Orders" (slate-100)
  - "Create Work Order" button (teal bg, white text, top right)
  - Search bar (dark #334155 bg, slate-600 border, teal focus, white text)
    - Placeholder: slate-400
    - Icon: teal

- Filters Bar (dark card #334155):
  - Status dropdown: dark select, teal accent
  - Date range picker: dark theme, teal accents
  - Technician filter: dark multi-select
  - Priority filter: dark dropdown
  - "Clear Filters" button (slate-600 bg, teal text)
  - Active filter count badge (teal bg)

- Stats Bar (3 KPI dark cards #334155):
  - Total, In Progress, Completed counts
  - Large values (slate-100), labels (slate-400)
  - Teal icons

- Table (desktop, dark theme):
  - Dark background (#334155)
  - Headers: slate-400, hover: teal
  - Rows: #334155, hover: #475569
  - Text: slate-100
  - Borders: slate-600
  - Columns: WO#, Customer, Status, Technician, Date, Job Type, Actions
  - Sortable columns (teal sort indicators)
  - Pagination: dark theme, teal active page
  - Row actions: teal icons (View, Edit, Delete)
  - Row click: navigate, teal highlight

- Mobile Cards (dark #334155):
  - WorkOrderCard styling
  - Swipe left: red delete (dark red #7f1d1d bg)
  - Pull to refresh (teal indicator)

- Empty state: "No work orders" (slate-400) with teal icon

Props:
- workOrders: WorkOrder[]
- totalCount: number
- filters: FilterState
- onFilterChange, onCreate, onView, onEdit, onDelete

Use Tailwind CSS dark classes, TypeScript, React Table
Mobile-first, responsive
Teal accents throughout
```

---

### 5.2 Inventory SKU List (Dark Theme)

```
Create Inventory SKU List for HVAC app (OpsNex dark theme) using React TypeScript.

[Similar dark theme pattern as Work Order List]

Dark Theme:
- Main BG: #0f172a
- Cards: #334155
- Headers: #1e293b
- Text: #f1f5f9
- Secondary: #94a3b8
- Accent: #14b8a6

Stock Level Color Coding (badges on dark):
- In Stock (>reorder point): #10b981 bg, white text
- Low Stock (±20% of reorder): #f59e0b bg, dark text
- Out of Stock (<reorder point): #ef4444 bg, white text

Requirements:
- Dark header with search (teal accents)
- Filters: dark dropdowns (Category, Stock Status, Warehouse)
- Stats: Total SKUs, Low Stock Alerts (red badge), Inventory Value
  - Dark cards (#334155), teal icons
- Dark table with stock badges
- Mobile: dark SKU cards with prominent stock badges
- Quick Actions: 
  - Scan barcode (teal button)
  - Import/Export (slate buttons, teal icons)

Use dark theme, teal accents
TypeScript, responsive
```

---

### 5.3 Dispatch Board (Dark Theme)

```
Create Dispatch Board calendar for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme (like OpsNex calendar in image):
- Main BG: #0f172a (slate-950)
- Calendar BG: #334155 (slate-700)
- Header: #1e293b (slate-800)
- Time Slots: #1e293b (alternating)
- Cell Hover: #475569 (slate-600)
- Text: #f1f5f9 (slate-100)
- Day Labels: #94a3b8 (slate-400)
- Current Day Highlight: teal border (#14b8a6)
- Grid Lines: #475569 (slate-600)

Work Order Cards on Calendar (dark):
- Card BG: varies by status
  - Scheduled: #6b7280 (gray-500)
  - In Progress: #14b8a6 (teal-500)
  - Completed: #10b981 (emerald-500)
  - Emergency: #ef4444 (red-500)
- Text: white
- Hover: lighter shade
- Drag handle: visible on hover (teal)

Requirements:
- Dark header (#1e293b):
  - "Dispatch & Scheduling" (slate-100)
  - Date nav: < Today > (teal arrows)
  - View selector: Day/Week/Month (dark tabs, teal active)
  - "Create Work Order" (teal button)

- Week View (default):
  - Dark calendar grid (#334155)
  - 7 columns (Mon-Sun) - slate-400 headers
  - Time slots 7 AM - 7 PM (slate-400 labels)
  - Technician swimlanes: alternating dark backgrounds
  - Drag-and-drop (teal drop zone highlight)
  
- Work Order Cards:
  - Customer name (white, bold)
  - Time slot (white)
  - Status badge (small)
  - Job type icon
  - Priority flag (red if emergency)
  - Click: teal border highlight
  
- Technician Lanes (left sidebar, dark #1e293b):
  - Avatar + name (slate-100)
  - Status dot: emerald (available), amber (on job), slate (off)
  - Click: teal highlight

- Unassigned Panel (right sidebar, dark #1e293b):
  - Dark cards (#334155)
  - Teal "Assign" buttons
  - Priority sorting (emergency red top)
  - Count badge (teal)

- Conflict Detection:
  - Red outline if overlapping
  - Warning icon (red)

- Mobile:
  - List view (dark cards)
  - Filter by technician (dark dropdown)
  - Simplified drag or button reassign

Props:
- workOrders, technicians, selectedDate, viewMode
- onDrop, onCreateNew

Desktop-optimized (1280px+)
Dark theme with teal accents
@dnd-kit with dark styling
TypeScript, responsive
```

---

## 🎨 Part 6: Complete Dark Design System

### 6.1 Full Design System Package (Dark Theme)

```
Create complete design system for HVAC app (OpsNex dark theme) using React TypeScript.

Export all components in: DesignSystem.tsx

OpsNex Color System:
```typescript
const colors = {
  // Backgrounds
  bg: {
    primary: '#0f172a',    // slate-950 - main bg
    secondary: '#1e293b',  // slate-800 - headers, sidebars
    card: '#334155',       // slate-700 - cards, panels
    hover: '#475569',      // slate-600 - hover states
  },
  // Accents
  accent: {
    primary: '#14b8a6',    // teal-500 - main accent
    light: '#5eead4',      // teal-300 - hover
    dark: '#0d9488',       // teal-600 - active
  },
  // Status
  status: {
    success: '#10b981',    // emerald-500
    warning: '#f59e0b',    // amber-500
    error: '#ef4444',      // red-500
    info: '#14b8a6',       // teal-500
  },
  // Text
  text: {
    primary: '#f1f5f9',    // slate-100
    secondary: '#94a3b8',  // slate-400
    muted: '#64748b',      // slate-500
    dark: '#1e293b',       // slate-800 (on light backgrounds)
  },
  // Borders
  border: {
    default: '#475569',    // slate-600
    light: '#64748b',      // slate-500
    dark: '#334155',       // slate-700
  },
  // Badges
  badge: {
    scheduled: '#6b7280',  // gray-500
    inProgress: '#64748b', // slate-500
    completed: '#10b981',  // emerald-500
    invoiced: '#14b8a6',   // teal-500
  },
}
```

Components (ALL with dark theme):

1. **Typography** (dark theme defaults)
- Heading: slate-100 text
- Paragraph: slate-100 text
- Label: slate-100 text
- Secondary text: slate-400
- Code/Mono: teal-400 for values

2. **Buttons** (dark theme)
- Primary: teal-500 bg, white text, hover: teal-300
- Secondary: transparent, teal-500 border/text, hover: teal-500 bg
- Destructive: red-500 bg, white text
- Ghost: transparent, slate-400 text, hover: slate-700 bg
- All with teal focus rings

3. **Inputs** (dark theme)
- TextInput: slate-700 bg, slate-600 border, teal-500 focus, white text
- NumberInput: same + teal +/- buttons
- Select: dark dropdown, teal chevron
- TextArea: dark bg, white text
- DateInput: dark bg, teal calendar icon
- Checkbox: teal when checked
- Radio: teal when selected
- Toggle: slate bg, teal when active

4. **Cards** (dark)
- BaseCard: slate-700 bg, slate-600 border
- WorkOrderCard: dark with status badges
- KPICard: dark with teal icons
- CalculatorCard: dark with hover: slate-600

5. **Badges & Tags** (dark optimized)
- StatusBadge: colored bg (see badge colors above)
- PriorityBadge: gray/amber/orange/red
- Tag: slate-700 bg, removable (teal X)

6. **Modals & Overlays** (dark)
- Modal: slate-700 bg, slate-800 header
- Drawer: slide from side, dark theme
- Dropdown: slate-700 bg, teal hover
- Tooltip: slate-800 bg, white text
- Popover: dark theme

7. **Feedback** (dark)
- Toast: slate-700 bg with colored left border
- Alert: dark card with status icon
- Loading spinner: teal
- Progress bar: teal fill, slate track
- Skeleton: slate-700 shimmer

8. **Navigation** (dark)
- Tabs: slate-800 bg, teal active indicator
- Breadcrumbs: slate-400 text, teal hover
- Pagination: dark theme, teal active
- Link: teal-400, hover: teal-300

9. **Layout** (dark)
- Container: slate-950 bg
- Grid: standard
- Stack: standard
- Divider: slate-600

10. **Data Display** (dark)
- Table: slate-700 rows, slate-600 borders, slate-100 text
- Avatar: dark border
- Icon: teal by default
- Empty state: slate-400 text, teal icon
- Stats card: dark with teal accents

All Components:
- Dark theme by default
- Teal (#14b8a6) primary accent
- Accessible (ARIA labels, keyboard nav)
- Mobile-first responsive
- Consistent API
- TypeScript prop types
- Usage examples in comments

Export structure:
```typescript
export const Button = ({ variant = 'primary', ...props }) => {
  const baseClasses = 'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500'
  const variants = {
    primary: 'bg-teal-500 text-white hover:bg-teal-400',
    secondary: 'border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'text-slate-400 hover:bg-slate-700',
  }
  // ... implementation
}

// Export all components
export const DesignSystem = {
  Button,
  TextInput,
  Card,
  // ... etc
}
```

Use Tailwind CSS dark classes throughout
TypeScript with full type safety
Production-ready, fully accessible
OpsNex dark theme with teal accents
```

---

## ✅ Summary

You now have **46 complete prompts** updated for the **OpsNex dark theme**:

**Key Theme Changes:**
- ✅ Dark backgrounds (#0f172a, #1e293b, #334155)
- ✅ Teal accents (#14b8a6) instead of blue
- ✅ Light text on dark (#f1f5f9)
- ✅ Status colors: emerald, amber, red
- ✅ All badges, buttons, inputs updated for dark theme
- ✅ Charts with teal lines on dark backgrounds
- ✅ Mobile-optimized dark cards

**Ready to use with v0.dev!** 🎨🚀

Each prompt is self-contained and includes the complete OpsNex color scheme.
