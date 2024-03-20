import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';



function CreateProject() {
    const [name, setName] = useState('');
    const history = useHistory();

    // Assume you have the user ID stored in your state or context
    const userId = 'your_user_id_here';

    const handleBackButton = () => {
        history.push('/UserLoggedin');
    };

    function handleSubmit(e) {
        e.preventDefault();
        const newProject = {
            name: name,
            user_id: userId, // Include the user ID
        };

        fetch('http://127.0.0.1:5555/Addproject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject),
        })
            .then(response => response.json())
            .then(() => {
                setName('');
                // Handle any other actions after project creation
            });
    }

    return (
        <div>
            <h1>Create a New Project</h1>
            <form>
                <input
                    type="text"
                    name="name"
                    placeholder="Project name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <p></p>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <p></p>
            <button onClick={handleBackButton}>Home</button>

            {/* You can add more HTML elements here */}
        </div>
    );
}

export default CreateProject;


