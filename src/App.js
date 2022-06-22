import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import NotFound from './routes/NotFound';
import Nav from './components/Nav.js';
import CreateEvent from './routes/Events/CreateEvent';
import ReadEvents from './routes/Events/ReadEvents';
import UpdateEvent from './routes/Events/UpdateEvent';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/events" element={<ReadEvents />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/update-event" element={<UpdateEvent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;