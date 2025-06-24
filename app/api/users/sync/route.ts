import { auth, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST() {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user already exists in database
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (existingUser) {
      // Update existing user with latest Clerk data
      const updatedUser = await prisma.user.update({
        where: { clerkId: userId },
        data: {
          email: user.emailAddresses[0]?.emailAddress || existingUser.email,
          firstName: user.firstName || existingUser.firstName,
          lastName: user.lastName || existingUser.lastName,
          phone: user.phoneNumbers[0]?.phoneNumber || existingUser.phone,
        },
      })
      return NextResponse.json(updatedUser)
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email: user.emailAddresses[0]?.emailAddress || "",
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phoneNumbers[0]?.phoneNumber,
        role: user.emailAddresses[0]?.emailAddress === "admin@smartbite.com" ? "ADMIN" : "CUSTOMER",
      },
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error("Error syncing user:", error)
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 })
  }
}
