import { useAuth } from '../context/AuthContext';

const Favorites = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorite Countries</h1>
      
      {user ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-lg">
            Welcome back, <span className="font-semibold">{user.name}</span>!
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            This is where your favorite countries will appear.
          </p>
          {/* You'll implement the favorites functionality here later */}
        </div>
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          You need to be logged in to view favorites.
        </div>
      )}
    </div>
  );
};

export default Favorites;