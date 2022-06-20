import './Nav.css';
import React from 'react';
import { Link } from "react-router-dom";
import LoggedInNav from './LoggedInNav.js';
import LoggedOutNav from './LoggedOutNav.js';

function Login(props) {

  return (
    <nav>
      <Link to="/">Event Manager&emsp;</Link>
      <LoggedInNav />
      <LoggedOutNav />
    </nav>
  )
}

export default Login;