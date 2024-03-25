import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player';
import UpdatePlay from './UpdatePlay';

function Useplay() {
    const [plays, setPlays] = useState([]);
    const [selection, setSelection] = useState([]);
    const [usage, setUsage] = useState([]);
    const history = useHistory();
    const [clipURL, setClipURL] = useState('');
    const [playStatus, setPlayStatus] = useState('unused'); 
    var CU = 'cu';

    useEffect(() => {
        // Fetch play data (replace with your actual API call)
        fetch('/Useplay')
            .then(response => response.json())
            .then(data => setPlays(data.plays))
            .catch(error => console.error('Error fetching play data:', error));
    }, []);

    function handleUseStatus(event) {
        setPlayStatus(event.target.value);
        alert(playStatus)
      }

     const navToDelete = () => {
    //    
    alert('button works')
    history.push('/deleteplay');
     };

    const navToPatch = () => {
    //    
    alert('button works')
    history.push('/updateplay');
        };


    function navToAddPlay()  {
        history.push('/Addplay');
    };

    function playNumber(id) {
        alert(`Clicked on play with ID: ${id}`);
    }

    function switchClip(event) {
        event.preventDefault();
        alert(`${selection}`); // prints 17 as expected
        const newclipURL = `clip${selection}.mp4`;
        alert(newclipURL); // prints clip17.mp4 as expected
        setClipURL(newclipURL);
        // The state `clipURL` won't be updated immediately here
        CU = newclipURL;
        alert(CU); 
    }

    function handleUse(event){
        event.preventDefault();
        alert("using play")
        const playID = usage;
        const conUrl = `/updateplay/${playID}`;
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ used: 1 }) // Set the used field to 1
        };

        alert(playID)

        fetch(conUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log('Play updated:', data);
            alert('Play updated successfully!');
            fetch(`/Useplay`)
            .then(response => response.json())
            .then(data => setPlays(data.plays))
            .catch(error => console.error('Error fetching play data:', error));
            fetch(`/useplay/${playID}`)
        })
        .catch(error => {
            // Handle any errors
            console.error('Error updating play:', error);
            alert('Failed to update play.');
        });


    }                       





    return (
        <div>
            <h1>Plays</h1>
            <p>Welcome to our project management system!</p>
            <button onClick = {navToAddPlay}>Create Another Play</button><p></p>
            <button onClick = {navToDelete}>Go to Delete Play</button><p></p>
            <button onClick = {navToPatch}>Go to Update Play</button><p></p>
            
            
            <div>
                <input
                    type="radio"
                    id="used"
                    name="playStatus"
                    value="used"
                    checked={playStatus === 'used'}
                    onChange={handleUseStatus}
                />
                <label htmlFor="used">Used</label>

                <input
                    type="radio"
                    id="unused"
                    name="playStatus"
                    value="unused"
                    checked={playStatus === 'unused'}
                    onChange={handleUseStatus}
                />
                <label htmlFor="unused">Unused</label>
            </div>
        
            

            <ul>
            {plays.filter(play => playStatus === 'used' ? play.used === 1 : play.used === 0)
            .map((play, index) => (
                    <li key={index}>
                        <button onClick={playNumber}>use</button>
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
                        Used:{play.used}
                    </li>
                ))}
            </ul>
        <ReactPlayer
        className='react-player fixed-bottom'
        url={clipURL}
        width='62%'
        height='62%'
        controls={true}
      />
      <form onSubmit = {switchClip}>
        <h3>View a play</h3>
        <input type='text'name='selection'placeholder='Enter id#'value={selection}onChange={(e) => setSelection(e.target.value)}/><p></p>
        <button type = 'submit'>submit</button>
        <button type='submit' onClick={() => setSelection(0)}>see running project</button>
        {/* this second button, when clicked should set {selection} to zero */}
      </form>

      <form onSubmit = {handleUse}>
        <h3>Use a Play

        </h3>
        <input type='text'name='usage'placeholder='Enter id#'value={usage}onChange={(e) => setUsage(e.target.value)}/><p></p>
        <button type = 'submit'>submit</button>
      </form>

        </div>
    );

    
}

export default Useplay;

