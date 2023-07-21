import React, {useState} from 'react';
// import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import  FormHelperText  from '@material-ui/core/FormHelperText';
import  FormControl  from '@material-ui/core/FormControl';
import {Link, useNavigate } from 'react-router-dom';
import Radio from "@material-ui/core/Radio";
import  RadioGroup  from '@material-ui/core/RadioGroup';
import  FormControlLabel  from '@material-ui/core/FormControlLabel';
import { Button, FormLabel, Collapse} from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";

const CreateRoomPage = ({ votesToSkip: defaultVotesToSkip = 2, guestCanPause: defaultGuestCanPause = true, update = false, roomCode = null, updateCallback }) => {

  const [guestCanPause, setGuestCanPause] = useState(defaultGuestCanPause);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotesToSkip);
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  }

  
  const renderCreateButtons = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>Create a Room</Button>
        </Grid>

        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
        </Grid>
      </Grid>
    )
  }

  const renderUpdateButtons = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={handleUpdateButtonPressed}>Update Room</Button>
        </Grid>
      </Grid>
    )
  }
  
  const handleRoomButtonPressed= () => {
    // create a payload
    const requestOptions = {
      method:'POST',
      //header is where we can pass the jwt_token
      headers: {'Content-Type':"application/json"},

      //body is body
      body: JSON.stringify({
        votes_to_skip:votesToSkip,
        guest_can_pause:guestCanPause
      })
    };
    fetch('/api/create-room', requestOptions).then((response) =>      //here u can see we are using the backend api
      response.json()
    ).then((data) => navigate(`/room/${data.code}` ));    //getting the response data back
  }

  const handleUpdateButtonPressed = () => {
     // create a payload
     const requestOptions = {
      method:'PATCH',
      //header is where we can pass the jwt_token
      headers: {'Content-Type':"application/json"},

      //body is body
      body: JSON.stringify({
        votes_to_skip:votesToSkip,
        guest_can_pause:guestCanPause,
        code: roomCode

      })
    };
    fetch('/api/update-room', requestOptions).then((response) =>{
      if(response.ok)
      {
        setSuccessMsg("Room Updated Successfully")
      } else {
        setErrorMsg("update failed..")
      }
      updateCallback();

    });    
  }

  const title = update ? "Update Room" : "Create a Room";
 
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={errorMsg != "" || successMsg != ""}>
        {successMsg != "" ? 
          <Alert severity='success' onClose={() => {setSuccessMsg("")}}>{successMsg}</Alert>
        :
        <Alert severity='error' onClose={() => {setErrorMsg("")}}>{errorMsg}</Alert>
        }
        </Collapse>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography component='h4' variant='h4'>{title}</Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align='center'>Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup row defaultValue={guestCanPause.toString()} onChange={(e) => setGuestCanPause(e.target.value=== 'true'? true:false)}>
            <FormControlLabel 
              value="true" 
              control={<Radio color="primary" />} 
              label = "Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel 
              value="false" 
              control={<Radio color="secondary" />} 
              label = "No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl>
          <TextField 
            required={true} 
            type="number" 
            defaultValue={defaultVotesToSkip} 
            inputProps={{
                min:1,
                style: {textAlign: 'center'},
            }}
            onChange={handleVotesChange}
          />
          <FormHelperText>
            <div align="center">Votes Required to Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>

      {update ? renderUpdateButtons() : renderCreateButtons()}

    </Grid>
  );
};

export default CreateRoomPage