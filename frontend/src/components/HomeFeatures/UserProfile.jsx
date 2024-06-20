// src/components/UserProfile.jsx
import React, { useState } from 'react';
import '../../styles/UserProfile.css';
import userImage from '../../assets/user.jpg';  // Add a placeholder user image in the assets folder

function UserProfile() {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleToggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className="user-profile">
            <img 
                src={userImage} 
                alt="User" 
                className="user-image" 
                onClick={handleToggleDropdown} 
            />
            {dropdownVisible && (
                <div className="dropdown-menu">
                    <ul>
                        
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
