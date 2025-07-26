// ConnectionsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { mockConnections } from "./mockConnections";

function ConnectionsMock() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Connections</h2>
      {mockConnections.map((conn) => (
        <div
          key={conn._id}
          onClick={() => navigate(`/chat/${conn._id}`)}
          className="bg-white shadow p-4 rounded-lg mb-3 flex items-center gap-4 cursor-pointer hover:bg-blue-50"
        >
          <img
            src={conn.otherUser.profileUrl}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{conn.otherUser.username}</p>
            <p className="text-sm text-gray-500">Click to open chat</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConnectionsMock;
