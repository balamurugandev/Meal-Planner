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
      <section className="relative text-center space-y-8 py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200/30 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-200/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary-300/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4">
              Welcome to
              <span className="block text-gradient animate-pulse-glow">Yummurai</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full animate-slide-up"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
            Your <span className="text-gradient font-semibold">intelligent meal planning companion</span>. Create personalized meal plans that fit your lifestyle, dietary needs, and budget. 
            <span className="block mt-2 text-lg">Say goodbye to meal planning stress! ✨</span>
          </p>
          
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold shadow-lg animate-bounce-in" style={{animationDelay: '0.4s'}}>
            <span className="animate-pulse mr-2">📍</span>
            Optimized for {region}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style={{animationDelay: '0.6s'}}>
          {user ? (
            <Link to="/dashboard" className="btn-primary text-lg px-10 py-4 hover-glow animate-pulse-glow">
              <span className="flex items-center">
                <ChefHat className="mr-2 w-5 h-5" />
                Go to Dashboard
              </span>
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn-primary text-lg px-10 py-4 hover-glow group">
                <span className="flex items-center">
                  <span className="mr-2">🚀</span>
                  Get Started Free
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-10 py-4 hover-lift">
                <span className="flex items-center">
                  <span className="mr-2">👋</span>
                  Sign In
                </span>
              </Link>
            </>
          )}
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 animate-fade-in" style={{animationDelay: '0.8s'}}>
          <div className="inline-flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Free tier: 100 meal plans per week • No credit card required</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-16 py-20">
        <div className="text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Why Choose <span className="text-gradient">Yummurai</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Built for busy professionals and families who want to eat healthy without the hassle.
            <span className="block mt-2 text-lg">Experience the future of meal planning! 🌟</span>
          </p>
          <div className="w-32 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card-gradient text-center space-y-6 hover-lift group animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  {React.cloneElement(feature.icon, {
                    className: "w-8 h-8 text-primary-600 group-hover:text-primary-500 transition-colors"
                  })}
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary group-hover:text-gradient transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
              <div className="w-0 group-hover:w-full h-0.5 bg-gradient-primary transition-all duration-500 mx-auto rounded-full"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="space-y-16 py-20">
        <div className="text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Start free, upgrade when you need more • Pricing in {config.currency} for {region}
          </p>
          <div className="w-32 h-1 bg-gradient-secondary mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="card-glass border-2 border-gray-200/30 dark:border-gray-600/30 hover-lift animate-slide-in-left">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-lg">
                <span className="text-2xl">🆓</span>
              </div>
              <h3 className="text-3xl font-bold text-primary">Free</h3>
              <div className="text-5xl font-bold text-gradient">{config.currency}0</div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Perfect for trying out the service</p>
            </div>
            
            <ul className="space-y-4 mt-8">
              {[
                "100 meal plans per week",
                "Basic dietary preferences", 
                "Shopping list generation",
                "Mobile-responsive design",
                `${region === 'India' ? 'Indian cuisine focus' : 'American cuisine focus'}`
              ].map((feature, index) => (
                <li key={index} className="flex items-center group">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              to="/login" 
              className="btn-secondary w-full mt-8 text-center block group"
            >
              <span className="flex items-center justify-center">
                Get Started
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="card-gradient border-2 border-primary-500/50 relative hover-lift animate-slide-in-right animate-pulse-glow">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-in">
                <span className="flex items-center">
                  <span className="mr-2">⭐</span>
                  Most Popular
                </span>
              </div>
            </div>
            
            <div className="text-center space-y-6 pt-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-lg">
                <span className="text-2xl">👑</span>
              </div>
              <h3 className="text-3xl font-bold text-gradient">Premium</h3>
              <div className="text-5xl font-bold text-gradient">
                {config.currency}{config.pricing.premium}
                <span className="text-lg text-gray-600 dark:text-gray-400 font-normal">/month</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">For serious meal planners</p>
            </div>
            
            <ul className="space-y-4 mt-8">
              {[
                "Unlimited meal plans",
                "Advanced customization",
                "Nutritional analysis", 
                "Recipe variations",
                "Priority support",
                `${region === 'India' ? 'Regional Indian cuisines' : 'International cuisines'}`
              ].map((feature, index) => (
                <li key={index} className="flex items-center group">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-gradient transition-colors font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              to="/login" 
              className="btn-primary w-full mt-8 text-center block group hover-glow"
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">🚀</span>
                Start Premium
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;