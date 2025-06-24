"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Phone, Clock, ExternalLink } from "lucide-react"

interface MapProps {
  showDetails?: boolean
  height?: string
  className?: string
}

export function RestaurantMap({ showDetails = true, height = "h-64", className = "" }: MapProps) {
  const [mapLoaded, setMapLoaded] = useState(false)

  const restaurantInfo = {
    name: "SmartBite Restaurant",
    address: "123 Gourmet Street, Food City, FC 12345",
    phone: "(555) 123-BITE",
    hours: "Mon-Sun: 11:00 AM - 10:00 PM",
    coordinates: { lat: 40.7128, lng: -74.006 }, // NYC coordinates as example
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurantInfo.address)}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurantInfo.address)}`

  return (
    <div className={`w-full ${className}`}>
      {showDetails && (
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Visit Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="text-gray-600">{restaurantInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">{restaurantInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Hours</h4>
                  <p className="text-gray-600">{restaurantInfo.hours}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </a>
              </Button>

              <Button variant="outline" asChild className="w-full">
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Google Maps
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className={`relative ${height} bg-gray-100`}>
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Loading map...</p>
                </div>
              </div>
            )}

            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.309328430987!2d-74.00823368459394!3d40.71277597932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316e5b7c5b%3A0x7b8b8b8b8b8b8b8b!2s123%20Gourmet%20St%2C%20New%20York%2C%20NY%2010013!5e0!3m2!1sen!2sus!4v1635959999999!5m2!1sen!2sus`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoaded(true)}
              className="absolute inset-0"
            />

            {/* Custom Marker Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none">
              <div className="bg-orange-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>SmartBite Restaurant</span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-600"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
