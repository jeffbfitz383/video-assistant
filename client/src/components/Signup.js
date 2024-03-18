import React, {useState} from 'react';
import {Link, useParams, useHistory} from "react-router-dom";

function Signup() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")


    const history = useHistory();

    const handleNavtoHome = () => {
        history.push('/'); // Navigate to "/signup" when button is clicked
    };

    function handleSubmit(e){
        e.preventDefault()
        const newUser = {
            name: name,
            password: password
        }
        fetch("http://127.0.0.1:5555/Signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then()
            setName("")

            setPassword("")
           
        
    }

    return (
        <div>
            <h1>Signup page</h1>

            
            <form>
            <input type="text" name="name" placeholder="User name" value={name} onChange={(e) => setName(e.target.value)}/><p></p>
            <input type="text" name="password" placeholder="User password" value={password} onChange={(e) => setPassword(e.target.value)}/><p></p>
           
            
            <button onClick={handleSubmit}>Submit</button>
            </form><p></p>
            <button onClick={handleNavtoHome}>Home</button>
          

        </div>
    );
};

export default Signup;






