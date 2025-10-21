import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { CrmService } from './service';

@Controller('crm')
export class CrmController {
  constructor(private readonly service: CrmService) {}

  @Get('accounts/:tenantId')
  getAccounts(@Param('tenantId') tenantId: string) {
    return this.service.getAccounts(tenantId);
  }

  @Get('accounts/detail/:id')
  getAccount(@Param('id') id: string) {
    return this.service.getAccount(id);
  }

  @Post('accounts')
  createAccount(@Body() body: { tenantId: string; name: string }) {
    return this.service.createAccount(body);
  }

  @Put('accounts/:id')
  updateAccount(@Param('id') id: string, @Body() body: { name?: string }) {
    return this.service.updateAccount(id, body);
  }

  @Get('contacts/:tenantId')
  getContacts(@Param('tenantId') tenantId: string) {
    return this.service.getContacts(tenantId);
  }

  @Get('contacts/detail/:id')
  getContact(@Param('id') id: string) {
    return this.service.getContact(id);
  }

  @Post('contacts')
  createContact(@Body() body: { tenantId: string; name: string; email?: string; phone?: string; accountId?: string }) {
    return this.service.createContact(body);
  }

  @Put('contacts/:id')
  updateContact(@Param('id') id: string, @Body() body: { name?: string; email?: string; phone?: string; accountId?: string }) {
    return this.service.updateContact(id, body);
  }

  @Get('leads/:tenantId')
  getLeads(@Param('tenantId') tenantId: string) {
    return this.service.getLeads(tenantId);
  }

  @Post('leads')
  createLead(@Body() body: { tenantId: string; contactId?: string; accountId?: string; status?: string; source?: string; description?: string }) {
    return this.service.createLead(body);
  }

  @Put('leads/:id')
  updateLead(@Param('id') id: string, @Body() body: { contactId?: string; accountId?: string; status?: string; source?: string; description?: string }) {
    return this.service.updateLead(id, body);
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
