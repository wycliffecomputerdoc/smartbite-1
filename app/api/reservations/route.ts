import { auth } from "@clerk/nextjs/server"
import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const createReservationSchema = z.object({
  date: z.string().transform((str) => new Date(str)),
  time: z.string(),
  partySize: z.number().min(1).max(20),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(1),
  specialRequests: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    const { searchParams } = new URL(request.url)

    const status = searchParams.get("status")
    const date = searchParams.get("date")
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    const where: any = {}

    if (status && status !== "all") {
      where.status = status.toUpperCase()
    }

    if (date) {
      const targetDate = new Date(date)
      const nextDay = new Date(targetDate)
      nextDay.setDate(nextDay.getDate() + 1)

      where.date = {
        gte: targetDate,
        lt: nextDay,
      }
    }

    // If not admin, only show user's own reservations
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
      })

      if (user?.role !== "ADMIN") {
        where.userId = user?.id
      }
    }

    const reservations = await prisma.reservation.findMany({
      where,
      orderBy: { date: "asc" },
      take: limit,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(reservations)
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    const body = await request.json()

    const validatedData = createReservationSchema.parse(body)

    // Generate confirmation number
    const confirmationNumber = "SB" + Math.random().toString(36).substr(2, 8).toUpperCase()

    // Get user if authenticated
    let user = null
    if (userId) {
      user = await prisma.user.findUnique({
        where: { clerkId: userId },
      })
    }

    const reservation = await prisma.reservation.create({
      data: {
        confirmationNumber,
        date: validatedData.date,
        time: validatedData.time,
        partySize: validatedData.partySize,
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        customerPhone: validatedData.customerPhone,
        specialRequests: validatedData.specialRequests,
        userId: user?.id,
        status: "PENDING",
      },
    })

    return NextResponse.json(reservation, { status: 201 })
  } catch (error) {
    console.error("Error creating reservation:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 })
  }
}
