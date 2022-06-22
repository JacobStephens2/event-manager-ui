import './Nav.css';
import React from 'react';
import { Link } from "react-router-dom";

function LoggedOutNav() {
  return (
    <>
      <Link to="/sign-up">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </>
  )
}

export default LoggedOutNav;