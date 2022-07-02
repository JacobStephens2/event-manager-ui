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
      <table>
        <th>
          Client
        </th>
        <th>
          Name
        </th>
        <th>
          Date
        </th>
        {events.map((event) =>
          <tr>
            <td>
              <Link to={'/update-client?id=' + event.client_id} key={event.id}>
                {event.client_name}
              </Link>
            </td>
            <td>
              <Link to={'/update-event?id=' + event.event_id + '&client_id=' + event.client_id} key={event.id}>
                {event.event_name}
              </Link>
            </td>
            <td>
              {event.event_date}
            </td>
          </tr>
        )}
      </table>
    </>
  );
}

export default ReadEvents;
