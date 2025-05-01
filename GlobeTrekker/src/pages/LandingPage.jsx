import { Link } from "react-router-dom";

const LandingPage = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-white">
    <h1 className="text-4xl font-bold mb-6">Welcome to Country Explorer</h1>
    <div className="space-x-4">
      <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded-md">Login</Link>
      <Link to="/signup" className="bg-gray-300 px-6 py-2 rounded-md">Sign Up</Link>
    </div>
  </div>
);
export default LandingPage;
