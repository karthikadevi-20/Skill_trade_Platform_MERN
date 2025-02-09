import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignupImage from "../assets/img/loginpage.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="flex bg-white rounded-xl shadow-lg overflow-hidden w-[50vw] h-[70vh]">
        
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back!!</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:ring-0"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:ring-0"
            />

            <button
              type="submit"
              className="w-full grad-primary text-white p-3 rounded-lg font-semibold ransition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>

        <div className="w-1/2 bg-gray-100 flex justify-center items-center">
          <img src={SignupImage} alt="Login" className="w-4/5" />
        </div>

      </div>
    </div>
  );
};

export default Login;
