"use server"

import { redirect } from "next/navigation"
import { addBlog } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  const author = formData.get('author') as string
  const url = formData.get('url') as string
  const title = formData.get('title') as string
  const likes = Number(formData.get('likes'))
  const year = Number(formData.get('year'))

  addBlog(author, url, title, likes, year)
  redirect("/blogs")
}