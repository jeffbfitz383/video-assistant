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
    const [jersey, setJersey] = useState('');
    const [description, setDescription] = useState('');
    const [quality, setQuality] = useState('');
    const [assist, setAssist] = useState('');
    const [comment, setComment] = useState('');
    const [used, setUsed]= useState('');

    const setValueAndQuarter = (value) => {
        setQuarter(value);
      }

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
            jersey: jersey,
            description: description,
            quality: quality,
            assist: assist,
            comment:comment,
            used:used
           
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
            <div class = "updateplays">
            <h1>Update Plays</h1>
            </div>
           
            
            <button onClick = {playNumber}>Back to Use play</button>
            <ul class = "box">
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
                        Jersey: {jersey.jersey} ,
                        Description: {play.description} ,
                        Quality: {play.quality}  ,
                        Play:{play.assist} ,
                        Comment:{play.comment} ,
                        Used Status:{play.used}

                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>



            <input type='text'name='id'placeholder='Enter id of play to be updated'value={id}onChange={(e) => setId(e.target.value)}/><p></p>
            <input type='text'name='level'placeholder='Enter Level of player'value={level}onChange={(e) => setLevel(e.target.value)}/><p></p>



            <div className="dropdown">
            <input type="text" name="quarter" placeholder="Enter quarter play took place in" value={quarter} onChange={(e) => setValueAndQuarter(e.target.value)} className="dropbtn"/>
            <div className="dropdown-content">
            <p onClick={() => setValueAndQuarter(1)}>1st</p>
            <p onClick={() => setValueAndQuarter(2)}>2nd</p>
            <p onClick={() => setValueAndQuarter(3)}>3rd</p>
            <p onClick={() => setValueAndQuarter(4)}>4th</p>
            <p onClick={() => setValueAndQuarter(5)}>OT</p>
            </div>
            </div><p></p>

            {/* <input type='text'name='quarter'placeholder='In what quarter did the play take place'value={quarter}onChange={(e) => setQuarter(e.target.value)}/><p></p> */}
            <input type='text'name='clock_start'placeholder='clock at the start of the play'value={clock_start}onChange={(e) => setClock_start(e.target.value)}/><p></p>
            <input type='text'name='clock_stop'placeholder='time of the stop of the play'value={clock_stop}onChange={(e) => setClock_stop(e.target.value)}/><p></p>
            <input type='text'name='start'placeholder='video start time'value={start}onChange={(e) => setStart(e.target.value)}/><p></p>
            <input type='text'name='end'placeholder='video stop time'value={end}onChange={(e) => setEnd(e.target.value)}/><p></p>
            <input type='text'name='jersey'placeholder='player'value={jersey}onChange={(e) => setJersey(e.target.value)}/><p></p>
            <input type='text'name='description'placeholder='description'value={description}onChange={(e) => setDescription(e.target.value)}/><p></p>
            <input type='text'name='quality'placeholder='quality'value={quality}onChange={(e) => setQuality(e.target.value)}/><p></p>
            <input type='text'name='assist'placeholder='assist'value={assist}onChange={(e) => setAssist(e.target.value)}/><p></p>
            <input type='text'name='comment'placeholder='comment'value={comment}onChange={(e) => setComment(e.target.value)}/><p></p>
            <input type='text'name='used'placeholder='used'value={used}onChange={(e) => setUsed(e.target.value)}/><p></p>
            <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default UpdatePlay;
