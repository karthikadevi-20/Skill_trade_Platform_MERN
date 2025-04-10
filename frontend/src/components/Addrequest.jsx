import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addrequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: "",
    profileImg: "",
    offeredSkill: "",
    neededSkill: "",
    points: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/", { state: { newTrade: formData } }); // send to dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Post a New Skill
        </h2>

        <input
          name="user"
          placeholder="Your Name"
          value={formData.user}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
          required
        />

        <input
          name="profileImg"
          placeholder="Profile Image URL"
          value={formData.profileImg}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
          required
        />

        <input
          name="offeredSkill"
          placeholder="Offered Skill"
          value={formData.offeredSkill}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
          required
        />

        <input
          name="neededSkill"
          placeholder="Needed Skill"
          value={formData.neededSkill}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
          required
        />

        <input
          name="points"
          type="number"
          placeholder="Skill Points"
          value={formData.points}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-800"
        >
          Add Skill
        </button>
      </form>
    </div>
  );
};

export default Addrequest;
