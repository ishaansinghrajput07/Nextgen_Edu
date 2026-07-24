import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      const { token, user } = res.data;

      // Save in AuthContext + localStorage
      login(user, token);

      // Redirect based on role
      if (user.role === "SuperAdmin") {
        navigate("/superadmin");
      } else if (user.role === "Admin") {
        navigate("/admin");
      } else if (user.role === "Counsellor") {
        navigate("/counsellor");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass p-8 rounded-3xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8">CRM Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-black/20"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-black/20"
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 py-4 rounded-xl font-semibold hover:bg-cyan-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
