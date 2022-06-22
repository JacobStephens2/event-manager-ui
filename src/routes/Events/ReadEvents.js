import React, { useState, useEffect } from 'react';
import './ReadEvents.css';
import { Link } from "react-router-dom";

function ReadEvents() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/all-events', {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setEvents(data);
        });
    };
    fetchEvents();
  }, [])


  return (
    <>
      <h1>Events</h1>
      <ul>
        {events.map((event) =>
          <Link to={'/update-event?id=' + event.id} key={event.id}>
            <li key={event.id}>
              {event.name}
            </li>
          </Link>
        )}
      </ul>
    </>
  );
}

export default ReadEvents;
