"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, Plus, Star, Sparkles } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  isRecommended?: boolean
  dietary: string[]
}

export function MenuContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const { addItem } = useCart()
  const { toast } = useToast()

  // Mock menu data
  useEffect(() => {
    const mockMenuItems: MenuItem[] = [
      {
        id: "1",
        name: "Truffle Risotto",
        description: "Creamy arborio rice with black truffle, parmesan, and fresh herbs",
        price: 28.99,
        category: "mains",
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.8,
        isRecommended: true,
        dietary: ["vegetarian"],
      },
      {
        id: "2",
        name: "Grilled Salmon",
        description: "Atlantic salmon with lemon butter sauce and seasonal vegetables",
        price: 32.99,
        category: "mains",
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.9,
        dietary: ["gluten-free"],
      },
      {
        id: "3",
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with house-made dressing and croutons",
        price: 16.99,
        category: "starters",
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.6,
        dietary: ["vegetarian"],
      },
      {
        id: "4",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center and vanilla ice cream",
        price: 12.99,
        category: "desserts",
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.7,
        isRecommended: true,
        dietary: ["vegetarian"],
      },
      {
        id: "5",
        name: "Beef Tenderloin",
        description: "Prime cut beef with red wine reduction and roasted potatoes",
        price: 45.99,
        category: "mains",
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.9,
        dietary: ["gluten-free"],
      },
      {
        id: "6",
        name: "Burrata Caprese",
        description: "Fresh burrata with heirloom tomatoes and basil oil",
        price: 18.99,
        category: "starters",
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.5,
        dietary: ["vegetarian", "gluten-free"],
      },
    ]
    setMenuItems(mockMenuItems)
  }, [])

  const categories = [
    { value: "all", label: "All Items" },
    { value: "starters", label: "Starters" },
    { value: "mains", label: "Main Courses" },
    { value: "desserts", label: "Desserts" },
  ]

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    })
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* AI Recommendations */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Sparkles className="h-5 w-5 text-orange-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-900">AI Recommendations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems
              .filter((item) => item.isRecommended)
              .map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300 border-orange-200">
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-orange-600">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm text-gray-600">{item.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.dietary.map((diet) => (
                        <Badge key={diet} variant="secondary" className="text-xs">
                          {diet}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-orange-600">${item.price}</span>
                      <Button onClick={() => handleAddToCart(item)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems
            .filter((item) => !item.isRecommended)
            .map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.dietary.map((diet) => (
                      <Badge key={diet} variant="secondary" className="text-xs">
                        {diet}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">${item.price}</span>
                    <Button onClick={() => handleAddToCart(item)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
