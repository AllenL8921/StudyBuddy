import React from 'react';
import { FaHome, FaUserFriends, FaCalendarAlt, FaComments, FaSpinner } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const navigation = [
  { name: "StudyTogether", href: "/home", icon: <FaHome /> },
  { name: "Study Session", href: "/sessions", icon: <FaUserFriends /> },
  { name: "Event", href: "/events", icon: <FaCalendarAlt /> },
  { name: "Friends", href: "/friends", icon: <FaUserFriends /> },
  { name: "Chat", href: "/chat", icon: <FaComments /> },
];

//POSITION OF THE SIDEBAR
// fixed top-10 left-0 z-40 w-60
// fixed : always on top
// top : margin top by 10 units
// left : 0px from the left side of the screen
// z: 40 z-index
// w: 15rem width

export default function Sidebar() {
  const location = useLocation();
  const { user, isLoaded, isSignedIn } = useUser();

  // Show loading message while the user data is being fetched
  if (!isLoaded) {
    return (
      <div className="fixed top-10 left-0 z-40 w-60 h-screen bg-gray-900 text-white shadow-lg flex justify-center items-center">
        <FaSpinner className="animate-spin text-white text-4xl" />
      </div>
    );
  }

  return (
    <aside className="fixed top-10 left-0 z-40 w-60 h-screen bg-gray-900 text-white shadow-lg">
      {/* User info and sign-in state check */}
      {isSignedIn && user ? (
        <div className="lg:flex sm:flex flex-col items-center pt-10 gap-4">
          {/* User Image from the user object */}
          <div className="flex justify-center items-center">
            <img
              src={user.imageUrl}
              alt={user.firstName}
              className="rounded-full w-20 h-20 object-cover" // Customize the size here (80px, 100px, etc.)
            />
          </div>

          {/* User Info 
            - Display userId
            - Attributes (?)
          */}
          <div className="text-center mt-4">
            <p className="text-white text-sm">{user.emailAddresses[0]?.emailAddress}</p>
          </div>
        </div>
      ) : (
        <div className="lg:flex sm:flex flex-col items-center pt-10 gap-4">
          {/* Placeholder text when user is not signed in */}
          <div className="text-white text-center">Welcome, Guest</div>
        </div>
      )}

      {/* Navigation Links */}
      <ul className="mt-8 space-y-2">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link
              to={item.href}
              className={`flex items-center p-6 rounded-lg transition-colors duration-200  
                ${location.pathname === item.href ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}
            >
              <span className="mr-2">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
