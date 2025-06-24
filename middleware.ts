import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher(["/admin(.*)", "/profile(.*)", "/reservations/manage(.*)"])

// Define admin routes that require admin role
const isAdminRoute = createRouteMatcher(["/admin(.*)"])

export default clerkMiddleware(async (auth, req) => {
  // Protect admin routes - require authentication and admin role
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth()

    if (!userId) {
      // Redirect to sign-in if not authenticated
      return Response.redirect(new URL("/sign-in", req.url))
    }

    // Check if user has admin role (admin@smartbite.com)
    const email = sessionClaims?.email as string
    if (email !== "admin@smartbite.com") {
      // Redirect to home if not admin
      return Response.redirect(new URL("/", req.url))
    }
  }

  // Protect other authenticated routes
  if (isProtectedRoute(req)) {
    const { userId } = await auth()
    if (!userId) {
      return Response.redirect(new URL("/sign-in", req.url))
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
