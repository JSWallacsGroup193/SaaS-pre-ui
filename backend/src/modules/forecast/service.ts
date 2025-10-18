import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ForecastService {
  async runForecastJob(tenantId: string) {
    const SKUs = await prisma.sKU.findMany({ where: { tenantId } });

    for (const sku of SKUs) {
      const ledger = await prisma.stockLedger.findMany({
        where: { skuId: sku.id },
        orderBy: { createdAt: 'desc' },
        take: 30,
      });

      const totalOut = ledger
        .filter(e => e.direction === 'OUT')
        .reduce((acc, cur) => acc + cur.quantity, 0);
      const avgDailyDemand = totalOut / 30;
      const leadTime = 7;
      const safetyFactor = 1.5;
      const reorderPoint = avgDailyDemand * leadTime * safetyFactor;
      const suggestedOrderQty = Math.ceil(reorderPoint * 1.25);

      await prisma.forecast.upsert({
        where: {
          tenantId_skuId: {
            tenantId,
            skuId: sku.id,
          },
        },
        update: {
          avgDailyDemand,
          leadTimeDays: leadTime,
          safetyFactor,
          reorderPoint,
          suggestedOrderQty,
        },
        create: {
          tenantId,
          skuId: sku.id,
          avgDailyDemand,
          leadTimeDays: leadTime,
          safetyFactor,
          reorderPoint,
          suggestedOrderQty,
        },
      });
    }
  }

  async getForecasts(tenantId: string) {
    return prisma.forecast.findMany({ where: { tenantId }, include: { sku: true } });
  }
}
