import React from 'react';
import Header from '../Header/Header';
import './ContactUs.css';

function ContactUs() {
  return (
    <div className="contact-us-page">
  
      <div className="contact-us-container">
        <h1>Contact Us</h1>
        <div className="contact-us-content">
          <p>
            We'd love to hear from you! Whether you have questions, suggestions, or want to collaborate,
            feel free to reach out to us.
          </p>
          <p>
            Email: scorecraft@klu.ac.in<br />
          </p>
          <form className="contact-us-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
          <div className="contact-us-social">
            <p>Connect with us:</p>
            <ul>
              <li><a href="https://www.linkedin.com/in/scorecraftkare/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://x.com/scorecraftKARE" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="mailto:scorecraft@klu.ac.in" target="_blank" rel="noopener noreferrer">Gmail</a></li>
              <li><a href="https://www.instagram.com/scorecraftkare/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
