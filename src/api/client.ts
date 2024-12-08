import { API_BASE_URL, API_VERSION } from './config';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new ApiError(response.status, error.message);
  }
  return response.json();
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, ...init } = options;
  
  // Build URL with query parameters
  const url = new URL(`${API_BASE_URL}/${API_VERSION}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  // Add default headers
  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && init.method !== 'GET') {
    headers.set('Content-Type', 'application/json');
  }

  const token = localStorage.getItem('auth_token');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url.toString(), {
    ...init,
    headers
  });

  return handleResponse<T>(response);
}