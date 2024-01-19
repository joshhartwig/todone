import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

const links = [
  { href: '/', label: 'Home' },
  { href: '/newtodo', label: 'New' },
  { href: '/about', label: 'About' },
]

export const metadata: Metadata = {
  title: 'Todone',
  description: 'Gitter done',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}  bg-gray-100`}>
        <Navbar />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
