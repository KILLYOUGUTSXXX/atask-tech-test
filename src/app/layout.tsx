import type { Metadata } from 'next'
import './globals.css'
import { lazy } from 'react'

export const metadata: Metadata = {
  title: 'Qubic Test- Aidil Febrian',
  description: 'technical test'
}

const MainLayout = lazy(() => import('@afx/views/main/index.layout'))

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
