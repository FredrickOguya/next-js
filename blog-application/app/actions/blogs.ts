"use server"

import { redirect } from "next/navigation"
import { addBlog, likeBlog } from "../services/blogs"
import { revalidatePath } from "next/cache"

export const createBlog = async (formData: FormData) => {
  const author = formData.get('author') as string
  const url = formData.get('url') as string
  const title = formData.get('title') as string
  const likes = Number(formData.get('likes'))
  const year = Number(formData.get('year'))

  await addBlog(author, url, title, likes, year)
  redirect("/blogs")
}

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get('id'))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}