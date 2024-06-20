// src/components/QuickLinks.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function QuickLinks() {
    return (
        <div className="quick-links">
            <h3>Quick Links</h3>
            <ul>
                <li><Link to="/add-employee">Add Employee</Link></li>
                <li><Link to="/employee-list">Employee List</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        </div>
    );
}

export default QuickLinks;
