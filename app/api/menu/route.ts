import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")

    const where: any = {
      available: true,
    }

    if (category && category !== "all") {
      where.category = category.toUpperCase()
    }

    if (featured === "true") {
      where.featured = true
    }

    const menuItems = await prisma.menuItem.findMany({
      where,
      orderBy: [{ featured: "desc" }, { category: "asc" }, { name: "asc" }],
    })

    return NextResponse.json(menuItems)
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
  }
}
