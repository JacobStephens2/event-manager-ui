import React, { useState, useEffect } from 'react';

function CreateTask() {

  const [message, setMessage] = useState('');
  const [taskDescription, setTaskDescription] = useState([]);
  const [taskDueDate, setTaskDueDate] = useState([]);

  const [events, setEvents] = useState([]);
  const [selectedEventID, setSelectedEventID] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/events', {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(events => {
          console.log(events);
          setEvents(events);
          setSelectedEventID(events[0].event_id);
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const id = urlParams.get('client_id');
          if (id > 0) {
            setSelectedEventID(id);
          }
        });
    };
    fetchEvents();
  }, [])

  function handleSubmit(event) {
    event.preventDefault();
    let requestBody = {
      "description": taskDescription,
      "due_date": taskDueDate,
      "event_id": selectedEventID
    }
    fetch(process.env.REACT_APP_API_ORIGIN + '/task', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody, null, 2)
    })
      .then(response => response.json())
      .then(task => {
        setMessage(task.description + ' created.');
      })
  }

  function handleTaskDescriptionChange(event) {
    setTaskDescription(event.target.value);
  }
  function handleDueDateChange(event) {
    setTaskDueDate(event.target.value);
  }
  function handleEventSelectionChange(event) {
    setSelectedEventID(event.target.value);
  }

  return (
    <>
      <h1>Create Task</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Task Description
          <input name="name" type="text" value={taskDescription} onChange={handleTaskDescriptionChange}></input>
        </label>

        <label htmlFor="date">
          Task Due Date
          <input name="date" type="date" value={taskDueDate} onChange={handleDueDateChange}></input>
        </label>

        <label htmlFor="event">Event Name</label>
        <select value={selectedEventID} onChange={handleEventSelectionChange}>
          {events.map((event) =>
            <option key={event.event_id} value={event.event_id}>
              {event.event_name} ({event.client_name})
            </option>
          )}
        </select>

        <input type="submit" value="Create" />
      </form>

      <p>{message}</p>

    </>
  );
}

export default CreateTask;
