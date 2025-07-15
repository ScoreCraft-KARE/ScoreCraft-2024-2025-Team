import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Events from './components/Events/Events';
import CoreTeam from './components/CoreTeam/CoreTeam';
import ContactUs from './components/ContactUs/ContactUs';
import Admin from './components/Admin/Admin';
import UpcomingEvents from './components/UpcomingEvents/UpcomingEvents';
import CoreMembers from './components/CoreMembers/CoreMembers';
import Mentors from './components/Mentors/Mentors';
import Test from './components/Test/Test';
import Cookies from 'js-cookie';
import Header from './components/Header/Header';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('jwt'));

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Test route - always accessible */}
        <Route path="/test" element={<Test />} />
        
        {isLoggedIn ? (
          // Routes accessible only when admin is logged in
          <>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events isLoggedIn={isLoggedIn} />} />
            <Route path="/upcoming-events" element={<UpcomingEvents isLoggedIn={isLoggedIn} />} />
            <Route path="/core-team" element={<CoreTeam />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          // Routes accessible when admin is not logged in
          <>
            <Route path="/" element={<Home />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/core-team" element={<CoreTeam />} />
            <Route path="/core-members" element={<CoreMembers />} />
            <Route path="/events" element={<Events isLoggedIn={isLoggedIn} />} />
            <Route path="/upcoming-events" element={<UpcomingEvents isLoggedIn={isLoggedIn} />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/admin-login" element={<Admin setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
