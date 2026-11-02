import { db } from "@/db"
import { users } from "@/db/schema"

export const getUsers = async () => {
  const result = await db.select().from(users)
  return result
}