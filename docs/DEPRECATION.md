# API Deprecation Policy

## Current API Version
- **Stable**: `/api/v1` (recommended for all new integrations)
- **Status**: All endpoints documented in Swagger at `/api/v1/docs`

## Versioning Strategy

### Version Lifecycle
1. **Active Development**: New features added to current version
2. **Deprecation Notice**: 90 days warning before breaking changes
3. **Legacy Support**: Deprecated versions supported for 180 days
4. **Sunset**: Version removed after support period

### Breaking Changes
Breaking changes require a new API version (e.g., `/api/v2`). Examples:
- Removing required fields from responses
- Changing authentication methods
- Modifying endpoint URLs or HTTP methods
- Changing data types of existing fields

### Non-Breaking Changes
These can be added to existing versions:
- Adding new optional fields
- Adding new endpoints
- Adding new query parameters
- Improving performance

## Future Versioning

### Planned for v2 (When needed)
- Enhanced filtering and sorting across all endpoints
- GraphQL alternative for complex queries
- Webhook support for real-time updates
- Batch operations for bulk data changes

## Migration Guide

### From Legacy `/api` to `/api/v1`
If you're using the old `/api` prefix:
1. Update base URL from `/api` to `/api/v1`
2. No other changes required - endpoints remain the same
3. Legacy `/api` routes are no longer supported

## Deprecation Notices

### Current Deprecations
- None at this time

### Sunset Dates
- None at this time

## Stay Informed
- Check Swagger docs at `/api/v1/docs` for latest changes
- Review CHANGELOG for version updates
- Monitor deprecation notices in this file

## Contact
For questions about API changes or deprecation timeline, contact your development team.
