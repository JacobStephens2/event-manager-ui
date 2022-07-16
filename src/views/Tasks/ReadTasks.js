import React, { useState, useEffect } from 'react';
import '../ReadObjects.css';
import { Link } from "react-router-dom";

function ReadTasks() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/event-tasks', {
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
          Task
        </th>
        <th>
          Due Date
        </th>
        {tasks.map((task) =>
          <tr>
            <td>
              <Link to={'/update-task?id=' + task.id} key={task.id}>
                {task.description}
              </Link>
            </td>
            <td>
              {task.due_date}
            </td>
          </tr>
        )}
      </table>
    </>
  );
}

export default ReadTasks;
