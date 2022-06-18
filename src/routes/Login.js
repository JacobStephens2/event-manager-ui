import React from 'react';
import Nav from '../components/Nav.js';
import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  return (
    <>
      <Nav />
      <h1>Login</h1>
      <Formik
        initialValues={{ email: '', name: '' }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          fetch(process.env.REACT_APP_API_ORIGIN + '/mimic-json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values, null, 2)
          })
            .then(response => response.json())
            .then(data => console.log(data));
        }}
      >
        <Form>
          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          <label htmlFor="name">Name</label>
          <Field name="name" type="name" />
          <ErrorMessage name="name" />

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;