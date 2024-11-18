import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { POSTS } from '../_constants'
import PostContainer from './_container'

type PostProps = {
  params: { slug: string }
}

export async function generateMetadata({
  params
}: PostProps): Promise<Metadata> {
  const post = POSTS.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author]
    }
  }
}

const Post = ({ params }: PostProps) => {
  const post = POSTS.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return <PostContainer post={post} />
}

export default Post
