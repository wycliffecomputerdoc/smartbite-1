# SmartBite Restaurant Website

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/wycliffe-kwame-gyambibis-projects/v0-new-project-ss8bmns7sst)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/ss8bmNS7sSt)

## Overview

SmartBite is a modern restaurant website with AI-powered features including an intelligent chatbot, voice ordering, and personalized recommendations.

## Features

- 🤖 **AI Chatbot** - Get instant help with menu recommendations and orders
- 🎤 **Voice Ordering** - Order using voice commands
- 📱 **Mobile-First Design** - Responsive design for all devices
- 🍽️ **Smart Menu** - AI-powered food recommendations
- 🛒 **Shopping Cart** - Easy order management
- 👤 **User Authentication** - Secure login system

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory and add your OpenAI API key:

\`\`\`bash
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

### 4. Test the Chatbot

1. Open the website in your browser
2. Click the chat icon in the bottom right
3. Send a test message like "Hello" or "Show me the menu"

## Troubleshooting

### Chatbot Not Responding

1. **Check API Key**: Ensure your OpenAI API key is correctly set in `.env.local`
2. **Check Console**: Open browser dev tools and check for error messages
3. **Test API**: Visit `/api/test` to verify the API is working
4. **Check Quota**: Ensure your OpenAI account has available credits

### Common Issues

- **API Key Missing**: Add `OPENAI_API_KEY` to your environment variables
- **Network Issues**: Check your internet connection
- **Quota Exceeded**: Check your OpenAI usage limits

## Deployment

Your project is live at:

**[https://vercel.com/wycliffe-kwame-gyambibis-projects/v0-new-project-ss8bmns7sst](https://vercel.com/wycliffe-kwame-gyambibis-projects/v0-new-project-ss8bmns7sst)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/ss8bmNS7sSt](https://v0.dev/chat/projects/ss8bmNS7sSt)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
