import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  auth: { username: string; password: string } | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthenticationContext = createContext<AuthContextType | undefined>(undefined);

export const AuthenticationProvider = ({ children }: { children: any }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth, setAuth] = useState<{ username: string; password: string } | null>(null);

  const login = (username: string, password: string) => {
    //login for login
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
