import React from 'react';
import {Link, useParams, useHistory} from "react-router-dom";

function Home() {

    const history = useHistory();

    const handleNavtoSignup = () => {
        history.push('/signup'); // Navigate to "/signup" when button is clicked
    };

    return (
        <div>
            <button onClick={handleNavtoSignup}>Signup</button>
            
          

        </div>
    );
};

export default Home;