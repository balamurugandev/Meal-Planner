import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MealPlanner from './pages/MealPlanner';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <UserProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/meal-planner" element={
                  <ProtectedRoute>
                    <MealPlanner />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
              </Routes>
            </Layout>
          </Router>
        </UserProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;