import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const UserAuth = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate and send to a backend
    if (isLogin) {
      // Mock login
      login({ email: formData.email, username: formData.email.split('@')[0] });
    } else {
      // Mock signup
      login({ email: formData.email, username: formData.username });
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span>Welcome, {user.username}</span>
        <button 
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {!isLogin && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md"
          required
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
      >
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="text-sm text-primary hover:underline"
      >
        {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
      </button>
    </form>
  );
};

export default UserAuth;