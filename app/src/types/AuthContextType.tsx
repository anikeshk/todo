export interface Auth {
  username: string;
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  auth: Auth | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}
