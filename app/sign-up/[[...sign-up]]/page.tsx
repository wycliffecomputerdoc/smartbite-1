import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Join SmartBite</h2>
          <p className="mt-2 text-sm text-gray-600">Create your account to make reservations and more</p>
        </div>
        <div className="flex justify-center">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: "bg-orange-600 hover:bg-orange-700 text-sm normal-case",
                card: "shadow-lg",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
              },
            }}
            redirectUrl="/"
          />
        </div>
      </div>
    </div>
  )
}
