import React, { useState } from "react";
import axios from "axios";
import farmerImg from "../assets/farmer-tricolor.jpg";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    gmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("✅ Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("❌ Registration failed. Try again.");
    }
  };

  return (
    <div
      className=" pt-10 min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: `url(${farmerImg})` }}
    >
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          Register Now
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-white">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Your full name"
              className="mt-1 w-full px-4 py-2 bg-white/50 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Mobile Number</label>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              type="tel"
              placeholder="10-digit mobile number"
              className="mt-1 w-full px-4 py-2 bg-white/50 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Gmail</label>
            <input
              name="gmail"
              value={formData.gmail}
              onChange={handleChange}
              type="email"
              placeholder="example@gmail.com"
              className="mt-1 w-full px-4 py-2 bg-white/50 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter a strong password"
              className="mt-1 w-full px-4 py-2 bg-white/50 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Register
          </button>
        </form>

        
      </div>
    </div>
  );
}
