'use client'

import { LIST_MENU } from '@/constants'
import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { LanguageSwitcher } from './language-switcher'
import { ModeToggle } from './mode-toggle'
import UserAction from './user-action'

export default function Header() {
  const pathname = usePathname()

  const t = useTranslations('Header')

  return (
    <header className="shadow-lg py-4">
      <div className="wrapper">
        <div className="flex justify-between items-center">
          <div className="shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold">
              {t('title')}
            </Link>
          </div>
          <div className="flex items-center gap-10">
            <nav
              className="hidden sm:flex sm:items-center sm:space-x-5"
              aria-label="Main Navigation"
            >
              {LIST_MENU.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center px-1 pt-1 text-sm font-medium relative',
                      isActive && 'text-colorBrand-primary'
                    )}
                  >
                    {t(`menu.${item.name}`)}
                    {isActive && (
                      <motion.div
                        className="absolute top-[100%] left-0 right-0 h-1 bg-colorBrand-primary rounded-full"
                        layoutId="activeItem"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30
                        }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>
            <LanguageSwitcher />
            <ModeToggle />
            <UserAction />
          </div>
        </div>
      </div>
    </header>
  )
}
