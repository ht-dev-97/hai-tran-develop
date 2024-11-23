import { Badge } from '@/components/ui/badge'
import { Card, CardHeader } from '@/components/ui/card'
import { Link } from '@/i18n/routing'
import { Blog } from '@/types/blogs'
import fs from 'fs'
import matter from 'gray-matter'
import { CalendarDays, Clock } from 'lucide-react'
import Markdown from 'markdown-to-jsx'
import { notFound } from 'next/navigation'
import path from 'path'

import { BlogContent, Params } from './_types'

const BLOG_CACHE: Record<string, BlogContent> = {}

const fetchBlogs = (slug: string): BlogContent => {
  try {
    if (BLOG_CACHE[slug]) {
      return BLOG_CACHE[slug]
    }

    const dataDirectory = path.join(process.cwd(), 'data', 'blogs')
    const filePath = path.join(dataDirectory, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      notFound()
    }

    const content = fs.readFileSync(filePath, 'utf8')
    const result = matter(content)

    const blogContent = {
      content: result.content,
      data: result.data as Blog
    }

    BLOG_CACHE[slug] = blogContent

    return blogContent
  } catch (error) {
    console.error(`Error fetching blog ${slug}:`, error)
    notFound()
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const title = params.slug ? ` - ${params.slug}` : ''
  return {
    title: `Blog ${title.replace('-', ' ').toUpperCase()}`
  }
}

export async function generateStaticParams() {
  try {
    const dataDirectory = path.join(process.cwd(), 'data', 'blogs')
    const files = fs.readdirSync(dataDirectory)
    const markdownFiles = files.filter((file) => file.endsWith('.mdx'))

    return markdownFiles.map((file) => ({
      slug: file.replace('.mdx', '')
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

const BlogDetail = ({ params }: { params: Params }) => {
  const { slug } = params
  const blog = fetchBlogs(slug)
  const { cook_time, author, created_at, description } = blog.data

  return (
    <section className="pt-10 py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-1 md:col-span-2 markdown-content">
        <Markdown>{blog.content}</Markdown>
      </div>
      <div className="col-span-1">
        <div className="text-right mb-2">
          <Link href={'/blogs'} className="underline font-medium text-sm">
            Go Back Blogs
          </Link>
        </div>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold mb-2">About ...</h2>
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <Badge variant="secondary">
                <p className="text-xs">{author}</p>
              </Badge>
              <Badge variant="secondary">
                <CalendarDays className="w-4 h-4 me-1" />
                <p className="text-xs">{created_at}</p>
              </Badge>
              <Badge variant="secondary">
                <Clock className="w-4 h-4 me-1" />
                <p className="text-xs">{cook_time}</p>
              </Badge>
            </div>
            <p className="text-sm font-medium">{description}</p>
          </CardHeader>
        </Card>
      </div>
    </section>
  )
}

export default BlogDetail
