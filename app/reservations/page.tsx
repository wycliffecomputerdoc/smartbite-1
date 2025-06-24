import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ReservationBooking } from "@/components/reservations/reservation-booking"

export default function ReservationsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ReservationBooking />
      <Footer />
    </div>
  )
}
