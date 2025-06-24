export async function GET() {
  return Response.json({
    message: "API is working!",
    timestamp: new Date().toISOString(),
    openaiConfigured: !!process.env.OPENAI_API_KEY,
  })
}
