import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('agrointel_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('agrointel_registered_users');
      // Pre-seed an initial default user
      const defaultUsers = [
        { name: 'Dr. Hari Prasad', email: 'farmer@agrointel.com', password: 'password123', role: 'Farmer' },
        { name: 'Advisory Expert', email: 'expert@agrointel.com', password: 'password123', role: 'Agronomist' }
      ];
      if (!stored) {
        localStorage.setItem('agrointel_registered_users', JSON.stringify(defaultUsers));
        return defaultUsers;
      }
      return JSON.parse(stored);
    } catch {
      return [];
    }
  });

  // Keep localStorage in sync when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('agrointel_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('agrointel_user');
    }
  }, [user]);

  const login = (email, password) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (found) {
      setUser(found);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (name, email, password, role = 'Farmer') => {
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser = { name, email, password, role };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('agrointel_registered_users', JSON.stringify(updatedUsers));
    // Auto login
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
