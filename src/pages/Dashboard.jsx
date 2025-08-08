import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Plus, Clock, Users } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { userProfile, mealPlansUsed, isPremium, canGenerateMealPlan } = useUser();
  
  // Sample data for UI demo
  const recentMealPlans = [
    {
      id: 1,
      created_at: new Date().toISOString(),
      meal_plan: { weekPlan: { monday: {}, tuesday: {}, wednesday: {} } }
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Ready to plan some delicious meals?
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Link
              to="/meal-planner"
              className="btn-primary flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Create Meal Plan</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">This Week</p>
              <p className="text-2xl font-bold text-primary">
                {mealPlansUsed}/{isPremium ? '∞' : '100'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Meal plans used</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
              <Users className="w-6 h-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Household Size</p>
              <p className="text-2xl font-bold text-primary">
                {userProfile?.household_size || 2}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">People</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Plan Status</p>
              <p className="text-lg font-bold text-primary">
                {isPremium ? 'Premium' : 'Free'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Current tier</p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Limit Warning */}
      {!isPremium && !canGenerateMealPlan() && (
        <div className="card border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                Weekly limit reached
              </h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
                <p>
                  You've used all 100 free meal plans this week. Upgrade to Premium for unlimited access!
                </p>
              </div>
              <div className="mt-4">
                <button className="bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-200 dark:hover:bg-yellow-700 transition-colors">
                  Upgrade to Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Meal Plans */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">Recent Meal Plans</h2>
          <Link
            to="/meal-planner"
            className="text-primary-600 hover:text-primary-500 text-sm font-medium"
          >
            View all
          </Link>
        </div>

        {recentMealPlans.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-primary mb-2">
              No meal plans yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Create your first AI-powered meal plan to get started!
            </p>
            <Link to="/meal-planner" className="btn-primary">
              Create Your First Plan
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentMealPlans.map((plan, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-primary">
                      Week of {formatDate(plan.created_at)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {plan.meal_plan?.weekPlan ? Object.keys(plan.meal_plan.weekPlan).length : 7} days planned
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(plan.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium text-primary mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/meal-planner"
              className="block p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <Plus className="w-5 h-5 text-primary-500 mr-3" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Create New Meal Plan</span>
              </div>
            </Link>
            <Link
              to="/profile"
              className="block p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 text-primary-500 mr-3" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Update Preferences</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-primary mb-4">Tips</h3>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <p>• Update your dietary preferences for better meal suggestions</p>
            <p>• Set your household size for accurate portion planning</p>
            <p>• Try different cuisine preferences for variety</p>
            <p>• Check your shopping list before grocery runs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;