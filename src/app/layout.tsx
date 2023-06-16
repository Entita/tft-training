import './globals.css'

export const metadata = {
  title: 'TFT - Roll training',
  description: 'Web application for training rolling in tft',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
