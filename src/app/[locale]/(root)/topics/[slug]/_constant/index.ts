import AutoScroll from '../_components/auto-scroll'
import CarouselSize from '../_components/carousel'
import Combobox from '../_components/combobox'
import CursorEffect from '../_components/cursor-effect'
import Environment from '../_components/environment'
import FormDemo from '../_components/form-demo'
import GlowingHover from '../_components/glowing-hover'
import HostIP from '../_components/host-ip'
import Mapbox from '../_components/mapbox'
import StickyTitle from '../_components/sticky-title'
import ToastDemo from '../_components/toast'
import Zustand from '../_components/zustand'
import { ItemHover } from '../_types'

export const componentsMap: { [key: string]: React.ComponentType } = {
  zustand: Zustand,
  environment: Environment,
  'host-ip': HostIP,
  combobox: Combobox,
  'auto-scroll': AutoScroll,
  'sticky-title': StickyTitle,
  carousel: CarouselSize,
  'form-demo': FormDemo,
  mapbox: Mapbox,
  toast: ToastDemo,
  'glowing-hover': GlowingHover,
  'cursor-effect': CursorEffect
}

export const GLOWING_CARDS = [
  { id: 1, glowColor: 'rgb(255, 0, 0)', title: 'Red Card' },
  { id: 2, glowColor: 'rgb(0, 255, 0)', title: 'Green Card' },
  { id: 3, glowColor: 'rgb(255, 255, 0)', title: 'Yellow Card' }
]

export const LIST_HOVER: ItemHover[] = [
  {
    id: 1,
    name: 'home',
    path: '/'
  },
  {
    id: 2,
    name: 'about',
    path: '/about'
  },
  {
    id: 3,
    name: 'services',
    path: '/services'
  },
  {
    id: 4,
    name: 'contact',
    path: '/contact'
  }
]
