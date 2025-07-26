import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import SignupImage from "../assets/img/loginpage.png";
import { loginUser } from "../api/auth";

const Login = () => {

  const [email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
     try
     {
      const {data} = await loginUser({email,password});
      localStorage.setItem('user',JSON.stringify(data.user))
      localStorage.setItem('token',data.token);
      navigate("/dashboard");
     }
     catch(err)
     {
      console.error(err);
      alert("Invalid credentials");
      
     }
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
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:ring-0"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:ring-0"
            />

            <button
              type="submit"
              className="w-full grad-primary text-white p-3 rounded-lg font-semibold transition"
            >
              Login
            </button>
            <p className="text-center text-gray-600 mt-3 pb-2">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-purple-600 font-semibold hover:underline">
                      Create one
                    </Link>
                  </p>    
          </form>
        </div>
        

        <div className="w-1/2 bg-gray-100 flex justify-center items-center">
          <img src={SignupImage} alt="Login" className="w-4/5" />
        </div>

      </div>
    </div>
  );
};

export default Login;
