"use client"

import Link from "next/link"
import { useUser } from "@auth0/nextjs-auth0/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LIST_MENU } from "@/constants"

export default function Header() {
  const { user, isLoading } = useUser()

  return (
    <header className="bg-white shadow-sm h-16">
      <nav className="container mx-auto px-4 h-full flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Nextjs
        </Link>
        <ul className="flex space-x-4 items-center">
          {LIST_MENU.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-gray-600">
                {item.label}
              </Link>
            </li>
          ))}
          {!isLoading && (
            <li>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.picture || ""}
                          alt={user.name || ""}
                        />
                        <AvatarFallback>
                          {user.name ? user.name[0].toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
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
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
