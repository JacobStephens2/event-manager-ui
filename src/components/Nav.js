import './Nav.css';
import React from 'react';
import { Link } from "react-router-dom";
import LoggedInNav from './LoggedInNav.js';
import LoggedOutNav from './LoggedOutNav.js';
import Cookies from 'universal-cookie';

function Login() {
  const cookies = new Cookies();

  function setMenuByLoginStatus() {
    if (cookies.get('loggedIn') == 'true') {
      return <LoggedInNav />
    } else {
      return <LoggedOutNav />
    }
  }
  return (
    <nav>
      <Link to="/">Event Manager&emsp;</Link>
      {setMenuByLoginStatus()}
    </nav>
  )
}

export default Login;