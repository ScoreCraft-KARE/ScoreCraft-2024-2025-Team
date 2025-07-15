import React, { useState, useEffect } from 'react';
import { events as eventsAPI } from '../../services/supabase';
import './Events.css';
import EventsDetails from '../EventsDetails/EventsDetails';
import EventModal from '../Modal/EventModal';

function Events({ isLoggedIn }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);

  // Fetch events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsAPI.getAll();
      setEvents(data.sort((a, b) => b.created_at.localeCompare(a.created_at)));
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events');
      setLoading(false);
      console.error('Error fetching events:', err);
    }
  };

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
        await eventsAPI.admin.delete(eventId);
        fetchEvents(); // Refresh the list
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
        await eventsAPI.admin.update(selectedEvent.id, event);
      } else {
        await eventsAPI.admin.create(event);
      }
      setIsModalOpen(false);
      fetchEvents(); // Refresh the list
    } catch (err) {
      console.error('Error saving event:', err);
      alert('Failed to save event');
    }
  };

  return (
    <div className="events-page">
      <div className="events-container">
        <h1>Events</h1>
        {isLoggedIn && (
          <div className="admin-controls">
            <button onClick={handleAddEvent} className="add-event-button">
              Add New Event
            </button>
          </div>
        )}
        <div className="events-content">
          {loading ? (
            <div className="loader-container">
              <div className="spinner-loader">
                <div className="spinner-inner"></div>
              </div>
              <p>Loading events...</p>
            </div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : events.length === 0 ? (
            <p className="no-events">No events to display.</p>
          ) : (
            <div className="events-grid">
              {events.map((event) => (
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

export default Events;