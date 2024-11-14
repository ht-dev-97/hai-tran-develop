/* eslint-disable @next/next/no-html-link-for-pages */
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
import { User, LogOut } from "lucide-react"

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
              className="relative h-8 w-8 rounded-full border border-primary"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.picture || ""} alt={user.name || ""} />
                <AvatarFallback>
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-colorBrand-bg-box"
            align="end"
            forceMount
          >
            <DropdownMenuItem className="flex-col items-start">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm">{user.email}</div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button asChild className="cursor-pointer">
                <a href="/api/auth/logout" aria-label="Logout">
                  <LogOut />
                </a>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild className="cursor-pointer">
          <a href="/api/auth/login" aria-label="Login">
            <User />
          </a>
        </Button>
      )}
    </>
  )
}

export default UserAction
