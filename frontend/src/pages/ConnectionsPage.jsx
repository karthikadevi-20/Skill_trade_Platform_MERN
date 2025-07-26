import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../api/auth";
import axios from "axios";

function ConnectionsPage() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [connections, setConnections] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

//   useEffect(() => {
//     const fetchConnections = async () => {
//       try {
//         const res = await axios.get(`/api/connections/${currentUser._id}`);
//         const connectionsData = res.data;

//         setConnections(connectionsData);

//         // Fetch other users' details
//         const userIds = connectionsData.map(conn =>
//           conn.participants.find(id => id !== currentUser._id)
//         );

//         const userDetailMap = {};
//         for (const id of userIds) {
//           const res = await getUserById(id);
//           userDetailMap[id] = res.data;
//         }

//         setUserDetails(userDetailMap);
//       } catch (error) {
//         console.error("Error fetching connections", error);
//       }
//     };

//     fetchConnections();
//   }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Your Connections</h2>
      <div className="space-y-4">
        {connections.map((conn) => {
          const otherUserId = conn.participants.find(id => id !== currentUser._id);
          const user = userDetails[otherUserId];

          return (
            <div
              key={conn._id}
              className="p-4 bg-white rounded-lg shadow hover:bg-blue-50 cursor-pointer flex items-center justify-between"
              onClick={() => navigate(`/chat/${conn._id}`)}
            >
              <div>
                <div className="font-medium text-lg">{user?.username || "Loading..."}</div>
                {/* Optionally add last message here */}
              </div>
              <span className="text-sm text-gray-400">Chat →</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ConnectionsPage;
