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
    const [items, total] = await this.prisma.$transaction([
      this.prisma.sKU.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.sKU.count({ where }),
    ]);
    return { items, total, page, pageSize };
  }

  async createSKU(data: { tenantId: string; name: string; description?: string; barcode?: string }) {
    return this.prisma.sKU.create({ data });
  }

  async getWarehouses(tenantId: string) {
    return this.prisma.warehouse.findMany({ where: { tenantId } });
  }

  async createWarehouse(data: { tenantId: string; name: string }) {
    return this.prisma.warehouse.create({ data });
  }

  async getBins(tenantId: string) {
    return this.prisma.bin.findMany({ where: { warehouse: { tenantId } }, include: { warehouse: true } });
  }

  async createBin(data: { warehouseId: string; name: string }) {
    return this.prisma.bin.create({ data });
  }
}
