import React, { useState, useEffect } from 'react';
import '../ReadObjects.css';
import { Link } from "react-router-dom";

function ReadEvents() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/events', {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          setEvents(data);
        });
    };
    fetchEvents();
  }, [])

  return (
    <>
      <h1>Events</h1>
      <Link to="/create-event">
        <button>Create Event</button>
      </Link>
      <ul>
        {events.map((event) =>
          <Link to={'/update-event?id=' + event.event_id} key={event.id}>
            <li key={event.id}>
              {event.event_name}, {event.client_name}
            </li>
          </Link>
        )}
      </ul>
    </>
  );
}

export default ReadEvents;
