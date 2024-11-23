'use client'

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
  console.log(blogs)

  return (
    <section>
      <h2>okok</h2>
    </section>
  )
}

export default BlogList
