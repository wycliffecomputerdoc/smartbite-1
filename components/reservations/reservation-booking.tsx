"use client"

import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Users, MapPin, Phone, Mail, CheckCircle } from "lucide-react"
import { format, addDays, isBefore, startOfDay, isToday, isTomorrow } from "date-fns"

interface ReservationData {
  date: Date | undefined
  time: string
  partySize: string
  firstName: string
  lastName: string
  email: string
  phone: string
  specialRequests: string
}

const timeSlots = [
  { time: "5:00 PM", available: true, popular: false },
  { time: "5:30 PM", available: true, popular: false },
  { time: "6:00 PM", available: true, popular: true },
  { time: "6:30 PM", available: false, popular: true },
  { time: "7:00 PM", available: true, popular: true },
  { time: "7:30 PM", available: true, popular: true },
  { time: "8:00 PM", available: true, popular: false },
  { time: "8:30 PM", available: true, popular: false },
  { time: "9:00 PM", available: true, popular: false },
  { time: "9:30 PM", available: true, popular: false },
]

export default function ReservationBooking() {
  const { user, isSignedIn } = useUser()
  const [step, setStep] = useState(1)
  const [reservationData, setReservationData] = useState<ReservationData>({
    date: undefined,
    time: "",
    partySize: "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    phone: user?.phoneNumbers[0]?.phoneNumber || "",
    specialRequests: "",
  })
  const [confirmationNumber, setConfirmationNumber] = useState("")

  const updateReservationData = (field: keyof ReservationData, value: any) => {
    setReservationData((prev) => ({ ...prev, [field]: value }))
  }

  const canProceedToStep2 = reservationData.date && reservationData.time && reservationData.partySize
  const canProceedToStep3 =
    reservationData.firstName && reservationData.lastName && reservationData.email && reservationData.phone

  const handleSubmitReservation = () => {
    // Generate confirmation number
    const confirmation = "SB" + Math.random().toString(36).substr(2, 8).toUpperCase()
    setConfirmationNumber(confirmation)
    setStep(4)
  }

  const formatDateDisplay = (date: Date) => {
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    return format(date, "EEEE, MMMM d")
  }

  // Pre-fill user data when signed in
  useState(() => {
    if (isSignedIn && user) {
      setReservationData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        phone: user.phoneNumbers[0]?.phoneNumber || "",
      }))
    }
  })

  if (step === 1) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Make a Reservation</h1>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Date & Time</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm text-gray-600">Details</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="ml-2 text-sm text-gray-600">Confirm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Select Date
              </CardTitle>
              <CardDescription>Choose your preferred dining date</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={reservationData.date}
                onSelect={(date) => updateReservationData("date", date)}
                disabled={(date) => isBefore(date, startOfDay(new Date())) || date > addDays(new Date(), 60)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Select Time
                </CardTitle>
                <CardDescription>
                  {reservationData.date
                    ? `Available times for ${formatDateDisplay(reservationData.date)}`
                    : "Please select a date first"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={reservationData.time === slot.time ? "default" : "outline"}
                      disabled={!slot.available || !reservationData.date}
                      onClick={() => updateReservationData("time", slot.time)}
                      className="relative"
                    >
                      {slot.time}
                      {slot.popular && (
                        <Badge variant="secondary" className="absolute -top-1 -right-1 text-xs px-1">
                          Popular
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Party Size
                </CardTitle>
                <CardDescription>How many guests will be dining?</CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={reservationData.partySize}
                  onValueChange={(value) => updateReservationData("partySize", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select party size" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size} {size === 1 ? "Guest" : "Guests"}
                      </SelectItem>
                    ))}
                    <SelectItem value="9+">9+ Guests (Please call)</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={() => setStep(2)} disabled={!canProceedToStep2} size="lg">
            Continue to Details
          </Button>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Contact Information</h1>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="ml-2 text-sm text-green-600">Date & Time</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Details</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="ml-2 text-sm text-gray-600">Confirm</span>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
            <CardDescription>
              {isSignedIn
                ? "We've pre-filled your information. Please review and update if needed."
                : "Please provide your contact information for the reservation."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={reservationData.firstName}
                  onChange={(e) => updateReservationData("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={reservationData.lastName}
                  onChange={(e) => updateReservationData("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={reservationData.email}
                onChange={(e) => updateReservationData("email", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={reservationData.phone}
                onChange={(e) => updateReservationData("phone", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
              <Textarea
                id="specialRequests"
                value={reservationData.specialRequests}
                onChange={(e) => updateReservationData("specialRequests", e.target.value)}
                placeholder="Dietary restrictions, special occasions, seating preferences..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => setStep(1)}>
            Back to Date & Time
          </Button>
          <Button onClick={() => setStep(3)} disabled={!canProceedToStep3} size="lg">
            Review Reservation
          </Button>
        </div>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Review Your Reservation</h1>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="ml-2 text-sm text-green-600">Date & Time</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="ml-2 text-sm text-green-600">Details</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="ml-2 text-sm font-medium">Confirm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reservation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="font-medium">Date</span>
                <span>{reservationData.date ? format(reservationData.date, "EEEE, MMMM d, yyyy") : ""}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="font-medium">Time</span>
                <span>{reservationData.time}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="font-medium">Party Size</span>
                <span>
                  {reservationData.partySize} {reservationData.partySize === "1" ? "Guest" : "Guests"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-medium">Name</span>
                <span>
                  {reservationData.firstName} {reservationData.lastName}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="font-medium">Email</span>
                <span>{reservationData.email}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="font-medium">Phone</span>
                <span>{reservationData.phone}</span>
              </div>
              {reservationData.specialRequests && (
                <div className="py-2">
                  <span className="font-medium">Special Requests</span>
                  <p className="mt-1 text-gray-600">{reservationData.specialRequests}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Restaurant Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">SmartBite Restaurant</p>
                <p className="text-gray-600">123 Culinary Street, Food District</p>
                <p className="text-gray-600">New York, NY 10001</p>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    <span className="text-sm">(555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    <span className="text-sm">info@smartbite.com</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reservation Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Please arrive within 15 minutes of your reservation time</li>
                <li>• Cancellations must be made at least 2 hours in advance</li>
                <li>• Large parties (8+) may require a deposit</li>
                <li>• We hold tables for 15 minutes past reservation time</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => setStep(2)}>
            Back to Details
          </Button>
          <Button onClick={handleSubmitReservation} size="lg">
            Confirm Reservation
          </Button>
        </div>
      </div>
    )
  }

  if (step === 4) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Reservation Confirmed!</h1>
          <p className="text-gray-600">Your table has been successfully reserved</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Confirmation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Confirmation Number</p>
              <p className="text-2xl font-bold text-orange-600">{confirmationNumber}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-600">Date & Time</p>
                <p className="font-medium">
                  {reservationData.date ? format(reservationData.date, "MMM d, yyyy") : ""} at {reservationData.time}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Party Size</p>
                <p className="font-medium">
                  {reservationData.partySize} {reservationData.partySize === "1" ? "Guest" : "Guests"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">
                  {reservationData.firstName} {reservationData.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium">{reservationData.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-600">
            A confirmation email has been sent to <strong>{reservationData.email}</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => (window.location.href = "/")}>Return to Home</Button>
            <Button variant="outline" onClick={() => (window.location.href = "/menu")}>
              View Menu
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
