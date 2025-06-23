import { Navbar } from "@/components/layout/navbar"
import { MenuContent } from "@/components/menu/menu-content"
import { Footer } from "@/components/layout/footer"

export default function MenuPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <MenuContent />
      <Footer />
    </div>
  )
}
