import "../../styles/globals.css"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import { Abolition, SNPro } from "@/configs/fonts/custom-fonts"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { locales } from "@/configs/next-intl"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: "Layout" })

  return {
    title: t("Metadata.title"),
    description: t("Metadata.description"),
  }
}

export default async function RootLayout({
  children,
  params: { locale },
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
      <UserProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <body
              className={`${Abolition.variable} ${SNPro.variable} flex flex-col min-h-screen`}
            >
              <Header />
              <main className="flex-1 container mx-auto py-8 overflow-auto">
                {children}
              </main>
              <Toaster />
              <Footer />
            </body>
          </ThemeProvider>
        </NextIntlClientProvider>
      </UserProvider>
    </html>
  )
}
