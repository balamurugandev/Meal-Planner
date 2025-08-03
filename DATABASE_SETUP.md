# 🗄️ Supabase Database Integration Guide

## 💰 **Cost-Effective Database Setup (FREE)**

### **Supabase Database**
- **Cost**: $0/month (free tier)
- **Limits**: 50,000 monthly active users, 500MB database, 2GB bandwidth
- **Perfect for MVP**: Handles thousands of users easily

---

## 🚀 **Step 1: Supabase Setup**

### **1.1 Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" → "New Project"
3. Choose organization and create project
4. Wait for database to initialize (~2 minutes)

### **1.2 Get API Keys**
1. Go to **Settings** → **API**
2. Copy your **Project URL** and **anon public key**
3. Save these for environment variables

### **1.3 Create Database Schema**
Go to **SQL Editor** in Supabase dashboard and run this SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user profiles table
CREATE TABLE user_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  dietary_restrictions TEXT[] DEFAULT '{}',
  allergies TEXT[] DEFAULT '{}',
  cuisine_preferences TEXT[] DEFAULT '{}',
  budget_level TEXT DEFAULT 'medium' CHECK (budget_level IN ('low', 'medium', 'high')),
  household_size INTEGER DEFAULT 2 CHECK (household_size > 0 AND household_size <= 20),
  meal_plans_used_this_week INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  dislikes TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create meal plans table
CREATE TABLE meal_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  meal_plan JSONB NOT NULL,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_meal_plans_user_id ON meal_plans(user_id);
CREATE INDEX idx_meal_plans_created_at ON meal_plans(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for meal_plans
CREATE POLICY "Users can view own meal plans" ON meal_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meal plans" ON meal_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
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

-- Create function to reset weekly usage (for cron job)
CREATE OR REPLACE FUNCTION reset_weekly_meal_plan_usage()
RETURNS void AS $$
BEGIN
    UPDATE user_profiles 
    SET meal_plans_used_this_week = 0,
        updated_at = NOW();
END;
$$ language 'plpgsql';
```

### **1.4 Enable Email Authentication**
1. Go to **Authentication** → **Settings**
2. Enable **Email** provider
3. Configure email templates (optional)

---

## ⚙️ **Step 2: Environment Variables**

### **2.1 Create .env.local file**
```bash
cp .env.example .env.local
```

### **2.2 Fill in your API keys**
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 🧪 **Step 3: Test Integration**

### **3.1 Start Development Server**
```bash
npm run dev
```

### **3.2 Test Authentication**
1. Go to `http://localhost:3000`
2. Sign up with a test email
3. Check Supabase **Authentication** → **Users** to see new user

### **3.3 Test Database Integration**
1. Complete user profile setup
2. Generate a meal plan
3. Check Supabase **Table Editor** → **meal_plans** for saved data

---

## 📊 **Step 4: Production Deployment**

### **4.1 Vercel Deployment (FREE)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### **4.2 Set up Weekly Usage Reset**
In Supabase **Database** → **Cron Jobs**:
```sql
-- Reset weekly usage every Monday at 00:00 UTC
SELECT cron.schedule('reset-weekly-usage', '0 0 * * 1', 'SELECT reset_weekly_meal_plan_usage();');
```

---

## 🔒 **Security Best Practices**

### **4.1 Environment Variables**
- Never commit `.env.local` to git
- Use different keys for development/production
- Rotate API keys regularly

### **4.2 Database Security**
- RLS policies are already configured
- Users can only access their own data
- All queries are automatically filtered by user ID

---

## 🚨 **Troubleshooting**

### **Common Issues:**

**1. "Invalid API Key" Error**
- Check environment variable names (VITE_ prefix)
- Verify API key is correct
- Restart development server

**2. "RLS Policy Violation"**
- Ensure user is authenticated
- Check RLS policies are created
- Verify user_id matches auth.uid()

**3. "CORS Error"**
- Check Supabase URL is correct
- Verify anon key permissions
- Check browser console for details

---

## ✅ **Setup Checklist**

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] RLS policies enabled
- [ ] Email authentication configured
- [ ] Environment variables configured
- [ ] Development server running
- [ ] Authentication tested
- [ ] Meal plan generation tested
- [ ] Database records verified

**🎉 Your database-integrated meal planner is now ready!**

---

## 🎯 **What's Working Now**

### ✅ **Real Database Integration**
1. **User Authentication** - Supabase Auth with email/password
2. **User Profiles** - Stored in database with preferences
3. **Meal Plan Storage** - All generated plans saved to database
4. **Usage Tracking** - Weekly limits enforced in database
5. **Error Handling** - Graceful fallbacks for all database operations

### ✅ **Production Features**
- Row-level security for data protection
- Automatic timestamp updates
- Weekly usage reset functionality
- Optimized database queries with indexes
- Real-time data synchronization

### 💰 **Total Cost: $0/month**
- Supabase free tier handles up to 50,000 users
- Perfect for MVP and early growth
- Upgrade to Pro ($25/month) only when you hit limits

**Your Yummurai app now has a real database backend and is ready for production!** 🚀