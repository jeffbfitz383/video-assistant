import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios'; // Make sure to install axios with 'npm install axios'

function Login({onLogin}) {
    const [name, setName] = useState(''); // State to store the username
    const [password, setPassword] = useState(''); // State to store the password
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, password }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => onLogin(user));
          } 
          history.push('/UserLoggedin');
          alert(`Logged in`);
        });
      }

    const handleNavToHome = () => {
        history.push('/'); // Navigate to the home page
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="User name" value={name} onChange={(e) => setName(e.target.value)} /><p></p>
                <input type="password" name="password" placeholder="User password" value={password} onChange={(e) => setPassword(e.target.value)} /><p></p>
                <button type="submit">Submit</button>
            </form>
            <button onClick={handleNavToHome}>Go Back</button>
        </div>
    );
};

export default Login;






