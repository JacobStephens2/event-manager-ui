import './Home.css';
import Nav from '../components/Nav.js';
import React, { useState, useEffect } from 'react';

function Home() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://api.eventmanager.stewardgoods.local/').then(
        response => response.json()
      );
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <h1>Event Manager</h1>
      <p>The following text is from the API: {data.message}</p>
    </>
  );
}

export default Home;
