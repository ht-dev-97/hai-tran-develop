export const getEnvironment = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/environment')
    const data = await response.json()
    return data.environment ?? 'dev'
  } catch (error) {
    console.error('Error fetching environment:', error)
    return 'dev'
  }
}
