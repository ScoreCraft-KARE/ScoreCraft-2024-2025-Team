import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { coreMembers as coreMembersAPI } from '../../services/supabase';
import './CoreMembers.css';
import CoreTeamDetails from '../CoreTeamDetails/CoreTeamDetails';

function CoreMembers() {
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
        setError('Failed to fetch core members');
        setLoading(false);
        console.error('Error fetching core members:', err);
      }
    };

    fetchCoreMembers();
  }, []);

  return (
    <div className="core-members-page">
      
      <div className="core-members-container">
        <h1>Core Members</h1>
        <div className="core-members-content">
          <p>
            Meet the dedicated individuals who make up our core membership. These passionate members
            contribute their time and expertise to help our community thrive.
          </p>
          <p>
            We're always looking for enthusiastic new members to join our core team. If you're interested,
            please reach out through our Contact Us page.
          </p>
        </div>
        {loading ? (
          <div className="loader-container">
            <div className="spinner-loader">
              <div className="spinner-inner"></div>
            </div>
            <p>Loading core members...</p>
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
    </div>
  );
}

export default CoreMembers;
