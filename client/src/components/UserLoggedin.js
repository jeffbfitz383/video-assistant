// UserLoggedin.js
import React from 'react';
import {Link, useParams, useHistory} from "react-router-dom"



function UserLoggedin({setUser}) {

    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        // setIsLoading(true);
        fetch("/UserLoggedin", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          
        }).then(() => {
        //   setIsLoading(false);
            setUser(null)
          
            history.push('/');
        });
      

    const handleNavToHome = () => {
        history.push('/'); // Navigate to the home page
    };

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
            <button onClick={handleLogout}>Logout</button>
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