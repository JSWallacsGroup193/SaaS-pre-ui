# OpsNex Vendor Management Module - Complete Implementation Prompt

## Overview
Add a comprehensive Vendor Management module to OpsNex HVAC operations platform. This module manages vendor relationships, purchase agreements, performance tracking, and vendor-specific inventory pricing. Must integrate seamlessly with existing Purchasing, Inventory, and CRM modules.

## Critical Requirements
- ✅ **FULL CODE ONLY** - Zero placeholders, zero TODOs, zero mock data
- ✅ **Single Drop-In Deployment** - Copy-paste and run immediately
- ✅ **Complete Integration** - Works with existing Purchasing, Inventory, CRM modules
- ✅ **Production-Ready** - No development shortcuts, full error handling
- ✅ **Multi-tenant Safe** - All data scoped by tenantId
- ✅ **Type-Safe** - Full TypeScript coverage, no `any` types
- ✅ **Mobile-First UI** - Responsive design matching OpsNex theme
- ✅ **RBAC Protected** - Permission-based access control

## Tech Stack Alignment

### Backend (NestJS + Prisma + PostgreSQL)
- NestJS modules with controllers, services, DTOs
- Prisma ORM with full schema definitions
- JWT authentication guards
- Class-validator for input validation
- Multi-tenant data isolation
- API versioning (`/api/v1/vendors`)

### Frontend (React + Vite + TypeScript)
- React components with TypeScript
- Zustand for state management (if needed)
- Axios for API calls
- shadcn/ui components
- OpsNex dark theme (slate-900, teal-500 accent)
- Mobile-first responsive design
- React Router integration

### Database Strategy
- Use existing PostgreSQL database
- Add new Prisma models to `backend/prisma/schema.prisma`
- Run `npm run db:push` to sync schema (NO manual migrations)
- Maintain referential integrity with existing tables

## Database Schema Requirements

Add these models to `backend/prisma/schema.prisma`:

### 1. Vendor Model (Main Entity)
```prisma
model Vendor {
  id                String   @id @default(uuid())
  tenantId          String
  tenant            Tenant   @relation(fields: [tenantId], references: [id])
  
  // Basic Information
  companyName       String
  displayName       String?
  vendorCode        String   // Unique vendor identifier (e.g., "VEN-001")
  status            VendorStatus @default(ACTIVE)
  type              VendorType
  
  // Contact Information
  primaryContactName String?
  email             String?
  phone             String?
  website           String?
  
  // Address
  addressLine1      String?
  addressLine2      String?
  city              String?
  state             String?
  zipCode           String?
  country           String   @default("USA")
  
  // Tax & Legal
  taxId             String?  // EIN/Tax ID
  businessLicense   String?
  
  // Payment Terms
  paymentTerms      String?  // e.g., "Net 30", "Net 60"
  creditLimit       Decimal? @db.Decimal(10, 2)
  currency          String   @default("USD")
  
  // Performance Metrics
  rating            Int?     @default(0) // 0-5 stars
  onTimeDeliveryRate Decimal? @db.Decimal(5, 2) // Percentage
  qualityRating     Decimal? @db.Decimal(3, 2) // 0-5.00
  
  // Relationships
  categories        VendorCategory[]
  contacts          VendorContact[]
  priceAgreements   VendorPriceAgreement[]
  performanceReviews VendorPerformanceReview[]
  documents         VendorDocument[]
  
  // Metadata
  notes             String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  createdById       String?
  createdBy         User?    @relation("VendorCreator", fields: [createdById], references: [id])
  
  @@unique([tenantId, vendorCode])
  @@index([tenantId, status])
  @@index([tenantId, type])
}

enum VendorStatus {
  ACTIVE
  INACTIVE
  PENDING_APPROVAL
  SUSPENDED
  BLACKLISTED
}

enum VendorType {
  MANUFACTURER
  DISTRIBUTOR
  WHOLESALER
  SERVICE_PROVIDER
  CONTRACTOR
  SUPPLIES
  EQUIPMENT
  OTHER
}
```

### 2. VendorCategory Model (Product Categories)
```prisma
model VendorCategory {
  id          String   @id @default(uuid())
  tenantId    String
  tenant      Tenant   @relation(fields: [tenantId], references: [id])
  vendorId    String
  vendor      Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  
  name        String   // e.g., "HVAC Equipment", "Filters", "Refrigerants"
  description String?
  isPrimary   Boolean  @default(false)
  
  createdAt   DateTime @default(now())
  
  @@index([tenantId, vendorId])
}
```

### 3. VendorContact Model (Multiple Contacts per Vendor)
```prisma
model VendorContact {
  id            String   @id @default(uuid())
  tenantId      String
  tenant        Tenant   @relation(fields: [tenantId], references: [id])
  vendorId      String
  vendor        Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  
  firstName     String
  lastName      String
  title         String?   // e.g., "Sales Rep", "Account Manager"
  email         String?
  phone         String?
  mobile        String?
  isPrimary     Boolean  @default(false)
  
  notes         String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([tenantId, vendorId])
}
```

### 4. VendorPriceAgreement Model (SKU-specific pricing)
```prisma
model VendorPriceAgreement {
  id              String   @id @default(uuid())
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  vendorId        String
  vendor          Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  skuId           String
  sku             SKU      @relation(fields: [skuId], references: [id])
  
  // Pricing
  vendorPartNumber String?  // Vendor's SKU number
  unitPrice       Decimal  @db.Decimal(10, 2)
  minimumOrderQty Int      @default(1)
  currency        String   @default("USD")
  
  // Agreement Details
  effectiveDate   DateTime
  expirationDate  DateTime?
  contractNumber  String?
  
  // Lead Time
  leadTimeDays    Int?
  
  // Status
  isActive        Boolean  @default(true)
  
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([tenantId, vendorId])
  @@index([tenantId, skuId])
  @@index([tenantId, isActive])
}
```

### 5. VendorPerformanceReview Model (Track vendor performance)
```prisma
model VendorPerformanceReview {
  id              String   @id @default(uuid())
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  vendorId        String
  vendor          Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  
  reviewDate      DateTime @default(now())
  reviewPeriodStart DateTime
  reviewPeriodEnd   DateTime
  
  // Ratings (1-5 scale)
  qualityRating   Int      // Product quality
  deliveryRating  Int      // On-time delivery
  serviceRating   Int      // Customer service
  pricingRating   Int      // Competitive pricing
  overallRating   Decimal  @db.Decimal(3, 2) // Calculated average
  
  // Metrics
  totalOrders     Int      @default(0)
  onTimeDeliveries Int     @default(0)
  defectiveItems  Int      @default(0)
  
  // Review Details
  strengths       String?
  weaknesses      String?
  recommendations String?
  
  reviewedById    String
  reviewedBy      User     @relation(fields: [reviewedById], references: [id])
  
  createdAt       DateTime @default(now())
  
  @@index([tenantId, vendorId])
  @@index([reviewDate])
}
```

### 6. VendorDocument Model (Contracts, certifications, etc.)
```prisma
model VendorDocument {
  id          String   @id @default(uuid())
  tenantId    String
  tenant      Tenant   @relation(fields: [tenantId], references: [id])
  vendorId    String
  vendor      Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  
  documentType VendorDocumentType
  title       String
  description String?
  fileUrl     String?  // URL to document storage
  fileName    String?
  fileSize    Int?     // bytes
  
  expirationDate DateTime?
  
  uploadedById String
  uploadedBy   User     @relation(fields: [uploadedById], references: [id])
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([tenantId, vendorId])
  @@index([documentType])
}

enum VendorDocumentType {
  CONTRACT
  INSURANCE_CERTIFICATE
  W9_FORM
  BUSINESS_LICENSE
  QUALITY_CERTIFICATION
  SAFETY_CERTIFICATION
  PRODUCT_CATALOG
  PRICE_LIST
  OTHER
}
```

### 7. Update Existing Models

Add these relations to existing models:

**SKU Model:**
```prisma
// Add to existing SKU model
priceAgreements VendorPriceAgreement[]
```

**Tenant Model:**
```prisma
// Add to existing Tenant model
vendors                   Vendor[]
vendorCategories          VendorCategory[]
vendorContacts            VendorContact[]
vendorPriceAgreements     VendorPriceAgreement[]
vendorPerformanceReviews  VendorPerformanceReview[]
vendorDocuments           VendorDocument[]
```

**User Model:**
```prisma
// Add to existing User model
vendorsCreated           Vendor[]                    @relation("VendorCreator")
vendorPerformanceReviews VendorPerformanceReview[]
vendorDocuments          VendorDocument[]
```

## Backend Implementation

### File Structure
```
backend/src/modules/vendor/
├── vendor.module.ts
├── vendor.controller.ts
├── vendor.service.ts
├── dto/
│   ├── create-vendor.dto.ts
│   ├── update-vendor.dto.ts
│   ├── create-vendor-contact.dto.ts
│   ├── create-price-agreement.dto.ts
│   ├── create-performance-review.dto.ts
│   └── vendor-query.dto.ts
└── types/
    └── vendor.types.ts
```

### 1. DTOs with Full Validation

**dto/create-vendor.dto.ts:**
```typescript
import { IsString, IsEmail, IsOptional, IsEnum, IsNumber, Min, Max, IsBoolean, IsDecimal } from 'class-validator';
import { VendorStatus, VendorType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVendorDto {
  @ApiProperty()
  @IsString()
  companyName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiProperty()
  @IsString()
  vendorCode: string;

  @ApiProperty({ enum: VendorType })
  @IsEnum(VendorType)
  type: VendorType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  primaryContactName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  addressLine1?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  addressLine2?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  taxId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentTerms?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  creditLimit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  categories?: string[];
}

export class UpdateVendorDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiProperty({ required: false, enum: VendorStatus })
  @IsOptional()
  @IsEnum(VendorStatus)
  status?: VendorStatus;

  @ApiProperty({ required: false, enum: VendorType })
  @IsOptional()
  @IsEnum(VendorType)
  type?: VendorType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  primaryContactName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  addressLine1?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentTerms?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  creditLimit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateVendorContactDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mobile?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreatePriceAgreementDto {
  @ApiProperty()
  @IsString()
  skuId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  vendorPartNumber?: string;

  @ApiProperty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  minimumOrderQty?: number;

  @ApiProperty()
  @IsString()
  effectiveDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  expirationDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contractNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  leadTimeDays?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreatePerformanceReviewDto {
  @ApiProperty()
  @IsString()
  reviewPeriodStart: string;

  @ApiProperty()
  @IsString()
  reviewPeriodEnd: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  qualityRating: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  deliveryRating: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  serviceRating: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  pricingRating: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalOrders?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  onTimeDeliveries?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  defectiveItems?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  strengths?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  weaknesses?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  recommendations?: string;
}

export class VendorQueryDto {
  @ApiProperty({ required: false, enum: VendorStatus })
  @IsOptional()
  @IsEnum(VendorStatus)
  status?: VendorStatus;

  @ApiProperty({ required: false, enum: VendorType })
  @IsOptional()
  @IsEnum(VendorType)
  type?: VendorType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;
}
```

### 2. Complete Service Implementation

**vendor.service.ts:**
```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { 
  CreateVendorDto, 
  UpdateVendorDto, 
  CreateVendorContactDto,
  CreatePriceAgreementDto,
  CreatePerformanceReviewDto,
  VendorQueryDto 
} from './dto';
import { Prisma, VendorStatus } from '@prisma/client';

@Injectable()
export class VendorService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, userId: string, dto: CreateVendorDto) {
    // Check for duplicate vendor code
    const existing = await this.prisma.vendor.findUnique({
      where: {
        tenantId_vendorCode: {
          tenantId,
          vendorCode: dto.vendorCode,
        },
      },
    });

    if (existing) {
      throw new BadRequestException(`Vendor code ${dto.vendorCode} already exists`);
    }

    const { categories, ...vendorData } = dto;

    return this.prisma.vendor.create({
      data: {
        ...vendorData,
        tenantId,
        createdById: userId,
        categories: categories
          ? {
              create: categories.map((name) => ({
                name,
                tenantId,
              })),
            }
          : undefined,
      },
      include: {
        categories: true,
        contacts: true,
        priceAgreements: {
          include: {
            sku: true,
          },
        },
      },
    });
  }

  async findAll(tenantId: string, query: VendorQueryDto) {
    const { status, type, search, page = 1, limit = 50 } = query;

    const where: Prisma.VendorWhereInput = {
      tenantId,
      ...(status && { status }),
      ...(type && { type }),
      ...(search && {
        OR: [
          { companyName: { contains: search, mode: 'insensitive' } },
          { displayName: { contains: search, mode: 'insensitive' } },
          { vendorCode: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [vendors, total] = await Promise.all([
      this.prisma.vendor.findMany({
        where,
        include: {
          categories: true,
          contacts: {
            where: { isPrimary: true },
            take: 1,
          },
          _count: {
            select: {
              priceAgreements: true,
              performanceReviews: true,
            },
          },
        },
        orderBy: { companyName: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.vendor.count({ where }),
    ]);

    return {
      vendors,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(tenantId: string, id: string) {
    const vendor = await this.prisma.vendor.findFirst({
      where: { id, tenantId },
      include: {
        categories: true,
        contacts: {
          orderBy: [{ isPrimary: 'desc' }, { firstName: 'asc' }],
        },
        priceAgreements: {
          where: { isActive: true },
          include: {
            sku: true,
          },
          orderBy: { effectiveDate: 'desc' },
        },
        performanceReviews: {
          orderBy: { reviewDate: 'desc' },
          take: 5,
          include: {
            reviewedBy: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        documents: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${id} not found`);
    }

    return vendor;
  }

  async update(tenantId: string, id: string, dto: UpdateVendorDto) {
    await this.findOne(tenantId, id);

    return this.prisma.vendor.update({
      where: { id },
      data: dto,
      include: {
        categories: true,
        contacts: true,
      },
    });
  }

  async delete(tenantId: string, id: string) {
    await this.findOne(tenantId, id);

    // Check if vendor has active price agreements
    const activePriceAgreements = await this.prisma.vendorPriceAgreement.count({
      where: {
        vendorId: id,
        isActive: true,
      },
    });

    if (activePriceAgreements > 0) {
      throw new BadRequestException(
        `Cannot delete vendor with ${activePriceAgreements} active price agreements. Deactivate agreements first.`,
      );
    }

    return this.prisma.vendor.delete({
      where: { id },
    });
  }

  // Vendor Contacts
  async createContact(tenantId: string, vendorId: string, dto: CreateVendorContactDto) {
    await this.findOne(tenantId, vendorId);

    // If this is set as primary, unset others
    if (dto.isPrimary) {
      await this.prisma.vendorContact.updateMany({
        where: { vendorId, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    return this.prisma.vendorContact.create({
      data: {
        ...dto,
        tenantId,
        vendorId,
      },
    });
  }

  async getContacts(tenantId: string, vendorId: string) {
    await this.findOne(tenantId, vendorId);

    return this.prisma.vendorContact.findMany({
      where: { tenantId, vendorId },
      orderBy: [{ isPrimary: 'desc' }, { firstName: 'asc' }],
    });
  }

  async updateContact(tenantId: string, vendorId: string, contactId: string, dto: Partial<CreateVendorContactDto>) {
    const contact = await this.prisma.vendorContact.findFirst({
      where: { id: contactId, vendorId, tenantId },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    if (dto.isPrimary) {
      await this.prisma.vendorContact.updateMany({
        where: { vendorId, isPrimary: true, id: { not: contactId } },
        data: { isPrimary: false },
      });
    }

    return this.prisma.vendorContact.update({
      where: { id: contactId },
      data: dto,
    });
  }

  async deleteContact(tenantId: string, vendorId: string, contactId: string) {
    const contact = await this.prisma.vendorContact.findFirst({
      where: { id: contactId, vendorId, tenantId },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return this.prisma.vendorContact.delete({
      where: { id: contactId },
    });
  }

  // Price Agreements
  async createPriceAgreement(tenantId: string, vendorId: string, dto: CreatePriceAgreementDto) {
    await this.findOne(tenantId, vendorId);

    // Verify SKU exists
    const sku = await this.prisma.sKU.findFirst({
      where: { id: dto.skuId, tenantId },
    });

    if (!sku) {
      throw new NotFoundException('SKU not found');
    }

    return this.prisma.vendorPriceAgreement.create({
      data: {
        ...dto,
        effectiveDate: new Date(dto.effectiveDate),
        expirationDate: dto.expirationDate ? new Date(dto.expirationDate) : null,
        tenantId,
        vendorId,
      },
      include: {
        sku: true,
      },
    });
  }

  async getPriceAgreements(tenantId: string, vendorId: string, activeOnly = false) {
    await this.findOne(tenantId, vendorId);

    return this.prisma.vendorPriceAgreement.findMany({
      where: {
        tenantId,
        vendorId,
        ...(activeOnly && { isActive: true }),
      },
      include: {
        sku: true,
      },
      orderBy: { effectiveDate: 'desc' },
    });
  }

  async updatePriceAgreement(tenantId: string, vendorId: string, agreementId: string, data: Partial<CreatePriceAgreementDto>) {
    const agreement = await this.prisma.vendorPriceAgreement.findFirst({
      where: { id: agreementId, vendorId, tenantId },
    });

    if (!agreement) {
      throw new NotFoundException('Price agreement not found');
    }

    return this.prisma.vendorPriceAgreement.update({
      where: { id: agreementId },
      data: {
        ...data,
        ...(data.effectiveDate && { effectiveDate: new Date(data.effectiveDate) }),
        ...(data.expirationDate && { expirationDate: new Date(data.expirationDate) }),
      },
      include: {
        sku: true,
      },
    });
  }

  async deactivatePriceAgreement(tenantId: string, vendorId: string, agreementId: string) {
    const agreement = await this.prisma.vendorPriceAgreement.findFirst({
      where: { id: agreementId, vendorId, tenantId },
    });

    if (!agreement) {
      throw new NotFoundException('Price agreement not found');
    }

    return this.prisma.vendorPriceAgreement.update({
      where: { id: agreementId },
      data: { isActive: false },
    });
  }

  // Performance Reviews
  async createPerformanceReview(tenantId: string, userId: string, vendorId: string, dto: CreatePerformanceReviewDto) {
    await this.findOne(tenantId, vendorId);

    const overallRating = (
      (dto.qualityRating + dto.deliveryRating + dto.serviceRating + dto.pricingRating) / 4
    );

    const review = await this.prisma.vendorPerformanceReview.create({
      data: {
        ...dto,
        reviewPeriodStart: new Date(dto.reviewPeriodStart),
        reviewPeriodEnd: new Date(dto.reviewPeriodEnd),
        overallRating,
        tenantId,
        vendorId,
        reviewedById: userId,
      },
      include: {
        reviewedBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Update vendor's overall rating based on recent reviews
    await this.updateVendorRating(vendorId);

    return review;
  }

  async getPerformanceReviews(tenantId: string, vendorId: string) {
    await this.findOne(tenantId, vendorId);

    return this.prisma.vendorPerformanceReview.findMany({
      where: { tenantId, vendorId },
      include: {
        reviewedBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { reviewDate: 'desc' },
    });
  }

  private async updateVendorRating(vendorId: string) {
    const recentReviews = await this.prisma.vendorPerformanceReview.findMany({
      where: { vendorId },
      orderBy: { reviewDate: 'desc' },
      take: 5,
    });

    if (recentReviews.length === 0) return;

    const avgRating = recentReviews.reduce((sum, r) => sum + Number(r.overallRating), 0) / recentReviews.length;

    await this.prisma.vendor.update({
      where: { id: vendorId },
      data: { 
        rating: Math.round(avgRating),
        qualityRating: avgRating,
      },
    });
  }

  // Statistics
  async getStats(tenantId: string) {
    const [total, active, byType, topRated] = await Promise.all([
      this.prisma.vendor.count({ where: { tenantId } }),
      this.prisma.vendor.count({ where: { tenantId, status: VendorStatus.ACTIVE } }),
      this.prisma.vendor.groupBy({
        by: ['type'],
        where: { tenantId },
        _count: true,
      }),
      this.prisma.vendor.findMany({
        where: { 
          tenantId,
          status: VendorStatus.ACTIVE,
          rating: { not: null },
        },
        orderBy: { rating: 'desc' },
        take: 5,
        select: {
          id: true,
          companyName: true,
          vendorCode: true,
          rating: true,
          type: true,
        },
      }),
    ]);

    return {
      total,
      active,
      byType,
      topRated,
    };
  }
}
```

### 3. Complete Controller Implementation

**vendor.controller.ts:**
```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VendorService } from './vendor.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateVendorDto,
  UpdateVendorDto,
  CreateVendorContactDto,
  CreatePriceAgreementDto,
  CreatePerformanceReviewDto,
  VendorQueryDto,
} from './dto';

@ApiTags('vendors')
@Controller('vendors')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class VendorController {
  constructor(private vendorService: VendorService) {}

  @Post()
  @ApiOperation({ summary: 'Create new vendor' })
  async create(@Request() req, @Body() dto: CreateVendorDto) {
    return this.vendorService.create(req.user.tenantId, req.user.sub, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vendors' })
  async findAll(@Request() req, @Query() query: VendorQueryDto) {
    return this.vendorService.findAll(req.user.tenantId, query);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get vendor statistics' })
  async getStats(@Request() req) {
    return this.vendorService.getStats(req.user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vendor by ID' })
  async findOne(@Request() req, @Param('id') id: string) {
    return this.vendorService.findOne(req.user.tenantId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update vendor' })
  async update(@Request() req, @Param('id') id: string, @Body() dto: UpdateVendorDto) {
    return this.vendorService.update(req.user.tenantId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete vendor' })
  async delete(@Request() req, @Param('id') id: string) {
    return this.vendorService.delete(req.user.tenantId, id);
  }

  // Vendor Contacts
  @Post(':id/contacts')
  @ApiOperation({ summary: 'Add contact to vendor' })
  async createContact(
    @Request() req,
    @Param('id') vendorId: string,
    @Body() dto: CreateVendorContactDto,
  ) {
    return this.vendorService.createContact(req.user.tenantId, vendorId, dto);
  }

  @Get(':id/contacts')
  @ApiOperation({ summary: 'Get vendor contacts' })
  async getContacts(@Request() req, @Param('id') vendorId: string) {
    return this.vendorService.getContacts(req.user.tenantId, vendorId);
  }

  @Put(':id/contacts/:contactId')
  @ApiOperation({ summary: 'Update vendor contact' })
  async updateContact(
    @Request() req,
    @Param('id') vendorId: string,
    @Param('contactId') contactId: string,
    @Body() dto: Partial<CreateVendorContactDto>,
  ) {
    return this.vendorService.updateContact(req.user.tenantId, vendorId, contactId, dto);
  }

  @Delete(':id/contacts/:contactId')
  @ApiOperation({ summary: 'Delete vendor contact' })
  async deleteContact(
    @Request() req,
    @Param('id') vendorId: string,
    @Param('contactId') contactId: string,
  ) {
    return this.vendorService.deleteContact(req.user.tenantId, vendorId, contactId);
  }

  // Price Agreements
  @Post(':id/price-agreements')
  @ApiOperation({ summary: 'Create price agreement' })
  async createPriceAgreement(
    @Request() req,
    @Param('id') vendorId: string,
    @Body() dto: CreatePriceAgreementDto,
  ) {
    return this.vendorService.createPriceAgreement(req.user.tenantId, vendorId, dto);
  }

  @Get(':id/price-agreements')
  @ApiOperation({ summary: 'Get vendor price agreements' })
  async getPriceAgreements(
    @Request() req,
    @Param('id') vendorId: string,
    @Query('activeOnly') activeOnly?: boolean,
  ) {
    return this.vendorService.getPriceAgreements(req.user.tenantId, vendorId, activeOnly);
  }

  @Put(':id/price-agreements/:agreementId')
  @ApiOperation({ summary: 'Update price agreement' })
  async updatePriceAgreement(
    @Request() req,
    @Param('id') vendorId: string,
    @Param('agreementId') agreementId: string,
    @Body() dto: Partial<CreatePriceAgreementDto>,
  ) {
    return this.vendorService.updatePriceAgreement(req.user.tenantId, vendorId, agreementId, dto);
  }

  @Delete(':id/price-agreements/:agreementId')
  @ApiOperation({ summary: 'Deactivate price agreement' })
  async deactivatePriceAgreement(
    @Request() req,
    @Param('id') vendorId: string,
    @Param('agreementId') agreementId: string,
  ) {
    return this.vendorService.deactivatePriceAgreement(req.user.tenantId, vendorId, agreementId);
  }

  // Performance Reviews
  @Post(':id/performance-reviews')
  @ApiOperation({ summary: 'Create performance review' })
  async createPerformanceReview(
    @Request() req,
    @Param('id') vendorId: string,
    @Body() dto: CreatePerformanceReviewDto,
  ) {
    return this.vendorService.createPerformanceReview(req.user.tenantId, req.user.sub, vendorId, dto);
  }

  @Get(':id/performance-reviews')
  @ApiOperation({ summary: 'Get vendor performance reviews' })
  async getPerformanceReviews(@Request() req, @Param('id') vendorId: string) {
    return this.vendorService.getPerformanceReviews(req.user.tenantId, vendorId);
  }
}
```

### 4. Module Registration

**vendor.module.ts:**
```typescript
import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VendorController],
  providers: [VendorService],
  exports: [VendorService],
})
export class VendorModule {}
```

**Register in app.module.ts:**
```typescript
import { VendorModule } from './modules/vendor/vendor.module';

@Module({
  imports: [
    // ... existing modules
    VendorModule,
  ],
  // ...
})
export class AppModule {}
```

## Frontend Implementation

### File Structure
```
frontend/src/
├── pages/
│   ├── Vendors.tsx
│   └── VendorDetail.tsx
├── components/vendors/
│   ├── vendor-list.tsx
│   ├── vendor-card.tsx
│   ├── vendor-form-dialog.tsx
│   ├── vendor-contact-dialog.tsx
│   ├── price-agreement-dialog.tsx
│   ├── performance-review-dialog.tsx
│   └── vendor-stats.tsx
├── services/
│   └── vendor.service.ts
└── types/view-models/
    └── vendor.ts
```

### 1. Type Definitions

**types/view-models/vendor.ts:**
```typescript
export interface Vendor {
  id: string;
  tenantId: string;
  companyName: string;
  displayName: string | null;
  vendorCode: string;
  status: VendorStatus;
  type: VendorType;
  primaryContactName: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string;
  taxId: string | null;
  businessLicense: string | null;
  paymentTerms: string | null;
  creditLimit: number | null;
  currency: string;
  rating: number | null;
  onTimeDeliveryRate: number | null;
  qualityRating: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  categories?: VendorCategory[];
  contacts?: VendorContact[];
  priceAgreements?: VendorPriceAgreement[];
  performanceReviews?: VendorPerformanceReview[];
  _count?: {
    priceAgreements: number;
    performanceReviews: number;
  };
}

export enum VendorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  SUSPENDED = 'SUSPENDED',
  BLACKLISTED = 'BLACKLISTED',
}

export enum VendorType {
  MANUFACTURER = 'MANUFACTURER',
  DISTRIBUTOR = 'DISTRIBUTOR',
  WHOLESALER = 'WHOLESALER',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
  CONTRACTOR = 'CONTRACTOR',
  SUPPLIES = 'SUPPLIES',
  EQUIPMENT = 'EQUIPMENT',
  OTHER = 'OTHER',
}

export interface VendorCategory {
  id: string;
  name: string;
  description: string | null;
  isPrimary: boolean;
}

export interface VendorContact {
  id: string;
  firstName: string;
  lastName: string;
  title: string | null;
  email: string | null;
  phone: string | null;
  mobile: string | null;
  isPrimary: boolean;
  notes: string | null;
}

export interface VendorPriceAgreement {
  id: string;
  skuId: string;
  vendorPartNumber: string | null;
  unitPrice: number;
  minimumOrderQty: number;
  currency: string;
  effectiveDate: string;
  expirationDate: string | null;
  contractNumber: string | null;
  leadTimeDays: number | null;
  isActive: boolean;
  notes: string | null;
  sku?: {
    id: string;
    name: string;
    sku: string;
  };
}

export interface VendorPerformanceReview {
  id: string;
  reviewDate: string;
  reviewPeriodStart: string;
  reviewPeriodEnd: string;
  qualityRating: number;
  deliveryRating: number;
  serviceRating: number;
  pricingRating: number;
  overallRating: number;
  totalOrders: number;
  onTimeDeliveries: number;
  defectiveItems: number;
  strengths: string | null;
  weaknesses: string | null;
  recommendations: string | null;
  reviewedBy?: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
}

export interface CreateVendorDto {
  companyName: string;
  displayName?: string;
  vendorCode: string;
  type: VendorType;
  primaryContactName?: string;
  email?: string;
  phone?: string;
  website?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  taxId?: string;
  paymentTerms?: string;
  creditLimit?: number;
  rating?: number;
  notes?: string;
  categories?: string[];
}
```

### 2. API Service

**services/vendor.service.ts:**
```typescript
import axios from 'axios';
import type { Vendor, CreateVendorDto, VendorContact, VendorPriceAgreement, VendorPerformanceReview } from '@/types/view-models/vendor';

const API_URL = '/api/v1/vendors';

export const vendorService = {
  async getAll(params?: {
    status?: string;
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const response = await axios.get<{
      vendors: Vendor[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }>(API_URL, { params });
    return response.data;
  },

  async getById(id: string) {
    const response = await axios.get<Vendor>(`${API_URL}/${id}`);
    return response.data;
  },

  async create(data: CreateVendorDto) {
    const response = await axios.post<Vendor>(API_URL, data);
    return response.data;
  },

  async update(id: string, data: Partial<CreateVendorDto>) {
    const response = await axios.put<Vendor>(`${API_URL}/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  async getStats() {
    const response = await axios.get(`${API_URL}/stats`);
    return response.data;
  },

  // Contacts
  async getContacts(vendorId: string) {
    const response = await axios.get<VendorContact[]>(`${API_URL}/${vendorId}/contacts`);
    return response.data;
  },

  async createContact(vendorId: string, data: Partial<VendorContact>) {
    const response = await axios.post<VendorContact>(`${API_URL}/${vendorId}/contacts`, data);
    return response.data;
  },

  async updateContact(vendorId: string, contactId: string, data: Partial<VendorContact>) {
    const response = await axios.put<VendorContact>(
      `${API_URL}/${vendorId}/contacts/${contactId}`,
      data
    );
    return response.data;
  },

  async deleteContact(vendorId: string, contactId: string) {
    const response = await axios.delete(`${API_URL}/${vendorId}/contacts/${contactId}`);
    return response.data;
  },

  // Price Agreements
  async getPriceAgreements(vendorId: string, activeOnly = false) {
    const response = await axios.get<VendorPriceAgreement[]>(
      `${API_URL}/${vendorId}/price-agreements`,
      { params: { activeOnly } }
    );
    return response.data;
  },

  async createPriceAgreement(vendorId: string, data: Partial<VendorPriceAgreement>) {
    const response = await axios.post<VendorPriceAgreement>(
      `${API_URL}/${vendorId}/price-agreements`,
      data
    );
    return response.data;
  },

  async updatePriceAgreement(
    vendorId: string,
    agreementId: string,
    data: Partial<VendorPriceAgreement>
  ) {
    const response = await axios.put<VendorPriceAgreement>(
      `${API_URL}/${vendorId}/price-agreements/${agreementId}`,
      data
    );
    return response.data;
  },

  async deactivatePriceAgreement(vendorId: string, agreementId: string) {
    const response = await axios.delete(
      `${API_URL}/${vendorId}/price-agreements/${agreementId}`
    );
    return response.data;
  },

  // Performance Reviews
  async getPerformanceReviews(vendorId: string) {
    const response = await axios.get<VendorPerformanceReview[]>(
      `${API_URL}/${vendorId}/performance-reviews`
    );
    return response.data;
  },

  async createPerformanceReview(vendorId: string, data: Partial<VendorPerformanceReview>) {
    const response = await axios.post<VendorPerformanceReview>(
      `${API_URL}/${vendorId}/performance-reviews`,
      data
    );
    return response.data;
  },
};
```

### 3. Main Vendors Page

**pages/Vendors.tsx:**
```typescript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, Search, Filter } from 'lucide-react';
import { vendorService } from '@/services/vendor.service';
import { VendorFormDialog } from '@/components/vendors/vendor-form-dialog';
import { VendorStats } from '@/components/vendors/vendor-stats';
import { VendorCard } from '@/components/vendors/vendor-card';
import type { Vendor } from '@/types/view-models/vendor';
import { VendorStatus, VendorType } from '@/types/view-models/vendor';
import toast from 'react-hot-toast';

export default function Vendors() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<VendorStatus | ''>('');
  const [typeFilter, setTypeFilter] = useState<VendorType | ''>('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    loadVendors();
  }, [search, statusFilter, typeFilter, pagination.page]);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const data = await vendorService.getAll({
        search: search || undefined,
        status: statusFilter || undefined,
        type: typeFilter || undefined,
        page: pagination.page,
        limit: pagination.limit,
      });
      setVendors(data.vendors);
      setPagination(data.pagination);
    } catch (error) {
      toast.error('Failed to load vendors');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: any) => {
    try {
      await vendorService.create(data);
      toast.success('Vendor created successfully');
      setShowCreateDialog(false);
      loadVendors();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create vendor');
      throw error;
    }
  };

  if (loading && vendors.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading vendors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Vendor Management</h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Track suppliers. Manage agreements. Build partnerships.
            </p>
          </div>
          <button
            onClick={() => setShowCreateDialog(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Vendor</span>
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-6 space-y-6">
        {/* Statistics */}
        <VendorStats />

        {/* Filters */}
        <div className="bg-card rounded-lg border border-border p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search vendors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as VendorStatus | '')}
              className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Statuses</option>
              <option value={VendorStatus.ACTIVE}>Active</option>
              <option value={VendorStatus.INACTIVE}>Inactive</option>
              <option value={VendorStatus.PENDING_APPROVAL}>Pending Approval</option>
              <option value={VendorStatus.SUSPENDED}>Suspended</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as VendorType | '')}
              className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Types</option>
              <option value={VendorType.MANUFACTURER}>Manufacturer</option>
              <option value={VendorType.DISTRIBUTOR}>Distributor</option>
              <option value={VendorType.WHOLESALER}>Wholesaler</option>
              <option value={VendorType.SERVICE_PROVIDER}>Service Provider</option>
              <option value={VendorType.EQUIPMENT}>Equipment</option>
              <option value={VendorType.SUPPLIES}>Supplies</option>
            </select>
          </div>
        </div>

        {/* Vendors Grid */}
        {vendors.length === 0 ? (
          <div className="bg-card rounded-lg border border-border p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No vendors found</h3>
            <p className="text-muted-foreground mb-4">
              {search || statusFilter || typeFilter
                ? 'Try adjusting your filters'
                : 'Get started by adding your first vendor'}
            </p>
            <button
              onClick={() => setShowCreateDialog(true)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Add Vendor
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  onClick={() => navigate(`/vendors/${vendor.id}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {vendors.length} of {pagination.total} vendors
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Dialog */}
      <VendorFormDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
```

### 4. Add Route

**In App.tsx or routes configuration:**
```typescript
import { lazy } from 'react';

const Vendors = lazy(() => import('./pages/Vendors'));
const VendorDetail = lazy(() => import('./pages/VendorDetail'));

// Add to routes array:
{
  path: '/vendors',
  element: <Vendors />,
},
{
  path: '/vendors/:id',
  element: <VendorDetail />,
}
```

### 5. Add to Navigation

**In your sidebar/navigation component:**
```typescript
import { Package } from 'lucide-react';

// Add to navigation items:
{
  name: 'Vendors',
  href: '/vendors',
  icon: Package,
}
```

## Deployment Steps

### 1. Database Migration
```bash
cd backend
npm run db:push
```

### 2. Restart Application
```bash
# Backend and frontend will auto-reload
# Verify at http://localhost:5000/vendors
```

### 3. Verification Checklist
- [ ] Database tables created successfully
- [ ] Backend API endpoints accessible at `/api/v1/vendors`
- [ ] Frontend loads without errors
- [ ] Can create vendor
- [ ] Can view vendor list
- [ ] Can view vendor details
- [ ] Can add contacts
- [ ] Can add price agreements
- [ ] Can add performance reviews
- [ ] Mobile responsive design works
- [ ] Multi-tenant isolation works

## Integration Points

### With Purchasing Module
- Price agreements can be used when creating purchase orders
- Vendor selection in PO creation
- Automatic vendor filtering by SKU availability

### With Inventory Module
- Link price agreements to SKUs
- View vendor pricing when managing inventory
- Track vendor as source of inventory

### With CRM Module
- Vendor contacts managed similarly to CRM contacts
- Potential integration for vendor-customer relationships

## Security Considerations
- All endpoints protected by JWT authentication
- Multi-tenant isolation on all queries
- Input validation on all DTOs
- Role-based access can be added via existing RBAC system

## Future Enhancements (Optional)
- Document upload/storage integration
- Email notifications for price agreement expirations
- Vendor performance dashboards
- Purchase order integration
- Vendor portal for self-service
- Automated vendor rating calculations
- Import/export vendor data

## Success Criteria
✅ Full CRUD operations for vendors
✅ Contact management
✅ Price agreement tracking
✅ Performance review system
✅ Mobile-responsive UI
✅ Multi-tenant safe
✅ Production-ready code
✅ Zero placeholders
✅ Complete type safety
✅ Proper error handling
