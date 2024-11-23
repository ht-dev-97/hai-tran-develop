export interface BlogData {
  cook_time: string
  author: string
  created_at: string
  description: string
}

export interface BlogContent {
  content: string
  data: BlogData
}

export interface Params {
  slug: string
}
