import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { Auth, AuthContextType } from '../types/AuthContextType';

export const AuthenticationContext = createContext<AuthContextType | undefined>(undefined);

export const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true';
  });
  const [auth, setAuth] = useState<Auth | null>(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem('auth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('auth');
    }
  }, [auth]);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const login = (username: string, password: string) => {
    setIsAuthenticated(true);
    setAuth({ username, password });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuth(null);
  };

  return (
    <AuthenticationContext.Provider value={{ auth, isAuthenticated, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
