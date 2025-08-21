import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Wardha Cabs - Reliable Cab Booking in Maharashtra",
  description: "Book safe and comfortable cabs from Wardha to anywhere. Sedans, SUVs, and luxury cars available 24/7.",
  keywords: ["cab booking", "Wardha cabs", "taxi service", "Maharashtra travel"],
  openGraph: {
    title: "Wardha Cabs",
    description: "Reliable transportation services from Wardha to anywhere.",
    images: ["/modern-suv-side.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
