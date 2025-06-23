import { Card, CardContent } from "@/components/ui/card"
import { Bot, Mic, Calendar, ShoppingCart, Star, Clock } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Chatbot",
      description:
        "Get instant help with menu recommendations, orders, and reservations through our intelligent assistant.",
    },
    {
      icon: Mic,
      title: "Voice Ordering",
      description: "Order your favorite dishes using voice commands for a hands-free dining experience.",
    },
    {
      icon: Calendar,
      title: "Smart Reservations",
      description: "Book tables effortlessly with our intelligent booking system that learns your preferences.",
    },
    {
      icon: ShoppingCart,
      title: "Quick Orders",
      description: "Streamlined ordering process with saved preferences and one-click reordering.",
    },
    {
      icon: Star,
      title: "Personalized Recommendations",
      description: "Discover new dishes based on your taste preferences and dining history.",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Get live updates on your order status and estimated delivery times.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SmartBite?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of dining with our AI-powered features designed to make your restaurant experience
            seamless and personalized.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
