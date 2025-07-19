# Yummurai

A smart, AI-powered meal planning application built for busy professionals and families. Generate personalized weekly meal plans based on dietary preferences, budget constraints, and household size.

## 🚀 Features

- **AI-Powered Meal Planning**: Generate personalized weekly meal plans using OpenAI
- **Smart Preferences**: Dietary restrictions, allergies, cuisine preferences, and budget levels
- **Automated Shopping Lists**: Organized by category for efficient grocery shopping
- **Freemium Model**: 3 free meal plans per week, unlimited with Premium ($4.99/month)
- **Mobile-First Design**: Responsive design optimized for mobile devices
- **User Authentication**: Secure authentication with Supabase Auth
- **Real-time Database**: PostgreSQL database with Supabase

## 🛠️ Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **AI Integration**: OpenAI GPT-3.5-turbo
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Hosting**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 16+ and npm
- Supabase account (free tier)
- OpenAI API account (pay-per-use)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai-meal-planner
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your API keys:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_OPENAI_API_KEY=your_openai_api_key
```

### 4. Set Up Supabase Database

Run these SQL commands in your Supabase SQL editor:

```sql
-- Create user profiles table
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  dietary_restrictions TEXT[] DEFAULT '{}',
  allergies TEXT[] DEFAULT '{}',
  cuisine_preferences TEXT[] DEFAULT '{}',
  budget_level TEXT DEFAULT 'medium',
  household_size INTEGER DEFAULT 2,
  meal_plans_used_this_week INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  dislikes TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create meal plans table
CREATE TABLE meal_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  meal_plan JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for meal_plans
CREATE POLICY "Users can view own meal plans" ON meal_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meal plans" ON meal_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for user_profiles
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 5. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.js       # Main layout with navigation
│   └── ProtectedRoute.js # Route protection
├── contexts/           # React Context providers
│   ├── AuthContext.js  # Authentication state
│   └── UserContext.js  # User profile and preferences
├── lib/               # External service integrations
│   ├── supabase.js    # Supabase client and helpers
│   └── openai.js      # OpenAI API integration
├── pages/             # Main application pages
│   ├── Home.js        # Landing page
│   ├── Login.js       # Authentication
│   ├── Dashboard.js   # User dashboard
│   ├── MealPlanner.js # Meal planning interface
│   └── Profile.js     # User preferences
├── App.js             # Main app component
├── index.js           # React entry point
└── index.css          # Global styles with Tailwind
```

## 🔧 Configuration

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your URL and anon key
3. Run the database schema SQL commands above
4. Enable email authentication in Authentication > Settings

### OpenAI Setup

1. Create an account at [platform.openai.com](https://platform.openai.com)
2. Generate an API key in the API keys section
3. Add billing information (pay-per-use, very cost-effective for MVP)

### Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

## 💰 Cost Breakdown

- **Supabase**: Free tier (up to 50,000 monthly active users)
- **OpenAI API**: ~$0.002 per meal plan generation (very affordable)
- **Vercel Hosting**: Free tier (perfect for MVP)
- **Domain** (optional): ~$10-15/year

**Total monthly cost for MVP**: Under $10 for moderate usage

## 🎯 MVP Features Implemented

✅ User authentication and profiles  
✅ AI meal plan generation  
✅ Dietary preferences and restrictions  
✅ Shopping list generation  
✅ Freemium model (3 free plans/week)  
✅ Mobile-responsive design  
✅ User dashboard and meal history  

## 🚀 Future Enhancements

- Recipe rating and favorites
- Meal plan sharing
- Nutritional tracking
- Integration with grocery delivery services
- Recipe photo generation
- Meal prep scheduling
- Family meal coordination

## 🐛 Troubleshooting

### Common Issues

1. **OpenAI API errors**: Check your API key and billing setup
2. **Supabase connection issues**: Verify URL and anon key
3. **Authentication problems**: Check RLS policies are set up correctly

### Development Tips

- Use browser dev tools to debug API calls
- Check Supabase logs for database issues
- Monitor OpenAI usage in their dashboard

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or issues, please open a GitHub issue or contact [your-email].

---

Built with ❤️ for busy people who want to eat well!
