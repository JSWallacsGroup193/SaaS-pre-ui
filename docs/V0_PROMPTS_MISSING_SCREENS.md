# Missing Screens - v0.dev Prompts (OpsNex Dark Theme)
**Authentication, Settings, and Additional Pages**

---

## 🔐 Part 1: Authentication Screens

### 1.1 Login Page

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

### 1.2 Register/Sign Up Page

```
Create a Register/Sign Up page for HVAC app (OpsNex dark theme) using React and TypeScript.

[Same dark theme styling as Login page]

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

Multi-Step Form (optional) or Single Page:

Step 1: Account Info
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

Step 2: User Info (optional, or on same page)
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

Optional Features:
- Email verification step
- Company subdomain selection (yourcompany.hvacpro.com)
- Plan selection (Free, Pro, Enterprise)
- Referral code input

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

### 1.3 Forgot Password Page

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

### 1.4 Reset Password Page

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

### 1.5 MFA Setup Page

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

## ⚙️ Part 2: Settings & Profile Pages

### 2.1 User Profile Settings

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

## 📱 Part 3: Additional App Pages

### 3.1 Barcode Scanner Page (Mobile)

```
Create Barcode Scanner page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Background: #0f172a
- Camera overlay: dark with teal accents
- Result card: #334155
- Text: #f1f5f9

Mobile-First (this is a mobile-only feature):

Layout:
- Full screen camera view
- Dark semi-transparent overlay (#0f172a with 40% opacity)
- Scanning guide in center (teal)

Header (overlay top):
- "Scan Barcode" (slate-100, 20px)
- Back button (teal, top left)
- Flashlight toggle (top right, teal icon, only if supported)
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

Success Result (after scan):
- Animated checkmark (emerald circle)
- "Barcode Scanned!" (slate-100, 18px, bold)
- Barcode number (teal, 24px, monospace)
- Horizontal divider (slate-600)

SKU Information (if found):
- SKU card (dark):
  - SKU number (slate-400, small)
  - Description (slate-100, 16px, bold)
  - Category badge (teal bg, white text)
  - Stock information:
    - "On Hand: 24 units" (emerald if in stock, red if out)
    - Location: "Warehouse A - Bin 12" (slate-400)
  - Unit cost (slate-400)

Actions (buttons in bottom sheet):
- "View Full Details" (teal bg, white text, full width)
- "Add to Work Order" (teal outline, teal text)
- "Scan Another" (slate-600 bg, white text)

Not Found State:
- Warning icon (amber)
- "Barcode not found in inventory" (slate-100)
- Barcode number shown (slate-400, monospace)
- "Search manually" link (teal)
- "Scan another" button (teal outline)

Manual Entry Option:
- "Can't scan?" link at bottom (teal)
- Opens modal with number input (dark theme)
- "Search" button (teal)

Features:
- Auto-focus camera on barcode
- Vibrate on successful scan (if supported)
- Sound feedback option (toggle in settings)
- Flashlight for low light
- Multiple barcode format support (Code 128, UPC, EAN, QR)

Error States:
- Camera permission denied:
  - Icon: camera with slash (red)
  - "Camera access required" (slate-100)
  - "Enable in settings" button (teal)
- Camera not available:
  - "Camera not available on this device"
  - "Enter barcode manually" button (teal)

History (expandable):
- Recent scans (last 5)
- Small cards showing: barcode, SKU name, timestamp
- Tap to view details

Props:
- onScan: (barcode) => void
- onSKUFound: (sku) => void
- onAddToWorkOrder: (sku) => void
- enableHistory?: boolean

Use react-qr-reader or react-barcode-reader
Dark theme throughout
Haptic feedback
iOS safe area support
```

---

### 3.2 AI Chat Assistant Page

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

Header (dark #1e293b, border-bottom #334155):
- "HVAC Assistant" title (slate-100, 18px)
- Subtitle: "AI-powered help" (slate-400, 12px)
- Robot icon (teal)
- Actions:
  - Clear history button (slate-400 icon, hover: red)
  - Close/Back button (mobile)

Messages Area:
- Dark background (#1e293b)
- Padding: 16px
- Auto-scroll to bottom

Message Types:

1. AI Messages (left-aligned):
- Avatar: robot icon in teal circle (32px)
- Bubble: dark card (#334155)
- Text: slate-100
- Timestamp: slate-400, 10px, right
- Markdown support:
  - Code blocks: darker bg (#1e293b), teal accent
  - Links: teal, underline on hover
  - Lists: slate-100 bullets
  - Bold/Italic: slate-100

2. User Messages (right-aligned):
- No avatar (or user avatar if available)
- Bubble: lighter dark (#475569)
- Text: slate-100
- Timestamp: slate-400

3. System Messages (centered):
- "Chat started" (slate-400, small)
- "History cleared" (slate-400)
- No bubble, italic

Typing Indicator:
- Animated dots (teal)
- "AI is thinking..." (slate-400)

Input Area (sticky bottom, dark #1e293b, border-top #334155):
- Text input (dark):
  - Background: #334155
  - Border: #475569, focus: teal
  - Placeholder: "Ask me anything about HVAC..." (slate-400)
  - Multi-line (auto-expand up to 4 lines)
  - White text
- Send button:
  - Teal background when text entered
  - Disabled (slate-600) when empty
  - Icon: paper plane (white)
  - Loading: spinner while AI responds

Quick Suggestions (show when chat empty):
- "Help with superheat calculation"
- "How to diagnose no heat call"
- "Explain subcooling"
- "Voltage drop calculation"
- Each: dark pill button (#334155), slate-100 text, hover: #475569

Features:
- Auto-focus input
- Enter to send (Shift+Enter for new line)
- Copy message (button on hover, teal icon)
- Message actions:
  - Copy
  - Retry (if error)
  - Thumbs up/down (feedback, teal when selected)
- Suggested follow-ups (AI can suggest next questions)
  - Show as teal pill buttons below AI message

Context Awareness (show active context):
- If viewing work order: "Context: Work Order #1234" (small teal badge at top)
- If viewing SKU: "Context: Filter XYZ-123"
- Clear context button (X)

Error State:
- Red message bubble: "Failed to send. Retry?"
- Retry button (teal)

Empty State (no messages):
- Large robot icon (teal, centered)
- "Ask me anything!" (slate-100, 24px)
- "I can help with calculations, diagnostics, and more" (slate-400)
- Quick suggestion pills

Chat History (optional sidebar or modal):
- List of previous conversations
- Dark cards with first message preview
- Timestamp (slate-400)
- Click to load

Mobile:
- Full screen
- Swipe down to close (optional)
- Keyboard pushes content up smoothly

Props:
- messages: Message[]
- onSendMessage: (text, context?) => void
- isLoading: boolean
- contextWorkOrderId?: string
- contextSKUId?: string
- onClearContext: () => void

Use Tailwind CSS dark theme, TypeScript
Markdown rendering: react-markdown
Smooth scroll animations
Accessible
Copy to clipboard functionality
```

---

### 3.3 Forecast/Analytics Page

```
Create Demand Forecasting page for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme:
- Main BG: #0f172a
- Card BG: #334155
- Header BG: #1e293b
- Chart BG: #334155
- Chart Line: #14b8a6 (teal)
- Grid Lines: #475569
- Text: #f1f5f9
- Secondary: #94a3b8

Layout:
- Header with filters
- KPI cards row
- Main chart
- Recommendations panel
- Data table

Header (dark #1e293b):
- Title: "Demand Forecasting" (slate-100)
- Filters (right):
  - Time period: dropdown (Last 30 days, 90 days, 1 year, Custom)
    - Dark dropdown, teal accent
  - Category filter: multi-select (All Categories, Filters, Refrigerant, etc.)
  - Warehouse filter: dropdown
  - "Generate Forecast" button (teal bg, white text)

KPI Cards (4 cards, dark #334155):
1. Forecasted Demand:
   - Large value (slate-100, 32px)
   - "Next 30 days" (slate-400)
   - Trend: +12% (emerald if up, red if down)
   - Icon: trending up (teal)

2. Stockout Risk:
   - Number of SKUs at risk (large)
   - "Below safety stock" (slate-400)
   - Alert icon (amber or red based on severity)

3. Overstock Items:
   - Count (slate-100)
   - "Excess inventory" (slate-400)
   - Icon: boxes (amber)

4. Forecast Accuracy:
   - Percentage (slate-100)
   - "Historical accuracy" (slate-400)
   - Checkmark icon (emerald)

Main Chart (large dark card):
- Title: "Demand Forecast" (slate-100)
- Legend:
  - Historical Demand (teal line)
  - Forecasted Demand (teal dashed line)
  - Safety Stock (amber line)
- Chart:
  - Dark background (#334155)
  - Teal lines
  - Slate grid lines (#475569)
  - Slate axis labels (#94a3b8)
  - Tooltip on hover (dark card with values)
  - Time axis (X): dates
  - Quantity axis (Y): units
  - Zoomable/pannable
- Chart controls:
  - View: Line, Bar, Area (toggle group, teal active)
  - Download: CSV, PNG buttons (slate, teal icons)

Recommendations Panel (dark card):
- Title: "Reorder Recommendations" (slate-100, 18px)
- Icon: lightbulb (teal)
- List of SKUs to reorder:
  - Each item (dark row, hover #475569):
    - SKU name (slate-100)
    - Current stock (slate-400) 
    - Forecasted demand (slate-400)
    - Recommended order qty (teal, bold)
    - "Create PO" button (teal outline, small)
- Sorting: Urgency (default), Alphabetical, Category
- Pagination if > 10 items

Top Movers Table (dark card):
- Title: "Top Moving Items" (slate-100)
- Table (dark theme):
  - Headers: slate-400
  - Rows: #334155, hover: #475569
  - Borders: slate-600
  - Columns:
    - SKU (slate-100)
    - Description (slate-100)
    - Avg Monthly Demand (slate-400)
    - Trend (emerald ↑ or red ↓ with %)
    - Forecast Next Month (teal)
  - Sortable columns (teal sort indicator)
  - Pagination (dark theme, teal active)

Seasonality Insights (expandable dark card):
- Title: "Seasonal Trends" (slate-100)
- Description: "Demand patterns by month" (slate-400)
- Mini chart showing seasonal variation
- Peak months highlighted (teal)
- Low months (amber)

Algorithm Settings (collapsible section):
- Advanced users only
- Toggle: "Use advanced settings" (teal switch)
- When expanded:
  - Forecast method: dropdown (Moving Average, Exponential Smoothing, ARIMA)
  - Confidence interval: slider (90%, 95%, 99%)
  - Seasonality: checkbox (teal when on)

Export Options:
- "Export Report" button (slate bg, teal text, teal icon)
- Dropdown menu (dark):
  - PDF Report
  - Excel Spreadsheet
  - CSV Data
  - Email Report

Mobile:
- Cards stack vertically
- Chart: scrollable horizontally if needed
- Table: horizontal scroll
- Simplified view option

Props:
- forecastData: ForecastData[]
- reorderRecommendations: Recommendation[]
- topMovers: SKU[]
- onGenerateForecast: (filters) => void
- onCreatePO: (skuId) => void
- onExport: (format) => void

Use Recharts or Chart.js (dark theme config)
Tailwind CSS dark theme, TypeScript
Responsive, accessible
```

---

### 3.4 Error Pages (404, 500)

```
Create Error Pages (404 & 500) for HVAC app (OpsNex dark theme) using React TypeScript.

Dark Theme: [Standard dark theme]

**404 Page (Not Found):**

Full Page Layout:
- Dark background (#0f172a)
- Centered content (max-width 600px)

Content:
- Large 404 (slate-100, 120px, bold, or stylized)
- Teal accent line under numbers
- Icon: broken wrench or magnifying glass (teal, 80px)
- Heading: "Page not found" (slate-100, 32px)
- Message: "Sorry, we couldn't find the page you're looking for." (slate-400, 18px)
- Optional: "The page may have been moved or deleted."

Search (optional):
- "Search for what you need:" (slate-400)
- Search input (dark, teal focus, 48px height)
- Search button (teal)

Quick Links (dark cards):
- "Go to Dashboard" (teal bg, white text, icon: home)
- "View Work Orders" (slate-700 bg, slate-100 text, icon: clipboard)
- "Contact Support" (slate-700 bg, slate-100 text, icon: help)
- Grid: 3 columns on desktop, 1 on mobile

Footer:
- "Take me back" link with back arrow (teal)
- Auto-redirect countdown: "Redirecting to dashboard in 10s..." (slate-400)

**500 Page (Server Error):**

Full Page Layout:
- Dark background (#0f172a)
- Centered content

Content:
- Large 500 (slate-100, 120px)
- Red accent line
- Icon: alert triangle or broken server (red, 80px)
- Heading: "Something went wrong" (slate-100, 32px)
- Message: "We're experiencing technical difficulties. Our team has been notified." (slate-400, 18px)

Error Details (collapsible, for admins/devs only):
- "Show error details" link (slate-400, small)
- Expands to show:
  - Error code (red monospace)
  - Timestamp
  - Request ID
  - Stack trace (dark card, monospace, scrollable)

Actions:
- "Try Again" button (teal bg, white text, reload page)
- "Go to Dashboard" button (slate-700 bg)
- "Report Issue" button (red outline)

Status Updates (if applicable):
- "System Status" link (teal)
- Opens status page or modal

Footer:
- "Need help?" (slate-400)
- "Contact support" link (teal)

**Common Features (both pages):**

- Logo at top (teal accent)
- Animations: subtle fade in
- Responsive: mobile-friendly
- Accessibility: proper heading hierarchy
- Auto-retry: 500 page can auto-retry after delay
- Breadcrumb: show path that led to error (slate-400)

Props:
- errorCode: 404 | 500
- message?: string (custom error message)
- showDetails?: boolean (for 500)
- errorDetails?: object
- onRetry?: () => void (for 500)
- onGoHome: () => void

Use Tailwind CSS dark theme, TypeScript
Lottie animations optional (broken robot, etc.)
Accessible, clear messaging
```

---

## 📋 Part 4: Reports & Additional Screens

### 4.1 Reports Dashboard (Brief)

```
Create Reports Dashboard for HVAC app (OpsNex dark theme).

Layout:
- Grid of report cards (2x3 on desktop, 1 col mobile)
- Each card (dark #334155):
  - Icon (teal)
  - Report name (slate-100)
  - Description (slate-400)
  - "Generate" or "View" button (teal)

Report Types:
- Work Order Summary Report
- Technician Performance Report
- Revenue by Customer Report
- Inventory Valuation Report
- Parts Usage Report
- Service Agreement Report

Filters (top):
- Date range (dark date picker)
- Format: PDF, Excel, CSV (dark dropdown)
- Schedule: One-time, Daily, Weekly, Monthly (if applicable)

Each report card clickable → opens report builder or preview

Dark theme, teal accents, TypeScript
```

---

### 4.2 Labels/Barcode Generator (Brief)

```
Create Label Generator page for HVAC app (OpsNex dark theme).

Layout:
- Left: SKU selection & settings (dark card)
- Right: Label preview (dark)

SKU Selection:
- Search/dropdown to select SKU (dark, teal accent)
- Multi-select for batch printing

Label Settings (dark form):
- Label size: dropdown (2.25" x 1.25", 4" x 6", etc.)
- Include fields: checkboxes (SKU, Description, Barcode, Price, Bin)
- Quantity: number input

Preview:
- Shows label design (dark background, white label mock)
- Barcode rendered (black on white)
- Text preview

Actions:
- "Print" button (teal)
- "Download PDF" button (teal outline)
- "Reset" button (slate)

Dark theme, teal accents, barcode library
```

---

## 📄 Summary of ALL Missing Screens Added

### **Authentication (5 screens):**
- ✅ Login Page
- ✅ Register/Sign Up Page
- ✅ Forgot Password Page
- ✅ Reset Password Page
- ✅ MFA Setup Page

### **Settings (1 screen):**
- ✅ User Profile/Settings (with tabs: Profile, Security, Preferences, Notifications)

### **App Features (3 screens):**
- ✅ Barcode Scanner Page (mobile)
- ✅ AI Chat Assistant Page
- ✅ Forecast/Analytics Page

### **Utility Pages (3 screens):**
- ✅ Error Pages (404 & 500)
- ✅ Reports Dashboard (brief)
- ✅ Labels/Barcode Generator (brief)

---

## 🎯 Total Prompts Now Available

**Previous:** 46 prompts (from V0_PROMPTS_OPSNEX_THEME.md)  
**New:** 12 prompts (this document)  
**Total:** **58 complete v0.dev prompts**

All with OpsNex dark theme! 🎨🚀

---

## 📌 Still Could Add (Optional):

- Invoice Detail Page
- Payment Processing Page
- Service Agreement Detail
- Equipment Management Page
- More detailed CRM screens (Contacts Detail, Leads Detail, Notes)
- Advanced Admin Settings
- Tenant/Organization Settings
- Webhook Configuration
- API Key Management
- User Management (Admin view)

**Let me know if you want prompts for any of these!**
