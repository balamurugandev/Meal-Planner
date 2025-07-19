import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, {
          full_name: email.split('@')[0] // Simple default name
        });
        if (error) throw error;
        
        // For demo purposes, auto-sign in after signup
        const { error: signInError } = await signIn(email, password);
        if (signInError) throw signInError;
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
      }
      
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {isSignUp 
              ? 'Start planning your meals with Yummurai' 
              : 'Welcome back to Yummurai'
            }
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input-field mt-1"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="input-field mt-1"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isSignUp && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Password should be at least 6 characters long
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary-600 hover:text-primary-500 text-sm"
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </form>

        {isSignUp && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>By signing up, you agree to our terms of service and privacy policy.</p>
            <p className="mt-2">
              <strong>Free tier includes:</strong> 3 meal plans per week, basic features
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;