import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';

const Room = (props) => {
  const [votesToSkip, setVotesToSkip] = useState(1);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const navigate = useNavigate();


  const { roomCode } = useParams();

  const [song, setSong] = useState(null);

  const authenticateSpotify = (roomCode) => {
    fetch('/spotify/is-authenticated').then((response) => response.json()).then((data) => {
      setSpotifyAuthenticated(data.status);
      if(!data.status)
      {
        fetch('/spotify/get-auth-url').then((response) => response.json()).then((data) =>{
          window.location.replace(data.url);
        });
      }
    }).catch((error) => {
      console.error('Error while fetching Spotify authentication status:', error);
      console.log('Error while fetching Spotify authentication status:', error);
      // Handle any errors gracefully, e.g., show an error message to the user.
    });
  }

  const getRoomDetails = () => {
    fetch('/api/get-room' + '?code=' + roomCode)
      .then((response) => {
        if (!response.ok) {
          props.leaveRoomCallback();
          navigate('/');
        }
        return response.json();
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  };

  useEffect(() => {
    authenticateSpotify();
  }, [isHost]);

  console.log(spotifyAuthenticated);

  useEffect(() => {
    getRoomDetails(roomCode);
  }, []);

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('/api/leave-room', requestOptions)
    .then((response) => {
      props.leaveRoomCallback();
      navigate('/');
    }).catch((error) => {
      // Handle any errors that might occur during the fetch request.
      console.error('Error while leaving room:', error);
    });
  };

  const updateShowSettings = (value) => {
    setShowSettings(value);
  };

  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)}>
          Settings
        </Button>
      </Grid>
    );
  };

  const renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}
            roomCode={roomCode}
            updateCallback={getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" onClick={() => updateShowSettings(false)}>
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };

  const getCurrentSong = () => {
    fetch('/spotify/current-song').then((response) => {
      if(!response.ok)
      {
        return {};
      } else {
        return response.json();
      }
    }).then((data) => setSong(data))
  }

  getCurrentSong();
  // console.log(song);

  //RETURN
  // this is how you do conditional rendering 
  return showSettings ? renderSettings() : (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
         <Typography variant="h6" component="h6">
           Host: {isHost.toString()}
         </Typography>
       </Grid>
      <MusicPlayer {...song}/>
      
      {/* {song} */}
      {/* <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes to Skip: {votesToSkip}
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest can Pause: {guestCanPause.toString()}
        </Typography>
      </Grid> */}

       

      {isHost && renderSettingsButton()}

      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={() => leaveButtonPressed()}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;
