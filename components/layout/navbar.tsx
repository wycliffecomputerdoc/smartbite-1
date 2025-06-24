"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, ShoppingCart, User, Phone, MapPin } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Reservations", href: "/reservations" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()
  const { user } = useUser()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Check if user is admin
  const isAdmin = user?.emailAddresses?.[0]?.emailAddress === "admin@smartbite.com"

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">SB</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SmartBite</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Contact Info */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Downtown</span>
              </div>
            </div>

            {/* Cart */}
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>

            {/* Admin Link for admin users */}
            <SignedIn>
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    Admin
                  </Button>
                </Link>
              )}
            </SignedIn>

            {/* Auth Buttons */}
            <SignedOut>
              <SignInButton>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Cart */}
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Auth */}
            <SignedOut>
              <SignInButton>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </SignedIn>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-4">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-2">
                      <span className="text-white font-bold text-sm">SB</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">SmartBite</span>
                  </div>

                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-base font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Admin Link for mobile */}
                  <SignedIn>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-base font-medium transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                  </SignedIn>

                  <div className="border-t pt-4 mt-4">
                    <div className="flex flex-col space-y-2 text-sm text-gray-600">
                      <div className="flex items-center px-3">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>(555) 123-4567</span>
                      </div>
                      <div className="flex items-center px-3">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>123 Downtown Street</span>
                      </div>
                    </div>
                  </div>

                  <SignedOut>
                    <div className="flex flex-col space-y-2 pt-4">
                      <SignInButton>
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton>
                        <Button className="w-full bg-orange-500 hover:bg-orange-600">Sign Up</Button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
