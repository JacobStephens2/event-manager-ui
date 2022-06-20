import './Nav.css';
import React from 'react';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const Login = () => (
  <nav>
    <Link to="/">Event Manager</Link>&emsp;
    <Link to="/sign-up">Sign Up</Link>&emsp;
    <Link to="/login">Log In</Link>&emsp;
    {cookies.get('loginState') == 'loggedIn' &&
      <Link to="/account">Account</Link>
    }
  </nav>
)

export default Login;