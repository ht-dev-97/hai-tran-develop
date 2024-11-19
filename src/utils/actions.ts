import { serverFetch } from './server-fetch'

export const getEnvironment = async () => {
  try {
    const response = await serverFetch.get('/api/environment')
    if (response && response.data) {
      const data = response.data
      return data.environment ?? 'dev'
    }
  } catch (error) {
    console.error('Error fetching environment:', error)
    return 'dev'
  }
}
