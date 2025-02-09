import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignupImage from "../assets/img/Skills.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skillsOffered: "",
    skillsNeeded: "",
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
      
        <div className="w-1/2 bg-gray-100 flex justify-center items-center">
          <img src={SignupImage} alt="Signup" className="w-4/5" />
        </div>

        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Create an Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:ring-0"
            />
            
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

            <input
              type="text"
              name="skillsOffered"
              placeholder="Skills You Offer"
              value={formData.skillsOffered}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:ring-0"
            />

            <input
              type="text"
              name="skillsNeeded"
              placeholder="Skills You Need"
              value={formData.skillsNeeded}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:ring-0"
            />

            <button
              type="submit"
              className="w-full grad-primary text-white p-3 rounded-lg font-semibold transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
