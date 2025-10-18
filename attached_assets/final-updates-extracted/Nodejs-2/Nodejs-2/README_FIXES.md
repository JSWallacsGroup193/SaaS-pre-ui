
## CI and OpenAPI codegen
- CI workflow `.github/workflows/ci.yml` runs tests, generates OpenAPI and typed client.
- Generate locally:
  ```bash
  cd backend && npm run openapi:gen
  cd ../frontend && npm run api:gen
  ```
- Use `configureApi(token)` from `src/api/client-config.ts` to set base URL and auth for generated client.

## API versioning
- Global prefix is `/api/v1`.
- Swagger UI: `http://localhost:3000/api/v1/docs`

## Frontend generated client
- Wrapper at `src/api/client.ts` uses generated client if available, else falls back to axios.
- Set base URL via `frontend/.env.development` (`VITE_API_URL=/api/v1`).
