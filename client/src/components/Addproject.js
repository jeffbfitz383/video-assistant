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
            <p>Welcome to our project management system!</p>
            <button onClick={handleBackButton}>Home</button>
            {/* You can add more HTML elements here */}
        </div>
    );
}

export default Addproject;


// import React from 'react';
// import {Link, useParams, useHistory} from "react-router-dom";

// function Signup() {

//     const history = useHistory();

//     const handleNavtoHome = () => {
//         history.push('/'); // Navigate to "/signup" when button is clicked
//     };

//     return (
//         <div>
//             <h1>Signup page</h1>
//             <button onClick={handleNavtoHome}>Home</button>
           
          

//         </div>
//     );
// };

// export default Signup;