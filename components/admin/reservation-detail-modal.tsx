"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, Users, Phone, Mail, Edit, Save, X, Trash2, MessageSquare } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface ReservationDetailModalProps {
  reservation: any
  isOpen: boolean
  onClose: () => void
  onUpdate: (reservation: any) => void
  onDelete: (reservationId: string) => void
}

const timeSlots = [
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
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

export function ReservationDetailModal({
  reservation,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}: ReservationDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedReservation, setEditedReservation] = useState(reservation)
  const { toast } = useToast()

  // Update editedReservation when reservation prop changes
  useState(() => {
    if (reservation) {
      setEditedReservation(reservation)
    }
  }, [reservation])

  if (!reservation) return null

  const handleSave = () => {
    onUpdate(editedReservation)
    setIsEditing(false)
    toast({
      title: "Reservation Updated",
      description: "The reservation has been successfully updated.",
    })
  }

  const handleDelete = () => {
    onDelete(reservation.id)
    onClose()
    toast({
      title: "Reservation Deleted",
      description: "The reservation has been successfully deleted.",
      variant: "destructive",
    })
  }

  const handleStatusChange = (newStatus: string) => {
    const updated = { ...editedReservation, status: newStatus }
    setEditedReservation(updated)
    onUpdate(updated)
    toast({
      title: "Status Updated",
      description: `Reservation status changed to ${newStatus}.`,
    })
  }

  const handleInputChange = (field: string, value: any) => {
    setEditedReservation({ ...editedReservation, [field]: value })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Reservation Details - {reservation.confirmationNumber}</DialogTitle>
            <div className="flex items-center space-x-2">
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
              {isEditing && (
                <>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="font-medium">Status:</span>
              <Badge className={getStatusColor(editedReservation.status)}>
                <span className="capitalize">{editedReservation.status}</span>
              </Badge>
            </div>
            <Select value={editedReservation.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              {isEditing ? (
                <Input
                  id="customerName"
                  value={editedReservation.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                />
              ) : (
                <div className="p-2 bg-gray-50 rounded">{reservation.customerName}</div>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={editedReservation.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              ) : (
                <div className="p-2 bg-gray-50 rounded flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {reservation.email}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={editedReservation.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              ) : (
                <div className="p-2 bg-gray-50 rounded flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {reservation.phone}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="partySize">Party Size</Label>
              {isEditing ? (
                <Select
                  value={editedReservation.partySize.toString()}
                  onValueChange={(value) => handleInputChange("partySize", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size} {size === 1 ? "Guest" : "Guests"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 bg-gray-50 rounded flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-400" />
                  {reservation.partySize} {reservation.partySize === 1 ? "Guest" : "Guests"}
                </div>
              )}
            </div>
          </div>

          {/* Reservation Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Date</Label>
              {isEditing ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !editedReservation.date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editedReservation.date ? format(editedReservation.date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={editedReservation.date}
                      onSelect={(date) => handleInputChange("date", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="p-2 bg-gray-50 rounded flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {format(reservation.date, "EEEE, MMMM d, yyyy")}
                </div>
              )}
            </div>

            <div>
              <Label>Time</Label>
              {isEditing ? (
                <Select value={editedReservation.time} onValueChange={(value) => handleInputChange("time", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 bg-gray-50 rounded flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  {reservation.time}
                </div>
              )}
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <Label htmlFor="specialRequests">Special Requests</Label>
            {isEditing ? (
              <Textarea
                id="specialRequests"
                value={editedReservation.specialRequests}
                onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                placeholder="Any special requests or notes..."
                rows={3}
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded min-h-[80px] flex items-start">
                <MessageSquare className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                <span>{reservation.specialRequests || "No special requests"}</span>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <Label>Confirmation Number</Label>
              <div className="p-2 bg-gray-50 rounded">
                <code className="text-sm">{reservation.confirmationNumber}</code>
              </div>
            </div>
            <div>
              <Label>Created</Label>
              <div className="p-2 bg-gray-50 rounded">{format(reservation.createdAt, "PPP 'at' p")}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete Reservation
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Reservation</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this reservation? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="space-x-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {reservation.status === "confirmed" && (
                <Button onClick={() => handleStatusChange("completed")}>Mark as Completed</Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
