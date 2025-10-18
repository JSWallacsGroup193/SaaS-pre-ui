// Configure generated client at runtime
export async function configureApi(token?: string) {
  try {
    // Use dynamic string to prevent Vite from analyzing this import
    const path = `./core/${'OpenAPI'}`;
    const { OpenAPI } = await import(/* @vite-ignore */ path);
    OpenAPI.BASE = import.meta.env.VITE_API_URL || '/api/v1';
    OpenAPI.TOKEN = token ? async () => token : undefined;
    return true;
  } catch {
    return false; // generated client not available
  }
}
