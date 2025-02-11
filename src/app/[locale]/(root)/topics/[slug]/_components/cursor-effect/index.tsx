'use client'

import CustomCursor from '@/components/common/cursor'
import { LIST_MENU } from '@/constants'
import { Link } from '@/i18n/routing'
import React from 'react'

const CursorEffect = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative custom-menu-area">
        <ul className="flex list-none gap-8">
          {LIST_MENU.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="menu-item uppercase text-3xl font-bold hover:opacity-80 transition-all duration-300 block px-4 py-2"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <CustomCursor />
    </div>
  )
}

export default CursorEffect
