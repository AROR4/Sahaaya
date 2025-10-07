import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const NavbarAuthSection = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate('/');
  };

  return (
    <div className="hidden md:flex items-center space-x-4">
      {!user ? (
        <Link
          to="/login"
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <User className="w-4 h-4" />
          <span>Sign In</span>
        </Link>
      ) : (
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <img
              src={user.picture}
              alt="profile"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">{user.email}</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md z-10">
              <Link
                to="/profile"
                onClick={() => setShowMenu(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Profile
              </Link>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setShowMenu(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarAuthSection;
