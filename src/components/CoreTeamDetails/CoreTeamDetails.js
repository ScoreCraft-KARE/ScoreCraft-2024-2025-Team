import React, { useState } from 'react';
import './CoreTeamDetails.css';

const CoreTeamDetails = ({ member }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!member) {
    return <div className="no-member">No member data available</div>;
  }

  const openLinkedIn = () => {
    if (member.linkedin) {
      window.open(member.linkedin, '_blank');
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`mentor-card ${isExpanded ? 'expanded' : ''}`} onClick={openLinkedIn}>
      <div className="mentor-image-container">
        <img src={member.image} alt={member.name} className="mentor-image" />
      </div>
      <div className="mentor-info">
        <h3 className="mentor-name">{member.name}</h3>
        <p className="mentor-position">{member.role}</p>
        <p className="mentor-description">
          {isExpanded ? member.description : `${member.description.substring(0, 100)}...`}
        </p>
        {member.description.length > 100 && (
          <button className="read-more" onClick={(e) => { e.stopPropagation(); toggleExpand(); }}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
      <div href={member.linkedin} className="linkedin-overlay">View LinkedIn</div>
    </div>
  );
};

export default CoreTeamDetails;
