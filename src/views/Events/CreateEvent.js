import React, { useState, useEffect } from 'react';

function CreateEvent() {

  const [message, setMessage] = useState('');
  const [clients, setClients] = useState([]);
  const [eventName, setEventName] = useState('');
  const [selectedClientID, setSelectedClient] = useState(0);
  const [date, setDate] = useState('');

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
          setSelectedClient(data[0].id);
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const id = urlParams.get('client_id');
          if (id > 0) {
            setSelectedClient(id);
          }
        });
    };
    fetchClients();
  }, [])

  function handleEventNameChange(event) {
    setEventName(event.target.value);
  }

  function handleClientSelectionChange(event) {
    setSelectedClient(event.target.value);
  }

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let requestBody = {
      "name": eventName,
      "client_id": selectedClientID
    }
    fetch(process.env.REACT_APP_API_ORIGIN + '/event', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody, null, 2)
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.name + ' created.');
      })
  }

  return (
    <>
      <h1>Create Event</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Event Name
          <input name="name" type="text" value={eventName} onChange={handleEventNameChange}></input>
        </label>

        <label htmlFor="date">
          Event Date
          <input name="date" type="date" value={date} onChange={handleDateChange}></input>
        </label>

        <label htmlFor="client">Client Name</label>
        <select value={selectedClientID} onChange={handleClientSelectionChange}>
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
