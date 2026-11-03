"use client"
import { useSession, signOut} from "next-auth/react"
import Link from "next/link"


export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav>
      <Link href="/">home</Link>
      {" | "}
      <Link href="/blogs">blogs</Link>
      {" | "}
      <Link href="/users">users</Link>
      {" | "}
      {session ? (
        <>
          <Link href="/blogs/new">new blog</Link>
          {" | "}
          <em>{session.user?.name} logged in</em>
          {" "}
          <button onClick={() => signOut()}>logout</button>
        </>
      ): (
        <>
          <Link href="/login">login</Link>
        </>
      )}
    </nav>
  )
}