import { getBlogs } from "../services/blogs";

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
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
              <td>{blog.title}</td>
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

export default Blogs;