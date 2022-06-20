import './Nav.css';
import React from 'react';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';


function LoggedInNav() {
  function handleLogoutClick() {
    const cookies = new Cookies();
    cookies.set('loginCookie', 'loggedOut', { path: '/' });
  }
  return (
    <>
      <button onClick={handleLogoutClick}>
        Log Out&emsp;
      </button>
      <Link to="/account">Account</Link>
    </>
  )
}

export default LoggedInNav;