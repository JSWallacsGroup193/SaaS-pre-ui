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

