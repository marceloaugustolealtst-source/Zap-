import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zap — Direct chat',
  description: 'Simple direct messaging with Zap IDs and shareable chat links.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
