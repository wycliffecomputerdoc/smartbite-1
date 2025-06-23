"use client"

import { toast as sonnerToast } from "sonner"

export function useToast() {
  return {
    toast: ({ title, description }: { title?: string; description?: string }) => {
      sonnerToast(title, {
        description,
      })
    },
  }
}
