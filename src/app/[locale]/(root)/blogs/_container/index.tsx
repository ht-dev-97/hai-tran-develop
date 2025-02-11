'use client'

import { showToast } from '@/components/common'
import { Blog } from '@/types/blogs'
import { clientFetch } from '@/utils/http'
import { useEffect, useState } from 'react'

import BlogList from '../_components/blog-list'

const BlogsContainer = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await clientFetch.get<Blog[]>('/api/blogs')
        if (!data) {
          throw new Error('Failed to fetch blogs')
        }
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
