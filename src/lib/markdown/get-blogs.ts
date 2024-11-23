import { Blog } from '@/types/blogs'
import fs from 'fs'
import matter from 'gray-matter'

export default function getBlogs(basePath: string): Blog[] {
  const folder = `data/${basePath}/` // blogs/
  const files = fs.readdirSync(folder)
  const markdownFiles = files.filter((file) => file.endsWith('.mdx'))

  const loadedMarkdownFiles = markdownFiles.map((file) => {
    const fileContents = fs.readFileSync(`data/${basePath}/${file}`, 'utf8')
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

  return loadedMarkdownFiles
}
