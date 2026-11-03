"use server"

import { redirect } from "next/navigation"
import { addBlog, likeBlog } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export const createBlog = async (formData: FormData) => {

  const session = await auth()
  if(!session) {
    redirect("/login")
  }
  const author = formData.get('author') as string
  const url = formData.get('url') as string
  const title = formData.get('title') as string
  const year = Number(formData.get('year'))

  await addBlog(author, url, title, year)

  redirect("/blogs")
}

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get('id'))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}