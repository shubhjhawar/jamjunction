import React, {useState} from 'react';
import { TextField, Button, Grid, Typography} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

const RoomJoinPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const handleTextFieldChange = (e) => {
  //   setRoomCode(e.target.value)
  // }
  // console.log(roomCode); 


  const roomButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        code: roomCode
      })
    };
    fetch('/api/join-room', requestOptions).then((response) => {
      if (response.ok) {
        navigate(`/room/${roomCode}`)
      } else {
        setError("Room Not Found.")
        setRoomCode("");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
      <Grid container spacing={1} align='center'>
        <Grid item xs={12} >
          <Typography variant="h4" component="h4" align='center'>Join a Room</Typography>
        </Grid>

        <Grid item xs={12} align='center'>
          <TextField
            error={error}
            label="Code"
            placeholder="Enter a room code"
            value={roomCode}                
            helperText={error}
            variant="outlined"
            onChange={(e)=>setRoomCode(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} align='center'>
          <Button variant="contained" color="primary" onClick={roomButtonPressed}>Enter Room</Button>
        </Grid>

        <Grid item xs={12} align='center'>
        <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
        </Grid>
      </Grid>
    )
}

export default RoomJoinPage