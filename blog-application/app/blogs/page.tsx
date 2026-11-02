import Link from "next/link"
import { getBlogs } from "../services/blogs"

export const instant = false

const Blogs = async ({
  searchParams
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter = "" } = await searchParams

  const blogs = await getBlogs(filter)

  return (
    <div>
      <h2>Blogs</h2>

      <form action="/blogs" method="GET">
        <input
          type="text"
          name="filter"
          placeholder="Search blogs by title"
          defaultValue={filter}
        />

        <button type="submit">Search</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Url</th>
            <th>Likes</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>
                <Link href={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>{blog.author}</td>
              <td>{blog.url}</td>
              <td>{blog.likes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Blogs