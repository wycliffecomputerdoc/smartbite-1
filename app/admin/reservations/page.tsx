import { AdminLayout } from "@/components/admin/admin-layout"
import { ReservationsManager } from "@/components/admin/reservations-manager"

export default function AdminReservationsPage() {
  return (
    <AdminLayout>
      <ReservationsManager />
    </AdminLayout>
  )
}
