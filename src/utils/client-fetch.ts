type FetchOptions = RequestInit
type FetchInput = RequestInfo | URL

class FetchError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = "FetchError"
  }
}

class HttpClient {
  private defaultOptions: FetchOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  }

  private mergeOptions(options?: FetchOptions): FetchOptions {
    return {
      ...this.defaultOptions,
      ...options,
      headers: {
        ...this.defaultOptions.headers,
        ...(options?.headers ?? {}),
      },
    }
  }

  private handleResponse(response: Response): Response {
    if (!response.ok) {
      if (response.status === 401) {
        console.log("401 - Unauthorized")
        window.location.href = "/api/auth/logout"
        throw new FetchError(response.status, "Unauthorized")
      }
      throw new FetchError(
        response.status,
        `HTTP error! status: ${response.status}`
      )
    }
    return response
  }

  private handleError(error: unknown): never {
    if (error instanceof FetchError) {
      console.error(`FetchError: ${error.message} (Status: ${error.status})`)
    } else if (error instanceof TypeError) {
      console.error("Network error:", error.message)
    } else {
      console.error("An unexpected error occurred:", error)
    }
    throw error
  }

  public async fetch(
    url: FetchInput,
    options?: FetchOptions
  ): Promise<Response | null> {
    try {
      const mergedOptions = this.mergeOptions(options)
      const response = await fetch(url, mergedOptions)
      return this.handleResponse(response)
    } catch (error) {
      this.handleError(error)
    }
  }

  public async get(
    url: string,
    options?: FetchOptions
  ): Promise<Response | null> {
    return this.fetch(url, {
      ...options,
      method: "GET",
    })
  }

  public async post<T>(
    url: string,
    body: T,
    options?: FetchOptions
  ): Promise<Response | null> {
    return this.fetch(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    })
  }

  public async put<T>(
    url: string,
    body: T,
    options?: FetchOptions
  ): Promise<Response | null> {
    return this.fetch(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    })
  }

  public async delete(
    url: string,
    options?: FetchOptions
  ): Promise<Response | null> {
    return this.fetch(url, {
      ...options,
      method: "DELETE",
    })
  }
}

export const clientFetch = new HttpClient()
