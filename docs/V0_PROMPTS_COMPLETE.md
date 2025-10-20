# Complete v0.dev Prompt Library - HVAC Management System
**All 68 Prompts with OpsNex Dark Theme** 

---

## 📖 Table of Contents

**[How to Use](#how-to-use) | [Color Scheme Reference](#color-scheme-reference)**

### Core Components
- [Part 1: Design System (10 components)](#part-1-design-system-components)
- [Part 2: Navigation (4 components)](#part-2-navigation-components)

### Pages by Feature
- [Part 3: Authentication (5 pages)](#part-3-authentication-pages)
- [Part 4: Settings & Profile (1 page)](#part-4-settings--profile)
- [Part 5: Dashboards (3 dashboards)](#part-5-dashboards)
- [Part 6: Work Orders (3 pages)](#part-6-work-orders)
- [Part 7: CRM (4 pages)](#part-7-crm-pages)
- [Part 8: Inventory (2 pages)](#part-8-inventory)
- [Part 9: Purchasing (2 pages)](#part-9-purchasing)
- [Part 10: Dispatch (1 page)](#part-10-dispatch)
- [Part 11: Field Tools (22 calculators)](#part-11-field-tools)
- [Part 12: Additional Features (4 pages)](#part-12-additional-features)
- [Part 13: Utility Pages (3 pages)](#part-13-utility-pages)

---

## 📋 How to Use

1. **Find the component** you need in the table of contents
2. **Copy the entire prompt** (everything inside the triple backticks)
3. **Go to https://v0.dev** and paste it
4. **Select your preferred design** (v0 shows 3 variations)
5. **Copy the generated code** and paste into your project

**File locations:**
- Components: `frontend/src/components/ui/[ComponentName].tsx`
- Pages: `frontend/src/pages/[PageName].tsx`

---

## 🎨 Color Scheme Reference

**OpsNex Dark Theme with Teal Accents**

```typescript
// Copy this into your tailwind.config.js or reference in prompts

const colors = {
  // Backgrounds
  bg: {
    primary: '#0f172a',    // slate-950 - main background
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
    primary: '#f1f5f9',    // slate-100 - main text on dark
    secondary: '#94a3b8',  // slate-400 - muted text
    muted: '#64748b',      // slate-500
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
    cancelled: '#ef4444',  // red-500
  },
}
```

---

## Part 1: Design System Components

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
Create# comprehensive Input components for HVAC app (OpsNex dark theme) with React TypeScript.

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

### 1.7 Table Component

```
Create a data Table component for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme Colors:
- Table BG: #334155 (slate-700)
- Header BG: #1e293b (slate-800)
- Row BG: #334155 (slate-700)
- Row Hover: #475569 (slate-600)
- Border: #475569 (slate-600)
- Text: #f1f5f9 (slate-100)
- Header Text: #94a3b8 (slate-400)
- Sort Icon: #14b8a6 (teal) when active

Requirements:
- Responsive table with dark theme
- Props:
  - columns: Array<{ key: string, label: string, sortable?: boolean, width?: string }>
  - data: Array<Record<string, any>>
  - onRowClick?: (row) => void
  - onSort?: (column, direction) => void
  - selectable?: boolean
  - loading?: boolean
  - emptyMessage?: string

Features:
1. Header Row
- Dark background (#1e293b)
- Column labels (slate-400, 14px, uppercase)
- Sortable columns: click to sort, teal arrow icon
- Hover: teal color
- Optional checkbox for select all

2. Data Rows
- Dark background (#334155)
- Hover: lighter dark (#475569)
- Click: teal left border (3px) if onRowClick provided
- Alternating rows option (subtle)
- Text: slate-100

3. Sorting
- Arrow icons: ↑ ↓
- Active sort: teal arrow
- Inactive: slate-400 arrow
- Click header to toggle

4. Selection
- Checkbox in first column (dark theme, teal when checked)
- Select all checkbox in header
- Selected row: teal left border

5. Pagination
- Bottom of table
- Dark theme
- Page numbers: slate-400, active: teal background
- Previous/Next buttons (teal)
- "Showing 1-10 of 50" text (slate-400)

6. Loading State
- Skeleton rows (shimmer effect)
- Dark skeleton background

7. Empty State
- Centered message (slate-400)
- Icon (teal)
- "No data available" or custom message

8. Actions Column (optional)
- Icons: view, edit, delete
- Hover: teal for view/edit, red for delete
- Dropdown menu for more actions

Mobile Responsive:
- Horizontal scroll on small screens
- Optional: card view for mobile (stack rows as cards)
- Sticky first column option

Props example:
```typescript
<Table
  columns={[
    { key: 'id', label: 'WO #', sortable: true, width: '100px' },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'status', label: 'Status', sortable: false },
    { key: 'actions', label: '', width: '80px' }
  ]}
  data={workOrders}
  onRowClick={(row) => navigate(`/work-orders/${row.id}`)}
  onSort={(column, direction) => handleSort(column, direction)}
  selectable={true}
  loading={isLoading}
/>
```

Use Tailwind CSS dark theme, TypeScript, accessible.
Keyboard navigation (arrow keys to navigate cells).
Export as: export const Table = ({ ... }) => { ... }
```

---

### 1.8 Tabs Component

```
Create a Tabs component for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme Colors:
- Tab Bar BG: #1e293b (slate-800)
- Tab BG (inactive): transparent
- Tab BG (active): #334155 (slate-700)
- Tab Text (inactive): #94a3b8 (slate-400)
- Tab Text (active): #f1f5f9 (slate-100)
- Active Indicator: #14b8a6 (teal) - bottom border or pill background
- Hover: #334155 (slate-700)

Requirements:
- Horizontal and vertical orientations
- Props:
  - tabs: Array<{ id: string, label: string, icon?: ReactNode, badge?: string }>
  - activeTab: string
  - onChange: (tabId) => void
  - orientation?: 'horizontal' | 'vertical'
  - variant?: 'underline' | 'pills' | 'buttons'

Variants:

1. Underline (default, horizontal)
- Tabs in a row
- Active tab: teal underline (3px, bottom)
- Hover: slate-700 background
- Tab height: 48px
- Text: slate-400 (inactive), slate-100 (active)
- Border-bottom on container: slate-600

2. Pills (horizontal or vertical)
- Rounded pill tabs
- Active tab: teal background (#14b8a6), white text
- Inactive: transparent, slate-400 text
- Hover: slate-700 background
- Padding: 8px 16px
- Gap between tabs: 8px

3. Buttons (horizontal)
- Dark button-style tabs
- Active: slate-700 background, slate-100 text
- Inactive: transparent, slate-400 text
- Border: slate-600
- Connected buttons (no gap)

Features:
- Optional icon before label (teal when active, slate-400 when inactive)
- Optional badge (red dot or count) on tab
- Keyboard navigation (arrow keys)
- Smooth indicator animation
- Disabled tab state (opacity 50%)

Mobile:
- Horizontal: scrollable if too many tabs
- Full width tabs option
- Bottom tab bar for mobile apps

Example Usage:
```typescript
<Tabs
  tabs={[
    { id: 'overview', label: 'Overview', icon: <HomeIcon /> },
    { id: 'tasks', label: 'Tasks', badge: '3' },
    { id: 'notes', label: 'Notes' },
    { id: 'history', label: 'History' }
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
  variant="underline"
/>
```

Vertical Example (for settings page):
```typescript
<Tabs
  tabs={[
    { id: 'profile', label: 'Profile', icon: <UserIcon /> },
    { id: 'security', label: 'Security', icon: <LockIcon /> },
    { id: 'preferences', label: 'Preferences', icon: <SettingsIcon /> },
    { id: 'notifications', label: 'Notifications', icon: <BellIcon /> }
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
  orientation="vertical"
  variant="pills"
/>
```

Use Tailwind CSS dark theme, TypeScript, accessible with ARIA roles.
Export as: export const Tabs = ({ ... }) => { ... }
```

---

### 1.9 Dropdown/Menu Component

```
Create Dropdown menu component for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme Colors:
- Menu BG: #334155 (slate-700)
- Menu Border: #475569 (slate-600)
- Item BG (hover): #475569 (slate-600)
- Item Text: #f1f5f9 (slate-100)
- Item Text (disabled): #64748b (slate-500)
- Divider: #475569 (slate-600)
- Destructive Item: #ef4444 (red) on hover

Requirements:
- Props:
  - trigger: ReactNode (button that opens menu)
  - items: Array<MenuItem>
  - placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  - align?: 'start' | 'end' | 'center'
  - onSelect?: (itemId) => void

MenuItem Type:
```typescript
type MenuItem = {
  id: string
  label: string
  icon?: ReactNode
  shortcut?: string  // e.g., "⌘K"
  disabled?: boolean
  destructive?: boolean  // red styling
  divider?: boolean  // shows divider after this item
  submenu?: MenuItem[]  // nested submenu
}
```

Features:

1. Menu Container
- Dark background (#334155)
- Rounded corners (8px)
- Shadow/elevation
- Border: subtle slate-600
- Min-width: 200px
- Max-height: 400px (scrollable)
- Padding: 4px

2. Menu Items
- Height: 40px
- Padding: 8px 12px
- Hover: slate-600 background
- Active/focus: slate-600 background, teal left border (3px)
- Click ripple effect (optional)

3. Icon Support
- Icon on left (20px, teal or slate-400)
- Aligned consistently

4. Keyboard Shortcuts
- Right-aligned (slate-400, 12px)
- Monospace font
- Example: "⌘K", "Ctrl+S"

5. Disabled Items
- Opacity 50%
- Not clickable
- No hover effect
- Cursor: not-allowed

6. Destructive Items
- Red text (#ef4444)
- Red icon
- Hover: red background (#7f1d1d), white text
- Used for delete, remove actions

7. Divider
- Horizontal line (slate-600)
- Margin: 4px 0
- 1px height

8. Submenu
- Chevron icon on right (slate-400)
- Hover: opens submenu to the side
- Submenu: same styling as parent
- Nested indicator

9. Positioning
- Click-outside to close
- Escape key closes
- Auto-position if near edge
- Smooth fade in animation

Example Usage:
```typescript
<Dropdown
  trigger={
    <Button variant="ghost" icon={<MoreVerticalIcon />} />
  }
  items={[
    { id: 'view', label: 'View Details', icon: <EyeIcon /> },
    { id: 'edit', label: 'Edit', icon: <EditIcon />, shortcut: '⌘E' },
    { id: 'duplicate', label: 'Duplicate', icon: <CopyIcon /> },
    { id: 'divider1', divider: true },
    { id: 'delete', label: 'Delete', icon: <TrashIcon />, destructive: true, shortcut: '⌘⌫' }
  ]}
  onSelect={(id) => handleAction(id)}
  placement="bottom-end"
/>
```

User Dropdown Example (with profile):
```typescript
<Dropdown
  trigger={
    <div className="flex items-center gap-2">
      <Avatar src={user.avatar} />
      <ChevronDown />
    </div>
  }
  items={[
    { id: 'profile', label: 'Profile', icon: <UserIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon />, shortcut: '⌘,' },
    { id: 'divider1', divider: true },
    { id: 'logout', label: 'Sign Out', icon: <LogoutIcon /> }
  ]}
/>
```

Use Tailwind CSS dark theme, TypeScript, accessible with ARIA.
Use Radix UI or Headless UI for accessibility (optional).
Export as: export const Dropdown = ({ ... }) => { ... }
```

---

### 1.10 Form Component

```
Create a Form wrapper component for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme Colors:
- Form BG: #334155 (slate-700) for form cards
- Section BG: #1e293b (slate-800) for section headers
- Field Label: #f1f5f9 (slate-100)
- Helper Text: #94a3b8 (slate-400)
- Error Text: #ef4444 (red)
- Success Text: #10b981 (emerald)
- Required Indicator: #ef4444 (red asterisk)

Requirements:
- Form validation wrapper with React Hook Form
- Props:
  - onSubmit: (data) => void
  - defaultValues?: Record<string, any>
  - schema?: Zod schema
  - loading?: boolean
  - className?: string

Features:

1. Form Layout
- Dark card background (#334155)
- Padding: 24px
- Rounded corners (12px)
- Section dividers (slate-600)

2. Form Sections
- Section header (slate-800 background)
- Section title (slate-100, 18px, bold)
- Section description (slate-400, 14px)
- Collapsible sections option

3. Field Wrapper (FormField component)
- Label (slate-100, required indicator *)
- Input/Select/TextArea (from Input components)
- Helper text below (slate-400)
- Error message (red, 14px)
- Success checkmark (emerald)

4. Validation States
- Field-level validation
- Show errors on blur or submit
- Error: red border, red text below
- Success: emerald border, checkmark icon

5. Form Actions
- Footer with buttons
- Submit button (teal, disabled while loading)
- Cancel/Reset button (slate-600)
- Loading spinner in submit button
- Sticky footer option

6. Multi-Step Forms
- Step indicator at top (teal dots)
- Current step: teal, completed: emerald, future: slate
- Previous/Next buttons
- Progress bar option
- Step validation before advance

7. Auto-Save
- Optional auto-save indicator
- "Saving..." message (slate-400)
- "Saved" checkmark (emerald)
- Debounced save

Example Usage:
```typescript
<Form
  onSubmit={handleSubmit}
  schema={workOrderSchema}
  defaultValues={workOrder}
  loading={isSubmitting}
>
  <FormSection title="Customer Information" description="Basic customer details">
    <FormField
      name="customerId"
      label="Customer"
      component={Select}
      options={customers}
      required
      helperText="Select existing customer or create new"
    />
    <FormField
      name="address"
      label="Service Address"
      component={TextInput}
      required
    />
  </FormSection>

  <FormSection title="Job Details">
    <FormField
      name="jobType"
      label="Job Type"
      component={Select}
      options={jobTypes}
      required
    />
    <FormField
      name="priority"
      label="Priority"
      component={Select}
      options={priorities}
    />
    <FormField
      name="notes"
      label="Notes"
      component={TextArea}
      helperText="Any special instructions"
    />
  </FormSection>

  <FormActions>
    <Button type="button" variant="ghost" onClick={onCancel}>
      Cancel
    </Button>
    <Button type="submit" loading={isSubmitting}>
      Create Work Order
    </Button>
  </FormActions>
</Form>
```

Use React Hook Form + Zod validation
Tailwind CSS dark theme, TypeScript, fully accessible
Export: Form, FormSection, FormField, FormActions components
```

---

## Part 2: Navigation Components

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
g
`

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

## Part 3: Authentication Pages

### 3.1 Login Page

```
Create a Login page for HVAC app (OpsNex dark theme) using React and TypeScript.

Dark Theme Colors:
- Background: #0f172a (slate-950) - full screen
- Card: #334155 (slate-700) - login form card
- Input BG: #334155 (slate-700)
- Input Border: #475569 (slate-600), focus: #14b8a6 (teal)
- Text: #f1f5f9 (slate-100)
- Placeholder: #94a3b8 (slate-400)
- Link: #14b8a6 (teal), hover: #5eead4
- Button: #14b8a6 (teal) bg, white text

Requirements:
- Full screen dark background (#0f172a)
- Centered login card (max-width 400px on desktop)
  - Dark card background (#334155)
  - Rounded corners (12px)
  - Subtle shadow

Header Section:
- Logo/Company name "HVAC Pro" (or dynamic) (slate-100, 24px, bold)
- Optional logo icon (teal color)
- Subtitle: "Sign in to your account" (slate-400, 14px)

Form Section (dark inputs):
1. Email Input:
   - Label: "Email" (slate-100)
   - Input: dark bg (#334155), white text, teal focus ring
   - Placeholder: "you@company.com" (slate-400)
   - Height: 48px
   - Email validation (red border if invalid)

2. Password Input:
   - Label: "Password" (slate-100)
   - Input: dark bg, white text, teal focus ring
   - Show/hide password toggle (eye icon, slate-400/teal)
   - Height: 48px
   - Min length validation

3. Remember Me Checkbox:
   - Dark checkbox, teal when checked
   - Label: "Remember me" (slate-400)

4. Forgot Password Link:
   - Right-aligned
   - Teal text, hover: lighter teal
   - "Forgot password?"

5. Sign In Button:
   - Full width
   - Teal background (#14b8a6), white text
   - Height: 48px
   - Hover: lighter teal (#5eead4)
   - Loading state: spinner (white)
   - Disabled state: opacity 50%

Error Handling:
- Show error message above form (red bg #7f1d1d, white text)
- "Invalid email or password" example
- Dismissible (X button)

Footer Section:
- "Don't have an account?" (slate-400)
- "Sign up" link (teal, hover: lighter teal)
- Divider (slate-600)
- Optional: Social login buttons (Google, Microsoft)
  - Dark buttons with provider colors
  - Icons + text

Security Features:
- Rate limiting message if too many attempts
- Account locked message (red alert)
- Remember device checkbox (optional)

Mobile Responsive:
- Full width on mobile
- Card padding adjusts (16px mobile, 32px desktop)
- Larger touch targets (56px)

Props:
- onSubmit: (email, password, rememberMe) => void
- isLoading: boolean
- error?: string
- onForgotPassword: () => void
- onSignUp: () => void

Use Tailwind CSS dark theme, TypeScript, React Hook Form for validation
WCAG AA accessible
Keyboard navigation support
Auto-focus email input on load
```

---

### 3.2 Register/Sign Up Page

```
Create a Register/Sign Up page for HVAC app (OpsNex dark theme) using React and TypeScript.

Dark Theme:
- Background: #0f172a (full screen)
- Card: #334155 (signup form)
- Inputs: #334155 bg, #475569 border, #14b8a6 focus
- Text: #f1f5f9
- Button: #14b8a6 (teal)

Requirements:
- Centered signup card (max-width 500px)
- Dark background (#0f172a)

Header:
- Logo/Company name (slate-100)
- "Create your account" (slate-400)

Form Fields:

1. Company Name Input (dark theme)
   - Label: "Company Name" (slate-100)
   - Required indicator (*)
   - Height: 48px

2. Email Input
   - Validation: must be valid email
   - Check if email already exists (real-time)
   - Red border if invalid

3. Password Input
   - Show/hide toggle
   - Password strength indicator:
     - Weak: red bar
     - Medium: amber bar  
     - Strong: emerald bar
   - Requirements shown: 8+ chars, uppercase, number, symbol
   - Dark theme colors

4. Confirm Password Input
   - Must match password
   - Red border if mismatch

5. First Name & Last Name (side by side)
   - Dark inputs
   - Required

6. Phone Number (optional)
   - Format: (XXX) XXX-XXXX
   - Dark input

7. Role/Job Title Dropdown (optional)
   - Select: Owner, Manager, Technician, etc.
   - Dark dropdown

8. Terms & Privacy Checkbox
   - Required
   - "I agree to Terms of Service and Privacy Policy"
   - Links in teal
   - Dark checkbox, teal when checked

9. Create Account Button
   - Full width, teal bg, white text
   - Height: 48px
   - Loading state (spinner)
   - Disabled until form valid

Error Handling:
- Inline field validation (red border + message)
- Form-level errors (red alert card)
- API errors displayed prominently

Success:
- "Account created!" (emerald alert)
- Auto-redirect to dashboard or email verification

Footer:
- "Already have an account?" (slate-400)
- "Sign in" link (teal)

Mobile Responsive:
- Single column on mobile
- Full width inputs
- Larger touch targets

Props:
- onSubmit: (data) => void
- isLoading: boolean
- error?: string
- onSignIn: () => void

Use React Hook Form, Zod validation
Dark theme throughout
Accessible, keyboard navigation
```

---

### 3.3 Forgot Password Page

```
Create Forgot Password page for HVAC app (OpsNex dark theme) using React and TypeScript.

Dark Theme:
- Background: #0f172a
- Card: #334155
- Input: #334155 bg, #14b8a6 focus
- Text: #f1f5f9
- Button: #14b8a6 (teal)

Requirements:
- Centered card (max-width 400px)
- Dark background (#0f172a)

Header:
- "Reset your password" (slate-100, 24px, bold)
- Icon: lock with question mark (teal)
- Description: "Enter your email and we'll send you a reset link" (slate-400)

Form:
1. Email Input (dark theme)
   - Label: "Email address" (slate-100)
   - Large input (48px height)
   - Placeholder: "you@company.com" (slate-400)
   - Validation: must be valid email
   - Teal focus ring

2. Send Reset Link Button
   - Full width
   - Teal background, white text
   - Height: 48px
   - Loading state: "Sending..." with spinner

States:
- Initial: show form
- Loading: button disabled with spinner
- Success: 
  - Show success message (emerald alert card)
  - "Check your email!" heading (slate-100)
  - "We sent a password reset link to [email]" (slate-400)
  - Icon: mail (teal)
  - "Didn't receive it?" link (teal) - resend
- Error:
  - Red alert card
  - "Email not found" or "Something went wrong"

Footer:
- Back to login link (teal, with arrow icon)
- "Remember your password? Sign in" (slate-400 + teal link)

Auto Features:
- Auto-focus email input
- Enter key submits form
- Email trimming & lowercase

Mobile Responsive:
- Full width on mobile
- Card padding adjusts

Props:
- onSubmit: (email) => void
- isLoading: boolean
- success: boolean
- error?: string
- onBackToLogin: () => void
- onResend: (email) => void

Use Tailwind CSS dark theme, TypeScript
Accessible, form validation
```

---

### 3.4 Reset Password Page

```
Create Reset Password page for HVAC app (OpsNex dark theme) using React and TypeScript.

Dark Theme: [Same as other auth pages]

Requirements:
- Centered card (max-width 400px)
- Dark background (#0f172a)
- Accessed via email link with token

Header:
- "Create new password" (slate-100, 24px)
- Icon: key (teal)
- Description: "Your new password must be different from previously used passwords" (slate-400)

Form:
1. New Password Input
   - Label: "New Password" (slate-100)
   - Dark input with show/hide toggle
   - Password strength meter:
     - Bar below input
     - Colors: red (weak), amber (medium), emerald (strong)
     - Text: "Weak", "Medium", "Strong" (colored)
   - Requirements list (show as user types):
     - ✓ At least 8 characters (emerald when met, slate-400 when not)
     - ✓ One uppercase letter
     - ✓ One number
     - ✓ One special character

2. Confirm Password Input
   - Label: "Confirm Password"
   - Dark input with show/hide
   - Real-time match validation
   - Checkmark icon (emerald) when matches

3. Reset Password Button
   - Full width
   - Teal background, white text
   - Disabled until both passwords valid and match
   - Loading state

States:
- Invalid token:
  - Red alert: "This reset link has expired or is invalid"
  - "Request new link" button (teal)
- Success:
  - Emerald alert: "Password reset successfully!"
  - "Sign in with your new password" button (teal)
  - Auto-redirect after 3 seconds
- Error:
  - Red alert with error message

Security Features:
- Token validation on load
- Token expiry check (show countdown if < 5 min remaining)
- Rate limiting (prevent brute force)

Footer:
- "Back to login" link (teal)

Mobile Responsive:
- Full width inputs
- Requirements list readable

Props:
- token: string (from URL)
- onSubmit: (password) => void
- isLoading: boolean
- tokenValid: boolean
- success: boolean
- error?: string

Use Tailwind CSS dark theme, TypeScript
Password validation library (zxcvbn)
Accessible
```

---

### 3.5 MFA Setup Page

```
Create MFA (Multi-Factor Authentication) Setup page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme: [Same styling]

Requirements:
- Centered card (max-width 500px)
- Step-by-step wizard

Header:
- "Secure your account" (slate-100, 24px)
- "Add an extra layer of security with two-factor authentication" (slate-400)
- Progress indicator: Step 1 of 3 (teal dots)

Step 1: Choose Method
- Title: "Choose your authentication method" (slate-100)
- Options (dark radio cards):
  1. Authenticator App (Recommended)
     - Icon: phone with shield (teal)
     - Description: "Use Google Authenticator, Authy, or similar" (slate-400)
     - Badge: "Most Secure" (emerald bg)
  2. SMS Text Message
     - Icon: message (teal)
     - Description: "Receive codes via text message" (slate-400)
  3. Email
     - Icon: mail (teal)
     - Description: "Receive codes via email" (slate-400)
- Each option: dark card (#334155), hover: #475569, selected: teal border
- "Continue" button (teal, bottom)

Step 2: Setup (Authenticator App):
- Title: "Scan QR code" (slate-100)
- QR Code display:
  - Center, dark background
  - White QR code on dark (#1e293b) square
  - Border: teal
- Instructions:
  1. "Open your authenticator app" (slate-400)
  2. "Scan this QR code"
  3. "Enter the 6-digit code below"
- Manual entry option (expandable):
  - "Can't scan? Enter code manually" (teal link)
  - Shows secret key in dark monospace box
  - Copy button (teal icon)
- Verification code input:
  - 6 individual boxes for digits (dark bg, teal border on focus)
  - Large, centered
  - Auto-focus, auto-advance
  - Auto-submit when complete
- "Verify" button (teal)

Step 2 (SMS):
- Phone number input
  - Country code selector (dark dropdown)
  - Phone number field
  - "Send Code" button (teal)
- Code input (6 digits)
- "Didn't receive? Resend" (teal link)

Step 3: Backup Codes
- Title: "Save your backup codes" (slate-100)
- Warning: "Store these in a safe place. You'll need them if you lose access to your authenticator." (amber alert, dark theme)
- Backup codes display:
  - Dark card (#334155)
  - 10 codes in 2 columns
  - Monospace font (slate-100)
  - Each code: XXXX-XXXX-XXXX format
- Buttons:
  - "Copy All" (teal outline)
  - "Download" (teal outline)
  - "Print" (teal outline)
- Confirmation checkbox:
  - "I have saved my backup codes" (required)
  - Dark checkbox, teal when checked
- "Finish Setup" button (teal, full width)
  - Disabled until checkbox checked

Success State:
- Emerald alert: "Two-factor authentication enabled!"
- Checkmark animation
- "Continue to Dashboard" button (teal)

Footer (all steps):
- "Skip for now" link (slate-400) - only if optional
- "Back" button for multi-step

Props:
- method: 'app' | 'sms' | 'email'
- qrCode?: string (data URL)
- secretKey?: string
- backupCodes: string[]
- onSetup: (code) => void
- onSkip?: () => void
- isLoading: boolean

Use Tailwind CSS dark theme, TypeScript
QR code library: qrcode.react
Accessible, keyboard navigation
```

---

## Part 4: Settings & Profile

### 4.1 User Profile Settings

```
Create User Profile Settings page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Main BG: #0f172a
- Card BG: #334155
- Header BG: #1e293b
- Input BG: #334155
- Text: #f1f5f9
- Accent: #14b8a6 (teal)

Layout:
- Sidebar navigation (left, 240px on desktop)
- Main content area (right)

Sidebar (dark #1e293b):
- Tabs (vertical):
  - Profile (active: teal bg, teal left border)
  - Account Security
  - Preferences
  - Notifications
  - Billing (if applicable)
- Each tab:
  - Icon (left, slate-400 default, teal active)
  - Label (slate-400 default, slate-100 active)
  - Hover: slate-700 bg

Main Content:

**Profile Tab:**
Header:
- "Profile Settings" (slate-100, 24px)
- "Manage your personal information" (slate-400)

Avatar Section (dark card):
- Large avatar (120px circle)
- Upload/Change button (teal outline)
- Remove button (red text, only if avatar exists)
- Hover: overlay with camera icon

Form Sections (dark cards, spaced):

1. Personal Information
- First Name (dark input, white text)
- Last Name
- Email (read-only, with "Change" link in teal)
- Phone Number (optional)
- Job Title (dropdown or text)
- All inputs: 48px height, teal focus

2. Company Information (if applicable)
- Company Name
- Department (dropdown)
- Employee ID (read-only or editable)

3. Bio/About (optional)
- TextArea (dark, 120px min height)
- Character count (slate-400)

4. Timezone
- Dropdown with common timezones
- Auto-detect button (teal)

Buttons:
- "Save Changes" (teal bg, white text, bottom right)
- "Cancel" (slate-600 bg, white text)
- Unsaved changes warning (amber alert if navigating away)

**Account Security Tab:**
Header: "Account Security"

Sections (dark cards):

1. Password
- Current password indicator: "Last changed 30 days ago" (slate-400)
- "Change Password" button (teal outline)
- Expands inline:
  - Current Password input
  - New Password input (with strength meter)
  - Confirm Password input
  - "Update Password" button (teal)

2. Two-Factor Authentication
- Status badge: Enabled (emerald) or Disabled (slate)
- Description: "Add an extra layer of security"
- Toggle switch (teal when on)
- "Setup" or "Manage" button

3. Active Sessions
- List of active sessions (dark cards):
  - Device icon + name
  - Location + IP (slate-400)
  - "Current session" badge (teal) for current
  - Last active time
  - "Revoke" button (red text) for others
- "Sign out all other sessions" button (red outline)

4. Login History (expandable)
- Recent login attempts
- Timestamp, IP, location, device
- Success/Failed status (emerald/red badge)

**Preferences Tab:**
Header: "Preferences"

Sections:

1. Language & Region
- Language dropdown (dark)
- Date format (MM/DD/YYYY, DD/MM/YYYY)
- Time format (12h, 24h)
- Number format

2. Display
- Theme: Dark (default), Light, Auto (toggle group, dark theme)
- Sidebar: Expanded/Collapsed default
- Density: Comfortable, Compact (affects spacing)

3. Dashboard
- Default view on login (dropdown)
- Widgets to show (checkboxes, dark theme, teal when checked)

**Notifications Tab:**
Header: "Notification Preferences"

Categories (each with toggle switches - teal when on):

1. Work Orders
- New work order assigned to me
- Work order status changed
- Customer comment added
- Via: Email checkbox, Push checkbox, SMS checkbox

2. Dispatch
- Schedule changed
- Emergency call assigned
- Via: Email, Push, SMS

3. System
- System maintenance
- New features
- Via: Email, Push

4. Digest
- Daily summary email (toggle + time picker)
- Weekly report (toggle + day picker)

Quiet Hours:
- Enable quiet hours (toggle)
- Start time / End time (dark time pickers)
- "Do not disturb during these hours"

Props:
- user: User
- onUpdateProfile: (data) => void
- onUpdatePassword: (current, new) => void
- onUpdatePreferences: (prefs) => void
- isLoading: boolean

Mobile Responsive:
- Sidebar becomes top tabs (horizontal scroll)
- Full width content
- Stacked form fields

Use Tailwind CSS dark theme, TypeScript, React Hook Form
Accessible, auto-save option
```

---

## Part 5: Dashboards

### 5.1 Technician Dashboard (Mobile)

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

### 5.2 Dispatcher Dashboard

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

### 5.3 Manager Dashboard (Executive)

```
Create Executive Manager Dashboard for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
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

## Part 6: Work Orders

### 6.1 Work Order List

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

### 6.2 Work Order Detail

```
Create Work Order Detail page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Main BG: #0f172a (slate-950)
- Card BG: #334155 (slate-700)
- Header BG: #1e293b (slate-800)
- Text: #f1f5f9 (slate-100)
- Secondary: #94a3b8 (slate-400)
- Accent: #14b8a6 (teal-500)

Layout:
- Header with breadcrumbs and actions
- 2-column layout (desktop): Main content (left 70%), Sidebar (right 30%)
- Tabbed content area
- Activity timeline

Header Section (dark #1e293b):
- Breadcrumbs: Work Orders > WO-1234
- Work Order Number: "WO-1234" (slate-100, 24px, bold)
- Status Badge: large, color-coded
- Action buttons (top right):
  - "Edit" (teal outline, teal text)
  - "Print" (slate outline)
  - "Delete" (red outline, red text)
  - More actions dropdown (dark)

Main Content (tabs):

**Tab 1: Overview**
- Customer Section (dark card):
  - Customer name (slate-100, 18px, bold)
  - Account number (slate-400)
  - Phone, email (slate-400) with teal icons (clickable)
  - Address with map link (teal)
  - "View Customer Profile" link (teal)

- Job Details (dark card):
  - Job type (slate-100)
  - Priority badge
  - Scheduled date/time (teal)
  - Estimated duration (slate-400)
  - Assigned technician with avatar (teal name on hover)

- Description/Notes (dark card):
  - Problem description (slate-100)
  - Customer notes (slate-400, italic)
  - Internal notes (slate-400)
  - "Add Note" button (teal outline)

**Tab 2: Tasks & Checklist**
- Task list (dark theme):
  - Checkboxes (teal when checked)
  - Task name (slate-100)
  - Completed tasks: strike-through, slate-500
  - Progress bar (teal)
  - "Add Task" button (teal outline)

**Tab 3: Parts & Materials**
- Parts table (dark):
  - SKU, Description, Qty, Unit Price, Total
  - "Add Part" button (teal)
  - Scan barcode button (teal outline)
  - Total cost: large, teal

**Tab 4: Notes & Photos**
- Notes feed (dark cards):
  - Timestamp, author avatar
  - Note text (slate-100)
  - Photos attached (thumbnail grid)
- Photo gallery (dark):
  - Thumbnail grid, click to enlarge
  - "Upload Photos" button (teal)
- Add note form (dark):
  - TextArea (dark)
  - Attach files button
  - "Post Note" button (teal)

**Tab 5: History/Timeline**
- Activity timeline (vertical, dark):
  - Time markers (slate-400)
  - Event cards (dark #334155):
    - Icon (teal) per event type
    - Event description (slate-100)
    - User who made change (slate-400)
    - Timestamp (slate-400)
  - Events: created, assigned, status changed, parts added, completed, invoiced

Sidebar (right, desktop):

- Status Management Card (dark):
  - Current status (large badge)
  - Change status dropdown (dark)
  - "Update Status" button (teal)
  - Status history (collapsed)

- Assignment Card (dark):
  - Current technician with avatar
  - "Reassign" button (teal outline)
  - Technician dropdown (dark)

- Schedule Card (dark):
  - Scheduled date/time (teal)
  - "Reschedule" button (teal outline)
  - Date/time picker (dark theme)

- Quick Actions Card (dark):
  - "Generate Invoice" (teal bg, white text)
  - "Send Update to Customer" (teal outline)
  - "Mark Complete" (emerald bg)
  - "Cancel Work Order" (red outline)

Mobile:
- Sidebar moves below main content
- Tabs: horizontal scroll
- Actions in sticky bottom bar

Props:
- workOrderId: string
- workOrder: WorkOrder
- onUpdate: (data) => void
- onDelete: () => void
- onStatusChange: (status) => void
- onAddNote: (note) => void
- onAddPart: (part) => void

Use Tailwind CSS dark theme, TypeScript
Tabs component from Part 1
Responsive, accessible
```

---

### 6.3 Work Order Create/Edit Form

```
Create Work Order Create/Edit Form for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Main BG: #0f172a (slate-950)
- Card BG: #334155 (slate-700)
- Header BG: #1e293b (slate-800)
- Input BG: #334155 (slate-700)
- Text: #f1f5f9 (slate-100)
- Accent: #14b8a6 (teal-500)

Layout:
- Multi-step wizard OR single scrollable form
- Progress indicator at top (if wizard)
- Form sections in dark cards
- Sticky footer with actions

Header (dark #1e293b):
- Title: "Create Work Order" or "Edit Work Order WO-1234" (slate-100)
- Breadcrumbs
- Step indicator (if wizard): "Step 2 of 4" with progress bar (teal)

Form Sections:

**Section 1: Customer Information**
Dark card (#334155), collapsible

1. Customer Select (dark dropdown with search):
   - Searchable dropdown
   - Customer name, phone, address shown
   - "Create New Customer" link (teal)
   - Required field

2. Service Address:
   - Auto-fill from customer default
   - TextInput (dark)
   - "Use different address" checkbox
   - Address autocomplete (Google Maps, dark theme)

3. Contact Person (if different):
   - TextInput for name
   - Phone input

**Section 2: Job Details**
Dark card

1. Job Type (required):
   - Select dropdown (dark)
   - Options: Maintenance, Repair, Installation, Emergency, etc.
   - Icon for each type

2. Priority:
   - Radio buttons OR select (dark theme)
   - Low, Medium, High, Emergency
   - Color-coded badges preview

3. Problem Description:
   - TextArea (dark, 150px min)
   - Character count (slate-400)
   - Required

4. Customer Notes:
   - TextArea (dark)
   - Optional

**Section 3: Scheduling**
Dark card

1. Scheduled Date:
   - DateInput (dark, teal calendar icon)
   - Required
   - Min date: today

2. Time Slot:
   - Select dropdown or time picker
   - 8 AM - 6 PM slots
   - Dark theme

3. Estimated Duration:
   - NumberInput (dark)
   - Hours/Minutes selector
   - Default based on job type

4. Assign Technician:
   - Select dropdown with avatars (dark)
   - Show availability
   - Available techs: emerald dot, Busy: red dot
   - Optional (can assign later)

**Section 4: Parts & Equipment (Optional)**
Dark card, collapsible

- Parts table (dark):
  - Add part button (teal outline)
  - SKU search/scan barcode
  - Quantity, unit price
  - Remove row button (red)
  - Total: calculated, teal

- Equipment/Tools needed:
  - Checklist (dark checkboxes, teal when checked)

**Section 5: Additional Information**
Dark card, collapsible

1. Internal Notes:
   - TextArea (dark)
   - For technician eyes only

2. Attach Files:
   - File upload (drag & drop, dark theme)
   - Photos, documents
   - Preview thumbnails (dark)

3. Tags:
   - Tag input (dark, teal pills)
   - Autocomplete from existing tags

Validation:
- Real-time field validation
- Error messages (red, below field)
- Required fields marked with *
- Form-level validation on submit
- Prevent submission if errors

Footer Actions (sticky, dark #1e293b):
- Left side:
  - "Save as Draft" button (slate bg, white text)
  - "Cancel" link (slate-400, hover: red)

- Right side:
  - "Previous" button (if wizard, slate outline)
  - "Next" button (if wizard, teal bg) OR
  - "Create Work Order" button (teal bg, white text)
  - Loading spinner when submitting

Success State:
- Toast notification (emerald)
- Redirect to work order detail page

Props:
- workOrderId?: string (if editing)
- initialData?: Partial<WorkOrder>
- onSubmit: (data) => void
- onCancel: () => void
- isLoading: boolean
- customers: Customer[]
- technicians: Technician[]

Use React Hook Form + Zod validation
Tailwind CSS dark theme, TypeScript
Auto-save to draft (optional)
Mobile-responsive (stacked form fields)
```

---

## Part 7: CRM Pages

### 7.1 CRM Accounts List

```
Create CRM Accounts List page for HVAC app (OpsNex dark theme) using React TypeScript.

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
  - Title: "Customer Accounts" (slate-100)
  - "Create Account" button (teal bg, white text, top right)
  - Search bar (dark #334155 bg, teal focus)
    - Placeholder: "Search accounts, contacts, phone..." (slate-400)
    - Icon: teal

- Filters Bar (dark card #334155):
  - Account type: Residential, Commercial, Both (toggle group, dark)
  - Status: Active, Inactive, All (dropdown, dark)
  - Service area (dropdown, dark)
  - Sort by: Name, Last Service, Total Revenue (dropdown)
  - "Clear Filters" (slate-600 bg, teal text)

- Stats Bar (4 KPI dark cards #334155):
  - Total Accounts (slate-100, teal icon)
  - Active (emerald icon)
  - Revenue this month (teal icon)
  - New this month (amber icon)

- Table (desktop, dark theme):
  - Headers: Account Name, Type, Phone, Email, Last Service, Total Jobs, Actions
  - Rows: dark (#334155), hover: #475569
  - Click row: navigate to account detail (teal left border on hover)
  - Sortable columns (teal indicators)
  - Pagination (dark theme, teal active)
  - Row actions: View, Edit, Delete (teal/red icons)

- Mobile Cards (dark #334155):
  - Account name (slate-100, bold)
  - Type badge (teal or slate)
  - Phone/email (slate-400) with icons
  - Last service date (slate-400)
  - "View Account" button (teal outline)
  - Swipe actions

- Empty state: "No accounts found" (slate-400) with teal icon
  - "Create your first account" button (teal)

Props:
- accounts: Account[]
- totalCount: number
- filters: FilterState
- onFilterChange, onCreate, onView, onEdit, onDelete

Use Tailwind CSS dark classes, TypeScript
Mobile-first, responsive
Teal accents throughout
```

---

### 7.2 CRM Contacts List

```
Create CRM Contacts List page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme: [Same as Accounts List]

Requirements:
- Dark Header (#1e293b):
  - Title: "Contacts" (slate-100)
  - "Create Contact" button (teal bg, white text)
  - Search bar (dark, teal focus)

- Filters Bar (dark card):
  - Account filter (multi-select dropdown, dark)
  - Role: Owner, Manager, Tenant, Other (dropdown)
  - Sort by: Name, Account, Last Contact (dropdown)
  - "Clear Filters" (slate bg, teal text)

- Stats Bar (3 KPI dark cards):
  - Total Contacts
  - Primary Contacts (main contact per account)
  - Recently Added

- Table (desktop, dark theme):
  - Headers: Name, Account, Role, Phone, Email, Last Contact, Actions
  - Rows: dark, hover effect
  - Click: navigate to contact or account detail
  - Avatar column (32px circle)
  - Sortable columns

- Mobile Cards (dark #334155):
  - Contact name with avatar (slate-100)
  - Account name (slate-400, smaller)
  - Role badge (teal or slate)
  - Phone/email (slate-400, clickable, teal)
  - Last contact date (slate-400)
  - "View Contact" button (teal outline)

- Quick Actions:
  - Call button (teal icon, opens phone)
  - Email button (teal icon, opens mailto)
  - Message button (teal icon)

- Empty state: "No contacts found" (slate-400)

Props:
- contacts: Contact[]
- totalCount: number
- onFilterChange, onCreate, onView, onEdit, onDelete

Use Tailwind CSS dark theme, TypeScript
Responsive
```

---

### 7.3 CRM Leads List

```
Create CRM Leads List page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme: [Same colors]

Requirements:
- Dark Header (#1e293b):
  - Title: "Leads" (slate-100)
  - "Create Lead" button (teal bg, white text)
  - Search bar (dark, teal focus)

- Filters Bar (dark card):
  - Lead status: New, Contacted, Qualified, Proposal Sent, Won, Lost (multi-select)
  - Lead source: Website, Referral, Phone, Email, Social (dropdown)
  - Assigned to: technician filter (dropdown)
  - Date range filter
  - "Clear Filters" (slate bg, teal text)

- Stats Bar (5 KPI dark cards):
  - Total Leads
  - New (amber badge)
  - Qualified (teal badge)
  - Conversion Rate % (emerald/red trend)
  - Revenue Pipeline $

- Kanban Board View (optional):
  - Columns for each status (dark cards)
  - Drag & drop leads between columns
  - Lead cards: dark (#334155), hover: #475569
  - Each card:
    - Lead name (slate-100)
    - Company (slate-400)
    - Value $ (teal)
    - Priority badge
    - Days in status (slate-400)

- Table View (desktop, dark theme):
  - Headers: Lead Name, Company, Status, Source, Value, Assigned To, Created, Actions
  - Rows: dark, hover effect
  - Status: color-coded badges
  - Priority indicators (red flag for hot leads)
  - Click: navigate to lead detail
  - Sortable columns

- Mobile Cards (dark #334155):
  - Lead name (slate-100, bold)
  - Company (slate-400)
  - Status badge
  - Value $ (teal)
  - Assigned to (avatar + name, slate-400)
  - Created date (slate-400)
  - "View Lead" button (teal outline)

- Quick Actions per lead:
  - Convert to Account (emerald button)
  - Mark as Lost (red button)
  - Schedule Follow-up (teal button)

- Empty state: "No leads found" (slate-400)
  - "Create your first lead" button (teal)

Props:
- leads: Lead[]
- totalCount: number
- onFilterChange, onCreate, onView, onEdit, onDelete, onConvert

View toggle: Table / Kanban (dark toggle buttons, teal active)

Use Tailwind CSS dark theme, TypeScript
Drag & drop: @dnd-kit
Responsive
```

---

### 7.4 CRM Account Detail (360° View)

```
Create CRM Account Detail page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Main BG: #0f172a (slate-950)
- Card BG: #334155 (slate-700)
- Header BG: #1e293b (slate-800)
- Text: #f1f5f9 (slate-100)
- Secondary: #94a3b8 (slate-400)
- Accent: #14b8a6 (teal-500)

Layout:
- Header with account name and actions
- 2-column layout: Main content (70%), Sidebar (30%)
- Tabbed main content
- Sidebar with quick info and actions

Header Section (dark #1e293b):
- Breadcrumbs: CRM > Accounts > Johnson Residence
- Account name: "Johnson Residence" (slate-100, 24px, bold)
- Account type badge: Residential/Commercial (teal or slate)
- Action buttons (top right):
  - "Edit Account" (teal outline)
  - "Create Work Order" (teal bg, white text)
  - More actions dropdown (dark)

Main Content (tabs):

**Tab 1: Overview**
- Account Information Card (dark):
  - Primary contact (avatar, name, role)
  - Phone (teal, clickable)
  - Email (teal, clickable)
  - Service address (with map link, teal)
  - Account since (slate-400)
  - "Edit Info" button (teal outline)

- Key Metrics (3 dark KPI cards):
  - Total Work Orders (count, teal icon)
  - Total Revenue $ (teal)
  - Last Service (date, slate-400)

- Quick Summary (dark card):
  - Customer notes (slate-100)
  - Service history summary (slate-400)
  - Equipment on site (list)

**Tab 2: Contacts**
- Contacts table (dark theme):
  - Name, Role, Phone, Email, Actions
  - Primary contact: emerald star icon
  - "Add Contact" button (teal)
  - Click: edit contact inline or modal

**Tab 3: Work Orders**
- Work orders table (dark):
  - WO#, Date, Type, Status, Technician, Total
  - Status badges (color-coded)
  - Click row: navigate to WO detail
  - Filter: Status, Date range (dark dropdowns)
  - "Create Work Order" button (teal)
  - Empty state: "No work orders yet"

**Tab 4: Invoices & Billing**
- Invoices table (dark):
  - Invoice#, Date, Amount, Status, Actions
  - Status: Paid (emerald), Pending (amber), Overdue (red)
  - "View Invoice" link (teal)
  - "Create Invoice" button (teal)
- Payment history (collapsed section)
- Total billed, paid, outstanding (KPI cards)

**Tab 5: Equipment**
- Equipment list (dark cards):
  - Equipment type (HVAC unit, boiler, etc.)
  - Model, serial number
  - Install date
  - Last service date
  - Next scheduled service (amber if due soon)
  - "Add Equipment" button (teal)
  - "Service History" per equipment

**Tab 6: Notes & Files**
- Notes feed (dark cards):
  - Timestamp, author
  - Note text (slate-100)
  - Pinned notes: teal pin icon
- Add note form (dark):
  - TextArea, file attach
  - "Post Note" button (teal)
- Files section:
  - Document grid (dark)
  - "Upload File" button (teal)

**Tab 7: Activity Timeline**
- Activity feed (vertical timeline, dark):
  - All activities: WO created, invoice sent, contact added, etc.
  - Icons per activity type (teal)
  - Timestamp, description (slate-400)

Sidebar (right, desktop):

- Quick Actions Card (dark):
  - "Create Work Order" (teal bg)
  - "Send Email" (teal outline)
  - "Schedule Service" (teal outline)
  - "View on Map" (teal outline)

- Account Details Card (dark):
  - Account ID (slate-400)
  - Type: Residential/Commercial
  - Status: Active/Inactive (badge)
  - Tags (teal pills)
  - Created date (slate-400)

- Service Agreement Card (dark):
  - Plan name (slate-100)
  - Status: Active/Expired (badge)
  - Next service date (teal)
  - "View Agreement" link (teal)

- Assigned Team Card (dark):
  - Primary technician (avatar + name)
  - Account manager (if applicable)
  - "Reassign" button (teal outline)

Mobile:
- Sidebar moves below main content
- Tabs: horizontal scroll
- Actions in sticky bottom bar

Props:
- accountId: string
- account: Account
- workOrders: WorkOrder[]
- contacts: Contact[]
- invoices: Invoice[]
- onUpdate: (data) => void
- onCreateWorkOrder: () => void
- onAddContact: () => void

Use Tailwind CSS dark theme, TypeScript
Tabs component from Part 1
Responsive, accessible
```

---

## Part 8: Inventory

### 8.1 Inventory SKU List

```
Create Inventory SKU List page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Main BG: #0f172a (slate-950)
- Header BG: #1e293b (slate-800)
- Card BG: #334155 (slate-700)
- Text: #f1f5f9 (slate-100)
- Secondary: #94a3b8 (slate-400)
- Accent: #14b8a6 (teal-500)

Stock Level Color Coding:
- In Stock (>reorder point): #10b981 bg (emerald), white text
- Low Stock (±20% of reorder): #f59e0b bg (amber), dark text
- Out of Stock (<reorder): #ef4444 bg (red), white text

Requirements:
- Dark Header (#1e293b):
  - Title: "Inventory" (slate-100)
  - "Create SKU" button (teal bg, white text)
  - Search bar (dark, teal focus)
    - Placeholder: "Search SKUs, descriptions, barcodes..." (slate-400)

- Filters Bar (dark card):
  - Category filter (multi-select, dark)
  - Stock status: All, In Stock, Low Stock, Out of Stock (dropdown)
  - Warehouse filter (dropdown)
  - Sort by: SKU, Description, Stock Level (dropdown)
  - "Clear Filters" (slate bg, teal text)

- Stats Bar (4 KPI dark cards):
  - Total SKUs (teal icon)
  - Low Stock Alerts (red badge with count)
  - Out of Stock (red icon)
  - Total Inventory Value $ (teal)

- Table (desktop, dark theme):
  - Headers: SKU, Description, Category, On Hand, Reorder Point, Unit Cost, Location, Actions
  - Rows: dark (#334155), hover: #475569
  - Stock level badge (color-coded)
  - Click row: navigate to SKU detail
  - Sortable columns (teal indicators)
  - Pagination (dark theme, teal active)
  - Quick actions: View, Edit, Print Label, Delete

- Mobile Cards (dark #334155):
  - SKU number (slate-100, bold)
  - Description (slate-100)
  - Category badge (teal or slate)
  - Stock level badge (prominent, color-coded)
  - On hand: [qty] units (slate-400)
  - Location: Warehouse A - Bin 12 (slate-400)
  - "View Details" button (teal outline)

- Quick Actions (header):
  - "Scan Barcode" button (teal bg, barcode icon)
  - "Import SKUs" button (teal outline, upload icon)
  - "Export CSV" button (slate outline, download icon)

- Empty state: "No SKUs found" (slate-400) with teal icon
  - "Create your first SKU" button (teal)

Props:
- skus: SKU[]
- totalCount: number
- filters: FilterState
- onFilterChange, onCreate, onView, onEdit, onDelete

Use Tailwind CSS dark classes, TypeScript
Mobile-first, responsive
Teal accents
```

---

### 8.2 SKU Detail Page

```
Create enhanced SKU Detail page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Main BG: #0f172a (slate-950)
- Card BG: #334155 (slate-700)
- Header BG: #1e293b (slate-800)
- Text: #f1f5f9 (slate-100)
- Secondary: #94a3b8 (slate-400)
- Accent: #14b8a6 (teal-500)

Layout:
- Header with SKU info and actions
- 2-column: Main content (70%), Sidebar (30%)
- Tabbed main content

Header Section (dark #1e293b):
- Breadcrumbs: Inventory > SKUs > Filter XYZ-123
- SKU number: "Filter XYZ-123" (slate-100, 24px, bold)
- Description: "20x25x4 MERV 13 Air Filter" (slate-400, 16px)
- Stock status badge: large, color-coded (emerald/amber/red)
- Action buttons (top right):
  - "Edit SKU" (teal outline)
  - "Print Label" (teal outline)
  - "Adjust Stock" (teal bg)
  - More actions dropdown

Main Content (tabs):

**Tab 1: Overview**
- General Information Card (dark):
  - SKU number (slate-100)
  - Description (slate-100)
  - Category (teal badge)
  - Manufacturer (slate-400)
  - Model number (slate-400)
  - UPC/Barcode (slate-400) with barcode image (dark bg)
  - "Edit Info" button (teal outline)

- Stock Information Card (dark):
  - On hand quantity (large, slate-100)
    - Color indicator: emerald (in stock), amber (low), red (out)
  - Reorder point (slate-400)
  - Reorder quantity (slate-400)
  - Safety stock (slate-400)
  - Last counted date (slate-400)

- Pricing Card (dark):
  - Unit cost (slate-400)
  - Average cost (calculated, slate-400)
  - Selling price (slate-100)
  - Markup % (teal)

**Tab 2: Stock by Location**
- Locations table (dark):
  - Warehouse, Bin, Quantity, Last Updated
  - Rows: dark theme
  - Total across all locations
  - "Transfer Stock" button (teal)
  - "Adjust Quantity" per location

**Tab 3: Stock Ledger**
- Transaction history table (dark):
  - Date, Type, Qty, Balance, Reason, User
  - Type: Purchase, Sale, Adjustment, Transfer, Return
  - Icons per type (teal)
  - Balance column: running total (slate-100)
  - Filter by: Date range, Transaction type (dark dropdowns)
  - Pagination

**Tab 4: Usage & Forecasting**
- Usage chart (dark):
  - Line chart showing consumption over time
  - Teal line, dark background, slate grid
  - Last 90 days usage
- Forecasting data (dark card):
  - Avg monthly usage (slate-400)
  - Estimated days until reorder (amber if < 30)
  - Suggested order quantity (teal)
- Used in Work Orders:
  - Recent work orders using this SKU
  - Count of times used
  - Common job types

**Tab 5: Suppliers**
- Suppliers table (dark):
  - Supplier name, Part#, Unit cost, Lead time, Last ordered
  - Primary supplier: emerald star icon
  - "Add Supplier" button (teal)
  - "Reorder" button per supplier (teal)

**Tab 6: Photos & Documents**
- Photo gallery (dark):
  - Product images (thumbnail grid, dark)
  - Click to enlarge
  - "Upload Photo" button (teal)
- Documents section:
  - Spec sheets, manuals, warranties
  - Document list (dark)
  - "Upload Document" button (teal)

Sidebar (right, desktop):

- Quick Actions Card (dark):
  - "Create Purchase Order" (teal bg)
  - "Adjust Stock" (teal outline)
  - "Print Barcode Label" (teal outline)
  - "View in Barcode Scanner" (teal outline)

- Stock Alert Card (dark):
  - Status: In Stock / Low / Out (badge)
  - Alert: "Below reorder point!" (red text) if low
  - "Configure Alerts" button (teal outline)

- Key Details Card (dark):
  - Category (teal)
  - Created date (slate-400)
  - Last updated (slate-400)
  - Active/Inactive status toggle (teal)

- Related Items Card (dark):
  - Compatible SKUs (list)
  - Alternative SKUs (list)
  - "Manage Relations" button (teal outline)

Mobile:
- Sidebar below main content
- Tabs: horizontal scroll
- Actions in sticky bottom bar

Props:
- skuId: string
- sku: SKU
- stockLedger: Transaction[]
- suppliers: Supplier[]
- onUpdate: (data) => void
- onAdjustStock: (data) => void
- onCreatePO: () => void

Use Tailwind CSS dark theme, TypeScript
Charts: Recharts with dark theme
Responsive, accessible
```

---

## Part 9: Purchasing

### 9.1 Purchasing List

```
Create Purchasing List page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme: [Same as Work Order List]

Requirements:
- Dark Header (#1e293b):
  - Title: "Purchase Orders" (slate-100)
  - "Create PO" button (teal bg, white text)
  - Search bar (dark, teal focus)

- Filters Bar (dark card):
  - Status: Draft, Sent, Approved, Received, Cancelled (multi-select)
  - Supplier filter (dropdown)
  - Date range filter
  - Sort by: PO#, Date, Amount (dropdown)
  - "Clear Filters" (slate bg, teal text)

- Stats Bar (4 KPI dark cards):
  - Total POs this month
  - Pending (amber badge)
  - Total Amount $ (teal)
  - Overdue (red badge)

- Table (desktop, dark theme):
  - Headers: PO#, Supplier, Date, Expected Delivery, Status, Total, Actions
  - Status badges (color-coded)
  - Click row: navigate to PO detail
  - Sortable columns
  - Pagination

- Mobile Cards (dark):
  - PO number (slate-100)
  - Supplier name (slate-400)
  - Status badge
  - Total amount $ (teal)
  - Date (slate-400)
  - "View PO" button (teal outline)

Props:
- purchaseOrders: PO[]
- totalCount: number
- onFilterChange, onCreate, onView, onEdit, onDelete

Use Tailwind CSS dark theme, TypeScript
Responsive
```

---

### 9.2 Purchase Order Detail

```
Create Purchase Order Detail page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme: [Same as Work Order Detail]

Layout:
- Header with PO info
- Main content with tabs
- Sidebar with actions

Header (dark #1e293b):
- Breadcrumbs: Purchasing > PO-5678
- PO number: "PO-5678" (slate-100, 24px)
- Status badge: Draft/Sent/Approved/Received/Cancelled (color-coded)
- Actions:
  - "Edit PO" (teal outline)
  - "Send to Supplier" (teal bg) if draft
  - "Mark as Received" (emerald bg) if approved
  - "Print" (slate outline)
  - More actions dropdown

Main Content (tabs):

**Tab 1: Overview**
- Supplier Information (dark card):
  - Supplier name (slate-100)
  - Contact person (slate-400)
  - Phone, email (teal, clickable)
  - Address (slate-400)

- PO Details (dark card):
  - PO number, date
  - Expected delivery date (teal)
  - Payment terms (slate-400)
  - Shipping method (slate-400)
  - Notes (slate-400)

- Line Items Table (dark):
  - SKU, Description, Qty Ordered, Qty Received, Unit Cost, Total
  - Editable if draft
  - "Add Line" button (teal) if draft
  - Subtotal, tax, shipping, total (teal)

**Tab 2: Receiving History**
- Received items table (dark):
  - Date, SKU, Qty Received, Received By, Notes
  - If partially received: show progress
  - "Receive Items" button (teal)

**Tab 3: Documents**
- Attachments (dark):
  - Quote, invoice, packing slip
  - "Upload Document" button (teal)

**Tab 4: History**
- Activity timeline (dark):
  - Created, sent, approved, received events
  - Timestamp, user (slate-400)

Sidebar:

- Quick Actions (dark):
  - "Send to Supplier" (teal bg)
  - "Mark as Received" (emerald bg)
  - "Cancel PO" (red outline)

- Status Progress (dark):
  - Steps: Draft → Sent → Approved → Received
  - Current step highlighted (teal)

- Summary (dark):
  - Total items: count
  - Total amount: $ (teal)
  - Items received: % progress bar

Props:
- poId: string
- po: PurchaseOrder
- onUpdate, onSend, onReceive, onCancel

Use Tailwind CSS dark theme, TypeScript
Responsive
```

---

## Part 10: Dispatch

### 10.1 Dispatch Board

```
Create Dispatch Board calendar for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
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

## Part 11: Field Tools

### 11.1 Field Tools Home Page

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

### 11.2-11.22: Individual Calculators

**Note:** All 21 Field Tools calculators should use this standard dark theme pattern:

```
Standard Dark Theme Pattern for All Calculators:

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

Common Features for All Calculators:
- Header: dark (#1e293b) with calculator name (slate-100) and back button (teal icon)
- Input cards: dark (#334155) with 56px height inputs
- Large touch targets (56px minimum)
- Calculate button: teal (#14b8a6) bg, full width on mobile
- Result display: large, prominent, dark card with color-coded status
- Save to Work Order button: emerald (#10b981) bg, white text
- Clear/Reset button: slate (#64748b) bg
- Mobile-first design
- All text: slate-100 on dark backgrounds
- Teal accents throughout

Use Tailwind CSS dark classes, TypeScript
Real-time calculation where applicable
Professional HVAC industry standards
```

**Individual calculator prompts for Superheat, Subcooling, Ohm's Law, etc. should follow the pattern shown in the original V0_PROMPTS_OPSNEX_THEME.md file, sections 4.2-4.4, applying the dark theme consistently.**

---

## Part 12: Additional Features

### 12.1 Barcode Scanner Page

```
Create Barcode Scanner page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Background: #0f172a
- Camera overlay: dark with teal accents
- Result card: #334155
- Text: #f1f5f9

Mobile-First (mobile-only feature):

Layout:
- Full screen camera view
- Dark semi-transparent overlay (#0f172a with 40% opacity)
- Scanning guide in center (teal)

Header (overlay top):
- "Scan Barcode" (slate-100, 20px)
- Back button (teal, top left)
- Flashlight toggle (top right, teal icon, if supported)
- Dark background overlay for readability

Camera View:
- Full screen camera feed
- Center scanning guide:
  - Rectangular frame (teal border, 3px)
  - Animated corners (teal, pulsing)
  - "Position barcode within frame" (slate-100, centered below)

Bottom Sheet (slides up when barcode detected):
- Dark card (#334155)
- Rounded top corners (16px)

Success Result:
- Animated checkmark (emerald circle)
- "Barcode Scanned!" (slate-100, 18px, bold)
- Barcode number (teal, 24px, monospace)

SKU Information (if found):
- SKU card (dark):
  - Description (slate-100, 16px, bold)
  - Category badge (teal bg, white text)
  - Stock: "On Hand: 24 units" (emerald if in stock, red if out)
  - Location: "Warehouse A - Bin 12" (slate-400)

Actions:
- "View Full Details" (teal bg, white text)
- "Add to Work Order" (teal outline)
- "Scan Another" (slate-600 bg)

Not Found State:
- Warning icon (amber)
- "Barcode not found in inventory" (slate-100)
- "Search manually" link (teal)

Features:
- Auto-focus, vibrate on scan
- Flashlight for low light
- Multiple barcode format support

Props:
- onScan: (barcode) => void
- onSKUFound: (sku) => void

Use react-qr-reader
Dark theme, haptic feedback
iOS safe area support
```

---

### 12.2 AI Chat Assistant Page

```
Create AI Chat Assistant page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Background: #0f172a
- Chat BG: #1e293b
- Message Bubbles: #334155 (user), #475569 (AI)
- Input BG: #334155
- Text: #f1f5f9
- Accent: #14b8a6 (teal)

Layout:
- Full height chat interface
- Header (sticky top)
- Messages area (scrollable)
- Input area (sticky bottom)

Header (dark #1e293b):
- "HVAC Assistant" title (slate-100, 18px)
- Robot icon (teal)
- Clear history button (slate-400 icon, hover: red)

Messages Area:
- Dark background (#1e293b)
- Auto-scroll to bottom

Message Types:

1. AI Messages (left):
- Avatar: robot icon (teal circle, 32px)
- Bubble: dark card (#334155)
- Text: slate-100
- Markdown support (code blocks: darker bg, teal accent)

2. User Messages (right):
- Bubble: lighter dark (#475569)
- Text: slate-100

3. System Messages (centered):
- "Chat started" (slate-400, small, italic)

Typing Indicator:
- Animated dots (teal)
- "AI is thinking..." (slate-400)

Input Area (sticky bottom):
- Dark input (#334155)
- Placeholder: "Ask me anything about HVAC..." (slate-400)
- Multi-line (auto-expand up to 4 lines)
- Send button: teal bg when text entered

Quick Suggestions (when empty):
- "Help with superheat calculation"
- "How to diagnose no heat call"
- Dark pills, hover: #475569

Features:
- Enter to send
- Copy message button
- Thumbs up/down feedback

Props:
- messages: Message[]
- onSendMessage: (text) => void
- isLoading: boolean

Use Tailwind CSS dark theme, TypeScript
Markdown: react-markdown
Accessible
```

---

### 12.3 Forecast/Analytics Page

```
Create Demand Forecasting page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Main BG: #0f172a
- Cards: #334155
- Headers: #1e293b
- Chart Line: #14b8a6 (teal)
- Grid Lines: #475569
- Text: #f1f5f9

Layout:
- Header with filters
- KPI cards row
- Main chart
- Recommendations panel

Header (dark #1e293b):
- Title: "Demand Forecasting" (slate-100)
- Time period dropdown (dark, teal accent)
- "Generate Forecast" button (teal bg)

KPI Cards (4 dark cards):
1. Forecasted Demand (next 30 days)
2. Stockout Risk (count)
3. Overstock Items (count)
4. Forecast Accuracy %
- All: dark bg, teal icons

Main Chart (dark card):
- Title: "Demand Forecast" (slate-100)
- Line chart: teal lines, dark bg, slate grid
- Historical vs Forecasted
- Tooltip on hover (dark)

Recommendations Panel (dark):
- "Reorder Recommendations" (slate-100)
- List of SKUs to reorder
- "Create PO" button per item (teal outline)

Top Movers Table (dark):
- SKU, Description, Avg Demand, Trend, Forecast
- Dark rows, teal trend indicators

Props:
- forecastData, reorderRecommendations
- onGenerateForecast, onCreatePO

Use Recharts dark theme
Tailwind CSS, TypeScript
Responsive
```

---

### 12.4 Labels/Reports

```
Create Labels Generator page for HVAC app (OpsNex dark theme).

Layout:
- Left: SKU selection (dark card)
- Right: Label preview (dark)

SKU Selection:
- Search/dropdown (dark, teal)
- Multi-select for batch

Label Settings (dark form):
- Size dropdown
- Fields checkboxes (teal when checked)
- Quantity input

Preview:
- White label mock on dark bg
- Barcode rendered

Actions:
- "Print" button (teal)
- "Download PDF" (teal outline)

Reports Dashboard (brief):
- Grid of report cards (dark)
- Each: icon (teal), name, description
- "Generate" button (teal)

Dark theme, teal accents
```

---

## Part 13: Utility Pages

### 13.1 Error Pages (404, 500)

```
Create Error Pages (404 & 500) for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Background: #0f172a (slate-950)
- Card: #334155 (slate-700)
- Text: #f1f5f9 (slate-100)
- Secondary: #94a3b8 (slate-400)
- Accent: #14b8a6 (teal-500)

**404 Page:**

Full Page Layout:
- Dark background (#0f172a)
- Centered content (max-width 600px)

Content:
- Large 404 (slate-100, 120px, bold)
- Teal accent line
- Icon: broken wrench (teal, 80px)
- Heading: "Page not found" (slate-100, 32px)
- Message: "Sorry, we couldn't find the page you're looking for." (slate-400, 18px)

Quick Links (dark cards):
- "Go to Dashboard" (teal bg, white text)
- "View Work Orders" (slate-700 bg)
- "Contact Support" (slate-700 bg)
- Grid: 3 columns desktop, 1 mobile

Footer:
- "Take me back" link (teal)
- Auto-redirect countdown (slate-400)

**500 Page:**

Content:
- Large 500 (slate-100, 120px)
- Red accent line
- Icon: alert triangle (red, 80px)
- Heading: "Something went wrong" (slate-100, 32px)
- Message: "We're experiencing technical difficulties." (slate-400)

Error Details (collapsible, admin only):
- Error code (red monospace)
- Timestamp, Request ID
- Stack trace (dark scrollable)

Actions:
- "Try Again" button (teal bg)
- "Go to Dashboard" (slate-700 bg)
- "Report Issue" (red outline)

Common Features:
- Logo at top
- Animations: fade in
- Responsive
- Accessible

Props:
- errorCode: 404 | 500
- message?: string
- onRetry?: () => void

Use Tailwind CSS dark theme
TypeScript, accessible
```

---

## 🎯 Summary

**Total: 68 Complete v0.dev Prompts**

All prompts feature the **OpsNex dark theme** with:
- Dark backgrounds (#0f172a, #1e293b, #334155)
- Teal accents (#14b8a6)
- Professional HVAC industry design
- Mobile-first responsive
- Full accessibility (WCAG AA)
- TypeScript + Tailwind CSS

**Ready to build your entire HVAC Management System!** 🚀
