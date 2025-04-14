import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CountryProvider } from './context/CountryContext';
import Header from './components/Header';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';
import Login from './pages/Login';
import Favorites from './pages/Favorites';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CountryProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />
            <main className="py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/country/:code" element={<CountryPage />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/favorites" 
                  element={
                    <PrivateRoute>
                      <Favorites />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </main>
          </div>
        </CountryProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;