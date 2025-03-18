'use client'

import { useCustomToast } from '@/hooks'
import { Blog } from '@/types'
import { clientFetch } from '@/utils/http'
import { useEffect, useState } from 'react'

import BlogList from '../_components/blog-list'

const BlogsContainer = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  const toast = useCustomToast()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await clientFetch.get<Blog[]>('/api/blogs')
        if (!data) {
          throw new Error('Failed to fetch blogs')
        }
        setBlogs(data)
      } catch (err) {
        toast.custom.error({
          title: 'Error',
          description:
            err instanceof Error ? err.message : 'Something went wrong'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return <BlogList blogs={blogs} />
}

export default BlogsContainer
