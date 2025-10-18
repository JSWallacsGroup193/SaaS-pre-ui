# HVAC Monorepo

Monorepo with NestJS backend and React + Vite frontend.

## Quick start
```bash
# Start Postgres
docker compose -f docker-compose.dev.yml up -d

# Backend
cd backend
cp .env.example .env
# set DATABASE_URL and JWT_SECRET
npm i
npx prisma generate
npx prisma db push
npm run seed:basic
npm run start:dev    # http://localhost:3000/api/v1

# Frontend
cd ../frontend
cp .env.development .env.local  # optional
npm i
npm run api:gen                 # generate typed API client from backend/openapi.json
npm run dev                     # http://localhost:5173
```

## API
- Global prefix: `/api/v1`
- Docs: `/api/v1/docs` and `/api-json`
- Health: `/api/v1/health`
- Auth: `/api/v1/auth/register`, `/api/v1/auth/login`
- Inventory: `/api/v1/inventory/*`
- Work Orders: `/api/v1/work-orders/*`
- Dispatch: `/api/v1/dispatch/*`
- Purchasing: `/api/v1/purchasing/*`
- Scanner: `/api/v1/scanner/:barcode`
- Labels: `/api/v1/labels/:skuId`

## Frontend
- Uses generated client if present, else `fetch` fallback in `src/api/client.ts`.
- Token is read from `localStorage.token` and set as Bearer automatically.
- Vite proxies `/api/v1` to `http://localhost:3000` in dev.

## Tests
- Jest + Prisma with ephemeral schemas.
- Run: `cd backend && npm test`

## CI
- GitHub Actions `ci.yml` runs tests, generates OpenAPI, generates typed client, typechecks, and checks for spec drift.

## Security
- Helmet enabled.
- CORS allowlist from `CORS_ORIGIN` env.
- Throttling: login and register endpoints use rate limits.


## OpenAPI and client regeneration
Run locally to refresh `backend/openapi.json` and the typed client:
```bash
cd backend && npm run openapi:gen
cd ../frontend && npm run api:gen
```
CI enforces drift; commits should include refreshed spec and client.


## Database migrations
Use Prisma Migrate instead of `db push` for team workflows.
- Dev: `npm run db:migrate` inside `backend`.
- Prod/CI: `npm run db:deploy`.
Commit the generated `backend/prisma/migrations/*` files.
