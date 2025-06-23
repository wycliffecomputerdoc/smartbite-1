"use client"
import { useCart as useCartProvider } from "@/components/providers/cart-provider"

export function useCart() {
  return useCartProvider()
}
