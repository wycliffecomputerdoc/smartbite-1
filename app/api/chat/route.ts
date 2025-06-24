import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const systemPrompt = `You are SmartBite's AI assistant, a helpful chatbot for a modern restaurant. You can help customers with:

1. Menu recommendations and dietary information
2. Making reservations (direct them to /reservations page)
3. Placing orders (direct them to /orders page)
4. Restaurant information (hours, location, etc.)
5. General questions about the restaurant

Restaurant Information:
- Name: SmartBite
- Cuisine: Modern American with international influences
- Hours: Mon-Thu: 11AM-10PM, Fri-Sat: 11AM-11PM, Sun: 11AM-9PM
- Location: 123 Gourmet Street, Food City, FC 12345
- Phone: (555) 123-BITE
- Specialties: AI-powered dining experience, fresh local ingredients, innovative dishes

Menu Categories:
- Starters: Caesar Salad ($16.99), Burrata Caprese ($18.99)
- Mains: Truffle Risotto ($28.99), Grilled Salmon ($32.99), Beef Tenderloin ($45.99)
- Desserts: Chocolate Lava Cake ($12.99)

Reservation Information:
- Online reservations available at /reservations
- Can book up to 60 days in advance
- Party sizes from 1-8 guests (9+ call for availability)
- Available times: 11:00 AM - 9:30 PM
- Popular dinner times: 6:00 PM - 8:30 PM
- Cancellation policy: 2 hours advance notice required

For reservations, always direct customers to visit our reservations page at /reservations where they can select their preferred date, time, and party size.

Be friendly, helpful, and knowledgeable. Always maintain a professional yet warm tone.`

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages,
      maxTokens: 500,
      temperature: 0.7,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)

    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return new Response(
          JSON.stringify({
            error: "API key issue. Please check your OpenAI API key configuration.",
          }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      if (error.message.includes("quota")) {
        return new Response(
          JSON.stringify({
            error: "API quota exceeded. Please try again later.",
          }),
          {
            status: 429,
            headers: { "Content-Type": "application/json" },
          },
        )
      }
    }

    return new Response(
      JSON.stringify({
        error: "Sorry, I'm having trouble responding right now. Please try again in a moment.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
