import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './utils';

describe('Auth e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('registers and logs in', async () => {
    const email = `user_${Date.now()}@test.com`;
    const password = 'StrongP@ssw0rd';
    const tenantId = 'tenant-e2e';

    const reg = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({ email, password, tenantId })
      .expect(201);

    expect(reg.body).toHaveProperty('userId');
    expect(reg.body).toHaveProperty('tenantId', tenantId);

    const login = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email, password })
      .expect(201);

    expect(login.body).toHaveProperty('access_token');
  });
});
