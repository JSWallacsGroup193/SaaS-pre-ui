-- Handwritten baseline migration. Replace with `prisma migrate dev` if desired.
-- Requires: CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
DO $$ BEGIN
  CREATE TYPE "StockDirection" AS ENUM ('IN','OUT');
EXCEPTION WHEN duplicate_object THEN null END $$;

DO $$ BEGIN
  CREATE TYPE "POStatus" AS ENUM ('OPEN','RECEIVED','CANCELLED');
EXCEPTION WHEN duplicate_object THEN null END $$;

-- Tenants
CREATE TABLE IF NOT EXISTS "Tenant" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" TEXT UNIQUE NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Users
CREATE TABLE IF NOT EXISTS "User" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "tenantId" UUID NOT NULL REFERENCES "Tenant"("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- SKU
CREATE TABLE IF NOT EXISTS "SKU" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "tenantId" UUID NOT NULL REFERENCES "Tenant"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "barcode" TEXT UNIQUE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "SKU_tenant_idx" ON "SKU"("tenantId");

-- Warehouse
CREATE TABLE IF NOT EXISTS "Warehouse" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "tenantId" UUID NOT NULL REFERENCES "Tenant"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE ("tenantId","name")
);
CREATE INDEX IF NOT EXISTS "Warehouse_tenant_idx" ON "Warehouse"("tenantId");

-- Bin
CREATE TABLE IF NOT EXISTS "Bin" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "warehouseId" UUID NOT NULL REFERENCES "Warehouse"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE ("warehouseId","name")
);

-- StockLedger
CREATE TABLE IF NOT EXISTS "StockLedger" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "skuId" UUID NOT NULL REFERENCES "SKU"("id") ON DELETE CASCADE,
  "binId" UUID NOT NULL REFERENCES "Bin"("id") ON DELETE CASCADE,
  "tenantId" UUID NOT NULL REFERENCES "Tenant"("id") ON DELETE CASCADE,
  "quantity" INTEGER NOT NULL,
  "direction" "StockDirection" NOT NULL,
  "note" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "StockLedger_sku_idx" ON "StockLedger"("skuId");
CREATE INDEX IF NOT EXISTS "StockLedger_tenant_idx" ON "StockLedger"("tenantId");
CREATE INDEX IF NOT EXISTS "StockLedger_bin_idx" ON "StockLedger"("binId");

-- PurchaseOrder
CREATE TABLE IF NOT EXISTS "PurchaseOrder" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "tenantId" UUID NOT NULL REFERENCES "Tenant"("id") ON DELETE CASCADE,
  "skuId" UUID NOT NULL REFERENCES "SKU"("id") ON DELETE CASCADE,
  "quantity" INTEGER NOT NULL,
  "status" "POStatus" NOT NULL DEFAULT 'OPEN',
  "receivedAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "PurchaseOrder_tenant_idx" ON "PurchaseOrder"("tenantId");
CREATE INDEX IF NOT EXISTS "PurchaseOrder_sku_idx" ON "PurchaseOrder"("skuId");
CREATE INDEX IF NOT EXISTS "PurchaseOrder_status_tenant_idx" ON "PurchaseOrder"("status","tenantId");


-- OnHandCache
CREATE TABLE IF NOT EXISTS "OnHandCache" (
  "tenantId" UUID NOT NULL,
  "skuId" UUID NOT NULL,
  "onHand" INTEGER NOT NULL DEFAULT 0,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("tenantId","skuId"),
  FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE,
  FOREIGN KEY ("skuId") REFERENCES "SKU"("id") ON DELETE CASCADE
);
