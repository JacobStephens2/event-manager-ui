import React from 'react';
import { Link } from "react-router-dom";

const Login = () => (
  <nav
    style={{
      borderBottom: "solid 1px",
      paddingBottom: "1rem",
      paddingTop: "0.7rem",
    }}
  >
    <Link to="/">Home</Link>&emsp;
    <Link to="/sign-up">Sign Up</Link>&emsp;
    <Link to="/login">Log In</Link>
  </nav>
)

export default Login;