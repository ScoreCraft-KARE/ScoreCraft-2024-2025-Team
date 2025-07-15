import React from 'react';
import './DeveloperCard.css';

const DeveloperCard = ({ name, role, image, github, linkedin, email, delay }) => {
  return (
    <div 
      className="developer-card"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="developer-image-container">
        <img src={image} alt={name} className="developer-image" />
      </div>
      <div className="developer-info">
        <h3 className="developer-name">{name}</h3>
        <p className="developer-role">{role}</p>
        <div className="developer-links">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-github"></i>
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="social-link">
              <i className="fas fa-envelope"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
