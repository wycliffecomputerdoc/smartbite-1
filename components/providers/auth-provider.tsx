"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => void
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("smartbite_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    // Mock authentication - replace with real auth service
    const mockUser = {
      id: "1",
      email,
      name: email.split("@")[0],
      avatar: "/placeholder.svg?height=40&width=40",
    }
    setUser(mockUser)
    localStorage.setItem("smartbite_user", JSON.stringify(mockUser))
  }

  const signUp = async (email: string, password: string, name: string) => {
    // Mock registration - replace with real auth service
    const mockUser = {
      id: "1",
      email,
      name,
      avatar: "/placeholder.svg?height=40&width=40",
    }
    setUser(mockUser)
    localStorage.setItem("smartbite_user", JSON.stringify(mockUser))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("smartbite_user")
  }

  return <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading }}>{children}</AuthContext.Provider>
}
