import React from "react"
import getBlogs from "@/lib/markdown/get-blogs"
import BlogList from "../_components/blog-list"

const BlogsContainer = () => {
  const blogs = getBlogs("blogs")

  return <BlogList blogs={blogs} />
}

export default BlogsContainer
