import "../../styles/globals.css"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { Abolition, SNPro } from "@/configs/fonts/custom-fonts"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/sonner"
import { locales } from "@/i18n/request"
import { ProvidersWrapper } from "@/components/providers/providers-wrapper"
import { ThemeProvider } from "@/components/providers/theme-provider"

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
      <ProvidersWrapper locale={locale} messages={messages}>
        <body className={`${Abolition.variable} ${SNPro.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="w-full flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 wrapper mx-auto py-8 overflow-auto">
                {children}
              </main>
              <Toaster />
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </ProvidersWrapper>
    </html>
  )
}
