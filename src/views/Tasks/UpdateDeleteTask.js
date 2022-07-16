import React, { useState, useEffect } from 'react';

function UpdateTask() {

  const [message, setMessage] = useState([]);
  const [taskDescription, setTaskDescription] = useState([]);
  const [taskDueDate, setTaskDueDate] = useState([]);
  const [taskID, setTaskID] = useState([]);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  useEffect(() => {
    // Get task
    const fetchTask = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/event-task/' + id, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(task => {
          console.log(task);
          setTaskDescription(task.description);
          setTaskDueDate(task.due_date);
          setTaskID(task.id);
        });
    };
    fetchTask();
  }, [])

  function handleSubmit(event) {
    event.preventDefault();
    let requestBody = {
      "description": taskDescription,
      "due_date": taskDueDate,
      "id": taskID
    }
    fetch(process.env.REACT_APP_API_ORIGIN + '/event-task', {
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

  function deleteTask() {
    // Delete task
    fetch(process.env.REACT_APP_API_ORIGIN + '/event-task', {
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

  return (
    <>
      <h1>
        {taskDescription}
      </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Task Description
          <input name="name" type="text" value={taskDescription} onChange={handleTaskDescriptionChange}></input>
        </label>

        <label htmlFor="date">
          Event Date
          <input name="date" type="date" value={taskDueDate} onChange={handleDueDateChange}></input>
        </label>

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
