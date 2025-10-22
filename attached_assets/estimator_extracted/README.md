# HVAC Estimator Module (Replit-Ready)

This module integrates an AI-powered HVAC cost estimator into a NestJS + Prisma backend.

## 🗂 Structure
```
backend/
  └── src/modules/estimator/
      ├── estimator.controller.ts
      ├── estimator.service.ts
      ├── estimator.module.ts
      ├── aiEstimateValidator.ts
      └── dto/
          ├── create-estimate.dto.ts
          └── estimate-response.dto.ts
prompts/
  └── AI_Cost_Estimator_Prompt.md
.env.example
README.md
```

## 🛠 Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Fill in actual values
```

3. Run dev server:
```bash
npm run start:dev
```

## 🔐 Endpoint

```
POST /api/v1/estimator/calculate
Authorization: Bearer <JWT>
```

## 📦 Notes

- Uses OpenAI GPT-4 via chatCompletion
- Requires tenantId extracted from JWT
- Saves responses to `Estimate` model in PostgreSQL