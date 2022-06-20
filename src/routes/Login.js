import React, { useState } from 'react';
import Nav from '../components/Nav.js';
import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Cookies from 'universal-cookie';

const Login = () => {
  const [loginState, setLoginState] = useState('');

  return (
    <>
      <Nav />
      <h1>Login</h1>
      <p>{loginState}</p>
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
            .then(data => {
              console.log(data);
              setLoginState(data.message);
              if (data.message == 'Log in succeeded') {
                const cookies = new Cookies();
                cookies.set('loginState', 'loggedIn', { path: '/' });
                console.log(cookies.get('loginState')); // Pacman
              }
            })
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