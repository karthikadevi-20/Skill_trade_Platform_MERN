import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignupImage from "../assets/img/Skills.png";

const Signup = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="flex bg-white rounded-xl shadow-lg w-[50vw] h-[70vh]">
        <div className="w-1/2 bg-gray-100 flex justify-center items-center">
          <img src={SignupImage} alt="Signup" className="w-3/4" />
        </div>
        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Create an Account</h2>
          
          <form  className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            />

            <input
              type="text"
              name="skillsOffered"
              placeholder="Skills You Offer"
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            />

            <input
              type="text"
              name="skillsNeeded"
              placeholder="Skills You Need"
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            />

            <button
              type="submit"
              className="w-full grad-primary text-white p-2 rounded-lg font-semibold transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-600 mt-3 pb-2">
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
