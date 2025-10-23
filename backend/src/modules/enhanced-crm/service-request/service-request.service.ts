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
    await this.findOne(tenantId, id);

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
