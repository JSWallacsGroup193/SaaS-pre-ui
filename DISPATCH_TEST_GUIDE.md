# Dispatch Board Drag-and-Drop Testing Guide

## 🎯 Test Objective
Verify that the dispatch board drag-and-drop functionality correctly persists work order assignments and unassignments to the backend database.

## 📊 Test Data Created

### Technicians (3)
- **John Smith** (john.smith@hvac.com)
- **Sarah Jones** (sarah.jones@hvac.com)
- **Mike Wilson** (mike.wilson@hvac.com)

### Work Orders (7)
1. **AC Unit Maintenance** - Assigned to John Smith (Mon, 8-10am)
2. **Heating System Repair** - Assigned to John Smith (Mon, 1-4pm)
3. **Duct Cleaning** - Assigned to Sarah Jones (Tue, 9am-12pm)
4. **Emergency Chiller Repair** - Assigned to Sarah Jones (Wed, 8-11am)
5. **Thermostat Installation** - Assigned to Mike Wilson (Tue, 2-5pm)
6. **Ventilation Inspection** - **UNASSIGNED** (Thu, 10am-1pm)
7. **Refrigeration Unit Check** - **UNASSIGNED** (Fri, 8am-12pm)

### Default Credentials
- **Email**: john.smith@hvac.com (or any technician)
- **Password**: password123

---

## 🧪 Test Cases

### Test Case 1: Drag Work Order from One Technician to Another
**Steps:**
1. Login with credentials above
2. Navigate to Dispatch page
3. Locate "AC Unit Maintenance" in John Smith's lane
4. Drag it to Sarah Jones's lane
5. Observe the loading state
6. Verify the work order appears in Sarah Jones's lane after reload

**Expected Result:**
✅ Work order moves to Sarah Jones's lane
✅ Backend updates successfully (check browser console for success message)
✅ Data persists after page refresh

---

### Test Case 2: Drag Work Order to Unassigned Panel
**Steps:**
1. Locate "Heating System Repair" in John Smith's lane
2. Drag it to the "Unassigned Work Orders" panel (sidebar)
3. Observe the loading state
4. Verify the work order appears in the unassigned panel after reload

**Expected Result:**
✅ Work order appears in unassigned panel
✅ Backend receives `technicianId: null`
✅ Data persists after page refresh

---

### Test Case 3: Drag Unassigned Work Order to Technician
**Steps:**
1. Locate "Ventilation Inspection" in the Unassigned panel
2. Drag it to Mike Wilson's lane
3. Observe the loading state
4. Verify the work order appears in Mike Wilson's lane after reload

**Expected Result:**
✅ Work order is assigned to Mike Wilson
✅ Backend receives `technicianId: "mike-wilson-uuid"`
✅ Data persists after page refresh

---

### Test Case 4: Multiple Rapid Assignments
**Steps:**
1. Quickly drag 3 different work orders to different technicians
2. Wait for all reload operations to complete
3. Refresh the page manually (F5)
4. Verify all 3 assignments persisted correctly

**Expected Result:**
✅ All assignments persist correctly
✅ No race conditions or data loss
✅ Page refresh shows correct state

---

## 🔍 Verification Methods

### Browser Console Logs
Look for these messages in the browser console:
- ✅ Success: `"Dispatch slot updated successfully"`
- ❌ Error: Check error details if update fails

### Backend Logs
Check workflow logs for:
- PUT requests to `/api/v1/dispatch/:id`
- Response status codes (should be 200)

### Database Verification (Optional)
Run this query to check dispatch slots:
```sql
SELECT 
  ds.id,
  wo.title as work_order,
  u.firstName || ' ' || u.lastName as technician,
  ds.startTime,
  ds.endTime
FROM "DispatchSlot" ds
LEFT JOIN "WorkOrder" wo ON ds."workOrderId" = wo.id
LEFT JOIN "User" u ON ds."technicianId" = u.id
ORDER BY ds.startTime;
```

---

## 🐛 Known Limitations

1. **Full Reload After Update**: The entire board reloads after each update (causes brief loading state)
2. **Console-Only Errors**: Errors only appear in console, no user-facing toast notifications yet
3. **Type Assertion**: Frontend uses `as any` due to type mismatch between frontend and backend DTOs

---

## 🎉 Success Criteria

The drag-and-drop feature is working correctly if:
- ✅ Work orders can be dragged between technicians and persist
- ✅ Work orders can be unassigned by dragging to unassigned panel and persist
- ✅ Unassigned work orders can be assigned to technicians and persist
- ✅ All changes survive page refresh (F5)
- ✅ No console errors or 500 status codes
- ✅ Database contains correct `technicianId` values (including `null` for unassigned)

---

## 📝 Test Results Template

```
Date: _____________
Tester: _____________

Test Case 1 (Technician to Technician): [ ] PASS [ ] FAIL
Notes: _______________________________________________________

Test Case 2 (To Unassigned): [ ] PASS [ ] FAIL
Notes: _______________________________________________________

Test Case 3 (From Unassigned): [ ] PASS [ ] FAIL
Notes: _______________________________________________________

Test Case 4 (Multiple Rapid): [ ] PASS [ ] FAIL
Notes: _______________________________________________________

Overall Result: [ ] ALL TESTS PASSED [ ] SOME FAILURES
```

---

## 🔄 Re-seeding Database

If you need to reset the test data:

```bash
cd backend
npx ts-node scripts/seed-dispatch.ts
```

This will create fresh test data (skips existing records, so safe to run multiple times).
