import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

const Room = () => {

    const [votesToSkip, setVotesToSkip] = useState(1);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);

    // useparams is used to fetch the dynamic code from the URL
    const {roomCode} = useParams();

    const getRoomDetails = () => {
        fetch('/api/get-room' + '?code=' + roomCode).then((response) => 
            response.json()
        ).then((data) =>{
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);    
        });
    }
    useEffect(() => {
        getRoomDetails();
    }, [])
    

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest can Pause: {guestCanPause.toString()}</p>
            <p>is Host: {isHost.toString()}</p>
        </div>
    )
}

export default Room