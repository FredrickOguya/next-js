import { getBlogById } from "../../services/blogs"
import { notFound } from "next/navigation"

const Blog = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>Year: {blog.year}</p>
      <p>Likes: {blog.likes}</p>
      <p>
        URL: <a href={blog.url}>{blog.url}</a>
      </p>
    </div>
  )
}

export default Blog