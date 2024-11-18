'use client'

import { useState } from 'react'

import BlogCard from './blog-card'
import BlogsSearch from './blog-search'

interface Blog {
  title: string
  cook_time: string
  author: string
  created_at: string
  description: string
  slug: string
  modified_title: string
}

interface BlogListProps {
  blogs: Blog[]
}

const BlogList = ({ blogs }: BlogListProps) => {
  const [searchVal, setSearchVal] = useState<string>('')

  const filteredBlogs = blogs.filter((blog) =>
    blog.modified_title.includes(searchVal)
  )

  return (
    <section>
      <BlogsSearch searchVal={searchVal} setSearchVal={setSearchVal} />
      <h2 className="text-2xl font-bold">Popular Blogs</h2>
      <div className="space-y-4 mb-10 mt-5">
        {filteredBlogs.length === 0 && (
          <p className="text-sm font-medium">No blogs found.</p>
        )}
        {filteredBlogs.map((blog, index) => (
          <BlogCard blog={blog} key={index} />
        ))}
      </div>
    </section>
  )
}

export default BlogList
