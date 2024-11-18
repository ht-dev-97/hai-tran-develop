import { Metadata } from 'next'

import PostsContainer from './_container'

export const metadata: Metadata = {
  title: 'Blog Posts',
  description:
    'Browse all our blog posts about Next.js, Web Development, and more',
  openGraph: {
    title: 'Blog Posts',
    description:
      'Browse all our blog posts about Next.js, Web Development, and more',
    type: 'website',
    url: '/posts'
  }
}

const Post = () => {
  return <PostsContainer />
}

export default Post
