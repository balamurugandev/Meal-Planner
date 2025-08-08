import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserProfile, createUserProfile, updateUserProfile as updateProfile, incrementMealPlanUsage as updateWeeklyUsage } from '../lib/supabase';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [mealPlansUsed, setMealPlansUsed] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserProfile();
    } else {
      // Reset state when user logs out
      setUserProfile(null);
      setMealPlansUsed(0);
      setIsPremium(false);
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      console.log('📊 Loading user profile for:', user.email);
      
      const { data, error } = await getUserProfile(user.id);
      
      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create default one
        console.log('👤 Creating new user profile...');
        const defaultProfile = {
          dietary_restrictions: [],
          allergies: [],
          cuisine_preferences: [],
          budget_level: 'medium',
          household_size: 2,
          meal_plans_used_this_week: 0,
          is_premium: false,
          dislikes: []
        };
        
        const { data: newProfile, error: createError } = await createUserProfile(user.id, defaultProfile);
        
        if (!createError && newProfile) {
          setUserProfile(newProfile);
          setMealPlansUsed(newProfile.meal_plans_used_this_week || 0);
          setIsPremium(newProfile.is_premium || false);
          console.log('✅ New user profile created');
        } else {
          console.error('❌ Error creating user profile:', createError);
        }
      } else if (!error && data) {
        setUserProfile(data);
        setMealPlansUsed(data.meal_plans_used_this_week || 0);
        setIsPremium(data.is_premium || false);
        console.log('✅ User profile loaded:', data.dietary_restrictions?.length || 0, 'dietary restrictions');
      } else {
        console.error('❌ Error loading user profile:', error);
      }
    } catch (error) {
      console.error('❌ Exception loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updates) => {
    if (!user || !userProfile) {
      console.error('❌ Cannot update profile: no user or profile');
      return { data: null, error: 'No user or profile' };
    }

    try {
      setLoading(true);
      console.log('📝 Updating user profile with:', Object.keys(updates));
      
      const { data, error } = await updateProfile(user.id, updates);
      
      if (!error && data) {
        setUserProfile(data);
        
        // Update local state for specific fields
        if (updates.meal_plans_used_this_week !== undefined) {
          setMealPlansUsed(updates.meal_plans_used_this_week);
        }
        if (updates.is_premium !== undefined) {
          setIsPremium(updates.is_premium);
        }
        
        console.log('✅ User profile updated successfully');
        return { data, error: null };
      } else {
        console.error('❌ Error updating user profile:', error);
        return { data: null, error };
      }
    } catch (error) {
      console.error('❌ Exception updating user profile:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const canGenerateMealPlan = () => {
    if (isPremium) return true;
    return mealPlansUsed < 100; // Free tier limit (increased for testing)
  };

  const incrementMealPlanUsage = async () => {
    if (!user) {
      console.error('❌ No user found for usage increment');
      return { success: false, error: 'No user' };
    }

    try {
      console.log('📈 Incrementing meal plan usage for user:', user.email);
      console.log('📊 Current usage count:', mealPlansUsed);
      
      const { data, error } = await updateWeeklyUsage(user.id);
      
      if (!error && data) {
        const newCount = data.meal_plans_used_this_week;
        setMealPlansUsed(newCount);
        setUserProfile(prev => ({
          ...prev,
          meal_plans_used_this_week: newCount
        }));
        console.log('✅ Meal plan usage updated from', mealPlansUsed, 'to', newCount);
        return { success: true, newCount };
      } else {
        console.error('❌ Error updating usage:', error);
        return { success: false, error };
      }
    } catch (error) {
      console.error('❌ Exception updating usage:', error);
      return { success: false, error };
    }
  };

  const value = {
    userProfile,
    mealPlansUsed,
    isPremium,
    loading,
    canGenerateMealPlan,
    incrementMealPlanUsage,
    updateUserProfile,
    loadUserProfile
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};