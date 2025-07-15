import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { coreMembers as coreMembersAPI } from '../../services/supabase';
import './CoreTeam.css';
import CoreTeamDetails from '../CoreTeamDetails/CoreTeamDetails';

const CoreTeam = () => {
  const [coreMembers, setCoreMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoreMembers = async () => {
      try {
        setLoading(true);
        const data = await coreMembersAPI.getAll();
        setCoreMembers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch core team members');
        setLoading(false);
        console.error('Error fetching core team members:', err);
      }
    };

    fetchCoreMembers();
  }, []);

  return (
    <>
      
      <section className="core-team-section">
        <div className="container">
          <h2 className="section-title">Our Core Team</h2>
          
          {loading ? (
            <div className="loader-container">
              <div className="spinner-loader">
                <div className="spinner-inner"></div>
              </div>
              <p>Loading amazing team members...</p>
            </div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <ul className="team-list">
              {coreMembers.map((member) => (
                <li key={member.id} className="team-list-item">
                  <CoreTeamDetails member={member} />
                </li>
              ))}
            </ul>
          )}
         
        </div>
      
        <div className="core-team-footer">
          <div className="core-team-footer-image-container">
            <h1 className="core-team-footer-title">Our Core Team</h1>
          </div>
            <img src="https://res.cloudinary.com/dbroxheos/image/upload/v1743078053/WhatsApp_Image_2025-03-25_at_22.32.00_aa704a3a_t6hbcy.jpg" alt="Core Team Footer" className="core-team-footer-image" />
          </div>
      </section>
    </>
  );
};

export default CoreTeam;
