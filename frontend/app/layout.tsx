import type { Metadata } from 'next'
import { Outfit, Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' })
const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'TrustMart - Đồ cũ Đáng tin cậy',
  description: 'Nền tảng mua bán đồ cũ với AI xác thực. An toàn, minh bạch cho mọi người.',
  icons: {
    icon: '/logo-shield.png',
    shortcut: '/logo-shield.png',
    apple: '/logo-shield.png',
  },
  openGraph: {
    title: 'TrustMart - Đồ cũ Đáng tin cậy',
    description: 'Nền tảng mua bán đồ cũ với AI xác thực. An toàn, minh bạch cho mọi người.',
    images: ['/logo-shield.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable} ${spaceMono.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
