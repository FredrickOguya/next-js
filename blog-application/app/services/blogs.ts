import { db } from '@/db'
import { blogs } from '@/db/schema'
import { desc, eq, ilike, sql } from 'drizzle-orm'
import { getCurrentUser } from './session'

export const getBlogs = (filter?: string) => {
  return db
          .select()
          .from(blogs)
          .where(ilike(blogs.title, `%${filter || ""}%`))
          .orderBy(desc(blogs.likes))
}

export const addBlog = async (author: string, url: string, title: string, year: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }
  const result = await db
    .insert(blogs)
    .values({
      author,
      url,
      title,
      year,
      userId: user.id,
    })
    .returning()

  return result[0]
}

export const getBlogById = async (id: number) => {
  const result = await db
                        .select()
                        .from(blogs)
                        .where(eq(blogs.id, id))
                        .limit(1)
  
  return result[0]
}

export const likeBlog = async (id: number) => {
  const result = await db
    .update(blogs)
    .set({
      likes: sql`${blogs.likes} + 1`,
    })
    .where(eq(blogs.id, id))
    .returning()

  return result[0]
}