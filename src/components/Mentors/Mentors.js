import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { mentors as mentorsAPI } from '../../services/supabase';
import './Mentors.css';
import CoreTeamDetails from '../CoreTeamDetails/CoreTeamDetails';

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const data = await mentorsAPI.getAll();
        setMentors(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch mentors');
        setLoading(false);
        console.error('Error fetching mentors:', err);
      }
    };

    fetchMentors();
  }, []);

  return (
    <>
    
      <div className="mentors-page">
        <div className="mentors-container">
          <h1>Our Mentors</h1>
          <div className="mentors-content">
            <p>
              Meet the mentors who guide and support our community. Their expertise and dedication
              help us achieve our goals.
            </p>
          </div>
          {loading ? (
            <div className="loader-container">
              <div className="spinner-loader">
                <div className="spinner-inner"></div>
              </div>
              <p>Loading mentors...</p>
            </div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <ul className="team-list">
              {mentors.map((mentor) => (
                <li key={mentor.id} className="team-list-item">
                  <CoreTeamDetails member={mentor} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Mentors;
