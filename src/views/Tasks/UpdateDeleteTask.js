import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function UpdateTask() {

  const [message, setMessage] = useState([]);
  const [taskDescription, setTaskDescription] = useState([]);
  const [taskDueDate, setTaskDueDate] = useState([]);
  const [taskID, setTaskID] = useState([]);
  const [taskStatus, setTaskStatus] = useState('To Do');

  const [events, setEvents] = useState([]);
  const [presetEvent, setPresetEvent] = useState([]);
  const [selectedEventID, setSelectedEventID] = useState('');

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const urlParamEventID = urlParams.get('event_id');

  useEffect(() => {
    // Get task
    const fetchTask = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/task/' + id, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(task => {
          console.log(task);
          setTaskDescription(task.description);
          setTaskDueDate(task.due_date);
          setTaskStatus(task.status);
          setSelectedEventID(task.event_id);
          setTaskID(task.id);
        });
    };
    fetchTask();

    const fetchEvent = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/event/' + urlParamEventID, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(event => {
          console.log(event);
          setPresetEvent(event);
        });
    };
    fetchEvent();

    const fetchEvents = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/events', {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(events => {
          console.log(events);
          setEvents(events);
        });
    };
    fetchEvents();
  }, [])

  function deleteTask() {
    // Delete task
    fetch(process.env.REACT_APP_API_ORIGIN + '/task', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }, null, 2)
    })
      .then(response => response.json())
      .then(data => {
        window.location.href = window.location.origin;
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let requestBody = {
      "description": taskDescription,
      "due_date": taskDueDate,
      "event_id": selectedEventID,
      "status": taskStatus,
      "id": taskID
    }
    fetch(process.env.REACT_APP_API_ORIGIN + '/task', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody, null, 2)
    })
      .then(response => response.json())
      .then(task => {
        setMessage(task.description + ' updated.');
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
  function handleTaskStatusChange(event) {
    setTaskStatus(event.target.value);
  }

  return (
    <>
      <h1>
        {taskDescription}
      </h1>

      <Link to={'/update-event?id=' + presetEvent.id}>
        <h2>
          {presetEvent.name}
        </h2>
      </Link>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Task Description
          <input name="name" type="text" value={taskDescription} onChange={handleTaskDescriptionChange}></input>
        </label>

        <label htmlFor="date">
          Due Date
          <input name="date" type="date" value={taskDueDate} onChange={handleDueDateChange}></input>
        </label>

        <label htmlFor="event">Status</label>
        <select value={taskStatus} onChange={handleTaskStatusChange}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <label htmlFor="event">Event Name</label>
        <select value={selectedEventID} onChange={handleEventSelectionChange}>
          {events.map((event) =>
            <option key={event.event_id} value={event.event_id}>
              {event.event_name} ({event.client_name})
            </option>
          )}
        </select>

        <input type="submit" value="Update" />
      </form>

      <button onClick={deleteTask}>
        Delete
      </button>

      <p>{message}</p>
    </>
  );
}

export default UpdateTask;
