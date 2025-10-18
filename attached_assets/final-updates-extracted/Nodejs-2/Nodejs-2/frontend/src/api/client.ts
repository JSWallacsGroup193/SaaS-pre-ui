async function baseFetch(path: string, options: RequestInit = {}) {
  const base = import.meta.env.VITE_API_URL || '/api/v1';
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(base + path, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

// axios removed


// Optional: configure generated client if present
export async function configureGeneratedClient(token?: string) {
  try {
    const mod = await import('./core/OpenAPI');
    const { OpenAPI } = mod as any;
    OpenAPI.BASE = import.meta.env.VITE_API_URL || '/api/v1';
    if (token) {
      OpenAPI.TOKEN = async () => token;
    }
    return true;
  } catch {
    return false; // generated client not present yet
  }
}

async function useGeneratedRequest() {
  try {
    const mod = await import('./core/request');
    const { request } = mod as any;
    const { OpenAPI } = await import('./core/OpenAPI') as any;
    return { request, OpenAPI };
  } catch {
    return null;
  }
}

export async function listSkus() {
  const gen = await useGeneratedRequest();
  if (gen) {
    const { request, OpenAPI } = gen;
    return request(OpenAPI, { method: 'GET', url: '/inventory/skus' });
  }
  const { data } = await api.get('/inventory/skus');
  return data;
}

export async function forecastForSku(skuId: string, lead: number, safety: number) {
  const gen = await useGeneratedRequest();
  if (gen) {
    const { request, OpenAPI } = gen;
    return request(OpenAPI, { method: 'GET', url: `/forecast/sku/${skuId}`, query: { lead, safety } });
  }
  const { data } = await api.get(`/forecast/sku/${skuId}`, { params: { lead, safety } });
  return data;
}

import { getTenantIdFromStorage } from '../utils/auth';

export async function listWorkOrders() {
  const tenantId = getTenantIdFromStorage();
  if (!tenantId) throw new Error('No tenantId in token');
  const gen = await useGeneratedRequest();
  if (gen) {
    const { request, OpenAPI } = gen;
    return request(OpenAPI, { method: 'GET', url: `/work-orders/${tenantId}` });
  }
  const res = await api.get(`/work-orders/${tenantId}`);
  return res.data;
}

export async function createWorkOrder(title: string, description?: string) {
  const tenantId = getTenantIdFromStorage();
  if (!tenantId) throw new Error('No tenantId in token');
  const payload = { tenantId, title, description };
  const gen = await useGeneratedRequest();
  if (gen) {
    const { request, OpenAPI } = gen;
    return request(OpenAPI, { method: 'POST', url: `/work-orders`, body: payload });
  }
  const res = await api.post('/work-orders', payload);
  return res.data;
}

export async function updateWorkOrderStatus(id: string, status: string) {
  const gen = await useGeneratedRequest();
  if (gen) {
    const { request, OpenAPI } = gen;
    return request(OpenAPI, { method: 'PUT', url: `/work-orders/${id}/status`, body: { status } });
  }
  const res = await api.put(`/work-orders/${id}/status`, { status });
  return res.data;
}

export async function chat(prompt: string, tenantContext?: string) {
  const gen = await useGeneratedRequest();
  if (gen) {
    const { request, OpenAPI } = gen;
    return request(OpenAPI, { method: 'POST', url: '/chat', body: { prompt, tenantContext } });
  }
  return baseFetch('/chat', { method: 'POST', body: JSON.stringify({ prompt, tenantContext }) });
}

export async function login(email: string, password: string) {
  // Prefer generated client if present
  const gen = await useGeneratedRequest();
  if (gen) {
    const { request, OpenAPI } = gen;
    return request(OpenAPI, { method: 'POST', url: '/auth/login', body: { email, password } });
  }
  return baseFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export async function register(email: string, password: string, tenantId: string) {
  const gen = await useGeneratedRequest();
  if (gen) {
    const { request, OpenAPI } = gen;
    return request(OpenAPI, { method: 'POST', url: '/auth/register', body: { email, password, tenantId } });
  }
  return baseFetch('/auth/register', { method: 'POST', body: JSON.stringify({ email, password, tenantId }) });
}

// --- CRM ---
import { getTenantIdFromStorage } from '../utils/auth';

export async function crmListAccounts() {
  const tenantId = getTenantIdFromStorage();
  if (!tenantId) throw new Error('No tenantId in token');
  const gen = await useGeneratedRequest();
  if (gen) { const { request, OpenAPI } = gen; return request(OpenAPI, { method: 'GET', url: `/crm/accounts/${tenantId}` }); }
  return baseFetch(`/crm/accounts/${tenantId}`);
}

export async function crmListContacts() {
  const tenantId = getTenantIdFromStorage();
  if (!tenantId) throw new Error('No tenantId in token');
  const gen = await useGeneratedRequest();
  if (gen) { const { request, OpenAPI } = gen; return request(OpenAPI, { method: 'GET', url: `/crm/contacts/${tenantId}` }); }
  return baseFetch(`/crm/contacts/${tenantId}`);
}

export async function crmListLeads() {
  const tenantId = getTenantIdFromStorage();
  if (!tenantId) throw new Error('No tenantId in token');
  const gen = await useGeneratedRequest();
  if (gen) { const { request, OpenAPI } = gen; return request(OpenAPI, { method: 'GET', url: `/crm/leads/${tenantId}` }); }
  return baseFetch(`/crm/leads/${tenantId}`);
}

// --- Dispatch ---
export async function dispatchAll() {
  const gen = await useGeneratedRequest();
  if (gen) { const { request, OpenAPI } = gen; return request(OpenAPI, { method: 'GET', url: '/dispatch/all' }); }
  return baseFetch('/dispatch/all');
}

// --- Purchasing ---
export async function purchasingList(page=1, pageSize=50) {
  const gen = await useGeneratedRequest();
  if (gen) { const { request, OpenAPI } = gen; return request(OpenAPI, { method: 'GET', url: '/purchasing', query: { page, pageSize } }); }
  return baseFetch(`/purchasing?page=${page}&pageSize=${pageSize}`);
}
export async function purchasingReceive(id: string) {
  const gen = await useGeneratedRequest();
  if (gen) { const { request, OpenAPI } = gen; return request(OpenAPI, { method: 'PUT', url: `/purchasing/${id}/receive` }); }
  return baseFetch(`/purchasing/${id}/receive`, { method: 'PUT' });
}

// --- Labels ---
export function generateZPLLocal(skuName: string, barcode: string) {
  return `
^XA
^FO50,50^ADN,36,20^FD${skuName}^FS
^FO50,100^BCN,100,Y,N,N
^FD${barcode}^FS
^XZ`.trim();
}

// --- Scanner (client-side lookup using SKUs) ---
export async function scanLocalMatch(barcode: string) {
  const list = await listSkusPaginated('', 1, 500);
  const items = list.items || [];
  const hit = items.find((i:any) => i.barcode === barcode || i.name === barcode || i.description?.includes(barcode));
  if (hit) return { found: true, sku: hit };
  return { found: false };
}

// --- Dashboard stats (derived) ---
export async function dashboardStats() {
  const workOrders = await listWorkOrders().catch(()=>[]);
  const dispatch = await dispatchAll().catch(()=>[]);
  const inv = await listSkusPaginated('',1,500).catch(()=>({items:[]}));
  const jobs = Array.isArray(workOrders) ? workOrders.length : 0;
  const techs = Array.from(new Set((dispatch || []).map((d:any)=> d.technician?.name).filter(Boolean))).length;
  const low = (inv.items || []).filter((i:any)=> (i.quantity ?? 0) < 5).length; // heuristic
  return { jobs, techs, low };
}
