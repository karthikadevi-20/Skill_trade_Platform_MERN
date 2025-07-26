import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
// import Card from "./components/Card"
import ChatProvider from './components/ChatProvider'
import ChatApp from './components/ChatApp'
import './assets/css/index.css'
import ChatPage from './pages/ChatPage' 
import ConnectionsPage from './pages/ConnectionsPage'
import PrivateRoute from './utils/PrivateRoute'
import ConnectionsMock from './mock/ConnectionsMock'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/chat/:chatId' element={<ChatProvider><ChatApp channelId="general"/></ChatProvider>}/>
        {/* <Route path='/connections' element={<ConnectionsPage/>}/> */}
        {/* <Route path='/mockc' element={<ConnectionsMock/>}/> */}
      </Routes>
      </BrowserRouter>
  
    </div>
  )
}

export default App