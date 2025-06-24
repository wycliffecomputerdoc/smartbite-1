import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ReservationsManager } from "@/components/admin/reservations-manager"

export default async function AdminReservationsPage() {
  const { userId, sessionClaims } = await auth()

  // Check if user is authenticated and is admin
  if (!userId) {
    redirect("/sign-in?redirect_url=/admin/reservations")
  }

  // Check if user is admin
  const userEmail = sessionClaims?.email as string
  if (userEmail !== "admin@smartbite.com") {
    redirect("/")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservations Management</h1>
          <p className="text-muted-foreground">View, edit, and manage all restaurant reservations</p>
        </div>
        <ReservationsManager />
      </div>
    </AdminLayout>
  )
}
