'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeftIcon } from 'lucide-react'
import { componentsMap } from '../_constant'

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
  const Component = componentsMap[slug.toLowerCase()]
  return Component ? <Component /> : null
}

export default TopicDetailContainer
