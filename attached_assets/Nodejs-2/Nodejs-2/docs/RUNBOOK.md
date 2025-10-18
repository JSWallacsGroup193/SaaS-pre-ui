# Runbook
- Health: GET /api/v1/health
- Metrics: GET /api/v1/metrics (Prometheus format)
- Logs: include `x-request-id` for correlation
- Restart queue workers if jobs back up
- Regenerate OpenAPI and client on API changes
