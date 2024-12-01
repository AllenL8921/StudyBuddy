import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from '@clerk/clerk-react';

// Component Imports
import Footer from './components/Footer';
import Navbar from './components/Navbar';
// Pages Imports
import Home from "./pages/HomePage";
import DashBoard from './pages/Dashboard';
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import StudySessionList from './pages/StudySessionList';
import EventPage from './pages/EventPage';
import AboutUsPage from './pages/AboutUsPage';
import ChatList from './pages/ChatList';
import StudyRoom from './pages/StudyRoom';
import FriendList from './pages/FriendList';

// ProtectedRoute
// Any route that is protected REQUIRES you to be signed in and can't be accessed without being signed in
const ProtectedRoute = ({ element }) => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? element : <Navigate to="/login" />;
};

// Events are where 
// StudySession are existing chat rooms

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect to home on root */}
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sessions" element={<StudySessionList />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/friends" element={<FriendList />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/studyroom" element={<StudyRoom />} />
        <Route path="/chat" element={<ProtectedRoute element={<ChatList />} />} /> {/* Protect this route */}
        <Route path="/dashboard" element={<ProtectedRoute element={<DashBoard />} />} /> {/* Protect this route */}
      </Routes>
    </>
  );
}

export default App;
