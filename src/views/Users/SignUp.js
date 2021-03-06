import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function SignUp() {
  const [signUpState, setSignUpState] = useState('');

  return (
    <>
      <h1>Sign Up</h1>
      <p>{signUpState}</p>
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
          fetch(process.env.REACT_APP_API_ORIGIN + '/sign-up', {
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
              setSignUpState(data.message);
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

          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </>
  );
};

export default SignUp;