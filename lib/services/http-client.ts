// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://emailez-api-apbhbpc8dcb9a9hc.southeastasia-01.azurewebsites.net';

// HTTP client configuration
interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  token?: string; // Auth token to include in requests
}

// Universal fetch wrapper that works on both client and server
class HttpClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;
  private tokenGetter: (() => string | null) | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Set token getter function that will be called for each request
  setTokenGetter(getter: (() => string | null) | null): void {
    this.tokenGetter = getter;
  }

  // Get the current token using the getter
  getToken(): string | null {
    return this.tokenGetter ? this.tokenGetter() : null;
  }


  private getAuthHeader(options: FetchOptions = {}): HeadersInit {
    // Priority: explicit token > token getter > no token
    const token = options.token || this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = `${this.baseUrl}${endpoint}`;
    if (!params) return url;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { params, timeout = 30000, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      // Get auth headers if token is provided
      const authHeaders = this.getAuthHeader(options);
      
      const response = await fetch(url, {
        method,
        signal: controller.signal,
        headers: {
          ...this.defaultHeaders,
          ...authHeaders,
          ...fetchOptions.headers,
        },
        ...fetchOptions,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>('GET', endpoint, options);
  }

  async post<T>(endpoint: string, body?: any, options?: FetchOptions): Promise<T> {
    return this.request<T>('POST', endpoint, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: any, options?: FetchOptions): Promise<T> {
    return this.request<T>('PUT', endpoint, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(endpoint: string, body?: any, options?: FetchOptions): Promise<T> {
    return this.request<T>('PATCH', endpoint, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>('DELETE', endpoint, options);
  }

  // Custom headers for specific requests
  withHeaders(headers: HeadersInit) {
    const client = new HttpClient(this.baseUrl);
    client.defaultHeaders = { ...this.defaultHeaders, ...headers };
    return client;
  }

  // Extract token from session cookie (useful for server-side requests)
  static getTokenFromCookie(cookieString: string, cookieName: string = '__session'): string | null {
    if (!cookieString) return null;
    
    const cookies = cookieString.split(';').map(cookie => cookie.trim());
    const sessionCookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
    
    if (!sessionCookie) return null;
    
    const cookieValue = sessionCookie.split('=')[1];
    if (!cookieValue) return null;
    
    try {
      // Cookie value might be URL encoded
      const decodedValue = decodeURIComponent(cookieValue);
      
      // If it's a JWT, return it directly
      if (decodedValue.startsWith('eyJ')) {
        return decodedValue;
      }
      
      // If it's a JSON object, try to parse it and extract the token
      if (decodedValue.startsWith('{')) {
        const sessionData = JSON.parse(decodedValue);
        return sessionData.token || sessionData.access_token || sessionData.jwt || null;
      }
      return decodedValue;
    } catch (error) {
      console.warn('Failed to parse session cookie:', error);
      return null;
    }
  }

  // Helper method to get token from request headers (for server-side usage)
  static getTokenFromRequest(request: Request): string | null {
    // First try Authorization header
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    
    // Then try session cookie
    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      return HttpClient.getTokenFromCookie(cookieHeader);
    }
    
    return null;
  }
}

// Global HTTP client instance
export const httpClient = new HttpClient();

// Export types for consumers
export type { FetchOptions };
export { HttpClient };
