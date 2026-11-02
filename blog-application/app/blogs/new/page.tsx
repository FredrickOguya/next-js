import { createBlog } from "../../actions/blogs"
import { getUsers } from "../../services/users"

const NewBlog = async () => {
  const users = await getUsers()

  return (
    <div>
      <h2>Create a new Blog</h2>

      <form action={createBlog}>
        <div>
          <label>
            Author
            <input name="author" type="text" required />
          </label>
        </div>

        <div>
          <label>
            URL
            <input name="url" type="text" required />
          </label>
        </div>

        <div>
          <label>
            Title
            <input name="title" type="text" required />
          </label>
        </div>

        <div>
          <label>
            Year
            <input name="year" type="number" required />
          </label>
        </div>

        <div>
          <label>
            User
            <select name="userId" required>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog