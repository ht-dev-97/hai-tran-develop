import CustomCursor from '@/components/common/cursor'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { ProvidersWrapper } from '@/components/providers/providers-wrapper'
import { Toaster } from '@/components/ui/sonner'
import { Abolition, SNPro } from '@/configs/fonts/custom-fonts'
import { locales } from '@/i18n/request'
import { routing } from '@/i18n/routing'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import '../../styles/globals.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'Layout' })

  return {
    title: t('Metadata.title'),
    description: t('Metadata.description'),
    openGraph: {
      title: t('Metadata.title'),
      description: t('Metadata.description'),
      url: `${process.env.API_BASE_URL}`,
      images: [
        {
          url: `${process.env.API_BASE_URL}/assets/images/open-graph-thumbnail.jpg`,
          width: 1200,
          height: 630,
          alt: t('Metadata.title')
        }
      ],
      siteName: t('Metadata.title'),
      type: 'website'
    }
  }
}

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${Abolition.variable} ${SNPro.variable}`}>
        <ProvidersWrapper locale={locale} messages={messages}>
          <CustomCursor />
          <div className="w-full flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 wrapper mx-auto py-8 overflow-auto">
              {children}
            </main>
            <Toaster />
            <Footer />
          </div>
        </ProvidersWrapper>
      </body>
    </html>
  )
}
