import React, { useState, useEffect } from 'react';
import { connectUsers, getUserById } from '../api/auth';
import { createChat } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Card = ({ request }) => {
  const [user, setUser] = useState(null);
  const currentUser=JSON.parse(localStorage.getItem("user"))
  const navigate=useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(request.createdBy);
        if (res && res.data) {
          setUser(res.data);
        } else {
          console.error("Malformed response from getUserById:", res);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
    fetchUser();
  }, [request.createdBy]);
  
  if (!user) {
    return <div className="w-[25vw] min-w-[280px] h-[35vh] bg-white shadow-lg rounded-xl p-4 flex items-center justify-center">Loading...</div>;
  }

  const handleConnect=async()=>{
    const chatRes = await createChat([currentUser._id, user._id], currentUser._id, user._id);
    console.log("Chat result",chatRes);
    
    if (!chatRes || !chatRes._id) {
      console.error("Chat creation failed or malformed response", chatRes);
      return;
    }
    
    navigate(`/chat/${chatRes._id}`);
  }

  return (
    <div className="w-[25vw] min-w-[280px] h-[35vh] bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between">
      <div className="flex items-center gap-4">
        <img
          src={user.profileUrl||`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${user.username}`}
          alt="User Logo" 
          className="h-[60px] w-[60px] rounded-full border-2 border-purple-500"
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-800">{user.username}</p>
          <p className="text-sm text-gray-500">{user.skillPoints} Skill Points</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600 font-medium mb-1">Offers:</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {user.skillsOffered?.map((offer, index) => (
            <span key={index} className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">{offer}</span>
          ))}
        </div>

        <p className="text-sm text-gray-600 font-medium mb-1">Seeks:</p>
        <div className="flex flex-wrap gap-2">
          {request.skillsNeeded?.map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md transition"
        onClick={handleConnect}>
          Connect
        </button>
      </div>
    </div>
  );
};

export default Card;
