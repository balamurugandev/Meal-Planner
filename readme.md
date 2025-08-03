# 🍽️ Yummurai - Smart Meal Planning Made Simple

A modern, database-integrated meal planning application built with React, Vite, and Supabase. Yummurai helps busy professionals and families create personalized weekly meal plans based on their dietary preferences, budget, and regional cuisine preferences.

## 🌟 Features

### 🔐 **User Authentication & Profiles**
- Secure email/password authentication via Supabase
- Persistent user profiles with dietary preferences
- Usage tracking and weekly limits (3 free plans/week)

### 🍳 **Smart Meal Planning**
- Personalized weekly meal plans with local generation algorithm
- Regional cuisine support (Indian & American)
- Dietary restriction awareness (vegetarian, vegan, gluten-free, keto, etc.)
- Budget-conscious meal suggestions
- Automatic shopping list generation

### 💾 **Database Integration**
- Real PostgreSQL database via Supabase
- Persistent meal plan storage and history
- Row-level security for data protection
- Automatic usage tracking and limits

### 🎨 **Modern UI/UX**
- Mobile-first responsive design
- Dark/light theme toggle
- Region switching (India/USA)
- Clean, intuitive interface

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Supabase account (free tier available)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/yummurai.git
cd yummurai
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up Supabase database:**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your Project URL and anon key
   - Run the SQL schema from `DATABASE_SETUP.md`

4. **Configure environment variables:**
```bash
cp .env.example .env.local
```
Edit `.env.local` with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

5. **Start the development server:**
```bash
npm run dev
```

6. **Open your browser:** Navigate to `http://localhost:3000`

## 🗄️ Database Schema

The application uses the following database tables:

### `user_profiles`
- User preferences and dietary restrictions
- Household size and budget level
- Weekly usage tracking
- Premium status

### `meal_plans`
- Generated meal plans with full week data
- Associated user preferences
- Creation timestamps for history

### Authentication
- Handled by Supabase Auth
- Email/password authentication
- Secure session management

## 💰 Cost Structure

### **Development/MVP (FREE)**
- **Supabase**: $0/month (up to 50,000 users, 500MB database)
- **Vercel Hosting**: $0/month (hobby tier)
- **Total**: **$0/month** 🎯

### **Production Scale (1000+ users)**
- **Supabase Pro**: $25/month
- **Vercel Pro**: $20/month  
- **Total**: **$45/month**

## 📱 Usage

### **Getting Started**
1. **Sign Up**: Create an account with email/password
2. **Set Preferences**: Choose dietary restrictions, cuisine preferences, budget level
3. **Generate Plans**: Create personalized weekly meal plans
4. **View History**: Access previously generated meal plans
5. **Shopping Lists**: Get automatic grocery lists for your meals

### **Free Tier Limits**
- 3 meal plans per week
- Basic dietary preferences
- Shopping list generation
- Mobile-responsive design

## 🌍 Regional Support

### 🇮🇳 **India**
- **Cuisines**: North Indian, South Indian, Gujarati, Punjabi, Bengali
- **Ingredients**: Rice, dal, roti, traditional spices
- **Budget**: ₹500-2000+/week ranges
- **Vegetarian-first**: Extensive vegetarian options

### 🇺🇸 **USA**
- **Cuisines**: American, Italian, Mexican, Asian, Mediterranean
- **Ingredients**: Common Western ingredients
- **Budget**: $20-70+/week ranges
- **Diverse Options**: International cuisine variety

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### **Backend & Database**
- **Supabase** - PostgreSQL database with authentication
- **Row Level Security** - Data protection policies
- **Real-time subscriptions** - Live data updates

### **Deployment**
- **Vercel** - Frontend hosting (recommended)
- **Supabase** - Database and authentication hosting

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main app layout with navigation
│   └── ProtectedRoute.jsx # Authentication guard
├── contexts/           # React context providers
│   ├── AuthContext.jsx # Authentication state management
│   ├── UserContext.jsx # User profile and data management
│   └── SettingsContext.jsx # App settings (theme, region)
├── lib/                # External service integrations
│   └── supabase.js     # Supabase client and database functions
├── pages/              # Main application pages
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Authentication page
│   ├── Dashboard.jsx   # User dashboard
│   ├── MealPlanner.jsx # Meal plan generation
│   └── Profile.jsx     # User profile management
└── index.css           # Global styles and Tailwind imports
```

## 🔧 Development

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### **Environment Variables**
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### **Manual Deployment**
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔒 Security Features

- **Row Level Security (RLS)** - Users can only access their own data
- **Environment Variables** - Sensitive keys stored securely
- **Authentication** - Secure email/password via Supabase Auth
- **Data Validation** - Input validation and sanitization

## 🧪 Testing the Database Integration

1. **Sign up** with a test email
2. **Check Supabase Dashboard** → Authentication → Users
3. **Complete profile setup** 
4. **Check Supabase Dashboard** → Table Editor → user_profiles
5. **Generate a meal plan**
6. **Check Supabase Dashboard** → Table Editor → meal_plans

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** - For the excellent database and authentication platform
- **Vercel** - For seamless deployment and hosting
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For beautiful, consistent icons
- Regional cuisine data curated for authentic meal planning

---

**🎯 Status**: Production-ready with database integration  
**💰 Cost**: $0/month for MVP, scales affordably  
**🚀 Ready for**: User testing, feature enhancements, scaling  

Made with ❤️ for better meal planning