# Service Catalog & Pricebook Implementation Prompt

## Feature Overview
Implement a comprehensive Service Catalog and Pricebook management system for OpsNex that allows users to manage standardized services, labor rates, and service bundles. This will streamline work order creation, ensure pricing consistency, and enable professional quote generation.

### Three Pricing Models Supported:
1. **Flat Rate** - Fixed price for the service (e.g., "AC Tune-Up: $149.99")
2. **Hourly** - Price based on hours worked at specified labor rate (e.g., "Diagnostic: $85/hr")
3. **Time and Material** - Combination of labor hours + material costs (e.g., "Repair: Labor + Parts")

---

## Database Schema Implementation

### Location: `backend/prisma/schema.prisma`

Add the following models to the Prisma schema:

```prisma
// ============================================================================
// SERVICE CATALOG & PRICEBOOK
// ============================================================================

// Service Catalog - Master list of services offered
model ServiceCatalog {
  id                String   @id @default(uuid())
  tenantId          String
  
  // Basic Info
  serviceCode       String   @unique  // e.g., "AC-TUNE-UP", "FURN-REPAIR"
  serviceName       String              // e.g., "Air Conditioner Tune-Up"
  category          String              // e.g., "Maintenance", "Repair", "Installation"
  subcategory       String?             // e.g., "AC", "Furnace", "Duct Work"
  description       String?
  
  // Pricing
  pricingType       String   @default("flat_rate") // "flat_rate", "hourly", "time_and_material"
  basePrice         Decimal  @default(0) @db.Decimal(10,2)
  minPrice          Decimal? @db.Decimal(10,2)
  maxPrice          Decimal? @db.Decimal(10,2)
  
  // Labor
  estimatedHours    Decimal? @db.Decimal(5,2)
  laborRateOverride Decimal? @db.Decimal(10,2)  // Override default labor rate
  skillLevelRequired String? // "apprentice", "journeyman", "master"
  
  // Service Details
  durationMinutes   Int?     // Estimated service duration
  warrantyDays      Int?     // Standard warranty period
  requiresPermit    Boolean  @default(false)
  isEmergency       Boolean  @default(false)
  
  // Parts/Materials
  includedParts     Json?    // Array of SKU IDs included in base price
  recommendedParts  Json?    // Array of commonly needed additional parts
  
  // Availability
  isActive          Boolean  @default(true)
  isSeasonalService Boolean  @default(false)
  availableSeasons  String[] // ["spring", "summer", "fall", "winter"]
  
  // Metadata
  internalNotes     String?
  customerFacingNotes String?
  displayOrder      Int      @default(0)
  
  createdBy         String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt @default(now())
  deletedAt         DateTime?
  
  // Relations
  tenant            Tenant   @relation(fields: [tenantId], references: [id])
  workOrderLineItems WorkOrderLineItem[]
  bundleItems       ServiceBundleItem[]
  
  @@index([tenantId])
  @@index([serviceCode])
  @@index([category])
  @@index([subcategory])
  @@index([isActive])
}

// Service Bundles - Package multiple services together
model ServiceBundle {
  id              String   @id @default(uuid())
  tenantId        String
  
  bundleCode      String   @unique
  bundleName      String
  description     String?
  
  category        String?
  
  // Pricing
  bundlePrice     Decimal  @db.Decimal(10,2)
  regularPrice    Decimal  @db.Decimal(10,2) // Sum of individual services
  savings         Decimal  @db.Decimal(10,2) // Calculated discount
  savingsPercent  Decimal  @db.Decimal(5,2)
  
  // Availability
  isActive        Boolean  @default(true)
  validFrom       DateTime?
  validUntil      DateTime?
  
  // Marketing
  isPromotional   Boolean  @default(false)
  displayOrder    Int      @default(0)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt @default(now())
  deletedAt       DateTime?
  
  // Relations
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  items           ServiceBundleItem[]
  
  @@index([tenantId])
  @@index([bundleCode])
  @@index([isActive])
}

// Service Bundle Items - Services included in bundles
model ServiceBundleItem {
  id              String   @id @default(uuid())
  bundleId        String
  serviceId       String
  
  quantity        Int      @default(1)
  displayOrder    Int      @default(0)
  
  bundle          ServiceBundle  @relation(fields: [bundleId], references: [id], onDelete: Cascade)
  service         ServiceCatalog @relation(fields: [serviceId], references: [id])
  
  @@index([bundleId])
  @@index([serviceId])
}

// Labor Rates - Configurable hourly rates
model LaborRate {
  id              String   @id @default(uuid())
  tenantId        String
  
  rateName        String   // e.g., "Standard Rate", "Master Technician", "Emergency"
  rateType        String   // "regular", "overtime", "emergency", "weekend", "holiday"
  skillLevel      String?  // "apprentice", "journeyman", "master"
  
  hourlyRate      Decimal  @db.Decimal(10,2)
  
  // Time-based multipliers
  isDefault       Boolean  @default(false)
  afterHoursMultiplier Decimal? @db.Decimal(3,2)  // e.g., 1.5 for time-and-a-half
  
  // Availability
  isActive        Boolean  @default(true)
  effectiveFrom   DateTime?
  effectiveUntil  DateTime?
  
  description     String?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt @default(now())
  
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  
  @@index([tenantId])
  @@index([rateType])
  @@index([skillLevel])
  @@index([isActive])
  @@index([isDefault])
}

// Update Tenant model to include new relations
// Add to existing Tenant model relations:
// serviceCatalog        ServiceCatalog[]
// serviceBundles        ServiceBundle[]
// laborRates            LaborRate[]
```

### Migration Steps:
1. Add the models to `backend/prisma/schema.prisma`
2. Add the relations to the existing `Tenant` model
3. Add `serviceCatalog ServiceCatalog[]` to existing `WorkOrderLineItem` relation (already has `sku`)
4. Run `cd backend && npm run db:push` to apply schema changes
5. If there are warnings, use `npm run db:push --force` to force the migration

---

## Backend API Implementation

### 1. Create Service Catalog Module

**Location:** `backend/src/modules/service-catalog/`

**File Structure:**
```
backend/src/modules/service-catalog/
├── service-catalog.module.ts
├── service-catalog.controller.ts
├── service-catalog.service.ts
├── dto/
│   ├── create-service.dto.ts
│   ├── update-service.dto.ts
│   ├── create-bundle.dto.ts
│   ├── create-labor-rate.dto.ts
│   └── service-catalog-query.dto.ts
└── entities/
    ├── service-catalog.entity.ts
    ├── service-bundle.entity.ts
    └── labor-rate.entity.ts
```

### 2. Service Catalog Controller (`service-catalog.controller.ts`)

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantId } from '../../decorators/tenant-id.decorator';
import { ServiceCatalogService } from './service-catalog.service';
import { CreateServiceDto, UpdateServiceDto, CreateBundleDto, CreateLaborRateDto } from './dto';

@ApiTags('Service Catalog')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('service-catalog')
export class ServiceCatalogController {
  constructor(private readonly serviceCatalogService: ServiceCatalogService) {}

  // ========== SERVICES ==========
  
  @Get('services')
  @ApiOperation({ summary: 'Get all services in catalog' })
  async getServices(
    @TenantId() tenantId: string,
    @Query('category') category?: string,
    @Query('active') active?: boolean,
  ) {
    return this.serviceCatalogService.getServices(tenantId, { category, active });
  }

  @Get('services/:id')
  @ApiOperation({ summary: 'Get service by ID' })
  async getService(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.serviceCatalogService.getServiceById(tenantId, id);
  }

  @Post('services')
  @ApiOperation({ summary: 'Create new service' })
  async createService(@TenantId() tenantId: string, @Body() dto: CreateServiceDto) {
    return this.serviceCatalogService.createService(tenantId, dto);
  }

  @Put('services/:id')
  @ApiOperation({ summary: 'Update service' })
  async updateService(
    @TenantId() tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateServiceDto,
  ) {
    return this.serviceCatalogService.updateService(tenantId, id, dto);
  }

  @Delete('services/:id')
  @ApiOperation({ summary: 'Delete service' })
  async deleteService(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.serviceCatalogService.deleteService(tenantId, id);
  }

  // ========== SERVICE BUNDLES ==========
  
  @Get('bundles')
  @ApiOperation({ summary: 'Get all service bundles' })
  async getBundles(@TenantId() tenantId: string, @Query('active') active?: boolean) {
    return this.serviceCatalogService.getBundles(tenantId, { active });
  }

  @Get('bundles/:id')
  @ApiOperation({ summary: 'Get bundle by ID' })
  async getBundle(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.serviceCatalogService.getBundleById(tenantId, id);
  }

  @Post('bundles')
  @ApiOperation({ summary: 'Create service bundle' })
  async createBundle(@TenantId() tenantId: string, @Body() dto: CreateBundleDto) {
    return this.serviceCatalogService.createBundle(tenantId, dto);
  }

  @Put('bundles/:id')
  @ApiOperation({ summary: 'Update service bundle' })
  async updateBundle(
    @TenantId() tenantId: string,
    @Param('id') id: string,
    @Body() dto: CreateBundleDto,
  ) {
    return this.serviceCatalogService.updateBundle(tenantId, id, dto);
  }

  @Delete('bundles/:id')
  @ApiOperation({ summary: 'Delete service bundle' })
  async deleteBundle(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.serviceCatalogService.deleteBundle(tenantId, id);
  }

  // ========== LABOR RATES ==========
  
  @Get('labor-rates')
  @ApiOperation({ summary: 'Get all labor rates' })
  async getLaborRates(@TenantId() tenantId: string) {
    return this.serviceCatalogService.getLaborRates(tenantId);
  }

  @Post('labor-rates')
  @ApiOperation({ summary: 'Create labor rate' })
  async createLaborRate(@TenantId() tenantId: string, @Body() dto: CreateLaborRateDto) {
    return this.serviceCatalogService.createLaborRate(tenantId, dto);
  }

  @Put('labor-rates/:id')
  @ApiOperation({ summary: 'Update labor rate' })
  async updateLaborRate(
    @TenantId() tenantId: string,
    @Param('id') id: string,
    @Body() dto: CreateLaborRateDto,
  ) {
    return this.serviceCatalogService.updateLaborRate(tenantId, id, dto);
  }

  @Delete('labor-rates/:id')
  @ApiOperation({ summary: 'Delete labor rate' })
  async deleteLaborRate(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.serviceCatalogService.deleteLaborRate(tenantId, id);
  }
}
```

### 3. Service Catalog Service (`service-catalog.service.ts`)

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto, CreateBundleDto, CreateLaborRateDto } from './dto';

@Injectable()
export class ServiceCatalogService {
  constructor(private prisma: PrismaService) {}

  // ========== SERVICES ==========

  async getServices(tenantId: string, filters?: { category?: string; active?: boolean }) {
    return this.prisma.serviceCatalog.findMany({
      where: {
        tenantId,
        category: filters?.category,
        isActive: filters?.active,
        deletedAt: null,
      },
      orderBy: [{ displayOrder: 'asc' }, { serviceName: 'asc' }],
    });
  }

  async getServiceById(tenantId: string, id: string) {
    const service = await this.prisma.serviceCatalog.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async createService(tenantId: string, dto: CreateServiceDto) {
    return this.prisma.serviceCatalog.create({
      data: { ...dto, tenantId },
    });
  }

  async updateService(tenantId: string, id: string, dto: UpdateServiceDto) {
    await this.getServiceById(tenantId, id); // Verify exists
    return this.prisma.serviceCatalog.update({
      where: { id },
      data: dto,
    });
  }

  async deleteService(tenantId: string, id: string) {
    await this.getServiceById(tenantId, id);
    return this.prisma.serviceCatalog.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // ========== BUNDLES ==========

  async getBundles(tenantId: string, filters?: { active?: boolean }) {
    return this.prisma.serviceBundle.findMany({
      where: {
        tenantId,
        isActive: filters?.active,
        deletedAt: null,
      },
      include: {
        items: {
          include: {
            service: true,
          },
        },
      },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async getBundleById(tenantId: string, id: string) {
    const bundle = await this.prisma.serviceBundle.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: {
        items: {
          include: {
            service: true,
          },
        },
      },
    });
    if (!bundle) throw new NotFoundException('Bundle not found');
    return bundle;
  }

  async createBundle(tenantId: string, dto: CreateBundleDto) {
    const { items, ...bundleData } = dto;
    
    return this.prisma.serviceBundle.create({
      data: {
        ...bundleData,
        tenantId,
        items: {
          create: items.map((item) => ({
            serviceId: item.serviceId,
            quantity: item.quantity,
            displayOrder: item.displayOrder || 0,
          })),
        },
      },
      include: {
        items: {
          include: {
            service: true,
          },
        },
      },
    });
  }

  async updateBundle(tenantId: string, id: string, dto: CreateBundleDto) {
    await this.getBundleById(tenantId, id);
    const { items, ...bundleData } = dto;

    // Delete existing items and recreate
    await this.prisma.serviceBundleItem.deleteMany({ where: { bundleId: id } });

    return this.prisma.serviceBundle.update({
      where: { id },
      data: {
        ...bundleData,
        items: {
          create: items.map((item) => ({
            serviceId: item.serviceId,
            quantity: item.quantity,
            displayOrder: item.displayOrder || 0,
          })),
        },
      },
      include: {
        items: {
          include: {
            service: true,
          },
        },
      },
    });
  }

  async deleteBundle(tenantId: string, id: string) {
    await this.getBundleById(tenantId, id);
    return this.prisma.serviceBundle.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // ========== LABOR RATES ==========

  async getLaborRates(tenantId: string) {
    return this.prisma.laborRate.findMany({
      where: { tenantId, isActive: true },
      orderBy: [{ isDefault: 'desc' }, { hourlyRate: 'asc' }],
    });
  }

  async createLaborRate(tenantId: string, dto: CreateLaborRateDto) {
    // If setting as default, unset other defaults
    if (dto.isDefault) {
      await this.prisma.laborRate.updateMany({
        where: { tenantId, isDefault: true },
        data: { isDefault: false },
      });
    }

    return this.prisma.laborRate.create({
      data: { ...dto, tenantId },
    });
  }

  async updateLaborRate(tenantId: string, id: string, dto: CreateLaborRateDto) {
    if (dto.isDefault) {
      await this.prisma.laborRate.updateMany({
        where: { tenantId, isDefault: true, id: { not: id } },
        data: { isDefault: false },
      });
    }

    return this.prisma.laborRate.update({
      where: { id },
      data: dto,
    });
  }

  async deleteLaborRate(tenantId: string, id: string) {
    return this.prisma.laborRate.delete({ where: { id } });
  }
}
```

### 4. DTOs

**`create-service.dto.ts`:**
```typescript
import { IsString, IsOptional, IsNumber, IsBoolean, IsArray, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateServiceDto {
  @ApiProperty()
  @IsString()
  serviceCode: string;

  @ApiProperty()
  @IsString()
  serviceName: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  subcategory?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ default: 'flat_rate' })
  @IsString()
  pricingType: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  basePrice: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  minPrice?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  maxPrice?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  estimatedHours?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  laborRateOverride?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  skillLevelRequired?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  durationMinutes?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  warrantyDays?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  requiresPermit?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isEmergency?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  includedParts?: any;

  @ApiPropertyOptional()
  @IsOptional()
  recommendedParts?: any;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isSeasonalService?: boolean;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  availableSeasons?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  internalNotes?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  customerFacingNotes?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  displayOrder?: number;
}

export class UpdateServiceDto extends CreateServiceDto {}
```

**`create-bundle.dto.ts`:**
```typescript
import { IsString, IsOptional, IsNumber, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class BundleItemDto {
  @ApiProperty()
  @IsString()
  serviceId: string;

  @ApiProperty({ default: 1 })
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  displayOrder?: number;
}

export class CreateBundleDto {
  @ApiProperty()
  @IsString()
  bundleCode: string;

  @ApiProperty()
  @IsString()
  bundleName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  bundlePrice: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  regularPrice: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  savings: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  savingsPercent: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isPromotional?: boolean;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  displayOrder?: number;

  @ApiProperty({ type: [BundleItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BundleItemDto)
  items: BundleItemDto[];
}
```

**`create-labor-rate.dto.ts`:**
```typescript
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLaborRateDto {
  @ApiProperty()
  @IsString()
  rateName: string;

  @ApiProperty()
  @IsString()
  rateType: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  skillLevel?: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  hourlyRate: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  afterHoursMultiplier?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}
```

### 5. Register Module

**`service-catalog.module.ts`:**
```typescript
import { Module } from '@nestjs/common';
import { ServiceCatalogController } from './service-catalog.controller';
import { ServiceCatalogService } from './service-catalog.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ServiceCatalogController],
  providers: [ServiceCatalogService],
  exports: [ServiceCatalogService],
})
export class ServiceCatalogModule {}
```

**Add to `app.module.ts`:**
```typescript
import { ServiceCatalogModule } from './modules/service-catalog/service-catalog.module';

@Module({
  imports: [
    // ... existing modules
    ServiceCatalogModule,
  ],
})
```

---

## Frontend Implementation

### 1. Create Service Catalog API Client

**Location:** `frontend/src/services/serviceCatalogApi.ts`

```typescript
import api from './api';

export interface ServiceCatalog {
  id: string;
  serviceCode: string;
  serviceName: string;
  category: string;
  subcategory?: string;
  description?: string;
  pricingType: string;
  basePrice: number;
  minPrice?: number;
  maxPrice?: number;
  estimatedHours?: number;
  laborRateOverride?: number;
  skillLevelRequired?: string;
  durationMinutes?: number;
  warrantyDays?: number;
  requiresPermit: boolean;
  isEmergency: boolean;
  isActive: boolean;
  isSeasonalService: boolean;
  availableSeasons: string[];
  internalNotes?: string;
  customerFacingNotes?: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceBundle {
  id: string;
  bundleCode: string;
  bundleName: string;
  description?: string;
  category?: string;
  bundlePrice: number;
  regularPrice: number;
  savings: number;
  savingsPercent: number;
  isActive: boolean;
  isPromotional: boolean;
  items: {
    id: string;
    serviceId: string;
    quantity: number;
    service: ServiceCatalog;
  }[];
}

export interface LaborRate {
  id: string;
  rateName: string;
  rateType: string;
  skillLevel?: string;
  hourlyRate: number;
  isDefault: boolean;
  afterHoursMultiplier?: number;
  isActive: boolean;
  description?: string;
}

export const serviceCatalogApi = {
  // Services
  getServices: (params?: { category?: string; active?: boolean }) =>
    api.get<ServiceCatalog[]>('/service-catalog/services', { params }),
  
  getServiceById: (id: string) =>
    api.get<ServiceCatalog>(`/service-catalog/services/${id}`),
  
  createService: (data: Partial<ServiceCatalog>) =>
    api.post<ServiceCatalog>('/service-catalog/services', data),
  
  updateService: (id: string, data: Partial<ServiceCatalog>) =>
    api.put<ServiceCatalog>(`/service-catalog/services/${id}`, data),
  
  deleteService: (id: string) =>
    api.delete(`/service-catalog/services/${id}`),

  // Bundles
  getBundles: (params?: { active?: boolean }) =>
    api.get<ServiceBundle[]>('/service-catalog/bundles', { params }),
  
  getBundleById: (id: string) =>
    api.get<ServiceBundle>(`/service-catalog/bundles/${id}`),
  
  createBundle: (data: Partial<ServiceBundle>) =>
    api.post<ServiceBundle>('/service-catalog/bundles', data),
  
  updateBundle: (id: string, data: Partial<ServiceBundle>) =>
    api.put<ServiceBundle>(`/service-catalog/bundles/${id}`, data),
  
  deleteBundle: (id: string) =>
    api.delete(`/service-catalog/bundles/${id}`),

  // Labor Rates
  getLaborRates: () =>
    api.get<LaborRate[]>('/service-catalog/labor-rates'),
  
  createLaborRate: (data: Partial<LaborRate>) =>
    api.post<LaborRate>('/service-catalog/labor-rates', data),
  
  updateLaborRate: (id: string, data: Partial<LaborRate>) =>
    api.put<LaborRate>(`/service-catalog/labor-rates/${id}`, data),
  
  deleteLaborRate: (id: string) =>
    api.delete(`/service-catalog/labor-rates/${id}`),
};
```

### 2. Create Service Catalog Pages

**Location:** `frontend/src/pages/ServiceCatalog/`

**File Structure:**
```
frontend/src/pages/ServiceCatalog/
├── ServiceCatalogPage.tsx       (Main page with tabs)
├── components/
│   ├── ServicesTab.tsx          (Service list & management)
│   ├── ServiceForm.tsx          (Create/Edit service form)
│   ├── BundlesTab.tsx           (Bundle list & management)
│   ├── BundleForm.tsx           (Create/Edit bundle form)
│   ├── LaborRatesTab.tsx        (Labor rates management)
│   └── LaborRateForm.tsx        (Create/Edit labor rate form)
```

### 3. Main Service Catalog Page

**`ServiceCatalogPage.tsx`:**
```typescript
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServicesTab } from './components/ServicesTab';
import { BundlesTab } from './components/BundlesTab';
import { LaborRatesTab } from './components/LaborRatesTab';

export function ServiceCatalogPage() {
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Service Catalog & Pricebook</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your services, bundles, and labor rates
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="bundles">Service Bundles</TabsTrigger>
          <TabsTrigger value="labor-rates">Labor Rates</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <ServicesTab />
        </TabsContent>

        <TabsContent value="bundles">
          <BundlesTab />
        </TabsContent>

        <TabsContent value="labor-rates">
          <LaborRatesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### 4. Add Route

**Update `frontend/src/App.tsx` or routing configuration:**
```typescript
import { ServiceCatalogPage } from './pages/ServiceCatalog/ServiceCatalogPage';

// Add route:
<Route path="/service-catalog" element={<ServiceCatalogPage />} />
```

### 5. Add Navigation Item

**Update `frontend/src/components/Sidebar.tsx`:**
```typescript
import { BookOpen } from 'lucide-react';

// Add to navigation items:
{
  name: 'Service Catalog',
  path: '/service-catalog',
  icon: BookOpen,
}
```

---

## Integration with Work Orders

### Update Work Order Line Item Creation

When creating work orders, allow users to select from the service catalog:

**In Work Order Form:**
1. Add "Add Service" button alongside "Add Part"
2. Open service catalog selector dialog
3. When service selected, auto-populate:
   - Description
   - Unit price (from `basePrice`)
   - Estimated hours (if labor)
   - Any included parts

**Backend Integration:**
- Add `serviceCatalogId` field to `WorkOrderLineItem` (optional, for tracking)
- When line item created from catalog, link it back to the service

---

## Seed Data for Demo Tenant

**Create:** `backend/scripts/seed-service-catalog.ts`

Add sample services with different pricing types:

**Flat Rate Services:**
- "AC Tune-Up" - $149.99 (flat rate)
- "Furnace Inspection" - $89.99 (flat rate)
- "Filter Replacement" - $49.99 (flat rate)
- "Duct Cleaning" - $399.99 (flat rate)
- "Thermostat Installation" - $129.99 (flat rate)

**Hourly Services:**
- "Diagnostic Service" - $85/hr (hourly)
- "General Repair" - $95/hr (hourly)
- "Emergency Service Call" - $150/hr (hourly, after hours: $225/hr with 1.5x multiplier)

**Time & Material Services:**
- "Custom Installation" - Labor + Materials (time_and_material)
- "System Modification" - Labor + Parts (time_and_material)

Add sample bundles:
- "Spring HVAC Package" (AC Tune-Up + Filter Replacement) - $179.99 (save $20)
- "Fall Furnace Package" (Furnace Inspection + Filter Replacement) - $119.99 (save $20)

Add labor rates:
- Standard - $85/hr
- Master Technician - $125/hr
- Emergency - $150/hr
- Weekend - $105/hr (1.5x multiplier)

---

## Permission Configuration

Add to RBAC seed script (`seed-rbac-complete.ts`):

```typescript
// SERVICE_CATALOG permissions
'SERVICE_CATALOG_VIEW',
'SERVICE_CATALOG_CREATE',
'SERVICE_CATALOG_EDIT',
'SERVICE_CATALOG_DELETE',
'LABOR_RATES_VIEW',
'LABOR_RATES_MANAGE',
```

**Role Assignments:**
- OWNER, ADMIN: All permissions
- FIELD_MANAGER: VIEW, CREATE, EDIT
- OFFICE_MANAGER: VIEW, CREATE, EDIT
- SALES_REPRESENTATIVE: VIEW only
- Others: VIEW only

---

## Testing Checklist

- [ ] Database schema migrated successfully
- [ ] Backend API endpoints working (test with Swagger)
- [ ] Can create/update/delete services
- [ ] Can create/update/delete bundles
- [ ] Can create/update/delete labor rates
- [ ] Frontend pages render correctly
- [ ] Forms validate properly
- [ ] Can select services in work order creation
- [ ] Prices auto-populate from catalog
- [ ] Tenant isolation working (users only see their catalog)
- [ ] Seed data creates sample services

---

## Success Criteria

✅ Users can manage a centralized service catalog
✅ Users can create service bundles with discounted pricing
✅ Users can configure multiple labor rates
✅ Work orders can be created faster by selecting from catalog
✅ Pricing is consistent across all work orders
✅ Changes to catalog prices update easily
✅ Professional appearance for customer quotes

---

## Notes

- All decimal fields use Prisma `@db.Decimal(10,2)` for currency precision
- Soft delete with `deletedAt` timestamp for services and bundles
- Labor rates use `effectiveFrom`/`effectiveUntil` for time-based pricing
- Service bundles calculate savings automatically
- Multi-tenant isolation enforced on all queries
- Mobile-responsive design following existing OpsNex patterns
