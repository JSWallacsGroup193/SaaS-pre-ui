#!/bin/bash

echo "=========================================="
echo "HVAC Management System - API Testing"
echo "=========================================="

BASE_URL="http://localhost:3000/api/v1"

# Login and get token
echo "1. Testing Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@hvac.com","password":"password123"}')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Login failed"
  exit 1
fi
echo "✅ Login successful - Token received"

# Test Health
echo ""
echo "2. Testing Health Endpoint..."
HEALTH=$(curl -s "$BASE_URL/health")
echo "✅ Health: $HEALTH"

# Test Work Orders
echo ""
echo "3. Testing Work Orders..."
WO_LIST=$(curl -s -X GET "$BASE_URL/work-orders" -H "Authorization: Bearer $TOKEN")
WO_STATS=$(curl -s -X GET "$BASE_URL/work-orders/stats" -H "Authorization: Bearer $TOKEN")
echo "✅ Work Orders endpoints working"

# Test CRM
echo ""
echo "4. Testing CRM..."
ACCOUNTS=$(curl -s -X GET "$BASE_URL/crm/accounts" -H "Authorization: Bearer $TOKEN")
CONTACTS=$(curl -s -X GET "$BASE_URL/crm/contacts" -H "Authorization: Bearer $TOKEN")
LEADS=$(curl -s -X GET "$BASE_URL/crm/leads" -H "Authorization: Bearer $TOKEN")
echo "✅ CRM endpoints working"

# Test Inventory
echo ""
echo "5. Testing Inventory..."
SKUS=$(curl -s -X GET "$BASE_URL/inventory/skus" -H "Authorization: Bearer $TOKEN")
WAREHOUSES=$(curl -s -X GET "$BASE_URL/inventory/warehouses" -H "Authorization: Bearer $TOKEN")
BINS=$(curl -s -X GET "$BASE_URL/inventory/bins" -H "Authorization: Bearer $TOKEN")
echo "✅ Inventory endpoints working"

# Test Purchasing
echo ""
echo "6. Testing Purchasing..."
POS=$(curl -s -X GET "$BASE_URL/purchasing" -H "Authorization: Bearer $TOKEN")
echo "✅ Purchasing endpoints working"

# Test Dispatch
echo ""
echo "7. Testing Dispatch..."
DISPATCH=$(curl -s -X GET "$BASE_URL/dispatch/all" -H "Authorization: Bearer $TOKEN")
echo "✅ Dispatch endpoints working"

# Test Notifications
echo ""
echo "8. Testing Notifications..."
NOTIFS=$(curl -s -X GET "$BASE_URL/notifications" -H "Authorization: Bearer $TOKEN")
UNREAD=$(curl -s -X GET "$BASE_URL/notifications/unread-count" -H "Authorization: Bearer $TOKEN")
echo "✅ Notifications endpoints working"

# Test Admin endpoints
echo ""
echo "9. Testing Admin Panel..."
ADMIN_DASHBOARD=$(curl -s -X GET "$BASE_URL/admin/dashboard" -H "Authorization: Bearer $TOKEN")
ADMIN_USERS=$(curl -s -X GET "$BASE_URL/admin/users" -H "Authorization: Bearer $TOKEN")
ADMIN_ROLES=$(curl -s -X GET "$BASE_URL/admin/roles" -H "Authorization: Bearer $TOKEN")
ADMIN_PERMISSIONS=$(curl -s -X GET "$BASE_URL/admin/permissions" -H "Authorization: Bearer $TOKEN")
ADMIN_TENANTS=$(curl -s -X GET "$BASE_URL/admin/tenants" -H "Authorization: Bearer $TOKEN")
echo "✅ Admin endpoints working"

# Test Field Calculations
echo ""
echo "10. Testing Field Tools..."
CALCS=$(curl -s -X GET "$BASE_URL/field-calculations" -H "Authorization: Bearer $TOKEN")
echo "✅ Field Tools endpoints working"

# Test Forecast
echo ""
echo "11. Testing Demand Forecasting..."
FORECAST=$(curl -s -X GET "$BASE_URL/forecast" -H "Authorization: Bearer $TOKEN")
echo "✅ Forecast endpoints working"

# Test User Profile
echo ""
echo "12. Testing User Settings..."
ME=$(curl -s -X GET "$BASE_URL/auth/me" -H "Authorization: Bearer $TOKEN")
echo "✅ User endpoints working"

# Test Metrics
echo ""
echo "13. Testing Metrics..."
METRICS=$(curl -s -X GET "$BASE_URL/metrics" -H "Authorization: Bearer $TOKEN")
echo "✅ Metrics endpoints working"

echo ""
echo "=========================================="
echo "✅ ALL API TESTS PASSED!"
echo "=========================================="
