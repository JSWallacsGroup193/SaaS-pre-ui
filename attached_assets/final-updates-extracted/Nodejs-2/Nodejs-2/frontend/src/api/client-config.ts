// Configure generated client at runtime
import { OpenAPI } from './core/OpenAPI'; // generated path
export function configureApi(token?: string) {
  OpenAPI.BASE = import.meta.env.VITE_API_URL || '/api';
  OpenAPI.TOKEN = token ? async () => token : undefined;
}
