import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UserAuth = () => {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
    } else {
      // In a real app, you would register the user
      alert('Registration would be implemented with a backend');
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Welcome, {user.name}</span>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        className="px-4 py-2 rounded border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="px-4 py-2 rounded border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {isLogin ? 'Login' : 'Register'}
      </button>
      <button
        type="button"
        className="text-sm text-blue-500 hover:underline"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </form>
  );
};

export default UserAuth;