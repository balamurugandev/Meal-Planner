import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [region, setRegion] = useState('India');
  const [theme, setTheme] = useState('light');

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedRegion = localStorage.getItem('yummurai-region');
    const savedTheme = localStorage.getItem('yummurai-theme');
    
    if (savedRegion) setRegion(savedRegion);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleRegion = () => {
    const newRegion = region === 'India' ? 'USA' : 'India';
    setRegion(newRegion);
    localStorage.setItem('yummurai-region', newRegion);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('yummurai-theme', newTheme);
  };

  // Region-specific configurations
  const regionConfig = {
    India: {
      currency: '₹',
      currencyCode: 'INR',
      pricing: {
        premium: 299,
        budgetLevels: {
          low: '₹500-1000/week',
          medium: '₹1000-2000/week',
          high: '₹2000+/week'
        }
      },
      cuisines: ['indian', 'south-indian', 'north-indian', 'gujarati', 'punjabi', 'bengali', 'mediterranean', 'italian', 'chinese', 'continental'],
      commonIngredients: ['rice', 'dal', 'roti', 'vegetables', 'spices', 'paneer', 'chicken', 'fish'],
      mealTypes: ['breakfast', 'lunch', 'evening-snack', 'dinner']
    },
    USA: {
      currency: '$',
      currencyCode: 'USD',
      pricing: {
        premium: 4.99,
        budgetLevels: {
          low: '$20-40/week',
          medium: '$40-70/week',
          high: '$70+/week'
        }
      },
      cuisines: ['american', 'italian', 'mexican', 'asian', 'mediterranean', 'french', 'thai', 'japanese'],
      commonIngredients: ['bread', 'pasta', 'chicken', 'beef', 'vegetables', 'cheese', 'eggs', 'milk'],
      mealTypes: ['breakfast', 'lunch', 'dinner']
    }
  };

  const currentConfig = regionConfig[region];

  const value = {
    region,
    theme,
    toggleRegion,
    toggleTheme,
    config: currentConfig,
    isDark: theme === 'dark'
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};