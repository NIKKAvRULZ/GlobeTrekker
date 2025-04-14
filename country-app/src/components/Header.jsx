import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          Countries Explorer
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Welcome, {user.name}
              </span>
              <Link 
                to="/favorites" 
                className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
              >
                Favorites
              </Link>
              <button
                onClick={logout}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;