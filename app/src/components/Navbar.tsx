import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthProvider';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <nav className="bg-transparent p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link to="/" className="text-black text-2xl font-bold">
              todo
            </Link>
          </div>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <div>
              <Link to="/login" className="text-black">
                Login
              </Link>
              <Link to="/register" className="text-black ml-4">
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
