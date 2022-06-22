import './Nav.css';
import React from 'react';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

function LoggedInNav() {
  function logout() {
    const cookies = new Cookies();
    cookies.set('loggedIn', 'false', { path: '/' });
    window.location.href = window.location.origin;
  }
  return (
    <>
      <Link to="/events">Events</Link>
      <Link to="/create-event">Create Event</Link>
      <button onClick={logout}>
        Log Out
      </button>
    </>
  )
}

export default LoggedInNav;