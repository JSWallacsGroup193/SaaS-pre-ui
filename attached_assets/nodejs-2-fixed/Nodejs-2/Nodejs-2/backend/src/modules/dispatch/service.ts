import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class DispatchService {
  async createSlot(data: { workOrderId: string; technicianId: string; startTime: Date; endTime: Date }) {
    return prisma.dispatchSlot.create({ data });
  }

  async getTechnicianSlots(technicianId: string) {
    return prisma.dispatchSlot.findMany({
      where: { technicianId },
      include: { workOrder: true },
      orderBy: { startTime: 'asc' },
    });
  }

  async getAllSlots() {
    return prisma.dispatchSlot.findMany({
      include: { workOrder: true, technician: true },
      orderBy: { startTime: 'asc' },
    });
  }
}
