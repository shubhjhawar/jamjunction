import React, { useState, useEffect} from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from 'react-router-dom';
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';


import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';

const HomePage = () => {

  const [roomCode, setRoomCode] = useState("");

  const renderHomePage = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant='h3' component="h3">
            Jam Junction
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant='contained' color="primary">
            <Button color="primary" to="/join" component={ Link }>Join a Room</Button>
            <Button color="secondary" to="/create" component={ Link }>Create a Room</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    )
  }; 

  useEffect(() => {
    const fetchData = async () => {
      fetch('/api/user-in-room')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.code);
        setRoomCode(data.code.toString);
        console.log(roomCode);
      })
      .catch((error)=>{
        console.log(error);
      });
    }
    fetchData();
  }, [])

  

  return (
  <Router>
    <Routes>
      <Route exact path="/" element={roomCode ? <Redirect to={`/room/${roomCode}`}/> : renderHomePage()}/>
      <Route path="/join" element={<RoomJoinPage />} />
      <Route path="/create" element={<CreateRoomPage />} />
      {/* roomCode is dynamic in the URL */}
      <Route path="/room/:roomCode" element={<Room />} />  
    </Routes>
  </Router>
  )  
}

export default HomePage