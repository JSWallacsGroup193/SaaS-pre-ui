## Testing and Docs

- Swagger UI: http://localhost:3000/api/docs (Bearer auth supported; click Authorize and paste JWT)
- OpenAPI JSON: http://localhost:3000/api-json

### Run tests
Ensure a PostgreSQL instance is available and `DATABASE_URL` is set.
Tests create and drop an isolated schema automatically.

```bash
cd backend
npm i
npx prisma generate
npm test
```
