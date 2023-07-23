import React, {useState, useEffect} from 'react';
import { Grid, Button, Typography, IconButton} from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {Link} from "react-router-dom";

const pages = {
    JOIN: 'pages.join',
    CREATE: 'pages.create'
};

const Info = () => {

    const [page, setPage] = useState(pages.JOIN);

    const joinInfo = () => {
        return (
            <div>
                <h3>Join Page</h3>
                <p>If you have a code, enter it to join the room</p>
                <p>if the room allows you to pause the song, you can otherwise you will just have to ask the host to do so.</p>
                <p>You can vote to skip the song and when required number of users would vote, the song will get skipped</p>
            </div>
        )
    }

    const createInfo = () => {
        return (
            <div>
                <h3>Create Page</h3>
                <p>You can create a page by entering some details</p>
                <p>you would then get a code, that you can share with your friends and ask them to join</p>
                <p>being the host, you have the power to update the settings of the room whenever you feel like</p>
                <p>You can also play, pause or change the song as per your command</p>
            </div>
        )
    }


    

    return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4">What is Jam Junction?</Typography>
        </Grid>

        <Grid item xs={12} align="center">
            <Typography variant="body1"> 
                {page === pages.JOIN ? joinInfo() : createInfo()}
            </Typography>
        </Grid>

        <Grid item xs={12} align="center">
            <IconButton onClick={() => {page === pages.CREATE ? setPage(pages.JOIN): setPage(pages.CREATE)}}>
            {page === pages.CREATE ? <NavigateBeforeIcon/>: <NavigateNextIcon/> }
            </IconButton>
        </Grid>

        <Grid item xs={12} align="center">
            <Button color="secondary" variant='contained' to="/" component={Link}>Back</Button>
        </Grid>
    </Grid>
    )
}

export default Info