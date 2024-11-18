import { serverFetch } from './server-fetch'

export const getEnvironment = async () => {
  try {
    const data = await serverFetch.get<{ environment?: string }>(
      '/api/environment'
    )
    return data.environment ?? 'dev'
  } catch (error) {
    console.error('Error fetching environment:', error)
    return 'dev'
  }
}
