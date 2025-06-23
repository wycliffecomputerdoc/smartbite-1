import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">SmartBite</h3>
            <p className="text-gray-300 mb-4">
              Experience the future of dining with our AI-powered restaurant platform. Exceptional cuisine meets
              intelligent technology for an unforgettable experience.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">123 Gourmet Street, Food City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-orange-600 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="text-gray-300 hover:text-orange-600 transition-colors">
                  Reservations
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-300 hover:text-orange-600 transition-colors">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-orange-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">(555) 123-BITE</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">hello@smartbite.com</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">Mon-Sun: 11AM-10PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 SmartBite. All rights reserved. Powered by AI technology.</p>
        </div>
      </div>
    </footer>
  )
}
