"use client"

import { useActionState } from "react"
import { createBlog } from "../../actions/blogs"

const NewBlog = () => {
  const [ state, formAction] = useActionState(createBlog, { error: ""})

  return (
    <div>
      <h2>Create a new Blog</h2>

      <form action={formAction}>
        <div>
          <label>
            Author
            <input name="author" type="text" required minLength={5}/>
          </label>
        </div>

        <div>
          <label>
            URL
            <input name="url" type="text" required minLength={5}/>
          </label>
        </div>

        <div>
          <label>
            Title
            <input name="title" type="text" required minLength={5}/>
          </label>
        </div>

        <div>
          <label>
            Year
            <input name="year" type="number" required />
          </label>
        </div>
        <button type="submit">Create</button>
        {state.error && <p style={{color: "red"}}>{state.error}</p>}
      </form>
    </div>
  )
}

export default NewBlog