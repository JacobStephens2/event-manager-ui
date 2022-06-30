import React, { useState } from 'react';

function SendEmail(props) {
  const [message, setMessage] = useState('');

  function sendEmail() {
    const requestBody = {
      'destinationEmail': props.destinationEmail,
      'emailBody': props.body
    };
    fetch(
      process.env.REACT_APP_API_ORIGIN + '/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody, null, 2)
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
      })
  }

  return (
    <>
      <button
        onClick={sendEmail}
      >
        Send Email
      </button>

      <p>{message}</p>
    </>
  )
}

export default SendEmail;