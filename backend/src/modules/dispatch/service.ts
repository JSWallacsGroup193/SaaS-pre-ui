import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class DispatchService {
  async createSlot(data: { workOrderId: string; technicianId: string; startTime: Date; endTime: Date }) {
    return prisma.dispatchSlot.create({ data });
  }

  async updateSlot(
    id: string,
    data: { technicianId?: string | null; startTime?: Date; endTime?: Date; status?: string }
  ) {
    // Check if slot exists
    const slot = await prisma.dispatchSlot.findUnique({ where: { id } });
    if (!slot) {
      throw new NotFoundException(`Dispatch slot with ID ${id} not found`);
    }

    return prisma.dispatchSlot.update({
      where: { id },
      data,
      include: { workOrder: true, technician: true },
    });
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
