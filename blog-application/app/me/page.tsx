
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { connection } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { generateApiToken } from "../actions/apiToken"

export const instant = false

const Me = async () => {
  await connection()

  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, Number(session?.user?.id))
  })

  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto w-full max-w-5xl rounded-lg border border-gray-200 bg-white p-10 shadow-md">

        {/* Profile section */}
        <h1 className="mb-10 text-4xl font-bold text-slate-800">
          My Profile
        </h1>

        <div className="space-y-7 text-xl text-slate-600">
          <p>
            <span className="mr-3 font-bold text-slate-700">
              Name:
            </span>
            {session.user?.name}
          </p>

          <p>
            <span className="mr-3 font-bold text-slate-700">
              Username:
            </span>
            {session.user?.email}
          </p>
        </div>

        {/* Divider */}
        <hr className="my-14 border-t border-gray-300" />

        {/* API Token section */}
        <h2 className="mb-7 text-3xl font-bold text-slate-800">
          API Token
        </h2>

        <div className="mb-7 rounded-lg bg-gray-50 p-7">
          <p className="mb-3 text-lg text-slate-600">
            {user?.token ? "Current token:" : "No API token has been generated yet."}
          </p>

          {user?.token && (
            <p className="break-all rounded-md bg-gray-100 p-4 text-lg text-gray-900">
              {user.token}
            </p>
          )}
        </div>

        {/* Generate token button */}
        <form action={generateApiToken}>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-7 py-4 text-xl font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Generate New Token
          </button>
        </form>

      </div>
    </main>
  )
}

export default Me
