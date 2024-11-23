import fs from 'fs'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'
import path from 'path'

interface Blog {
  title: string
  cook_time: string
  author: string
  created_at: string
  description: string
  slug: string
  modified_title: string
}

let BLOG_CACHE: Blog[] | null = null

export async function GET() {
  try {
    if (BLOG_CACHE) {
      return NextResponse.json(BLOG_CACHE)
    }

    const dataDirectory = path.join(process.cwd(), 'data', 'blogs')

    const files = fs.readdirSync(dataDirectory)
    const markdownFiles = files.filter((file) => file.endsWith('.mdx'))

    const blogs = markdownFiles.map((file) => {
      const filePath = path.join(dataDirectory, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        title: matterResult.data.title,
        cook_time: matterResult.data.cook_time,
        author: matterResult.data.author,
        created_at: matterResult.data.created_at,
        description: matterResult.data.description,
        slug: matterResult.data.title.replace(' ', '-').toLowerCase(),
        modified_title: matterResult.data.title.toLowerCase()
      } as Blog
    })

    BLOG_CACHE = blogs

    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Error loading blogs:', error)
    return NextResponse.json({ error: 'Failed to load blogs' }, { status: 500 })
  }
}
