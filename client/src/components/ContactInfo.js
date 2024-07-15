// src/components/ContactInfo.js

import React from 'react';
import './ContactInfo.css';

function ContactInfo() {
    return (
        <div className="contact-info">
            <h2>Contact Us</h2>
            <ul>
                <li>
                    <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
                        Facebook
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                        X (Twitter)
                    </a>
                </li>
                <li>
                    <a href="https://www.tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer">
                        TikTok
                    </a>
                </li>
                <li>
                    <a href="tel:+1234567890">
                        Phone: +1 234-567-890
                    </a>
                </li>
                <li>
                    <a href="mailto:info@havenproperties.com">
                        Email: info@havenproperties.com
                    </a>
                </li>
                <li>
                    <a href="mailto:support@havenproperties.com">
                        Email: support@havenproperties.com
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default ContactInfo;
