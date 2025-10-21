import { Controller, Get, Post, Put, Body, Param, Req } from '@nestjs/common';
import { CrmService } from './service';

@Controller('crm')
export class CrmController {
  constructor(private readonly service: CrmService) {}

  @Get('accounts/:tenantId')
  getAccounts(@Param('tenantId') tenantId: string) {
    return this.service.getAccounts(tenantId);
  }

  @Get('accounts/detail/:id')
  getAccount(@Param('id') id: string, @Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getAccount(id, String(tenantId));
  }

  @Post('accounts')
  createAccount(@Body() body: { tenantId: string; name: string }) {
    return this.service.createAccount(body);
  }

  @Put('accounts/:id')
  updateAccount(@Param('id') id: string, @Body() body: { name?: string }, @Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.updateAccount(id, body, String(tenantId));
  }

  @Get('contacts/:tenantId')
  getContacts(@Param('tenantId') tenantId: string) {
    return this.service.getContacts(tenantId);
  }

  @Get('contacts/detail/:id')
  getContact(@Param('id') id: string, @Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getContact(id, String(tenantId));
  }

  @Post('contacts')
  createContact(@Body() body: { tenantId: string; name: string; email?: string; phone?: string; accountId?: string }) {
    return this.service.createContact(body);
  }

  @Put('contacts/:id')
  updateContact(@Param('id') id: string, @Body() body: { name?: string; email?: string; phone?: string; accountId?: string }, @Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.updateContact(id, body, String(tenantId));
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
  updateLead(@Param('id') id: string, @Body() body: { contactId?: string; accountId?: string; status?: string; source?: string; description?: string }, @Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.updateLead(id, body, String(tenantId));
  }

  @Get('notes/:contactId')
  getNotes(@Param('contactId') contactId: string, @Req() req: any) {
    const tenantId = req.user?.tenantId || req.query?.tenantId;
    return this.service.getNotes(contactId, String(tenantId));
  }

  @Post('notes')
  createNote(@Body() body: { tenantId: string; contactId: string; content: string }) {
    return this.service.createNote(body);
  }
}
