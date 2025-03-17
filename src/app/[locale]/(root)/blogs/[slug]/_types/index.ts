import { Blog } from '@/types'

export interface BlogContent {
  content: string
  data: Blog
}

export interface Params {
  slug: string
}
