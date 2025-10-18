import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PurchasingService {
  async getPOs(tenantId: string) {
    return prisma.purchaseOrder.findMany({ where: { tenantId }, include: { sku: true } });
  }

  async createPO(data: { tenantId: string; skuId: string; quantity: number }) {
    return prisma.purchaseOrder.create({ data });
  }

  async receivePO(id: string) {
    return prisma.purchaseOrder.update({ where: { id }, data: { status: 'RECEIVED', receivedAt: new Date() } });
  }
}
