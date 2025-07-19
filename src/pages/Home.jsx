import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { ChefHat, Clock, DollarSign, Smartphone } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const { config, region } = useSettings();

  const features = [
    {
      icon: <ChefHat className="w-8 h-8 text-primary-500" />,
      title: "AI-Powered Meal Plans",
      description: "Get personalized weekly meal plans based on your dietary preferences and budget"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-500" />,
      title: "Save Time",
      description: "No more wondering 'what's for dinner?' - we've got you covered with quick, healthy recipes"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-primary-500" />,
      title: "Budget-Friendly",
      description: "Smart meal planning that helps you eat well while staying within your budget"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-primary-500" />,
      title: "Mobile-First",
      description: "Access your meal plans and shopping lists anywhere, anytime on any device"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            Welcome to
            <span className="block text-primary-500">Yummurai</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your AI-powered meal planning companion. Create personalized meal plans that fit your lifestyle, dietary needs, and budget. 
            Say goodbye to meal planning stress!
          </p>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
            📍 Optimized for {region}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn-primary text-lg px-8 py-3">
                Get Started Free
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-8 py-3">
                Sign In
              </Link>
            </>
          )}
        </div>

        <div className="text-sm text-gray-500">
          Free tier: 3 meal plans per week • No credit card required
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Why Choose Yummurai?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Built for busy professionals and families who want to eat healthy without the hassle
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card text-center space-y-4">
              <div className="flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Start free, upgrade when you need more • Pricing in {config.currency} for {region}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="card border-2 border-gray-200 dark:border-gray-600">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-primary">Free</h3>
              <div className="text-4xl font-bold text-primary">{config.currency}0</div>
              <p className="text-gray-600 dark:text-gray-300">Perfect for trying out the service</p>
            </div>
            
            <ul className="space-y-3 mt-6">
              <li className="flex items-center">
                <span className="text-primary-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">3 meal plans per week</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Basic dietary preferences</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Shopping list generation</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Mobile-responsive design</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{region === 'India' ? 'Indian cuisine focus' : 'American cuisine focus'}</span>
              </li>
            </ul>

            <Link 
              to="/login" 
              className="btn-secondary w-full mt-6 text-center block"
            >
              Get Started
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="card border-2 border-primary-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-primary">Premium</h3>
              <div className="text-4xl font-bold text-primary">
                {config.currency}{config.pricing.premium}
                <span className="text-lg text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">For serious meal planners</p>
            </div>
            
            <ul className="space-y-3 mt-6">
              <li className="flex items-center">
                <span className="text-primary-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Unlimited meal plans</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Advanced customization</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Nutritional analysis</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Recipe variations</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Priority support</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{region === 'India' ? 'Regional Indian cuisines' : 'International cuisines'}</span>
              </li>
            </ul>

            <Link 
              to="/login" 
              className="btn-primary w-full mt-6 text-center block"
            >
              Start Premium
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;