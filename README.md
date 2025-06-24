# SmartBite Restaurant - Modern Dining Experience

A comprehensive restaurant management system built with Next.js, featuring online reservations, menu management, user authentication, and admin dashboard.

## 🚀 Features

### Customer Features
- **Online Reservations** - Book tables with date/time selection and party size
- **Interactive Menu** - Browse menu items with images, descriptions, and pricing
- **User Authentication** - Secure sign-up/sign-in with Clerk
- **AI Chatbot** - Get instant help with reservations and menu questions
- **Responsive Design** - Perfect experience on all devices

### Admin Features
- **Reservation Management** - View, edit, and manage all reservations
- **Menu Management** - Add, edit, and organize menu items
- **User Management** - Handle customer accounts and roles
- **Analytics Dashboard** - Track reservations, revenue, and performance
- **Real-time Updates** - Live status updates and notifications

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Styling**: Tailwind CSS + shadcn/ui
- **AI**: OpenAI GPT-4 for chatbot
- **Deployment**: Vercel-ready

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
   - `NEON_DATABASE_URL` - PostgreSQL connection string
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
   - `CLERK_SECRET_KEY` - Clerk secret key
   - `OPENAI_API_KEY` - OpenAI API key for chatbot

4. **Set up the database**
   \`\`\`bash
   # Generate Prisma client
   npm run db:generate
   
   # Push database schema
   npm run db:push
   
   # Seed the database with sample data
   npm run db:seed
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🗄️ Database Schema

### Core Models
- **User** - Customer and admin user accounts
- **Reservation** - Table reservations with status tracking
- **MenuItem** - Restaurant menu items with categories
- **Order** - Customer orders (future feature)
- **OrderItem** - Individual items within orders

### Key Features
- **Role-based Access** - Customer, Staff, Manager, Admin roles
- **Status Tracking** - Reservation and order status management
- **Audit Trail** - Created/updated timestamps on all records
- **Data Integrity** - Foreign key constraints and validation

## 🔧 Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
npm run db:reset     # Reset database (caution!)

# Other
npm run lint         # Run ESLint
\`\`\`

## 🎯 Getting Started

### Admin Access
1. Sign up with email: `admin@smartbite.com`
2. Access admin dashboard at `/admin`
3. Manage reservations, menu items, and users

### Customer Experience
1. Browse the menu at `/menu`
2. Make reservations at `/reservations`
3. Chat with AI assistant for help
4. Sign up for personalized experience

## 🔐 Authentication & Security

- **Clerk Integration** - Enterprise-grade authentication
- **Role-based Access Control** - Different permissions for different user types
- **API Route Protection** - Secure endpoints with middleware
- **Data Validation** - Zod schemas for type-safe API requests

## 📱 Responsive Design

- **Mobile-first** - Optimized for mobile devices
- **Tablet Support** - Perfect experience on tablets
- **Desktop Enhanced** - Rich desktop experience
- **Touch-friendly** - Easy interaction on all devices

## 🤖 AI Features

- **Smart Chatbot** - Powered by OpenAI GPT-4
- **Restaurant Knowledge** - Trained on menu, hours, and policies
- **Reservation Assistance** - Help customers book tables
- **Menu Recommendations** - Suggest dishes based on preferences

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Database Setup
1. Create PostgreSQL database (recommended: Neon, Supabase, or Railway)
2. Update `DATABASE_URL` in environment variables
3. Run migrations: `npm run db:push`
4. Seed data: `npm run db:seed`

## 📊 Performance

- **Server Components** - Optimized rendering performance
- **Image Optimization** - Next.js automatic image optimization
- **Database Indexing** - Optimized queries with proper indexes
- **Caching** - Strategic caching for better performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@smartbite.com or create an issue in the repository.

---

Built with ❤️ using Next.js, Prisma, and Clerk
