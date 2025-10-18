# Prisma migrations

Run locally to create and apply the initial migration from the current schema:

```bash
cd backend
npx prisma migrate dev -n init_schema
# commit the generated migrations/*
```

In CI or prod, use:
```bash
npm run db:deploy
```
