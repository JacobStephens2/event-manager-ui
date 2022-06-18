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
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          password: Yup.string()
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          fetch(process.env.REACT_APP_API_ORIGIN + '/login', {
            method: 'POST',
            credentials: 'include',
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

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;