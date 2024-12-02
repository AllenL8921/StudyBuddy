import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/StudyTogetherIcon.png';
import { UserButton, useAuth } from '@clerk/clerk-react';

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false); // To handle navbar style change on scroll

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`bg-gray-800 p-4 z-50 fixed w-full shadow-md transition-all ${scrolling ? 'bg-gray-900' : ''
        }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and brand */}
        <div className="flex items-center">
          <img src={Logo} alt="StudyTogether Logo" className="h-8 mr-2" />
          <Link to="/" className="text-white text-lg font-bold">Study Buddy</Link>
        </div>

        {/* Hamburger icon (only visible on mobile) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop navigation links (hidden on mobile) */}
        <div className="hidden md:flex space-x-4">
          <Link to="/sessions" className="text-white">Study Sessions</Link>
          <Link to="/aboutus" className="text-white">About Us</Link>

          {!isSignedIn ? (
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-white">Dashboard</Link>
              <UserButton />
            </>
          )}
        </div>
      </div>

      {/* Mobile menu (visible when hamburger is clicked, hidden on desktop) */}
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-700 p-4 rounded-b-lg`}
      >
        <Link to="/sessions" className="block text-white py-2">Study Sessions</Link>
        <Link to="/aboutus" className="block text-white py-2">About Us</Link>

        {!isSignedIn ? (
          <>
            <Link to="/login" className="block text-white py-2">Login</Link>
            <Link to="/register" className="block text-white py-2">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="block text-white py-2">Dashboard</Link>
            <UserButton />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
