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
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: '#000000' },
        elements: {
          formButtonPrimary:
            'bg-black border border-black border-solid hover:bg-white hover:text-black',
          socialButtonsBlockButton:
            'bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black',
          socialButtonsBlockButtonText: 'font-semibold',
          formButtonReset:
            'bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black',
          membersPageInviteButton:
            'bg-black border border-black border-solid hover:bg-white hover:text-black',
          card: 'bg-[#fafafa]'
        }
      }}
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ClerkProvider>
  )
}
