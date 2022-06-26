import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function CreateEvent() {

  return (
    <>
      <h1>Create Event</h1>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          fetch(process.env.REACT_APP_API_ORIGIN + '/event', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values, null, 2)
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
            })
        }}
      >
        <Form>
          <label htmlFor="name">Event Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <button type="submit">Create</button>
        </Form>
      </Formik>

    </>
  );
}

export default CreateEvent;
