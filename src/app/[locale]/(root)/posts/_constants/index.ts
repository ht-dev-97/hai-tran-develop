import { Post } from '../_types'

export const POSTS: Post[] = [
  {
    id: 1,
    title: 'Getting Started with Next.js 14',
    slug: 'getting-started',
    content:
      'This is a comprehensive guide to getting started with Next.js 14...',
    description: 'Learn how to build modern web applications with Next.js 14',
    author: 'John Doe',
    date: '2024-01-10'
  },
  {
    id: 2,
    title: 'Understanding Dynamic Metadata',
    slug: 'dynamic-metadata',
    content: 'Dynamic metadata is crucial for SEO optimization...',
    description: 'Master dynamic metadata generation in Next.js for better SEO',
    author: 'Jane Smith',
    date: '2024-01-11'
  },
  {
    id: 3,
    title: 'Advanced Next.js Features',
    slug: 'advanced-features',
    content: 'Explore advanced features like server components...',
    description: 'Deep dive into advanced Next.js features and best practices',
    author: 'Bob Wilson',
    date: '2024-01-12'
  }
]
