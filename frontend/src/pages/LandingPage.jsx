import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-200 to-purple-300 relative overflow-hidden px-6">
     
      <div className="text-center z-10">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">
          Learn, Share & Grow!
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
          Connect with skilled individuals, exchange knowledge, and upgrade your expertise in a collaborative environment.
        </p>
        <Link to="/signup">
          <button className="grad-primary text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </div>

      <div className="flex justify-center gap-6 mt-12">
        <div className="bg-white p-6 shadow-xl rounded-lg w-64 animate-float-1">
          <h3 className="text-lg font-bold">🔥 Trending Skills</h3>
          <p className="text-sm text-gray-600">Explore the most in-demand skills in the industry.</p>
        </div>

        <div className="bg-white p-6 shadow-xl rounded-lg w-64 animate-float-2">
          <h3 className="text-lg font-bold">🤝 Skill Exchange</h3>
          <p className="text-sm text-gray-600">Offer your expertise & learn from others.</p>
        </div>

        <div className="bg-white p-6 shadow-xl rounded-lg w-64 animate-float-3">
          <h3 className="text-lg font-bold">🚀 Career Growth</h3>
          <p className="text-sm text-gray-600">Enhance your portfolio with hands-on learning.</p>
        </div>
      </div>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-float-1 { animation: float 3s ease-in-out infinite; }
          .animate-float-2 { animation: float 4s ease-in-out infinite; }
          .animate-float-3 { animation: float 5s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
