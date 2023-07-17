import React, {useState} from 'react';
// import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import  FormHelperText  from '@material-ui/core/FormHelperText';
import  FormControl  from '@material-ui/core/FormControl';
import {Link, useHistory} from 'react-router-dom';
import Radio from "@material-ui/core/Radio";
import  RadioGroup  from '@material-ui/core/RadioGroup';
import  FormControlLabel  from '@material-ui/core/FormControlLabel';
import { Button, FormLabel } from '@material-ui/core';

const CreateRoomPage = () => {

  let defaultVotes = 2;
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const history = useHistory();

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
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
    ).then((data) => history.push(`/room?code=${data.code}` ));    //getting the response data back
  }
 
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component='h4' variant='h4'>Create a Room</Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align='center'>Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup row defaultValue='true'onChange={(e) => setGuestCanPause(e.target.value=== 'true'? true:false)}>
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
            defaultValue={defaultVotes} 
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

      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>Create a Room</Button>
      </Grid>

      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
      </Grid>


    </Grid>
  );
};

export default CreateRoomPage