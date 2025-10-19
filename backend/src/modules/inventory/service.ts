import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getSKUs(tenantId: string, q?: string, page = 1, pageSize = 50) {
    const where: any = { tenantId };
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { barcode: { contains: q, mode: 'insensitive' } },
      ];
    }
    let [items, total] = await this.prisma.$transaction([
      this.prisma.sKU.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.sKU.count({ where }),
    ]);
    
    // compute on-hand per SKU using stock ledger sums
    const skuIds = items.map(i => i.id);
    if (skuIds.length > 0) {
      const ins = await this.prisma.stockLedger.groupBy({
        by: ['skuId'],
        where: { tenantId, skuId: { in: skuIds }, direction: 'IN' },
        _sum: { quantity: true },
      });
      const outs = await this.prisma.stockLedger.groupBy({
        by: ['skuId'],
        where: { tenantId, skuId: { in: skuIds }, direction: 'OUT' },
        _sum: { quantity: true },
      });
      const sumIn = Object.fromEntries(ins.map(r => [r.skuId, r._sum.quantity || 0]));
      const sumOut = Object.fromEntries(outs.map(r => [r.skuId, r._sum.quantity || 0]));
      items = items.map(i => ({
        ...i,
        onHand: (sumIn[i.id] || 0) - (sumOut[i.id] || 0),
      }));
    }
    return { items, total, page, pageSize };
  }

  async createSKU(data: { tenantId: string; name: string; description?: string; barcode?: string }) {
    const sku = `SKU-${Date.now()}`;
    return this.prisma.sKU.create({ 
      data: {
        ...data,
        sku,
      }
    });
  }

  async getWarehouses(tenantId: string) {
    return this.prisma.warehouse.findMany({ where: { tenantId } });
  }

  async createWarehouse(data: { tenantId: string; name: string }) {
    const code = `WH-${Date.now()}`;
    return this.prisma.warehouse.create({ 
      data: {
        ...data,
        code,
      }
    });
  }

  async getBins(tenantId: string) {
    return this.prisma.bin.findMany({ where: { warehouse: { tenantId } }, include: { warehouse: true } });
  }

  async createBin(data: { warehouseId: string; name: string }) {
    return this.prisma.bin.create({ data });
  }

  async getOnHand(tenantId: string, skuId: string) {
    const [ins, outs] = await Promise.all([
      this.prisma.stockLedger.aggregate({ where: { tenantId, skuId, direction: 'IN' }, _sum: { quantity: true } }),
      this.prisma.stockLedger.aggregate({ where: { tenantId, skuId, direction: 'OUT' }, _sum: { quantity: true } }),
    ]);
    const onHand = (ins._sum.quantity || 0) - (outs._sum.quantity || 0);
    return { onHand };
  }
}
