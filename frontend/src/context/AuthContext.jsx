// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, adminLogin, adminLogout } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we're on an admin route
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    
    // Only fetch user if we're on admin routes
    if (!isAdminRoute) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const { data } = await getCurrentUser();
        setUser(data);
      } catch (error) {
        console.log('Not authenticated');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Empty dependency array - runs once on mount

  // Listen for route changes to clear user when leaving admin
  useEffect(() => {
    const handleRouteChange = () => {
      const isAdminRoute = window.location.pathname.startsWith('/admin');
      if (!isAdminRoute) {
        setUser(null);
      }
    };

    // Listen for popstate (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);
    
    // Also listen for custom events if using React Router
    const unsubscribe = () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
    
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await adminLogin({ email, password });
      setUser(data);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await adminLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};