import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaSearch, FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";
// import { logout } from "../redux/authSlice"; 
import Logo from "../assets/img/logopic.png";

const Navbar = () => {
  

  return (
    <div className="bg-white shadow-md py-4 px-8 fixed w-full top-0 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="h-[40px]" />
          <p className="font-bold text-2xl text-gray-800">XpertFlow</p>
        </div>
         
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 font-medium transition">
              About
            </Link>
            <Link
              to="/login"
              className="px-5 py-2 border border-purple-950 text-grad-primary rounded-lg font-medium hover:bg-purple-900 hover:text-white transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 grad-primary text-white rounded-lg font-medium hover:grad-primary transition"
            >
              Sign Up
            </Link>
          </div>
      </div>
    </div>

  );
};

export default Navbar;
