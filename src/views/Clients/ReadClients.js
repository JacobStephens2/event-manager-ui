import React, { useState, useEffect } from 'react';
import '../ReadObjects.css';
import { Link } from "react-router-dom";

function ReadClients() {

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      fetch(process.env.REACT_APP_API_ORIGIN + '/clients', {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          setClients(data);
        });
    };
    fetchClients();
  }, [])


  return (
    <>
      <h1>Clients</h1>
      <Link to="/create-client">
        <button>Create Client</button>
      </Link>
      <ul>
        {clients.map((client) =>
          <Link to={'/update-client?id=' + client.id} key={client.id}>
            <li key={client.id}>
              {client.name}
            </li>
          </Link>
        )}
      </ul>
    </>
  );
}

export default ReadClients;
