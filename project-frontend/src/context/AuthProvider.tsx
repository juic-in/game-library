import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from 'react';
import { authVerify } from '../api/auth';

export interface User {
  userId: string;
  username: string;
  profilePicture?: string;
  isAdmin: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user: User | null;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  user: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // General non-sensitive user data
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await authVerify();
      if ('error' in response) {
        setIsAuthenticated(false);
        return;
      }
      const { data } = response.payload;
      switch (response.status) {
        case 200:
          setIsAuthenticated(true);
          setUser(data);
          break;
        default:
          setIsAuthenticated(false);
          setUser(null);
          break;
      }
    };
    fetchData();
  }, [isAuthenticated]);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
