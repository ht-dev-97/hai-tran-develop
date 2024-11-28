import { clerkAppearanceConfig } from '@/configs/clerk/clerk.config'
import { ClerkProvider } from '@clerk/nextjs'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react'

interface ProvidersWrapperProps {
  children: ReactNode
  locale: string
  messages: AbstractIntlMessages
}

export function ProvidersWrapper({
  children,
  locale,
  messages
}: ProvidersWrapperProps) {
  return (
    <ClerkProvider appearance={clerkAppearanceConfig}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ClerkProvider>
  )
}
