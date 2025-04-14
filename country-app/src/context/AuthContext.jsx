import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('countryAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // In a real app, you would verify credentials with a backend
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      token: 'mock-token',
    };
    setUser(mockUser);
    localStorage.setItem('countryAppUser', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('countryAppUser');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);