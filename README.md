# SmartBite Restaurant Website

A modern, AI-powered restaurant website built with Next.js, featuring intelligent chatbot assistance, online reservations, menu management, and comprehensive admin tools.

## 🚀 Features

### Customer Features
- **Interactive Menu** - Browse dishes with high-quality images and detailed descriptions
- **Smart Reservations** - Easy booking system with date/time selection and party size options
- **AI Chatbot** - Intelligent assistant for menu questions, reservations, and general inquiries
- **Contact & Location** - Interactive map and contact information
- **Responsive Design** - Perfect experience on all devices

### Admin Features
- **Dashboard Overview** - Real-time statistics and reservation insights
- **Reservation Management** - View, edit, and manage all bookings
- **Customer Management** - Track customer information and booking history
- **Analytics** - Detailed reporting and performance metrics
- **Secure Authentication** - Clerk-powered admin access

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Clerk
- **Styling**: Tailwind CSS + shadcn/ui
- **AI Integration**: OpenAI GPT-4
- **Icons**: Lucide React
- **Database**: Ready for integration (PostgreSQL/MySQL)

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd smartbite-restaurant
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in your environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key for chatbot functionality
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
   - `CLERK_SECRET_KEY`: Your Clerk secret key

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Clerk Authentication Setup

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable and secret keys to `.env.local`
4. Configure sign-in/sign-up options in your Clerk dashboard

### Admin Access

To access the admin panel:
1. Sign up with the email: `admin@smartbite.com`
2. Navigate to `/admin` or use the "Admin" button in the navbar
3. Manage reservations, view analytics, and configure settings

### OpenAI Integration

1. Get an API key from [OpenAI](https://platform.openai.com)
2. Add it to your `.env.local` file
3. The chatbot will automatically start working

## 📱 Usage

### For Customers
- **Browse Menu**: View dishes with images, descriptions, and prices
- **Make Reservations**: Select date, time, and party size
- **Chat with AI**: Ask questions about menu, hours, or make reservations
- **Contact**: Find location and contact information

### For Administrators
- **Dashboard**: View today's reservations and key metrics
- **Manage Reservations**: Edit, confirm, or cancel bookings
- **Customer Insights**: Track customer information and preferences
- **Analytics**: Monitor restaurant performance and trends

## 🎨 Customization

### Styling
- Colors and themes can be modified in `tailwind.config.ts`
- Component styles are in `app/globals.css`
- shadcn/ui components can be customized in `components/ui/`

### Content
- Update restaurant information in component files
- Modify menu items in `components/menu/menu-content.tsx`
- Customize chatbot responses in `app/api/chat/route.ts`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Database Integration

The app is ready for database integration. Recommended options:
- **Supabase** - PostgreSQL with real-time features
- **PlanetScale** - MySQL with branching
- **Neon** - Serverless PostgreSQL
- **MongoDB Atlas** - NoSQL option

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you need help:
1. Check the documentation above
2. Look at the example environment file
3. Review the component structure
4. Open an issue on GitHub

## 🎯 Roadmap

- [ ] Real database integration
- [ ] Email notifications for reservations
- [ ] Online ordering and payment
- [ ] Loyalty program
- [ ] Multi-location support
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)

---

Built with ❤️ using Next.js and modern web technologies.
