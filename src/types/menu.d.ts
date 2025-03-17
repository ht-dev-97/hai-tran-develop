import { LIST_MENU } from '@/constants'

export interface MenuItem {
  href: string
  name: string
  label: string
}

export type MenuItemName = (typeof LIST_MENU)[number]['name']
