import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma.service';
import { CreateServiceRequestDto, UpdateServiceRequestDto } from './dto';

@Injectable()
export class ServiceRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateServiceRequestDto) {
    // Verify account belongs to tenant
    const account = await this.prisma.account.findUnique({
      where: { id: dto.accountId },
    });

    if (!account || account.tenantId !== tenantId) {
      throw new ForbiddenException('Account not found or access denied');
    }

    // Verify property belongs to tenant (if provided)
    if (dto.propertyId) {
      const property = await this.prisma.property.findUnique({
        where: { id: dto.propertyId },
      });

      if (!property || property.tenantId !== tenantId) {
        throw new ForbiddenException('Property not found or access denied');
      }

      // Ensure property belongs to the specified account
      if (property.accountId !== dto.accountId) {
        throw new ForbiddenException('Property does not belong to the specified account');
      }
    }

    // Verify equipment belongs to tenant (if provided)
    if (dto.equipmentId) {
      const equipment = await this.prisma.customerEquipment.findUnique({
        where: { id: dto.equipmentId },
      });

      if (!equipment || equipment.tenantId !== tenantId) {
        throw new ForbiddenException('Equipment not found or access denied');
      }

      // Ensure equipment belongs to the specified account
      if (equipment.accountId !== dto.accountId) {
        throw new ForbiddenException('Equipment does not belong to the specified account');
      }
    }

    // Verify assigned tech belongs to tenant (if provided)
    if (dto.assignedTechId) {
      const tech = await this.prisma.user.findUnique({
        where: { id: dto.assignedTechId },
      });

      if (!tech || tech.tenantId !== tenantId) {
        throw new ForbiddenException('Technician not found or access denied');
      }
    }

    // Generate request number
    const count = await this.prisma.serviceRequest.count({
      where: { tenantId },
    });
    const requestNumber = `SR-${new Date().getFullYear()}-${String(count + 1).padStart(6, '0')}`;

    return this.prisma.serviceRequest.create({
      data: {
        ...dto,
        tenantId,
        requestNumber,
        status: 'new',
        priority: dto.priority || 'normal',
      },
      include: {
        account: true,
        property: true,
        equipment: true,
        assignedTech: true,
      },
    });
  }

  async findAll(tenantId: string, accountId?: string, status?: string) {
    return this.prisma.serviceRequest.findMany({
      where: {
        tenantId,
        ...(accountId && { accountId }),
        ...(status && { status }),
      },
      include: {
        account: true,
        property: true,
        equipment: true,
        assignedTech: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const serviceRequest = await this.prisma.serviceRequest.findUnique({
      where: { id },
      include: {
        account: true,
        property: true,
        equipment: true,
        assignedTech: true,
        workOrder: true,
      },
    });

    if (!serviceRequest || serviceRequest.tenantId !== tenantId) {
      throw new NotFoundException('Service request not found');
    }

    return serviceRequest;
  }

  async update(tenantId: string, id: string, dto: UpdateServiceRequestDto) {
    // Verify service request exists and belongs to tenant
    const existing = await this.findOne(tenantId, id);

    // Determine target account ID (new or existing)
    const targetAccountId = dto.accountId || existing.accountId;

    // If updating accountId, verify new account belongs to tenant
    if (dto.accountId && dto.accountId !== existing.accountId) {
      const account = await this.prisma.account.findUnique({
        where: { id: dto.accountId },
      });

      if (!account || account.tenantId !== tenantId) {
        throw new ForbiddenException('Account not found or access denied');
      }

      // If account is changing, verify existing property/equipment belong to new account
      // or are being cleared/replaced
      if (existing.propertyId && dto.propertyId === undefined) {
        const existingProperty = await this.prisma.property.findUnique({
          where: { id: existing.propertyId },
        });

        if (existingProperty && existingProperty.accountId !== dto.accountId) {
          throw new ForbiddenException(
            'Cannot change account: existing property belongs to different account. ' +
            'Please update or clear the property first.'
          );
        }
      }

      if (existing.equipmentId && dto.equipmentId === undefined) {
        const existingEquipment = await this.prisma.customerEquipment.findUnique({
          where: { id: existing.equipmentId },
        });

        if (existingEquipment && existingEquipment.accountId !== dto.accountId) {
          throw new ForbiddenException(
            'Cannot change account: existing equipment belongs to different account. ' +
            'Please update or clear the equipment first.'
          );
        }
      }
    }

    // Verify property belongs to tenant and target account (if provided)
    if (dto.propertyId) {
      const property = await this.prisma.property.findUnique({
        where: { id: dto.propertyId },
      });

      if (!property || property.tenantId !== tenantId) {
        throw new ForbiddenException('Property not found or access denied');
      }

      if (property.accountId !== targetAccountId) {
        throw new ForbiddenException('Property does not belong to the specified account');
      }
    }

    // Verify equipment belongs to tenant and target account (if provided)
    if (dto.equipmentId) {
      const equipment = await this.prisma.customerEquipment.findUnique({
        where: { id: dto.equipmentId },
      });

      if (!equipment || equipment.tenantId !== tenantId) {
        throw new ForbiddenException('Equipment not found or access denied');
      }

      if (equipment.accountId !== targetAccountId) {
        throw new ForbiddenException('Equipment does not belong to the specified account');
      }
    }

    // Verify assigned tech belongs to tenant (if provided)
    if (dto.assignedTechId) {
      const tech = await this.prisma.user.findUnique({
        where: { id: dto.assignedTechId },
      });

      if (!tech || tech.tenantId !== tenantId) {
        throw new ForbiddenException('Technician not found or access denied');
      }
    }

    return this.prisma.serviceRequest.update({
      where: { id },
      data: dto,
      include: {
        account: true,
        property: true,
        equipment: true,
        assignedTech: true,
        workOrder: true,
      },
    });
  }

  async remove(tenantId: string, id: string) {
    // Verify service request exists and belongs to tenant
    await this.findOne(tenantId, id);

    return this.prisma.serviceRequest.delete({
      where: { id },
    });
  }
}
