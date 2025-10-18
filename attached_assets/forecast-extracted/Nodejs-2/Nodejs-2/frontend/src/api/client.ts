import api from '../utils/axiosClient';

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
