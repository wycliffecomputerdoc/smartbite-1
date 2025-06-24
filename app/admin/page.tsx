import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const { userId, sessionClaims } = await auth()

  // Check if user is authenticated and is admin
  if (!userId) {
    redirect("/sign-in?redirect_url=/admin")
  }

  // Check if user is admin (you can customize this logic)
  const userEmail = sessionClaims?.email as string
  if (userEmail !== "admin@smartbite.com") {
    redirect("/")
  }

  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  )
}
