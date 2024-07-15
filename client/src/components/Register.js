// src/components/Register.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './Auth.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const history = useHistory();
    const { setUser, setIsAuthenticated } = useContext(UserContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', { username, email, password });
            localStorage.setItem('token', response.data.token);
            setUser({ username });
            setIsAuthenticated(true);
            setWelcomeMessage(`Welcome ${username}!`);
            setTimeout(() => {
                history.push('/reviews');
            }, 2000); // Redirect to reviews after 2 seconds
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Register</button>
                </form>
                {welcomeMessage && <p className="welcome-message">{welcomeMessage}</p>}
            </div>
        </div>
    );
}

export default Register;
