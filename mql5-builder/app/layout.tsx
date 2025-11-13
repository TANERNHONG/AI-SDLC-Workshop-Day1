import '@/app/globals.css'

export const metadata = {
  title: 'MQL5 Expert Advisor Builder',
  description: 'Visual drag-and-drop MQL5 EA builder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
