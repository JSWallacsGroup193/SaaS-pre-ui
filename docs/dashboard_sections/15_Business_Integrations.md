## Business Integrations

### 1. Accounting & ERP Integration

**Priority**: Should Have

**Supported Systems**:
- QuickBooks Online
- Sage Intacct
- Xero
- NetSuite
- Microsoft Dynamics

**Database Schema**:
```sql
CREATE TABLE integration_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id),
  integration_type VARCHAR(50) NOT NULL,  -- 'quickbooks', 'sage', 'xero'
  connection_name VARCHAR(100),
  credentials JSONB,  -- Encrypted OAuth tokens or API keys
  sync_enabled BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMP,
  sync_status VARCHAR(20),  -- 'success', 'failed', 'in_progress'
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sync_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connection_id UUID REFERENCES integration_connections(id),
  local_resource VARCHAR(50),  -- 'customer', 'invoice', 'payment'
  remote_resource VARCHAR(50),
  field_mappings JSONB,  -- Map local fields to remote fields
  sync_direction VARCHAR(20),  -- 'push', 'pull', 'bidirectional'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sync_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connection_id UUID REFERENCES integration_connections(id),
  sync_type VARCHAR(50),
  direction VARCHAR(10),
  records_processed INTEGER,
  records_succeeded INTEGER,
  records_failed INTEGER,
  errors JSONB,
  started_at TIMESTAMP,
  completed_at TIMESTAMP
);
```

**QuickBooks Integration Example**:
```typescript
@Injectable()
export class QuickBooksIntegration {
  async syncInvoices(): Promise<void> {
    const connection = await this.getConnection('quickbooks');
    const qbo = this.getQuickBooksClient(connection);
    
    // Get work orders that need invoicing
    const workOrders = await this.prisma.workOrder.findMany({
      where: {
        status: 'completed',
        invoiceId: null
      },
      include: { customer: true, lineItems: true }
    });
    
    for (const wo of workOrders) {
      try {
        // Create invoice in QuickBooks
        const invoice = await qbo.invoice.create({
          CustomerRef: { value: wo.customer.qbCustomerId },
          Line: wo.lineItems.map(item => ({
            Amount: item.total,
            DetailType: 'SalesItemLineDetail',
            SalesItemLineDetail: {
              ItemRef: { value: item.qbItemId },
              Qty: item.quantity,
              UnitPrice: item.unitPrice
            },
            Description: item.description
          })),
          DueDate: addDays(new Date(), 30)
        });
        
        // Update work order with invoice ID
        await this.prisma.workOrder.update({
          where: { id: wo.id },
          data: {
            invoiceId: invoice.Id,
            qbSyncedAt: new Date()
          }
        });
        
      } catch (error) {
        await this.logSyncError(wo.id, error);
      }
    }
  }
  
  async syncCustomers(): Promise<void> {
    // Bidirectional sync of customers
    const connection = await this.getConnection('quickbooks');
    const qbo = this.getQuickBooksClient(connection);
    
    // Pull new customers from QB
    const qbCustomers = await qbo.customer.query({
      where: `MetaData.LastUpdatedTime > '${connection.lastSyncAt}'`
    });
    
    for (const qbCustomer of qbCustomers) {
      await this.upsertCustomer(qbCustomer);
    }
    
    // Push new customers to QB
    const localCustomers = await this.prisma.account.findMany({
      where: {
        qbCustomerId: null,
        type: 'customer'
      }
    });
    
    for (const customer of localCustomers) {
      const qbCustomer = await qbo.customer.create({
        DisplayName: customer.name,
        PrimaryEmailAddr: { Address: customer.email },
        PrimaryPhone: { FreeFormNumber: customer.phone }
      });
      
      await this.prisma.account.update({
        where: { id: customer.id },
        data: { qbCustomerId: qbCustomer.Id }
      });
    }
  }
}
```

**API Endpoints**:
```typescript
// OAuth connection
GET /api/v1/integrations/quickbooks/auth
GET /api/v1/integrations/quickbooks/callback

// Sync operations
POST /api/v1/integrations/:connectionId/sync
Body: { resources: ['customers', 'invoices', 'payments'] }

GET /api/v1/integrations/:connectionId/sync-status
GET /api/v1/integrations/:connectionId/logs
```

**Benefits**:
- Eliminate double data entry
- Real-time financial sync
- Automated invoicing
- Accurate financial reporting

---

### 2. Communication Integrations (Email, SMS, Phone)

**Priority**: Should Have

**Email Integration (SendGrid/AWS SES)**:
```typescript
interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  bodyHtml: string;
  bodyText: string;
  variables: string[];  // ['{customer_name}', '{work_order_number}']
}

@Injectable()
export class EmailService {
  async sendWorkOrderConfirmation(workOrder: WorkOrder): Promise<void> {
    const template = await this.getTemplate('work_order_confirmation');
    
    const email = {
      to: workOrder.customer.email,
      subject: this.replaceVariables(template.subject, {
        work_order_number: workOrder.number
      }),
      html: this.replaceVariables(template.bodyHtml, {
        customer_name: workOrder.customer.name,
        work_order_number: workOrder.number,
        scheduled_date: format(workOrder.scheduledAt, 'PPP'),
        technician_name: workOrder.technician.name
      }),
      attachments: [
        {
          filename: 'work-order.pdf',
          content: await this.generateWorkOrderPDF(workOrder)
        }
      ]
    };
    
    await this.sendgrid.send(email);
    
    // Log email sent
    await this.prisma.communicationLog.create({
      data: {
        type: 'email',
        recipient: email.to,
        subject: email.subject,
        status: 'sent',
        workOrderId: workOrder.id
      }
    });
  }
}
```

**SMS Integration (Twilio)**:
```typescript
@Injectable()
export class SMSService {
  async sendTechnicianDispatchNotification(workOrder: WorkOrder): Promise<void> {
    const message = `New work order assigned! #${workOrder.number} at ${workOrder.customer.address}. Due: ${format(workOrder.scheduledAt, 'PP p')}. View: ${process.env.APP_URL}/work-orders/${workOrder.id}`;
    
    await this.twilio.messages.create({
      to: workOrder.technician.phone,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: message
    });
    
    // Log SMS sent
    await this.prisma.communicationLog.create({
      data: {
        type: 'sms',
        recipient: workOrder.technician.phone,
        message,
        status: 'sent',
        workOrderId: workOrder.id
      }
    });
  }
  
  async sendCustomerReminder(workOrder: WorkOrder): Promise<void> {
    const message = `Reminder: Your HVAC service is scheduled for ${format(workOrder.scheduledAt, 'PPP')} between ${workOrder.timeWindow}. Technician: ${workOrder.technician.name}. Questions? Call ${process.env.COMPANY_PHONE}`;
    
    await this.twilio.messages.create({
      to: workOrder.customer.phone,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: message
    });
  }
}
```

**Phone Integration (Twilio Voice)**:
```typescript
@Injectable()
export class PhoneService {
  async initiateCall(to: string, from: string): Promise<Call> {
    const call = await this.twilio.calls.create({
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
      url: `${process.env.APP_URL}/api/v1/phone/twiml/greeting`,
      statusCallback: `${process.env.APP_URL}/api/v1/phone/status`,
      record: true
    });
    
    return call;
  }
  
  // TwiML endpoint for call handling
  @Get('phone/twiml/greeting')
  generateGreeting(@Query('to') to: string) {
    const twiml = new Twilio.twiml.VoiceResponse();
    
    twiml.say(
      { voice: 'alice' },
      'Thank you for calling HVAC Company. Please hold while we connect you.'
    );
    
    twiml.dial(to);
    
    return twiml.toString();
  }
}
```

**Communication Log Schema**:
```sql
CREATE TABLE communication_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(20) NOT NULL,  -- 'email', 'sms', 'phone'
  direction VARCHAR(10),  -- 'inbound', 'outbound'
  recipient VARCHAR(255),
  sender VARCHAR(255),
  subject VARCHAR(500),
  message TEXT,
  status VARCHAR(20),  -- 'sent', 'delivered', 'failed', 'bounced'
  work_order_id UUID REFERENCES work_orders(id),
  user_id UUID REFERENCES users(id),
  cost DECIMAL(10, 4),  -- Cost of sending (for SMS/calls)
  metadata JSONB,  -- Provider-specific data
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Benefits**:
- Automated customer communication
- Technician dispatch notifications
- Two-way SMS conversation
- Call tracking and recording

---

