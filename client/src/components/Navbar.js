// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav>
            <h1>Haven Properties</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/property">Property</Link></li>
                <li><Link to="/login">Profile</Link></li>
                <li><Link to="/contact">Contact</Link></li> {/* Updated link to /contact */}
                <li><Link to="/reviews">Reviews</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
