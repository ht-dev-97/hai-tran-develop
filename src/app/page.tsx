import { getSession } from "@auth0/nextjs-auth0"
import Image from "next/image"
import Login from "@/components/layout/login"
import Logout from "@/components/layout/logout"

export default async function Home() {
  const session = await getSession()
  const user = session?.user

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome to Our App
        </h1>

        {user ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={user.picture || "https://via.placeholder.com/80"}
                alt={user.name || "User"}
                width={80}
                height={80}
                className="rounded-full border-4 border-blue-500"
              />
              <div>
                <p className="font-semibold text-lg text-gray-800">
                  {user.name}
                </p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <Logout />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-600 text-center mb-4">
              Please log in to access your account.
            </p>
            <Login />
          </div>
        )}
      </div>
    </main>
  )
}
