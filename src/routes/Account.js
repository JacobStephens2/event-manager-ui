import React, { useState, useEffect } from 'react';

function Account() {

  fetch(process.env.REACT_APP_API_ORIGIN + '/all_events', {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })


  return (
    <>
      <h1>Account</h1>
    </>
  );
}

export default Account;
