import { Link } from 'react-router-dom';
import UserAuth from '../context/UserAuth';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          Countries Explorer
        </Link>
        <UserAuth />
      </div>
    </header>
  );
};

export default Header;