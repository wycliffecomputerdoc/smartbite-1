"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, Users } from "lucide-react"
import { format, addDays, isBefore } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function ReservationWidget() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [partySize, setPartySize] = useState("")

  const timeSlots = [
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
  ]

  const canProceed = date && time && partySize

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Quick Reservation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => isBefore(date, new Date()) || date > addDays(new Date(), 60)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Time</label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger>
              <Clock className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Party Size */}
        <div>
          <label className="text-sm font-medium mb-2 block">Party Size</label>
          <Select value={partySize} onValueChange={setPartySize}>
            <SelectTrigger>
              <Users className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Number of guests" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} {size === 1 ? "Guest" : "Guests"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button asChild disabled={!canProceed} className="w-full">
          <Link
            href={`/reservations${canProceed ? `?date=${date?.toISOString()}&time=${time}&party=${partySize}` : ""}`}
          >
            Book Table
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
