import AutoScroll from '../_components/auto-scroll'
import { CarouselSize } from '../_components/carousel'
import Combobox from '../_components/combobox'
import Environment from '../_components/environment'
import HostIP from '../_components/host-ip'
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
}
