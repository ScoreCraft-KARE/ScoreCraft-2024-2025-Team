import React, { useState } from 'react';
import Header from '../Header/Header';
import { auth } from '../../services/supabase';
import Cookies from 'js-cookie';
import './Admin.css';

function Admin({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await auth.login(username, password);
      setMessage(response.message);
      Cookies.set('jwt', response.token);
      localStorage.setItem('authToken', response.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.message || 'An error occurred');
    }
  };

  return (
    <>
     
      <div className="admin-page">
        <div className="admin-container">
          <h1>Admin Login</h1>
          <div className="admin-content">
            <form className="admin-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="login-button">Login</button>
              {message && <p className="login-message">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin; 