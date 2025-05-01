import { useState } from "react";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        //backend login logic here

    }
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <form onSubmit={handleLogin} className="bg-gray-100 p-6 rounded-lg w-96 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}

export default Login
