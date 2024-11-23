import { HttpError } from '@/types/fetch'

export function createQueryString(params?: Record<string, string>): string {
  if (!params) return ''
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value)
    }
  })
  return searchParams.toString()
}

export async function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new HttpError(408, `Request timeout after ${ms}ms`))
    }, ms)
  })
}

export function parseResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return response.json()
  }
  if (contentType?.includes('text/')) {
    return response.text()
  }
  if (contentType?.includes('form')) {
    return response.formData()
  }
  if (contentType?.includes('video/') || contentType?.includes('image/')) {
    return response.blob()
  }
  return response.text()
}

export function getBaseUrl(isServer: boolean): string {
  return isServer
    ? process.env.API_BASE_URL || ''
    : process.env.NEXT_PUBLIC_API_BASE_URL || ''
}

export async function retryRequest<T>(
  request: () => Promise<T>,
  {
    retries,
    retryDelay,
    retryCondition
  }: {
    retries: number
    retryDelay: number
    retryCondition?: (error: unknown) => boolean
  }
): Promise<T> {
  try {
    return await request()
  } catch (error) {
    if (retries > 0 && (!retryCondition || retryCondition(error))) {
      await new Promise((resolve) => setTimeout(resolve, retryDelay))
      return retryRequest(request, {
        retries: retries - 1,
        retryDelay,
        retryCondition
      })
    }
    throw error
  }
}
