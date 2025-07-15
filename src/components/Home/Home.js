import React from 'react';
import Headers from '../Header/Header';
import './Home.css';

function Home() {
  return (
   <>
  
   <div className="home">
      <div className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to ScoreCraft</h1>
            <p>ScoreCraft is your gateway to the world of music and technology. Join us as we explore the latest in musical innovation and creativity. Our chapter is dedicated to fostering a community of passionate individuals who are eager to learn and grow. Whether you're a musician, a tech enthusiast, or just curious, there's a place for you here. Dive into our events, meet our core team, and become a part of something extraordinary.</p>
            <button href="/events">Events</button>
          </div>
          <div className="hero-image">
            <img src="https://res.cloudinary.com/dbroxheos/image/upload/v1741861300/DALL_E_2025-03-13_15.49.04_-_A_modern_sleek_logo_for_GATE_Preparation_._The_design_should_be_professional_and_academic_incorporating_elements_like_a_graduation_cap_books_or_a_wb2rzb.webp" alt="AI Generated" />
          </div>
        </div>
      </div>
    </div>
   </>
  );
}

export default Home;
