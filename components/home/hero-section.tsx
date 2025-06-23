"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Utensils, Clock, Star } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Welcome to SmartBite",
      subtitle: "AI-Powered Dining Experience",
      description: "Discover exceptional cuisine with intelligent recommendations tailored just for you.",
      image: "/images/hero-bg-1.jpg",
    },
    {
      title: "Smart Ordering",
      subtitle: "Voice & Chat Enabled",
      description: "Order with ease using our AI assistant or voice commands for a seamless experience.",
      image: "/images/hero-bg-2.jpg",
    },
    {
      title: "Fresh & Local",
      subtitle: "Farm to Table Excellence",
      description: "Sustainably sourced ingredients prepared by our award-winning chefs.",
      image: "/images/hero-bg-3.jpg",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-slide-up">{slides[currentSlide].title}</h1>
          <p className="text-xl md:text-2xl mb-2 text-orange-400 animate-slide-up delay-100">
            {slides[currentSlide].subtitle}
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-slide-up delay-200">
            {slides[currentSlide].description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-300">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link href="/menu">
                <Utensils className="mr-2 h-5 w-5" />
                View Menu
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              <Link href="/orders">
                Order Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 animate-slide-up delay-500">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-yellow-400 mr-1" />
              <span className="text-2xl font-bold">4.9</span>
            </div>
            <p className="text-sm opacity-80">Customer Rating</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-green-400 mr-1" />
              <span className="text-2xl font-bold">25</span>
            </div>
            <p className="text-sm opacity-80">Min Delivery</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Utensils className="h-6 w-6 text-orange-400 mr-1" />
              <span className="text-2xl font-bold">150+</span>
            </div>
            <p className="text-sm opacity-80">Menu Items</p>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-orange-600" : "bg-white bg-opacity-50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
