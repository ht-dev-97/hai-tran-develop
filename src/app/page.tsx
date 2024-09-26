import { getSession } from "@auth0/nextjs-auth0"
import Logout from "./components/logout"
import Login from "./components/login"

export default async function Home() {
  const session = await getSession()
  const user = session?.user
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-xl font-medium mb-5">Home</h1>
      <div className="flex items-center gap-5">
        {user ? (
          <div className="flex items-center gap-4">
            <p>{user.email}</p> <Logout />
          </div>
        ) : (
          <Login />
        )}
      </div>
    </main>
  )
}
