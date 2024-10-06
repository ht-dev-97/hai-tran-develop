"use client"
import { useUser } from "@auth0/nextjs-auth0/client"
import React, { useState } from "react"

const Logout = () => {
  const { user, isLoading } = useUser()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLoggingOut) {
      e.preventDefault()
      return
    }
    setIsLoggingOut(true)
  }

  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/api/auth/logout"
      className={`p-2 rounded-md text-white ${
        isLoggingOut
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600"
      }`}
      onClick={handleLogout}
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </a>
  )
}

export default Logout
