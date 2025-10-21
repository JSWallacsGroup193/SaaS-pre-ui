import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CrmService {
  async getAccounts(tenantId: string) {
    return prisma.account.findMany({ where: { tenantId } });
  }

  async getAccount(id: string) {
    const account = await prisma.account.findUnique({ where: { id } });
    if (!account) throw new Error(`Account with ID ${id} not found`);
    return account;
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

  async updateAccount(id: string, data: { name?: string }) {
    const account = await prisma.account.findUnique({ where: { id } });
    if (!account) throw new Error(`Account with ID ${id} not found`);
    
    return prisma.account.update({
      where: { id },
      data,
    });
  }

  async getContacts(tenantId: string) {
    return prisma.contact.findMany({ where: { tenantId } });
  }

  async getContact(id: string) {
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) throw new Error(`Contact with ID ${id} not found`);
    return contact;
  }

  async createContact(data: { tenantId: string; name: string; email?: string; phone?: string; accountId?: string }) {
    return prisma.contact.create({ data });
  }

  async updateContact(id: string, data: { name?: string; email?: string; phone?: string; accountId?: string }) {
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) throw new Error(`Contact with ID ${id} not found`);
    
    return prisma.contact.update({
      where: { id },
      data,
    });
  }

  async getLeads(tenantId: string) {
    return prisma.lead.findMany({ where: { tenantId }, include: { contact: true } });
  }

  async createLead(data: { tenantId: string; contactId?: string; accountId?: string; status?: any; source?: string; description?: string }) {
    return prisma.lead.create({ data });
  }

  async updateLead(id: string, data: { contactId?: string; accountId?: string; status?: any; source?: string; description?: string }) {
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) throw new Error(`Lead with ID ${id} not found`);
    
    return prisma.lead.update({
      where: { id },
      data,
    });
  }

  async getNotes(contactId: string) {
    return prisma.note.findMany({ where: { contactId } });
  }

  async createNote(data: { tenantId: string; contactId: string; content: string }) {
    return prisma.note.create({ data });
  }
}
