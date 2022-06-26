import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function UpdateClient() {

  const [client, setClient] = useState([]);
  const [message, setMessage] = useState([]);

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
        });
    };
    fetchClients();
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

  return (
    <>
      <h1>Update Client</h1>

      <Formik
        enableReinitialize
        initialValues={{ name: client.name, id: id }}
        validationSchema={Yup.object({
          name: Yup.string()
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
          <label htmlFor="name">Client Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <button type="submit">Update</button>
        </Form>
      </Formik>

      <button onClick={deleteClient}>
        Delete
      </button>

      <p>{message}</p>
    </>
  );
}

export default UpdateClient;
