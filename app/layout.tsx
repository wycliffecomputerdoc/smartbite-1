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
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "hsl(222.2 47.4% 11.2%)",
              borderRadius: "0.5rem",
            },
          }}
        >
          <CartProvider>
            {children}
            <ChatBot />
            <Toaster />
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
