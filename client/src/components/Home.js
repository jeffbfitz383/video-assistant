import React from 'react';
import {Link, useParams, useHistory} from "react-router-dom";

function Home() {

    const history = useHistory();

    const handleNavtoSignup = () => {
        history.push('/signup'); // Navigate to "/signup" when button is clicked
    };

    const handleNavtoLoggin = () => {
        history.push('/Login'); // Navigate to "/signup" when button is clicked
    };


    return (
        <div>
            <button onClick={handleNavtoSignup}>Signup</button>
            <button onClick={handleNavtoLoggin}>Loggin</button>
            
          

        </div>
    );
};

export default Home;