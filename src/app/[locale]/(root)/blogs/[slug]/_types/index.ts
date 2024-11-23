import { Blog } from '@/types/blogs'

export interface BlogContent {
  content: string
  data: Blog
}

export interface Params {
  slug: string
}
