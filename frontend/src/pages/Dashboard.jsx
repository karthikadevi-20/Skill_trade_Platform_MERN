import React, { useState, useEffect } from 'react';
import { FaPlus, FaFilter, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Card from '../components/Card';

const Dashboard = () => {
  const navigate = useNavigate();

  const loggedInUser = {
    name: 'Sri',
    points: 50,
    logo: 'https://randomuser.me/api/portraits/women/18.jpg',
    offers: ['React', 'Java'],
  };

  const [users, setUsers] = useState([
    {
      name: 'Sri',
      points: 50,
      offers: ['React', 'Java'],
      seeks: ['DSA', 'Communication'],
      logo: 'https://randomuser.me/api/portraits/women/18.jpg',
    },
    {
      name: 'Aruna',
      points: 40,
      offers: ['Python', 'Design'],
      seeks: ['Public Speaking', 'JavaScript'],
      logo: 'https://randomuser.me/api/portraits/women/19.jpg',
    },
    {
      name: 'John',
      points: 60,
      offers: ['UI/UX'],
      seeks: ['Backend'],
      logo: 'https://randomuser.me/api/portraits/men/44.jpg',
    },
  ]);

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [showFilter, setShowFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    seeks: '',
  });

  const [filters, setFilters] = useState({ status: [], skills: [] });

  const allOffers = [...new Set(users.flatMap((user) => user.offers))];
  const allSeeks = [...new Set(users.flatMap((user) => user.seeks))];

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
    setFilters({ status: [], skills: [] });
    setFilteredUsers(users);
  };

  const applyFilters = () => {
    const filtered = users.filter((user) => {
      const matchesOffer =
        filters.status.length === 0 ||
        user.offers.some((skill) => filters.status.includes(skill));
      const matchesSeek =
        filters.skills.length === 0 ||
        user.seeks.some((skill) => filters.skills.includes(skill));
      return matchesOffer && matchesSeek;
    });

    setFilteredUsers(filtered);
    setShowFilter(false);
  };

  const postSkillRequest = () => {
    if (!formData.seeks.trim()) return;

    const newPost = {
      name: loggedInUser.name,
      points: loggedInUser.points,
      offers: loggedInUser.offers,
      seeks: formData.seeks.split(',').map((s) => s.trim()),
      logo: loggedInUser.logo,
    };

    const updatedUsers = [...users, newPost];
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setShowAddModal(false);
    setFormData({ seeks: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <Nav />

      <div className="pt-24 px-4 flex flex-col items-center justify-center gap-8 text-center">
        <div>
          <p className="text-4xl font-bold text-gray-800">Welcome, {loggedInUser.name}!!</p>
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
            onClick={() => navigate('/connections')}
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
            <div className="absolute top-14 right-0 bg-white rounded-lg shadow-lg p-4 w-64 z-10 text-left">
              <div>
                <p className="font-semibold mb-2">Skill You Can Offer</p>
                {allOffers.map((skill) => (
                  <label key={skill} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(skill)}
                      onChange={() => handleCheckboxChange('status', skill)}
                      className="mr-2"
                    />
                    {skill}
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <p className="font-semibold mb-2">Skill You Want</p>
                {allSeeks.map((skill) => (
                  <label key={skill} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={filters.skills.includes(skill)}
                      onChange={() => handleCheckboxChange('skills', skill)}
                      className="mr-2"
                    />
                    {skill}
                  </label>
                ))}
              </div>

              <div className="mt-4 flex justify-between">
                <button className="text-sm text-red-600 underline" onClick={clearFilters}>
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
        {filteredUsers.map((user, index) => (
          <Card key={index} user={user} />
        ))}
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
                src={loggedInUser.logo}
                alt="User"
                className="w-14 h-14 rounded-full border-2"
              />
              <div>
                <p className="font-semibold text-gray-800">{loggedInUser.name}</p>
                <p className="text-sm text-gray-600">{loggedInUser.points} Skill Points</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Skill You Offer</label>
              <div className="px-3 py-2 border rounded-md bg-gray-100 text-gray-700">
                {loggedInUser.offers.join(', ')}
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
