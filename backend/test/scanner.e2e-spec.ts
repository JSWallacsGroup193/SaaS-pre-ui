import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ScannerModule } from '../src/modules/scanner/module';
import { PrismaService } from '../src/common/prisma.service';

describe('ScannerController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ScannerModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/scanner/:barcode (GET) - should find SKU by exact barcode match', async () => {
    // Create test SKU
    const testTenantId = 'test-tenant-' + Date.now();
    const sku = await prisma.sKU.create({
      data: {
        tenantId: testTenantId,
        name: 'Test Filter',
        barcode: 'TEST123',
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/scanner/TEST123?tenantId=${testTenantId}`)
      .expect(200);

    expect(response.body.found).toBe(true);
    expect(response.body.sku.id).toBe(sku.id);

    // Cleanup
    await prisma.sKU.delete({ where: { id: sku.id } });
  });

  it('/scanner/:barcode (GET) - should find SKU by name match', async () => {
    const testTenantId = 'test-tenant-' + Date.now();
    const sku = await prisma.sKU.create({
      data: {
        tenantId: testTenantId,
        name: 'HVAC Filter MERV-13',
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/scanner/HVAC%20Filter%20MERV-13?tenantId=${testTenantId}`)
      .expect(200);

    expect(response.body.found).toBe(true);
    expect(response.body.sku.id).toBe(sku.id);

    // Cleanup
    await prisma.sKU.delete({ where: { id: sku.id } });
  });

  it('/scanner/:barcode (GET) - should use fuzzy matching on description', async () => {
    const testTenantId = 'test-tenant-' + Date.now();
    const sku = await prisma.sKU.create({
      data: {
        tenantId: testTenantId,
        name: 'Filter A',
        description: 'High-efficiency MERV-13 filter',
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/scanner/MERV-13?tenantId=${testTenantId}`)
      .expect(200);

    expect(response.body.found).toBe(true);
    expect(response.body.sku.id).toBe(sku.id);

    // Cleanup
    await prisma.sKU.delete({ where: { id: sku.id } });
  });

  it('/scanner/:barcode (GET) - should return not found when no match', async () => {
    const testTenantId = 'test-tenant-' + Date.now();

    const response = await request(app.getHttpServer())
      .get(`/scanner/NONEXISTENT?tenantId=${testTenantId}`)
      .expect(200);

    expect(response.body.found).toBe(false);
  });
});
