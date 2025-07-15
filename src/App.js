import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Events from './components/Events/Events';
import CoreTeam from './components/CoreTeam/CoreTeam';
import ContactUs from './components/ContactUs/ContactUs';
import AdminLogin from './components/Admin/AdminLogin';
import UpcomingEvents from './components/UpcomingEvents/UpcomingEvents';
import CoreMembers from './components/CoreMembers/CoreMembers';
import Mentors from './components/Mentors/Mentors';
import Test from './components/Test/Test';
import Cookies from 'js-cookie';
import Header from './components/Header/Header';
import { adminAuth } from './services/supabase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await adminAuth.verifyToken();
      setIsLoggedIn(isValid);
      setChecking(false);
    };
    checkAuth();
  }, []);

  // Protect routes that require admin access
  const ProtectedRoute = ({ children }) => {
    if (checking) {
      return <div>Loading...</div>;
    }
    if (!isLoggedIn) {
      return <Navigate to="/admin-login" replace />;
    }
    return children;
  };

  if (checking) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/core-team" element={<CoreTeam />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/core-members" element={<CoreMembers />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/admin-login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
        
        {/* Event routes - accessible to all but with admin features if logged in */}
        <Route path="/events" element={<Events isLoggedIn={isLoggedIn} />} />
        <Route path="/upcoming-events" element={<UpcomingEvents isLoggedIn={isLoggedIn} />} />
        
        {/* Admin-only routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <div>Admin Dashboard</div>
            </ProtectedRoute>
          } 
        />
        
        {/* Test route */}
        <Route path="/test" element={<Test />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
