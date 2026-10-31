const apiBase = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export async function getVehicles({ search, page, signal }) {
  const params = new URLSearchParams({ page: String(page), limit: '12' });
  if (search) params.set('search', search);

  const response = await fetch(`${apiBase}/public/vehicles?${params}`, { signal });
  if (!response.ok) {
    let message = 'Vehicle listings could not be loaded.';
    try {
      const body = await response.json();
      message = body.error?.message || message;
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error;
    }
    throw new Error(message);
  }
  return response.json();
}
