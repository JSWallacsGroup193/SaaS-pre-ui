import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🏢 Creating Demo Tenant: HVAC Demo Corp\n');

  // Step 1: Create or find tenant
  console.log('📝 Creating tenant...');
  let tenant = await prisma.tenant.findFirst({
    where: { name: 'HVAC Demo Corp' },
  });
  
  if (!tenant) {
    tenant = await prisma.tenant.create({
      data: {
        name: 'HVAC Demo Corp',
        subdomain: 'demo',
        plan: 'professional',
        isActive: true,
      },
    });
  }
  console.log(`✅ Tenant: ${tenant.name}\n`);

  // Step 2: Create demo user with FIELD_MANAGER role
  console.log('👤 Creating demo user...');
  const hashedPassword = await bcrypt.hash('demo123', 10);
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@hvac.com' },
    update: {},
    create: {
      email: 'demo@hvac.com',
      password: hashedPassword,
      tenantId: tenant.id,
      firstName: 'Demo',
      lastName: 'User',
      isActive: true,
      emailVerified: true,
    },
  });

  // Assign FIELD_MANAGER role
  const fieldManagerRole = await prisma.role.findUnique({ where: { name: 'FIELD_MANAGER' } });
  if (fieldManagerRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: demoUser.id,
          roleId: fieldManagerRole.id,
        },
      },
      update: {},
      create: {
        userId: demoUser.id,
        roleId: fieldManagerRole.id,
      },
    });
  }
  console.log(`✅ Demo User: ${demoUser.email} (FIELD_MANAGER)\n`);

  // Step 3: Create additional technician users for dispatch
  console.log('👷 Creating technician users...');
  const technicians = [];
  const technicianRole = await prisma.role.findUnique({ where: { name: 'TECHNICIAN' } });
  
  const techNames = [
    { firstName: 'John', lastName: 'Smith' },
    { firstName: 'Sarah', lastName: 'Johnson' },
    { firstName: 'Mike', lastName: 'Williams' },
    { firstName: 'Lisa', lastName: 'Brown' },
    { firstName: 'David', lastName: 'Martinez' },
  ];

  for (const tech of techNames) {
    const email = `${tech.firstName.toLowerCase()}.${tech.lastName.toLowerCase()}@demo.hvac.com`;
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password: hashedPassword,
        tenantId: tenant.id,
        firstName: tech.firstName,
        lastName: tech.lastName,
        isActive: true,
        emailVerified: true,
      },
    });
    
    if (technicianRole) {
      await prisma.userRole.upsert({
        where: {
          userId_roleId: {
            userId: user.id,
            roleId: technicianRole.id,
          },
        },
        update: {},
        create: {
          userId: user.id,
          roleId: technicianRole.id,
        },
      });
    }
    
    technicians.push(user);
  }
  console.log(`✅ Created ${technicians.length} technician users\n`);

  // Step 4: Create CRM data (Accounts & Contacts)
  console.log('👥 Creating CRM data...');
  
  const accountsData = [
    { name: 'Johnson Residence', customerType: 'individual', address: '123 Oak Street, Springfield, IL 62701', phone: '(555) 123-4567' },
    { name: 'Smith Family Home', customerType: 'individual', address: '456 Maple Ave, Springfield, IL 62702', phone: '(555) 234-5678' },
    { name: 'Green Valley Apartments', customerType: 'business', address: '789 Pine Road, Springfield, IL 62703', phone: '(555) 345-6789' },
    { name: 'Downtown Office Tower', customerType: 'business', address: '321 Business Blvd, Springfield, IL 62704', phone: '(555) 456-7890' },
    { name: 'Riverside Shopping Mall', customerType: 'business', address: '654 Commerce Dr, Springfield, IL 62705', phone: '(555) 567-8901' },
    { name: 'Martinez Residence', customerType: 'individual', address: '987 Elm Street, Springfield, IL 62706', phone: '(555) 678-9012' },
    { name: 'Central High School', customerType: 'business', address: '147 Education Way, Springfield, IL 62707', phone: '(555) 789-0123' },
    { name: 'Anderson Family', customerType: 'individual', address: '258 Birch Lane, Springfield, IL 62708', phone: '(555) 890-1234' },
    { name: 'Sunset Medical Center', customerType: 'business', address: '369 Hospital Dr, Springfield, IL 62709', phone: '(555) 901-2345' },
    { name: 'Brown Residence', customerType: 'individual', address: '741 Cedar Ave, Springfield, IL 62710', phone: '(555) 012-3456' },
    { name: 'Lakeside Restaurant', customerType: 'business', address: '852 Lake View Rd, Springfield, IL 62711', phone: '(555) 123-4568' },
    { name: 'Taylor Family Home', customerType: 'individual', address: '963 Willow St, Springfield, IL 62712', phone: '(555) 234-5679' },
  ];

  const accounts = [];
  for (const accountData of accountsData) {
    const account = await prisma.account.create({
      data: {
        tenantId: tenant.id,
        name: accountData.name,
        accountNumber: `ACC-${Date.now()}-${accounts.length}`,
        customerType: accountData.customerType,
        billingAddress: accountData.address,
        phone: accountData.phone,
      },
    });
    accounts.push(account);
  }
  console.log(`✅ Created ${accounts.length} accounts`);

  // Create contacts for accounts
  const contactsData = [
    { accountIdx: 0, firstName: 'Robert', lastName: 'Johnson', email: 'robert.johnson@email.com', phone: '(555) 123-4567' },
    { accountIdx: 1, firstName: 'Mary', lastName: 'Smith', email: 'mary.smith@email.com', phone: '(555) 234-5678' },
    { accountIdx: 2, firstName: 'James', lastName: 'Green', email: 'james.green@greenvalley.com', phone: '(555) 345-6789', title: 'Property Manager' },
    { accountIdx: 3, firstName: 'Patricia', lastName: 'White', email: 'patricia.white@downtown.com', phone: '(555) 456-7890', title: 'Facilities Director' },
    { accountIdx: 4, firstName: 'Michael', lastName: 'River', email: 'michael.river@riverside.com', phone: '(555) 567-8901', title: 'Operations Manager' },
    { accountIdx: 5, firstName: 'Jennifer', lastName: 'Martinez', email: 'jennifer.martinez@email.com', phone: '(555) 678-9012' },
    { accountIdx: 6, firstName: 'William', lastName: 'Central', email: 'william.central@school.edu', phone: '(555) 789-0123', title: 'Maintenance Supervisor' },
    { accountIdx: 7, firstName: 'Linda', lastName: 'Anderson', email: 'linda.anderson@email.com', phone: '(555) 890-1234' },
    { accountIdx: 8, firstName: 'Richard', lastName: 'Sunset', email: 'richard.sunset@medical.com', phone: '(555) 901-2345', title: 'Facilities Manager' },
    { accountIdx: 9, firstName: 'Barbara', lastName: 'Brown', email: 'barbara.brown@email.com', phone: '(555) 012-3456' },
    { accountIdx: 10, firstName: 'Thomas', lastName: 'Lake', email: 'thomas.lake@lakeside.com', phone: '(555) 123-4568', title: 'General Manager' },
    { accountIdx: 11, firstName: 'Susan', lastName: 'Taylor', email: 'susan.taylor@email.com', phone: '(555) 234-5679' },
    { accountIdx: 2, firstName: 'Kevin', lastName: 'Assistant', email: 'kevin@greenvalley.com', phone: '(555) 345-6790', title: 'Assistant Manager' },
    { accountIdx: 3, firstName: 'Nancy', lastName: 'Office', email: 'nancy@downtown.com', phone: '(555) 456-7891', title: 'Office Manager' },
    { accountIdx: 4, firstName: 'Daniel', lastName: 'Shop', email: 'daniel@riverside.com', phone: '(555) 567-8902', title: 'Retail Manager' },
    { accountIdx: 6, firstName: 'Karen', lastName: 'School', email: 'karen@school.edu', phone: '(555) 789-0124', title: 'Principal' },
    { accountIdx: 8, firstName: 'Paul', lastName: 'Medical', email: 'paul@medical.com', phone: '(555) 901-2346', title: 'Chief Engineer' },
    { accountIdx: 10, firstName: 'Betty', lastName: 'Restaurant', email: 'betty@lakeside.com', phone: '(555) 123-4569', title: 'Owner' },
  ];

  const contacts = [];
  for (const contactData of contactsData) {
    const contact = await prisma.contact.create({
      data: {
        tenantId: tenant.id,
        accountId: accounts[contactData.accountIdx].id,
        name: `${contactData.firstName} ${contactData.lastName}`,
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        email: contactData.email,
        phone: contactData.phone,
        title: contactData.title,
        isPrimary: contacts.filter(c => c.accountId === accounts[contactData.accountIdx].id).length === 0,
      },
    });
    contacts.push(contact);
  }
  console.log(`✅ Created ${contacts.length} contacts`);

  // Create leads
  const leadsData = [
    { firstName: 'Christopher', lastName: 'Wilson', email: 'chris.wilson@email.com', phone: '(555) 111-2222', source: 'Website', status: 'NEW' as const },
    { firstName: 'Amanda', lastName: 'Moore', email: 'amanda.moore@email.com', phone: '(555) 222-3333', source: 'Referral', status: 'NEW' as const },
    { firstName: 'Matthew', lastName: 'Garcia', email: 'matthew.garcia@email.com', phone: '(555) 333-4444', source: 'Google Ads', status: 'QUALIFIED' as const },
    { firstName: 'Michelle', lastName: 'Lee', email: 'michelle.lee@email.com', phone: '(555) 444-5555', source: 'Facebook', status: 'QUALIFIED' as const },
    { firstName: 'Joshua', lastName: 'Harris', email: 'joshua.harris@business.com', phone: '(555) 555-6666', source: 'Cold Call', status: 'WON' as const, company: 'Harris Enterprises' },
    { firstName: 'Ashley', lastName: 'Clark', email: 'ashley.clark@email.com', phone: '(555) 666-7777', source: 'Trade Show', status: 'LOST' as const },
    { firstName: 'Andrew', lastName: 'Lewis', email: 'andrew.lewis@company.com', phone: '(555) 777-8888', source: 'Website', status: 'NEW' as const, company: 'Lewis Corp' },
    { firstName: 'Stephanie', lastName: 'Walker', email: 'stephanie.walker@email.com', phone: '(555) 888-9999', source: 'Referral', status: 'NEW' as const },
  ];

  const leads = [];
  for (const leadData of leadsData) {
    const lead = await prisma.lead.create({
      data: {
        tenantId: tenant.id,
        firstName: leadData.firstName,
        lastName: leadData.lastName,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company,
        source: leadData.source,
        status: leadData.status,
      },
    });
    leads.push(lead);
  }
  console.log(`✅ Created ${leads.length} leads`);

  // Create notes for contacts
  const notesData = [
    { contactIdx: 0, content: 'Customer requested maintenance on furnace before winter season.' },
    { contactIdx: 1, content: 'Scheduled annual AC maintenance for spring.' },
    { contactIdx: 2, content: 'Discussed new HVAC system installation for building expansion.' },
    { contactIdx: 3, content: 'Emergency repair completed on chiller unit. Follow-up in 2 weeks.' },
    { contactIdx: 0, content: 'Customer very satisfied with recent service.' },
    { contactIdx: 2, content: 'Sent quote for rooftop unit replacement.' },
    { contactIdx: 4, content: 'Monthly preventive maintenance scheduled for all retail spaces.' },
  ];

  for (const noteData of notesData) {
    await prisma.note.create({
      data: {
        tenantId: tenant.id,
        contactId: contacts[noteData.contactIdx].id,
        content: noteData.content,
      },
    });
  }
  console.log(`✅ Created ${notesData.length} notes\n`);

  // Step 5: Create inventory (SKUs, Warehouses, Bins, Stock)
  console.log('📦 Creating inventory...');

  // Create warehouses
  const warehousesData = [
    { name: 'Main Warehouse', address: '100 Industrial Park Dr, Springfield, IL 62701', isActive: true },
    { name: 'Service Van 1', address: 'Mobile', isActive: true },
    { name: 'Service Van 2', address: 'Mobile', isActive: true },
  ];

  const warehouses = [];
  for (const whData of warehousesData) {
    const wh = await prisma.warehouse.create({
      data: {
        tenantId: tenant.id,
        ...whData,
      },
    });
    warehouses.push(wh);
  }
  console.log(`✅ Created ${warehouses.length} warehouses`);

  // Create bins
  const binsData = [
    { warehouseIdx: 0, name: 'A-101', location: 'Aisle A, Row 1' },
    { warehouseIdx: 0, name: 'A-102', location: 'Aisle A, Row 2' },
    { warehouseIdx: 0, name: 'B-201', location: 'Aisle B, Row 1' },
    { warehouseIdx: 0, name: 'B-202', location: 'Aisle B, Row 2' },
    { warehouseIdx: 0, name: 'C-301', location: 'Aisle C, Row 1' },
    { warehouseIdx: 1, name: 'VAN1-MAIN', location: 'Main Storage' },
    { warehouseIdx: 1, name: 'VAN1-TOOLS', location: 'Tool Compartment' },
    { warehouseIdx: 2, name: 'VAN2-MAIN', location: 'Main Storage' },
    { warehouseIdx: 2, name: 'VAN2-TOOLS', location: 'Tool Compartment' },
    { warehouseIdx: 0, name: 'D-401', location: 'Aisle D, Row 1' },
  ];

  const bins = [];
  for (const binData of binsData) {
    const bin = await prisma.bin.create({
      data: {
        warehouseId: warehouses[binData.warehouseIdx].id,
        name: binData.name,
      },
    });
    bins.push(bin);
  }
  console.log(`✅ Created ${bins.length} bins`);

  // Create SKUs
  const skusData = [
    { code: 'FLT-16X20-M8', name: '16x20x1 MERV 8 Air Filter', category: 'Filters', unitPrice: 8.99, minStock: 50 },
    { code: 'FLT-20X25-M11', name: '20x25x1 MERV 11 Air Filter', category: 'Filters', unitPrice: 12.99, minStock: 40 },
    { code: 'FLT-16X25-M13', name: '16x25x1 MERV 13 Air Filter', category: 'Filters', unitPrice: 15.99, minStock: 30 },
    { code: 'REF-R410A-25', name: 'R-410A Refrigerant 25lb Cylinder', category: 'Refrigerants', unitPrice: 189.99, minStock: 10 },
    { code: 'REF-R22-30', name: 'R-22 Refrigerant 30lb Cylinder', category: 'Refrigerants', unitPrice: 299.99, minStock: 5 },
    { code: 'CAP-45-440V', name: '45µF 440V Run Capacitor', category: 'Parts', unitPrice: 24.99, minStock: 20 },
    { code: 'CAP-35-370V', name: '35µF 370V Run Capacitor', category: 'Parts', unitPrice: 19.99, minStock: 25 },
    { code: 'MTR-1HP-115V', name: '1HP 115V Condenser Motor', category: 'Parts', unitPrice: 189.99, minStock: 8 },
    { code: 'MTR-075HP-230V', name: '3/4HP 230V Blower Motor', category: 'Parts', unitPrice: 169.99, minStock: 8 },
    { code: 'CONT-40A-24V', name: '40A 24V Contactor', category: 'Parts', unitPrice: 34.99, minStock: 15 },
    { code: 'CONT-30A-24V', name: '30A 24V Contactor', category: 'Parts', unitPrice: 29.99, minStock: 15 },
    { code: 'TSTAT-PRO-WIFI', name: 'Pro WiFi Thermostat', category: 'Parts', unitPrice: 149.99, minStock: 12 },
    { code: 'TSTAT-PROG-7D', name: '7-Day Programmable Thermostat', category: 'Parts', unitPrice: 89.99, minStock: 15 },
    { code: 'COIL-3TON-AH', name: '3 Ton A-Coil Evaporator', category: 'Parts', unitPrice: 449.99, minStock: 4 },
    { code: 'COIL-4TON-AH', name: '4 Ton A-Coil Evaporator', category: 'Parts', unitPrice: 549.99, minStock: 3 },
    { code: 'COND-3TON-14S', name: '3 Ton 14 SEER Condenser', category: 'Equipment', unitPrice: 1299.99, minStock: 2 },
    { code: 'COND-4TON-16S', name: '4 Ton 16 SEER Condenser', category: 'Equipment', unitPrice: 1699.99, minStock: 2 },
    { code: 'FURN-80K-80AFUE', name: '80,000 BTU 80% AFUE Furnace', category: 'Equipment', unitPrice: 899.99, minStock: 2 },
    { code: 'FURN-100K-95AFUE', name: '100,000 BTU 95% AFUE Furnace', category: 'Equipment', unitPrice: 1399.99, minStock: 1 },
    { code: 'TOOL-GAUGE-MAN', name: 'Digital Manifold Gauge Set', category: 'Tools', unitPrice: 399.99, minStock: 3 },
    { code: 'TOOL-VAC-PUMP', name: '6CFM Vacuum Pump', category: 'Tools', unitPrice: 189.99, minStock: 3 },
    { code: 'TOOL-TORCH-KIT', name: 'Brazing Torch Kit', category: 'Tools', unitPrice: 129.99, minStock: 4 },
    { code: 'TOOL-MULTIMETER', name: 'Digital Multimeter HVAC', category: 'Tools', unitPrice: 79.99, minStock: 5 },
    { code: 'PART-BELT-3L', name: 'Blower Belt 3L x 38"', category: 'Parts', unitPrice: 12.99, minStock: 20 },
    { code: 'PART-IGNITOR-HS', name: 'Hot Surface Ignitor', category: 'Parts', unitPrice: 39.99, minStock: 15 },
    { code: 'PART-FLAME-SENS', name: 'Flame Sensor', category: 'Parts', unitPrice: 29.99, minStock: 15 },
    { code: 'PART-PRESS-SW', name: 'Pressure Switch', category: 'Parts', unitPrice: 44.99, minStock: 12 },
    { code: 'PART-GAS-VALVE', name: 'Gas Valve Assembly', category: 'Parts', unitPrice: 129.99, minStock: 8 },
    { code: 'PART-CIRC-BOARD', name: 'Control Circuit Board', category: 'Parts', unitPrice: 199.99, minStock: 6 },
    { code: 'PART-TRANS-40VA', name: '40VA Transformer 24V', category: 'Parts', unitPrice: 34.99, minStock: 15 },
    { code: 'COPPER-3/8-50', name: '3/8" Copper Tubing 50ft', category: 'Parts', unitPrice: 89.99, minStock: 10 },
    { code: 'COPPER-1/2-50', name: '1/2" Copper Tubing 50ft', category: 'Parts', unitPrice: 119.99, minStock: 10 },
    { code: 'COPPER-5/8-50', name: '5/8" Copper Tubing 50ft', category: 'Parts', unitPrice: 149.99, minStock: 8 },
    { code: 'DUCT-6-25', name: '6" Flex Duct 25ft', category: 'Parts', unitPrice: 49.99, minStock: 12 },
    { code: 'DUCT-8-25', name: '8" Flex Duct 25ft', category: 'Parts', unitPrice: 69.99, minStock: 12 },
  ];

  const skus = [];
  for (const skuData of skusData) {
    const sku = await prisma.sKU.create({
      data: {
        tenantId: tenant.id,
        ...skuData,
      },
    });
    skus.push(sku);
  }
  console.log(`✅ Created ${skus.length} SKUs`);

  // Create stock ledger entries (distribute stock across bins)
  const stockAssignments = [
    { skuIdx: 0, binIdx: 0, quantity: 120 },
    { skuIdx: 1, binIdx: 0, quantity: 85 },
    { skuIdx: 2, binIdx: 1, quantity: 65 },
    { skuIdx: 3, binIdx: 2, quantity: 15 },
    { skuIdx: 4, binIdx: 2, quantity: 8 },
    { skuIdx: 5, binIdx: 3, quantity: 45 },
    { skuIdx: 6, binIdx: 3, quantity: 52 },
    { skuIdx: 7, binIdx: 4, quantity: 12 },
    { skuIdx: 8, binIdx: 4, quantity: 10 },
    { skuIdx: 9, binIdx: 3, quantity: 28 },
    { skuIdx: 10, binIdx: 3, quantity: 31 },
    { skuIdx: 11, binIdx: 1, quantity: 24 },
    { skuIdx: 12, binIdx: 1, quantity: 18 },
    { skuIdx: 13, binIdx: 9, quantity: 6 },
    { skuIdx: 14, binIdx: 9, quantity: 4 },
    { skuIdx: 15, binIdx: 9, quantity: 3 },
    { skuIdx: 16, binIdx: 9, quantity: 2 },
    { skuIdx: 17, binIdx: 9, quantity: 3 },
    { skuIdx: 18, binIdx: 9, quantity: 2 },
    { skuIdx: 19, binIdx: 5, quantity: 1 },
    { skuIdx: 20, binIdx: 5, quantity: 1 },
    { skuIdx: 21, binIdx: 6, quantity: 2 },
    { skuIdx: 22, binIdx: 6, quantity: 3 },
    { skuIdx: 23, binIdx: 1, quantity: 35 },
    { skuIdx: 24, binIdx: 3, quantity: 22 },
    { skuIdx: 25, binIdx: 3, quantity: 18 },
    { skuIdx: 26, binIdx: 3, quantity: 16 },
    { skuIdx: 27, binIdx: 4, quantity: 10 },
    { skuIdx: 28, binIdx: 4, quantity: 8 },
    { skuIdx: 29, binIdx: 3, quantity: 20 },
    { skuIdx: 30, binIdx: 2, quantity: 14 },
    { skuIdx: 31, binIdx: 2, quantity: 16 },
    { skuIdx: 32, binIdx: 2, quantity: 11 },
    { skuIdx: 33, binIdx: 1, quantity: 18 },
    { skuIdx: 34, binIdx: 1, quantity: 15 },
  ];

  for (const stock of stockAssignments) {
    await prisma.stockLedger.create({
      data: {
        tenantId: tenant.id,
        skuId: skus[stock.skuIdx].id,
        binId: bins[stock.binIdx].id,
        quantity: stock.quantity,
        direction: 'IN',
        note: 'Initial Stock',
      },
    });
  }
  console.log(`✅ Created ${stockAssignments.length} stock ledger entries\n`);

  // Step 6: Create work orders
  console.log('📋 Creating work orders...');
  
  const now = new Date();
  const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  
  const workOrdersData = [
    { accountIdx: 0, type: 'Maintenance', priority: 'MEDIUM' as const, status: 'SCHEDULED' as const, title: 'Annual AC Maintenance', description: 'Annual air conditioning system maintenance and inspection', scheduledDate: daysAgo(5), techIdx: 0 },
    { accountIdx: 1, type: 'Emergency', priority: 'HIGH' as const, status: 'IN_PROGRESS' as const, title: 'No Heat - Furnace Not Working', description: 'Customer reports no heat. Furnace not igniting.', scheduledDate: daysAgo(1), techIdx: 1 },
    { accountIdx: 2, type: 'Installation', priority: 'MEDIUM' as const, status: 'NEW' as const, title: 'Install 3 Rooftop Units', description: 'Install three new 5-ton rooftop units for building expansion', scheduledDate: daysAgo(-7), techIdx: null },
    { accountIdx: 3, type: 'Emergency', priority: 'HIGH' as const, status: 'IN_PROGRESS' as const, title: 'Chiller Down - No Cooling', description: 'Main chiller not operating. Building overheating.', scheduledDate: daysAgo(0), techIdx: 2 },
    { accountIdx: 4, type: 'Maintenance', priority: 'LOW' as const, status: 'NEW' as const, title: 'Quarterly HVAC Inspection', description: 'Quarterly preventive maintenance on all retail space units', scheduledDate: daysAgo(-14), techIdx: null },
    { accountIdx: 5, type: 'Repair', priority: 'MEDIUM' as const, status: 'IN_PROGRESS' as const, title: 'AC Not Cooling Properly', description: 'Air conditioner running but not cooling effectively', scheduledDate: daysAgo(2), techIdx: 3 },
    { accountIdx: 6, type: 'Maintenance', priority: 'MEDIUM' as const, status: 'NEW' as const, title: 'Filter Replacement - All Units', description: 'Replace filters on all HVAC units throughout school', scheduledDate: daysAgo(-3), techIdx: null },
    { accountIdx: 7, type: 'Emergency', priority: 'HIGH' as const, status: 'IN_PROGRESS' as const, title: 'Gas Smell - Furnace Inspection', description: 'Customer reports gas smell near furnace. Immediate inspection needed.', scheduledDate: daysAgo(0), techIdx: 4 },
    { accountIdx: 8, type: 'Repair', priority: 'HIGH' as const, status: 'NEW' as const, title: 'Operating Room AC Failure', description: 'Air conditioning failure in operating room. Critical priority.', scheduledDate: daysAgo(1), techIdx: null },
    { accountIdx: 9, type: 'Maintenance', priority: 'LOW' as const, status: 'COMPLETED' as const, title: 'Fall Furnace Tune-Up', description: 'Pre-winter furnace maintenance and cleaning', scheduledDate: daysAgo(30), completedDate: daysAgo(30), techIdx: 0 },
    { accountIdx: 0, type: 'Repair', priority: 'MEDIUM' as const, status: 'COMPLETED' as const, title: 'Replace Capacitor', description: 'Diagnosed and replaced failed run capacitor', scheduledDate: daysAgo(45), completedDate: daysAgo(45), techIdx: 1 },
    { accountIdx: 1, type: 'Maintenance', priority: 'LOW' as const, status: 'COMPLETED' as const, title: 'Spring AC Startup', description: 'Spring AC system startup and inspection', scheduledDate: daysAgo(60), completedDate: daysAgo(60), techIdx: 0 },
    { accountIdx: 10, type: 'Installation', priority: 'MEDIUM' as const, status: 'COMPLETED' as const, title: 'Install Walk-in Cooler HVAC', description: 'Install new HVAC system for walk-in cooler/freezer', scheduledDate: daysAgo(75), completedDate: daysAgo(72), techIdx: 2 },
    { accountIdx: 3, type: 'Repair', priority: 'HIGH' as const, status: 'COMPLETED' as const, title: 'Replace Compressor', description: 'Replaced failed compressor on main cooling unit', scheduledDate: daysAgo(80), completedDate: daysAgo(79), techIdx: 3 },
    { accountIdx: 4, type: 'Maintenance', priority: 'LOW' as const, status: 'COMPLETED' as const, title: 'Monthly Filter Service', description: 'Monthly filter replacement service for all retail units', scheduledDate: daysAgo(35), completedDate: daysAgo(35), techIdx: 4 },
    { accountIdx: 11, type: 'Repair', priority: 'MEDIUM' as const, status: 'COMPLETED' as const, title: 'Thermostat Not Working', description: 'Replaced faulty thermostat with programmable model', scheduledDate: daysAgo(50), completedDate: daysAgo(50), techIdx: 1 },
    { accountIdx: 5, type: 'Inspection', priority: 'LOW' as const, status: 'COMPLETED' as const, title: 'Annual System Inspection', description: 'Annual HVAC system inspection and certification', scheduledDate: daysAgo(90), completedDate: daysAgo(90), techIdx: 0 },
    { accountIdx: 6, type: 'Repair', priority: 'MEDIUM' as const, status: 'ON_HOLD' as const, title: 'Gym Unit Not Heating', description: 'Gymnasium heating unit not producing heat. Awaiting parts.', scheduledDate: daysAgo(10), techIdx: null },
    { accountIdx: 7, type: 'Maintenance', priority: 'LOW' as const, status: 'ON_HOLD' as const, title: 'Duct Cleaning Service', description: 'Professional duct cleaning service. Customer to confirm date.', scheduledDate: daysAgo(-21), techIdx: null },
    { accountIdx: 8, type: 'Maintenance', priority: 'LOW' as const, status: 'CANCELLED' as const, title: 'Preventive Maintenance', description: 'Customer cancelled - switching to annual contract', scheduledDate: daysAgo(20), techIdx: null },
  ];

  const workOrders = [];
  for (const woData of workOrdersData) {
    const wo = await prisma.workOrder.create({
      data: {
        tenantId: tenant.id,
        accountId: accounts[woData.accountIdx].id,
        title: woData.title,
        description: woData.description,
        type: woData.type,
        priority: woData.priority,
        status: woData.status,
        scheduledDate: woData.scheduledDate,
        completedDate: woData.completedDate || null,
        assignedTo: woData.techIdx !== null ? technicians[woData.techIdx].id : null,
        createdBy: demoUser.id,
      },
    });
    workOrders.push(wo);
  }
  console.log(`✅ Created ${workOrders.length} work orders\n`);

  // Step 7: Create purchase orders
  console.log('🛒 Creating purchase orders...');
  
  const purchaseOrdersData = [
    { vendor: 'HVAC Supply Co', status: 'OPEN' as const, items: [{ skuIdx: 0, qty: 100 }, { skuIdx: 1, qty: 50 }] },
    { vendor: 'Parts Distributors Inc', status: 'OPEN' as const, items: [{ skuIdx: 5, qty: 25 }, { skuIdx: 6, qty: 25 }] },
    { vendor: 'Refrigerant Depot', status: 'OPEN' as const, items: [{ skuIdx: 3, qty: 10 }, { skuIdx: 4, qty: 5 }] },
    { vendor: 'HVAC Supply Co', status: 'OPEN' as const, items: [{ skuIdx: 11, qty: 12 }, { skuIdx: 12, qty: 8 }] },
    { vendor: 'Equipment Warehouse', status: 'OPEN' as const, items: [{ skuIdx: 15, qty: 2 }, { skuIdx: 16, qty: 1 }] },
    { vendor: 'Parts Distributors Inc', status: 'RECEIVED' as const, items: [{ skuIdx: 24, qty: 20 }, { skuIdx: 25, qty: 15 }] },
    { vendor: 'HVAC Supply Co', status: 'RECEIVED' as const, items: [{ skuIdx: 30, qty: 10 }, { skuIdx: 31, qty: 10 }] },
    { vendor: 'Parts Distributors Inc', status: 'OPEN' as const, items: [{ skuIdx: 9, qty: 15 }, { skuIdx: 10, qty: 15 }] },
  ];

  for (const poData of purchaseOrdersData) {
    let totalAmount = 0;
    for (const item of poData.items) {
      totalAmount += skus[item.skuIdx].unitPrice * item.qty;
    }

    const po = await prisma.purchaseOrder.create({
      data: {
        tenantId: tenant.id,
        vendor: poData.vendor,
        status: poData.status,
        totalAmount: totalAmount,
        orderDate: daysAgo(Math.floor(Math.random() * 30)),
        expectedDate: daysAgo(-7),
        createdBy: demoUser.id,
      },
    });

    // Note: PurchaseOrderItem model would need to be created to store line items
    // For now, we're just creating the PO headers
  }
  console.log(`✅ Created ${purchaseOrdersData.length} purchase orders\n`);

  // Step 8: Create field calculations
  console.log('🔧 Creating field calculations...');
  
  const calculationsData = [
    { type: 'BTU Calculation', category: 'Heating', inputs: { squareFeet: 1800, ceilingHeight: 8, insulation: 'Average' }, results: { btus: 54000, tonnage: 4.5 }, workOrderIdx: 0 },
    { type: 'Airflow Calculation', category: 'Ventilation', inputs: { cfm: 1200, ductSize: 8, velocity: 900 }, results: { staticPressure: 0.15 }, workOrderIdx: 1 },
    { type: 'Duct Sizing', category: 'Installation', inputs: { cfm: 1600, velocity: 800 }, results: { ductDiameter: 10, equivalentRect: '10x10' }, workOrderIdx: 2 },
    { type: 'Refrigerant Charge', category: 'Service', inputs: { lineLength: 25, lineDiameter: 0.75, refrigerant: 'R410A' }, results: { additionalOz: 6.5 }, workOrderIdx: 5 },
    { type: 'BTU Calculation', category: 'Cooling', inputs: { squareFeet: 2400, ceilingHeight: 9, insulation: 'Good' }, results: { btus: 60000, tonnage: 5 }, workOrderIdx: 12 },
  ];

  for (const calc of calculationsData) {
    await prisma.fieldCalculation.create({
      data: {
        tenantId: tenant.id,
        technicianId: demoUser.id,
        calculatorType: calc.type,
        category: calc.category,
        inputs: calc.inputs,
        results: calc.results,
        workOrderId: workOrders[calc.workOrderIdx].id,
      },
    });
  }
  console.log(`✅ Created ${calculationsData.length} field calculations\n`);

  // Step 9: Create notifications
  console.log('🔔 Creating notifications...');
  
  const notificationsData = [
    { type: 'WORK_ORDER_ASSIGNED', title: 'New Work Order Assigned', message: 'Emergency work order assigned: No Heat - Furnace Not Working', isRead: false },
    { type: 'INVENTORY_LOW', title: 'Low Stock Alert', message: 'SKU FLT-16X25-M13 is below minimum stock level', isRead: false },
    { type: 'PURCHASE_ORDER_APPROVED', title: 'Purchase Order Approved', message: 'Purchase order PO-2024-1234 has been approved', isRead: false },
    { type: 'WORK_ORDER_COMPLETED', title: 'Work Order Completed', message: 'Work order "Fall Furnace Tune-Up" has been completed', isRead: true },
    { type: 'NEW_LEAD', title: 'New Lead Created', message: 'New lead: Christopher Wilson from Website', isRead: false },
  ];

  for (const notif of notificationsData) {
    await prisma.notification.create({
      data: {
        tenantId: tenant.id,
        userId: demoUser.id,
        type: notif.type,
        title: notif.title,
        message: notif.message,
        isRead: notif.isRead,
      },
    });
  }
  console.log(`✅ Created ${notificationsData.length} notifications\n`);

  // Final summary
  console.log('═══════════════════════════════════════════════════');
  console.log('🎉 Demo Tenant Setup Complete!');
  console.log('═══════════════════════════════════════════════════');
  console.log('');
  console.log('🏢 Tenant: HVAC Demo Corp');
  console.log('📧 Demo User: demo@hvac.com');
  console.log('🔐 Password: demo123');
  console.log('👤 Role: FIELD_MANAGER');
  console.log('');
  console.log('📊 Sample Data Created:');
  console.log(`  • ${accounts.length} Customer Accounts`);
  console.log(`  • ${contacts.length} Contacts`);
  console.log(`  • ${leads.length} Leads`);
  console.log(`  • ${workOrders.length} Work Orders`);
  console.log(`  • ${skus.length} SKUs`);
  console.log(`  • ${warehouses.length} Warehouses`);
  console.log(`  • ${bins.length} Storage Bins`);
  console.log(`  • ${purchaseOrdersData.length} Purchase Orders`);
  console.log(`  • ${technicians.length} Technician Users`);
  console.log(`  • ${calculationsData.length} Field Calculations`);
  console.log(`  • ${notificationsData.length} Notifications`);
  console.log('');
  console.log('🚀 Ready to explore all features!');
  console.log('═══════════════════════════════════════════════════');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
