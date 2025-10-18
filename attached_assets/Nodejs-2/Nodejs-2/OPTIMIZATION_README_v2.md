
# Optimization Patch v2

Adds:
- ConfigModule and JWT secret via env (`JWT_SECRET`).
- Throttling via `@nestjs/throttler` (120 req/min default).
- Swagger docs at `/api/docs` with bearer auth.
- DTO validation for SKUs and POs. Global ValidationPipe on.
- Frontend axios 401 redirection.

Apply:
1. Copy files, then install: `npm i @nestjs/config @nestjs/throttler @nestjs/swagger swagger-ui-express` in backend.
2. Ensure `.env` contains `JWT_SECRET=change-me`.
3. Restart backend. Open `/api/docs` to verify.
