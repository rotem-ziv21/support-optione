import React, { createContext, useContext, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  companyName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    companyName: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    if (email === 'admin@admin.com' && password === 'admin12345') {
      setUser({
        id: 1,
        name: 'מנהל מערכת',
        email: 'admin@admin.com',
        role: 'admin'
      });
    } else if (email === 'user@example.com' && password === 'user123') {
      setUser({
        id: 2,
        name: 'משתמש לדוגמה',
        email: 'user@example.com',
        role: 'customer',
        companyName: 'חברה לדוגמה'
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    companyName: string;
  }) => {
    setUser({
      id: Math.floor(Math.random() * 1000) + 3,
      name: data.name,
      email: data.email,
      role: 'customer',
      companyName: data.companyName
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}