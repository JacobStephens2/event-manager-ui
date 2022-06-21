import React, { useState, useEffect } from 'react';
import './Account.css';

function Account() {

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
      <h1>Account</h1>
      <h2>Events</h2>
      <ul>
        {events.map((event) =>
          <li key={event.id}>
            {event.name}
          </li>
        )}
      </ul>
    </>
  );
}

export default Account;
