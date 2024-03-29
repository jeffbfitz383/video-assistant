import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player';
import UpdatePlay from './UpdatePlay';



function Useplay() {
    const [plays, setPlays] = useState([]);
    const [players, setPlayers] = useState([]);
    const [games, setGames] = useState([]);
    const [selection, setSelection] = useState([]);
    const [playerSelection, setPlayerSelection] = useState([]);
    const [usage, setUsage] = useState([]);
    const history = useHistory();
    const [clipURL, setClipURL] = useState('');
    const [playStatus, setPlayStatus] = useState('unused'); 
    var CU = 'cu';

    useEffect(() => {
       
        fetch('/Useplay')
            .then(response => response.json())
            .then(data => setPlays(data.plays))
            .catch(error => console.error('Error fetching play data:', error));
        
    }, []);

    useEffect(() => {
        
        fetch('/Getplayer') 
            .then(response => response.json())
            .then(data => setPlayers(data.players))  
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    useEffect(() => {
        
        fetch('/Getgame') 
            .then(response => response.json())
            .then(data => setGames(data.games))  
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    
    function sortPlayer(event){
        alert("button works")
    }

    function handleUseStatus(event) {
        setPlayStatus(event.target.value);
        // alert(playStatus)
      }

     const navToDelete = () => {
    //    
    //alert('button works')
    history.push('/deleteplay');
     };

    const navToPatch = () => {
    //    
    // alert('button works')
    history.push('/updateplay');
        };


    function navToAddPlay()  {
        history.push('/Addplay');
    };

    function playNumber(id) {
        // alert(`Clicked on play with ID: ${id}`);
    }

    function switchClip(event) {
        event.preventDefault();
        // alert(`${selection}`); // prints 17 as expected
        const newclipURL = `clip${selection}.mp4`;
        // alert(newclipURL); // prints clip17.mp4 as expected
        setClipURL(newclipURL);
        // The state `clipURL` won't be updated immediately here
        CU = newclipURL;
        // alert(CU); 
        // this.forceUpdate();
    }

    function handleUse(event){
        event.preventDefault();
        // alert("using play")
        const playID = usage;
        const conUrl = `/updateplay/${playID}`;
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ used: 1 }) // Set the used field to 1
        };

        // alert(playID)

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
        <div class = "bk">
           
            
            <button class="button-63" role="button" onClick = {navToAddPlay}>Create Another Play</button><p></p>
          
            <button class="button-63" role="button" onClick = {navToDelete}>Go to Delete Play</button><p></p>
            <button class="button-63" role="button"onClick = {navToPatch}>Go to Update Play</button><p></p>
            
            
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
        
            <h1>Plays</h1>

            <ul class = "box">
            {/* <h6>{play.jersey}</h6> */}
            {plays?.filter(
                play => playStatus === 'used' ? play.used === 1 : play.used === 0 ) 
                // && play.jersey === playerSelection
            
            .map((play, index) => (
                    <li key={index}>
                        {/* <button onClick={playNumber}>use</button> */}
                        ID: {play.id}  ,   {/* Display play ID */}
                        Level: {play.level}  , 
                        Quarter: {play.quarter} , 
                        Clock_Start: {play.clock_start}  ,
                        Clock_Stop: {play.clock_stop}  ,
                        Start: {play.start}  ,
                        Stop: {play.stop}  ,
                        Jersey: {play.jersey} ,
                        Description: {play.description} ,
                        Quality: {play.quality}  ,
                        Play:{play.assist} ,
                        Comment:{play.comment} ,
                        Used:{play.used}
                      
                        <ul>
                            <li>
                                {play.players.map((player,index)=> (
                                    <li key={index}>{player.name}</li>
                                ))
                                }
                            </li>
                            <li>
                                {play.games.map((game,index)=> (
                                    <li key={index}>{game.name}</li>
                                ))
                                }
                            </li>
                        </ul>
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
        <button class="button-63" role="button"type = 'submit'>submit</button><p></p>
        <button class="button-63" role="button"type='submit' onClick={() => setSelection(0)}>see running project</button>
        {/* this second button, when clicked should set {selection} to zero */}
      </form>

      <form onSubmit = {handleUse}>
        <h3>Use a Play

        </h3>
        <input type='text'name='usage'placeholder='Enter id#'value={usage}onChange={(e) => setUsage(e.target.value)}/><p></p>
        <button class="button-63" role="button" type = 'submit'>submit</button>
      </form>





        <h1>Games</h1>
            <ul className="box">
                {games.map((game, index) => (
                <li key={index}>
                    ID: {game.id},
                    Name: {game.name}, 
                    Jersey: {game.level}
                    Year: {game.date}
                    {/* Plays:{player.plays} */}
                </li>
        ))}
        </ul>
{/* <button onClick={handleLogout}>Logout</button> */}
{/* <button class='glowing-btn'><span class='glowing-txt'>C<span class='faulty-letter'>L</span>ICK</span></button> */}
        </div>
    
    );

    
}

export default Useplay;

