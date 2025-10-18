# Optimization Patch Summary

Changes:
- Added `PrismaService` singleton. Replaced per-service `new PrismaClient()`.
- Added JWT middleware to attach `req.user` for tenant scoping.
- Set global prefix `/api` and safe SPA fallback. Added ValidationPipe.
- Fixed API paths to remove `:tenantId` in URL. Frontend now calls `/api/inventory/skus`.
- Implemented pagination and search for SKUs and POs.
- Removed N+1 from forecasting. Bulk-read ledgers. Upsert forecasts.
- Added Prisma indexes for tenant and time-based queries.

Apply:
1. Copy files from this zip into your repo, preserving paths.
2. Run `npx prisma generate` and `npx prisma migrate dev --name optimize_indexes`.
3. Restart the Nest app. Ensure `VITE_API_URL` points to `http://localhost:3000/api`.
