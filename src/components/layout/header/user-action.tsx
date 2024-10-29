"use client"

import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@auth0/nextjs-auth0/client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserAction = () => {
  const { user, isLoading } = useUser()

  if (isLoading) return

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full border border-green-500 bg-slate-300"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.picture || ""} alt={user.name || ""} />
                <AvatarFallback>
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
            <DropdownMenuItem className="flex-col items-start">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button asChild className="cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a href="/api/auth/logout">Log Out</a>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild className="cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/api/auth/login">Log In</a>
        </Button>
      )}
    </>
  )
}

export default UserAction
