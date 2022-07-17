import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";

function UpdateEvent() {

  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState([]);
  const [client, setClient] = useState([]);
  const [tasks, setTasks] = useState([]);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  useEffect(() => {
    const fetchEvents = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/event/' + id, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setEvent(data);
          setDate(data.date)
        });
    };
    fetchEvents();

    const fetchTasksByEvent = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/event/' + id + '/tasks', {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setTasks(data);
        });
    };
    fetchTasksByEvent();

    const fetchClient = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/client/' + urlParams.get('client_id'), {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setClient(data);
        });
    };
    fetchClient();
  }, [])

  function deleteEvent() {
    // Delete event
    fetch(process.env.REACT_APP_API_ORIGIN + '/event', {
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
      <h1>{event.name}</h1>

      <Link to={'/update-client?id=' + client.id}>
        <h2>{client.name}</h2>
      </Link>

      <h2>Tasks</h2>
      <Link to={'/create-task?event_id=' + event.id}>
        <button>Create Tasks</button>
      </Link>
      <table>
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
          <tr>
            <td>
              <Link to={'/update-task?id=' + task.task_id + '&event_id=' + event.id} key={task.task_id}>
                {task.task_description}
              </Link>
            </td>
            <td>
              {task.task_due_date}
            </td>
            <td>
              {task.task_status}
            </td>
          </tr>
        )}
      </table>

      <Formik
        enableReinitialize
        initialValues={{
          name: event.name,
          date: date,
          id: id
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          // Update event
          fetch(process.env.REACT_APP_API_ORIGIN + '/event', {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values, null, 2)
          })
            .then(response => response.json())
            .then(data => {
              setMessage(data.name + ' updated');
            })
        }}
      >
        <Form>
          <label htmlFor="name">Event Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <label htmlFor="date">Event Date</label>
          <Field name="date" type="date" />
          <ErrorMessage name="date" />

          <button type="submit">Update</button>
        </Form>
      </Formik>

      <button onClick={deleteEvent}>
        Delete
      </button>

      <p>{message}</p>
    </>
  );
}

export default UpdateEvent;
