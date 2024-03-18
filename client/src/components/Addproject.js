import React from 'react';
import {Link, useParams, useHistory} from "react-router-dom";

function Addproject() {

    const history = useHistory();

    const handleBackButton = () => {
    history.push('/UserLoggedin'); 
    };
    return (
        <div>
            <h1>Create a New Project</h1>
            
           
            <button onClick={handleBackButton}>Home</button>
            {/* You can add more HTML elements here */}
        </div>
    );
}

export default Addproject;


