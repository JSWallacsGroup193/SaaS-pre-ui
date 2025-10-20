# AI Design Workflow - Step-by-Step Guide
**How to Use AI Tools to Design Your HVAC System UI/UX**

---

## 🎯 The Goal

Get from your design brief → working UI designs → implemented in your React app

**Central Hub:** Figma (free account works fine)  
**Timeline:** 2-3 days for core screens  
**Output:** React components you can copy directly into your app

---

## 📋 Step-by-Step Workflow

### **Step 1: Set Up Your Central Hub (15 minutes)**

**Create a Figma Account (Free)**
1. Go to https://figma.com
2. Sign up (free account is plenty)
3. Create a new file: "HVAC Management System"
4. Create pages for each module:
   - Dashboard
   - Work Orders
   - Field Tools
   - CRM
   - Inventory
   - Dispatch
   - Mobile Views

**Why Figma?**
- All AI tools can export to Figma
- Easy to share with developers
- Can hand off designs directly to your React app
- Version control built-in

---

### **Step 2: Generate Screen Designs with v0.dev (Day 1)**

**v0.dev is THE tool for your project** because it generates React code directly.

#### **How to Use v0.dev:**

1. Go to https://v0.dev
2. Sign in with GitHub
3. For each screen, paste this format:

**Example Prompt for Field Tools Home:**
```
Create a mobile-first React component for HVAC Field Tools selection page.

Requirements:
- Grid of 21 calculator cards (3 columns on desktop, 1 on mobile)
- Each card shows: emoji icon, calculator name, brief description
- Categories: Electrical (4), Refrigeration (4), Airflow (3), Gas/Combustion (3), Hydronic/Boiler (3), Utilities (4)
- Cards are clickable and navigate to calculator
- Use Tailwind CSS
- Professional blue theme (#2563eb)
- Large touch targets (min 64px height on mobile)
- Category headers with section dividers

Card examples:
- "⚡ Capacitor Test - Test capacitors with ±10% tolerance"
- "🌡️ Superheat Calculator - Measure superheat for charge diagnosis"
- "💨 CFM Calculator - Calculate airflow from BTU/hr and ΔT"
```

4. v0.dev generates 3 design variations
5. Pick the one you like
6. Click "Code" to get React/TypeScript code
7. Click "Copy Code" 
8. Save to a file: `v0_designs/FieldToolsHome.tsx`

#### **Repeat for Each Key Screen:**

**Screen 1: Technician Dashboard**
```
Create a mobile-first React dashboard for HVAC technicians.

Show:
- Header: "Today's Schedule" with date
- 3 work order cards, each showing:
  - Customer name and address
  - Time slot (e.g., "9:00 AM - 11:00 AM")
  - Job type (e.g., "No Heat Service Call")
  - Status badge (Scheduled/In Progress/Completed)
  - "Navigate" button with map icon
- Quick Actions section:
  - "Field Tools" button (large, blue)
  - "Scanner" button
  - "Update Status" button
- Bottom navigation: Home, Work Orders, Tools, Profile

Use Tailwind CSS, #2563eb blue theme, card shadows
```

**Screen 2: Superheat Calculator**
```
Create a mobile-first HVAC Superheat Calculator React component.

Inputs:
- Suction Line Temperature (°F) - large number input
- Suction Line Pressure (PSI) - large number input
- Refrigerant Type selector (R-410A, R-22, R-134a)

Output:
- Large result display: "Superheat: 12°F"
- Color-coded interpretation:
  - Green (10-15°F): "✓ Superheat Normal"
  - Yellow (7-9°F or 16-20°F): "⚠ Check Charge"
  - Red (<7°F or >20°F): "✖ Charge Issue - Add/Remove Refrigerant"

Actions:
- "Calculate" button (blue, large)
- "Save to Work Order" button (green, full width)
- "Clear" button (gray, outline)

Use Tailwind CSS, large mobile-friendly inputs (56px height)
```

**Screen 3: Work Order Detail**
```
Create a React component for HVAC Work Order detail page.

Header:
- WO #: WO-2024-1234
- Status badge: In Progress
- Customer: "Johnson Residence"

Sections (tabs):
- Details: Customer info, address, scheduled time, assigned technician
- Tasks: Checklist items with checkboxes
- Parts: List of SKUs used with quantities
- Field Calculations: List of saved calculator results (Superheat: 12°F, Subcooling: 8°F)
- Notes: Technician notes with timestamps
- Photos: Before/after images

Actions:
- "Update Status" dropdown (Scheduled, In Progress, Completed, Invoiced)
- "Add Note" button
- "Add Photo" button
- "Complete Job" button (green, prominent)

Use Tailwind CSS, professional layout, mobile responsive
```

**Do this for 8-10 core screens.** Save all the code.

---

### **Step 3: Use Claude to Refine Designs (Day 1-2)**

Once you have v0.dev designs, use Claude (me!) to improve them.

**Example Refinement Prompts:**

1. **Accessibility Check:**
```
I have this React component for a Superheat Calculator. 
Can you review it for accessibility issues and suggest improvements?
- Check color contrast ratios
- Ensure keyboard navigation
- Add ARIA labels
- Make it screen reader friendly

[Paste v0.dev code here]
```

2. **Mobile Optimization:**
```
This Work Order list component needs better mobile optimization.
Please improve:
- Touch targets should be minimum 44px
- Reduce columns on mobile (show as cards)
- Add pull-to-refresh gesture
- Optimize for one-handed use

[Paste v0.dev code here]
```

3. **Integration with Your App:**
```
I need to integrate this Field Tools component into my existing HVAC app.
Current tech stack: React, Zustand, React Router, TypeScript

Please modify this code to:
- Use our Zustand store for state management
- Add React Router navigation
- Match our existing component patterns
- Add TypeScript types

Here's our existing structure:
[Paste relevant code from your app]

Here's the new component:
[Paste v0.dev code]
```

---

### **Step 4: Visual Concepts with MidJourney (Optional - Day 2)**

If you want to explore different visual styles first:

**MidJourney Prompts:**

```
Professional HVAC mobile app dashboard, showing work order cards and calculator icons, modern clean design, blue color scheme (#2563eb), white background, card shadows, iOS style, high quality UI design, Figma mockup --ar 9:16 --v 6
```

```
HVAC field service app calculator screen, large number inputs, professional blue theme, mobile interface, touch-friendly buttons, modern typography, clean layout --ar 9:16 --v 6
```

```
Dispatch calendar view for HVAC business, showing technician schedules, drag and drop work orders, professional desktop app, blue and white color scheme --ar 16:9 --v 6
```

**Export these images** → Import to Figma for reference/inspiration

---

### **Step 5: Consolidate Everything in Figma (Day 2-3)**

#### **Import v0.dev Designs to Figma:**

**Option A: Screenshot Method (Quick)**
1. Open each v0.dev design in preview
2. Take screenshot (or use v0.dev's export)
3. Drag into Figma
4. Annotate with notes for developers

**Option B: Figma Plugin Method (Better)**
1. Use "HTML to Figma" plugin
2. Paste v0.dev HTML/CSS code
3. Converts to editable Figma layers
4. Polish in Figma

#### **Organize Your Figma File:**

```
HVAC Management System (Figma File)
│
├── 📄 Cover (Title page with project info)
│
├── 📱 Mobile Screens
│   ├── Dashboard - Technician
│   ├── Dashboard - Dispatcher  
│   ├── Work Order List
│   ├── Work Order Detail
│   ├── Field Tools Home
│   ├── Superheat Calculator
│   ├── Scanner
│   └── ... (all mobile screens)
│
├── 💻 Desktop Screens
│   ├── Dashboard - Manager
│   ├── Dispatch Board
│   ├── CRM - Accounts
│   ├── Inventory Management
│   └── ... (all desktop screens)
│
├── 🎨 Design System
│   ├── Colors (blue #2563eb, green, yellow, red, grays)
│   ├── Typography (sizes, weights)
│   ├── Buttons (primary, secondary, destructive)
│   ├── Form Inputs (text, select, date)
│   ├── Cards (work order card, KPI card)
│   └── Icons
│
└── 📋 User Flows
    ├── Technician Completes Job Flow
    ├── Dispatcher Assigns Work Order Flow
    └── ... (key workflows)
```

---

### **Step 6: Create a Design System (Day 3)**

**Extract Common Components in Figma:**

1. **Create Components Page** in Figma
2. **Define Reusable Elements:**
   - Button (Primary, Secondary, Destructive)
   - Input Field (Text, Number, Select, Date)
   - Card (Work Order Card, KPI Card, Calculator Card)
   - Navigation (Sidebar, Top Bar, Bottom Nav)
   - Badge (Status: Scheduled, In Progress, Completed)

3. **Export as React Components:**
   - Use Figma → Code export
   - Or use v0.dev to generate components from your Figma designs

---

### **Step 7: Implement in Your React App (Day 4+)**

#### **Copy Code from v0.dev → Your App:**

1. **Create New Component Files:**
```bash
frontend/src/components/ui/
  ├── Button.tsx (from v0.dev)
  ├── Card.tsx (from v0.dev)
  ├── Input.tsx (from v0.dev)
  └── Badge.tsx (from v0.dev)

frontend/src/pages/
  ├── Dashboard/
  │   └── TechnicianDashboard.tsx (from v0.dev)
  ├── FieldTools/
  │   ├── FieldToolsHome.tsx (from v0.dev)
  │   └── SuperheatCalculator.tsx (from v0.dev)
  └── WorkOrders/
      └── WorkOrderDetail.tsx (from v0.dev)
```

2. **Adapt to Your Stack:**
   - Replace mock data with your API calls
   - Connect to Zustand store
   - Add React Router navigation
   - Integrate with your backend

3. **Test on Real Devices:**
   - Test on iPhone (Safari)
   - Test on Android (Chrome)
   - Test on tablet
   - Get feedback from actual technicians

---

## 🛠️ Tool-by-Tool Quick Reference

### **v0.dev** (Primary Tool - Use for 80% of work)
- **Best for:** React components, entire screens, mobile views
- **Input:** Text description + requirements
- **Output:** React/TypeScript code (copy directly into app)
- **Cost:** Free tier (10 generations/month), $20/month for more
- **Export:** Copy code → paste in your app

### **Claude AI** (You're using me!)
- **Best for:** Refining code, accessibility, integration help
- **Input:** Code from v0.dev + specific improvements
- **Output:** Enhanced code, explanations, suggestions
- **Cost:** Free (Claude.ai) or $20/month (Pro)
- **Export:** Copy code → paste in your app

### **Figma**
- **Best for:** Central hub, design system, collaboration
- **Input:** Import screenshots, HTML, or manual design
- **Output:** Visual mockups, design specs, assets
- **Cost:** Free (fine for your needs)
- **Export:** PNG/SVG images, CSS code, hand-off to developers

### **MidJourney** (Optional)
- **Best for:** Visual inspiration, branding exploration
- **Input:** Text prompts describing screens
- **Output:** Beautiful UI concepts (not code)
- **Cost:** $10/month (basic plan)
- **Export:** Download images → Import to Figma for reference

### **Galileo AI** (Optional - Alternative to v0.dev)
- **Best for:** Generating many screens quickly
- **Input:** Text description
- **Output:** Figma designs (editable)
- **Cost:** Waitlist (free during beta)
- **Export:** Direct to Figma

---

## 💡 Recommended Quick Start (2-Hour Sprint)

**Goal:** Get 3 working screens in 2 hours

**Hour 1: Generate with v0.dev**
- [ ] Dashboard - Technician (20 min)
- [ ] Field Tools Home (20 min)  
- [ ] Superheat Calculator (20 min)

**Hour 2: Implement**
- [ ] Copy code into your React app (30 min)
- [ ] Replace mock data with real API (20 min)
- [ ] Test on mobile device (10 min)

**You now have 3 working screens!**

---

## 📊 Full Project Timeline (1 Week)

**Day 1: Core Mobile Screens**
- Technician Dashboard
- Work Order List & Detail
- Field Tools (6 calculators)
- Use: v0.dev

**Day 2: Desktop Screens**
- Manager Dashboard
- Dispatch Board
- CRM Accounts
- Use: v0.dev + Claude for refinement

**Day 3: Inventory & Purchasing**
- Inventory SKU List & Detail
- Warehouse Management
- Purchase Orders
- Use: v0.dev

**Day 4: Design System**
- Extract common components
- Create Figma design system
- Generate reusable React components
- Use: Figma + v0.dev

**Day 5: Integration**
- Implement all screens in React app
- Connect to backend APIs
- Test with real data
- Use: Your development environment

**Day 6-7: Testing & Refinement**
- Mobile device testing
- Accessibility audit (with Claude)
- User testing with technicians
- Bug fixes and polish

---

## 🎯 Your Action Plan (Start Now)

### **Today (30 minutes):**
1. Sign up for v0.dev
2. Sign up for Figma (free)
3. Generate your first screen (Technician Dashboard)

### **This Week:**
1. Generate 10 core screens with v0.dev
2. Import to Figma for organization
3. Implement 3 screens in your React app

### **Next Week:**
1. Complete all screens
2. Build design system
3. Full integration with your backend

---

## 📁 File Organization

**On Your Computer:**
```
hvac-designs/
├── v0_components/          (Code from v0.dev)
│   ├── TechnicianDashboard.tsx
│   ├── FieldToolsHome.tsx
│   ├── SuperheatCalculator.tsx
│   └── ... (all screens)
│
├── midjourney_concepts/    (Visual inspiration)
│   ├── dashboard_concept_1.png
│   ├── calculator_concept_2.png
│   └── ...
│
├── figma_exports/          (Exported from Figma)
│   ├── components/
│   ├── screens/
│   └── assets/
│
└── design_brief.md         (Your UI/UX Design Brief)
```

**In Figma:**
- One file: "HVAC Management System"
- Organized by pages (Mobile, Desktop, Design System)

**In Your React App:**
- Copy from v0_components → frontend/src/pages/
- Adapt to your existing structure

---

## ✅ Success Checklist

- [ ] Figma account created
- [ ] v0.dev account created  
- [ ] Generated 3 screens with v0.dev
- [ ] Imported designs to Figma
- [ ] Implemented 1 screen in React app
- [ ] Tested on mobile device
- [ ] Created design system in Figma
- [ ] All 59 screens designed
- [ ] All core screens implemented
- [ ] User testing completed
- [ ] Accessibility audit passed

---

## 🆘 Common Questions

**Q: Do I need to use all these tools?**  
A: No! Start with just **v0.dev** and **Figma**. That's 90% of what you need.

**Q: Which tool generates the best code?**  
A: **v0.dev** by far. It's built specifically for React/Tailwind and the code is production-ready.

**Q: Can I skip Figma?**  
A: Yes, but Figma helps you organize everything and makes collaboration easier later.

**Q: How much does this cost?**  
A: You can do everything with free tiers:
- v0.dev: $20/month (worth it)
- Figma: Free
- Claude: Free
- Total: $20/month

**Q: How long until I have working screens?**  
A: 2 hours for 3 screens. 1 week for all core screens.

**Q: Do I need design skills?**  
A: Nope! The AI tools do the design. You just describe what you want.

---

## 🚀 Next Steps

1. **Right now:** Go to v0.dev and generate your first screen
2. **Share this guide** with your team
3. **Start with mobile screens** (highest impact for technicians)
4. **Test early and often** with real users

Remember: Done is better than perfect. Get screens working quickly, then refine based on real usage!

---

**Good luck! Your HVAC app will look amazing! 🎨**
