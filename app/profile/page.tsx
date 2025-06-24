import { UserProfile } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-2 text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <UserProfile
            appearance={{
              elements: {
                card: "shadow-none border-0",
                navbar: "hidden",
                navbarMobileMenuButton: "hidden",
                headerTitle: "text-2xl font-bold text-gray-900",
                headerSubtitle: "text-gray-600",
                formButtonPrimary: "bg-orange-600 hover:bg-orange-700",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
