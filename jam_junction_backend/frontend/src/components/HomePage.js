import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from 'react-router-dom';


import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';

const HomePage = () => {
  return (
  <Router>
    <Routes>
      <Route exact path="/" element={<p>this is this homepage</p>}/>
      <Route path="/join" element={<RoomJoinPage />} />
      <Route path="/create" element={<CreateRoomPage />} />
    </Routes>
  </Router>
  )  
}

export default HomePage