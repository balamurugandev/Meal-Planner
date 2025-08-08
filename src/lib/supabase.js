import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// User profile functions
export const createUserProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert([
      {
        user_id: userId,
        ...profileData
      }
    ])
    .select()
    .single();
  
  return { data, error };
};

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  return { data, error };
};

export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();
  
  return { data, error };
};

export const incrementMealPlanUsage = async (userId) => {
  try {
    // First get the current usage count
    const { data: currentProfile, error: fetchError } = await supabase
      .from('user_profiles')
      .select('meal_plans_used_this_week')
      .eq('user_id', userId)
      .single();
    
    if (fetchError) {
      console.error('Error fetching current usage:', fetchError);
      return { data: null, error: fetchError };
    }
    
    const newCount = (currentProfile.meal_plans_used_this_week || 0) + 1;
    
    // Update with the new count
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ 
        meal_plans_used_this_week: newCount,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating usage count:', error);
      return { data: null, error };
    }
    
    console.log('✅ Usage count updated to:', newCount);
    return { data, error: null };
  } catch (error) {
    console.error('Exception in incrementMealPlanUsage:', error);
    return { data: null, error };
  }
};

// Meal plan functions
export const saveMealPlan = async (userId, mealPlan, preferences) => {
  const { data, error } = await supabase
    .from('meal_plans')
    .insert([
      {
        user_id: userId,
        meal_plan: mealPlan,
        preferences: preferences
      }
    ])
    .select()
    .single();
  
  return { data, error };
};

export const getUserMealPlans = async (userId, limit = 10) => {
  const { data, error } = await supabase
    .from('meal_plans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  return { data, error };
};

export const deleteMealPlan = async (mealPlanId) => {
  const { data, error } = await supabase
    .from('meal_plans')
    .delete()
    .eq('id', mealPlanId);
  
  return { data, error };
};

// Database connection test
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
    
    console.log('✅ Database connection successful');
    return true;
  } catch (err) {
    console.error('Database connection test error:', err);
    return false;
  }
};