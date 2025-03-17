"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#EFE8D8]">
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 bg-[#dd928b] text-white font-bold py-2 px-6 rounded-full 
             hover:bg-[#e48178] transition duration-200"
      >
        Home
      </button>


      <div className="bg-white hover:border hover:border-[#e5ada8] shadow-lg rounded-lg p-8 w-full max-w-md animate-float">
        <h1 className="text-2xl font-semibold text-[#725c3f] text-center mb-6">
          Iniciar Sesión
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#725c3f]">
              Email:
            </label>
            <input
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d0a77b] text-black"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#725c3f]">
              Contraseña:
            </label>
            <input
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d0a77b] text-black"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-[#f3354f] text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#dd928b] text-white py-2 rounded-md hover:bg-[#e48178] transition duration-200 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
