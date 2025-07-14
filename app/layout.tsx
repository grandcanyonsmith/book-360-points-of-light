import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '360 Points of Light - A Spiritual Compass',
  description: 'A wholesome guide with 360 compass points to refocus our lives and turn back to Christ. Lessons for posterity.',
  keywords: 'spiritual compass, Christ, wholesome lessons, posterity, faith, 360 points',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-spiritual-light via-white to-spiritual-peace">
          {children}
        </div>
      </body>
    </html>
  )
} 