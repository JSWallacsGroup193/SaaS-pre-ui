import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './utils';

describe('Scanner e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  async function registerAndLogin() {
    const email = `scan_${Date.now()}@test.com`;
    const password = 'StrongP@ssw0rd';
    const tenantId = 'tenant-scan';
    await request(app.getHttpServer()).post('/api/v1/auth/register').send({ email, password, tenantId }).expect(201);
    const login = await request(app.getHttpServer()).post('/api/v1/auth/login').send({ email, password }).expect(201);
    return { token: login.body.access_token, tenantId };
  }

  it('finds SKU by barcode', async () => {
    const { token } = await registerAndLogin();

    // Create SKU with barcode
    const sku = await request(app.getHttpServer())
      .post('/api/v1/inventory/skus')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'ScanTest', description: 'Scanner SKU', barcode: 'BAR123' })
      .expect(201);

    expect(sku.body).toHaveProperty('id');

    // Scan by barcode
    const scan = await request(app.getHttpServer())
      .get('/api/v1/scanner/BAR123')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(scan.body).toMatchObject({ found: true });
    expect(scan.body.sku).toHaveProperty('barcode', 'BAR123');
  });
});
