'use client'

import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="h-12 flex items-center">
      <div className="container mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} {t('copyright')}
      </div>
    </footer>
  )
}
