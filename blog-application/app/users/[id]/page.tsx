import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

const User = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(id)))

  const user = result[0]

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
    </div>
  )
}

export default User