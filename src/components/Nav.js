import './Nav.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import LoggedInNav from './LoggedInNav.js';
import LoggedOutNav from './LoggedOutNav.js';
import Cookies from 'universal-cookie';

function Login() {

  const cookies = new Cookies();

  return (
    <nav>
      <Link to="/">Event Manager&emsp;</Link>
      {cookies.get('loginCookie') == 'loggedIn'
        ? <LoggedInNav />
        : <LoggedOutNav />
      }
    </nav>
  )
}

export default Login;