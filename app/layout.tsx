import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/provider/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import DesignerContextProvider from '@/components/context/DesignerContext'
import NextTopLoader from "nextjs-toploader"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Form Builder',
  description: 'This is a form builder whose',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className,"bg-white,dark:bg-[#313338]")}>
        <NextTopLoader />
        <DesignerContextProvider>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false} storageKey='form-builder'>
          <main>
          {children}
          </main>
          <Toaster />
        </ThemeProvider>
        </DesignerContextProvider>
        </body>
    </html>
  )
}
