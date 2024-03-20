import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import {Link, useParams, useHistory} from "react-router-dom";

const Video = () => {
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

  const history = useHistory();

  const navToUsePlay = () => {
    history.push('/Useplay'); // Navigate to the home page
};


  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted');
    const newPlay = {
        level: level,
        quarter: quarter,
        clock_start: clock_start, 
        clock_stop: clock_stop,
        start: start,
        end: end,
        player: player,
        description: description,
        quality: quality,
        assist: assist,
        comment:comment

    }
    fetch("http://127.0.0.1:5555/Addplay", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlay)
    })
    .then(response => response.json())
    .then()
        

       
    
}
    
  

  return (
    <div className='player-wrapper'>
      <p></p><button onClick = {navToUsePlay}>Use Play</button><p></p>
      {/* Other components or elements */}
      <ReactPlayer
        className='react-player fixed-bottom'
        url='video.mp4'
        width='75%'
        height='75%'
        controls={true}
      />
      <form onSubmit={handleSubmit}>
        <h3>This is a form</h3>
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

export default Video;