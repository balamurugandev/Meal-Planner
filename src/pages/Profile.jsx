import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { useSettings } from '../contexts/SettingsContext';
import { User, Settings, Crown, Save } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { userProfile, updateUserProfile, isPremium } = useUser();
  const { config, region } = useSettings();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    dietary_restrictions: [],
    allergies: [],
    cuisine_preferences: [],
    budget_level: 'medium',
    household_size: 2,
    dislikes: []
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        dietary_restrictions: userProfile.dietary_restrictions || [],
        allergies: userProfile.allergies || [],
        cuisine_preferences: userProfile.cuisine_preferences || [],
        budget_level: userProfile.budget_level || 'medium',
        household_size: userProfile.household_size || 2,
        dislikes: userProfile.dislikes || []
      });
    }
  }, [userProfile]);

  const dietaryOptions = [
    'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'low-carb', 'mediterranean'
  ];

  // Use region-specific cuisines
  const cuisineOptions = config.cuisines;

  const allergyOptions = [
    'nuts', 'shellfish', 'eggs', 'dairy', 'soy', 'wheat', 'fish', 'sesame'
  ];

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Simulate saving for UI demo
    setTimeout(() => {
      updateUserProfile(formData);
      setMessage('Profile updated successfully!');
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
              <div className="flex items-center mt-1 space-x-2">
                {isPremium ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    Free Tier
                  </span>
                )}
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                  📍 {region}
                </span>
              </div>
            </div>
          </div>
          
          {!isPremium && (
            <button className="btn-primary flex items-center space-x-2">
              <Crown size={16} />
              <span>Upgrade ({config.currency}{config.pricing.premium}/mo)</span>
            </button>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {message && (
          <div className={`p-4 rounded-md ${
            message.includes('successfully') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Basic Information */}
        <div className="card">
          <h2 className="text-xl font-semibold text-primary mb-6 flex items-center">
            <Settings className="mr-2" />
            Basic Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Household Size
              </label>
              <select
                value={formData.household_size}
                onChange={(e) => setFormData(prev => ({ ...prev, household_size: parseInt(e.target.value) }))}
                className="input-field"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'person' : 'people'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Budget Level ({region})
              </label>
              <select
                value={formData.budget_level}
                onChange={(e) => setFormData(prev => ({ ...prev, budget_level: e.target.value }))}
                className="input-field"
              >
                <option value="low">Budget-friendly ({config.pricing.budgetLevels.low})</option>
                <option value="medium">Moderate ({config.pricing.budgetLevels.medium})</option>
                <option value="high">Premium ({config.pricing.budgetLevels.high})</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Dietary Restrictions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dietaryOptions.map(option => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.dietary_restrictions.includes(option)}
                  onChange={() => handleArrayChange('dietary_restrictions', option)}
                  className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm capitalize text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Food Allergies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allergyOptions.map(option => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.allergies.includes(option)}
                  onChange={() => handleArrayChange('allergies', option)}
                  className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm capitalize text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cuisine Preferences */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Cuisine Preferences ({region} focused)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cuisineOptions.map(option => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.cuisine_preferences.includes(option)}
                  onChange={() => handleArrayChange('cuisine_preferences', option)}
                  className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm capitalize text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center space-x-2"
          >
            <Save size={16} />
            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>

      {/* Account Stats */}
      <div className="card">
        <h3 className="text-lg font-semibold text-primary mb-4">Account Statistics</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {userProfile?.meal_plans_used_this_week || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Plans this week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {isPremium ? 'Unlimited' : '3'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Weekly limit</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {new Date().toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Member since</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;