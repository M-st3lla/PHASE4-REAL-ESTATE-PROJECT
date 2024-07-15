// src/components/SearchForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchForm.css';
import { landLocations } from './Data'; // Adjust the import path as per your project structure
import { propertyLocations } from './PropertyData'; // Import the property data

const SearchForm = ({ onSearch }) => {
    const [propertyType, setPropertyType] = useState('');
    const [location, setLocation] = useState('');
    const [locationOptions, setLocationOptions] = useState([]);
    const [selectedLocationInfo, setSelectedLocationInfo] = useState(null);

    // Fetch location options when propertyType changes
    useEffect(() => {
        if (propertyType === 'land') {
            const locations = [...new Set(landLocations.map(loc => loc.location))];
            setLocationOptions(locations);
        } else if (propertyType === 'property') {
            const locations = [...new Set(propertyLocations.map(loc => loc.location))];
            setLocationOptions(locations);
        } else {
            setLocationOptions([]);
        }
    }, [propertyType]);

    // Function to fetch location info including seller contact
    const fetchLocationInfo = async (selectedLocation) => {
        let selectedInfo = null;
        if (propertyType === 'land') {
            selectedInfo = landLocations.find(loc => loc.location === selectedLocation);
        } else if (propertyType === 'property') {
            selectedInfo = propertyLocations.find(loc => loc.location === selectedLocation);
        }
        setSelectedLocationInfo(selectedInfo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/search', { property_type: propertyType, location: location });
            onSearch(response.data);
        } catch (error) {
            console.error('Error searching properties:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Select property type:
                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                    <option value="">All</option>
                    <option value="land">Land</option>
                    <option value="property">Property</option>
                </select>
            </label>
            {(propertyType === 'land' || propertyType === 'property') && (
                <div>
                    <label>
                        Select location:
                        <select value={location} onChange={(e) => {
                            setLocation(e.target.value);
                            fetchLocationInfo(e.target.value);
                        }}>
                            <option value="">All</option>
                            {locationOptions.map((loc, index) => (
                                <option key={index} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </label>
                    {selectedLocationInfo && (
                        <div className="location-info">
                            <h2>{selectedLocationInfo.location}</h2>
                            {propertyType === 'land' ? (
                                <>
                                    <p>Acre Size: {selectedLocationInfo.acre_size}</p>
                                    <p>Roads Nearby: {selectedLocationInfo.roads_nearby.join(', ')}</p>
                                    <p>Commercial Centers Nearby: {selectedLocationInfo.commercial_centers_nearby.join(', ')}</p>
                                </>
                            ) : (
                                <>
                                    <p>Property Type: {selectedLocationInfo.property_type}</p>
                                    <p>Price: {selectedLocationInfo.price}</p>
                                    <p>Bedrooms: {selectedLocationInfo.bedrooms}</p>
                                    <p>Bathrooms: {selectedLocationInfo.bathrooms}</p>
                                    <p>Amenities: {selectedLocationInfo.amenities.join(', ')}</p>
                                </>
                            )}
                            <div className="seller-info">
                                <h3>Contact Seller</h3>
                                <p>Name: {selectedLocationInfo.seller_contact.name}</p>
                                <p>Phone: {selectedLocationInfo.seller_contact.phone}</p>
                                <p>Email: {selectedLocationInfo.seller_contact.email}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
