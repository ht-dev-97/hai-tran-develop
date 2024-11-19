/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpError,
  HttpMethod,
  HttpResponse,
  RequestConfig,
  RetryConfig
} from '../types/fetch'
import {
  createQueryString,
  getBaseUrl,
  parseResponse,
  retryRequest,
  timeout
} from '../utils/fetch-utils'

class HttpClient {
  private baseUrl: string
  private defaultConfig: RequestConfig = {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    // credentials: 'include',
    cache: 'no-store'
  }

  private defaultRetryConfig: RetryConfig = {
    retries: 3,
    retryDelay: 1000,
    retryCondition: (error: any) => {
      if (error instanceof HttpError) {
        return error.status >= 500 || error.status === 429
      }
      return true
    }
  }

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || getBaseUrl(false)
  }

  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('access_token')
  }

  private mergeConfig(config?: RequestConfig): RequestConfig {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { requireAuth, params, ...restConfig } = config || {}
    const accessToken = this.getAccessToken()

    return {
      ...this.defaultConfig,
      ...restConfig,
      headers: {
        ...this.defaultConfig.headers,
        ...(restConfig?.headers || {}),
        ...(requireAuth && accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {})
      }
    }
  }

  private getFullUrl(url: string, params?: Record<string, string>): string {
    const queryString = createQueryString(params)

    if (url.startsWith('http://') || url.startsWith('https://')) {
      return queryString ? `${url}?${queryString}` : url
    }

    const hasLeadingSlash = url.startsWith('/')
    const hasTrailingSlash = this.baseUrl.endsWith('/')

    const fullUrl = `${this.baseUrl}${hasLeadingSlash || hasTrailingSlash ? '' : '/'}${url}`

    return queryString ? `${fullUrl}?${queryString}` : fullUrl
  }

  private async handleResponse<T>(
    response: Response,
    config: RequestConfig
  ): Promise<HttpResponse<T>> {
    const data = (await parseResponse(response)) as T

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText, data)
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config
    }
  }

  private async request<T = any>(
    method: HttpMethod,
    url: string,
    config?: RequestConfig & { body?: any }
  ): Promise<HttpResponse<T>> {
    const mergedConfig = this.mergeConfig(config)
    const { timeout: timeoutMs, params, ...fetchConfig } = mergedConfig

    const controller = new AbortController()
    const { signal } = controller

    try {
      const request = async (): Promise<HttpResponse<T>> => {
        const response = (await Promise.race([
          fetch(this.getFullUrl(url, params), {
            ...fetchConfig,
            method,
            signal,
            body: fetchConfig.body
              ? JSON.stringify(fetchConfig.body)
              : undefined
          }),
          timeoutMs ? timeout(timeoutMs) : new Promise(() => {})
        ])) as Response

        return this.handleResponse<T>(response, mergedConfig)
      }

      return await retryRequest(request, this.defaultRetryConfig)
    } catch (error) {
      if (error instanceof HttpError) throw error

      throw new HttpError(
        0,
        error instanceof Error ? error.message : 'Unknown error occurred'
      )
    } finally {
      controller.abort()
    }
  }

  public async get<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    return this.request<T>('GET', url, config)
  }

  public async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    return this.request<T>('POST', url, { ...config, body: data })
  }

  public async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    return this.request<T>('PUT', url, { ...config, body: data })
  }

  public async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    return this.request<T>('PATCH', url, { ...config, body: data })
  }

  public async delete<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    return this.request<T>('DELETE', url, config)
  }
}

export const clientFetch = new HttpClient()
