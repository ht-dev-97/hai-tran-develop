"use client"

import { useLocale } from "next-intl"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { usePathname } from "@/i18n/routing"

const languages = {
  en: {
    name: "English",
    flag: "🇺🇸",
  },
  vi: {
    name: "Tiếng Việt",
    flag: "🇻🇳",
  },
}

export function LanguageSwitcher() {
  const pathname = usePathname()
  const locale = useLocale()

  const switchLocale = (newLocale: string) => {
    const segments = pathname ? pathname.split("/") : []
    segments[1] = newLocale
    return segments.join("/")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-block">
            {languages[locale as keyof typeof languages].name}
          </span>
          <span className="inline-block sm:hidden">
            {languages[locale as keyof typeof languages].flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {Object.entries(languages).map(([key, value]) => (
          <Link key={key} href={switchLocale(key)}>
            <DropdownMenuItem
              className={`gap-2 ${locale === key ? "bg-accent" : ""}`}
            >
              <span>{value.flag}</span>
              <span>{value.name}</span>
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
