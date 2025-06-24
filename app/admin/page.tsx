import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminLayout } from "@/components/admin/admin-layout"

// In a real app, you'd check authentication here
async function checkAdminAuth() {
  // Simulate auth check - in production, verify JWT/session
  return true
}

export default async function AdminPage() {
  const isAuthenticated = await checkAdminAuth()

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  )
}
