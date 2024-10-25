export const formatSlug = (topic: string) =>
  topic.toLowerCase().replace(' ', '-').replace('.', '')

export const getEnv = (host: string): string => {
  if (host.includes('localhost') || host.includes('dev')) return 'dev'
  if (host.includes('stage')) return 'stage'
  return 'prod'
}

export const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 50%)`
}

export const getRandomGradient = () => {
  const color1 = getRandomColor()
  const color2 = getRandomColor()
  return `linear-gradient(135deg, ${color1}, ${color2})`
}
