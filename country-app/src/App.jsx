import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CountryProvider } from './context/CountryContext';
import Header from './components/Header';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';
import Login from './pages/';
import Favorites from './pages/Favorites';

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
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
          </div>
        </CountryProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;