import React from 'react';
import { Grid, Typography, Card, IconButton, LinearProgress, Icon } from '@material-ui/core';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseIcon from "@material-ui/icons/Pause";



const MusicPlayer = (song) => {

    const songProgress = (song.time / song.duration ) * 100;

    const pauseSong = () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        };
        fetch('/spotify/pause', requestOptions);
        console.log("pause");
    };

    const playSong = () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        };
        fetch('/spotify/play', requestOptions);
        console.log("play")
    };

    const skipSong = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'}
        };
        fetch('/spotify/skip', requestOptions);
        console.log("skip")
    };

    return (
    <Card>
        <Grid container alignItems="center">
            <Grid item align="center" xs={4}>
                <img src={song.image_url} height="100%"  width="100%"/>
            </Grid>

            <Grid item align="center" xs={8}>
                <Typography component="h5" variant="h5">{song.title}</Typography>
                <Typography color="textSecondary" variant="h5">{song.artist}</Typography>
                <Typography component="h5" variant="h5">{song.title}</Typography>
                <div>   
                    <IconButton onClick={() => {song.is_playing ? pauseSong() : playSong()}}>
                        {song.is_playing ? <PauseIcon/> : <PlayArrowIcon/>}
                    </IconButton>
                    <IconButton onClick={()=> skipSong()}>
                    {song.votes} / {" "} {song.votes_required} {" "}<SkipNextIcon /> 
                    </IconButton>
                </div>
            </Grid>
        </Grid>
        <LinearProgress variant='determinate' value={songProgress}></LinearProgress>
    </Card>
    )
}

export default MusicPlayer