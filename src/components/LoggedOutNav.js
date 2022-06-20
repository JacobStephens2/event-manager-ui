import './Nav.css';
import React from 'react';
import { Link } from "react-router-dom";

function LoggedOutNav() {
  return (
    <>
      <Link to="/sign-up">Sign Up&emsp;</Link>
      <Link to="/login">Log In&emsp;</Link>
    </>
  )
}

export default LoggedOutNav;