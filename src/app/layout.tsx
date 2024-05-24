import './globals.css'

import type { Metadata } from 'next'
import { Roboto, Roboto_Mono as RobotoMono } from 'next/font/google'

import Header from '@/components/base/header'
import Toaster from '@/components/base/toaster'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})
const robotoMono = RobotoMono({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: 'Ignite Timer',
  description: 'A simple timer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoMono.variable} flex h-dvh w-dvw items-center justify-center bg-gray-900 font-sans text-base font-normal text-gray-300 antialiased`}
      >
        <div className="flex w-full max-w-[74rem] flex-col rounded-lg bg-gray-800 p-10">
          <Header />
          {children}

          <Toaster richColors />
        </div>
      </body>
    </html>
  )
}
