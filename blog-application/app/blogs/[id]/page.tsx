import { likeBlogAction } from "@/app/actions/blogs"
import { getBlogById } from "@/app/services/blogs"
import { notFound } from "next/navigation"

export const instant = false
const BlogPage = async ({ params }: { params: Promise<{id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>Title</h2><p>{blog.title}</p>
      <h2>Author</h2><p>{blog.author}</p>
      <h2>Url</h2><p>{blog.url}</p>
      <h2>Likes</h2><p>{blog.likes}</p>
      <form action={likeBlogAction}>
        <input type="hidden" name="id" value={blog.id}/>
        <button type="submit">Like</button>
      </form>
    </div>
  )
}

export default BlogPage