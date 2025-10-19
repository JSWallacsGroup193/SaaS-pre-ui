import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CrmService {
  async getAccounts(tenantId: string) {
    return prisma.account.findMany({ where: { tenantId } });
  }

  async createAccount(data: { tenantId: string; name: string }) {
    const accountNumber = `ACC-${Date.now()}`;
    return prisma.account.create({ 
      data: {
        ...data,
        accountNumber,
      }
    });
  }

  async getContacts(tenantId: string) {
    return prisma.contact.findMany({ where: { tenantId } });
  }

  async createContact(data: { tenantId: string; name: string; email?: string; phone?: string; accountId?: string }) {
    return prisma.contact.create({ data });
  }

  async getLeads(tenantId: string) {
    return prisma.lead.findMany({ where: { tenantId }, include: { contact: true } });
  }

  async createLead(data: { tenantId: string; contactId?: string; accountId?: string; status?: any; source?: string; description?: string }) {
    return prisma.lead.create({ data });
  }

  async getNotes(contactId: string) {
    return prisma.note.findMany({ where: { contactId } });
  }

  async createNote(data: { tenantId: string; contactId: string; content: string }) {
    return prisma.note.create({ data });
  }
}
