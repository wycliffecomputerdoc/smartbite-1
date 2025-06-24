import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { CartProvider } from "@/components/providers/cart-provider"
import { Toaster } from "@/components/ui/toaster"
import { ChatBot } from "@/components/chat/chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SmartBite - AI-Powered Restaurant Experience",
  description: "Modern restaurant website with intelligent features for enhanced dining experience",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <CartProvider>
            {children}
            <ChatBot />
            <Toaster />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
