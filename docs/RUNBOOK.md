# HVAC Management System Runbook

## Health & Monitoring

### Health Check
- **Endpoint**: `GET /api/v1/health`
- **Expected Response**: `{ "status": "ok" }`
- **Use**: Kubernetes liveness/readiness probes, uptime monitoring

### Metrics
- **Endpoint**: `GET /api/v1/metrics`
- **Format**: JSON with process metrics (uptime, memory, Node version)
- **Use**: Application monitoring, performance tracking

### Request Tracing
- All requests include `x-request-id` header for correlation
- Check logs for specific request ID to trace issues

## Operations

### Restart Procedures
1. **Application Restart**: Use Replit workflow controls or `npm run dev`
2. **Database Issues**: Check DATABASE_URL env var, restart PostgreSQL if needed
3. **Queue Workers**: If background jobs back up, restart the queue module

### API Changes
When updating the API:
1. Run `cd backend && npm run openapi:gen` to regenerate OpenAPI spec
2. Run `cd frontend && npm run api:gen` to regenerate typed client
3. Update version in API documentation if breaking changes

### Common Issues

**Issue**: 401 Unauthorized errors
- **Fix**: Check JWT_SECRET environment variable, verify token expiration

**Issue**: CORS errors
- **Fix**: Check CORS_ORIGIN environment variable matches frontend URL

**Issue**: Database connection failures  
- **Fix**: Verify DATABASE_URL, check PostgreSQL service status

**Issue**: Slow inventory queries
- **Fix**: Check stock ledger size, consider adding database indexes

## Emergency Contacts
- Database: Use Replit Database pane for direct access
- Logs: Use `/api/v1/metrics` and workflow logs
- Rollback: Use Replit rollback feature if issues arise

## Deployment Checklist
- [ ] Run tests: `cd backend && npm test`
- [ ] Generate OpenAPI spec
- [ ] Update environment variables if needed
- [ ] Test health endpoint after deployment
- [ ] Verify database migrations applied
- [ ] Check metrics endpoint for errors
