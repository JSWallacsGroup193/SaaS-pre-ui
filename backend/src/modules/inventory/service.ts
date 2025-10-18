import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class InventoryService {
  async getSKUs(tenantId: string) {
    return prisma.sKU.findMany({ where: { tenantId } });
  }

  async createSKU(data: { tenantId: string; name: string; description?: string; barcode?: string }) {
    return prisma.sKU.create({ data });
  }

  async getStockLedger(tenantId: string) {
    return prisma.stockLedger.findMany({
      where: { tenantId },
      include: { sku: true, bin: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createLedgerEntry(data: { tenantId: string; skuId: string; binId: string; quantity: number; direction: 'IN' | 'OUT'; note?: string }) {
    return prisma.stockLedger.create({ data });
  }

  async getWarehouses(tenantId: string) {
    return prisma.warehouse.findMany({ where: { tenantId } });
  }

  async createWarehouse(data: { tenantId: string; name: string }) {
    return prisma.warehouse.create({ data });
  }

  async getBins(tenantId: string) {
    return prisma.bin.findMany({ where: { warehouse: { tenantId } }, include: { warehouse: true } });
  }

  async createBin(data: { warehouseId: string; name: string }) {
    return prisma.bin.create({ data });
  }
}
