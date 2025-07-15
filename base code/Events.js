import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './Events.css';
import EventsDetails from '../EventsDetails/EventsDetails';
import Modal from '../Modal/Modal';

function Events({ isLoggedIn }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/events`);
        const sortedEvents = response.data.sort((a, b) => {
          // Sort by ID in ascending order
          return a.id - b.id;
        });
        setEvents(sortedEvents);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events');
        setLoading(false);
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const moveTodaysEvents = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/move-todays-events`);
        // Refresh the list of events
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/events`);
        const sortedEvents = response.data.sort((a, b) => a.id - b.id); // Keep the sorting consistent
        setEvents(sortedEvents);
      } catch (err) {
        console.error('Error moving today\'s events:', err);
      }
    };

    const interval = setInterval(moveTodaysEvents, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const openModal = (id) => {
    setSelectedEventId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEventId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/events/${selectedEventId}`);
      setEvents(events.filter(event => event.id !== selectedEventId));
      closeModal();
    } catch (err) {
      console.error('Error deleting event:', err);
      setError('Failed to delete event');
    }
  };

  return (
    <div className="events-page">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this event?"
      />
      <div className="events-container">
        <h1>Events</h1>
        <div className="events-content">
          <p>
            Explore our exciting events designed to inspire and educate. From workshops to competitions,
            there's something for everyone.
          </p>
          <p>
            Stay tuned for our upcoming events and join us in celebrating music, technology, and creativity.
          </p>
        </div>
        {loading ? (
          <div className="loader-container">
            <div className="spinner-loader">
              <div className="spinner-inner"></div>
            </div>
            <p>Loading events...</p>
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <ul className="events-list">
            {events.map((event) => (
              <li key={event.id} className="events-list-item">
                <EventsDetails event={event} />
                {isLoggedIn && (
                  <button onClick={() => openModal(event.id)} className="delete-button">
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Events;