import React from 'react'
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
            setVotesToSkip();
            setGuestCanPause();
            setIsHost();    
        });
    }


    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest can Pause: {guestCanPause}</p>
            <p>is Host: {isHost}</p>
        </div>
    )
}

export default Room