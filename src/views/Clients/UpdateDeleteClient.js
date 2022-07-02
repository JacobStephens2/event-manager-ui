import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import SendEmail from '../../components/SendEmail.js';

function UpdateClient() {

  const [client, setClient] = useState('');
  const [message, setMessage] = useState([]);
  const [events, setEvents] = useState([]);
  const [destinationEmailAddress, setDestinationEmailAddress] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  useEffect(() => {
    // Get client for initial load of page
    const fetchClients = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/client/' + id, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setClient(data);
          setDestinationEmailAddress(data.email);
        });
    };
    fetchClients();

    // Get client's events for initial load of page by client id
    const fetchClientEvents = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/client/' + id + '/events', {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setEvents(data);
        });
    };
    fetchClientEvents();
  }, [])

  function deleteClient() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    // Delete client
    fetch(process.env.REACT_APP_API_ORIGIN + '/client', {
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

  function handleEmailMessageChange(event) {
    setEmailBody(event.target.value);
  }

  return (
    <>
      <h1>{client.name}</h1>

      <h2>Events</h2>
      <Link to={'/create-event?client_id=' + client.id}>
        <button>Create Event</button>
      </Link>
      <table>
        <th>
          Name
        </th>
        <th>
          Date
        </th>
        {events.map((event) =>
          <tr>
            <td>
              <Link to={'/update-event?id=' + event.event_id + '&client_id=' + client.id} key={event.id}>
                {event.event_name}
              </Link>
            </td>
            <td>
              {event.event_date}
            </td>
          </tr>
        )}
      </table>

      <h2>{client.name} Details</h2>
      <Formik
        enableReinitialize
        initialValues={{
          name: client.name,
          id: id,
          email: destinationEmailAddress,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          // Update client
          fetch(process.env.REACT_APP_API_ORIGIN + '/client', {
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
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <label htmlFor="email">Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          <button type="submit">Update</button>
        </Form>
      </Formik>

      <button onClick={deleteClient}>
        Delete
      </button>

      <form>
        <label htmlFor="emailBody">
          Email Message
        </label>
        <textarea
          name="emailBody"
          rows="8"
          cols="40"
          value={emailBody}
          onChange={handleEmailMessageChange}
        ></textarea>
      </form>

      <SendEmail
        destinationEmail={destinationEmailAddress}
        body={emailBody}
      />

      <p>{message}</p>
    </>
  );
}

export default UpdateClient;
