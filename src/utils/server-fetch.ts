/* eslint-disable @typescript-eslint/no-explicit-any */
type FetchOptions = {
  cache?: RequestCache
  tags?: string[]
  revalidate?: number | false
  headers?: HeadersInit
  method?: string
  body?: any
  access_token?: string
}

type ServerFetchConfig = {
  baseUrl?: string
  defaultHeaders?: HeadersInit
}

export class ServerFetchError extends Error {
  constructor(
    public status: number,
    public data: any,
    message?: string
  ) {
    super(message || `Server fetch failed with status ${status}`)
    this.name = 'ServerFetchError'
  }
}

export class ServerFetch {
  private baseUrl: string
  private defaultHeaders: HeadersInit

  constructor(config: ServerFetchConfig = {}) {
    this.baseUrl = config.baseUrl || process.env.API_BASE_URL || ''
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.defaultHeaders
    }
  }

  async fetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
    const {
      cache = 'no-store',
      tags,
      revalidate,
      headers,
      method = 'GET',
      body,
      access_token
    } = options

    const url = this.buildUrl(path)

    const fetchOptions: RequestInit = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {})
      },
      cache,
      next: {
        tags,
        revalidate
      }
    }

    if (body) {
      fetchOptions.body = JSON.stringify(body)
    }

    const response = await fetch(url, fetchOptions)
    const data = await response.json()

    // Handle response errors
    if (!response.ok) {
      throw new ServerFetchError(response.status, data)
    }

    return data as T
  }

  private buildUrl(path: string): string {
    if (path.startsWith('http')) {
      return path
    }
    return `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`
  }

  // Convenience methods for common HTTP methods
  async get<T>(
    path: string,
    options: Omit<FetchOptions, 'method' | 'body'> = {}
  ) {
    return this.fetch<T>(path, { ...options, method: 'GET' })
  }

  async post<T>(
    path: string,
    body: T,
    options: Omit<FetchOptions, 'method'> = {}
  ) {
    return this.fetch<T>(path, { ...options, method: 'POST', body })
  }

  async put<T>(
    path: string,
    body: T,
    options: Omit<FetchOptions, 'method'> = {}
  ) {
    return this.fetch<T>(path, { ...options, method: 'PUT', body })
  }

  async patch<T>(
    path: string,
    body: T,
    options: Omit<FetchOptions, 'method'> = {}
  ) {
    return this.fetch<T>(path, { ...options, method: 'PATCH', body })
  }

  async delete<T>(
    path: string,
    options: Omit<FetchOptions, 'method' | 'body'> = {}
  ) {
    return this.fetch<T>(path, { ...options, method: 'DELETE' })
  }
}

// Create a default instance
export const serverFetch = new ServerFetch()
