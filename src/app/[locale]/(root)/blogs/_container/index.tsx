'use client'

import { showToast } from '@/components/layout/toast.tsx'
import { clientFetch } from '@/utils/client-fetch'
import { useEffect, useState } from 'react'

import BlogList from '../_components/blog-list'
import { Blog } from '../_types'

const BlogsContainer = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await clientFetch.get('/api/blogs')
        if (response.status !== 200) {
          throw new Error('Failed to fetch blogs')
        }
        const data = response.data
        setBlogs(data)
      } catch (err) {
        showToast.error(
          err instanceof Error ? err.message : 'Something went wrong'
        )
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
