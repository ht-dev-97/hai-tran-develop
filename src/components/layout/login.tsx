"use client"
import { useUser } from "@auth0/nextjs-auth0/client"
import Image from "next/image"
import React, { useState } from "react"

const Login = () => {
  const { user, isLoading } = useUser()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 p-2 bg-gray-200 rounded-md">
        <div className="w-8 h-8 bg-gray-400 rounded-full animate-pulse" />
        <span>Loading...</span>
      </div>
    )
  }

  if (user) {
    return (
      <div className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded-md">
        <Image
          src={user.picture || "https://via.placeholder.com/32"}
          alt={user.name || "User"}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span>Welcome, {user.name || user.email}!</span>
      </div>
    )
  }

  const handleLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLoggingIn) {
      e.preventDefault()
      return
    }
    setIsLoggingIn(true)
  }

  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/api/auth/login"
      className={`flex items-center space-x-2 p-2 rounded-md text-white ${
        isLoggingIn
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-600"
      }`}
      onClick={handleLogin}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      <span>{isLoggingIn ? "Logging in..." : "Log In"}</span>
    </a>
  )
}

export default Login
