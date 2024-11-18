import { Badge } from '@/components/ui/badge'
import { Card, CardHeader } from '@/components/ui/card'
import { Link } from '@/i18n/routing'
import getBlogs from '@/lib/markdown/get-blogs'
import fs from 'fs'
import matter from 'gray-matter'
import { CalendarDays, Clock } from 'lucide-react'
import Markdown from 'markdown-to-jsx'
import { notFound } from 'next/navigation'

interface BlogData {
  cook_time: string
  author: string
  created_at: string
  description: string
}

interface BlogContent {
  content: string
  data: BlogData
}

interface Params {
  slug: string
}

const fetchBlogs = (slug: string): BlogContent => {
  const folder = 'data/blogs/'
  const file = `${folder}${slug}.mdx`
  if (!fs.existsSync(file)) {
    notFound()
  }
  const content = fs.readFileSync(file, 'utf8')

  const result = matter(content)
  return {
    content: result.content,
    data: result.data as BlogData
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const title = params.slug ? ` - ${params.slug}` : ''
  return {
    title: `Blog ${title.replace('-', ' ').toUpperCase()}`
  }
}

export async function generateStaticParams() {
  const blogs = getBlogs('blogs')
  return blogs.map((blog) => ({ slug: blog.slug }))
}

const BlogDetail = ({ params }: { params: Params }) => {
  const { slug } = params
  const blog = fetchBlogs(slug)
  const { cook_time, author, created_at, description } = blog.data

  return (
    <section className="pt-10 py-5 grid grid-cols-3">
      <div className="col-span-2 markdown-content">
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
              <Badge>
                <p className="text-xs">{author}</p>
              </Badge>
              <Badge>
                <CalendarDays className="w-4 h-4 me-1" />
                <p className="text-xs">{created_at}</p>
              </Badge>
              <Badge>
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
