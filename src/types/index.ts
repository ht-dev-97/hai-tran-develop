import { LIST_MENU } from '@/constants'

export type SVGProps = React.SVGProps<SVGSVGElement>

export interface MenuItem {
  href: string
  name: string
  label: string
}

export type MenuItemName = (typeof LIST_MENU)[number]['name']

export interface Location {
  longitude: number
  latitude: number
  name: string
}

export interface ViewState {
  longitude: number
  latitude: number
  zoom: number
}

export interface RouteData {
  type: 'Feature'
  properties: Record<string, unknown>
  geometry: {
    type: 'LineString'
    coordinates: [number, number][]
  }
}
