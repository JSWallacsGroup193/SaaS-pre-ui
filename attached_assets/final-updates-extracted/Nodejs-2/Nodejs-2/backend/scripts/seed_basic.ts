import { PrismaClient, WorkOrderStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Tenant
  const tenant = await prisma.tenant.upsert({
    where: { name: 'HVAC Inc.' },
    update: {},
    create: { name: 'HVAC Inc.' },
  });

  // Admin user
  const email = 'admin@hvac.com';
  const password = 'password123';
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: hash, tenantId: tenant.id },
  });

  // Warehouses
  const wh = await prisma.warehouse.upsert({
    where: { tenantId_name: { tenantId: tenant.id, name: 'Main' } },
    update: {},
    create: { tenantId: tenant.id, name: 'Main' },
  });

  // Bins
  await prisma.bin.upsert({
    where: { warehouseId_name: { warehouseId: wh.id, name: 'A1' } },
    update: {},
    create: { warehouseId: wh.id, name: 'A1' },
  });

  // SKUs
  const sku1 = await prisma.sku.upsert({
    where: { tenantId_name: { tenantId: tenant.id, name: 'Filter MERV-13' } },
    update: {},
    create: { tenantId: tenant.id, name: 'Filter MERV-13', description: '20x25x1', barcode: '123456789012' },
  });
  await prisma.sku.upsert({
    where: { tenantId_name: { tenantId: tenant.id, name: 'Thermostat T100' } },
    update: {},
    create: { tenantId: tenant.id, name: 'Thermostat T100', description: 'WiFi Thermostat', barcode: '987654321098' },
  });

  // Work Orders
  await prisma.workOrder.upsert({
    where: { id: 'seed-wo-1' },
    update: {},
    create: { id: 'seed-wo-1', tenantId: tenant.id, title: 'Replace filter', status: WorkOrderStatus.OPEN, technician: 'Alex' },
  });
  await prisma.workOrder.upsert({
    where: { id: 'seed-wo-2' },
    update: {},
    create: { id: 'seed-wo-2', tenantId: tenant.id, title: 'Install thermostat', status: WorkOrderStatus.SCHEDULED, technician: 'Sam' },
  });

  console.log('🌱 Basic seed complete');
  console.log('Tenant:', tenant.name);
}

main().finally(() => prisma.$disconnect());
