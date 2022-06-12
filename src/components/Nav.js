import './Nav.css';
import React from 'react';
import { Link } from "react-router-dom";

const Login = () => (
  <nav>
    <Link to="/">Event Manager</Link>&emsp;
    <Link to="/sign-up">Sign Up</Link>&emsp;
    <Link to="/login">Log In</Link>
  </nav>
)

export default Login;