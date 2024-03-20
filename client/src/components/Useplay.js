import React, { useState, useEffect } from 'react';

function Useplay() {
    const [plays, setPlays] = useState([]);

    useEffect(() => {
        // Fetch play data (replace with your actual API call)
        fetch('/Useplay')
            .then(response => response.json())
            .then(data => setPlays(data.plays))
            .catch(error => console.error('Error fetching play data:', error));
    }, []);

    function playNumber() {
        alert("hello");
    }

    return (
        <div>
            <h1>Plays</h1>
            <p>Welcome to our project management system!</p>
            <ul>
                {plays.map((play, index) => (
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
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Useplay;

