import React, { useEffect, useState } from 'react';
import { FaEdit, FaStar } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';
import { MdSwapHoriz } from 'react-icons/md';
import { BiSolidUserDetail } from 'react-icons/bi';
import ProfileNav from "../components/ProfileNav";
import { editUser, getUserRequests,editRequest,deleteRequest } from '../api/auth';


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [reqEditing,setReqediting]=useState(false);
  const [editedSkillsNeeded, setEditedSkillsNeeded] = useState('');
  const [editedStatus, setEditedStatus] = useState('')
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsNeeded, setSkillsNeeded] = useState([]);
  const [profileUrl, setProfileUrl] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [requests,setRequests]=useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setUsername(storedUser.username || '');
      setSkillsOffered(storedUser.skillsOffered || []);
      setSkillsNeeded(storedUser.skillsNeeded || []);
      setProfileUrl(storedUser.profileUrl || '');
      setSelectedAvatar(storedUser.profileUrl || '');
    }

    const fetchreqmade=async()=>{
      try{
        const res=await getUserRequests(storedUser._id);
        // console.log(res);
        setRequests(res.data);
      }
      catch(err)
      {
        console.log(err.message);
      }
    }
    fetchreqmade();
  }, []);

  const handleSave = async () => {
    try {
      const updatedData = {
        username,
        bio,
        skillsOffered,
        skillsNeeded,
        profileUrl: selectedAvatar, // Save the selected avatar
      };

      const res = await editUser(user._id, updatedData);
      const updatedUser = res.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleSkillsOfferedChange = (e) => {
    setSkillsOffered(e.target.value.split(',').map(skill => skill.trim()));
  };

  const handleSkillsNeededChange = (e) => {
    setSkillsNeeded(e.target.value.split(',').map(skill => skill.trim()));
  };

  const handleAvatarSelect = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
  };
  const handleEditRequest = async(req) => {
    try{
      const updatedRequestdata={
        ...req
      }
    
    const res=await editRequest(req._id,updatedRequestdata);
    const updatedRequest=res.data;
    setRequests(updatedRequest)
    }
    catch(err)
{
    console.log(err)
}
  };
  
  const handleDeleteRequest = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this request?");
    if (!confirmDelete) return;
  
    try {
      await deleteRequest(id);
      // Filter out the deleted request from the state
      setRequests(prev => prev.filter(req => req._id !== id));
      console.log("Request deleted successfully");
    } catch (err) {
      console.error("Failed to delete request", err);
    }
  };
  
  if (!user) return <div>Loading Profile...</div>;

   // Use Dicebear API to generate avatar dynamically based on username
   const generateAvatar = (username) => {
    const seed = username || "Default";  // Use a default seed if username is not available
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 pt-20 flex items-center justify-center overflow-y-auto">
      <ProfileNav />
      <div className="max-w-5xl bg-white rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-start">
          <div className="flex gap-6 items-center">
            <div className="relative">
              <img
                // Use selected avatar or default if not selected
                src={selectedAvatar || generateAvatar(user.username)}   
                // Default to the first avatar if none selected
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              {isEditing && (
                 <div className="mt-2">
                 {/* Display available avatars for selection */}
                 <h3 className="font-semibold text-lg">Choose an Avatar:</h3>
                 <div className="flex gap-4 mt-2">
                   {['User 1', 'User 2', 'User 3', 'User 4','User 5','User 6','User 7','User 8','User 9','User 10','User 11','User 12','User 13','User 14','User 15'].map((name, index) => (
                     <img
                       key={index}
                       src={generateAvatar(name)}
                       alt={`Avatar ${index + 1}`}
                       className={`h-12 w-12 rounded-full cursor-pointer ${
                         selectedAvatar === generateAvatar(name) ? 'border-2 border-purple-600' : ''
                       }`}
                       onClick={() => handleAvatarSelect(generateAvatar(name))}
                     />
                   ))}
                 </div>
               </div>
              )}
            </div>
            <div>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-xl font-bold border rounded px-2 py-1 w-full"
                  />
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="text-sm text-gray-600 border rounded px-2 py-1 mt-1 w-full"
                  />
                </> 
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{username}</h2>
                  <p className="text-gray-600">{bio}</p>
                </>
              )}
            </div>
          </div>

          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-800"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <GiSkills className="text-3xl mx-auto mb-1 text-yellow-600" />
            {isEditing ? (
              <input
                type="text"
                value={skillsOffered.join(', ')}
                onChange={handleSkillsOfferedChange}
                className="text-center border rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="text-lg font-semibold">{skillsOffered.join(', ')}</p>
            )}
            <p className="text-sm text-gray-500">Skills Offered</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <MdSwapHoriz className="text-3xl mx-auto mb-1 text-purple-600" />
            {isEditing ? (
              <input
                type="text"
                value={skillsNeeded.join(', ')}
                onChange={handleSkillsNeededChange}
                className="text-center border rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="text-lg font-semibold">{skillsNeeded.join(', ')}</p>
            )}
            <p className="text-sm text-gray-500">Skills Needed</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <FaStar className="text-3xl mx-auto mb-1 text-blue-600" />
            <p className="text-lg font-semibold">{user.skillPoints}</p>
            <p className="text-sm text-gray-500">Skill Points</p>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="grid grid-cols-2 gap-6 text-center">
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <BiSolidUserDetail className="text-3xl mx-auto mb-1 text-green-600" />
            <p className="text-lg font-semibold">{user.tradesCompleted}</p>
            <p className="text-sm text-gray-500">Trades Completed</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <BiSolidUserDetail className="text-3xl mx-auto mb-1 text-pink-600" />
            <p className="text-lg font-semibold">{user.connections}</p>
            <p className="text-sm text-gray-500">Connections</p>
          </div>
          <div className="col-span-2">
  <h3 className="text-xl font-semibold mb-4 text-left">Requests Made</h3>
  {requests.length === 0 ? (
    <p className="text-gray-500">No requests made yet.</p>
  ) : (
    <div className="space-y-4">
      {requests.map((req, index) => (
        <div
          key={req._id}
          className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
        >
          <div className="text-left">
            <p className="text-sm text-gray-600">Skill-Needed: {req.skillsNeeded}</p>
            <p className="text-xs text-gray-400">Status: {req.status}</p>
          </div>
          <div className="flex gap-3">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              onClick={() => handleEditRequest(req)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => handleDeleteRequest(req._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}

</div>

        </div>
      </div>
    
    </div>
  );
};

export default ProfilePage;
