import React from 'react';
import {Link, useParams, useHistory} from "react-router-dom";

function Signup() {

    const history = useHistory();

    const handleNavtoHome = () => {
        history.push('/'); // Navigate to "/signup" when button is clicked
    };

    return (
        <div>
            <h1>Signup page</h1>
            <button onClick={handleNavtoHome}>Home</button>
           
          

        </div>
    );
};

export default Signup;






