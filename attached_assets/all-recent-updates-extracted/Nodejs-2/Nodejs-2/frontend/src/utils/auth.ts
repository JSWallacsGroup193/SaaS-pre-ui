export function decodeJwt<T = any>(token?: string): T | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const json = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(json))) as T;
  } catch { return null; }
}

export function getTenantIdFromStorage(): string | null {
  const token = localStorage.getItem('token') || '';
  const payload = decodeJwt<{ tenantId?: string }>(token);
  return payload?.tenantId || null;
}
