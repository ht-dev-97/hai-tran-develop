'use client'

import Combobox from '../_components/combobox'
import AutoScroll from '../_components/auto-scroll'
import StickyTitle from '../_components/sticky-title'
import Zustand from '../_components/zustand'
import Environment from '../_components/environment'
import HostIP from '../_components/host-ip'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeftIcon } from 'lucide-react'

const TopicDetailContainer = () => {
  const { slug } = useParams<{ slug: string }>() || { slug: null }
  const router = useRouter()

  if (!slug) {
    console.error('Slug is not available')
    return null
  }

  const handleBackToTopics = () => {
    router.push('/topics')
  }

  return (
    <div className='flex flex-col gap-4'>
      <button
        onClick={handleBackToTopics}
        className='w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center'
      >
        <ArrowLeftIcon className='h-5 w-5 mr-2' />
        Back to Topics
      </button>
      {renderComponentBySlug(slug)}
    </div>
  )
}

const renderComponentBySlug = (slug: string) => {
  const componentsMap: { [key: string]: React.ComponentType } = {
    zustand: Zustand,
    environment: Environment,
    'host-ip': HostIP,
    combobox: Combobox,
    'auto-scroll': AutoScroll,
    'sticky-title': StickyTitle,
  }

  const Component = componentsMap[slug.toLowerCase()]
  return Component ? <Component /> : null
}

export default TopicDetailContainer
