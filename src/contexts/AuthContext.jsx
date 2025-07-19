import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simple mock authentication - just for UI testing
  const signUp = async (email, password) => {
    const mockUser = {
      id: 'test-user',
      email: email,
      user_metadata: { full_name: email.split('@')[0] }
    };
    setUser(mockUser);
    return { data: { user: mockUser }, error: null };
  };

  const signIn = async (email, password) => {
    const mockUser = {
      id: 'test-user',
      email: email,
      user_metadata: { full_name: email.split('@')[0] }
    };
    setUser(mockUser);
    return { data: { user: mockUser }, error: null };
  };

  const signOut = async () => {
    setUser(null);
    return { error: null };
  };

  const value = {
    user,
    signUp,
    signIn,
    signOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};