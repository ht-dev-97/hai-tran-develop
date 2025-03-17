export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface RequestConfig extends Omit<RequestInit, 'method' | 'body'> {
  params?: Record<string, string>
  requireAuth?: boolean
  accessToken?: string
  timeout?: number
  body?: unknown
}

export interface HttpResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: Headers
  config: RequestConfig
}

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

export interface RetryConfig {
  retries: number
  retryDelay: number
  retryCondition?: (error: unknown) => boolean
}
