import React, { useState, useEffect } from 'react';

function CreateTask() {

  const [message, setMessage] = useState('');
  const [taskDescription, setTaskDescription] = useState([]);
  const [taskDueDate, setTaskDueDate] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    let requestBody = {
      "description": taskDescription,
      "due_date": taskDueDate,
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

        {/* Add client selector */}

        <input type="submit" value="Create" />
      </form>

      <p>{message}</p>

    </>
  );
}

export default CreateTask;
