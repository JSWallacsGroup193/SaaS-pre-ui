import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReportingService {
  constructor(private prisma: PrismaService) {}

  async getFinancialReport(tenantId: string, { from, to }: { from?: string; to?: string }) {
    return this.prisma.workOrder.groupBy({
      by: ['technicianId'],
      where: {
        tenantId,
        createdAt: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
      },
      _sum: {
        revenue: true,
        cost: true,
      },
    });
  }

  async getPerformanceReport(tenantId: string, { from, to }: { from?: string; to?: string }) {
    const totalJobs = await this.prisma.workOrder.count({
      where: {
        tenantId,
        createdAt: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
      },
    });

    const completedJobs = await this.prisma.workOrder.count({
      where: {
        tenantId,
        status: 'completed',
        createdAt: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
      },
    });

    const overdueJobs = await this.prisma.workOrder.count({
      where: {
        tenantId,
        status: { not: 'completed' },
        dueDate: { lt: new Date() },
        createdAt: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
      },
    });

    const avgResponse = await this.prisma.workOrder.aggregate({
      where: {
        tenantId,
        startedAt: { not: null },
        createdAt: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
      },
      _avg: {
        responseTimeMinutes: true,
      },
    });

    return {
      completionRate: totalJobs ? (completedJobs / totalJobs) * 100 : 0,
      overdueJobs,
      avgResponseTime: avgResponse._avg.responseTimeMinutes || 0,
    };
  }
}
  async getCustomReport(tenantId: string, filters: any) {
    return this.prisma.workOrder.findMany({
      where: {
        tenantId,
        createdAt: {
          gte: filters.from ? new Date(filters.from) : undefined,
          lte: filters.to ? new Date(filters.to) : undefined,
        },
        technicianId: filters.technicianId || undefined,
        customerId: filters.customerId || undefined,
      },
      select: {
        id: true,
        title: true,
        status: true,
        technicianId: true,
        customerId: true,
        revenue: true,
        cost: true,
        createdAt: true,
        dueDate: true
      }
    });
  }
