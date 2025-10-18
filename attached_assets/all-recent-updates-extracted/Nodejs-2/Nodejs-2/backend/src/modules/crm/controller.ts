import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CrmService } from './service';

@Controller('crm')
export class CrmController {
  constructor(private readonly service: CrmService) {}

  @Get('accounts/:tenantId')
  getAccounts(@Param('tenantId') tenantId: string) {
    return this.service.getAccounts(tenantId);
  }

  @Post('accounts')
  createAccount(@Body() body: { tenantId: string; name: string }) {
    return this.service.createAccount(body);
  }

  @Get('contacts/:tenantId')
  getContacts(@Param('tenantId') tenantId: string) {
    return this.service.getContacts(tenantId);
  }

  @Post('contacts')
  createContact(@Body() body: { tenantId: string; name: string; email?: string; phone?: string; accountId?: string }) {
    return this.service.createContact(body);
  }

  @Get('leads/:tenantId')
  getLeads(@Param('tenantId') tenantId: string) {
    return this.service.getLeads(tenantId);
  }

  @Post('leads')
  createLead(@Body() body: { tenantId: string; contactId?: string; accountId?: string; status?: string; source?: string; description?: string }) {
    return this.service.createLead(body);
  }

  @Get('notes/:contactId')
  getNotes(@Param('contactId') contactId: string) {
    return this.service.getNotes(contactId);
  }

  @Post('notes')
  createNote(@Body() body: { tenantId: string; contactId: string; content: string }) {
    return this.service.createNote(body);
  }
}
