"use client";
import { useSession, signIn, signOut } from "next-auth/react"

export default function AuthButtons() {
  const { data: session } = useSession()

  return (
    <div>
      {session ? (
        <>
          Signed in as {session.user?.name} ({session.user?.email}) <br />
          <button className="bg-white h-15 w-15 p-2 text-black" onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button className="bg-white h-15 w-15 p-2 text-black" onClick={() => signIn("google")}>Sign in with Google</button>
        </>
      )}
    </div>
  )
}