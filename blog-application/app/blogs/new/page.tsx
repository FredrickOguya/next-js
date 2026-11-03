"use client"

import { useActionState } from "react"
import { BlogFormState, createBlog } from "../../actions/blogs"

const initialState: BlogFormState = {
  errors: {},
  values: {
    author: "",
    url: "",
    title: "",
    year: ""
  }
}

const NewBlog = () => {
  const [ state, formAction] = useActionState(createBlog, initialState)

  return (
    <div>
      <h2>Create a new Blog</h2>

      <form action={formAction}>
        <div>
          <label>
            Author
            <input name="author" type="text" required defaultValue={state.values?.author}/>
          </label>
          {state.errors.author && (
            <p style={{ color: "red" }}>{state.errors.author}</p>
          )}
        </div>

        <div>
          <label>
            URL
            <input name="url" type="text" required defaultValue={state.values?.url}/>
          </label>
          {state.errors.url && (
            <p style={{ color: "red"}}>{state.errors.url}</p>
          )}
        </div>

        <div>
          <label>
            Title
            <input name="title" type="text" required  defaultValue={state.values?.title}/>
          </label>
          {state.errors.title && (
            <p style={{ color: "red" }}>{state.errors.title}</p>
          )}
        </div>

        <div>
          <label>
            Year
            <input name="year" type="number" required defaultValue={state.values?.year}/>
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog