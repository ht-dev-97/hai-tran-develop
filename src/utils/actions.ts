import { serverFetch } from './http'

interface EnvironmentResponse {
  environment: string
}

export const getEnvironment = async () => {
  try {
    const data = await serverFetch.get<EnvironmentResponse>('/api/environment')
    if (!data) return 'dev'

    return data.environment ?? 'dev'
  } catch (error) {
    console.error('Error fetching environment:', error)
    return 'dev'
  }
}
