import React, { useState, useRef, useEffect } from 'react';
import Logo from '../assets/img/logopic.png';
import { IoNotifications } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { ImSearch } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/');
  };

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current && !profileRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
      if (
        notificationRef.current && !notificationRef.current.contains(event.target)
      ) {
        setShowNotificationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    "You got a new connection request",
    "Aruna responded to your offer",
    "Sri added a new skill request",
  ];

  return (
    <div className="bg-white shadow-md py-4 px-8 fixed w-full top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="h-[40px]" />
          <p className="font-bold text-2xl text-gray-800">XpertFlow</p>
        </div>

        {/* Search */}
        <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 w-[20vw] bg-white">
          <ImSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full focus:outline-none"
          />
        </div>

        {/* Nav Icons */}
        <div className="flex items-center gap-6 relative">
          <Link to="/dashboard" className="text-black text-2xl transition">
            <AiFillHome />
          </Link>

          {/* Notification Icon with Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotificationDropdown(prev => !prev)}
              className="text-black text-2xl focus:outline-none"
            >
              <IoNotifications />
            </button>

            {showNotificationDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((note, idx) => (
                    <div key={idx} className="px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                      {note}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">No notifications</div>
                )}
              </div>
            )}
          </div>

          {/* Profile Icon with Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileDropdown(prev => !prev)}
              className="text-black text-2xl focus:outline-none"
            >
              <CgProfile />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-20">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  onClick={() => setShowProfileDropdown(false)}
                >
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
