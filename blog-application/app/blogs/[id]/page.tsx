import Link from "next/link"
import { getBlogById } from "../../services/blogs"
import { notFound } from "next/navigation"

export const instant = false

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
    <div className="max-w-2xl mx-auto p-6">
      <Link href="/blogs" className="text-sm text-blue-600 hover:underline">
        ← back to blogs
      </Link>

      <article className="mt-4 border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold">{blog.title}</h2>

        <dl className="mt-4 space-y-2">
          <div className="flex gap-2">
            <dt className="font-medium text-gray-500 w-20">Author</dt>
            <dd>{blog.author}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium text-gray-500 w-20">Year</dt>
            <dd>{blog.year}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium text-gray-500 w-20">Likes</dt>
            <dd>{blog.likes}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium text-gray-500 w-20">URL</dt>
            <dd className="min-w-0">
              <a
                href={blog.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {blog.url}
              </a>
            </dd>
          </div>
        </dl>
      </article>
    </div>
  )
}

export default Blog