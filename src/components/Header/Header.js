import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Header.css';

function Header({ isLoggedIn, setIsLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path, event) => {
    event.preventDefault();
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove('jwt'); // Remove JWT from cookies
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && hamburgerRef.current) {
      if (!menuRef.current.contains(event.target) && 
          !hamburgerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img 
          src="https://res.cloudinary.com/dbroxheos/image/upload/v1741862069/Screenshot_2025-03-13_160404_lntlya.png" 
          alt="ScoreCraft Logo" 
          className="logo-img" 
        />
      </div>
      <div 
        ref={hamburgerRef}
        className={`hamburger-menu ${menuOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav 
        ref={menuRef}
        className={`nav-menu ${menuOpen ? 'open' : ''}`}
      >
        {isLoggedIn ? (
          <>
            <a 
              href="/events" 
              onClick={(e) => handleNavigation('/events', e)}
              className={location.pathname === '/events' ? 'active' : ''}
            >
              Events
            </a>
            <a 
              href="/upcoming-events" 
              onClick={(e) => handleNavigation('/upcoming-events', e)}
              className={location.pathname === '/upcoming-events' ? 'active' : ''}
            >
              Upcoming Events
            </a>
            <a 
              href="/core-team" 
              onClick={(e) => handleNavigation('/core-team', e)}
              className={location.pathname === '/core-team' ? 'active' : ''}
            >
              Core Team
            </a>
            <a 
              href="/mentors" 
              onClick={(e) => handleNavigation('/mentors', e)}
              className={location.pathname === '/mentors' ? 'active' : ''}
            >
              Mentors
            </a>
          </>
        ) : (
          <>
            <a 
              href="/" 
              onClick={(e) => handleNavigation('/', e)}
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </a>
            <a 
              href="/mentors" 
              onClick={(e) => handleNavigation('/mentors', e)}
              className={location.pathname === '/mentors' ? 'active' : ''}
            >
              Mentors
            </a>
            <a 
              href="/core-team" 
              onClick={(e) => handleNavigation('/core-team', e)}
              className={location.pathname === '/core-team' ? 'active' : ''}
            >
              Core Team
            </a>
            {/* <a 
              href="/core-members" 
              onClick={(e) => handleNavigation('/core-members', e)}
              className={location.pathname === '/core-members' ? 'active' : ''}
            >
              Core Members
            </a> */}
            <a 
              href="/events" 
              onClick={(e) => handleNavigation('/events', e)}
              className={location.pathname === '/events' ? 'active' : ''}
            >
              Events
            </a>
            <a 
              href="/upcoming-events" 
              onClick={(e) => handleNavigation('/upcoming-events', e)}
              className={location.pathname === '/upcoming-events' ? 'active' : ''}
            >
              Upcoming Events
            </a>
            <a 
              href="/contact-us" 
              onClick={(e) => handleNavigation('/contact-us', e)}
              className={location.pathname === '/contact-us' ? 'active' : ''}
            >
              Contact Us
            </a>
          </>
        )}
      </nav>
      
      {isLoggedIn ? (
        <button className="admin-button" onClick={handleLogout}>Logout</button>
      ) : (
        <a href="/admin-login" className="admin-button" onClick={(e) => handleNavigation('/admin-login', e)}>Admin Login</a>
      )}
    </header>
  );
}

export default Header;