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
    return this.prisma.purchaseOrder.create({ data });
  }

  async receivePO(id: string) {
  // Wrap in transaction to ensure atomicity
  return this.prisma.$transaction(async (tx) => {
    const po = await tx.purchaseOrder.findUnique({ where: { id } });
    if (!po) throw new Error('PO not found');
    if (po.status === 'RECEIVED') return po;

    // Ensure a default warehouse and bin exist for tenant
    let warehouse = await tx.warehouse.findFirst({ where: { tenantId: po.tenantId, name: 'Main' } });
    if (!warehouse) {
      warehouse = await tx.warehouse.create({ data: { tenantId: po.tenantId, name: 'Main' } });
    }
    let bin = await tx.bin.findFirst({ where: { warehouseId: warehouse.id, name: 'Receiving' } });
    if (!bin) {
      bin = await tx.bin.create({ data: { warehouseId: warehouse.id, name: 'Receiving' } });
    }

    // Create stock ledger entry for the receipt
    await tx.stockLedger.create({
      data: {
        tenantId: po.tenantId,
        skuId: po.skuId,
        binId: bin.id,
        quantity: po.quantity,
        direction: 'IN',
        note: 'PO received',
      },
    });

    // Update PO status
    const updated = await tx.purchaseOrder.update({
      where: { id },
      data: { status: 'RECEIVED', receivedAt: new Date() },
    });

    return updated;
  });
}
, data: { status: 'RECEIVED', receivedAt: new Date() } });
  }
}
