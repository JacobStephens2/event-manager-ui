import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function UpdateEvent() {

  const [event, setEvent] = useState([]);
  const [message, setMessage] = useState([]);

  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  useEffect(() => {
    const fetchEvents = async () => {
      // Get event
      fetch(process.env.REACT_APP_API_ORIGIN + '/event/' + id, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setEvent(data);
        });
    };
    fetchEvents();
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
      <h1>Update Event</h1>
      <Formik
        enableReinitialize
        initialValues={{ name: event.name, id: id }}
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
