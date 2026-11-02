import { createBlog } from "../../actions/blogs"

const NewBlog = () => {
  return (
    <div>
      <h2>Create a new Blog</h2>
      <form action={createBlog}>
        <div>
          <label>
            author
            <input name="author" type="text" />
          </label>
        </div>
        <div>
          <label>
            url
            <input name="url" type="text" />
          </label>
        </div>
        <div>
          <label>
            title
            <input name="title" type="text" />
          </label>
        </div>
        <div>
          <label>
            Year
            <input name="year" type="number" required />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlog