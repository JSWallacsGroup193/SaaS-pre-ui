import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class PurchasingService {
  constructor(private readonly prisma: PrismaService) {}

  async getPOs(tenantId: string, page = 1, pageSize = 50) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.purchaseOrder.findMany({
        where: { tenantId },
        include: { sku: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.purchaseOrder.count({ where: { tenantId } }),
    ]);
    return { items, total, page, pageSize };
  }

  async createPO(data: { tenantId: string; skuId: string; quantity: number }) {
    const poNumber = `PO-${Date.now()}`;
    return this.prisma.purchaseOrder.create({ 
      data: {
        ...data,
        poNumber,
      }
    });
  }

  async receivePO(id: string) {
    return this.prisma.purchaseOrder.update({ where: { id }, data: { status: 'RECEIVED', receivedAt: new Date() } });
  }
}
