import React from 'react'

import { Post } from '../../_types'

interface PostContainerProps {
  post: Post
}

const PostContainer = ({ post }: PostContainerProps) => {
  return (
    <article className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="mb-8">
        <p>
          By {post.author} • {post.date}
        </p>
      </div>
      <div className="prose">
        <p>{post.content}</p>
      </div>
    </article>
  )
}

export default PostContainer
