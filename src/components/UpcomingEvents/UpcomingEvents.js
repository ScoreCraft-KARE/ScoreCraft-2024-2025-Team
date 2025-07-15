import React, { useState, useEffect } from 'react';
import { upcomingEvents as upcomingEventsAPI } from '../../services/supabase';
import './UpcomingEvents.css';
import EventsDetails from '../EventsDetails/EventsDetails';
import EventModal from '../Modal/EventModal';

function UpcomingEvents({ isLoggedIn }) {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);

  // Fetch upcoming events
  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      const data = await upcomingEventsAPI.getAll();
      setUpcomingEvents(data.sort((a, b) => a.date.localeCompare(b.date)));
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch upcoming events');
      setLoading(false);
      console.error('Error fetching upcoming events:', err);
    }
  };

  // Check for completed events periodically - admin only
  useEffect(() => {
    if (!isLoggedIn) return;

    const moveCompletedEvents = async () => {
      try {
        await upcomingEventsAPI.moveCompletedEvents();
        await fetchUpcomingEvents();
      } catch (err) {
        console.error('Error moving completed events:', err);
      }
    };

    moveCompletedEvents(); // Run immediately
    const interval = setInterval(moveCompletedEvents, 24 * 60 * 60 * 1000); // Check daily

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // Admin functions - only available when logged in
  const handleAddEvent = () => {
    if (!isLoggedIn) return;
    setSelectedEvent(null);
    setIsEditing(false);
    setEditedEvent({
      title: '',
      description: '',
      date: '',
      image_url: ''
    });
    setIsModalOpen(true);
  };

  const handleEditEvent = (event) => {
    if (!isLoggedIn) return;
    setSelectedEvent(event);
    setIsEditing(true);
    setEditedEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (eventId) => {
    if (!isLoggedIn) return;
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await upcomingEventsAPI.admin.delete(eventId);
        fetchUpcomingEvents(); // Refresh the list
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('Failed to delete event');
      }
    }
  };

  const handleSaveEvent = async (event) => {
    if (!isLoggedIn) return;
    try {
      if (isEditing) {
        await upcomingEventsAPI.admin.update(selectedEvent.id, event);
      } else {
        await upcomingEventsAPI.admin.create(event);
      }
      setIsModalOpen(false);
      fetchUpcomingEvents(); // Refresh the list
    } catch (err) {
      console.error('Error saving event:', err);
      alert('Failed to save event');
    }
  };

  return (
    <div className="upcoming-events-page">
      <div className="upcoming-events-container">
        <h1>Upcoming Events</h1>
        {isLoggedIn && (
          <div className="admin-controls">
            <button onClick={handleAddEvent} className="add-event-button">
              Add New Event
            </button>
          </div>
        )}
        <div className="upcoming-events-content">
          {loading ? (
            <div className="loader-container">
              <div className="spinner-loader">
                <div className="spinner-inner"></div>
              </div>
              <p>Loading upcoming events...</p>
            </div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : upcomingEvents.length === 0 ? (
            <p className="no-events">No upcoming events to display.</p>
          ) : (
            <div className="events-grid">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <EventsDetails event={event} />
                  {isLoggedIn && (
                    <div className="admin-actions">
                      <button onClick={() => handleEditEvent(event)}>Edit</button>
                      <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <EventModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
          initialData={editedEvent}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

export default UpcomingEvents;