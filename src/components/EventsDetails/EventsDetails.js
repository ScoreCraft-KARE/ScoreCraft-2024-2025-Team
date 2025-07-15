import React, { useState, useEffect } from 'react';
import './EventDetails.css';

const EventsDetails = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const eventDateTime = new Date(event.date);
      const nextDay = new Date(eventDateTime);
      nextDay.setDate(eventDateTime.getDate() + 1);

      if (now >= nextDay) {
        setStatus('completed');
      } else if (now >= eventDateTime && now < nextDay) {
        setStatus('live');
      } else {
        setStatus('upcoming');
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [event.date]);

  const calculateTimeRemaining = () => {
    const now = new Date();
    const eventDateTime = new Date(event.date);
    const timeDiff = eventDateTime - now;

    if (timeDiff < 0) {
      return 'Event Completed';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m remaining`;
  };

  if (!event) {
    return <div className="no-event">No event data available</div>;
  }

  return (
    <div className={`event-card ${status}`}>
      <div className="event-card-container">
        <div className="event-image-container">
          <img src={event.image} alt={event.heading} className="event-image" />
          <div className="time-remaining">
            {status === 'live' ? (
              <span className="live-indicator">● Live</span>
            ) : (
               calculateTimeRemaining() === 'Event Completed' ? (
                <span className="time-remaining-text">Event Completed</span>
              ) : (
                <span className="remaining-time">{calculateTimeRemaining()}</span>
              )
            )}
          </div>
        </div>
        {/* <h3 className="event-heading">{event.heading}</h3>
        <div className="event-description">
          {isExpanded ? event.description : `${event.description.substring(0, 100)}...`}
        </div>
        {event.description.length > 100 && (
          <span onClick={() => setIsExpanded(!isExpanded)} className="read-more-text">
            {isExpanded ? 'Read Less' : 'Read More'}
          </span>
        )} */}
      </div>
    </div>
  );
};

export default EventsDetails;
