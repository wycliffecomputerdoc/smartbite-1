"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Users, MapPin, Phone, Mail, CheckCircle } from "lucide-react"
import { format, addDays, isBefore, isToday, isTomorrow } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

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

interface TimeSlot {
  time: string
  available: boolean
  popular?: boolean
}

export function ReservationBooking() {
  const [step, setStep] = useState(1)
  const [reservation, setReservation] = useState<ReservationData>({
    date: undefined,
    time: "",
    partySize: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Generate available time slots based on selected date
  const getAvailableTimeSlots = (selectedDate: Date | undefined): TimeSlot[] => {
    if (!selectedDate) return []

    const baseSlots = [
      { time: "11:00 AM", available: true },
      { time: "11:30 AM", available: true },
      { time: "12:00 PM", available: true, popular: true },
      { time: "12:30 PM", available: true, popular: true },
      { time: "1:00 PM", available: true, popular: true },
      { time: "1:30 PM", available: true },
      { time: "2:00 PM", available: true },
      { time: "2:30 PM", available: false }, // Example unavailable slot
      { time: "3:00 PM", available: true },
      { time: "5:00 PM", available: true },
      { time: "5:30 PM", available: true },
      { time: "6:00 PM", available: true, popular: true },
      { time: "6:30 PM", available: true, popular: true },
      { time: "7:00 PM", available: true, popular: true },
      { time: "7:30 PM", available: true, popular: true },
      { time: "8:00 PM", available: true, popular: true },
      { time: "8:30 PM", available: true },
      { time: "9:00 PM", available: true },
      { time: "9:30 PM", available: true },
    ]

    // Simulate different availability for different dates
    if (isToday(selectedDate)) {
      // For today, make morning slots unavailable
      return baseSlots.map((slot) => ({
        ...slot,
        available: slot.time.includes("AM") ? false : slot.available,
      }))
    }

    return baseSlots
  }

  const handleDateSelect = (date: Date | undefined) => {
    setReservation({ ...reservation, date, time: "" })
  }

  const handleTimeSelect = (time: string) => {
    setReservation({ ...reservation, time })
  }

  const handleInputChange = (field: keyof ReservationData, value: string) => {
    setReservation({ ...reservation, [field]: value })
  }

  const canProceedToStep2 = reservation.date && reservation.time && reservation.partySize

  const canProceedToStep3 = reservation.firstName && reservation.lastName && reservation.email && reservation.phone

  const handleSubmitReservation = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Reservation Confirmed!",
      description: "We've sent a confirmation email to your address.",
    })

    setStep(4)
    setIsSubmitting(false)
  }

  const formatDateDisplay = (date: Date) => {
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    return format(date, "EEEE, MMMM d")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Make a Reservation</h1>
          <p className="text-xl text-gray-600">Book your table at SmartBite for an unforgettable dining experience</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${step > stepNumber ? "bg-orange-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-orange-600" />
                Select Date, Time & Party Size
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div>
                  <Label className="text-base font-medium mb-4 block">Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={reservation.date}
                    onSelect={handleDateSelect}
                    disabled={(date) => isBefore(date, new Date()) || date > addDays(new Date(), 60)}
                    className="rounded-md border"
                  />
                </div>

                {/* Time & Party Size */}
                <div className="space-y-6">
                  {/* Party Size */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">Party Size</Label>
                    <Select
                      value={reservation.partySize}
                      onValueChange={(value) => handleInputChange("partySize", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size} {size === 1 ? "Guest" : "Guests"}
                          </SelectItem>
                        ))}
                        <SelectItem value="9+">9+ Guests (Call for availability)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Time Selection */}
                  {reservation.date && (
                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        Available Times for {formatDateDisplay(reservation.date)}
                      </Label>
                      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                        {getAvailableTimeSlots(reservation.date).map((slot) => (
                          <Button
                            key={slot.time}
                            variant={reservation.time === slot.time ? "default" : "outline"}
                            disabled={!slot.available}
                            onClick={() => handleTimeSelect(slot.time)}
                            className={cn(
                              "relative",
                              reservation.time === slot.time && "bg-orange-600 hover:bg-orange-700",
                              !slot.available && "opacity-50 cursor-not-allowed",
                            )}
                          >
                            {slot.time}
                            {slot.popular && slot.available && (
                              <Badge className="absolute -top-1 -right-1 text-xs bg-green-500">Popular</Badge>
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Continue to Contact Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-orange-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Reservation Summary */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Reservation Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-orange-600" />
                    {reservation.date && formatDateDisplay(reservation.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-orange-600" />
                    {reservation.time}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-orange-600" />
                    {reservation.partySize} {reservation.partySize === "1" ? "Guest" : "Guests"}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={reservation.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={reservation.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={reservation.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={reservation.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                <Textarea
                  id="specialRequests"
                  value={reservation.specialRequests}
                  onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                  placeholder="Dietary restrictions, special occasions, seating preferences..."
                  rows={3}
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!canProceedToStep3}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Review Reservation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-orange-600" />
                Review & Confirm
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Complete Reservation Details */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reservation Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-3 text-orange-600" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-gray-600">
                          {reservation.date && format(reservation.date, "EEEE, MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3 text-orange-600" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-gray-600">{reservation.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-3 text-orange-600" />
                      <div>
                        <p className="font-medium">Party Size</p>
                        <p className="text-gray-600">
                          {reservation.partySize} {reservation.partySize === "1" ? "Guest" : "Guests"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-3 text-orange-600" />
                      <div>
                        <p className="font-medium">Name</p>
                        <p className="text-gray-600">
                          {reservation.firstName} {reservation.lastName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-orange-600" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">{reservation.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-orange-600" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-600">{reservation.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {reservation.specialRequests && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="font-medium mb-2">Special Requests</p>
                    <p className="text-gray-600">{reservation.specialRequests}</p>
                  </div>
                )}
              </div>

              {/* Restaurant Info */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium">SmartBite Restaurant</p>
                    <p className="text-gray-600">123 Gourmet Street, Food City, FC 12345</p>
                    <p className="text-gray-600">(555) 123-BITE</p>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Reservation Policy:</p>
                <ul className="space-y-1">
                  <li>• Please arrive within 15 minutes of your reservation time</li>
                  <li>• Cancellations must be made at least 2 hours in advance</li>
                  <li>• Large parties (8+) may require a deposit</li>
                  <li>• We'll hold your table for 15 minutes past reservation time</li>
                </ul>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back to Edit
                </Button>
                <Button
                  onClick={handleSubmitReservation}
                  disabled={isSubmitting}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {isSubmitting ? "Confirming..." : "Confirm Reservation"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardContent className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Reservation Confirmed!</h2>
              <p className="text-xl text-gray-600 mb-6">Thank you, {reservation.firstName}! Your table is reserved.</p>

              <div className="bg-green-50 p-6 rounded-lg mb-6 max-w-md mx-auto">
                <h3 className="font-semibold text-gray-900 mb-3">Confirmation Details</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Date:</strong> {reservation.date && format(reservation.date, "EEEE, MMMM d, yyyy")}
                  </p>
                  <p>
                    <strong>Time:</strong> {reservation.time}
                  </p>
                  <p>
                    <strong>Party Size:</strong> {reservation.partySize}{" "}
                    {reservation.partySize === "1" ? "Guest" : "Guests"}
                  </p>
                  <p>
                    <strong>Confirmation #:</strong> SB{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">A confirmation email has been sent to {reservation.email}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => (window.location.href = "/")}>Return to Home</Button>
                <Button variant="outline" onClick={() => (window.location.href = "/menu")}>
                  View Menu
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
