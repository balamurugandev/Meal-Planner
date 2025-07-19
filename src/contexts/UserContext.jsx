import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    dietary_restrictions: [],
    allergies: [],
    cuisine_preferences: [],
    budget_level: 'medium',
    household_size: 2
  });
  const [mealPlansUsed, setMealPlansUsed] = useState(1);
  const [isPremium, setIsPremium] = useState(false);

  const updateUserProfile = (updates) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const canGenerateMealPlan = () => {
    return isPremium || mealPlansUsed < 3;
  };

  const incrementMealPlanUsage = () => {
    setMealPlansUsed(prev => prev + 1);
  };

  const value = {
    userProfile,
    mealPlansUsed,
    isPremium,
    canGenerateMealPlan,
    incrementMealPlanUsage,
    updateUserProfile
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};