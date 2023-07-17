import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from 'react-router-dom';


import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';

const HomePage = () => {
  return (
  <Router>
    <Routes>
      <Route exact path="/" element={<p>this is this homepage</p>}/>
      <Route path="/join" element={<RoomJoinPage />} />
      <Route path="/create" element={<CreateRoomPage />} />
      {/* roomCode is dynamic in the URL */}
      <Route path="/room/:roomCode" element={<Room />} />  
    </Routes>
  </Router>
  )  
}

export default HomePage