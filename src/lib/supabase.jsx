import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database helper functions
export const createUserProfile = async (userId, profileData) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([
        {
          user_id: userId,
          ...profileData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    return { data, error };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { data: null, error };
  }
};

export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    return { data, error };
  } catch (error) {
    console.error('Error getting user profile:', error);
    return { data: null, error };
  }
};

export const updateUserProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    return { data, error };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { data: null, error };
  }
};

export const saveMealPlan = async (userId, mealPlan, preferences = {}) => {
  try {
    const { data, error } = await supabase
      .from('meal_plans')
      .insert([
        {
          user_id: userId,
          meal_plan: mealPlan,
          preferences: preferences,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    return { data, error };
  } catch (error) {
    console.error('Error saving meal plan:', error);
    return { data: null, error };
  }
};

export const getUserMealPlans = async (userId, limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    return { data, error };
  } catch (error) {
    console.error('Error getting user meal plans:', error);
    return { data: [], error };
  }
};

export const updateWeeklyUsage = async (userId) => {
  try {
    // Get current usage
    const { data: profile } = await getUserProfile(userId);
    const currentUsage = profile?.meal_plans_used_this_week || 0;

    // Update usage count
    const { data, error } = await updateUserProfile(userId, {
      meal_plans_used_this_week: currentUsage + 1
    });

    return { data, error };
  } catch (error) {
    console.error('Error updating weekly usage:', error);
    return { data: null, error };
  }
};

export const resetWeeklyUsage = async () => {
  try {
    // Reset all users' weekly usage (run this weekly via cron job)
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ meal_plans_used_this_week: 0 });

    return { data, error };
  } catch (error) {
    console.error('Error resetting weekly usage:', error);
    return { data: null, error };
  }
};