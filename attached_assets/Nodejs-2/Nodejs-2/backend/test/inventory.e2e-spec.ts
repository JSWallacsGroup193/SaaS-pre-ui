import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './utils';

async function registerAndLogin(app: INestApplication) {
  const email = `inv_${Date.now()}@test.com`;
  const password = 'StrongP@ssw0rd';
  const tenantId = 'tenant-inv';
  await request(app.getHttpServer()).post('/api/v1/auth/register').send({ email, password, tenantId }).expect(201);
  const login = await request(app.getHttpServer()).post('/api/v1/auth/login').send({ email, password }).expect(201);
  return { token: login.body.access_token, tenantId };
}

describe('Inventory e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates and lists warehouses', async () => {
    const { token, tenantId } = await registerAndLogin(app);

    const created = await request(app.getHttpServer())
      .post('/api/v1/inventory/warehouses')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Main' })
      .expect(201);

    expect(created.body).toMatchObject({ name: 'Main', tenantId });

    const list = await request(app.getHttpServer())
      .get('/api/v1/inventory/warehouses')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(list.body)).toBe(true);
    expect(list.body.find((w: any)=> w.name === 'Main')).toBeTruthy();
  });

  it('creates SKU and queries with pagination', async () => {
    const { token } = await registerAndLogin(app);

    await request(app.getHttpServer())
      .post('/api/v1/inventory/skus')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Filter MERV-13', description: '20x25x1' })
      .expect(201);

    const page1 = await request(app.getHttpServer())
      .get('/api/v1/inventory/skus?page=1&pageSize=10')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(page1.body).toHaveProperty('items');
    expect(page1.body).toHaveProperty('total');
    expect(page1.body.items.length).toBeGreaterThanOrEqual(1);
  });
});
