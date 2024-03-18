// UserLoggedin.js
import React from 'react';
import {Link, useParams, useHistory} from "react-router-dom"



function UserLoggedin() {

    const history = useHistory();

    const handleNavtoHome = () => {
        history.push('/'); 

    };

    const handleNavNewProject = () => {
        history.push('/Addproject'); 

    };

    const handleNavtoEnterProject = () => {
        history.push('/Enterproject')

    };

    return (
        <div>
            <h1>User Page</h1>
            <p>Would you like to create a project or enter a project?</p>
            <button onClick={handleNavtoHome}>Home</button>
            <button onClick={handleNavNewProject}>Create New Project</button>
            <button onClick={handleNavtoEnterProject}>Enter an exisiting Project</button>
            {/* You can add more HTML elements here */}
        </div>
    );
}

export default UserLoggedin;


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