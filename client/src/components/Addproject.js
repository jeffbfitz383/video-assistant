import React, {useState} from 'react';
import {Link, useParams, useHistory} from "react-router-dom";

function Addproject() {
    const [name, setName] = useState("")

    const history = useHistory();

    const handleBackButton = () => {
    history.push('/UserLoggedin'); 
    };

    function handleSubmit(e){
        e.preventDefault()
        const newProject = {
            name: name
           
        }
        fetch("http://127.0.0.1:5555/Addproject", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProject)
        })
        .then(response => response.json())
        .then()
            setName("")

           
        
    }



    return (
        <div>
            <h1>Create a New Project</h1>
            <form>
            <input type="text" name="name" placeholder="Project name" value={name} onChange={(e) => setName(e.target.value)}/><p></p>
            <button onClick={handleSubmit}>Submit</button>
            </form><p></p>
            <button onClick={handleBackButton}>Home</button>
            {/* You can add more HTML elements here */}
        </div>
    );
}

export default Addproject;


