import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from '@clerk/clerk-react';

// Component Imports

// Pages Imports
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import DashBoard from './pages/Dashboard';
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AboutUs from './components/AboutUs';
import StudySession from './pages/StudySession';
import EventList from './pages/EventList';

const ProtectedRoute = ({ element }) => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? element : <Navigate to="/login" />;
};

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect to home on root */}
        <Route path="/home" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/StudySession" element={<StudySession />} />
        <Route path="/EventList" element={<EventList />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} /> {/* Protect this route */}
        <Route path="/dashboard" element={<ProtectedRoute element={<DashBoard />} />} /> {/* Protect this route */}
        <Route path="*" element={<Navigate to="/home" />} /> {/* Redirect to home on 404 */}
      </Routes>
    </>
  );
}

export default App;