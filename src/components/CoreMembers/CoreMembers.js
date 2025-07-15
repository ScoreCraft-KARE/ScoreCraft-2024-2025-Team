import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { teamMembers as teamMembersAPI } from '../../services/supabase';
import './CoreMembers.css';
import CoreTeamDetails from '../CoreTeamDetails/CoreTeamDetails';

function CoreMembers() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const data = await teamMembersAPI.getAll();
        setTeamMembers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch team members');
        setLoading(false);
        console.error('Error fetching team members:', err);
      }
    };

    fetchTeamMembers();
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
            <p>Loading team members...</p>
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <ul className="team-list">
            {teamMembers.map((member) => (
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
