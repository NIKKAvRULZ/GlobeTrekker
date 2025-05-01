import { useState } from "react";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        //backend signup logic here

    }
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <form onSubmit={handleSignUp} className="bg-gray-100 p-6 rounded-lg w-96 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
