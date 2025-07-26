import axios from 'axios';

// const API=axios.create({ baseURL: import.meta.env.VITE_API||"http://localhost:7777"});

    const API=import.meta.env.VITE_API||"http://localhost:7777"
    axios.interceptors.request.use((req)=>{
        const token = localStorage.getItem("token");
        if(token) req.headers.Authorization=`Bearer ${token}`
        return req;
    })

const getUserById=(userId)=>{ return axios.get(`${API}/User/user/${userId}`);}
const registerUser=(userData)=>axios.post(`${API}/auth/register`,userData);
const loginUser=(credentials) => axios.post(`${API}/auth/login`,credentials);
const logoutUser=()=>{localStorage.removeItem('token');localStorage.removeItem('user')}
const editUser=(userId,updatedData)=>{ return axios.put(`${API}/User/edit/${userId}`,updatedData)};
const getRequests=()=>{return axios.get(`${API}/requests/all`)}
const addRequests=(reqData)=>axios.post(`${API}/requests/add`,reqData);
const editRequest=(reqId)=>axios.put(`${API}/requests/edit/${reqId}`);
const deleteRequest=(reqId)=>axios.delete(`${API}/requests/delete/${reqId}`);
const getUserRequests=(userId)=>{return axios.get(`${API}/requests/request/${userId}`);}
const connectUsers=(user1,user2)=>{return axios.post(`${API}/connect`,{user1:user1,user2:user2})}
const createChat = async (participants, user1, user2) => {
    try {
      const res = await axios.post("http://localhost:7777/chat", {
        participants,
        user1,
        user2
      });
      return res.data; // ✅ Only return the actual data
    } catch (err) {
      console.error("Error creating chat:", err);
      return null; // Handle error in frontend
    }
  };
  const getChatById = async (chatId) => {
    return await axios.get(`http://localhost:7777/chat/${chatId}`);
  };

export{registerUser,getChatById,loginUser,logoutUser,editUser,getRequests,addRequests,getUserRequests,getUserById,deleteRequest,editRequest,connectUsers,createChat}