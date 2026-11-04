"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { BlogFormState, createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"

const initialState: BlogFormState = {
  errors: {},
  values: {
    author: "",
    url: "",
    title: "",
    year: "",
  },
}

const NewBlog = () => {
  const { showNotification } = useNotification()
  const router = useRouter()

  const [state, formAction] = useActionState(
    async (prev: BlogFormState, formData: FormData): Promise<BlogFormState> => {
      const result = await createBlog(prev, formData)

      if (result.success) {
        showNotification("blog created", "success")
        router.push("/blogs")
        return initialState
      }

      return result
    },
    initialState,
  )

  return (
    <div >
      <h2>Create a new Blog</h2>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block">
            Author
            <input
              name="author"
              type="text"
              required
              defaultValue={state.values?.author}
            />
          </label>
          {state.errors.author && (
            <p className="text-red-600 text-sm mt-1">{state.errors.author}</p>
          )}
        </div>

        <div>
          <label className="block">
            URL
            <input
              name="url"
              type="text"
              required
              defaultValue={state.values?.url}
            />
          </label>
          {state.errors.url && (
            <p className="text-red-600 text-sm mt-1">{state.errors.url}</p>
          )}
        </div>

        <div>
          <label className="block">
            Title
            <input
              name="title"
              type="text"
              required
              defaultValue={state.values?.title}
            />
          </label>
          {state.errors.title && (
            <p className="text-red-600 text-sm mt-1">{state.errors.title}</p>
          )}
        </div>

        <div>
          <label className="block">
            Year
            <input
              name="year"
              type="number"
              required
              defaultValue={state.values?.year}
            />
          </label>
        </div>

        <button
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlog