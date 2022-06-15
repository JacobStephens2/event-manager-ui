import './Home.css';
import Nav from '../components/Nav.js';
import React, { useState, useEffect } from 'react';

function Home() {

  const [data, setData] = useState({ text: 'hi' });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://api.eventmanager.stewardgoods.local/')
      const body = result.text();
      setData(body);
    }
    fetchData();
    setData({ text: 'hello' });
  }, []);

  return (
    <>
      <Nav />
      <h1>Event Manager</h1>
      <p>The following text is from the API: {data.text}</p>
    </>
  );
}

export default Home;
