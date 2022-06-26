import React, { useState, useEffect } from 'react';

function CreateEvent() {

  const [message, setMessage] = useState('');
  const [clients, setClients] = useState([]);
  const [eventName, setEventName] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/clients', {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setClients(data);
        });
    };
    fetchClients();
  }, [])

  function handleEventNameChange(event) {
    setEventName(event.target.value);
  }

  function handleSubmit(event) {
    alert('Event ' + eventName + ' was created');
    event.preventDefault();
    // fetch(process.env.REACT_APP_API_ORIGIN + '/event', {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify('hello', null, 2)
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     setMessage(data.name + ' created.');
    //   })
  }

  return (
    <>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Event Name
          <input name="name" type="text" value={eventName} onChange={handleEventNameChange}></input>
        </label>

        <label htmlFor="client">Client Name</label>
        <select>
          {clients.map((client) =>
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          )}
        </select>

        <input type="submit" value="Create" />
      </form>


      <p>{message}</p>

    </>
  );
}

export default CreateEvent;
