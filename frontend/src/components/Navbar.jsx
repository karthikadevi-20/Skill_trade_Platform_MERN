import { Link } from 'react-router-dom';

  const Navbar=()=>{
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">SkillTrade</Link>
        <div className="space-x-4">
          <Link to="/skills" className="hover:underline">Skills</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md">Login</Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;