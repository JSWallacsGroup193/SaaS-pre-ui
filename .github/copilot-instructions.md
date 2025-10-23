# AI Coding Assistant Instructions

## Project Overview
This is a multi-tenant SaaS HVAC management system with a NestJS backend and React frontend. The system handles work orders, CRM, inventory, dispatch, and field service operations.

## Architecture

### Backend (NestJS)
- Located in `/backend`
- Multi-tenant architecture with tenant isolation via JWT middleware
- Core modules:
  - Work Orders (`/modules/workorder`)
  - CRM (`/modules/crm` and `/modules/enhanced-crm`)
  - Inventory (`/modules/inventory`)
  - Dispatch (`/modules/dispatch`)
  - Field Tools (`/modules/field-calculation`)
  - Service Catalog (`/modules/service-catalog`)

### Frontend (React + Vite)
- Located in `/frontend`
- Uses React Router for navigation
- Tailwind CSS for styling (dark mode supported)
- Components organized by feature in `/src/components`
- State management uses custom hooks and contexts
- Protected routes require authentication

## Key Development Patterns

### Authentication & Authorization
- JWT-based auth with middleware in `backend/src/middleware/jwt.middleware.ts`
- Role-based access control (SUPER_ADMIN, ADMIN, MANAGER, TECHNICIAN, USER)
- Multi-tenancy enforced at database level via `tenantId`

### Database (Prisma)
- Rich schema with 69+ tables covering all business domains
- All tables require `tenantId` for multi-tenancy
- Soft deletes implemented via `deletedAt` timestamps
- Example schema patterns in `backend/prisma/schema.prisma`

### API Development
- NestJS modules follow feature-based organization
- Controllers handle tenant isolation via decorators
- Standard RESTful endpoints with OpenAPI docs

### Component Development
- React components use functional style with hooks
- Route protection via `ProtectedRoute` component
- Shared UI components in `frontend/src/components/ui`
- Dashboard components support dark mode

## Common Tasks

### Adding New Features
1. Create backend module in `backend/src/modules/{feature}`
2. Add Prisma schema changes if needed
3. Create frontend components in `frontend/src/components/{feature}`
4. Add routes in `frontend/src/App.tsx`

### Database Migrations
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name {migration_name}
```

### Running the Project
- Backend: `cd backend && npm run start:dev`
- Frontend: `cd frontend && npm run dev`
- Full stack: `./dev.sh`

### Testing
- Backend uses Jest
- Run tests with: `cd backend && npm test`
- Test tenant isolation with: `npm run test:tenant-isolation`

## Important Conventions

### Security
- Always include tenant isolation in API endpoints
- Use RBAC via built-in role system
- Validate all user input at controller level

### Error Handling
- Backend uses NestJS exception filters
- Frontend uses ErrorBoundary component
- Always preserve tenant context in error states

### State Management
- Use React Context for global state
- AuthContext handles user/tenant session
- Custom hooks preferred over direct state management

Remember to maintain tenant isolation and RBAC at all layers when implementing new features.

## Authentication Flow

### Backend JWT Implementation
```typescript
// jwt.middleware.ts - JWT extraction and tenant context
@Injectable()
class JwtAttachMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const auth = req.headers['authorization'];
    if (auth?.startsWith('Bearer ')) {
      const token = auth.slice('Bearer '.length);
      const payload = this.jwt.verify(token);
      (req as any).user = { userId: payload.sub, tenantId: payload.tenantId };
    }
    next();
  }
}
```

### Frontend Auth Context
- Global auth state via `AuthContext` in `frontend/src/contexts/AuthContext.tsx`
- Handles token storage, user profile, and tenant context
- All authenticated requests must include JWT token
- Example usage:
```typescript
const { user, token, isAuthenticated, login, logout } = useAuth();
```

## Code Organization

### Backend Structure
```
backend/
  ├── src/
  │   ├── modules/           # Feature modules
  │   ├── common/            # Shared services/utilities
  │   ├── middleware/        # Global middleware
  │   └── queue/            # Background job processing
  └── prisma/
      └── schema.prisma     # Database schema
```

### Frontend Structure
```
frontend/
  ├── src/
  │   ├── components/       # React components by feature
  │   ├── contexts/        # React contexts
  │   ├── hooks/          # Custom hooks
  │   ├── pages/         # Route components
  │   └── api/          # API client code
  └── app/
      └── globals.css   # Global styles
```

## Development Workflow

### Feature Implementation Checklist
1. [ ] Update Prisma schema if needed
2. [ ] Generate migrations and update client
3. [ ] Create/update backend module
4. [ ] Add controller with tenant isolation
5. [ ] Create frontend components
6. [ ] Update routing
7. [ ] Add integration tests
8. [ ] Test tenant isolation

### Best Practices
- Always use repository's eslint/prettier configuration
- Follow existing patterns for error handling
- Use provided UI components from `components/ui`
- Write integration tests for tenant isolation
- Document complex business logic
- Consider mobile responsiveness (app uses `use-mobile` hook)

## Debugging Tips
- Check tenant context in JWT payload
- Verify RBAC permissions in seed scripts
- Use ErrorBoundary for component error handling
- Monitor background jobs in queue system
- Test cross-tenant data isolation