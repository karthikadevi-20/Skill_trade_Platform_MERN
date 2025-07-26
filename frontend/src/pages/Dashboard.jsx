import React, { useState, useEffect } from 'react';
import { FaPlus, FaFilter, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Card from '../components/Card';
import { getRequests, addRequests } from '../api/auth';

const Dashboard = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const [requests, setRequests] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ seeks: '' });
  const [filters, setFilters] = useState({ offers: [], seeks: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRequests();
        setRequests(res.data);
        setFilteredUsers(res.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchData();
  }, []);

  const allOffers = loggedInUser?.skillsOffered||[];
  const allSeeks = [...new Set(requests.flatMap((r) => r.skillsNeeded))];
  console.log("allOffers:", allOffers);
  console.log("requests:", requests);
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const alreadySelected = prev[type].includes(value);
      const updated = alreadySelected
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updated };
    });
  };

  const clearFilters = () => {
    setFilters({ offers: [], seeks: [] });
    setFilteredUsers(requests);
  };

  const applyFilters = () => {
    const filtered = requests.filter((request) => {
      const matchesOffer =
        filters.offers.length === 0 ||
        (request.skillsNeeded &&
          request.skillsNeeded.some((skill) => filters.offers.includes(skill)));
  
      const matchesNeed =
        filters.seeks.length === 0 ||
        (request.skillsOffered &&
          request.skillsOffered.some((skill) => filters.seeks.includes(skill)));
  
      return matchesOffer && matchesNeed;
    });
  
    setFilteredUsers(filtered);
    setShowFilter(false);
  };
  

  const postSkillRequest = async () => {

    const newRequest = {
      createdBy: loggedInUser._id,
      skillsNeeded: formData.seeks.split(',').map((s) => s.trim()),
      skillsOffered: loggedInUser.skillsOffered,
    };

    try {
      const res = await addRequests(newRequest);
      const addedRequest = res.data;
      const updatedRequests = [...requests, addedRequest];
      setRequests(updatedRequests);
      setFilteredUsers(updatedRequests);
      setShowAddModal(false);
      setFormData({ seeks: '' });
    } catch (err) {
      console.error('Error adding request:', err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <Nav />

      <div className="pt-24 px-4 flex flex-col items-center justify-center gap-8 text-center">
        <div>
          <p className="text-4xl font-bold text-gray-800">Welcome, {loggedInUser.username}!!</p>
          <p className="text-lg text-gray-700 mt-2">Share your knowledge to gain knowledge</p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center relative">
          <button
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-semibold transition"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus /> Add
          </button>

          <button
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-semibold transition"
            onClick={() => navigate('/mockc')}
          >
            <FaComments /> Connections
          </button>

          <button
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-semibold transition"
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <FaFilter /> Filter
          </button>

          {showFilter && (
  <div className="absolute top-14 right-0 bg-white rounded-lg shadow-lg p-4 w-72 z-10 text-left overflow-y-auto max-h-[400px]">
    <div className="mb-4">
      <p className="font-semibold text-purple-700 mb-2">Filter by Skill Offered</p>
      {allOffers.map((skill,index) => (
        <label key={`${skill}-${index}`} className="flex items-center mb-1 text-sm">
          <input
            type="checkbox"
            checked={filters.offers.includes(skill)}
            onChange={() => handleCheckboxChange('offers', skill)}
            className="mr-2"
          />
          {skill}
        </label>
      ))}
    </div>

    <div className="mb-4">
      <p className="font-semibold text-purple-700 mb-2">Filter by Skill Needed</p>
      {allSeeks.map((skill,index) => (
        <label key={`${skill}-${index}`} className="flex items-center mb-1 text-sm">
          <input
            type="checkbox"
            checked={filters.seeks.includes(skill)}
            onChange={() => handleCheckboxChange('seeks', skill)}
            className="mr-2"
          />
          {skill}
        </label>
      ))}
    </div>

    <div className="flex justify-between">
      <button
        className="text-red-600 text-sm underline"
        onClick={clearFilters}
      >
        Clear All
      </button>
      <button
        className="bg-purple-600 hover:bg-purple-800 text-white text-sm px-4 py-1 rounded"
        onClick={applyFilters}
      >
        Apply
      </button>
    </div>
  </div>
)}


        </div>
      </div>

      <div className="px-6 pt-8 pb-12 w-full flex flex-wrap gap-6 justify-center">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((request, index) => <Card key={index} request={request} />)
        ) : (
          <p className="text-gray-700 text-lg mt-12">No matching skill requests found.</p>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-[90%] max-w-md p-6 shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-600"
              onClick={() => setShowAddModal(false)}
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-purple-700">Add Skill Request</h2>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={loggedInUser.profileUrl || `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${loggedInUser.username}`}
                alt="User"
                className="w-14 h-14 rounded-full border-2"
              />
              <div>
                <p className="font-semibold text-gray-800">{loggedInUser.username}</p>
                <p className="text-sm text-gray-600">{loggedInUser.skillPoints} Skill Points</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Skill You Offer</label>
              <div className="px-3 py-2 border rounded-md bg-gray-100 text-gray-700">
                {loggedInUser.skillsOffered.join(', ')}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">Skill You Want to Learn</label>
              <input
                name="seeks"
                type="text"
                placeholder="Eg: Public Speaking"
                value={formData.seeks}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md font-semibold transition w-full"
              onClick={postSkillRequest}
            >
              Post Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
