import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from './views/Home';
import NotFound from './views/NotFound';
import Nav from './components/Nav.js';

import Login from './views/Users/Login';
import SignUp from './views/Users/SignUp';

import CreateEvent from './views/Events/CreateEvent';
import ReadEvents from './views/Events/ReadEvents';
import UpdateDeleteEvent from './views/Events/UpdateDeleteEvent';

import CreateClient from './views/Clients/CreateClient';
import ReadClients from './views/Clients/ReadClients';
import UpdateDeleteClient from './views/Clients/UpdateDeleteClient';

import CreateTask from './views/Tasks/CreateTask';
import ReadTasks from './views/Tasks/ReadTasks';
import UpdateDeleteTask from './views/Tasks/UpdateDeleteTask';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <section>
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

            {/* Tasks */}
            <Route path="/tasks" element={<ReadTasks />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/update-task" element={<UpdateDeleteTask />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
      </BrowserRouter>
    </>
  )
}

export default App;