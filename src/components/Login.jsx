import React, { useState } from "react";
import farmerImg from "../assets/farmer-tricolor.jpg";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        mobile,
        password,
      });

      const { token, user } = res.data;

      // Store token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("agroUser", JSON.stringify(user));

      setUser(user); // Update context

      navigate("/"); // 👈 Redirect to Home.jsx route

      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className=" pt-10 min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: `url(${farmerImg})` }}
    >
      <form
        onSubmit={handleLogin}
        className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-green-800">Login</h2>

        <div>
          <label className="block text-sm font-medium text-white">
            Mobile Number
          </label>
          <input
            type="tel"
            placeholder="10-digit mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 bg-white/50 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 bg-white/50 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

       
      </form>
    </div>
  );
};

export default Login;
