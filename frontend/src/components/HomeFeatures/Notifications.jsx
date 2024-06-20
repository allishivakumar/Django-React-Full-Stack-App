// src/components/Notifications.jsx
import React from 'react';

function Notifications({ notifications }) {
    return (
        <div className="notifications">
            <h3>Notifications</h3>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
}

export default Notifications;
