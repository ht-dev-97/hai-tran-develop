import AutoScroll from '../_components/auto-scroll'
import CarouselSize from '../_components/carousel'
import Combobox from '../_components/combobox'
import Environment from '../_components/environment'
import FormDemo from '../_components/form-demo'
import HostIP from '../_components/host-ip'
import Mapbox from '../_components/mapbox'
import StickyTitle from '../_components/sticky-title'
import Zustand from '../_components/zustand'

export const componentsMap: { [key: string]: React.ComponentType } = {
  zustand: Zustand,
  environment: Environment,
  'host-ip': HostIP,
  combobox: Combobox,
  'auto-scroll': AutoScroll,
  'sticky-title': StickyTitle,
  carousel: CarouselSize,
  'form-demo': FormDemo,
  mapbox: Mapbox
}

export const VIETNAM_BOUNDS = {
  north: 23.393395,
  south: 8.559611,
  west: 102.148224,
  east: 109.469469
}

export const VIETNAM_CENTER: [number, number] = [105.8342, 16.8534]

export const MAJOR_CITIES = [
  { name: 'Hanoi', coordinates: [105.8342, 21.0285] },
  { name: 'Ho Chi Minh City', coordinates: [106.6297, 10.8231] },
  { name: 'Da Nang', coordinates: [108.2022, 16.0544] },
  { name: 'Hue', coordinates: [107.5902, 16.4637] },
  { name: 'Nha Trang', coordinates: [109.1762, 12.2388] },
  { name: 'Can Tho', coordinates: [105.7852, 10.0452] },
  { name: 'Hai Phong', coordinates: [106.688, 20.8449] },
  { name: 'Da Lat', coordinates: [108.4583, 11.9404] }
]
