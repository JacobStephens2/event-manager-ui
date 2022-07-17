import React, { useState, useEffect } from 'react';
import '../ReadObjects.css';
import { Link } from "react-router-dom";

function ReadTasks() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/tasks', {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          setTasks(data);
        });
    };
    fetchTasks();
  }, [])

  return (
    <>
      <h1>Tasks</h1>

      <Link to="/create-task">
        <button>Create Task</button>
      </Link>

      <table>
        <th>
          Event
        </th>
        <th>
          Task
        </th>
        <th>
          Due Date
        </th>
        <th>
          Status
        </th>
        {tasks.map((task) =>
          <tr key={task.id}>
            <td>
              <Link to={'/update-event?id=' + task.event_id}>
                {task.event_name}
              </Link>
            </td>
            <td>
              <Link to={'/update-task?id=' + task.id + '&event_id=' + task.event_id}>
                {task.description}
              </Link>
            </td>
            <td>
              {task.due_date}
            </td>
            <td>
              {task.status}
            </td>
          </tr>
        )}
      </table>
    </>
  );
}

export default ReadTasks;
