'use client'

import Link from 'next/link'
import { LIST_MENU } from '@/constants'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import UserAction from './user-action'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className='bg-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex justify-between items-center'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <Link href='/' className='text-2xl font-bold text-gray-900'>
                DevHub
              </Link>
            </div>
          </div>
          <div className='flex items-center gap-10'>
            <nav
              className='hidden sm:flex sm:items-center sm:space-x-5'
              aria-label='Main Navigation'
            >
              {LIST_MENU.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 relative',
                      isActive ? 'text-indigo-600' : 'hover:text-gray-700'
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        className='absolute top-[100%] left-0 right-0 h-1 bg-indigo-500 rounded-full'
                        layoutId='activeItem'
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>
            <UserAction />
          </div>
          <div className='flex items-center sm:hidden'>
            {/* Mobile menu button */}
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className='block h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className='hidden h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className='sm:hidden' id='mobile-menu'>
        <div className='pt-2 pb-3 space-y-1'>
          {LIST_MENU.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                  isActive
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <UserAction />
        </div>
      </div>
    </header>
  )
}
