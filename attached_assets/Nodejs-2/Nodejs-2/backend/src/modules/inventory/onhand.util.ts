import { PrismaClient } from '@prisma/client';

export async function updateOnHandCache(prisma: PrismaClient, tenantId: string, skuId: string) {
  const ins = await prisma.stockLedger.aggregate({ where: { tenantId, skuId, direction: 'IN' }, _sum: { quantity: true } });
  const outs = await prisma.stockLedger.aggregate({ where: { tenantId, skuId, direction: 'OUT' }, _sum: { quantity: true } });
  const onHand = (ins._sum.quantity || 0) - (outs._sum.quantity || 0);
  await prisma.$executeRawUnsafe(`
    INSERT INTO "OnHandCache" ("tenantId","skuId","onHand","updatedAt")
    VALUES ($1,$2,$3,NOW())
    ON CONFLICT ("tenantId","skuId")
    DO UPDATE SET "onHand" = EXCLUDED."onHand", "updatedAt" = NOW();
  `, tenantId, skuId, onHand);
  return onHand;
}
