// src/components/LogIn.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './Auth.css';

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const history = useHistory();
    const { setUser, setIsAuthenticated } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
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
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {welcomeMessage && <p className="welcome-message">{welcomeMessage}</p>}
                <p>
                    Don't have an account? <Link to="/register">Sign Up here</Link>
                </p>
            </div>
        </div>
    );
}

export default LogIn;
