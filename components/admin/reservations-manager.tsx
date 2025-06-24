"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Search,
  CalendarIcon,
  Eye,
  Phone,
  Mail,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
} from "lucide-react"
import { format, addDays, isToday, isTomorrow } from "date-fns"
import { cn } from "@/lib/utils"
import { ReservationDetailModal } from "./reservation-detail-modal"

// Mock data - in production, this would come from your database
const mockReservations = [
  {
    id: "RES001",
    customerName: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    date: new Date(),
    time: "7:00 PM",
    partySize: 4,
    status: "confirmed",
    specialRequests: "Window table preferred",
    createdAt: new Date(),
    confirmationNumber: "SB123ABC",
  },
  {
    id: "RES002",
    customerName: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "(555) 987-6543",
    date: addDays(new Date(), 1),
    time: "6:30 PM",
    partySize: 2,
    status: "pending",
    specialRequests: "Anniversary dinner",
    createdAt: new Date(),
    confirmationNumber: "SB456DEF",
  },
  {
    id: "RES003",
    customerName: "Mike Davis",
    email: "mike@example.com",
    phone: "(555) 456-7890",
    date: new Date(),
    time: "8:00 PM",
    partySize: 6,
    status: "confirmed",
    specialRequests: "Business dinner, quiet area",
    createdAt: new Date(),
    confirmationNumber: "SB789GHI",
  },
  {
    id: "RES004",
    customerName: "Emily Brown",
    email: "emily@example.com",
    phone: "(555) 321-0987",
    date: addDays(new Date(), 2),
    time: "7:30 PM",
    partySize: 3,
    status: "cancelled",
    specialRequests: "",
    createdAt: new Date(),
    confirmationNumber: "SB012JKL",
  },
  {
    id: "RES005",
    customerName: "David Wilson",
    email: "david@example.com",
    phone: "(555) 654-3210",
    date: addDays(new Date(), -1),
    time: "6:00 PM",
    partySize: 2,
    status: "completed",
    specialRequests: "Vegetarian options",
    createdAt: new Date(),
    confirmationNumber: "SB345MNO",
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
    case "completed":
      return <CheckCircle className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

const formatDateDisplay = (date: Date) => {
  if (isToday(date)) return "Today"
  if (isTomorrow(date)) return "Tomorrow"
  return format(date, "MMM d, yyyy")
}

export function ReservationsManager() {
  const [reservations, setReservations] = useState(mockReservations)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<Date>()
  const [selectedReservation, setSelectedReservation] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Filter reservations based on search and filters
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.phone.includes(searchTerm) ||
      reservation.confirmationNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter

    const matchesDate = !dateFilter || format(reservation.date, "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd")

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleViewReservation = (reservation: any) => {
    setSelectedReservation(reservation)
    setIsDetailModalOpen(true)
  }

  const handleUpdateReservation = (updatedReservation: any) => {
    setReservations((prev) => prev.map((res) => (res.id === updatedReservation.id ? updatedReservation : res)))
  }

  const handleDeleteReservation = (reservationId: string) => {
    setReservations((prev) => prev.filter((res) => res.id !== reservationId))
  }

  const exportReservations = () => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log("Exporting reservations...", filteredReservations)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reservations</h1>
          <p className="text-gray-600">Manage all restaurant reservations</p>
        </div>
        <Button onClick={exportReservations} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, phone, or confirmation number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full md:w-48 justify-start text-left font-normal",
                    !dateFilter && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
                <div className="p-3 border-t">
                  <Button variant="outline" className="w-full" onClick={() => setDateFilter(undefined)}>
                    Clear Date Filter
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Reservations Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Reservations ({filteredReservations.length})</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Party Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Confirmation</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{reservation.customerName}</div>
                        {reservation.specialRequests && (
                          <div className="text-sm text-gray-500 truncate max-w-32">{reservation.specialRequests}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{formatDateDisplay(reservation.date)}</div>
                        <div className="text-sm text-gray-500">{reservation.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        {reservation.partySize}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(reservation.status)}>
                        <span className="flex items-center space-x-1">
                          {getStatusIcon(reservation.status)}
                          <span className="capitalize">{reservation.status}</span>
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {reservation.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          <span className="truncate max-w-32">{reservation.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{reservation.confirmationNumber}</code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewReservation(reservation)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredReservations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No reservations found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reservation Detail Modal */}
      <ReservationDetailModal
        reservation={selectedReservation}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onUpdate={handleUpdateReservation}
        onDelete={handleDeleteReservation}
      />
    </div>
  )
}
