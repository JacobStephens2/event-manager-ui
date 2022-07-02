import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function CreateClient() {

  const [message, setMessage] = useState([]);

  return (
    <>
      <h1>Create Client</h1>
      <Formik
        initialValues={{
          name: ''
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          fetch(process.env.REACT_APP_API_ORIGIN + '/client', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values, null, 2)
          })
            .then(response => response.json())
            .then(data => {
              setMessage(data.name + ' created.');
            })
        }}
      >
        <Form>
          <label htmlFor="name">Client Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <button type="submit">Create</button>
        </Form>
      </Formik>

      <p>{message}</p>

    </>
  );
}

export default CreateClient;
