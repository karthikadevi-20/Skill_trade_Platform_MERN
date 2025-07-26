import React, { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import SignupImage from "../assets/img/Skills.png";
import { registerUser } from "../api/auth";

const Signup = () => {

  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [cnfpwd,setcnfpwd]=useState('');
  const [error,setError]=useState('');
  const [skillsOffered, setSkillsOffered] = useState('');
  const [skillsNeeded, setSkillsNeeded] = useState('');


  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(password!=cnfpwd)
    {
      setError("Passwords do not match");
      return;
    }
    try{
      console.log(username+" "+email+" "+password+" "+skillsOffered+" "+skillsNeeded)
      const {data} = await registerUser({username,email,password,
        skillsOffered:skillsOffered.split(",").map(skill=>skill.trim()),
        skillsNeeded:skillsNeeded.split(",").map(skill=>skill.trim())});
      localStorage.setItem('token',data.token);
      navigate("/dashboard");
    }
    catch(err)
    {
      console.error(err);
      setError("Something went wrong. Please try again");
      
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="flex bg-white rounded-xl shadow-lg w-[50vw] h-[70vh]">
        <div className="w-1/2 bg-gray-100 flex justify-center items-center">
          <img src={SignupImage} alt="Signup" className="w-3/4" />
        </div>
        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Create an Account</h2>
          {error && <div className="text-red-600 text-center mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={(e)=>setUsername(e.target.value)}
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            />
            <input
              type="password"
              name="confrimpassword"
              placeholder="Confrim Password"
              onChange={(e)=>setcnfpwd(e.target.value)}
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            />

            <input
              type="text"
              name="skillsOffered"
              placeholder="Skills You Offer"
              onChange={(e)=>setSkillsOffered(e.target.value)}
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            />

            <input
              type="text"
              name="skillsNeeded"
              placeholder="Skills You Need"
              onChange={(e)=>setSkillsNeeded(e.target.value)}
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
