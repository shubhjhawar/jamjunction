import React, { useState, useEffect} from 'react';
import { render} from 'react-dom';
import {BrowserRouter as Router, Routes, Route, Link, Redirect, Navigate} from 'react-router-dom';
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

  const clearRoomCode = () => {
    setRoomCode("");
  }

  useEffect(() => {
      fetch('/api/user-in-room')
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      })
      .catch((error)=>{
        console.log(error);
      });

  }, [])

  

  return (
  <Router>
    <Routes>
      {/* <Route exact path="/" element={roomCode ? <Redirect to={`/room/${roomCode}`}/> : renderHomePage()}/> */}
      <Route exact path="/" element={roomCode ? <Navigate to={`/room/${roomCode}`}></Navigate> : renderHomePage()}/>
      <Route path="/join" element={<RoomJoinPage />} />
      <Route path="/create" element={<CreateRoomPage />} />
      {/* roomCode is dynamic in the URL */}
      <Route path="/room/:roomCode" element={<Room leaveRoomCallback={clearRoomCode}/>} />  
    </Routes>
  </Router>
  )  
}

export default HomePage