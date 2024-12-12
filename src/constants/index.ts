export const THEMS = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' }
]

export const LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    flag: '🇻🇳'
  }
]

export const LIST_MENU = [
  { href: '/', name: 'home', label: 'Home' },
  { href: '/topics', name: 'topics', label: 'Topics' },
  { href: '/posts', name: 'posts', label: 'Posts' },
  { href: '/blogs', name: 'blogs', label: 'Blogs' },
  { href: '/fetch-api', name: 'fetch-api', label: 'Fetch API' }
] as const

export const TOPICS = {
  'UI NextJS': [
    'Combobox',
    'Auto Scroll',
    'Sticky Title',
    'Carousel',
    'Form Demo',
    'MapBox',
    'Toast',
    'Glowing Hover',
    'Cursor Effect'
  ],
  'Route Handlers': ['Environment', 'Host IP'],
  'Global State': ['Zustand']
}

export const MAP_CONSTANTS = {
  DEFAULT_VIEW_STATE: {
    longitude: -73.935242,
    latitude: 40.73061,
    zoom: 12
  },
  DEFAULT_ZOOM: {
    LOCATION: 14
  },
  ROUTE_LAYER: {
    id: 'route',
    type: 'line',
    paint: {
      'line-color': '#F09319',
      'line-width': 5,
      'line-opacity': 0.75
    }
  } as const
} as const
