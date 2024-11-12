import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from '@clerk/clerk-react';

// Component Imports
import Footer from './components/Footer';
import Navbar from './components/Navbar';
// Pages Imports
import Home from "./pages/HomePage";
import Chat from "./pages/Chat";
import DashBoard from './pages/Dashboard';
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import StudySession from './pages/StudySession';
import EventList from './pages/EventList';
import AboutUsPage from './pages/AboutUsPage';

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
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect to home on root */}
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sessions" element={<StudySession />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} /> {/* Protect this route */}
        <Route path="/dashboard" element={<ProtectedRoute element={<DashBoard />} />} /> {/* Protect this route */}
      </Routes>
    </>
  );
}

export default App;
