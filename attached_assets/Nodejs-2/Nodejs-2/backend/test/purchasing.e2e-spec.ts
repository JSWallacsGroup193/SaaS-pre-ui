import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createTestApp } from './utils';

describe('Purchasing e2e', () => {
  const prisma = new PrismaClient();
  let app: INestApplication;
  beforeAll(async () => { app = await createTestApp(); });
  afterAll(async () => { await app.close(); });

  async function registerAndLogin() {
    const email = `po_${Date.now()}@test.com`;
    const password = 'StrongP@ssw0rd';
    const tenantId = 'tenant-po';
    await request(app.getHttpServer()).post('/api/v1/auth/register').send({ email, password, tenantId }).expect(201);
    const login = await request(app.getHttpServer()).post('/api/v1/auth/login').send({ email, password }).expect(201);
    return { token: login.body.access_token, tenantId };
  }

  it('creates a PO and marks received', async () => {
    const { token, tenantId } = await registerAndLogin();

    // Create SKU
    const skuRes = await request(app.getHttpServer())
      .post('/api/v1/inventory/skus')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'PO Test SKU', description: 'for PO', barcode: 'PO-123' })
      .expect(201);

    const skuId = skuRes.body.id;
    expect(skuId).toBeDefined();

    // Create PO
    const poCreate = await request(app.getHttpServer())
      .post('/api/v1/purchasing')
      .set('Authorization', `Bearer ${token}`)
      .send({ tenantId, skuId, quantity: 5 })
      .expect(201);

    const poId = poCreate.body.id;
    expect(poCreate.body).toMatchObject({ tenantId, skuId, quantity: 5 });

    // List POs paginated
    const list = await request(app.getHttpServer())
      .get('/api/v1/purchasing?page=1&pageSize=10')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(list.body).toHaveProperty('items');
    expect(list.body.items.find((x: any) => x.id === poId)).toBeTruthy();

    // Receive PO
      const before = await prisma.stockLedger.count({ where: { tenantId, skuId } });
    const rec = await request(app.getHttpServer())
      .put(`/api/v1/purchasing/${poId}/receive`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(rec.body).toHaveProperty('status', 'RECEIVED');
      const after = await prisma.stockLedger.count({ where: { tenantId, skuId } });
      expect(after).toBeGreaterThan(before);
    expect(rec.body.receivedAt).toBeTruthy();

    // NOTE: Current implementation does not adjust inventory on receive.
    // Add stock adjustments in service if needed, then assert here.
  });
});
