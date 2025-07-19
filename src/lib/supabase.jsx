import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database schema helper functions
export const createUserProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert([
      {
        user_id: userId,
        ...profileData
      }
    ]);
  
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

export const saveMealPlan = async (userId, mealPlan) => {
  const { data, error } = await supabase
    .from('meal_plans')
    .insert([
      {
        user_id: userId,
        meal_plan: mealPlan,
        created_at: new Date().toISOString()
      }
    ]);
  
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