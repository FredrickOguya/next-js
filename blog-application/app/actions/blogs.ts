"use server"

import { redirect } from "next/navigation"
import { addBlog, likeBlog } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"


export type BlogFormState = {
  errors: {
    author?: string
    url?: string
    title?: string
  }
  values?: {
    author: string
    url: string
    title: string
    year: string
  }
}


export const createBlog = async ( prevState: BlogFormState, formData: FormData) => {

  const session = await auth()
  if(!session) {
    redirect("/login")
  }
  const author = formData.get('author') as string
  const url = formData.get('url') as string
  const title = formData.get('title') as string
  const year = formData.get('year') as string

const errors: BlogFormState["errors"] = {}

  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters long"
  }

  if (!url || url.length < 5) {
    errors.url = "URL must be at least 5 characters long"
  }

  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { author, url, title, year }
    }
  }

  await addBlog(author, url, title, Number(year))

  redirect("/blogs")
}

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get('id'))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}