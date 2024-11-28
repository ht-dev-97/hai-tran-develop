'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import { LogOut, User } from 'lucide-react'
import React from 'react'

const UserAction = () => {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) return <User />

  return (
    <>
      {isSignedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative rounded-full border-2 border-primary p-px"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.imageUrl || ''}
                  alt={user?.fullName || 'U'}
                />
                <AvatarFallback>{user?.fullName || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-colorBrand-bg-box"
            align="end"
            forceMount
          >
            <DropdownMenuItem className="flex-col items-start">
              <div className="text-primary font-medium">
                {user?.fullName || 'U'}
              </div>
              <div className="text-sm italic">
                {user?.primaryEmailAddress?.emailAddress}
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <SignOutButton>
                <Button variant="outline" className="cursor-pointer">
                  <LogOut size={40} className="text-red-500" />
                  <span className="text-red-500">Sign Out</span>
                </Button>
              </SignOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <SignInButton>
          <User className="cursor-pointer" />
        </SignInButton>
      )}
    </>
  )
}

export default UserAction
