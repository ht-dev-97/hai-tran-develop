"use client"

import { LIST_MENU } from "@/constants"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import UserAction from "./user-action"
import { ModeToggle } from "./mode-toggle"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "./language-switcher"
import { Link, usePathname } from "@/i18n/routing"

export default function Header() {
  const pathname = usePathname()

  const t = useTranslations("Header")

  return (
    <header className="shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold">
                {t("title")}
              </Link>
            </div>
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
                      "inline-flex items-center px-1 pt-1 text-sm font-medium relative",
                      isActive && "text-yellow-400"
                    )}
                  >
                    {t(`menu.${item.name}`)}
                    {isActive && (
                      <motion.div
                        className="absolute top-[100%] left-0 right-0 h-1 bg-yellow-400 rounded-full"
                        layoutId="activeItem"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
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
