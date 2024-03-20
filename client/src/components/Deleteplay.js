import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

function DeletePlay() {
    const [plays, setPlays] = useState([]);
    const history = useHistory();
    const [name, setId] = useState("")

    useEffect(() => {
        // Fetch play data (replace with your actual API call)
        fetch('/Useplay')
            .then(response => response.json())
            .then(data => setPlays(data.plays))
            .catch(error => console.error('Error fetching play data:', error));
    }, []);
// istory.push('/deleteplay'); // Navigate to the home pageh
     const navToUsePlay = () => {
    //    
    alert('button works')
    history.push('/Useplay');
     };

    function handleSubmit(id) {
                // Assuming you have an API call to delete the play
        // Replace with your actual API endpoint
        fetch(`/deleteplay/${name}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Play deleted successfully');
                    // Redirect to a confirmation page or another route
                    history.push('/confirmation');
                } else {
                    console.error('Error deleting play');
                }
            })
            .catch(error => console.error('Error:', error));
    };
    

    return (
        <div>
            <h1>Delete Plays</h1>
         
            <button onClick = {navToUsePlay}>Go back to use play</button>
            <ul>
                {plays.map((play, index) => (
                    <li key={index}>
                        {/* <button onClick={playNumber(play.id)}>use</button> */}
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
            <form>
            <input type="text" name="id" placeholder="Id# of play to delete" value={name} onChange={(e) => setId(e.target.value)}/><p></p>
            
           
            
            <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default DeletePlay;
