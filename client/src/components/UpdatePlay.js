import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

function UpdatePlay() {
    
    const [plays, setPlays] = useState([]);
    
    
    const history = useHistory();
    const [id, setId] = useState('');
    const [level, setLevel] = useState('');
    const [quarter, setQuarter] = useState('');
    const [clock_start, setClock_start] = useState('');
    const [clock_stop, setClock_stop] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [player, setPlayer] = useState('');
    const [description, setDescription] = useState('');
    const [quality, setQuality] = useState('');
    const [assist, setAssist] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
    
        fetch('/Useplay')
            .then(response => response.json())
            .then(data => setPlays(data.plays))
            .then({UpdatePlay})
            .catch(error => console.error('Error fetching play data:', error));
    }, []);



    function playNumber() {
        history.push('/useplay'); 
        alert('button works')
    }

    function handleSubmit(event) {
        event.preventDefault(); 
    
      
        const updatedPlay = {
            id: id, // Use the ID from the form input
            level: level,
            quarter: quarter,
            clock_start: clock_start,
            clock_stop: clock_stop,
            start: start,
            player: player,
            description: description,
            quality: quality,
            assist: assist,
            comment:comment
           
        };
        console.log(updatedPlay)
    
        
        fetch(`/updateplay/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPlay),
        })
            .then(response => {
                if (response.ok) {
                    
                    alert('Play updated successfully');
                    fetch('/Useplay')
                    .then(response => response.json())
                    .then(data => setPlays(data.plays))
                    .catch(error => console.error('Error fetching play data:', error));
              
                } else {
                    console.log(response)
                    alert('Error updating play. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error updating play:', error);
            });
            // setPlays(UpdatePlay)
    }

    return (
        <div class>
            <h1>Update Plays</h1>
            <p>Welcome to our project management system!</p>
            
            <button onClick = {playNumber}>Back to Use play</button>
            <ul>
                {plays.map((play, index) => (
                    <li key={index}>
                        {/* <button onClick={playNumber}>use</button> */}
                        ID: {play.id}  ,   {/* Display play ID */}
                        Level: {play.level}  , 
                        Quarter: {play.quarter} , 
                        Clock_Start: {play.clock_start}  ,
                        Clock_Stop: {play.clock_stop}  ,
                        Start: {play.start}  ,
                        Stop: {play.stop}  ,
                        Play: {play.player} ,
                        Description: {play.description} ,
                        Quality: {play.quality}  ,
                        Play:{play.assist} ,
                        Comment:{play.comment} ,
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
            <input type='text'name='id'placeholder='Enter id of play to be deleted'value={id}onChange={(e) => setId(e.target.value)}/><p></p>
            <input type='text'name='level'placeholder='Enter Level of player'value={level}onChange={(e) => setLevel(e.target.value)}/><p></p>
            <input type='text'name='quarter'placeholder='In what quarter did the play take place'value={quarter}onChange={(e) => setQuarter(e.target.value)}/><p></p>
            <input type='text'name='clock_start'placeholder='clock at the start of the play'value={clock_start}onChange={(e) => setClock_start(e.target.value)}/><p></p>
            <input type='text'name='clock_stop'placeholder='time of the stop of the play'value={clock_stop}onChange={(e) => setClock_stop(e.target.value)}/><p></p>
            <input type='text'name='start'placeholder='video start time'value={start}onChange={(e) => setStart(e.target.value)}/><p></p>
            <input type='text'name='end'placeholder='video stop time'value={end}onChange={(e) => setEnd(e.target.value)}/><p></p>
            <input type='text'name='player'placeholder='Enter Level of player'value={player}onChange={(e) => setPlayer(e.target.value)}/><p></p>
            <input type='text'name='description'placeholder='Enter Level of player'value={description}onChange={(e) => setDescription(e.target.value)}/><p></p>
            <input type='text'name='quality'placeholder='Enter Level of player'value={quality}onChange={(e) => setQuality(e.target.value)}/><p></p>
            <input type='text'name='assist'placeholder='Enter Level of player'value={assist}onChange={(e) => setAssist(e.target.value)}/><p></p>
            <input type='text'name='comment'placeholder='Enter Level of player'value={comment}onChange={(e) => setComment(e.target.value)}/><p></p>
            <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default UpdatePlay;