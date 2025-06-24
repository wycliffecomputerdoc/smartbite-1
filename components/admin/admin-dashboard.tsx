"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock, TrendingUp, AlertCircle, CheckCircle, XCircle, Eye } from "lucide-react"
import { format, addDays, isToday, isTomorrow } from "date-fns"
import Link from "next/link"

// Mock data - in production, this would come from your database
const mockStats = {
  todayReservations: 24,
  tomorrowReservations: 31,
  weeklyReservations: 156,
  monthlyReservations: 642,
  pendingReservations: 3,
  confirmedReservations: 21,
  cancelledReservations: 2,
}

const mockRecentReservations = [
  {
    id: "RES001",
    customerName: "John Smith",
    date: new Date(),
    time: "7:00 PM",
    partySize: 4,
    status: "confirmed",
    phone: "(555) 123-4567",
    email: "john@example.com",
  },
  {
    id: "RES002",
    customerName: "Sarah Johnson",
    date: addDays(new Date(), 1),
    time: "6:30 PM",
    partySize: 2,
    status: "pending",
    phone: "(555) 987-6543",
    email: "sarah@example.com",
  },
  {
    id: "RES003",
    customerName: "Mike Davis",
    date: new Date(),
    time: "8:00 PM",
    partySize: 6,
    status: "confirmed",
    phone: "(555) 456-7890",
    email: "mike@example.com",
  },
  {
    id: "RES004",
    customerName: "Emily Brown",
    date: addDays(new Date(), 2),
    time: "7:30 PM",
    partySize: 3,
    status: "cancelled",
    phone: "(555) 321-0987",
    email: "emily@example.com",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="h-4 w-4" />
    case "pending":
      return <Clock className="h-4 w-4" />
    case "cancelled":
      return <XCircle className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

const formatDateDisplay = (date: Date) => {
  if (isToday(date)) return "Today"
  if (isTomorrow(date)) return "Tomorrow"
  return format(date, "MMM d")
}

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at SmartBite today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Reservations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.todayReservations}</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tomorrow's Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.tomorrowReservations}</div>
            <p className="text-xs text-muted-foreground">+29% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.weeklyReservations}</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.pendingReservations}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reservations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Reservations</CardTitle>
            <p className="text-sm text-muted-foreground">Latest bookings and their current status</p>
          </div>
          <Button asChild>
            <Link href="/admin/reservations">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900">{reservation.customerName}</p>
                      <Badge className={getStatusColor(reservation.status)}>
                        <span className="flex items-center space-x-1">
                          {getStatusIcon(reservation.status)}
                          <span className="capitalize">{reservation.status}</span>
                        </span>
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>
                        {formatDateDisplay(reservation.date)} at {reservation.time}
                      </span>
                      <span>•</span>
                      <span>{reservation.partySize} guests</span>
                      <span>•</span>
                      <span>{reservation.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/admin/reservations">
                <Calendar className="h-4 w-4 mr-2" />
                Manage Reservations
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/admin/customers">
                <Users className="h-4 w-4 mr-2" />
                View Customers
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/admin/analytics">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Confirmed</span>
                <span className="font-medium">{mockStats.confirmedReservations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-medium">{mockStats.pendingReservations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cancelled</span>
                <span className="font-medium">{mockStats.cancelledReservations}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{mockStats.todayReservations}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Reservation System</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Gateway</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email Notifications</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Working
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
