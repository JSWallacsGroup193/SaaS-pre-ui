import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, WorkOrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class WorkOrderService {
  async findAll(tenantId: string) {
    return prisma.workOrder.findMany({ where: { tenantId } });
  }

  async create(data: { tenantId: string, title: string, description?: string }) {
    const number = `WO-${Date.now()}`;
    return prisma.workOrder.create({ 
      data: {
        ...data,
        number,
      }
    });
  }

  async updateStatus(id: string, status: WorkOrderStatus) {
    const workOrder = await prisma.workOrder.findUnique({ where: { id } });
    if (!workOrder) throw new NotFoundException();

    return prisma.workOrder.update({
      where: { id },
      data: { status },
    });
  }
}
