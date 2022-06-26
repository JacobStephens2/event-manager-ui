import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import Nav from './components/Nav.js';

import Login from './routes/Users/Login';
import SignUp from './routes/Users/SignUp';

import CreateEvent from './routes/Events/CreateEvent';
import ReadEvents from './routes/Events/ReadEvents';
import UpdateDeleteEvent from './routes/Events/UpdateDeleteEvent';

import CreateClient from './routes/Clients/CreateClient';
import ReadClients from './routes/Clients/ReadClients';
import UpdateDeleteClient from './routes/Clients/UpdateDeleteClient';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Users */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Events */}
          <Route path="/events" element={<ReadEvents />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/update-event" element={<UpdateDeleteEvent />} />

          {/* Clients */}
          <Route path="/clients" element={<ReadClients />} />
          <Route path="/create-client" element={<CreateClient />} />
          <Route path="/update-client" element={<UpdateDeleteClient />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;