"use server"

import { redirect } from "next/navigation"
import { addBlog, likeBlog } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export const createBlog = async ( prevState: { error: string }, formData: FormData) => {

  const session = await auth()
  if(!session) {
    redirect("/login")
  }
  const author = formData.get('author') as string
  const url = formData.get('url') as string
  const title = formData.get('title') as string
  const year = Number(formData.get('year'))

  if(!author || author.length < 5 || !url || url.length < 5 || !author || author.length < 5){
    return { error: "author url and Title must be at least 10 characters long"}
  }

  await addBlog(author, url, title, year)

  redirect("/blogs")
}

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get('id'))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}