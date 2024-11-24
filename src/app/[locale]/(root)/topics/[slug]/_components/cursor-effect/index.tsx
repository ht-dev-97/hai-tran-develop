'use client'

import Link from 'next/link'
import React from 'react'

import { LIST_HOVER } from '../../_constant'
import { CustomCursor } from './custom-cursor'

const CursorEffect = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative custom-menu-area">
        <ul className="flex list-none gap-8">
          {LIST_HOVER.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className="menu-item uppercase text-3xl font-bold hover:opacity-80 transition-all duration-300 block px-4 py-2"
              >
                {item.name}
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
