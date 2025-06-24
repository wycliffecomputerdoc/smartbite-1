import { PrismaClient, MenuCategory, UserRole } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@smartbite.com" },
    update: {},
    create: {
      clerkId: "admin_clerk_id",
      email: "admin@smartbite.com",
      firstName: "Admin",
      lastName: "User",
      phone: "(555) 123-4567",
      role: UserRole.ADMIN,
    },
  })

  console.log("👤 Created admin user:", adminUser.email)

  // Create sample customers
  const customers = await Promise.all([
    prisma.user.upsert({
      where: { email: "john@example.com" },
      update: {},
      create: {
        clerkId: "john_clerk_id",
        email: "john@example.com",
        firstName: "John",
        lastName: "Smith",
        phone: "(555) 987-6543",
        role: UserRole.CUSTOMER,
      },
    }),
    prisma.user.upsert({
      where: { email: "sarah@example.com" },
      update: {},
      create: {
        clerkId: "sarah_clerk_id",
        email: "sarah@example.com",
        firstName: "Sarah",
        lastName: "Johnson",
        phone: "(555) 456-7890",
        role: UserRole.CUSTOMER,
      },
    }),
  ])

  console.log("👥 Created sample customers")

  // Create menu items
  const menuItems = await Promise.all([
    // Appetizers
    prisma.menuItem.upsert({
      where: { id: "caesar-salad" },
      update: {},
      create: {
        id: "caesar-salad",
        name: "Caesar Salad",
        description: "Crisp romaine lettuce, parmesan cheese, croutons, and our signature Caesar dressing",
        price: 16.99,
        category: MenuCategory.SALADS,
        image: "/images/caesar-salad.jpg",
        featured: true,
        allergens: ["dairy", "gluten"],
      },
    }),
    prisma.menuItem.upsert({
      where: { id: "burrata-caprese" },
      update: {},
      create: {
        id: "burrata-caprese",
        name: "Burrata Caprese",
        description: "Fresh burrata cheese with heirloom tomatoes, basil, and balsamic reduction",
        price: 18.99,
        category: MenuCategory.APPETIZERS,
        image: "/images/burrata-caprese.jpg",
        featured: true,
        allergens: ["dairy"],
      },
    }),
    // Mains
    prisma.menuItem.upsert({
      where: { id: "truffle-risotto" },
      update: {},
      create: {
        id: "truffle-risotto",
        name: "Truffle Risotto",
        description: "Creamy arborio rice with wild mushrooms, truffle oil, and parmesan",
        price: 28.99,
        category: MenuCategory.MAINS,
        image: "/images/truffle-risotto.jpg",
        featured: true,
        allergens: ["dairy"],
      },
    }),
    prisma.menuItem.upsert({
      where: { id: "grilled-salmon" },
      update: {},
      create: {
        id: "grilled-salmon",
        name: "Grilled Atlantic Salmon",
        description: "Fresh salmon fillet with lemon herb butter, seasonal vegetables, and quinoa",
        price: 32.99,
        category: MenuCategory.MAINS,
        image: "/images/grilled-salmon.jpg",
        featured: true,
        allergens: ["fish"],
      },
    }),
    prisma.menuItem.upsert({
      where: { id: "beef-tenderloin" },
      update: {},
      create: {
        id: "beef-tenderloin",
        name: "Beef Tenderloin",
        description: "Premium beef tenderloin with red wine reduction, roasted potatoes, and asparagus",
        price: 45.99,
        category: MenuCategory.MAINS,
        image: "/images/beef-tenderloin.jpg",
        featured: true,
        allergens: [],
      },
    }),
    // Desserts
    prisma.menuItem.upsert({
      where: { id: "chocolate-lava-cake" },
      update: {},
      create: {
        id: "chocolate-lava-cake",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center, vanilla ice cream, and berry compote",
        price: 12.99,
        category: MenuCategory.DESSERTS,
        image: "/images/chocolate-lava-cake.jpg",
        featured: true,
        allergens: ["dairy", "eggs", "gluten"],
      },
    }),
  ])

  console.log("🍽️ Created menu items")

  // Create sample reservations
  const reservations = await Promise.all([
    prisma.reservation.create({
      data: {
        confirmationNumber: "SB001ABC",
        date: new Date("2024-12-30T19:00:00Z"),
        time: "7:00 PM",
        partySize: 4,
        status: "CONFIRMED",
        customerName: "John Smith",
        customerEmail: "john@example.com",
        customerPhone: "(555) 987-6543",
        specialRequests: "Window table preferred",
        userId: customers[0].id,
      },
    }),
    prisma.reservation.create({
      data: {
        confirmationNumber: "SB002DEF",
        date: new Date("2024-12-31T18:30:00Z"),
        time: "6:30 PM",
        partySize: 2,
        status: "PENDING",
        customerName: "Sarah Johnson",
        customerEmail: "sarah@example.com",
        customerPhone: "(555) 456-7890",
        specialRequests: "Anniversary dinner",
        userId: customers[1].id,
      },
    }),
    prisma.reservation.create({
      data: {
        confirmationNumber: "SB003GHI",
        date: new Date("2025-01-02T20:00:00Z"),
        time: "8:00 PM",
        partySize: 6,
        status: "CONFIRMED",
        customerName: "Mike Davis",
        customerEmail: "mike@example.com",
        customerPhone: "(555) 321-0987",
        specialRequests: "Business dinner, quiet area",
      },
    }),
  ])

  console.log("📅 Created sample reservations")

  // Create sample orders
  const sampleOrder = await prisma.order.create({
    data: {
      orderNumber: "ORD001",
      status: "COMPLETED",
      total: 78.97,
      customerName: "John Smith",
      customerEmail: "john@example.com",
      customerPhone: "(555) 987-6543",
      userId: customers[0].id,
      orderItems: {
        create: [
          {
            quantity: 1,
            price: 18.99,
            menuItemId: "burrata-caprese",
          },
          {
            quantity: 2,
            price: 28.99,
            menuItemId: "truffle-risotto",
          },
          {
            quantity: 1,
            price: 12.99,
            menuItemId: "chocolate-lava-cake",
          },
        ],
      },
    },
  })

  console.log("🛒 Created sample orders")

  console.log("✅ Database seeded successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
