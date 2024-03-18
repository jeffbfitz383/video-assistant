import React from 'react';
import {Link, useParams, useHistory} from "react-router-dom";

function Login() {
    const history = useHistory();

    const handleSubmit = () => {
        history.push('/UserLoggedin'); // Navigate to "/signup" when button is clicked
    };

    const handleNavToHome = () => {
        history.push('/'); // Navigate to "/signup" when button is clicked
    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleNavToHome}>Go Back</button>
          

        </div>
    );
};

export default Login;






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

