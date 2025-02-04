import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage  from './pages/LandingPage';
import  Login  from './pages/Login';
import Signup  from './pages/Signup';
import Dashboard  from './pages/Dashboard';
import  Profile from './pages/Profile';
import SkillListing  from './pages/SkillListing';
import  Navbar  from './components/Navbar';
import './assets/css/index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skills" element={<SkillListing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
