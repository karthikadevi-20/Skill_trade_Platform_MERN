import React from 'react';
import Logo from '../assets/img/logopic.png';

const Card = ({user}) => {
  return (
    <div className="w-[25vw] min-w-[280px] h-[35vh] bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between">
      
      <div className="flex items-center gap-4">
        <img
          src={user.logo||"https://randomuser.me/api/portraits/women/19.jpg"}
          alt="User Logo"
          className="h-[60px] w-[60px] rounded-full border-2 border-purple-500"
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-800">{user.name}</p>
          <p className="text-sm text-gray-500">{user.skillpoints}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600 font-medium mb-1">Offers:</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {user.offers.map((offers,index)=>(
            <span key={index} className='bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full'>{offers}</span>
          ))}
          {/* <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">React</span>
          <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Java</span> */}
        </div>

        <p className="text-sm text-gray-600 font-medium mb-1">Seeks:</p>
        <div className="flex flex-wrap gap-2">
          {user.seeks.map((seek,index)=>(
            <span key={index} className='bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full'>
              {seek}
            </span>
          ))}
          {/* <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">DSA</span>
          <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Communication</span> */}
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-end">
        <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md transition">
          Connect
        </button>
      </div>
    </div>
  );
};

export default Card;
