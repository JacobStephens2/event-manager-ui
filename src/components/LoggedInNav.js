import './Nav.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

function LoggedInNav() {

  function logout() {

    fetch(process.env.REACT_APP_API_ORIGIN + '/logout', {
      method: 'POST',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        const cookies = new Cookies();
        cookies.set('loggedIn', 'false', { path: '/' });
        window.location.href = window.location.origin;
      })

  }
  return (
    <>
      <Link to="/clients">Clients</Link>

      <Link to="/events">Events</Link>

      <button onClick={logout}>
        Log Out
      </button>
    </>
  )
}

export default LoggedInNav;